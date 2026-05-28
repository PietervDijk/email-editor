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
  }
};

// De website blijft vast, zodat de editor eenvoudig te begrijpen blijft.
const VASTE_WEBSITE_LINK = 'https://www.technolableiden.nl/';

const elementen = {
  naam: document.getElementById('name'),
  functie: document.getElementById('role'),
  telefoon: document.getElementById('phone'),
  emailAdres: document.getElementById('email'),
  emailSuggestie: document.getElementById('emailSuggestion'),
  bedrijfsTelefoon: document.getElementById('companyPhone'),
  bedrijfsDetails: document.getElementById('companyDetails'),
  adres: document.getElementById('address'),
  websiteNaam: document.getElementById('websiteName'),
  logoAfbeelding: document.getElementById('logo'),
  scheidingsAfbeelding: document.getElementById('divider'),
  voorvertoning: document.getElementById('preview'),
  htmlUit: document.getElementById('htmlOut'),
  kopieerKnop: document.getElementById('copyBtn'),
  downloadKnop: document.getElementById('downloadBtn'),
  toonBanner: document.getElementById('showBanner'),
  bannerSoort: document.getElementById('bannerType'),
  logoKoppeling: document.getElementById('logoLink'),
  importKnop: document.getElementById('importBtn'),
  importBestand: document.getElementById('importFile')
};

function maakHtmlVeilig(tekst) {
  return String(tekst || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function haalGeselecteerdeDagenOp() {
  return [...document.querySelectorAll('.day-checkbox')]
    .filter(vakje => vakje.checked)
    .map(vakje => vakje.value);
}

function maakDagTekst(dagen) {
  if (dagen.length === 0) return '(aanwezig)';
  if (dagen.length === 5) return 'werkdagen: ma t/m vr';
  return 'werkdagen: ' + dagen.join(', ');
}

function haalGekozenBannerOp() {
  return BANNER_VARIANTEN[elementen.bannerSoort?.value] || BANNER_VARIANTEN.techniekToekomst;
}

function werkBannerVoorbeeldBij(banner) {
  const bannerVoorbeeld = document.getElementById('bannerPreview');
  const bannerVoorbeeldAfbeelding = document.getElementById('bannerPreviewImg');

  if (elementen.toonBanner.checked) {
    bannerVoorbeeld.style.display = 'block';
    bannerVoorbeeldAfbeelding.src = banner.image;
    bannerVoorbeeldAfbeelding.alt = banner.alt;
  } else {
    bannerVoorbeeld.style.display = 'none';
  }
}

function controleerTelefoon() {
  const telefoon = elementen.telefoon.value.trim();
  const patroon = /^\+?[0-9\s-]{9,}$/;
  const geldig = patroon.test(telefoon);

  document.getElementById('phoneError').style.display =
    geldig || telefoon === '' ? 'none' : 'block';

  return geldig || telefoon === '';
}

function genereerHandtekening() {
  const dagen = haalGeselecteerdeDagenOp();
  const banner = haalGekozenBannerOp();
  let html = signatureTemplate;

  const vervangingen = {
    '(Naam)': maakHtmlVeilig(elementen.naam.value) || '(Naam)',
    '(functie)': maakHtmlVeilig(elementen.functie.value) || '(functie)',
    '(aanwezig)': maakDagTekst(dagen),
    '(tel.)': maakHtmlVeilig(elementen.telefoon.value) || '(tel.)',
    '(e-mailadres)': maakHtmlVeilig(elementen.emailAdres.value) || '(e-mailadres)',
    '(LOGO)': elementen.logoAfbeelding.value || 'https://www.technolableiden.nl/wp-content/uploads/2026/02/tl_logo.gif',
    '(BANNER)': banner.image,
    '(DIVIDER)': elementen.scheidingsAfbeelding.value || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAADrCAIAAADMn9A5AAAAH0lEQVR4nGP01mtmYGBgYmBgGKVGqVFqlBqlRinaUAA+TALSkyaMuAAAAABJRU5ErkJggg==',
    '(COMPANY_PHONE)': maakHtmlVeilig(elementen.bedrijfsTelefoon.value || '071 519 13 24'),
    '(WEBSITE_LINK)': VASTE_WEBSITE_LINK,
    '(WEBSITE_NAME)': maakHtmlVeilig(elementen.websiteNaam.value) || 'technolableiden.nl',
    '(LOGO_LINK)': elementen.logoKoppeling?.value || 'https://www.technolableiden.nl/',
    '(BANNER_LINK)': banner.link
  };

  // De standaard adresregel uit de template wordt hier vervangen.
  const adres = (elementen.adres.value || 'Bètaplein 28\n2321KS Leiden')
    .split('\n')
    .map(regel => maakHtmlVeilig(regel))
    .join('<br>');
  html = html.replace('Bètaplein 28<br>2321KS Leiden', adres);

  // Hier kiezen we het volledige bannerblok of alleen de social links.
  const bannerBlok = elementen.toonBanner.checked ? bannerMetSocial : alleenSocialBreed;
  html = html.replace('(BANNER_AND_SOCIAL)', bannerBlok);

  werkBannerVoorbeeldBij(banner);

  for (const placeholder in vervangingen) {
    html = html.split(placeholder).join(vervangingen[placeholder]);
  }

  elementen.voorvertoning.srcdoc = html;
  elementen.htmlUit.value = html;
}

const EMAIL_DOMEIN = 'technolableiden.nl';

function toonEmailSuggestie(zichtbaar) {
  if (!elementen.emailSuggestie) return;
  if (zichtbaar) {
    elementen.emailSuggestie.classList.remove('hidden');
  } else {
    elementen.emailSuggestie.classList.add('hidden');
  }
}

function accepteerEmailSuggestie() {
  const waarde = elementen.emailAdres.value || '';
  const delen = waarde.split('@');
  const lokaalDeel = delen[0] || '';

  elementen.emailAdres.value = lokaalDeel + '@' + EMAIL_DOMEIN;
  toonEmailSuggestie(false);
  genereerHandtekening();
  elementen.emailAdres.setSelectionRange(elementen.emailAdres.value.length, elementen.emailAdres.value.length);
  elementen.emailAdres.focus();
}

elementen.emailAdres.addEventListener('input', event => {
  const waarde = event.target.value || '';
  if (waarde.endsWith('@')) {
    toonEmailSuggestie(true);
  } else {
    toonEmailSuggestie(false);
  }
});

elementen.toonBanner.addEventListener('change', genereerHandtekening);
elementen.bannerSoort && elementen.bannerSoort.addEventListener('change', genereerHandtekening);
elementen.emailSuggestie && elementen.emailSuggestie.addEventListener('click', accepteerEmailSuggestie);

elementen.emailAdres.addEventListener('keydown', event => {
  if (!elementen.emailSuggestie || elementen.emailSuggestie.classList.contains('hidden')) return;
  if (event.key === 'Tab' || event.key === 'Enter') {
    event.preventDefault();
    accepteerEmailSuggestie();
  }
});

// Werkdagen veranderen direct de tekst, dus we genereren opnieuw bij elk vakje.
document.querySelectorAll('.day-checkbox').forEach(vakje => {
  vakje.addEventListener('change', genereerHandtekening);
});

// Telefoon krijgt meteen validatiefeedback en een nieuwe preview.
elementen.telefoon.addEventListener('input', () => {
  controleerTelefoon();
  genereerHandtekening();
});

elementen.bedrijfsDetails && elementen.bedrijfsDetails.addEventListener('toggle', () => genereerHandtekening());

elementen.kopieerKnop.addEventListener('click', async () => {
  const html = elementen.htmlUit.value;

  // Eerst proberen we de moderne clipboard-API.
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': new Blob([html], { type: 'text/plain;charset=utf-8' })
      });
      await navigator.clipboard.write([item]);
      toonGekopieerd();
      return;
    } catch (error) {
      console.warn('Clipboard API faalde, fallback wordt gebruikt.');
    }
  }

  // Fallback voor browsers of situaties waarin kopiëren niet lukt.
  const textarea = document.createElement('textarea');
  textarea.value = html;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 999999);
  document.execCommand('copy');
  document.body.removeChild(textarea);

  toonGekopieerd();
});

function toonGekopieerd() {
  elementen.kopieerKnop.textContent = '✓ Gekopieerd!';
  elementen.kopieerKnop.classList.add('copied');

  setTimeout(() => {
    elementen.kopieerKnop.textContent = '📋 Kopieer voor Outlook';
    elementen.kopieerKnop.classList.remove('copied');
  }, 2000);
}

elementen.downloadKnop.addEventListener('click', () => {
  // BOM helpt Outlook en sommige editors om UTF-8 goed te lezen.
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + elementen.htmlUit.value], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emailhandtekening-technolab.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

elementen.importKnop.addEventListener('click', () => {
  elementen.importBestand.click();
});

elementen.importBestand.addEventListener('change', gebeurtenis => {
  const bestand = gebeurtenis.target.files[0];
  if (!bestand) return;

  const lezer = new FileReader();
  lezer.onload = event => {
    try {
      const htmlInhoud = event.target.result;
      const parser = new DOMParser();
      const geimporteerdDocument = parser.parseFromString(htmlInhoud, 'text/html');

      const naamElement = geimporteerdDocument.querySelector('.sig-container div[style*="color:#4B2E83"]');
      if (naamElement) elementen.naam.value = naamElement.textContent.trim();

      const emailRij = Array.from(geimporteerdDocument.querySelectorAll('table.two-col tr td table tr')).find(rij =>
        rij.querySelector('img[src*="new-post"]')
      );
      if (emailRij) {
        const emailTekst = emailRij.querySelector('td:last-child')?.textContent.trim();
        if (emailTekst && emailTekst !== '(e-mailadres)' && emailTekst.includes('@')) {
          elementen.emailAdres.value = emailTekst;
        }
      }

      const telefoonRij = Array.from(geimporteerdDocument.querySelectorAll('table.two-col tr td table tr')).find(rij =>
        rij.querySelector('img[src*="phone"]')
      );
      if (telefoonRij) {
        const telefoonTekst = telefoonRij.querySelector('td:last-child')?.textContent.trim();
        if (telefoonTekst && telefoonTekst !== '(tel.)') {
          elementen.telefoon.value = telefoonTekst;
        }
      }

      const functieRij = Array.from(geimporteerdDocument.querySelectorAll('table.two-col tr td table tr')).find(rij =>
        rij.querySelector('img[src*="user"]')
      );
      if (functieRij) {
        const functieTekst = functieRij.querySelector('td:last-child')?.innerHTML;
        if (functieTekst) {
          const delen = functieTekst.split('<br>');
          if (delen[0] && delen[0] !== '(functie)') {
            elementen.functie.value = delen[0].trim();
          }

          if (delen[1]) {
            const werkdagenTekst = delen[1].trim();
            document.querySelectorAll('.day-checkbox').forEach(vakje => vakje.checked = false);

            if (werkdagenTekst.includes('ma t/m vr')) {
              document.querySelectorAll('.day-checkbox').forEach(vakje => vakje.checked = true);
            } else if (werkdagenTekst.includes('werkdagen:')) {
              const dagen = werkdagenTekst.replace('werkdagen:', '').trim().split(',').map(dag => dag.trim());
              dagen.forEach(dag => {
                const vakje = document.querySelector(`.day-checkbox[value="${dag}"]`);
                if (vakje) vakje.checked = true;
              });
            }
          }
        }
      }

      const adresRij = Array.from(geimporteerdDocument.querySelectorAll('table.two-col tr td table tr')).find(rij =>
        rij.querySelector('img[src*="marker"]')
      );
      if (adresRij) {
        const adresHtml = adresRij.querySelector('td:last-child')?.innerHTML;
        if (adresHtml) {
          const adresTekst = adresHtml.split('<br>').map(regel => regel.trim()).join('\n');
          if (adresTekst && !adresTekst.includes('(adres)')) {
            elementen.adres.value = adresTekst;
          }
        }
      }

      const websiteRij = Array.from(geimporteerdDocument.querySelectorAll('table.two-col tr td table tr')).find(rij =>
        rij.querySelector('img[src*="domain"]')
      );
      if (websiteRij) {
        const websiteLink = websiteRij.querySelector('a[href]');
        if (websiteLink) {
          elementen.websiteNaam.value = websiteLink.textContent.trim();
        }
      }

      const bedrijfsTelefoonRijen = Array.from(geimporteerdDocument.querySelectorAll('table.two-col tr td table tr')).filter(rij =>
        rij.querySelector('img[src*="phone"]')
      );
      if (bedrijfsTelefoonRijen.length > 1) {
        const telefoonTekst = bedrijfsTelefoonRijen[1].querySelector('td:last-child')?.textContent.trim();
        if (telefoonTekst) {
          elementen.bedrijfsTelefoon.value = telefoonTekst;
        }
      }

      const logoAfbeelding = geimporteerdDocument.querySelector('img[alt*="Technolab"]');
      if (logoAfbeelding) {
        elementen.logoAfbeelding.value = logoAfbeelding.getAttribute('src');
        const logoKoppeling = logoAfbeelding.closest('a');
        if (logoKoppeling) {
          elementen.logoKoppeling.value = logoKoppeling.getAttribute('href');
        }
      }

      const scheidingsAfbeelding = geimporteerdDocument.querySelector('td.vertical-divider img, td[rowspan] img');
      if (scheidingsAfbeelding) {
        const scheidingsBron = scheidingsAfbeelding.getAttribute('src');
        if (scheidingsBron && !scheidingsBron.startsWith('data:image')) {
          elementen.scheidingsAfbeelding.value = scheidingsBron;
        }
      }

      const bannerAfbeelding = geimporteerdDocument.querySelector('img[width="520"], img[alt*="banner"]');
      if (bannerAfbeelding) {
        elementen.toonBanner.checked = true;
        const bannerBron = bannerAfbeelding.getAttribute('src') || '';
        const bannerKoppeling = bannerAfbeelding.closest('a');

        if (bannerBron.includes('meesterchallenge')) {
          elementen.bannerSoort.value = 'meesterChallenge';
        } else {
          elementen.bannerSoort.value = 'techniekToekomst';
        }

        if (bannerKoppeling && bannerKoppeling.getAttribute('href')) {
          const href = bannerKoppeling.getAttribute('href');
          if (href.includes('meesterchallenge')) {
            elementen.bannerSoort.value = 'meesterChallenge';
          }
        }
      } else {
        elementen.toonBanner.checked = false;
      }

      genereerHandtekening();

      const oorspronkelijkeTekst = elementen.importKnop.innerHTML;
      elementen.importKnop.innerHTML = '<span class="btn-icon">✓</span><span>Geïmporteerd!</span>';
      elementen.importKnop.classList.add('imported');
      setTimeout(() => {
        elementen.importKnop.innerHTML = oorspronkelijkeTekst;
        elementen.importKnop.classList.remove('imported');
      }, 2000);
    } catch (error) {
      alert('Fout bij het laden van het HTML-bestand. Controleer of het een geldig handtekening-bestand is.');
      console.error('Import error:', error);
    }
  };

  lezer.readAsText(bestand);
  gebeurtenis.target.value = '';
});

// De eerste render zorgt direct voor een kloppende preview.
genereerHandtekening();

// Backwards-compatibiliteit: sommige plekken in de HTML gebruiken
// nog `oninput="generate()"`. Maak een kleine alias zodat die
// oude globale functie blijft werken.
window.generate = function () {
  try {
    genereerHandtekening();
  } catch (e) {
    console.error('generate alias faalde:', e);
  }
};
