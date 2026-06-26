(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('paramount-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('paramount-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  function setActiveNav() {
    const current = document.body.dataset.page;
    document.querySelectorAll('[data-nav]').forEach((link) => {
      if (link.dataset.nav === current) link.classList.add('active');
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach((button) => {
      button.addEventListener('click', async () => {
        const value = button.dataset.copy;
        const confirm = button.parentElement.querySelector('.copy-confirm');
        try {
          await navigator.clipboard.writeText(value);
          if (confirm) {
            confirm.classList.add('visible');
            setTimeout(() => confirm.classList.remove('visible'), 1400);
          }
        } catch (error) {
          window.prompt('Copy this URL:', value);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(initialTheme);
    setActiveNav();
    setupCopyButtons();

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    });
  });
}());
