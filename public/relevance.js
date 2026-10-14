import {catalog} from './catalog.js';
export function checkIdea(idea,input,seen=new Set()) {
 const product=catalog.find(p=>p.name===idea.name);
 if (!product || !idea.interests?.length || !idea.description || !idea.why_it_fits || !Number.isFinite(idea.price_estimate_eur) || idea.relevance_score<75) return false;
 if (input.age<product.minAge || input.age>product.maxAge || idea.price_estimate_eur<input.budgetMin || idea.price_estimate_eur>input.budgetMax) return false;
 const id=idea.name.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,''); if (seen.has(id)) return false;seen.add(id);return true;
}
