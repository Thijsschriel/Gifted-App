# Gifted

Gratis Nederlandse cadeau-app zonder API-sleutel. Start met Node.js 22.9 of hoger en npm start. Open http://localhost:3001. Poort 3000 blijft voor het portfolio.

De app selecteert concrete cadeaus uit de ingebouwde lijst op interesses, leeftijd, budget en uitsluitingen. De selectie verdeelt ideeën over meerdere interesses en controleert budget, leeftijd en duplicaten. Prijzen zijn indicaties. Onbekende interesses leveren geen willekeurige cadeaus op.

Internetzoeken voegt alleen een gecontroleerde bol.com-productlink toe aan een concreet cadeau. Algemene websites, artikelen en spelletjessites worden niet als cadeau weergegeven. Zonder bevestigde link blijft het idee zichtbaar. Er is geen affiliatefeed nodig.

Favoriet, Niet dit, Meer ideeën en Kopieer lijst blijven in de browsersessie. Een nieuwe inzending start een nieuwe lijst. De server bewaart geen formuliergegevens. Alleen geselecteerde productnamen gaan naar Bing en bol.com voor linkcontrole. Afbeeldingen zijn vooraf gemaakte categorie-sfeerbeelden, geen exacte productfoto's.

npm test controleert de selectie. npm run dev herstart bij wijzigingen. Cadeaus staan in public/catalog.js. De feedversie is teruggedraaid.
