'use strict';

// Alterna entre o tema escuro e o tema claro.
const themeToggle = document.querySelector('#theme-toggle');
const printButton = document.querySelector('#print-cv');
const toast = document.querySelector('#toast');
const navLinks = [...document.querySelectorAll('.main-nav a')];
let toastTimeout;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('visible'), 2800);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    themeToggle.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    themeToggle.setAttribute('title', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    showToast(isLight ? 'Tema claro ativado' : 'Tema escuro ativado');
  });
}

// Abre a janela de impressão. Nela, é possível escolher "Salvar como PDF".
if (printButton) {
  printButton.addEventListener('click', () => window.print());
}

// Revela os blocos suavemente ao entrar na área visível da página.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}

// Destaca a seção atual na navegação em telas nas quais o menu é exibido.
const observedSections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-25% 0px -60% 0px' });

  observedSections.forEach(section => sectionObserver.observe(section));
}
