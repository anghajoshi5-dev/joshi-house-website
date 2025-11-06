// Joshi House Pictures — interactions (final)

// Smooth scroll for nav links that point to anchors
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // update focus for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

// Contact form handler — opens the user's email client with prefilled subject/body
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') || {}).value?.trim() || 'Anonymous';
    const email = (document.getElementById('email') || {}).value?.trim() || '';
    const message = (document.getElementById('message') || {}).value?.trim() || '';

    const subject = encodeURIComponent(`Website contact from ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    // change the recipient if you want; currently placeholder hello@joshi.house
    window.location.href = `mailto:hello@joshi.house?subject=${subject}&body=${body}`;
  });
})();

// Set avatar and logo initials if empty
(function setInitials() {
  const avatar = document.querySelector('.avatar');
  const badge = document.querySelector('.logo-badge');

  function initialsFromTitle(title) {
    if (!title) return 'JH';
    const parts = title.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
  }

  const siteTitleEl = document.querySelector('.logo-title');
  const fallback = 'JH';
  const initials = initialsFromTitle(siteTitleEl?.textContent || '');

  if (avatar && !avatar.textContent.trim()) avatar.textContent = initials || fallback;
  if (badge && !badge.textContent.trim()) badge.textContent = initials[0] || fallback[0];
})();
