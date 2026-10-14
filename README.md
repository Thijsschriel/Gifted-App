# Gifted

Gratis Nederlandse cadeau-app zonder API-sleutel. Start met Node.js 22.9 of hoger en npm start. Open http://localhost:3001. Poort 3000 blijft voor het portfolio.

De app selecteert concrete cadeaus uit de ingebouwde lijst op interesses, leeftijd, budget en uitsluitingen. De selectie verdeelt ideeën over meerdere interesses en controleert budget, leeftijd en duplicaten. Prijzen zijn indicaties. Onbekende interesses leveren geen willekeurige cadeaus op.

Internetzoeken voegt alleen een gecontroleerde bol.com-productlink toe aan een concreet cadeau. Algemene websites, artikelen en spelletjessites worden niet als cadeau weergegeven. Zonder bevestigde link blijft het idee zichtbaar. Er is geen affiliatefeed nodig.

Favoriet, Niet dit, Meer ideeën en Kopieer lijst blijven in de browsersessie. Een nieuwe inzending start een nieuwe lijst. De server bewaart geen formuliergegevens. Alleen geselecteerde productnamen gaan naar Bing en bol.com voor linkcontrole. Afbeeldingen zijn vooraf gemaakte categorie-sfeerbeelden, geen exacte productfoto's.

npm test controleert de selectie. npm run dev herstart bij wijzigingen. Cadeaus staan in public/catalog.js. De feedversie is teruggedraaid.

## Alle interesses verwerken

De oorspronkelijke internetkoppeling ontving alleen de tien vooraf geselecteerde cadeaunamen. Daardoor werd een interesse zonder catalogusmatch nooit onderzocht en ontbrak een apart resultaatrapport. Nu wordt de formulierinvoer een genormaliseerde array. Iedere unieke interesse houdt een eigen zoekplan, meerdere concrete zoektermen en een resultaatgroep. Alle cataloguskandidaten binnen budget en leeftijd worden verzameld voordat de eindlimiet wordt toegepast. Dubbelen worden samengevoegd met behoud van alle gematchte interesses. De eindrangschikking kiest eerst de minst vertegenwoordigde interesse en gebruikt een vaste productnaam als laatste beslisser, waardoor invoervolgorde de selectie niet beïnvloedt. Bij meer dan tien interesses wordt de eindlimiet verhoogd zodat iedere beschikbare interesse een kans houdt.

Iedere groep wordt naar de server gestuurd, ook onbekende interesses (met accessoire-, cadeaupakket- en materiaalzoektermen). Vier zoekopdrachten tegelijk voeren alle termen uit; de resultaten worden pas na afronding samengevoegd. Iedere query heeft eigen foutafhandeling. Maximaal 100 interesses per serveraanvraag; meer geeft een expliciete fout en wordt niet stil afgekapt. Er is geen zoekcache. De server voegt uitsluitend bevestigde productlinks toe: algemene websites en categoriepagina's worden afgewezen. Een onbekende interesse kan dus wel onderzocht worden zonder een bruikbaar cadeauconcept op te leveren. De interface toont gevonden en getoonde aantallen per interesse en behoudt lokale ideeën bij een internetstoring.

Dit is de herstelde versie zonder geautoriseerde productfeeds: cataloguscadeaus zijn concrete concepten met prijsindicaties en categorie-sfeerbeelden. Internetcontrole verandert die niet automatisch in een specifiek winkelproduct met actuele prijs of echte productfoto. Zonder geschikte catalogusmatch worden geen nieuwe cadeauobjecten uit ruwe zoekresultaten gemaakt. De tests bevestigen verwerking van alle interesses, geen onbeperkte echte winkelproductdekking.

Nieuwe bestanden: public/interest-search.js en test/interests.test.js. Gewijzigd: public/catalog.js, public/app.js, public/index.html, search.js, server.js en README.md. Testscenario A met leeftijd 30, budget 0–50 euro: gamen 7 gevonden/3 getoond; voetbal 5/2; technologie 8/3; fitness 6/3; mode 8/3. De eindlijst bevat tien unieke cadeaus; één cadeau kan meerdere interesses ondersteunen. Tests A–H en de vijf bestaande tests slagen. Webshopfouten worden met nagebootste antwoorden getest; er is maar één huidige online productlinkbron (bol.com via Bing), geen tweede webshopconnector.

Onbekende interesses kunnen nu nieuwe cadeauobjecten opleveren: de server leest Product-gegevens uit een gevonden bol.com-productpagina. Alleen producten met aantoonbare interesseovereenkomst, echte positieve EUR-prijs binnen budget en een directe productlink komen erbij. Afbeeldingen worden alleen uit de productgegevens overgenomen. Pagina's zonder leesbare productgegevens blijven weg. Voor kinderen onder 12 worden online producten zonder bevestigde leeftijdsgegevens afgewezen. Er is geen garantie dat iedere willekeurige interesse resultaat oplevert. Budget, leeftijd en uitsluitingen worden tijdelijk voor controle aan de lokale server doorgegeven; alleen zoektermen gaan naar Bing. Productafbeeldingen worden geladen vanaf de winkelbeeldhost zonder referrer.


## Vercel

vercel.json publiceert public/ als statische website en api/search.js als Node.js-functie. De gedeelde requestHandler in server.js verwerkt lokaal en op Vercel dezelfde API-route. HTTPS-origincontrole en vooraf geparste request.body worden ondersteund. Vercel voert npm start niet als blijvende server uit. Na een push naar main kan het gekoppelde Vercel-project automatisch opnieuw deployen. Gebruik projectroot, Framework Preset Other en geen eigen afwijkende build/output-overrides. De exacte oorzaak van een oude FUNCTION_INVOCATION_FAILED vereist de deploymentlogs; de lokale serverconfiguratie is met deze wijziging serverless geschikt gemaakt.

