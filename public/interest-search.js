import {catalog,selectIdeas} from './catalog.js';
const normalize=s=>s.normalize('NFKC').trim().toLocaleLowerCase('nl').replace(/\s+/g,' ');
const synonyms={mode:'kleding',kleidng:'kleding',gaming:'gamen',games:'gamen',voetballen:'voetbal',tennissen:'tennis',tech:'technologie',computer:'technologie',huishoudspullen:'huishouden',speciaalbier:'bier'};
export function parseInterests(value) {
  const raw=Array.isArray(value)?value:String(value).split(/[,;\n]+|\s+en\s+/i);
  const tags=new Set(catalog.flatMap(p=>p.tags));
  const list=raw.flatMap(part=>{
    const words=normalize(part).split(' ').filter(w=>!['die','vindt','houdt','van','leuk','graag'].includes(w));
    if(words.length>1 && words.every(w=>tags.has(synonyms[w]||w)))return words;
    return [part];
  }).map(normalize).filter(Boolean);
  return [...new Set(list)];
}
export function planInterests(input) {
  const reports=parseInterests(input.interests).map(interest=>{
    const term=synonyms[interest]||interest;
    // Geen eindlimiet: alle catalogusmatches per interesse verzamelen.
    const candidates=selectIdeas({...input,interests:term,limit:Infinity});
    const terms=candidates.length ? [...new Set(candidates.map(p=>p.name))] : [`${interest} accessoire`,`${interest} cadeaupakket`,`${interest} materiaal`];
    return {interest,terms,candidates:candidates.map(p=>({...p,interests:[interest],matchedInterests:[interest]})),found:candidates.length};
  });
  return reports;
}
export function combineInterests(reports,limit=Math.max(10,reports.length)) {
  const merged=new Map();
  for(const group of reports)for(const p of group.candidates){
    const id=normalize(p.name);
    if(!merged.has(id))merged.set(id,{...p,interests:[],matchedInterests:[]});
    const product=merged.get(id);
    if(!product.interests.includes(group.interest))product.interests.push(group.interest);
    product.matchedInterests=[...product.interests];
  }
  const coverage=new Map(reports.map(g=>[g.interest,0])),remaining=[...merged.values()],selected=[];
  while(remaining.length && selected.length<limit){
    remaining.sort((a,b)=>Math.min(...a.interests.map(i=>coverage.get(i)))-Math.min(...b.interests.map(i=>coverage.get(i))) || b.interests.length-a.interests.length || b.relevance_score-a.relevance_score || a.name.localeCompare(b.name,'nl'));
    const p=remaining.shift();p.interests.sort();p.why_it_fits=`Dit cadeau sluit aan bij ${p.interests.join(', ')}. De prijsindicatie valt binnen je budget.`;selected.push(p);p.interests.forEach(i=>coverage.set(i,coverage.get(i)+1));
  }
  return {ideas:selected,reports:reports.map(g=>({interest:g.interest,found:g.found,shown:selected.filter(p=>p.interests.includes(g.interest)).length}))};
}
