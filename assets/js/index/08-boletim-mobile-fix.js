// Correção mobile do Boletim Informativo integrado
// Este arquivo força o calendário dentro do iframe a usar layout compacto no celular.
(function () {
  const MOBILE_QUERY = '(max-width: 768px)';

  function cssBoletimMobile() {
    return `
      @media (max-width: 768px) {
        html.ensps-mobile-compact,
        html.ensps-mobile-compact body.page-boletim,
        body.page-boletim.ensps-mobile-compact {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          display: block !important;
          background: #0b0d1a !important;
        }
        body.page-boletim.ensps-mobile-compact .content-wrapper {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          overflow-x: hidden !important;
        }
        body.page-boletim.ensps-mobile-compact .main-content {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          padding: 8px 8px 104px !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          overflow-x: hidden !important;
        }
        body.page-boletim.ensps-mobile-compact .sidebar,
        body.page-boletim.ensps-mobile-compact .hero-banner,
        body.page-boletim.ensps-mobile-compact .calendar-switcher,
        body.page-boletim.ensps-mobile-compact .calendar-management,
        body.page-boletim.ensps-mobile-compact .footer,
        body.page-boletim.ensps-mobile-compact .pdf-button {
          display: none !important;
        }
        body.page-boletim.ensps-mobile-compact .calendar-navigation {
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          display: grid !important;
          grid-template-columns: 42px 1fr 42px !important;
          gap: 7px !important;
          align-items: center !important;
          padding: 8px !important;
          margin: 0 0 8px !important;
          border-radius: 16px !important;
          box-sizing: border-box !important;
        }
        body.page-boletim.ensps-mobile-compact .calendar-navigation button {
          width: 42px !important;
          min-width: 42px !important;
          height: 42px !important;
          min-height: 42px !important;
          padding: 0 !important;
          margin: 0 !important;
          border-radius: 14px !important;
          font-size: 0 !important;
          overflow: hidden !important;
        }
        body.page-boletim.ensps-mobile-compact #prevMonthBtn::before { content: '‹'; font-size: 1.85rem; font-weight: 900; }
        body.page-boletim.ensps-mobile-compact #nextMonthBtn::before { content: '›'; font-size: 1.85rem; font-weight: 900; }
        body.page-boletim.ensps-mobile-compact .calendar-navigation h2 {
          min-width: 0 !important;
          margin: 0 !important;
          font-size: 1rem !important;
          line-height: 1.15 !important;
          text-align: center !important;
          white-space: normal !important;
        }
        body.page-boletim.ensps-mobile-compact .school-days-counter {
          grid-column: 1 / -1 !important;
          width: 100% !important;
          min-width: 0 !important;
          padding: 6px 10px !important;
          border-radius: 999px !important;
          font-size: .76rem !important;
          box-sizing: border-box !important;
        }
        body.page-boletim.ensps-mobile-compact #calendar-wrapper,
        body.page-boletim.ensps-mobile-compact .month,
        body.page-boletim.ensps-mobile-compact .month-info {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
          overflow: visible !important;
        }
        body.page-boletim.ensps-mobile-compact .month {
          padding: 8px !important;
          border-radius: 18px !important;
          margin: 0 0 10px !important;
        }
        body.page-boletim.ensps-mobile-compact .days-grid {
          display: grid !important;
          grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
          gap: 5px !important;
          width: 100% !important;
          min-width: 0 !important;
        }
        body.page-boletim.ensps-mobile-compact .day-name {
          font-size: 0 !important;
          letter-spacing: 0 !important;
          padding: 0 0 5px !important;
          margin: 0 !important;
          border: 0 !important;
          min-width: 0 !important;
        }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(1)::after { content: 'D'; }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(2)::after { content: 'S'; }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(3)::after { content: 'T'; }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(4)::after { content: 'Q'; }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(5)::after { content: 'Q'; }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(6)::after { content: 'S'; }
        body.page-boletim.ensps-mobile-compact .day-name:nth-child(7)::after { content: 'S'; }
        body.page-boletim.ensps-mobile-compact .day-name::after {
          display: block !important;
          font-size: .66rem !important;
          font-weight: 900 !important;
          text-align: center !important;
        }
        body.page-boletim.ensps-mobile-compact .day,
        body.page-boletim.ensps-mobile-compact .empty-day {
          min-width: 0 !important;
          width: auto !important;
          min-height: 44px !important;
          height: 44px !important;
          padding: 3px !important;
          border-radius: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
          box-shadow: none !important;
        }
        body.page-boletim.ensps-mobile-compact .day-number {
          font-size: .95rem !important;
          line-height: 1 !important;
          margin: 0 !important;
          font-weight: 900 !important;
        }
        body.page-boletim.ensps-mobile-compact .event-text {
          display: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          font-size: 0 !important;
          line-height: 0 !important;
        }
        body.page-boletim.ensps-mobile-compact .event-indicator {
          display: block !important;
          position: absolute !important;
          width: 8px !important;
          height: 8px !important;
          top: 5px !important;
          right: 5px !important;
          border-radius: 50% !important;
          border: 1px solid rgba(255,255,255,.8) !important;
        }
        body.page-boletim.ensps-mobile-compact .day.has-event,
        body.page-boletim.ensps-mobile-compact .day.holiday,
        body.page-boletim.ensps-mobile-compact .day.non-school-day {
          border-width: 2px !important;
        }
        body.page-boletim.ensps-mobile-compact .month-info {
          margin-top: 10px !important;
          padding: 12px !important;
          border-radius: 16px !important;
          min-height: 0 !important;
        }
        body.page-boletim.ensps-mobile-compact .month-info h4 {
          font-size: 1rem !important;
          margin: 0 0 10px !important;
        }
        body.page-boletim.ensps-mobile-compact .month-info ul {
          display: grid !important;
          gap: 8px !important;
          padding: 0 !important;
        }
        body.page-boletim.ensps-mobile-compact .month-event-item {
          display: grid !important;
          grid-template-columns: 58px minmax(0, 1fr) !important;
          gap: 8px !important;
          align-items: center !important;
          padding: 10px !important;
          border-radius: 14px !important;
          min-width: 0 !important;
        }
        body.page-boletim.ensps-mobile-compact .month-event-item .event-date-display {
          min-width: 0 !important;
          font-size: .76rem !important;
        }
        body.page-boletim.ensps-mobile-compact .month-event-item input[type='text'] {
          width: 100% !important;
          min-width: 0 !important;
          font-size: .84rem !important;
          min-height: 38px !important;
        }
        body.page-boletim.ensps-mobile-compact .day,
        body.page-boletim.ensps-mobile-compact .empty-day {
          aspect-ratio: 1 / 1 !important;
          height: auto !important;
          min-height: 42px !important;
          max-height: 52px !important;
          overflow: hidden !important;
          contain: layout paint !important;
        }
        body.page-boletim.ensps-mobile-compact .day .event-text,
        body.page-boletim.ensps-mobile-compact .day.has-event .event-text,
        body.page-boletim.ensps-mobile-compact .day.selected .event-text {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          max-width: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
          font-size: 0 !important;
          line-height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          pointer-events: none !important;
        }
      }
    `;
  }

  function removerTextosDosQuadrinhos(doc) {
    if (!doc || !doc.querySelectorAll) return;
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    if (!isMobile) return;
    doc.querySelectorAll('.day .event-text').forEach((node) => {
      const parent = node.closest('.day');
      if (parent && !parent.dataset.eventText) parent.dataset.eventText = node.textContent || '';
      node.remove();
    });
  }

  function aplicar() {
    const frame = document.getElementById('boletimIntegradoFrame');
    if (!frame || !frame.contentDocument) return;
    const doc = frame.contentDocument;
    if (!doc.body || !doc.head) return;

    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    doc.documentElement.classList.toggle('ensps-mobile-compact', isMobile);
    doc.body.classList.toggle('ensps-mobile-compact', isMobile);

    if (!doc.getElementById('ensps-boletim-mobile-fix-v15')) {
      const style = doc.createElement('style');
      style.id = 'ensps-boletim-mobile-fix-v15';
      style.textContent = cssBoletimMobile();
      doc.head.appendChild(style);
    }
    removerTextosDosQuadrinhos(doc);
    if (!doc.body.dataset.enspsBoletimMobileObserver) {
      const observer = new MutationObserver(() => removerTextosDosQuadrinhos(doc));
      observer.observe(doc.body, { childList: true, subtree: true });
      doc.body.dataset.enspsBoletimMobileObserver = '1';
    }
  }

  function agendar() {
    [0, 80, 240, 600, 1200, 2200].forEach((delay) => setTimeout(aplicar, delay));
  }

  window.addEventListener('load', () => {
    const frame = document.getElementById('boletimIntegradoFrame');
    if (frame) frame.addEventListener('load', agendar);
    agendar();
  });
  window.addEventListener('resize', agendar);
  window.addEventListener('orientationchange', agendar);
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-section="tab-boletim"]')) agendar();
  });
})();
