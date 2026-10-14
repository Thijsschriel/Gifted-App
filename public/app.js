import {checkIdea} from './relevance.js';
import {selectIdeas,catalog,shoppingLinks} from './catalog.js';


const $ = id => document.getElementById(id);
const form = $('gift-form');
const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
const key = 'gifted-session-v3';
let state = { input: null, ideas: [], favorites: [], rejectedNames: [], seenNames: [] };
try { const saved = JSON.parse(sessionStorage.getItem(key)); if (saved?.input && Array.isArray(saved.ideas) && Array.isArray(saved.favorites) && Array.isArray(saved.rejectedNames) && Array.isArray(saved.seenNames)) state = saved; } catch { /* Opslag kan uitgeschakeld zijn. */ }
const save = () => { try { sessionStorage.setItem(key, JSON.stringify(state)); } catch { /* De app blijft in geheugen werken. */ } };
const normalized = name => name.normalize('NFKC').trim().toLocaleLowerCase('nl').replace(/\s+/g, ' ');
const includes = (names, name) => names.some(n => normalized(n) === normalized(name));
function element(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
function linksFor(idea) { return idea.links || shoppingLinks(idea.name); }
function priceLabel(idea) { return idea.price_estimate_eur === null ? 'Prijs nog controleren' : euro.format(idea.price_estimate_eur); }
function shopLinks(name) {
  const container = element('div',undefined,'shop-links');
  const idea = [...state.ideas,...state.favorites].find(i=>i.name===name) || {name};
  for (const link of linksFor(idea)) {
    try { if (new URL(link.url).protocol !== 'https:') continue; } catch { continue; }
    const anchor = element('a',link.label); anchor.href = link.url;
    anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
    container.append(anchor);
  }
  return container;
}
function photo(idea) {
 const item=catalog.find(i=>i.name===idea.name);const tags=item?.tags || [];
 const groups=[['koffie','thee'],['tuinieren','planten'],['schrijven','werken'],[],['wandelen','reizen'],['koken','bakken'],['creatief','kunst'],['spellen','puzzelen'],['muziek','technologie'],['ontspannen','wellness'],['fietsen'],['bloemen','chocolade','eten']];
 let scene=groups.findIndex(g=>g.some(t=>tags.includes(t)));if(scene<0)scene=tags.includes('lezen')?2:3;
 const image=element('div',undefined,`product-photo scene-${scene}`);image.setAttribute('role','img');image.setAttribute('aria-label',`Sfeerbeeld bij ${idea.name}`);return image;
}
function render() {
  $('cards').replaceChildren();
  const visible = state.ideas.filter(i => !includes(state.rejectedNames, i.name));
  for (const idea of visible) {
    const card = element('article', undefined, 'card');
    const top = element('div', undefined, 'card-top'); top.append(element('h3', idea.name), element('span', priceLabel(idea), 'price'));
    const actions = element('div', undefined, 'actions');
    const favorite = element('button', state.favorites.some(f => normalized(f.name) === normalized(idea.name)) ? '♥ Favoriet' : '♡ Favoriet');
    favorite.setAttribute('aria-pressed', String(state.favorites.some(f => normalized(f.name) === normalized(idea.name))));
    favorite.setAttribute('aria-label', `Favoriet: ${idea.name}`);
    favorite.onclick = () => { const index = state.favorites.findIndex(f => normalized(f.name) === normalized(idea.name)); if (index >= 0) state.favorites.splice(index, 1); else state.favorites.push(idea); save(); render(); };
    const reject = element('button', 'Niet dit'); reject.setAttribute('aria-label', `Niet dit: ${idea.name}`);
    reject.onclick = () => { state.rejectedNames.push(idea.name); state.favorites = state.favorites.filter(f => normalized(f.name) !== normalized(idea.name)); save(); render(); $('status').textContent = 'Idee verwijderd. Bij meer ideeën slaan we dit cadeau over.'; };
    actions.append(favorite, reject);
    card.append(photo(idea), top, element('p', idea.description), element('p', idea.why_it_fits, 'why'), element('div', `Te vinden bij: ${idea.where_to_buy}`, 'shop'), element('div', (idea.interests || []).join(', ') + ' · ' + (idea.category || '') + ' · ' + (idea.budget_status || ''), 'shop'), shopLinks(idea.name), actions);
    $('cards').append(card);
  }
  $('empty').hidden = !!state.input;
  $('count').hidden = !state.input; $('count').textContent = `${visible.length} ideeën`;
  $('results-title').textContent = state.input ? 'Speciaal voor jouw ontvanger' : 'Cadeau-inspiratie voor jou';
  $('more').hidden = !state.input;
  $('price-note').hidden = !state.input;
  $('favorites-section').hidden = state.favorites.length === 0;
  $('favorite-count').textContent = `(${state.favorites.length})`;
  $('header-count').textContent = state.favorites.length;
  $('nav-count').textContent = state.favorites.length || '';
  $('favorites').replaceChildren();
  for (const idea of state.favorites) {
    const row = element('div', undefined, 'favorite-item');
    const remove = element('button', 'Verwijder'); remove.setAttribute('aria-label', `Verwijder favoriet: ${idea.name}`);
    remove.onclick = () => { state.favorites = state.favorites.filter(f => f.name !== idea.name); save(); render(); };
    const detail = element('div'); detail.append(element('span', `${idea.name} · ${priceLabel(idea)}`),shopLinks(idea.name));
    row.append(detail, remove); $('favorites').append(row);
  }
}
function readForm() { const f = new FormData(form); return { relation: f.get('relation'), age: Number(f.get('age')), interests: f.get('interests').trim(), budgetMin: Number(f.get('budgetMin')), budgetMax: Number(f.get('budgetMax')), occasion: f.get('occasion'), exclusions: f.get('exclusions').trim() }; }
let busy = false;
async function requestIdeas(more = false) {
  if (busy) return;
  if (!form.reportValidity()) return;
  const input = readForm();
  if (input.budgetMax < input.budgetMin) { $('error').textContent = 'Het maximumbudget moet minstens het minimumbudget zijn.'; $('error').hidden = false; return; }
  if (!input.interests) { $('error').textContent = 'Vul minstens één interesse in.'; $('error').hidden = false; return; }
  // Bij gewijzigde wensen begint een nieuwe lijst, ook via de knop Meer ideeën.
  const same = more && JSON.stringify(input) === JSON.stringify(state.input);
  busy = true; $('submit').disabled = true; $('more').disabled = true;
  $('error').hidden = true; $('status').textContent = 'We zoeken op internet naar je interesses…';
  document.querySelector('.results').setAttribute('aria-busy', 'true');
  try {
    const identities=new Set();
    const local=selectIdeas({...input,rejectedNames:same?state.rejectedNames:[],seenNames:same?state.seenNames:[]}).filter(i=>checkIdea(i,input,identities));
    let data=local,warning='';
    if(local.length) {
      try {
        const response=await fetch('/api/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({products:local.map(i=>i.name)}),signal:AbortSignal.timeout(20000)});
        const result=await response.json();if(!response.ok || !Array.isArray(result.groups))throw new Error();
        data=local.map(idea=>({...idea,links:result.groups.find(g=>g.interest===idea.name)?.results?.[0]?.links || shoppingLinks(idea.name)}));
        if(result.groups.every(g=>!g.results.length))warning=' Er zijn geen bevestigde productlinks gevonden; de cadeau-ideeën blijven bruikbaar.';
      }catch {warning=' Winkellinks konden niet worden gecontroleerd. Er zijn geen onbevestigde links toegevoegd.';}
    }
    if (!data.length) throw new Error('Geen nieuwe ideeën die aansluiten bij deze interesses en dit budget. Probeer een andere interesse of verruim je budget. We vullen de lijst niet aan met willekeurige cadeaus.');
    state = { input, ideas: data, favorites: same ? state.favorites : [], rejectedNames: same ? state.rejectedNames : [], seenNames: [...(same ? state.seenNames : []), ...data.map(i => i.name)] };
    save(); render(); $('status').textContent = data.length + ' concrete cadeau-ideeën. Prijzen zijn indicaties, geen actuele winkelprijzen.' + warning;
  } catch (error) { $('status').textContent = ''; $('error').textContent = error.message || 'Er ging iets mis bij het selecteren. Probeer opnieuw.'; $('error').hidden = false; }
  finally { busy = false; $('submit').disabled = false; $('more').disabled = false; document.querySelector('.results').setAttribute('aria-busy', 'false'); }
}
form.addEventListener('submit', event => { event.preventDefault(); requestIdeas(); });
$('more').onclick = () => requestIdeas(true);
$('copy').onclick = async () => {
  const text = state.favorites.map(i => `${i.name} — ${priceLabel(i)}\n${i.description}\nWaarom dit past: ${i.why_it_fits}\nTe vinden bij: ${i.where_to_buy}\n${linksFor(i).map(l=>l.url).join('\n')}`).join('\n\n');
  try { await navigator.clipboard.writeText(text); $('status').textContent = 'Je favorieten zijn gekopieerd.'; }
  catch { $('error').textContent = 'Kopiëren is niet toegestaan in deze browser. Selecteer de favorieten en kopieer ze handmatig.'; $('error').hidden = false; }
};
if (state.input) for (const [name, value] of Object.entries(state.input)) if (form.elements.namedItem(name)) form.elements.namedItem(name).value = value;
render();
for(const name of ['Persoonlijke mok','Notitieboek','Plantenpot','Chocoladeassortiment','Picknickkleed','Aquarelset']) {
 const item=catalog.find(i=>i.name===name);const card=element('article',undefined,'card');const top=element('div',undefined,'card-top');top.append(element('h3',item.name),element('span',euro.format(item.price),'price'));card.append(photo(item),top,element('p',item.description),element('div',item.shop,'shop'),shopLinks(item.name));$('discover-cards').append(card);
}
function navigate(target, button) {
  document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.toggle('active',b.id === button));
  if (target === 'favorites-section' && !state.favorites.length) {
    $('favorites-section').hidden = false;
    $('favorites').replaceChildren(element('p','Je verlanglijst is nog leeg. Tik op Favoriet bij een cadeau dat je leuk vindt.','discovery-note'));
  }
  $(target).scrollIntoView({block:'start'});
}
$('nav-home').onclick = () => { window.scrollTo({top:0}); document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.id==='nav-home')); };
$('nav-discover').onclick = () => navigate('gift-form','nav-discover');
$('start-search').onclick = () => navigate('gift-form','nav-discover');
$('nav-favorites').onclick = $('header-save').onclick = () => navigate('favorites-section','nav-favorites');
document.querySelectorAll('[data-occasion]').forEach(button => button.onclick = () => {
  form.elements.namedItem('occasion').value = button.dataset.occasion;
  document.querySelectorAll('[data-occasion]').forEach(b=>b.classList.toggle('selected',b===button));
  navigate('gift-form','nav-discover');
});






