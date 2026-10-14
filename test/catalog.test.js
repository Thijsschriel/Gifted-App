import test from 'node:test';
import assert from 'node:assert/strict';
import { selectIdeas, catalog } from '../public/catalog.js';
const input = { age:35, relation:'vriend(in)', interests:'tuinieren, koken, wandelen', budgetMin:15, budgetMax:50, occasion:'verjaardag', exclusions:'' };
test('tien unieke ideeën binnen budget met passende interesses', () => {
  const list = selectIdeas(input);
  assert.equal(list.length,10);
  assert.equal(new Set(list.map(i=>i.name)).size,10);
  assert.ok(list.every(i=>i.price_estimate_eur >=15 && i.price_estimate_eur <=50));
  assert.ok(list.every(i=>!i.why_it_fits.includes('algemene')));
});
test('eerder getoonde en afgewezen namen worden niet herhaald', () => {
  const first = selectIdeas(input);
  const second = selectIdeas({...input,seenNames:first.map(i=>i.name), rejectedNames:['Kookboek']});
  assert.ok(second.every(i=>!first.some(f=>f.name===i.name) && i.name !=='Kookboek'));
});
test('uitsluitingen, leeftijden en smalle budgetten', () => {
  assert.ok(selectIdeas({...input,exclusions:'houdt niet van koffie'}).every(i=>!i.name.toLowerCase().includes('koffie')));
  const child = selectIdeas({...input,age:5,budgetMin:0,interests:'tekenen'});
  assert.ok(child.length > 0 && child.every(i=>catalog.find(c=>c.name===i.name).minAge <=5));
  assert.deepEqual(selectIdeas({...input,budgetMin:999,budgetMax:1000}),[]);
  assert.ok(selectIdeas({...input,budgetMin:25,budgetMax:25}).every(i=>i.price_estimate_eur===25));
});
test('voetbal, tennis, bier, huishoudspullen en kleidng geven relevante en gevarieerde ideeën', () => {
  const list = selectIdeas({...input,interests:'die vindt voetbal tennis bier huishoudspullen en kleidng leuk'});
  assert.equal(list.length,10);
  const desired = ['voetbal','tennis','bier','huishouden','kleding'];
  assert.ok(list.every(i => catalog.find(c=>c.name===i.name).tags.some(t=>desired.includes(t))));
  for (const interest of desired) assert.ok(list.some(i=>i.why_it_fits.includes(interest)),interest);
  assert.deepEqual(selectIdeas({...input,interests:'een volledig onbekende hobby xyz'}),[]);
  const teens = selectIdeas({...input,age:16,interests:'bier voetbal'});
  assert.ok(teens.every(i=>!catalog.find(c=>c.name===i.name).tags.includes('bier')));
});
test('uitgeputte lijst geeft geen herhalingen en ongeldige budgetten falen', () => {
  assert.deepEqual(selectIdeas({...input,seenNames:catalog.map(i=>i.name)}),[]);
  assert.throws(()=>selectIdeas({...input,budgetMin:51,budgetMax:50}));
});
