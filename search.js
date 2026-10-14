const field=(xml,key)=>(xml.match(new RegExp(`<${key}[^>]*>([\\s\\S]*?)</${key}>`,'i'))?.[1] || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').trim();
export function parseResults(xml,product) {
 const words=product.toLowerCase().split(/\s+/).filter(w=>w.length>2 && !['voor','met','van','een','cadeau','favoriete'].includes(w));
 return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(m=>{
  const title=field(m[1],'title');let url;try{url=new URL(field(m[1],'link'));}catch{return [];}
  if(url.protocol!=='https:' || url.hostname!=='www.bol.com' || !/^\/nl\/nl\/p\//.test(url.pathname) || url.username || url.password || !words.length || words.filter(w=>title.toLowerCase().includes(w)).length/words.length<0.7)return [];
  return [{name:product,links:[{label:'Bekijk product op bol.com ↗',url:url.href}]}];
 });
}
export async function searchInterests(products,fetchFn=fetch) {
 if(!Array.isArray(products)||!products.length||products.length>10||products.some(p=>typeof p!=='string'||!p.trim()||p.length>180))throw new Error('Geef maximaal tien concrete cadeaus door.');
 const groups=await Promise.all([...new Set(products)].map(async product=>{try {
  const url=new URL('https://www.bing.com/search');url.searchParams.set('q',`site:bol.com/nl/nl/p/ ${product}`);url.searchParams.set('format','rss');
  const response=await fetchFn(url,{signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error();const xml=await response.text();if(xml.length>2000000||!xml.includes('<rss'))throw new Error();const results=[];
  for(const candidate of parseResults(xml,product).slice(0,1)){const page=await fetchFn(candidate.links[0].url,{signal:AbortSignal.timeout(4000),redirect:'error'});if(!page.ok)continue;const html=await page.text();if(!/"@type"\s*:\s*"Product"/i.test(html))continue;results.push(candidate);}
  return {interest:product,results,error:null};
 }catch{return {interest:product,results:[],error:'Productlink niet bevestigd.'};}}));return {groups};
}
