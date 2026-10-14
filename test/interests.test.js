import test from 'node:test';
import assert from 'node:assert/strict';
import {parseInterests,planInterests,combineInterests} from '../public/interest-search.js';
import {searchInterests,parseResults,extractProduct} from '../search.js';
const input={interests:'gamen, voetbal, technologie, fitness en mode',age:30,budgetMin:0,budgetMax:50,relation:'partner',occasion:'verjaardag',exclusions:''};
test('nieuwe interesse krijgt echte gestructureerde productdata binnen budget',async()=>{
 const html='<script type="application/ld+json">'+JSON.stringify({'@type':'Product',name:'Astronomie sterrenkaart',description:'Sterrenkaart voor astronomie',image:'https://media.example/star.jpg',offers:{price:25,priceCurrency:'EUR',availability:'https://schema.org/InStock'}})+'</script>';
 assert.equal(extractProduct(html,'https://www.bol.com/nl/nl/p/sterrenkaart/123/','astronomie',input).price_estimate_eur,25);
 assert.equal(extractProduct(html,'https://www.bol.com/nl/nl/p/sterrenkaart/123/','astronomie',{...input,budgetMax:20}),null);
 assert.equal(extractProduct('<html>Artikel over astronomie</html>','https://www.bol.com/nl/nl/p/test/','astronomie',input),null);
 const result=await searchInterests([{interest:'astronomie',terms:['astronomie accessoire'],discovery:true}],async url=>new Response(String(url).includes('bing.com')?'<rss><item><title>Astronomie sterrenkaart</title><link>https://www.bol.com/nl/nl/p/sterrenkaart/123/</link></item></rss>':html),input);
 assert.equal(result.groups[0].results[0].name,'Astronomie sterrenkaart');
});
test('A alle vijf interesses hebben eigen queries en resultaten',()=>{
 const plans=planInterests(input),result=combineInterests(plans);
 assert.equal(plans.length,5);assert.ok(plans.every(g=>g.terms.length>1 && g.found>0));
 assert.ok(result.reports.every(g=>g.shown>0));
 console.log('A aantallen:',JSON.stringify(result.reports));
});
test('B dezelfde selectie bij omgekeerde volgorde',()=>{
 const a=combineInterests(planInterests(input)).ideas.map(i=>i.name);
 const b=combineInterests(planInterests({...input,interests:parseInterests(input.interests).reverse()})).ideas.map(i=>i.name);
 assert.deepEqual(a,b);
});
test('C geen mode-resultaten verwijdert andere interesses niet',()=>{
 const plans=planInterests(input).map(g=>g.interest==='mode'?{...g,candidates:[],found:0}:g);
 const result=combineInterests(plans);assert.equal(result.reports.find(g=>g.interest==='mode').shown,0);assert.ok(result.reports.filter(g=>g.interest!=='mode').every(g=>g.shown>0));
});
test('D iedere query gestart, begrensd parallel, fouten afzonderlijk',async()=>{
 const plans=[{interest:'gamen',terms:['Gamingheadset','Gamingmuis']},{interest:'voetbal',terms:['Voetbalshirt']},{interest:'mode',terms:['Katoenen shirt']}];
 const calls=[];let active=0,max=0;
 const result=await searchInterests(plans,async url=>{calls.push(String(url));active++;max=Math.max(max,active);await new Promise(r=>setTimeout(r,3));active--;if(String(url).includes('Voetbalshirt'))throw new Error('offline');return new Response('<rss></rss>');});
 assert.equal(calls.length,4);assert.ok(max<=4);assert.equal(result.groups.length,3);assert.ok(result.groups.find(g=>g.interest==='voetbal').queries[0].error);assert.ok(result.groups.find(g=>g.interest==='gamen').queries.every(q=>q.error===null));
});
test('E nieuw budget wordt toegepast op elke groep',()=>{
 for(const max of [20,50]){const plans=planInterests({...input,budgetMax:max});assert.equal(plans.length,5);assert.ok(plans.every(g=>g.candidates.every(p=>p.price_estimate_eur<=max)));}
 assert.notDeepEqual(planInterests({...input,budgetMax:20}).map(g=>g.found),planInterests(input).map(g=>g.found));
});
test('F dubbelen eenmaal gezocht, meerdere matches blijven behouden',()=>{
 assert.deepEqual(parseInterests(' Gamen, gamen, voetbal '),['gamen','voetbal']);
 const result=combineInterests(planInterests(input));assert.equal(new Set(result.ideas.map(i=>i.name)).size,result.ideas.length);
 assert.ok(result.ideas.some(i=>i.matchedInterests.includes('gamen')&&i.matchedInterests.includes('technologie')));
 assert.deepEqual(parseInterests('modelbouw, modeltreinen'),['modelbouw','modeltreinen']);
});
test('G veel interesses en onbekende interesses worden niet afgekapt',async()=>{
 const interests=['gamen','voetbal','technologie','fitness','mode','tuinieren','koken','wandelen','lezen','tennis','muziek','schilderen','onbekende hobby'];
 const plans=planInterests({...input,interests});assert.equal(plans.length,13);assert.equal(plans.at(-1).found,0);assert.equal(plans.at(-1).terms.length,3);
 const result=await searchInterests(plans.map(g=>({interest:g.interest,terms:g.terms})),async()=>new Response('<rss></rss>'));
 assert.equal(result.groups.length,13);assert.ok(result.groups.every(g=>g.queries.length>0));
});
test('H alleen cataloguscadeaus en specifieke veilige productlinks',()=>{
 const result=combineInterests(planInterests(input));assert.ok(result.ideas.every(i=>i.interests.length&&i.description&&i.relevance_score>=75&&Number.isFinite(i.price_estimate_eur)));
 assert.deepEqual(parseResults('<rss><item><title>Gamingheadset</title><link>https://games.example/</link></item><item><title>Gamingheadset</title><link>https://www.bol.com/nl/nl/l/headsets/</link></item></rss>','Gamingheadset'),[]);
});
