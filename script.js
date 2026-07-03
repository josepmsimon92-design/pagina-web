// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
  });
}

// ── Año automático en el footer ──
document.querySelectorAll('.footer__year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Contact form (Web3Forms · envío AJAX) ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const isCa = document.documentElement.lang === 'ca';
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.textContent;
    const fd = new FormData(contactForm);
    const origen = fd.get('form-name') || 'contacto';
    const nombre = fd.get('nombre') || '';
    const servicioSel = contactForm.querySelector('[name="servicio"]');
    const servicioTxt = servicioSel && servicioSel.selectedIndex > 0
      ? servicioSel.options[servicioSel.selectedIndex].textContent
      : '-';
    const payload = {
      access_key: 'fa012fe6-b65d-4ef1-ad19-def51c1e530f',
      subject: 'Nuevo contacto web (' + origen + ') · ' + nombre,
      from_name: 'Formulario de contacto EPCA',
      replyto: fd.get('email') || '',
      botcheck: fd.get('bot-field') || '',
      'Origen': origen,
      'Idioma': isCa ? 'ca' : 'es',
      'Nombre': nombre,
      'Email': fd.get('email') || '',
      'Teléfono': fd.get('telefono') || '-',
      'Tipo de consulta': servicioTxt,
      'Mensaje': fd.get('mensaje') || '',
      'Privacidad': 'Aceptada'
    };
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = isCa ? 'Enviant…' : 'Enviando…';
    const finish = ok => {
      submitBtn.disabled = false;
      submitBtn.textContent = btnText;
      if (ok) {
        if (success) success.style.display = 'block';
        contactForm.reset();
        setTimeout(() => { if (success) success.style.display = 'none'; }, 8000);
      } else if (error) {
        error.style.display = 'block';
      }
    };
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(d => finish(!!(d && d.success)))
      .catch(() => finish(false));
  });
}

// ── Smooth navbar shadow on scroll ──
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow =
      window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.25)' : '0 2px 12px rgba(0,0,0,0.18)';
  });
}
