# email-editor
<img width="1595" height="820" alt="{27ED3F6F-89C6-4D45-8ED9-B410CFB508D6}" src="https://github.com/user-attachments/assets/429c442f-9711-47b9-9c32-a6e5244cbfef" />
<a href="https://technolableiden.sharepoint.com/:w:/s/ToekomstTaal9/IQBGHwU9PmDOSa9nR4-sUBVtAaPHfido96yN6DCq6FflnBE?e=8pP5mp">Gebruiksaanwijzing</a>

## Nieuwe banner toevoegen (stappenplan)

Wil je een extra banner toevoegen die via een externe URL geladen wordt en naar een andere site doorverwijst? Volg één van de twee eenvoudige methodes hieronder.

Belangrijk: de code gebruikt een kleine JavaScript-map met banners (`BANNER_VARIANTEN`) en een `select`-element (`#bannerType`). Je voegt een nieuwe banner toe door die map uit te breiden en (indien nodig) een optie aan de `select` toe te voegen in de HTML.

### Methode A — Snel: voeg een banner toe in `assets/js/main.js`

1. Open `assets/js/main.js` in je editor.
2. Zoek de constante `BANNER_VARIANTEN` (er staat al een entry voor bijvoorbeeld `techniekToekomst` en `meesterChallenge`).
3. Voeg een nieuwe key toe met een uniek id-naam (zonder spaties). Voorbeeld:

```js
// voeg dit toe binnen de bestaande BANNER_VARIANTEN map
mijnNieuweBanner: {
	image: 'https://example.com/mijn-banner.jpg',
	href: 'https://voorbeeld.nl',
	alt: 'Mijn nieuwe banner'
},
```

4. Sla op.

5. (Optioneel) Als je wilt dat deze banner zichtbaar wordt in de dropdown, voeg dan ook een optie toe in `index.php`.

```html
<option value="mijnNieuweBanner">Mijn nieuwe banner</option>
```

6. Herlaad de pagina in de browser en kies in de editor bij `Toon banner` de nieuwe optie. Controleer de live preview.

### Methode B — Direct in de HTML (als je geen JS wilt aanpassen)

Als je snel een andere banner wilt tonen zonder de map te bewerken, kun je tijdelijk de `src` en `href` in de gegenereerde template in de preview overschrijven (handmatig). Dit is alleen handig voor ad-hoc tests en niet als permanente oplossing.

### Testen en veelvoorkomende problemen

- Zorg dat de `image` URL publiek bereikbaar is (geen login of interne netwerkroutes).
- Als de afbeelding niet laadt: controleer de URL in een nieuw tabblad en kijk naar HTTPS- of CORS-problemen.
- Na wijzigen van `assets/js/main.js`: herlaad de editor (Ctrl+F5) zodat de nieuwe scriptversie geladen wordt.
- Als de nieuwe optie niet in de dropdown staat: voeg de `<option>` toe in `index.php` met exact dezelfde `value` als de key in `BANNER_VARIANTEN`.

### Voorbeeld in één overzicht

1. In `assets/js/main.js`:

```js
const BANNER_VARIANTEN = {
	techniekToekomst: { image: '...', href: '...', alt: '...' },
	meesterChallenge: { image: '...', href: '...', alt: '...' },
	mijnNieuweBanner: { image: 'https://example.com/mijn-banner.jpg', href: 'https://voorbeeld.nl', alt: 'Mijn nieuwe banner' }
};
```

2. In `index.php` (dropdown):

```html
<option value="mijnNieuweBanner">Mijn nieuwe banner</option>
```

3. Herlaad pagina en selecteer de banner in de editor.

---
