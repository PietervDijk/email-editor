# Email Handtekening Editor

Een interactieve web-editor om professionele email handtekeningen aan te maken en te downloaden voor Technolab Leiden medewerkers.

## 📋 Over dit project

Dit is een **responsive web-applicatie** waarmee gebruikers snel een persoonlijke email handtekening kunnen genereren. De editor biedt:
- Invullen van persoonlijke gegevens (naam, functie, telefoonnummer)
- Bedrijfsgegevens en contactinformatie
- Selectie van werkdagen
- Aangepaste logo's en decoraties
- Live preview van de handtekening
- Kopie naar klembord en downloadoptie
- Optionele promotiebanner

**Screenshot:**
<img width="1595" height="820" alt="Email Handtekening Editor" src="https://github.com/user-attachments/assets/429c442f-9711-47b9-9c32-a6e5244cbfef" />

---

## 🚀 Aan de slag

### Vereisten
- PHP 5.4+ (lokale webserver of hosting met PHP)
- Moderne webbrowser (Chrome, Firefox, Safari, Edge)
- Geen externe afhankelijkheden (jQuery, Bootstrap, etc.)

### Installatie

1. **Clone of download** dit project:
   ```bash
   git clone https://github.com/technolableiden/email-editor.git
   cd email-editor
   ```

2. **Start een lokale webserver**:
   - **PHP ingebouwd** (PHP 5.4+):
     ```bash
     php -S localhost:8000
     ```
   - **Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **Live Server** (VS Code): Klik rechts op `index.php` → "Open with Live Server"

3. **Open in je browser**:
   ```
   http://localhost:8000
   ```

---

## 📁 Projectstructuur

```
email-editor/
├── index.php                 # Hoofdbestand (HTML + formulier)
├── assets/
│   ├── css/
│   │   └── style.css        # Volledige styling (responsive design)
│   ├── js/
│   │   ├── main.js          # Logica & banners (kernfunctionaliteit)
│   │   └── template.js      # HTML template voor handtekening
│   └── images/              # Folder voor afbeeldingen (nog niet gebruikt)
└── README.md                # Dit bestand
```

---

## 🎯 Functies

### 📧 Live Preview (de kernfunctie)
De **live preview** aan de rechterkant is het hart van de editor. Terwijl je de formulieren invult in beide tabbladen (Persoonlijk én Bedrijf), zie je **real-time** hoe de email handtekening eruit zal zien. Dit combineert alle gegevens uit beide tabbladen in één professioneel formatted email signature.

### Tabblad "Persoonlijk"
- **Naam** — volledige naam van de medewerker
- **Functie** — jobtitel
- **Werkdagen** — selecteer op welke dagen je beschikbaar bent (ma t/m vr)
- **Telefoon** — mobiel telefoonnummer (validatie ingebouwd)
- **Email** — persoonlijk email adres
- **Email suggestie** — optioneel auto-vullen van emailadres
- **Toon banner in Handtekening** — checkbox om een promotiebanner toe te voegen
- **Banner keuze** — dropdown met beschikbare banners
- **Banner voorbeeld** — live preview van je geselecteerde banner

### Tabblad "Bedrijf"
- **Bedrijfstelefoon** — centrale kantoortelefoon
- **Adres** — bedrijfsadres
- **Website naam** — naam die in de handtekening verschijnt
- **Logo URL** — link naar bedrijfslogo
- **Divider afbeelding** — decoratieve scheidingslijn
- **Logo koppeling** — URL waar logo naar linkt
- **Website naam** — bedrijfswebsite

### Acties 
- **Kopiëren** — kopieer gegenereerde HTML naar klembord (klaar om in email client te plakken)
- **Downloaden** — sla de HTML op als bestand
- **Importeren** — laad eerder opgeslagen instellingen terug

---

## 💻 Hoe te gebruiken

1. Vul je **persoonlijke gegevens** in het tabblad **Persoonlijk**
2. Schakel naar tabblad **Bedrijf** en vul bedrijfsgegevens in
3. Bekijk de **live preview** aan de rechterkant — deze update real-time terwijl je typt
4. (Optioneel) Voeg een promotiebanner toe via "Toon banner in Handtekening"
5. Klik **Kopieren** om de HTML naar je klembord te kopiëren
6. Plak in je email client (Outlook, Gmail, Thunderbird, etc.)

**Of:**
- Klik **Downloaden** om het gegenereerde bestand te bewaren
- Klik **Importeren** om eerder opgeslagen instellingen in te laden

---

## 🎨 Banners toevoegen — volledig stappenplan

Volg **beide** stappen hieronder om een nieuwe banner volledig werkend in te stellen:

### Stap 1: Banner-gegevens toevoegen in `assets/js/main.js`

1. Open `assets/js/main.js` in je editor
2. Zoek bovenaan het bestand de constante `BANNER_VARIANTEN`
3. Voeg je banner toe **na** `meesterChallenge` (let op: komma na vorige banner!):

```js
const BANNER_VARIANTEN = {
  techniekToekomst: {
    image: 'https://www.technolableiden.nl/wp-content/uploads/2026/05/e-mail-handtekening-intern-1.png',
    link: 'https://www.technolableiden.nl/zijinstromer-techniek-en-toekomst/',
    alt: 'Techniek & Toekomst banner'
  },
  meesterChallenge: {
    image: 'https://www.technolableiden.nl/wp-content/uploads/2026/02/meesterchallenge-banner-scaled.png',
    link: 'https://www.technolableiden.nl/zijinstromers/meesterchallenge-2/',
    alt: 'Meester Challenge banner'
  },
  mijnNieuweBanner: {
    image: 'https://example.com/mijn-banner.jpg',
    link: 'https://voorbeeld.nl',
    alt: 'Mijn nieuwe banner'
  }
};
```

4. Sla `main.js` op (Ctrl+S)

### Stap 2: Dropdown-optie toevoegen in `index.php`

1. Open `index.php` in je editor
2. Zoek naar `<select id="bannerType">` (omstreeks regel 120)
3. Voeg je optie toe **na** de bestaande opties:

```html
<select id="bannerType">
  <option value="techniekToekomst" selected>Techniek &amp; Toekomst</option>
  <option value="meesterChallenge">Meester Challenge</option>
  <option value="mijnNieuweBanner">Mijn nieuwe banner</option>
</select>
```

4. Sla `index.php` op (Ctrl+S)

### Stap 3: Testen

1. **Hard refresh** de pagina in je browser: **Ctrl+F5** (Windows) of **Cmd+Shift+R** (Mac)
2. Ga naar het tabblad **Persoonlijk**
3. Vink het vakje **"Toon banner in Handtekening"** aan
4. Open de dropdown bij **"Banner keuze"**
5. Je nieuwe banner **"Mijn nieuwe banner"** moet nu zichtbaar zijn
6. Selecteer je banner en bekijk de preview

### ⚠️ Checklist voor je banner

- [ ] `value` in de `<option>` (bijv. `mijnNieuweBanner`) moet **exact** gelijk zijn aan de key in `BANNER_VARIANTEN`
- [ ] Afbeelding-URL is **publiek bereikbaar** (https, geen login/intra)
- [ ] `image` en `link` zijn beide **volledige URLs** (incl. https://)
- [ ] Komma's staan juist in `BANNER_VARIANTEN` (na elke banner behalve de laatste)
- [ ] Hard refresh (Ctrl+F5) na wijzigen van bestanden

---

## 🛠️ Technische details

### HTML (index.php)
- HTML5 semantische markup
- Responsive flexbox layout
- Twee-koloms design (formulier links, preview rechts)
- Tabblad navigatie met buttons

### CSS (assets/css/style.css)
- CSS variabelen voor kleuren (paars, groen, wit)
- Mobile-responsive grid & flexbox
- Technolab Leiden brand colors
- Custom form styling

### JavaScript (assets/js/main.js)
- Real-time form validation (telefoon, email)
- Werkdagen logica
- Banner selectie & preview
- HTML-veiligheid (XSS preventie)
- Copy to clipboard
- Download bestand
- Import/export JSON

### Template (assets/js/template.js)
- Email-client compatible HTML
- Outlook-compatible tabel layout
- Inline CSS styling
- Responsive afbeeldingen

---

## 📝 Veelgestelde vragen

**V: Mijn afbeelding laadt niet in de preview**
> Zorg dat de URL (1) publiek bereikbaar is, (2) HTTPS gebruikt, en (3) geen login/intra vereist.

**V: Wat gebeurt er als ik de HTML handtekening in Outlook plak?**
> Het zou net zo moeten uitzien als in de preview. Outlook ondersteunt inline CSS en tabel-gebaseerde layouts.

**V: Kan ik een eigen template gebruiken?**
> Ja! Pas `assets/js/template.js` aan met je eigen HTML/CSS. Zorg wel dat je de placeholder variabelen (bijv. `(Naam)`) behoudt.

**V: Hoe sla ik mijn instellingen op?**
> Klik **Downloaden** om een JSON-bestand te bewaren. Laad het later in met **Importeren**.

**V: Werkt dit offline?**
> Gedeeltelijk — de editor werkt offline, maar banner-afbeeldingen en externe iconen (icons8.com) moeten online geladen worden.

---

## 📄 Licentie & Credits

Gemaakt voor **Technolab Leiden**  
Pictogrammen via [icons8.com](https://icons8.com)

---

## 🔗 Meer informatie

Voor gedetailleerde gebruikshandleiding: [Gebruiksaanwijzing (SharePoint)](https://technolableiden.sharepoint.com/:w:/s/ToekomstTaal9/IQBGHwU9PmDOSa9nR4-sUBVtAaPHfido96yN6DCq6FflnBE?e=8pP5mp)


