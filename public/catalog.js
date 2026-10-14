const rows = [
['Gamingheadset',45,'gamen technologie','Elektronicawinkel','Een headset met microfoon voor games en gesprekken. Controleer de aansluiting voor de computer of console.'],
['Gamingmuis',30,'gamen technologie','Elektronicawinkel','Een muis met instelbare gevoeligheid voor pc-gaming. Kies een vorm die bij de hand past.'],
['Mechanisch toetsenbord',50,'gamen technologie','Elektronicawinkel','Een toetsenbord met mechanische schakelaars. Controleer de gewenste toetsenindeling en aansluiting.'],
['Grote gamingmuismat',20,'gamen technologie','Elektronicawinkel','Een brede muismat met ruimte voor muis en toetsenbord. Meet eerst de beschikbare bureauruimte.'],
['Headsetstandaard',18,'gamen technologie','Elektronicawinkel','Een houder om een bestaande headset netjes op te bergen.'],
['USB-hub',25,'technologie werken','Elektronicawinkel','Extra aansluitingen voor een computer. Controleer of USB-A of USB-C nodig is.'],
['Krachttraining shaker',15,'fitness krachttraining','Sportwinkel','Een herbruikbare shaker voor drankjes na de training.'],
['Massagebal voor spierherstel',15,'fitness krachttraining','Sportwinkel','Een compacte massagebal voor zelfmassage na het sporten.'],
['Fitness sporttas',28,'fitness krachttraining','Sportwinkel','Een compacte tas voor trainingskleding en accessoires.'],
['Foamroller',22,'fitness krachttraining','Sportwinkel','Een roller voor zelfmassage en mobiliteitsoefeningen.'],
['LEGO bouwset',30,'lego bouwen','Speelgoedwinkel','Een bouwset in een passend leeftijdsbereik. Kies een thema dat de ontvanger zelf heeft genoemd.',6,120],
['Voetbal trainingsbal',20,'voetbal','Sportwinkel','Een trainingsbal voor een potje op het veld of in het park. Kies de juiste maat voor de ontvanger.',6,120],
['Sjaal van favoriete voetbalclub',25,'voetbal','Fanshop','Een clubsjaal voor wedstrijddagen. Kies de club waarvoor de ontvanger supportert.'],
['Voetbalshirt',45,'voetbal kleding','Sportwinkel of fanshop','Een voetbalshirt in de juiste maat en clubkleuren. Officiële wedstrijdshirts kunnen duurder zijn.',6,120],
['Voetbalbiografie',22,'voetbal lezen','Boekhandel','Een boek over een favoriete voetballer of club. Kies op basis van de clubvoorkeur.'],
['Voetbaltrainingsset',30,'voetbal','Sportwinkel','Pionnen en een balpomp om thuis aan techniek te werken.',6,120],
['Tennisballen met overgrips',18,'tennis','Tennisspeciaalzaak','Een set tennisballen met nieuwe grips voor het racket. Handig voor iemand die regelmatig speelt.',6,120],
['Tennissokken en polsbandjes',20,'tennis kleding','Sportwinkel','Een set comfortabele sokken en zweetbandjes voor op de baan. Controleer de sokmaat.',6,120],
['Tennisracket-hoes',25,'tennis','Tennisspeciaalzaak','Bescherm het racket onderweg naar de tennisbaan. Controleer of de hoes bij het racket past.',6,120],
['Tennistas',45,'tennis','Tennisspeciaalzaak','Een tas met ruimte voor racket, ballen en kleding. Kies een formaat dat past bij de bestaande uitrusting.',6,120],
['Tennisles cadeau',60,'tennis','Tennisvereniging','Een les om een slag of techniek te verbeteren. Vraag de lokale tennisclub naar beschikbaarheid.',6,120],
['Speciaalbierproeverij voor thuis',25,'bier','Bierspeciaalzaak','Een gevarieerde selectie speciaalbieren om te vergelijken. Kies bijvoorbeeld blond, IPA of stout naar smaak.',18,120],
['Bierpakket met eigen foto',30,'bier','Winkel voor gepersonaliseerde cadeaus','Een bierpakket met een eigen foto of tekst op de verpakking. Een persoonlijke draai aan een biercadeau.',18,120],
['Gegraveerd bierglas',20,'bier','Cadeauwinkel','Een bierglas met naam of een korte boodschap. Kies een glasvorm die bij de favoriete bierstijl past.',18,120],
['Bierbrouwset voor thuis',40,'bier','Brouwbenodigdhedenwinkel','Een starterset om zelf bier te brouwen. Controleer welke materialen al aanwezig moeten zijn.',18,120],
['Bierproeverij bij een brouwerij',35,'bier','Brouwerij','Proef verschillende bieren en leer meer over het brouwen. Controleer reservering en locatie.',18,120],
['Luxe keukenhanddoeken',20,'huishouden','Huishoudwinkel','Een set stevige keuken- en theedoeken. Kies kleuren die bij de keuken passen.'],
['Glazen voorraadpotten',24.99,'huishouden','bol.com of huishoudwinkel','Een set van tien kleine Five Stars glazen potten van 280 ml met bamboedeksel. Handig voor kruiden en kleine hoeveelheden.'],
['Serveerschaal',30,'huishouden','Woonwinkel','Een mooie schaal voor het serveren van hapjes. Stem materiaal en kleur af op het bestaande servies.'],
['Handstomer voor kleding',45,'huishouden kleding','Huishoudwinkel','Een compacte stomer om kleding op te frissen. Controleer of de stoffen geschikt zijn voor stomen.'],
['Luxe beddengoed',50,'huishouden','Woonwinkel','Een fijne dekbedovertrekset voor een frisse slaapkamer. Controleer de afmetingen van het dekbed.'],
['Sokken in favoriete kleuren',15,'kleding','Kledingwinkel','Een set sokken in kleuren of patronen die de ontvanger draagt. Kies de juiste maat.'],
['Kledingcadeaubon',30,'kleding','Kledingwinkel','Laat de ontvanger zelf een kledingstuk kiezen. Kies een winkel die bij de stijl past.'],
['Katoenen T-shirt',25,'kleding','Kledingwinkel','Een comfortabel shirt in een favoriete kleur. Controleer maat en gewenste pasvorm.'],
['Warme sjaal',28,'kleding','Kledingwinkel','Een zachte sjaal voor frisse dagen. Kies een kleur die bij de garderobe past.'],
['Comfortabele badjas',40,'kleding','Kledingwinkel','Een comfortabele badjas voor thuis. Stem maat en materiaal af op de voorkeur.'],
['Kruidenkweekset',18,'tuinieren planten koken','Tuincentrum','Kweek verse kruiden op de vensterbank.'],
['Tuinhandschoenen',15,'tuinieren planten','Tuincentrum','Een stevig paar handschoenen voor tuinwerk.'],
['Vogelvoederhuisje',25,'tuinieren natuur vogels','Tuincentrum','Breng vogels dichterbij met een voederhuisje.'],
['Bloembollenpakket',12,'tuinieren bloemen planten','Tuincentrum','Een selectie bloembollen voor een kleurrijke tuin.'],
['Snoeischaar',28,'tuinieren planten','Tuincentrum','Een praktische schaar voor het verzorgen van planten.'],
['Plantenpot',20,'tuinieren planten interieur','Tuincentrum','Een mooie pot voor een favoriete plant.'],
['Moestuinboek',24,'tuinieren lezen moestuin','Boekhandel','Een boek met inspiratie voor een eigen moestuin.'],
['Insectenhotel',22,'tuinieren natuur dieren','Tuincentrum','Een schuilplek voor nuttige insecten.'],
['Gieter',30,'tuinieren planten','Tuincentrum','Een handige gieter voor binnen- of buitenplanten.'],
['Kweekbak',40,'tuinieren moestuin','Tuincentrum','Een compacte bak om zelf groenten te kweken.'],
['Kookboek',25,'koken bakken lezen','Boekhandel','Nieuwe recepten om thuis uit te proberen.'],
['Kruidenproeverij',18,'koken eten kruiden','Delicatessenwinkel','Een selectie kruiden voor nieuwe smaken.'],
['Keukenschort',22,'koken bakken','Huishoudwinkel','Een fijn schort voor avonturen in de keuken.'],
['Digitale keukenthermometer',25,'koken barbecue','Kookwinkel','Meet temperaturen tijdens het bereiden van gerechten.'],
['Bakvorm',20,'bakken koken','Kookwinkel','Een bakvorm voor zelfgemaakte taarten.'],
['Olijfolieproeverij',30,'koken eten','Delicatessenwinkel','Verschillende olijfoliën om te vergelijken.'],
['Pastamachine',65,'koken pasta','Kookwinkel','Maak thuis zelf verse pasta.'],
['Snijplank',35,'koken','Kookwinkel','Een stevige plank voor dagelijks keukenwerk.'],
['Kookworkshop',90,'koken eten workshop','Kookstudio','Leer nieuwe technieken tijdens een kookles.'],
['Wandelsokken',18,'wandelen sport natuur','Outdoorwinkel','Comfortabele sokken voor lange wandelingen.'],
['Thermosfles',28,'wandelen reizen koffie thee','Outdoorwinkel','Neem een warme of koude drank mee onderweg.'],
['Wandelrouteboek',20,'wandelen natuur lezen','Boekhandel','Ontdek nieuwe routes in de omgeving.'],
['Zitmatje',15,'wandelen kamperen natuur','Outdoorwinkel','Een compact matje voor een pauze onderweg.'],
['Dagrugzak',45,'wandelen reizen sport','Outdoorwinkel','Neem de belangrijkste spullen mee op pad.'],
['Wandelstokken',55,'wandelen natuur sport','Outdoorwinkel','Extra ondersteuning tijdens langere tochten.'],
['Verrekijker',80,'wandelen natuur vogels','Outdoorwinkel','Bekijk vogels en landschappen van dichtbij.'],
['Picknickkleed',30,'wandelen natuur eten','Woonwinkel','Een kleed voor een ontspannen middag buiten.'],
['Theeproeverij',16,'thee ontspannen','Theewinkel','Probeer een selectie verschillende theesmaken.'],
['Koffiebonenpakket',22,'koffie koken','Koffiespeciaalzaak','Ontdek verschillende koffiebonen.'],
['Melkopschuimer',28,'koffie koken','Huishoudwinkel','Maak thuis schuim voor een cappuccino.'],
['Leeslampje',15,'lezen boeken','Boekhandel','Een compact lampje voor een leesmoment.'],
['Boekenbon',25,'lezen boeken','Boekhandel','Laat de ontvanger zelf een nieuw boek kiezen.'],
['Boekensteunen',30,'lezen boeken interieur','Woonwinkel','Houd favoriete boeken mooi op hun plek.'],
['Legpuzzel',20,'puzzelen ontspannen spellen','Speelgoedwinkel','Een puzzel voor een rustig moment thuis.'],
['Kaartspel',12,'spellen gamen gezellig','Spellenwinkel','Een compact spel voor samen aan tafel.'],
['Bordspel',35,'spellen gamen gezellig','Spellenwinkel','Een spel om samen een avond mee te vullen.'],
['Schetsboek',15,'tekenen creatief kunst','Kunstbenodigdhedenwinkel','Ruimte voor nieuwe schetsen en ideeën.'],
['Aquarelset',30,'schilderen tekenen creatief kunst','Kunstbenodigdhedenwinkel','Experimenteer met kleur en water.'],
['Breipakket',25,'breien handwerken creatief','Hobbywinkel','Materialen voor een nieuw handwerkproject.'],
['Keramiekworkshop',75,'kunst creatief workshop','Atelier','Maak een eigen voorwerp van klei.'],
['Fotoboek',35,'fotografie herinneringen familie','Fotowinkel','Bundel mooie herinneringen in een persoonlijk boek.'],
['Fotolijst',18,'fotografie herinneringen interieur','Woonwinkel','Geef een bijzondere foto een mooie plek.'],
['Camerariem',30,'fotografie reizen','Fotowinkel','Een comfortabele riem voor een camera.'],
['Yogamat',35,'yoga sport ontspannen','Sportwinkel','Een mat voor oefeningen en ontspanning.'],
['Weerstandsbanden',20,'sport fitness trainen krachttraining','Sportwinkel','Een compacte set voor oefeningen thuis.'],
['Sporthanddoek',18,'sport fitness','Sportwinkel','Een lichte handdoek voor na het sporten.'],
['Fietstas',45,'fietsen reizen sport','Fietswinkel','Neem spullen gemakkelijk mee op de fiets.'],
['Fietsreparatieset',20,'fietsen sport','Fietswinkel','Een handige set voor kleine reparaties onderweg.'],
['Platenbon',30,'muziek vinyl','Muziekwinkel','Laat de ontvanger zelf een album uitzoeken.'],
['Ukulele',65,'muziek creatief','Muziekwinkel','Een klein instrument om nieuwe liedjes te leren.'],
['Museumkaartje',25,'kunst cultuur geschiedenis','Museumkassa','Een dag vol kunst of geschiedenis.'],
['Bioscoopbon',20,'film films gezellig','Bioscoop','Een uitje naar een film naar keuze.'],
['Theaterkaartje',50,'theater cultuur muziek','Theaterkassa','Een avond genieten van een voorstelling.'],
['Wellnessbon',75,'ontspannen wellness','Wellnesscentrum','Tijd voor rust en ontspanning.'],
['Massagebon',60,'ontspannen wellness','Massagesalon','Een ontspannend moment voor de ontvanger.'],
['Notitieboek',15,'schrijven werken plannen','Boekhandel','Een mooi boekje voor notities en plannen.'],
['Vulpen',40,'schrijven werken','Kantoorboekhandel','Een fijne pen voor dagelijkse notities.'],
['Bureauplant',18,'werken planten interieur','Tuincentrum','Een groene toevoeging aan het bureau.'],
['Laptophouder',35,'werken technologie','Elektronicawinkel','Een houder voor een prettige werkplek.'],
['Powerbank',30,'technologie reizen','Elektronicawinkel','Laad een telefoon onderweg bij.'],
['Draadloze hoofdtelefoon',100,'muziek technologie gamen','Elektronicawinkel','Luister onderweg naar muziek of podcasts.'],
['E-reader',150,'lezen boeken technologie','Elektronicawinkel','Neem een hele verzameling boeken mee.'],
['Koffiemachine',250,'koffie koken technologie','Huishoudwinkel','Een apparaat voor koffie thuis.'],
['Robotstofzuiger',350,'technologie interieur','Elektronicawinkel','Een praktische hulp voor het huishouden.'],
['Weekendovernachting',180,'reizen ontspannen','Hotel','Plan een korte vakantie samen.'],
['Luxe diner voor twee',120,'eten koken gezellig','Restaurant','Geniet samen van een uitgebreid diner.'],
['Bloemenboeket',25,'bloemen planten gezellig','Bloemist','Een kleurrijk gebaar voor een bijzondere dag.'],
['Chocoladeassortiment',15,'chocolade eten gezellig','Chocolaterie','Een doos met verschillende chocoladesmaken.'],
['Ontbijtpakket',30,'eten gezellig','Delicatessenwinkel','Ingrediënten voor een feestelijk ontbijt.'],
['Persoonlijke mok',18,'koffie thee herinneringen','Cadeauwinkel','Een mok met een eigen tekst of foto.'],
['Zachte plaid',40,'interieur ontspannen','Woonwinkel','Een warme deken voor een rustig moment thuis.'],
['Kinderboek',15,'lezen boeken', 'Boekhandel','Een verhaal om samen te lezen.',0,12],
['Bouwstenen',30,'bouwen creatief spellen','Speelgoedwinkel','Bouw zelf nieuwe vormen en verhalen.',4,14],
['Kinderknutselset',18,'knutselen creatief tekenen','Speelgoedwinkel','Een pakket voor een creatieve middag.',4,12],
['Bellenblaas',3,'buiten spelen','Speelgoedwinkel','Maak samen grote en kleine bellen.',3,10],
['Stoepkrijt',5,'tekenen buiten creatief','Speelgoedwinkel','Maak kleurrijke tekeningen op de stoep.',3,12],
['Stickerboek',6,'creatief knutselen','Boekhandel','Een boek met stickers om mee aan de slag te gaan.',3,10],
['Boekenlegger',4,'lezen boeken','Boekhandel','Een kleine attentie voor een boekenliefhebber.'],
['Zakje bloemzaad',3,'tuinieren bloemen','Tuincentrum','Zaai bloemen voor een kleurrijk seizoen.'],
['Handgeschreven brief',0,'herinneringen familie gezellig','Thuis','Schrijf op waarom je de ontvanger waardeert.'],
['Zelfgemaakte wandelroute',0,'wandelen natuur','Thuis','Stel een persoonlijke route samen en wandel samen.'],
['Digitale afspeellijst',0,'muziek herinneringen','Thuis','Verzamel liedjes die iets voor jullie betekenen.'],
['Hulp bij een klus',0,'tuinieren werken gezellig','Thuis','Geef je tijd door samen een klus aan te pakken.']
];
const clean = text => text.normalize('NFKC').toLocaleLowerCase('nl').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const aliases = { gaming:'gamen', games:'gamen', computers:'technologie', computer:'technologie', tech:'technologie', krachttrainen:'krachttraining', voetballen:'voetbal', soccer:'voetbal', tennisser:'tennis', tennissen:'tennis', speciaalbier:'bier', biertjes:'bier', bieren:'bier', huishoudspullen:'huishouden', huishoudelijk:'huishouden', huishoudelijke:'huishouden', schoonmaken:'huishouden', kleidng:'kleding', kleren:'kleding', mode:'kleding', fashion:'kleding', tuin:'tuinieren', koken:'koken' };
const stopWords = new Set(['en','die','dat','het','een','hij','zij','van','houdt','leuk','vindt','graag','heel','ook','al','heeft','niet','geen','met','voor','maar']);
const tokens = text => clean(text).split(' ').filter(w=>w.length>2 && !stopWords.has(w)).map(w=>aliases[w] || w);
export const catalog = rows.map(([name,price,tags,shop,description,minAge=12,maxAge=120]) => ({name,price,tags:tags.split(' '),shop,description,minAge,maxAge}));
export function shoppingLinks(name) {
  if (name === 'Glazen voorraadpotten') return [{label:'Bekijk product op bol.com ↗',url:'https://www.bol.com/nl/nl/p/voorraadpotten-280-ml-10-stuks/9300000187975144/'}];
  return [];
}
export function selectIdeas(input) {
  if (!Number.isFinite(input.budgetMin) || !Number.isFinite(input.budgetMax) || input.budgetMin < 0 || input.budgetMax < input.budgetMin) throw new Error('Vul een geldig minimum- en maximumbudget in.');
  const interests = [...new Set(tokens(input.interests))];
  const ignored = new Set([...(input.rejectedNames || []), ...(input.seenNames || [])].map(clean));
  const excluded = tokens(input.exclusions || '');
  const ranked = catalog.filter(i => i.price >= input.budgetMin && i.price <= input.budgetMax && input.age >= i.minAge && input.age <= i.maxAge && !ignored.has(clean(i.name)) && !excluded.some(w => clean(i.name).split(' ').some(n => n.includes(w) || w.includes(n)) || i.tags.some(t => t === w)))
    .map(i => {
      const matches = interests.filter(w => i.tags.some(t => t === w || (w.length >= 5 && t.length >= 5 && (t.startsWith(w) || w.startsWith(t))))); 
      const shared = /samen|twee/.test(i.name + ' ' + i.description);
      const occasionBoost = ['bedankje','Sinterklaas','Kerst'].includes(input.occasion) && i.price <= 30 ? 1 : 0;
      const relationBoost = ['partner','vriend(in)'].includes(input.relation) && shared ? 2 : input.relation === 'collega' && i.tags.includes('werken') ? 2 : 0;
      return { i, matches, score: matches.length * 10 + relationBoost + occasionBoost };
    }).filter(item => item.matches.length > 0).sort((a,b) => b.score - a.score || a.i.name.localeCompare(b.i.name, 'nl'));
  // Spreid de selectie over opgegeven interesses, daarna op relevantie.
  const selected = [];
  const coverage = new Map(interests.map(w => [w,0]));
  while (ranked.length && selected.length < 10) {
    ranked.sort((a,b) => Math.min(...a.matches.map(w=>coverage.get(w))) - Math.min(...b.matches.map(w=>coverage.get(w))) || b.score-a.score);
    const next = ranked.shift(); selected.push(next);
    next.matches.forEach(w=>coverage.set(w,coverage.get(w)+1));
  }
  return selected.map(({i,matches}) => ({name:i.name,description:i.description,why_it_fits:`Dit concrete cadeau sluit aan bij ${matches.join(', ')}. De prijsindicatie past binnen je budget voor ${input.occasion}.`,interests:matches,category:matches[0],budget_status:'mogelijk binnen budget',relevance_score:Math.min(100,80+matches.length*5),price_estimate_eur:i.price,where_to_buy:i.shop}));
}


