const field=(xml,key)=>(xml.match(new RegExp(`<${key}[^>]*>([\\s\\S]*?)</${key}>`,'i'))?.[1] || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').trim();
export function parseResults(xml,product) {
 const words=product.toLowerCase().split(/\s+/).filter(w=>w.length>2 && !['voor','met','van','een','cadeau','favoriete'].includes(w));
 return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(m=>{
  const title=field(m[1],'title');let url;try{url=new URL(field(m[1],'link'));}catch{return [];}
  if(url.protocol!=='https:' || url.hostname!=='www.bol.com' || !/^\/nl\/nl\/p\//.test(url.pathname) || url.username || url.password || !words.length || words.filter(w=>title.toLowerCase().includes(w)).length/words.length<0.7)return [];
  return [{name:product,links:[{label:'Bekijk product op bol.com ↗',url:url.href}]}];
 });
}
export function extractProduct(html,url,interest,input) {
 if(!Number.isFinite(input.budgetMin)||!Number.isFinite(input.budgetMax)||input.budgetMin<0||input.budgetMax<input.budgetMin||!Number.isInteger(input.age))return null;
 const nodes=[];
 function visit(value){if(!value || typeof value!=='object')return;if(Array.isArray(value)){value.forEach(visit);return;}if(value['@type']==='Product'||value['@type']?.includes?.('Product'))nodes.push(value);if(value['@graph'])visit(value['@graph']);if(value.mainEntity)visit(value.mainEntity);}
 for(const script of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{visit(JSON.parse(script[1]));}catch{}}
 for(const p of nodes){
  const name=String(p.name||''),description=String(p.description||'').replace(/<[^>]*>/g,' ').slice(0,500);
  const words=interest.toLowerCase().split(/\s+/).filter(w=>w.length>2);if(!words.length||!words.every(w=>(name+' '+description).toLowerCase().includes(w)))continue;
  const offers=Array.isArray(p.offers)?p.offers:[p.offers];
  const offer=offers.filter(o=>o?.priceCurrency==='EUR'&&Number.isFinite(Number(o.price))&&Number(o.price)>0&&!/OutOfStock|Discontinued|SoldOut/.test(o.availability||'')).sort((a,b)=>Number(a.price)-Number(b.price))[0];
  if(!offer)continue;const price=Number(offer.price);if(price<input.budgetMin||price>input.budgetMax)continue;
  if(input.age<18&&/bier|wijn|alcohol|whisky/i.test(name+' '+description))continue;
  if(input.age<12)continue;
  const excluded=String(input.exclusions||'').toLowerCase().split(/[,;]+/).map(s=>s.trim()).filter(Boolean);if(excluded.some(w=>(name+' '+description).toLowerCase().includes(w)))continue;
  const ignored=[...(input.rejectedNames||[]),...(input.seenNames||[])];if(ignored.some(n=>n.toLowerCase().trim()===name.toLowerCase().trim()))continue;
  let image=Array.isArray(p.image)?p.image[0]:p.image;if(typeof image==='object')image=image?.url;
  try{if(new URL(image).protocol!=='https:')image=null;}catch{image=null;}
  return {name,description,why_it_fits:`De productnaam of beschrijving vermeldt ${interest}. De gevonden prijs valt binnen je budget.`,interests:[interest],matchedInterests:[interest],category:interest,price_estimate_eur:price,budget_status:'binnen budget volgens productpagina',relevance_score:85,where_to_buy:'bol.com',links:[{label:'Bekijk product op bol.com ↗',url}],image,checkedAt:new Date().toISOString(),online:true};
 }return null;
}
export async function searchInterests(plans,fetchFn=fetch,input={}) {
 if(!Array.isArray(plans)||!plans.length||plans.length>100||plans.some(p=>typeof p.interest!=='string'||!p.interest.trim()||p.interest.length>180||!Array.isArray(p.terms)||!p.terms.length||p.terms.some(t=>typeof t!=='string'||!t.trim()||t.length>180)))throw new Error('Geef maximaal 100 interesses met geldige zoektermen door.');
 const tasks=plans.flatMap((plan,index)=>[...new Set(plan.terms)].map(term=>({index,term}))),out=new Array(tasks.length);let cursor=0;
 async function worker(){while(cursor<tasks.length){const n=cursor++,task=tasks[n];try {
  const url=new URL('https://www.bing.com/search');url.searchParams.set('q',`site:bol.com/nl/nl/p/ ${task.term}`);url.searchParams.set('format','rss');
  const response=await fetchFn(url,{signal:AbortSignal.timeout(6000)});if(!response.ok)throw new Error();const xml=await response.text();if(xml.length>2000000||!xml.includes('<rss'))throw new Error();const results=[];
  const discovery=plans[task.index].discovery;
  for(const candidate of parseResults(xml,discovery?plans[task.index].interest:task.term).slice(0,2)){const page=await fetchFn(candidate.links[0].url,{signal:AbortSignal.timeout(3000),redirect:'error'});if(!page.ok)continue;const html=await page.text();if(!/"@type"\s*:\s*"Product"/i.test(html))continue;if(discovery){const product=extractProduct(html,candidate.links[0].url,plans[task.index].interest,input);if(product)results.push(product);}else results.push(candidate);}
  out[n]={...task,results,error:null};
 }catch{out[n]={...task,results:[],error:'Productlink niet bevestigd.'};}}}
 await Promise.all(Array.from({length:Math.min(4,tasks.length)},worker));
 return {groups:plans.map((plan,index)=>({interest:plan.interest,queries:out.filter(t=>t.index===index).map(t=>({term:t.term,error:t.error,count:t.results.length})),results:out.filter(t=>t.index===index).flatMap(t=>t.results)}))};
}
