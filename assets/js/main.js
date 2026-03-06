const els = {
  name: document.getElementById('name'),
  role: document.getElementById('role'),
  phone: document.getElementById('phone'),
  email: document.getElementById('email'),
  emailSuggestion: document.getElementById('emailSuggestion'),
  companyPhone: document.getElementById('companyPhone'),
  companyDetails: document.getElementById('companyDetails'),
  address: document.getElementById('address'),
  websiteLink: document.getElementById('websiteLink'),
  websiteName: document.getElementById('websiteName'),
  logo: document.getElementById('logo'),
  banner: document.getElementById('banner'),
  divider: document.getElementById('divider'),
  preview: document.getElementById('preview'),
  htmlOut: document.getElementById('htmlOut'),
  copyBtn: document.getElementById('copyBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  showBanner: document.getElementById('showBanner'),
  logoLink: document.getElementById('logoLink'),
  bannerLink: document.getElementById('bannerLink')
};

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getSelectedDays() {
  const days = [...document.querySelectorAll('.day-checkbox')]
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  return days;
}

function formatDaysNl(days) {
  if (days.length === 0) return '(aanwezig)';
  if (days.length === 5) return 'werkdagen: ma t/m vr';
  return 'werkdagen: ' + days.join(', ');
}

function validatePhone() {
  const phone = els.phone.value.trim();
  const pattern = /^\+?[0-9\s-]{9,}$/;
  const valid = pattern.test(phone);
  document.getElementById('phoneError').style.display =
    valid || phone === '' ? 'none' : 'block';
  return valid || phone === '';
}

function generate() {
  const days = getSelectedDays();
  let out = signatureTemplate;

  const map = {
    '(Naam)': escapeHtml(els.name.value) || '(Naam)',
    '(functie)': escapeHtml(els.role.value) || '(functie)',
    '(aanwezig)': formatDaysNl(days),
    '(tel.)': escapeHtml(els.phone.value) || '(tel.)',
    '(e-mailadres)': escapeHtml(els.email.value) || '(e-mailadres)',

    // logo & banner (alleen URLs, geen namen)
    '(LOGO)': els.logo.value || 'https://www.technolableiden.nl/wp-content/uploads/2026/02/tl_logo.gif',
    '(BANNER)': els.banner.value || 'https://www.technolableiden.nl/wp-content/uploads/2026/02/meesterchallenge-banner-scaled.png',

    '(DIVIDER)': els.divider.value || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAADrCAIAAADMn9A5AAAAH0lEQVR4nGP01mtmYGBgYmBgGKVGqVFqlBqlRinaUAA+TALSkyaMuAAAAABJRU5ErkJggg==',

    '(COMPANY_PHONE)': escapeHtml(els.companyPhone.value || '071 519 13 24'),

    // nieuwe website placeholders: link + zichtbare naam
    '(WEBSITE_LINK)': els.websiteLink.value || 'https://www.technolableiden.nl',
    '(WEBSITE_NAME)': escapeHtml(els.websiteName.value) || 'technolableiden.nl',

    // klikbestemmingen voor logo en banner
    '(LOGO_LINK)': els.logoLink.value || 'https://www.technolableiden.nl/',
    '(BANNER_LINK)': els.bannerLink.value || 'https://www.technolableiden.nl/zijinstromers/meesterchallenge-2/'
  };

  // Adres vervangen
  let addr = (els.address.value || 'Bètaplein 28\n2321KS Leiden')
    .split('\n')
    .map(l => escapeHtml(l))
    .join('<br>');
  out = out.replace('Bètaplein 28<br>2321KS Leiden', addr);

  // Kies juiste blok: mét banner of alleen social links
  const bannerBlock = els.showBanner.checked ? bannerWithSocial : socialOnlyFullWidth;
  out = out.replace('(BANNER_AND_SOCIAL)', bannerBlock);

  // Alle placeholders vervangen
  for (const k in map) {
    out = out.split(k).join(map[k]);
  }

  els.preview.srcdoc = out;
  els.htmlOut.value = out;
}

// Email suggestion behavior
const DOMAIN = 'technolableiden.nl';

function showEmailSuggestion(show) {
  if (!els.emailSuggestion) return;
  if (show) els.emailSuggestion.classList.remove('hidden');
  else els.emailSuggestion.classList.add('hidden');
}

function acceptEmailSuggestion() {
  const v = els.email.value || '';
  const parts = v.split('@');
  const local = parts[0] || '';
  els.email.value = local + '@' + DOMAIN;
  showEmailSuggestion(false);
  generate();
  // move caret to end
  els.email.setSelectionRange(els.email.value.length, els.email.value.length);
  els.email.focus();
}

els.email.addEventListener('input', e => {
  const v = e.target.value || '';
  // Show suggestion when user types '@' or ends with '@'
  if (v.endsWith('@')) {
    showEmailSuggestion(true);
  } else {
    showEmailSuggestion(false);
  }
});

els.showBanner.addEventListener('change', generate);

// Accept suggestion by clicking it
els.emailSuggestion && els.emailSuggestion.addEventListener('click', acceptEmailSuggestion);

// Accept suggestion with Tab or Enter when visible
els.email.addEventListener('keydown', e => {
  if (!els.emailSuggestion || els.emailSuggestion.classList.contains('hidden')) return;
  if (e.key === 'Tab' || e.key === 'Enter') {
    e.preventDefault();
    acceptEmailSuggestion();
  }
});

// Checkboxen voor werkdagen triggeren ook generate
document.querySelectorAll('.day-checkbox').forEach(cb => {
  cb.addEventListener('change', generate);
});

// Telefoonveld validatie
els.phone.addEventListener('input', function () {
  validatePhone();
  generate();
});

// regenerate preview when company section is toggled
els.companyDetails && els.companyDetails.addEventListener('toggle', () => generate());

els.copyBtn.addEventListener('click', async () => {
  const html = els.htmlOut.value;

  // Desktop moderne browsers
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      const blob = new Blob([html], { type: 'text/html' });
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': new Blob([html], { type: 'text/plain' })
      });
      await navigator.clipboard.write([item]);
      showCopied();
      return;
    } catch (e) {
      console.warn('Clipboard API faalde, fallback wordt gebruikt.');
    }
  }

  // Mobiele fallback
  const textarea = document.createElement('textarea');
  textarea.value = html;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 999999); // iOS fix
  document.execCommand('copy');
  document.body.removeChild(textarea);

  showCopied();
});

function showCopied() {
  els.copyBtn.textContent = '✓ Gekopieerd!';
  els.copyBtn.classList.add('copied');
  setTimeout(() => {
    els.copyBtn.textContent = '📋 Kopieer voor Outlook';
    els.copyBtn.classList.remove('copied');
  }, 2000);
}

els.downloadBtn.addEventListener('click', () => {
  const blob = new Blob([els.htmlOut.value], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emailhandtekening-technolab.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// initial render
generate();
