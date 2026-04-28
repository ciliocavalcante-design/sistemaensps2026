// ===== boletim.html | script inline 1 =====
// ---------- Variáveis Globais ----------
        let daysGridElement = null; // Variável para referenciar o daysGrid do mês atual
        let currentMonthYear = document.getElementById('currentMonthYear');
        let prevMonthBtn = document.getElementById('prevMonthBtn');
        let nextMonthBtn = document.getElementById('nextMonthBtn');
        const selectedDateInfo = document.getElementById('selectedDateInfo');
        const eventList = document.getElementById('eventList');
        const selectedDateComunicadosCount = document.getElementById('selectedDateComunicadosCount');
        const selectedDateComunicadosList = document.getElementById('selectedDateComunicadosList');
        const newComunicadoForDayBtn = document.getElementById('newComunicadoForDayBtn');
        const viewDayComunicadosBtn = document.getElementById('viewDayComunicadosBtn');
        const viewAllComunicadosBtn = document.getElementById('viewAllComunicadosBtn');
        const comunicadosModal = document.getElementById('comunicadosModal');
        const closeComunicadosModalBtn = document.getElementById('closeComunicadosModalBtn');
        const comunicadosList = document.getElementById('comunicadosList');
        const filterAllComunicadosBtn = document.getElementById('filterAllComunicadosBtn');
        const filterDayComunicadosBtn = document.getElementById('filterDayComunicadosBtn');
        const createComunicadoBtn = document.getElementById('createComunicadoBtn');
        const comunicadoTitleInput = document.getElementById('comunicadoTitleInput');
        const comunicadoAudienceInput = document.getElementById('comunicadoAudienceInput');
        const comunicadoReminderDateInput = document.getElementById('comunicadoReminderDateInput');
        const comunicadoBodyInput = document.getElementById('comunicadoBodyInput');
        const comunicadoDatesInput = document.getElementById('comunicadoDatesInput');
        const comunicadoReminderTextInput = document.getElementById('comunicadoReminderTextInput');
        const saveComunicadoBtn = document.getElementById('saveComunicadoBtn');
        const deleteComunicadoBtn = document.getElementById('deleteComunicadoBtn');
        const comunicadosModalSubtitle = document.getElementById('comunicadosModalSubtitle');
        const deleteDayBtn = document.getElementById('deleteDayBtn');
        const clearStorageBtn = document.getElementById('clearStorageBtn');
        const printPdfBtn = document.getElementById('printPdfBtn');
        const calendarSelect = document.getElementById('calendarSelect');
        const newCalendarBtn = document.getElementById('newCalendarBtn');
        const duplicateCalendarBtn = document.getElementById('duplicateCalendarBtn');
        const renameCalendarBtn = document.getElementById('renameCalendarBtn');
        const deleteCalendarBtn = document.getElementById('deleteCalendarBtn');
        const copyMonthBtn = document.getElementById('copyMonthBtn');
        const footerText = document.getElementById('footerText');
        const footerLogo = document.getElementById('footerLogo');
        const logoUpload = document.getElementById('logoUpload');
        const eventColorRadios = document.querySelectorAll('input[name="eventColor"]');
        const calendarWrapper = document.getElementById('calendar-wrapper'); // Wrapper para os meses
        let monthInfoElement = null; // Referência para o div .month-info
        let monthEventListElement = null; // Referência para o ul #monthEventList
        let monthNotesTextarea = null; // Referência para o textarea de observações
        // Elementos do tópico personalizável
        const customTopicCheckbox = document.getElementById('customTopicCheckbox');
        const customTopicInput = document.getElementById('customTopicInput');
        // Novos tópicos para o contador de dias letivos
        const topicInicio1Etapa = document.getElementById('topic11');
        const topicFinal4Etapa = document.getElementById('topic12');
        // NOVO: Checkbox para marcar dia como não letivo
        const nonSchoolDayCheckbox = document.getElementById('nonSchoolDayCheckbox');
        const schoolDaysCounterDisplay = document.getElementById('schoolDaysCounter');
        const totalAnnualSchoolDaysCounter = document.getElementById('totalAnnualSchoolDaysCounter');
        const heroCurrentPeriod = document.getElementById('heroCurrentPeriod');
        const heroMonthEvents = document.getElementById('heroMonthEvents');
        const heroSelectedDate = document.getElementById('heroSelectedDate');
        const heroAnnualDays = document.getElementById('heroAnnualDays');
        const exportDataBtn = document.getElementById('exportDataBtn');
        const importDataInput = document.getElementById('importDataInput');
        const printIntensitySlider = document.getElementById('printIntensitySlider');
        const printIntensityValue = document.getElementById('printIntensityValue');
        const printBorderOnlyToggle = document.getElementById('printBorderOnlyToggle');
        const boldEventTextToggle = document.getElementById('boldEventTextToggle');
        const customColorPicker = document.getElementById('customColorPicker');
        const customColorSwatch = document.getElementById('customColorSwatch');
        const customColorValue = document.getElementById('customColorValue');
        const themeToggleBtn = document.getElementById('themeToggleBtn');

        let currentSelectedDay = null; // Armazena o elemento do dia selecionado
        let events = {}; // Armazena os eventos do calendário ativo
        let monthNotes = {}; // Armazena as observações do calendário ativo
        let comunicados = []; // Comunicados do calendário ativo
        let selectedComunicadoId = null;
        let comunicadosFilterMode = 'all';
        let currentMonth = 0; // Índice dentro da coleção dinâmica de meses
        let currentSelectedEventColor = 'green'; // Cor padrão para novos eventos
        let customSelectedEventColor = '#1f8eed';
        const DEFAULT_PRINT_INTENSITY = 12;
        const CALENDAR_DB_KEY = 'calendarMultiDb';
        const CALENDAR_DB_VERSION = 2;
        const DEFAULT_CALENDAR_ID = 'ensps-2026';
        const DEFAULT_CALENDAR_PERIOD = Object.freeze({ startYear: 2026, startMonth: 0, endYear: 2027, endMonth: 0 });
        let printColorIntensity = DEFAULT_PRINT_INTENSITY;
        let printBorderOnly = false;
        let boldEventText = false;
        let currentTheme = 'light';
        let currentInlineEditDate = null;
        let currentDragSourceDate = null;
        const defaultLogoUrl = 'https://i.imgur.com/2s3Fj7j.png'; // URL da logo padrão

        // Variáveis para a contagem de dias letivos
        let startDateContagem = null;
        let endDateContagem = null;

        // Banco multi-calendário preparado para expansão futura
        let calendarDb = null;
        let activeCalendarId = DEFAULT_CALENDAR_ID;
        let allMonths = [];
        let generatedEventIdCounter = 0;

        // ---------- Funções Auxiliares ----------
        function getDaysInMonth(year, monthIndex) {
            return new Date(year, monthIndex + 1, 0).getDate();
        }

        function getFirstDayOfMonth(year, monthIndex) {
            return new Date(year, monthIndex, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
        }

        function formatDate(year, monthIndex, day) {
            return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }

        function parseDate(dateString) {
            const [year, month, day] = dateString.split('-').map(Number);
            return new Date(year, month - 1, day);
        }

        function formatDateLabel(dateString) {
            return parseDate(dateString).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }


        function getDefaultMonthIndexForList(monthList) {
            if (!Array.isArray(monthList) || monthList.length === 0) return 0;
            const today = new Date();
            const foundMonthIndex = monthList.findIndex(m => m.year === today.getFullYear() && m.monthIndex === today.getMonth());
            return foundMonthIndex !== -1 ? foundMonthIndex : 0;
        }

        function normalizePeriod(rawPeriod = DEFAULT_CALENDAR_PERIOD) {
            const fallback = DEFAULT_CALENDAR_PERIOD;
            const period = rawPeriod && typeof rawPeriod === 'object' ? rawPeriod : fallback;
            const startYear = Number.isInteger(period.startYear) ? period.startYear : fallback.startYear;
            const startMonth = Number.isInteger(period.startMonth) ? Math.max(0, Math.min(11, period.startMonth)) : fallback.startMonth;
            const endYear = Number.isInteger(period.endYear) ? period.endYear : fallback.endYear;
            const endMonth = Number.isInteger(period.endMonth) ? Math.max(0, Math.min(11, period.endMonth)) : fallback.endMonth;
            const startCode = (startYear * 12) + startMonth;
            const endCode = (endYear * 12) + endMonth;
            if (endCode < startCode) {
                return { ...fallback };
            }
            return { startYear, startMonth, endYear, endMonth };
        }

        function buildMonthsCollection(period = DEFAULT_CALENDAR_PERIOD) {
            const normalizedPeriod = normalizePeriod(period);
            const months = [];
            for (let year = normalizedPeriod.startYear; year <= normalizedPeriod.endYear; year++) {
                const monthStart = year === normalizedPeriod.startYear ? normalizedPeriod.startMonth : 0;
                const monthEnd = year === normalizedPeriod.endYear ? normalizedPeriod.endMonth : 11;
                for (let monthIndex = monthStart; monthIndex <= monthEnd; monthIndex++) {
                    months.push({
                        name: new Date(year, monthIndex).toLocaleString('pt-BR', { month: 'long' }),
                        year,
                        monthIndex
                    });
                }
            }
            return months;
        }

        function generateEventId() {
            generatedEventIdCounter += 1;
            return `evt_${Date.now().toString(36)}_${generatedEventIdCounter.toString(36)}`;
        }

        function normalizeEventEntry(eventObj) {
            if (typeof eventObj === 'string') {
                return {
                    id: generateEventId(),
                    text: eventObj,
                    color: 'green',
                    customColor: null
                };
            }

            if (!eventObj || typeof eventObj !== 'object') {
                return null;
            }

            return {
                id: typeof eventObj.id === 'string' && eventObj.id.trim() ? eventObj.id : generateEventId(),
                text: typeof eventObj.text === 'string' ? eventObj.text : '',
                color: typeof eventObj.color === 'string' && eventObj.color ? eventObj.color : 'green',
                customColor: typeof eventObj.customColor === 'string' && eventObj.customColor ? eventObj.customColor : null
            };
        }

        function normalizeEventsMap(rawEvents = {}) {
            const normalized = {};
            if (!rawEvents || typeof rawEvents !== 'object') return normalized;

            Object.entries(rawEvents).forEach(([dateKey, dayEvents]) => {
                if (!Array.isArray(dayEvents)) return;
                const cleanedEvents = dayEvents
                    .map(normalizeEventEntry)
                    .filter(eventObj => eventObj && eventObj.text);
                if (cleanedEvents.length) {
                    normalized[dateKey] = cleanedEvents;
                }
            });

            return normalized;
        }

        function normalizeMonthNotes(rawNotes = {}) {
            if (!rawNotes || typeof rawNotes !== 'object') return {};
            return Object.fromEntries(
                Object.entries(rawNotes)
                    .filter(([monthKey, value]) => typeof monthKey === 'string' && typeof value === 'string')
                    .map(([monthKey, value]) => [monthKey, value])
            );
        }

        function getEasterDate(year) {
            const a = year % 19;
            const b = Math.floor(year / 100);
            const c = year % 100;
            const d = Math.floor(b / 4);
            const e = b % 4;
            const f = Math.floor((b + 8) / 25);
            const g = Math.floor((b - f + 1) / 3);
            const h = (19 * a + b - d - g + 15) % 30;
            const i = Math.floor(c / 4);
            const k = c % 4;
            const l = (32 + 2 * e + 2 * i - h - k) % 7;
            const m = Math.floor((a + 11 * h + 22 * l) / 451);
            const month = Math.floor((h + l - 7 * m + 114) / 31);
            const day = ((h + l - 7 * m + 114) % 31) + 1;
            return new Date(year, month - 1, day);
        }

        function offsetDate(date, days) {
            const copy = new Date(date);
            copy.setDate(copy.getDate() + days);
            return copy;
        }

        function dateToKey(date) {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        }

        function inferPeriodFromData(eventsMap = {}, notesMap = {}, startDate = null, endDate = null, fallback = DEFAULT_CALENDAR_PERIOD) {
            const monthCodes = [];
            const pushMonthCode = (year, monthIndex) => {
                if (!Number.isInteger(year) || !Number.isInteger(monthIndex)) return;
                monthCodes.push((year * 12) + monthIndex);
            };

            Object.keys(eventsMap || {}).forEach(dateKey => {
                const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
                if (!match) return;
                pushMonthCode(Number(match[1]), Number(match[2]) - 1);
            });

            Object.keys(notesMap || {}).forEach(monthKey => {
                const match = /^(\d{4})-(\d{2})$/.exec(monthKey);
                if (!match) return;
                pushMonthCode(Number(match[1]), Number(match[2]) - 1);
            });

            [startDate, endDate].forEach(dateKey => {
                const match = typeof dateKey === 'string' && /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
                if (!match) return;
                pushMonthCode(Number(match[1]), Number(match[2]) - 1);
            });

            if (!monthCodes.length) {
                return normalizePeriod(fallback);
            }

            const minCode = Math.min(...monthCodes);
            const maxCode = Math.max(...monthCodes);
            return normalizePeriod({
                startYear: Math.floor(minCode / 12),
                startMonth: minCode % 12,
                endYear: Math.floor(maxCode / 12),
                endMonth: maxCode % 12
            });
        }

        function inferCalendarBaseYear(id, name) {
            const idMatch = typeof id === 'string' ? id.match(/(20\d{2})/) : null;
            if (idMatch) return Number(idMatch[1]);
            const nameMatch = typeof name === 'string' ? name.match(/(20\d{2})/) : null;
            if (nameMatch) return Number(nameMatch[1]);
            return null;
        }

        function getFixedCalendarPeriod(id, name, fallbackPeriod = DEFAULT_CALENDAR_PERIOD) {
            const inferredYear = inferCalendarBaseYear(id, name);
            if (!Number.isInteger(inferredYear)) return normalizePeriod(fallbackPeriod);
            return normalizePeriod({
                startYear: inferredYear,
                startMonth: 0,
                endYear: inferredYear + 1,
                endMonth: 0
            });
        }

        function generateComunicadoId() {
            return 'com_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
        }

        function normalizeComunicadoDates(value) {
            const raw = Array.isArray(value) ? value : String(value || '').split(/[\n,]+/);
            const unique = [];
            raw.map(item => String(item || '').trim())
                .filter(item => /^\d{4}-\d{2}-\d{2}$/.test(item))
                .forEach(item => {
                    if (!unique.includes(item)) unique.push(item);
                });
            return unique.sort();
        }

        function normalizeComunicadoEntry(raw = {}) {
            const title = String(raw.title || '').trim();
            return {
                id: raw.id || generateComunicadoId(),
                title: title || 'Comunicado sem título',
                body: String(raw.body || '').trim(),
                audience: String(raw.audience || '').trim(),
                dates: normalizeComunicadoDates(raw.dates || []),
                reminderText: String(raw.reminderText || '').trim(),
                reminderDate: /^\d{4}-\d{2}-\d{2}$/.test(String(raw.reminderDate || '').trim()) ? String(raw.reminderDate).trim() : '',
                createdAt: raw.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }

        function normalizeComunicadosList(raw = []) {
            if (!Array.isArray(raw)) return [];
            return raw.map(item => normalizeComunicadoEntry(item)).sort((a, b) => {
                const aDate = a.dates[0] || '9999-99-99';
                const bDate = b.dates[0] || '9999-99-99';
                if (aDate !== bDate) return aDate.localeCompare(bDate);
                return a.title.localeCompare(b.title, 'pt-BR');
            });
        }

        const isEmbeddedInsideENSPS = window.parent && window.parent !== window;
        let parentComunicadosCache = [];
        let isApplyingRemoteBoletimDb = false;
        let isApplyingParentComunicados = false;
        if (isEmbeddedInsideENSPS) {
            document.body.classList.add('is-embedded-ensps');
        }

        function isDateWithinCalendarPeriod(dateKey, period) {
            if (!dateKey || !/^d{4}-d{2}-d{2}$/.test(dateKey)) return false;
            const date = parseDate(dateKey);
            const start = new Date(period.startYear, period.startMonth, 1);
            const end = new Date(period.endYear, period.endMonth + 1, 0, 23, 59, 59, 999);
            return date >= start && date <= end;
        }

        function mapParentComunicadoToBoletim(raw = {}) {
            return normalizeComunicadoEntry({
                id: raw.id || raw.sourceId || generateComunicadoId(),
                title: raw.titulo || raw.title || 'Comunicado sem título',
                body: raw.texto || raw.body || '',
                audience: raw.publico || raw.audience || '',
                dates: Array.isArray(raw.dates) && raw.dates.length ? raw.dates : (raw.data ? [raw.data] : []),
                reminderText: raw.reminderText || '',
                reminderDate: raw.reminderDate || '',
                createdAt: raw.createdAt || new Date().toISOString()
            });
        }

        function mapBoletimComunicadoToParent(raw = {}) {
            const activeCalendar = getActiveCalendar();
            const normalized = normalizeComunicadoEntry(raw);
            return {
                id: normalized.id,
                titulo: normalized.title,
                categoria: 'Boletim Informativo',
                publico: normalized.audience,
                data: normalized.dates[0] || '',
                texto: normalized.body,
                dates: normalized.dates,
                reminderText: normalized.reminderText,
                reminderDate: normalized.reminderDate,
                calendarId: activeCalendar.id,
                origin: 'boletim',
                createdAt: normalized.createdAt,
                updatedAt: normalized.updatedAt
            };
        }

        function aplicarComunicadosDoPai(rawItems = []) {
            isApplyingParentComunicados = true;
            parentComunicadosCache = Array.isArray(rawItems) ? rawItems : [];
            const activeCalendar = getActiveCalendar();
            const period = normalizePeriod(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
            comunicados = normalizeComunicadosList(parentComunicadosCache.filter(item => {
                const itemCalendarId = String(item.calendarId || '').trim();
                if (itemCalendarId && itemCalendarId !== activeCalendar.id) return false;
                const itemDates = normalizeComunicadoDates(Array.isArray(item.dates) && item.dates.length ? item.dates : (item.data ? [item.data] : []));
                if (!itemDates.length) return true;
                return itemDates.some(date => isDateWithinCalendarPeriod(date, period));
            }).map(mapParentComunicadoToBoletim));
            activeCalendar.comunicados = normalizeComunicadosList(comunicados);
            safeSetCalendarStorage(calendarDb);
            mirrorLegacyStorageFromState();
            updateComunicadosSidebar(getCurrentSelectedDateKey());
            if (comunicadosModal?.classList.contains('is-open')) {
                renderComunicadosList(comunicadosFilterMode === 'day' ? getCurrentSelectedDateKey() : null);
            }
            isApplyingParentComunicados = false;
        }

        function aplicarBootstrapComunicadosDoPai() {
            if (!isEmbeddedInsideENSPS) return;
            const bootstrapItems = window.__ENSPS_BOOTSTRAP_COMUNICADOS__;
            if (Array.isArray(bootstrapItems) && bootstrapItems.length) {
                aplicarComunicadosDoPai(bootstrapItems);
            }
        }

        function solicitarBancoBoletimDoPai() {
            if (!isEmbeddedInsideENSPS) return;
            const payload = { type: 'boletim:requestDb' };
            window.parent.postMessage(payload, '*');
            setTimeout(() => window.parent.postMessage(payload, '*'), 120);
        }

        function sincronizarBancoBoletimComPai(reason = 'Atualização do boletim informativo') {
            if (!isEmbeddedInsideENSPS || isApplyingRemoteBoletimDb || isApplyingParentComunicados || !calendarDb) return;
            window.parent.postMessage({
                type: 'boletim:syncDb',
                reason,
                db: calendarDb
            }, '*');
        }

        function safeSetCalendarStorage(value) {
            try {
                localStorage.setItem(CALENDAR_DB_KEY, JSON.stringify(value));
                return true;
            } catch (error) {
                const isQuotaError = error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');
                if (!isQuotaError) throw error;
                console.warn('ENSPS Boletim: calendarMultiDb excedeu a cota local; seguindo com banco em memória/nuvem.', error);
                return false;
            }
        }

        function aplicarBancoBoletimDoPai(rawDb) {
            if (!rawDb || typeof rawDb !== 'object') return;
            isApplyingRemoteBoletimDb = true;
            calendarDb = normalizeCalendarDb(rawDb);
            safeSetCalendarStorage(calendarDb);
            syncStateFromActiveCalendar();
            refreshCalendarMeta();
            updateCalendarSelectOptions();
            renderCurrentMonth();
            updateSchoolDaysCounters();
            updateTotalAnnualSchoolDaysCounter();
            updateHeroSummary();
            updateComunicadosSidebar(getCurrentSelectedDateKey());
            isApplyingRemoteBoletimDb = false;
        }

        function solicitarComunicadosDoPai() {
            if (!isEmbeddedInsideENSPS) return;
            const payload = { type: 'boletim:requestComunicados', calendarId: getActiveCalendar().id };
            window.parent.postMessage(payload, '*');
            setTimeout(() => window.parent.postMessage(payload, '*'), 120);
        }

        function sincronizarComunicadoComPai(item) {
            if (!isEmbeddedInsideENSPS) return;
            window.parent.postMessage({ type: 'boletim:upsertComunicado', comunicado: mapBoletimComunicadoToParent(item) }, '*');
        }

        function notificarExclusaoComunicadoAoPai(id) {
            if (!isEmbeddedInsideENSPS) return;
            window.parent.postMessage({ type: 'boletim:deleteComunicado', id, calendarId: getActiveCalendar().id }, '*');
        }

        function getComunicadosForDate(dateKey) {
            return normalizeComunicadosList(comunicados).filter(item => item.dates.includes(dateKey));
        }

        function createCalendarRecord({ id, name, period, events: rawEvents, monthNotes: rawNotes, comunicados: rawComunicados, settings = {} } = {}) {
            const normalizedEvents = normalizeEventsMap(rawEvents || {});
            const normalizedMonthNotes = normalizeMonthNotes(rawNotes || {});
            const normalizedComunicados = normalizeComunicadosList(rawComunicados || []);
            const fixedCalendarPeriod = inferCalendarBaseYear(id, name)
                ? getFixedCalendarPeriod(id, name, period || DEFAULT_CALENDAR_PERIOD)
                : null;
            const normalizedPeriod = fixedCalendarPeriod || (
                period
                    ? normalizePeriod(period)
                    : inferPeriodFromData(
                        normalizedEvents,
                        normalizedMonthNotes,
                        settings.startDateContagem || null,
                        settings.endDateContagem || null,
                        DEFAULT_CALENDAR_PERIOD
                    )
            );
            const months = buildMonthsCollection(normalizedPeriod);
            const defaultMonthIndex = getDefaultMonthIndexForList(months);
            const desiredMonthIndex = Number.isInteger(settings.currentMonth) ? settings.currentMonth : defaultMonthIndex;

            return {
                id: id || `${DEFAULT_CALENDAR_ID}-${Date.now().toString(36)}`,
                name: name || 'Calendário ENSPS',
                period: normalizedPeriod,
                events: normalizedEvents,
                monthNotes: normalizedMonthNotes,
                comunicados: normalizedComunicados,
                settings: {
                    currentMonth: Math.max(0, Math.min(desiredMonthIndex, Math.max(0, months.length - 1))),
                    currentSelectedEventColor: settings.currentSelectedEventColor || 'green',
                    customSelectedEventColor: settings.customSelectedEventColor || '#1f8eed',
                    printColorIntensity: Number.isFinite(Number(settings.printColorIntensity)) ? Math.max(0, Math.min(40, Number(settings.printColorIntensity))) : DEFAULT_PRINT_INTENSITY,
                    printBorderOnly: Boolean(settings.printBorderOnly),
                    boldEventText: Boolean(settings.boldEventText),
                    startDateContagem: settings.startDateContagem || null,
                    endDateContagem: settings.endDateContagem || null,
                    currentTheme: settings.currentTheme === 'dark' ? 'dark' : 'light'
                }
            };
        }

        function createDefaultCalendarDb() {
            return {
                version: CALENDAR_DB_VERSION,
                activeCalendarId: DEFAULT_CALENDAR_ID,
                calendars: [
                    createCalendarRecord({
                        id: DEFAULT_CALENDAR_ID,
                        name: 'Calendário ENSPS 2026',
                        period: DEFAULT_CALENDAR_PERIOD
                    })
                ],
                ui: {
                    footerLogo: null
                }
            };
        }


        function getCalendarLabel(calendar) {
            if (!calendar) return 'Calendário';
            const period = normalizePeriod(calendar.period || DEFAULT_CALENDAR_PERIOD);
            if (period.startYear === period.endYear && period.startMonth === 0 && period.endMonth === 11) {
                return calendar.name || `Calendário ${period.startYear}`;
            }
            return calendar.name || `Calendário ${period.startYear}-${period.endYear}`;
        }

        function refreshCalendarMeta() {
            const activeCalendar = getActiveCalendar();
            const activeCalendarTitle = document.getElementById('activeCalendarTitle');
            const calendarLabel = getCalendarLabel(activeCalendar);
            if (activeCalendarTitle) {
                activeCalendarTitle.textContent = calendarLabel + ' • Boletim informativo';
            }
            if (footerText) {
                footerText.textContent = calendarLabel + ' • Boletim informativo';
            }
        }

        function getCalendarPickerLabel(calendar) {
            const period = normalizePeriod(calendar?.period || DEFAULT_CALENDAR_PERIOD);
            return String(period.startYear);
        }

        function updateCalendarSelectOptions() {
            if (!calendarSelect || !calendarDb) return;
            const currentValue = activeCalendarId;
            const orderedCalendars = [...calendarDb.calendars].sort((a, b) => {
                const aPeriod = normalizePeriod(a.period || DEFAULT_CALENDAR_PERIOD);
                const bPeriod = normalizePeriod(b.period || DEFAULT_CALENDAR_PERIOD);
                if (aPeriod.startYear !== bPeriod.startYear) return aPeriod.startYear - bPeriod.startYear;
                return aPeriod.startMonth - bPeriod.startMonth;
            });
            calendarSelect.innerHTML = '';
            orderedCalendars.forEach(calendar => {
                const option = document.createElement('option');
                option.value = calendar.id;
                option.textContent = getCalendarPickerLabel(calendar);
                calendarSelect.appendChild(option);
            });
            calendarSelect.value = orderedCalendars.some(calendar => calendar.id === currentValue) ? currentValue : orderedCalendars[0]?.id || '';
        }

        function switchActiveCalendar(calendarId) {
            if (!calendarDb || !calendarDb.calendars.some(calendar => calendar.id === calendarId)) return;
            activeCalendarId = calendarId;
            calendarDb.activeCalendarId = calendarId;
            currentSelectedDay = null;
            syncStateFromActiveCalendar();
            populateDefaultHolidays();
            mergeDefaultHolidaysIntoEvents();
            saveCalendarDbToStorage();
            refreshCalendarMeta();
            updateCalendarSelectOptions();
            if (calendarSelect) {
                calendarSelect.value = calendarId;
            }
            renderCurrentMonth();
            clearDaySelection();
            loadEventColorFromStorage();
            loadPrintIntensityFromStorage();
            updateSchoolDaysCounters();
            updateTotalAnnualSchoolDaysCounter();
            updateHeroSummary();
            solicitarComunicadosDoPai();
        }

        function createCalendarForYear(year) {
            const safeYear = Number(year);
            if (!Number.isInteger(safeYear) || safeYear < 2020 || safeYear > 2100) {
                alert('Informe um ano válido entre 2020 e 2100.');
                return;
            }
            if (!calendarDb) {
                loadCalendarDbFromStorage();
            }
            const existing = calendarDb.calendars.find(calendar => {
                const period = normalizePeriod(calendar.period || DEFAULT_CALENDAR_PERIOD);
                return period.startYear === safeYear && period.startMonth === 0 && period.endYear === safeYear + 1 && period.endMonth === 0;
            });
            if (existing) {
                switchActiveCalendar(existing.id);
                alert(`O calendário de ${safeYear} já existe e foi aberto.`);
                return;
            }

            const newCalendar = createCalendarRecord({
                id: `ensps-${safeYear}`,
                name: `Calendário ENSPS ${safeYear}`,
                period: { startYear: safeYear, startMonth: 0, endYear: safeYear + 1, endMonth: 0 },
                settings: {
                    currentMonth: 0,
                    currentSelectedEventColor,
                    customSelectedEventColor,
                    printColorIntensity,
                    printBorderOnly,
                    boldEventText,
                    currentTheme
                }
            });
            calendarDb.calendars.push(newCalendar);
            calendarDb.activeCalendarId = newCalendar.id;
            activeCalendarId = newCalendar.id;
            saveCalendarDbToStorage();
            loadCalendarDbFromStorage();
            updateCalendarSelectOptions();
            switchActiveCalendar(newCalendar.id);
        }


        function shiftDateKeyByYears(dateKey, yearDelta) {
            const date = parseDate(dateKey);
            const shifted = new Date(date.getFullYear() + yearDelta, date.getMonth(), date.getDate());
            return dateToKey(shifted);
        }

        function shiftMonthKeyByYears(monthKey, yearDelta) {
            const match = /^(\d{4})-(\d{2})$/.exec(monthKey);
            if (!match) return monthKey;
            return `${Number(match[1]) + yearDelta}-${match[2]}`;
        }

        function getCalendarMonthIndex(calendar, year, monthIndex) {
            const months = buildMonthsCollection(calendar.period || DEFAULT_CALENDAR_PERIOD);
            return months.findIndex(month => month.year === year && month.monthIndex === monthIndex);
        }

        function duplicateActiveCalendarToYear(targetYear) {
            const activeCalendar = getActiveCalendar();
            const sourcePeriod = normalizePeriod(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
            const safeYear = Number(targetYear);
            if (!Number.isInteger(safeYear) || safeYear < 2020 || safeYear > 2100) {
                alert('Informe um ano válido entre 2020 e 2100.');
                return;
            }
            const existing = calendarDb.calendars.find(calendar => {
                const period = normalizePeriod(calendar.period || DEFAULT_CALENDAR_PERIOD);
                return period.startYear === safeYear && period.startMonth === 0 && period.endYear === safeYear + 1 && period.endMonth === 0;
            });
            if (existing) {
                switchActiveCalendar(existing.id);
                alert(`O calendário de ${safeYear} já existe e foi aberto.`);
                return;
            }

            const yearDelta = safeYear - sourcePeriod.startYear;
            const duplicatedEvents = {};
            Object.entries(activeCalendar.events || {}).forEach(([dateKey, dayEvents]) => {
                const shiftedDateKey = shiftDateKeyByYears(dateKey, yearDelta);
                const clonedEvents = (dayEvents || [])
                    .filter(eventObj => eventObj.color !== 'holiday')
                    .map(eventObj => normalizeEventEntry({
                        ...eventObj,
                        id: generateEventId()
                    }));
                if (clonedEvents.length) {
                    duplicatedEvents[shiftedDateKey] = clonedEvents;
                }
            });

            const duplicatedNotes = Object.fromEntries(
                Object.entries(activeCalendar.monthNotes || {}).map(([monthKey, value]) => [shiftMonthKeyByYears(monthKey, yearDelta), value])
            );

            const duplicatedCalendar = createCalendarRecord({
                id: `ensps-${safeYear}`,
                name: `Calendário ENSPS ${safeYear}`,
                period: { startYear: safeYear, startMonth: 0, endYear: safeYear + 1, endMonth: 0 },
                events: duplicatedEvents,
                monthNotes: duplicatedNotes,
                settings: {
                    currentMonth: 0,
                    currentSelectedEventColor,
                    customSelectedEventColor,
                    printColorIntensity,
                    printBorderOnly,
                    boldEventText,
                    currentTheme,
                    startDateContagem: startDateContagem ? shiftDateKeyByYears(startDateContagem, yearDelta) : null,
                    endDateContagem: endDateContagem ? shiftDateKeyByYears(endDateContagem, yearDelta) : null
                }
            });

            calendarDb.calendars.push(duplicatedCalendar);
            calendarDb.activeCalendarId = duplicatedCalendar.id;
            activeCalendarId = duplicatedCalendar.id;
            saveCalendarDbToStorage();
            loadCalendarDbFromStorage();
            updateCalendarSelectOptions();
            switchActiveCalendar(duplicatedCalendar.id);
        }

        function copyCurrentMonthToAnotherCalendar() {
            const sourceCalendar = getActiveCalendar();
            const sourceMonth = allMonths[currentMonth];
            if (!sourceMonth) return;

            const otherCalendars = calendarDb.calendars;
            const choices = otherCalendars.map((calendar, index) => `${index + 1}. ${getCalendarLabel(calendar)}`).join('\n');
            const picked = window.prompt(`Escolha o calendário de destino pelo número:

${choices}`, '1');
            if (!picked) return;
            const pickedIndex = Number(picked) - 1;
            if (!Number.isInteger(pickedIndex) || pickedIndex < 0 || pickedIndex >= otherCalendars.length) {
                alert('Seleção de calendário inválida.');
                return;
            }
            const targetCalendar = otherCalendars[pickedIndex];
            const targetMonthRaw = window.prompt('Digite o mês de destino no formato AAAA-MM:', `${sourceMonth.year}-${String(sourceMonth.monthIndex + 1).padStart(2, '0')}`);
            if (!targetMonthRaw) return;
            const match = /^(\d{4})-(\d{2})$/.exec(targetMonthRaw.trim());
            if (!match) {
                alert('Use o formato AAAA-MM.');
                return;
            }
            const targetYear = Number(match[1]);
            const targetMonthIndex = Number(match[2]) - 1;
            if (targetMonthIndex < 0 || targetMonthIndex > 11) {
                alert('Mês inválido.');
                return;
            }
            const targetViewIndex = getCalendarMonthIndex(targetCalendar, targetYear, targetMonthIndex);
            if (targetViewIndex === -1) {
                alert('Esse mês não existe no calendário de destino.');
                return;
            }
            if (!window.confirm(`Copiar ${sourceMonth.name} ${sourceMonth.year} para ${String(targetMonthIndex + 1).padStart(2, '0')}/${targetYear} em ${getCalendarLabel(targetCalendar)}?

Os eventos não-feriado do mês de destino serão substituídos.`)) {
                return;
            }

            const targetEvents = normalizeEventsMap(targetCalendar.events || {});
            const sourceMonthPrefix = `${sourceMonth.year}-${String(sourceMonth.monthIndex + 1).padStart(2, '0')}-`;
            const targetMonthPrefix = `${targetYear}-${String(targetMonthIndex + 1).padStart(2, '0')}-`;
            const targetDays = getDaysInMonth(targetYear, targetMonthIndex);

            Object.keys(targetEvents).forEach(dateKey => {
                if (dateKey.startsWith(targetMonthPrefix)) {
                    const preservedHolidays = (targetEvents[dateKey] || []).filter(eventObj => eventObj.color === 'holiday');
                    if (preservedHolidays.length) {
                        targetEvents[dateKey] = preservedHolidays;
                    } else {
                        delete targetEvents[dateKey];
                    }
                }
            });

            Object.entries(sourceCalendar.events || {}).forEach(([dateKey, dayEvents]) => {
                if (!dateKey.startsWith(sourceMonthPrefix)) return;
                const sourceDay = Number(dateKey.slice(-2));
                if (sourceDay > targetDays) return;
                const targetDateKey = `${targetMonthPrefix}${String(sourceDay).padStart(2, '0')}`;
                const copied = (dayEvents || [])
                    .filter(eventObj => eventObj.color !== 'holiday')
                    .map(eventObj => normalizeEventEntry({ ...eventObj, id: generateEventId() }));
                if (!copied.length) return;
                const preservedHolidays = targetEvents[targetDateKey] ? targetEvents[targetDateKey].filter(eventObj => eventObj.color === 'holiday') : [];
                targetEvents[targetDateKey] = [...preservedHolidays, ...copied];
            });

            const targetNotes = normalizeMonthNotes(targetCalendar.monthNotes || {});
            const sourceMonthKey = `${sourceMonth.year}-${String(sourceMonth.monthIndex + 1).padStart(2, '0')}`;
            const targetMonthKey = `${targetYear}-${String(targetMonthIndex + 1).padStart(2, '0')}`;
            targetNotes[targetMonthKey] = monthNotes[sourceMonthKey] || '';

            targetCalendar.events = targetEvents;
            targetCalendar.monthNotes = targetNotes;
            if (targetCalendar.id === activeCalendarId) {
                targetCalendar.settings.currentMonth = targetViewIndex;
            }
            saveCalendarDbToStorage();
            switchActiveCalendar(targetCalendar.id);
            currentMonth = targetViewIndex;
            saveCurrentMonthToStorage();
            renderCurrentMonth();
            updateSchoolDaysCounters();
            updateTotalAnnualSchoolDaysCounter();
            updateHeroSummary();
            alert('Mês copiado com sucesso.');
        }

        function hasLegacyShape(raw) {
            return Boolean(raw) && typeof raw === 'object' && (
                Object.prototype.hasOwnProperty.call(raw, 'events') ||
                Object.prototype.hasOwnProperty.call(raw, 'monthNotes') ||
                Object.prototype.hasOwnProperty.call(raw, 'currentMonth') ||
                Object.prototype.hasOwnProperty.call(raw, 'footerLogo')
            );
        }

        function convertLegacyPayloadToDb(raw = {}) {
            const calendarId = DEFAULT_CALENDAR_ID;
            return {
                version: CALENDAR_DB_VERSION,
                activeCalendarId: calendarId,
                calendars: [
                    createCalendarRecord({
                        id: calendarId,
                        name: 'Calendário ENSPS 2026',
                        events: raw.events || {},
                        monthNotes: raw.monthNotes || {},
                        comunicados: raw.comunicados || [],
                        settings: {
                            currentMonth: raw.currentMonth,
                            currentSelectedEventColor: raw.currentSelectedEventColor,
                            customSelectedEventColor: raw.customSelectedEventColor,
                            printColorIntensity: raw.printColorIntensity,
                            printBorderOnly: raw.printBorderOnly,
                            boldEventText: raw.boldEventText,
                            startDateContagem: raw.startDateContagem,
                            endDateContagem: raw.endDateContagem,
                            currentTheme: raw.currentTheme
                        }
                    })
                ],
                ui: {
                    footerLogo: raw.footerLogo || null
                }
            };
        }

        function normalizeCalendarDb(raw) {
            if (raw && typeof raw === 'object' && raw.version === CALENDAR_DB_VERSION && Array.isArray(raw.calendars) && raw.calendars.length) {
                const calendars = raw.calendars.map(calendar => createCalendarRecord(calendar));
                const preferredCalendarId = raw.activeCalendarId || calendars[0].id;
                const activeId = calendars.some(calendar => calendar.id === preferredCalendarId) ? preferredCalendarId : calendars[0].id;
                return {
                    version: CALENDAR_DB_VERSION,
                    activeCalendarId: activeId,
                    calendars,
                    ui: {
                        footerLogo: raw.ui?.footerLogo || raw.footerLogo || null
                    }
                };
            }

            if (hasLegacyShape(raw)) {
                return convertLegacyPayloadToDb(raw);
            }

            return createDefaultCalendarDb();
        }

        function getLegacyStorageSnapshot() {
            const keysToCheck = [
                'calendarEvents',
                'monthNotes',
                'currentMonth',
                'currentSelectedEventColor',
                'customSelectedEventColor',
                'printColorIntensity',
                'printBorderOnly',
                'boldEventText',
                'footerLogo',
                'calendarTheme'
            ];
            const hasAnyLegacyData = keysToCheck.some(key => localStorage.getItem(key) !== null);
            if (!hasAnyLegacyData) return null;

            let parsedEvents = {};
            let parsedMonthNotes = {};
            try {
                parsedEvents = JSON.parse(localStorage.getItem('calendarEvents') || '{}');
            } catch (_) {
                parsedEvents = {};
            }
            try {
                parsedMonthNotes = JSON.parse(localStorage.getItem('monthNotes') || '{}');
            } catch (_) {
                parsedMonthNotes = {};
            }

            return {
                events: parsedEvents,
                monthNotes: parsedMonthNotes,
                currentMonth: localStorage.getItem('currentMonth') !== null ? parseInt(localStorage.getItem('currentMonth'), 10) : 0,
                currentSelectedEventColor: localStorage.getItem('currentSelectedEventColor') || 'green',
                customSelectedEventColor: localStorage.getItem('customSelectedEventColor') || '#1f8eed',
                printColorIntensity: localStorage.getItem('printColorIntensity') !== null ? Number(localStorage.getItem('printColorIntensity')) : DEFAULT_PRINT_INTENSITY,
                printBorderOnly: localStorage.getItem('printBorderOnly') === '1',
                boldEventText: localStorage.getItem('boldEventText') === '1',
                footerLogo: localStorage.getItem('footerLogo'),
                currentTheme: localStorage.getItem('calendarTheme') || 'light'
            };
        }

        function getActiveCalendar() {
            if (!calendarDb || !Array.isArray(calendarDb.calendars) || !calendarDb.calendars.length) {
                calendarDb = createDefaultCalendarDb();
            }
            const preferredId = activeCalendarId || calendarDb.activeCalendarId;
            const activeCalendar = calendarDb.calendars.find(calendar => calendar.id === preferredId) || calendarDb.calendars[0];
            activeCalendarId = activeCalendar.id;
            calendarDb.activeCalendarId = activeCalendar.id;
            return activeCalendar;
        }

        function syncStateFromActiveCalendar() {
            const activeCalendar = getActiveCalendar();
            events = normalizeEventsMap(activeCalendar.events);
            monthNotes = normalizeMonthNotes(activeCalendar.monthNotes);
            comunicados = normalizeComunicadosList(activeCalendar.comunicados || []);
            startDateContagem = activeCalendar.settings.startDateContagem || null;
            endDateContagem = activeCalendar.settings.endDateContagem || null;
            currentSelectedEventColor = activeCalendar.settings.currentSelectedEventColor || 'green';
            customSelectedEventColor = activeCalendar.settings.customSelectedEventColor || '#1f8eed';
            printColorIntensity = Number.isFinite(Number(activeCalendar.settings.printColorIntensity)) ? Math.max(0, Math.min(40, Number(activeCalendar.settings.printColorIntensity))) : DEFAULT_PRINT_INTENSITY;
            printBorderOnly = Boolean(activeCalendar.settings.printBorderOnly);
            boldEventText = Boolean(activeCalendar.settings.boldEventText);
            currentTheme = activeCalendar.settings.currentTheme === 'dark' ? 'dark' : 'light';
            allMonths = buildMonthsCollection(activeCalendar.period);
            currentMonth = Number.isInteger(activeCalendar.settings.currentMonth) ? activeCalendar.settings.currentMonth : getDefaultMonthIndexForList(allMonths);
            if (!allMonths.length) {
                allMonths = buildMonthsCollection(DEFAULT_CALENDAR_PERIOD);
                currentMonth = 0;
            }
            currentMonth = Math.max(0, Math.min(currentMonth, allMonths.length - 1));
        }

        function syncActiveCalendarFromState() {
            const activeCalendar = getActiveCalendar();
            activeCalendar.events = normalizeEventsMap(events);
            activeCalendar.monthNotes = normalizeMonthNotes(monthNotes);
            activeCalendar.comunicados = normalizeComunicadosList(comunicados);
            activeCalendar.period = normalizePeriod(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
            allMonths = buildMonthsCollection(activeCalendar.period);
            if (!allMonths.length) {
                allMonths = buildMonthsCollection(DEFAULT_CALENDAR_PERIOD);
            }
            currentMonth = Math.max(0, Math.min(currentMonth, Math.max(0, allMonths.length - 1)));
            activeCalendar.settings = {
                ...activeCalendar.settings,
                currentMonth,
                currentSelectedEventColor,
                customSelectedEventColor,
                printColorIntensity,
                printBorderOnly,
                boldEventText,
                startDateContagem,
                endDateContagem,
                currentTheme
            };
            calendarDb.activeCalendarId = activeCalendar.id;
            if (!calendarDb.ui) calendarDb.ui = {};
            const footerLogoValue = localStorage.getItem('footerLogo');
            if (footerLogoValue) {
                calendarDb.ui.footerLogo = footerLogoValue;
            }
        }

        function mirrorLegacyStorageFromState() {
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            localStorage.setItem('monthNotes', JSON.stringify(monthNotes));
            localStorage.setItem('currentMonth', String(currentMonth));
            localStorage.setItem('currentSelectedEventColor', currentSelectedEventColor);
            localStorage.setItem('customSelectedEventColor', customSelectedEventColor);
            localStorage.setItem('printColorIntensity', String(printColorIntensity));
            localStorage.setItem('printBorderOnly', printBorderOnly ? '1' : '0');
            localStorage.setItem('boldEventText', boldEventText ? '1' : '0');
            localStorage.setItem('calendarTheme', currentTheme);
            if (calendarDb?.ui?.footerLogo) {
                localStorage.setItem('footerLogo', calendarDb.ui.footerLogo);
            }
        }

        function saveCalendarDbToStorage() {
            if (!calendarDb) {
                calendarDb = createDefaultCalendarDb();
            }
            syncActiveCalendarFromState();
            const footerLogoValue = calendarDb?.ui?.footerLogo || localStorage.getItem('footerLogo') || null;
            try {
                safeSetCalendarStorage(calendarDb);
            } catch (error) {
                const isQuotaError = error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');
                if (!isQuotaError) throw error;
                const snapshot = JSON.parse(JSON.stringify(calendarDb));
                if (!snapshot.ui) snapshot.ui = {};
                snapshot.ui.footerLogo = null;
                safeSetCalendarStorage(snapshot);
                if (footerLogoValue) {
                    localStorage.setItem('footerLogo', footerLogoValue);
                    if (!calendarDb.ui) calendarDb.ui = {};
                    calendarDb.ui.footerLogo = footerLogoValue;
                }
            }
            mirrorLegacyStorageFromState();
            sincronizarBancoBoletimComPai();
        }

        function loadCalendarDbFromStorage() {
            try {
                const savedDb = localStorage.getItem(CALENDAR_DB_KEY);
                if (savedDb) {
                    if (savedDb.length > 900000) {
                        console.warn('ENSPS Boletim: cache local pesado demais; ignorando leitura local e aguardando nuvem.');
                        calendarDb = createDefaultCalendarDb();
                        return;
                    }
                    calendarDb = normalizeCalendarDb(JSON.parse(savedDb));
                } else {
                    const legacySnapshot = getLegacyStorageSnapshot();
                    calendarDb = legacySnapshot ? normalizeCalendarDb(legacySnapshot) : createDefaultCalendarDb();
                    safeSetCalendarStorage(calendarDb);
                }
            } catch (error) {
                console.warn('Falha ao carregar banco estruturado, recriando base padrão.', error);
                calendarDb = createDefaultCalendarDb();
            }

            if (!calendarDb.ui) calendarDb.ui = {};
            if (!calendarDb.ui.footerLogo) {
                calendarDb.ui.footerLogo = localStorage.getItem('footerLogo') || null;
            }
            activeCalendarId = calendarDb.activeCalendarId;
            syncStateFromActiveCalendar();
            if (!allMonths.length) {
                const fallbackCalendar = getActiveCalendar();
                fallbackCalendar.period = normalizePeriod(fallbackCalendar.period || DEFAULT_CALENDAR_PERIOD);
                allMonths = buildMonthsCollection(fallbackCalendar.period);
                currentMonth = getDefaultMonthIndexForList(allMonths);
            }
            mirrorLegacyStorageFromState();
            refreshCalendarMeta();
            updateCalendarSelectOptions();
        }

        function getMonthEventCount(year, monthIndex) {
            const daysInMonth = getDaysInMonth(year, monthIndex);
            let total = 0;

            for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                const dateKey = formatDate(year, monthIndex, dayNum);
                total += (events[dateKey] || []).filter(event => event.text !== nonSchoolDayCheckbox.value).length;
            }

            return total;
        }

        function applyTheme(theme) {
            currentTheme = theme === 'dark' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', currentTheme);
            if (themeToggleBtn) {
                themeToggleBtn.textContent = currentTheme === 'dark' ? 'Tema claro' : 'Tema escuro';
            }
        }

        function updateHeroSummary() {
            const { name, year, monthIndex } = allMonths[currentMonth];
            const periodo = `${name.charAt(0).toUpperCase() + name.slice(1)} ${year}`;
            const totalMes = getMonthEventCount(year, monthIndex);
            const totalAno = calculateTotalAnnualSchoolDays();

            if (heroCurrentPeriod) heroCurrentPeriod.textContent = periodo;
            if (heroMonthEvents) heroMonthEvents.textContent = String(totalMes);
            if (heroSelectedDate) heroSelectedDate.textContent = currentSelectedDay ? formatDateLabel(currentSelectedDay.dataset.date) : 'Nenhuma';
            if (heroAnnualDays) heroAnnualDays.textContent = String(totalAno);
        }

        function mixHexWithWhite(hex, intensityPercent) {
            const cleanHex = hex.replace('#', '');
            const normalized = cleanHex.length === 3
                ? cleanHex.split('').map(char => char + char).join('')
                : cleanHex;
            const intensity = Math.max(0, Math.min(100, Number(intensityPercent))) / 100;
            const r = parseInt(normalized.slice(0, 2), 16);
            const g = parseInt(normalized.slice(2, 4), 16);
            const b = parseInt(normalized.slice(4, 6), 16);
            const mix = channel => Math.round(255 - ((255 - channel) * intensity));
            return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
        }

        function getPrintPalette(intensityPercent) {
            return {
                green: { bg: mixHexWithWhite('#28a745', intensityPercent), border: '#28a745' },
                pink: { bg: mixHexWithWhite('#e83e8c', intensityPercent), border: '#e83e8c' },
                yellow: { bg: mixHexWithWhite('#ffc107', intensityPercent + 3), border: '#ffc107' },
                blue: { bg: mixHexWithWhite('#007bff', intensityPercent), border: '#007bff' },
                purple: { bg: mixHexWithWhite('#6f42c1', intensityPercent), border: '#6f42c1' },
                orange: { bg: mixHexWithWhite('#fd7e14', intensityPercent), border: '#fd7e14' },
                custom: { bg: mixHexWithWhite(customSelectedEventColor, intensityPercent), border: customSelectedEventColor },
                holiday: { bg: mixHexWithWhite('#dc3545', intensityPercent), border: '#dc3545' },
                nonSchool: { bg: mixHexWithWhite('#6c757d', Math.max(10, intensityPercent - 2)), border: '#6c757d' }
            };
        }

        function updatePrintIntensityUI() {
            if (!printIntensitySlider || !printIntensityValue) return;
            printIntensitySlider.value = String(printColorIntensity);
            const label = printColorIntensity <= 4 ? 'Quase zero' : printColorIntensity <= 10 ? 'Muito fraco' : printColorIntensity <= 18 ? 'Fraco' : printColorIntensity <= 28 ? 'Médio' : 'Forte';
            printIntensityValue.textContent = `${label} (${printColorIntensity})`;
            if (printIntensitySlider) printIntensitySlider.disabled = printBorderOnly;
            if (boldEventTextToggle) boldEventTextToggle.checked = boldEventText;
            if (customColorPicker) customColorPicker.value = customSelectedEventColor;
            if (customColorSwatch) customColorSwatch.style.backgroundColor = customSelectedEventColor;
            if (customColorValue) customColorValue.textContent = customSelectedEventColor.toUpperCase();
        }

        function applyPrintCellStyle(cell, bgColor, borderColor, filled = true) {
            cell.style.backgroundColor = filled ? bgColor : '#ffffff';
            cell.style.borderColor = borderColor;
            cell.style.boxShadow = filled
                ? `inset 0 0 0 999px ${bgColor}, 0 2px 5px rgba(0, 0, 0, 0.05)`
                : '0 2px 5px rgba(0, 0, 0, 0.05)';
            cell.style.webkitPrintColorAdjust = 'exact';
            cell.style.printColorAdjust = 'exact';
        }

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
                saveThemeToStorage();
            });
        }

        if (calendarSelect) {
            calendarSelect.addEventListener('change', (event) => {
                switchActiveCalendar(event.target.value);
            });
        }

        if (newCalendarBtn) {
            newCalendarBtn.addEventListener('click', () => {
                const activeCalendar = getActiveCalendar();
                const period = normalizePeriod(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
                const suggestedYear = String(period.startYear + 1);
                const typedYear = window.prompt('Digite o ano do novo calendário (ex.: 2028):', suggestedYear);
                if (!typedYear) return;
                createCalendarForYear(Number(typedYear));
            });
        }

        if (duplicateCalendarBtn) {
            duplicateCalendarBtn.addEventListener('click', () => {
                const activeCalendar = getActiveCalendar();
                const period = normalizePeriod(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
                const suggestedYear = String(period.startYear + 1);
                const typedYear = window.prompt('Duplicar o calendário atual para qual ano inicial?', suggestedYear);
                if (!typedYear) return;
                duplicateActiveCalendarToYear(Number(typedYear));
            });
        }

        if (copyMonthBtn) {
            copyMonthBtn.addEventListener('click', () => {
                copyCurrentMonthToAnotherCalendar();
            });
        }

        if (renameCalendarBtn) {
            renameCalendarBtn.addEventListener('click', () => {
                const activeCalendar = getActiveCalendar();
                const typedName = window.prompt('Novo nome para este calendário:', activeCalendar.name || getCalendarLabel(activeCalendar));
                if (!typedName) return;
                activeCalendar.name = typedName.trim() || activeCalendar.name;
                saveCalendarDbToStorage();
                refreshCalendarMeta();
                updateCalendarSelectOptions();
            });
        }

        if (deleteCalendarBtn) {
            deleteCalendarBtn.addEventListener('click', () => {
                if (!calendarDb || !Array.isArray(calendarDb.calendars) || calendarDb.calendars.length <= 1) {
                    alert('É preciso manter pelo menos um calendário cadastrado.');
                    return;
                }
                const activeCalendar = getActiveCalendar();
                if (!confirm(`Deseja excluir o calendário "${getCalendarLabel(activeCalendar)}"?`)) return;
                const orderedCalendars = [...calendarDb.calendars].sort((a, b) => {
                    const aPeriod = normalizePeriod(a.period || DEFAULT_CALENDAR_PERIOD);
                    const bPeriod = normalizePeriod(b.period || DEFAULT_CALENDAR_PERIOD);
                    if (aPeriod.startYear !== bPeriod.startYear) return aPeriod.startYear - bPeriod.startYear;
                    return aPeriod.startMonth - bPeriod.startMonth;
                });
                const currentIndex = orderedCalendars.findIndex(calendar => calendar.id === activeCalendar.id);
                const fallback = orderedCalendars[currentIndex - 1] || orderedCalendars[currentIndex + 1] || orderedCalendars[0];
                calendarDb.calendars = calendarDb.calendars.filter(calendar => calendar.id !== activeCalendar.id);
                calendarDb.activeCalendarId = fallback.id;
                activeCalendarId = fallback.id;
                saveCalendarDbToStorage();
                loadCalendarDbFromStorage();
                refreshCalendarMeta();
                updateCalendarSelectOptions();
                renderCurrentMonth();
            });
        }

        // ---------- Persistência de Dados ----------
        function saveEventsToStorage() {
            saveCalendarDbToStorage();
        }

        function loadEventsFromStorage() {
            loadCalendarDbFromStorage();
        }

        function saveCurrentMonthToStorage() {
            saveCalendarDbToStorage();
        }

        function loadCurrentMonthFromStorage() {
            if (!allMonths.length) {
                allMonths = buildMonthsCollection(DEFAULT_CALENDAR_PERIOD);
            }
            if (!Number.isInteger(currentMonth) || currentMonth < 0 || currentMonth >= allMonths.length) {
                currentMonth = getDefaultMonthIndexForList(allMonths);
            }
        }

        function saveEventColorToStorage() {
            saveCalendarDbToStorage();
        }

        function loadEventColorFromStorage() {
            const targetId = currentSelectedEventColor === 'custom'
                ? 'colorCustom'
                : `color${currentSelectedEventColor.charAt(0).toUpperCase() + currentSelectedEventColor.slice(1)}`;
            const targetInput = document.getElementById(targetId);
            if (targetInput) {
                targetInput.checked = true;
            } else {
                document.getElementById('colorGreen').checked = true;
                currentSelectedEventColor = 'green';
            }
            updatePrintIntensityUI();
        }

        function savePrintIntensityToStorage() {
            saveCalendarDbToStorage();
        }

        function savePrintBorderOnlyToStorage() {
            saveCalendarDbToStorage();
        }

        function saveBoldEventTextToStorage() {
            saveCalendarDbToStorage();
        }

        function loadPrintIntensityFromStorage() {
            if (printBorderOnlyToggle) printBorderOnlyToggle.checked = printBorderOnly;
            updatePrintIntensityUI();
        }

        function saveThemeToStorage() {
            saveCalendarDbToStorage();
        }

        function loadThemeFromStorage() {
            applyTheme(currentTheme);
        }

        function isPreservedCalendarEvent(eventObj) {
            return eventObj?.color === 'holiday' || eventObj?.text === nonSchoolDayCheckbox.value || eventObj?.color === 'non-school-day';
        }

        function getEditableDayEvents(dateKey) {
            return (events[dateKey] || []).filter(eventObj => !isPreservedCalendarEvent(eventObj));
        }

        function getPreservedDayEvents(dateKey) {
            return (events[dateKey] || []).filter(isPreservedCalendarEvent);
        }

        function getDayEditorText(dateKey) {
            return getEditableDayEvents(dateKey).map(eventObj => eventObj.text).join('\n');
        }

        function normalizeInlineDayText(rawText) {
            return rawText
                .split(String.fromCharCode(10))
                .map(line => line.replace(String.fromCharCode(13), '').trim())
                .filter(Boolean);
        }

        function getPreferredEditableStyle(dateKey) {
            const firstEditableEvent = getEditableDayEvents(dateKey)[0];
            if (!firstEditableEvent) {
                return {
                    color: currentSelectedEventColor,
                    customColor: currentSelectedEventColor === 'custom' ? customSelectedEventColor : null
                };
            }
            return {
                color: firstEditableEvent.color || currentSelectedEventColor,
                customColor: firstEditableEvent.customColor || null
            };
        }

        function refreshDayVisual(dateKey) {
            const dayElement = document.querySelector(`.day[data-date="${dateKey}"]`);
            if (dayElement) {
                updateEventDetailsForDayDiv(dayElement, dateKey);
                if (currentSelectedDay && currentSelectedDay.dataset.date === dateKey) {
                    currentSelectedDay = dayElement;
                    currentSelectedDay.classList.add('selected');
                }
            }
        }

        function syncSidebarForDate(dateKey) {
            if (!currentSelectedDay || currentSelectedDay.dataset.date !== dateKey) return;
            updateEventListInSidebar(dateKey);
            updateComunicadosSidebar(dateKey);
            loadTopicCheckboxes(dateKey);
            loadEventColorSelection(dateKey);
        }

        function finalizeCalendarMutation(affectedDates = []) {
            affectedDates.forEach(refreshDayVisual);
            affectedDates.forEach(syncSidebarForDate);
            updateMonthInfo(allMonths[currentMonth].year, allMonths[currentMonth].monthIndex);
            updateSchoolDaysCounters();
            updateTotalAnnualSchoolDaysCounter();
            updateHeroSummary();
            saveEventsToStorage();
        }

        function applyInlineEditToDate(dateKey, rawText) {
            const normalizedLines = normalizeInlineDayText(rawText);
            const preservedEvents = getPreservedDayEvents(dateKey);
            const preferredStyle = getPreferredEditableStyle(dateKey);
            const rebuiltEvents = normalizedLines.map(textLine => ({
                id: generateEventId(),
                text: textLine,
                color: preferredStyle.color,
                customColor: preferredStyle.color === 'custom' ? (preferredStyle.customColor || customSelectedEventColor) : null
            }));
            const nextEvents = [...preservedEvents, ...rebuiltEvents];
            if (nextEvents.length) {
                events[dateKey] = nextEvents;
            } else {
                delete events[dateKey];
            }
            currentInlineEditDate = null;
            finalizeCalendarMutation([dateKey]);
        }

        function startInlineDayEdit(dayDiv, dateKey) {
            if (!dayDiv || dayDiv.classList.contains('empty-day')) return;
            if (currentInlineEditDate && currentInlineEditDate !== dateKey) {
                const activeEditor = document.querySelector(`.day[data-date="${currentInlineEditDate}"] .day-inline-editor`);
                if (activeEditor) {
                    applyInlineEditToDate(currentInlineEditDate, activeEditor.value);
                }
            }
            currentInlineEditDate = dateKey;
            dayDiv.classList.add('editing-inline');
            dayDiv.querySelector('.event-text')?.remove();
            dayDiv.querySelector('.event-indicator')?.remove();
            const existingEditor = dayDiv.querySelector('.day-inline-editor');
            if (existingEditor) {
                existingEditor.focus();
                existingEditor.select();
                return;
            }
            const editor = document.createElement('textarea');
            editor.className = 'day-inline-editor';
            editor.placeholder = 'Digite um evento por linha';
            editor.value = getDayEditorText(dateKey);
            editor.addEventListener('click', event => event.stopPropagation());
            editor.addEventListener('keydown', event => {
                event.stopPropagation();
                if ((event.key === 'Enter' && (event.ctrlKey || event.metaKey))) {
                    event.preventDefault();
                    applyInlineEditToDate(dateKey, editor.value);
                } else if (event.key === 'Escape') {
                    event.preventDefault();
                    currentInlineEditDate = null;
                    refreshDayVisual(dateKey);
                }
            });
            editor.addEventListener('blur', () => {
                if (currentInlineEditDate === dateKey) {
                    applyInlineEditToDate(dateKey, editor.value);
                }
            });
            dayDiv.appendChild(editor);
            editor.focus();
            editor.select();
        }

        function moveEditableDayContent(sourceDateKey, targetDateKey) {
            if (!sourceDateKey || !targetDateKey || sourceDateKey === targetDateKey) return;
            const sourceEditableEvents = getEditableDayEvents(sourceDateKey);
            if (!sourceEditableEvents.length) return;
            const targetEvents = [...(events[targetDateKey] || [])];
            const sourcePreservedEvents = getPreservedDayEvents(sourceDateKey);
            const targetEditableEvents = targetEvents.filter(eventObj => !isPreservedCalendarEvent(eventObj));
            const existingKeys = new Set(targetEditableEvents.map(eventObj => `${eventObj.text}::${eventObj.color || ''}::${eventObj.customColor || ''}`));
            sourceEditableEvents.forEach(eventObj => {
                const signature = `${eventObj.text}::${eventObj.color || ''}::${eventObj.customColor || ''}`;
                if (!existingKeys.has(signature)) {
                    targetEvents.push({ ...eventObj, id: generateEventId() });
                    existingKeys.add(signature);
                }
            });
            events[targetDateKey] = targetEvents;
            if (sourcePreservedEvents.length) {
                events[sourceDateKey] = sourcePreservedEvents;
            } else {
                delete events[sourceDateKey];
            }
            if (currentInlineEditDate === sourceDateKey || currentInlineEditDate === targetDateKey) {
                currentInlineEditDate = null;
            }
            finalizeCalendarMutation([sourceDateKey, targetDateKey]);
        }

        function handleDayDragStart(event, dateKey) {
            if (!getEditableDayEvents(dateKey).length) {
                event.preventDefault();
                return;
            }
            currentDragSourceDate = dateKey;
            event.currentTarget.classList.add('drag-source');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', dateKey);
        }

        function handleDayDragOver(event, dateKey) {
            if (!currentDragSourceDate || currentDragSourceDate === dateKey) return;
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            event.currentTarget.classList.add('drag-over');
        }

        function handleDayDragLeave(event) {
            event.currentTarget.classList.remove('drag-over');
        }

        function handleDayDrop(event, targetDateKey) {
            event.preventDefault();
            event.currentTarget.classList.remove('drag-over');
            const sourceDateKey = event.dataTransfer.getData('text/plain') || currentDragSourceDate;
            moveEditableDayContent(sourceDateKey, targetDateKey);
            currentDragSourceDate = null;
        }

        function handleDayDragEnd(event) {
            event.currentTarget.classList.remove('drag-source');
            document.querySelectorAll('.day.drag-over').forEach(dayNode => dayNode.classList.remove('drag-over'));
            currentDragSourceDate = null;
        }

        // ---------- Renderização do Calendário ----------
        function renderCurrentMonth() {
            if (!allMonths.length) {
                const activeCalendar = getActiveCalendar();
                allMonths = buildMonthsCollection(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
            }
            if (!allMonths.length) return;
            currentMonth = Math.max(0, Math.min(currentMonth, allMonths.length - 1));
            const { name, year, monthIndex } = allMonths[currentMonth];
            currentMonthYear.textContent = `${name} ${year}`;

            // Remove o calendário e info do mês anterior se existirem
            calendarWrapper.innerHTML = '';

            // Cria o contêiner do calendário
            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');

            const dayNamesGrid = document.createElement('div');
            dayNamesGrid.classList.add('days-grid');
            const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            dayNames.forEach(dayName => {
                const div = document.createElement('div');
                div.classList.add('day-name');
                div.textContent = dayName;
                dayNamesGrid.appendChild(div);
            });
            monthDiv.appendChild(dayNamesGrid);

            daysGridElement = document.createElement('div'); // Atribui ao daysGridElement global
            daysGridElement.classList.add('days-grid');
            monthDiv.appendChild(daysGridElement);

            const daysInMonth = getDaysInMonth(year, monthIndex);
            const firstDay = getFirstDayOfMonth(year, monthIndex);

            // Preenche os dias vazios no início do mês
            for (let i = 0; i < firstDay; i++) {
                const emptyDayDiv = document.createElement('div');
                emptyDayDiv.classList.add('day', 'empty-day');
                daysGridElement.appendChild(emptyDayDiv);
            }

            // Preenche os dias do mês
            for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                const dateKey = formatDate(year, monthIndex, dayNum);
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.dataset.date = dateKey;
                dayDiv.innerHTML = `<span class="day-number">${dayNum}</span>`;

                const dayOfWeek = new Date(year, monthIndex, dayNum).getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    dayDiv.classList.add('weekend');
                }

                updateEventDetailsForDayDiv(dayDiv, dateKey); // Aplica eventos e estilos ao dia

                dayDiv.addEventListener('click', () => {
                    if (dayDiv.classList.contains('editing-inline')) return;
                    selectDay(dayDiv, dateKey);
                });
                dayDiv.addEventListener('dblclick', () => startInlineDayEdit(dayDiv, dateKey));
                dayDiv.addEventListener('dragstart', event => handleDayDragStart(event, dateKey));
                dayDiv.addEventListener('dragover', event => handleDayDragOver(event, dateKey));
                dayDiv.addEventListener('dragleave', handleDayDragLeave);
                dayDiv.addEventListener('drop', event => handleDayDrop(event, dateKey));
                dayDiv.addEventListener('dragend', handleDayDragEnd);
                daysGridElement.appendChild(dayDiv);
            }

            calendarWrapper.appendChild(monthDiv);

            // Renderiza a seção de informações do mês
            renderMonthInfoSection(year, monthIndex);

            // Atualiza os contadores de dias letivos
            updateSchoolDaysCounters();
            updateTotalAnnualSchoolDaysCounter();
            updateHeroSummary();

            // Limpa a seleção de dia e a sidebar
            clearDaySelection();
        }

        function updateEventDetailsForDayDiv(dayDiv, dateKey) {
            dayDiv.classList.remove('has-event', 'event-color-green', 'event-color-pink', 'event-color-yellow', 'event-color-blue', 'event-color-purple', 'event-color-orange', 'holiday', 'non-school-day', 'can-drag', 'drag-source', 'drag-over', 'editing-inline');
            dayDiv.style.borderColor = '';
            dayDiv.style.backgroundColor = '';
            dayDiv.draggable = false;
            dayDiv.querySelector('.event-text')?.remove();
            dayDiv.querySelector('.event-indicator')?.remove();
            dayDiv.querySelector('.day-inline-editor')?.remove();

            const dayNumber = dayDiv.querySelector('.day-number');
            if (dayNumber) dayNumber.style.color = '';

            const dayEvents = events[dateKey] || [];
            const editableEvents = getEditableDayEvents(dateKey);
            const holidayEvents = dayEvents.filter(eventObj => eventObj.color === 'holiday');
            const hasHoliday = holidayEvents.length > 0;
            const isNonSchoolDay = dayEvents.some(eventObj => eventObj.text === nonSchoolDayCheckbox.value || eventObj.color === 'non-school-day');
            const displaySegments = [];
            let primaryEditableColor = '';
            let primaryEditableCustomColor = null;

            if (hasHoliday) {
                holidayEvents.forEach(eventObj => {
                    displaySegments.push(`Feriado: ${eventObj.text.replace(/Feriado:?\s*/i, '').trim()}`);
                });
            }

            editableEvents.forEach(eventObj => {
                displaySegments.push(eventObj.text);
                if (!primaryEditableColor) {
                    primaryEditableColor = eventObj.color;
                    primaryEditableCustomColor = eventObj.customColor || null;
                }
            });

            if (isNonSchoolDay) {
                dayDiv.classList.add('non-school-day');
            }
            if (hasHoliday) {
                dayDiv.classList.add('holiday');
                if (dayNumber) dayNumber.style.color = '#a00';
            }
            if (editableEvents.length && primaryEditableColor === 'custom') {
                const appliedCustomColor = primaryEditableCustomColor || customSelectedEventColor;
                dayDiv.classList.add('has-event');
                dayDiv.style.borderColor = appliedCustomColor;
                dayDiv.style.backgroundColor = mixHexWithWhite(appliedCustomColor, 14);
            } else if (editableEvents.length && primaryEditableColor) {
                dayDiv.classList.add('has-event', `event-color-${primaryEditableColor}`);
            }

            if (editableEvents.length) {
                dayDiv.draggable = true;
                dayDiv.classList.add('can-drag');
                dayDiv.title = 'Arraste para mover os eventos deste dia';
            } else if (displaySegments.length) {
                dayDiv.title = 'Clique no texto para editar';
            } else {
                dayDiv.title = 'Clique duas vezes para escrever direto no quadrinho';
            }

            if (displaySegments.length > 0) {
                const eventTextSpan = document.createElement('span');
                eventTextSpan.classList.add('event-text');
                eventTextSpan.textContent = displaySegments.join(', ');
                eventTextSpan.style.fontWeight = boldEventText ? '700' : '500';
                eventTextSpan.title = 'Clique para editar o texto deste quadrinho';
                eventTextSpan.addEventListener('click', event => {
                    event.stopPropagation();
                    startInlineDayEdit(dayDiv, dateKey);
                });
                dayDiv.appendChild(eventTextSpan);

                const eventIndicator = document.createElement('div');
                eventIndicator.classList.add('event-indicator');
                if (hasHoliday) {
                    eventIndicator.style.backgroundColor = '#a00';
                } else if (primaryEditableColor === 'custom') {
                    eventIndicator.style.backgroundColor = primaryEditableCustomColor || customSelectedEventColor;
                } else {
                    eventIndicator.style.backgroundColor = primaryEditableColor || '#0056b3';
                }
                dayDiv.appendChild(eventIndicator);
            }
        }


        // ---------- Lógica de Seleção de Dia e Sidebar ----------
        function selectDay(dayDiv, dateKey) {
            if (currentSelectedDay) {
                currentSelectedDay.classList.remove('selected');
            }
            currentSelectedDay = dayDiv;
            currentSelectedDay.classList.add('selected');

            selectedDateInfo.innerHTML = `
                <h4>${formatDateLabel(dateKey)}</h4>
                <small class="selected-date-meta">Veja eventos, tópicos e comunicados vinculados a esta data.</small>
            `;
            deleteDayBtn.disabled = false;

            updateEventListInSidebar(dateKey);
            updateComunicadosSidebar(dateKey);
            loadTopicCheckboxes(dateKey);
            loadEventColorSelection(dateKey);
            updateHeroSummary();
        }

        function clearDaySelection() {
            if (currentSelectedDay) {
                currentSelectedDay.classList.remove('selected');
                currentSelectedDay = null;
            }
            selectedDateInfo.innerHTML = '<p>Selecione uma data no calendário para ver e gerenciar os tópicos.</p>';
            eventList.innerHTML = '<li>Nenhum evento marcado.</li>';
            updateComunicadosSidebar(null);
            deleteDayBtn.disabled = true;
            resetTopicCheckboxes();
            resetEventColorSelection();
            updateHeroSummary();
        }

        function updateEventListInSidebar(dateKey) {
            eventList.innerHTML = '';
            const dayEvents = events[dateKey] || [];
            if (dayEvents.length === 0) {
                eventList.innerHTML = '<li>Nenhum evento marcado.</li>';
            } else {
                dayEvents.forEach(eventObj => {
                    const li = document.createElement('li');
                    li.textContent = eventObj.text;
                    eventList.appendChild(li);
                });
            }
        }

        function escapeHtml(value) {
            return String(value || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function getCurrentSelectedDateKey() {
            return currentSelectedDay?.dataset?.date || null;
        }

        function updateComunicadosSidebar(dateKey) {
            if (!selectedDateComunicadosCount || !selectedDateComunicadosList) return;
            if (!dateKey) {
                selectedDateComunicadosCount.textContent = '0';
                selectedDateComunicadosList.innerHTML = '<li class="comunicados-empty">Selecione uma data para visualizar os comunicados vinculados.</li>';
                return;
            }
            const items = getComunicadosForDate(dateKey);
            selectedDateComunicadosCount.textContent = String(items.length);
            selectedDateComunicadosList.innerHTML = '';
            if (!items.length) {
                selectedDateComunicadosList.innerHTML = '<li class="comunicados-empty">Nenhum comunicado vinculado a esta data.</li>';
                return;
            }
            items.slice(0, 4).forEach(item => {
                const li = document.createElement('li');
                const infoText = item.reminderDate ? ('Lembrete: ' + formatDateLabel(item.reminderDate)) : (item.audience || 'Sem público definido');
                li.innerHTML = '<strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(infoText) + '</small>';
                selectedDateComunicadosList.appendChild(li);
            });
            if (items.length > 4) {
                const li = document.createElement('li');
                li.className = 'comunicados-empty';
                li.textContent = '+ ' + (items.length - 4) + ' comunicado(s) na lista completa.';
                selectedDateComunicadosList.appendChild(li);
            }
        }

        function openComunicadosModal(mode = 'all', dateKey = null, createNew = false) {
            if (!comunicadosModal) return;
            solicitarComunicadosDoPai();
            comunicadosFilterMode = mode;
            comunicadosModal.classList.add('is-open');
            comunicadosModal.setAttribute('aria-hidden', 'false');
            if (comunicadosModalSubtitle) {
                comunicadosModalSubtitle.textContent = mode === 'day' && dateKey
                    ? 'Comunicados vinculados a ' + formatDateLabel(dateKey) + '.'
                    : 'Gerencie os comunicados do calendário ativo.';
            }
            filterAllComunicadosBtn?.classList.toggle('active', mode !== 'day');
            filterDayComunicadosBtn?.classList.toggle('active', mode === 'day');
            renderComunicadosList(dateKey);
            if (createNew) {
                loadComunicadoIntoForm(null, dateKey);
            }
        }

        function closeComunicadosModal() {
            if (!comunicadosModal) return;
            comunicadosModal.classList.remove('is-open');
            comunicadosModal.setAttribute('aria-hidden', 'true');
        }

        function updateComunicadoCardSelection() {
            if (!comunicadosList) return;
            comunicadosList.querySelectorAll('.comunicado-card').forEach(card => card.classList.remove('active'));
            if (!selectedComunicadoId) return;
            const item = comunicados.find(entry => entry.id === selectedComunicadoId);
            if (!item) return;
            [...comunicadosList.querySelectorAll('.comunicado-card')].forEach(card => {
                if (card.innerHTML.includes(escapeHtml(item.title))) {
                    card.classList.add('active');
                }
            });
        }

        function loadComunicadoIntoForm(id = null, defaultDateKey = null) {
            const item = id ? comunicados.find(entry => entry.id === id) : null;
            selectedComunicadoId = item ? item.id : null;
            comunicadoTitleInput.value = item ? item.title : '';
            comunicadoAudienceInput.value = item ? item.audience : '';
            comunicadoReminderDateInput.value = item ? item.reminderDate : '';
            comunicadoBodyInput.value = item ? item.body : '';
            comunicadoDatesInput.value = item ? item.dates.join('\n') : (defaultDateKey || getCurrentSelectedDateKey() || '');
            comunicadoReminderTextInput.value = item ? item.reminderText : '';
            deleteComunicadoBtn.disabled = !item;
            updateComunicadoCardSelection();
        }

        function renderComunicadosList(dateKey = null) {
            if (!comunicadosList) return;
            const items = comunicadosFilterMode === 'day' && dateKey
                ? getComunicadosForDate(dateKey)
                : normalizeComunicadosList(comunicados);
            comunicadosList.innerHTML = '';
            if (!items.length) {
                comunicadosList.innerHTML = '<p class="comunicados-empty">Nenhum comunicado encontrado nesse filtro.</p>';
                if (!selectedComunicadoId) loadComunicadoIntoForm(null, dateKey);
                return;
            }
            items.forEach(item => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'comunicado-card' + (item.id === selectedComunicadoId ? ' active' : '');
                const primaryDate = item.dates[0] ? formatDateLabel(item.dates[0]) : 'Sem data vinculada';
                card.innerHTML = '<h4>' + escapeHtml(item.title) + '</h4><small>' + escapeHtml(primaryDate) + '</small><p>' + escapeHtml(item.audience || 'Sem público definido') + '</p>';
                card.addEventListener('click', () => loadComunicadoIntoForm(item.id, dateKey));
                comunicadosList.appendChild(card);
            });
            if (!selectedComunicadoId || !items.some(item => item.id === selectedComunicadoId)) {
                loadComunicadoIntoForm(items[0].id, dateKey);
            } else {
                updateComunicadoCardSelection();
            }
        }

        function saveComunicado() {
            const title = String(comunicadoTitleInput.value || '').trim();
            if (!title) {
                alert('Informe um título para o comunicado.');
                comunicadoTitleInput.focus();
                return;
            }
            const previous = selectedComunicadoId ? comunicados.find(item => item.id === selectedComunicadoId) : null;
            const payload = normalizeComunicadoEntry({
                id: selectedComunicadoId || generateComunicadoId(),
                title,
                body: comunicadoBodyInput.value || '',
                audience: comunicadoAudienceInput.value || '',
                dates: normalizeComunicadoDates(comunicadoDatesInput.value || ''),
                reminderText: comunicadoReminderTextInput.value || '',
                reminderDate: comunicadoReminderDateInput.value || '',
                createdAt: previous?.createdAt || new Date().toISOString()
            });
            const idx = comunicados.findIndex(item => item.id === payload.id);
            if (idx >= 0) comunicados[idx] = payload;
            else comunicados.push(payload);
            comunicados = normalizeComunicadosList(comunicados);
            saveCalendarDbToStorage();
            sincronizarComunicadoComPai(payload);
            updateComunicadosSidebar(getCurrentSelectedDateKey());
            renderComunicadosList(comunicadosFilterMode === 'day' ? getCurrentSelectedDateKey() : null);
            loadComunicadoIntoForm(payload.id, getCurrentSelectedDateKey());
            alert('Comunicado salvo com sucesso.');
        }

        function deleteComunicado() {
            if (!selectedComunicadoId) return;
            const currentItem = comunicados.find(item => item.id === selectedComunicadoId);
            if (!currentItem) return;
            if (!window.confirm('Excluir o comunicado "' + currentItem.title + '"?')) return;
            const deletedId = selectedComunicadoId;
            comunicados = comunicados.filter(item => item.id !== deletedId);
            selectedComunicadoId = null;
            saveCalendarDbToStorage();
            notificarExclusaoComunicadoAoPai(deletedId);
            updateComunicadosSidebar(getCurrentSelectedDateKey());
            renderComunicadosList(comunicadosFilterMode === 'day' ? getCurrentSelectedDateKey() : null);
            loadComunicadoIntoForm(null, getCurrentSelectedDateKey());
        }

        function loadTopicCheckboxes(dateKey) {
            resetTopicCheckboxes();
            const dayEvents = events[dateKey] || [];

            document.querySelectorAll('.topic-list input[type="checkbox"]').forEach(checkbox => {
                let isChecked = dayEvents.some(eventObj => eventObj.text === checkbox.value);
                if (checkbox.value === 'Feriado') {
                    isChecked = dayEvents.some(eventObj => eventObj.color === 'holiday');
                }
                checkbox.checked = isChecked;

                // Habilita/desabilita o input de texto personalizado
                if (checkbox.id === 'customTopicCheckbox') {
                    customTopicInput.disabled = !isChecked;
                    if (isChecked) {
                        const customEvent = dayEvents.find(eventObj => eventObj.text.startsWith(customTopicInput.placeholder) || (eventObj.text !== topicInicio1Etapa.value && eventObj.text !== topicFinal4Etapa.value && eventObj.text !== nonSchoolDayCheckbox.value && !document.querySelector(`label[for="${checkbox.id}"]`)?.textContent.includes(eventObj.text)));
                        if (customEvent) {
                            customTopicInput.value = customEvent.text;
                        }
                    }
                }
            });
        }

        function resetTopicCheckboxes() {
            document.querySelectorAll('.topic-list input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            customTopicInput.value = '';
            customTopicInput.disabled = true;
        }

        function loadEventColorSelection(dateKey) {
            const dayEvents = events[dateKey] || [];
            let selectedColor = 'green'; // Cor padrão se não houver eventos

            // Prioriza a cor de um evento não-feriado/não-letivo
            const nonHolidayEvent = dayEvents.find(event => event.color !== 'holiday' && event.text !== nonSchoolDayCheckbox.value);
            if (nonHolidayEvent) {
                selectedColor = nonHolidayEvent.color;
            } else if (dayEvents.some(event => event.color === 'holiday')) {
                // Se só tiver feriado, a cor selecionada na sidebar não importa tanto para o dia em si,
                // mas podemos manter a última cor não-feriado ou a padrão.
                // Para a edição de novos eventos, a cor padrão 'green' será usada.
            }

            if (selectedColor === 'custom') {
                document.getElementById('colorCustom').checked = true;
            } else {
                document.getElementById(`color${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`).checked = true;
            }
            currentSelectedEventColor = selectedColor;
        }

        function resetEventColorSelection() {
            document.getElementById('colorGreen').checked = true;
            currentSelectedEventColor = 'green';
            updatePrintIntensityUI();
        }

        function formatHolidayText(name) {
            const cleanName = String(name || '').replace(/Feriado:?\s*/i, '').trim();
            return cleanName ? `Feriado: ${cleanName}` : 'Feriado';
        }

        function isDefaultHolidayForDate(dateKey, text) {
            return (defaultHolidays[dateKey] || []).some(eventObj => eventObj.text === text);
        }

        function getCustomHolidayEvents(dateKey) {
            return (events[dateKey] || []).filter(eventObj => eventObj.color === 'holiday' && !isDefaultHolidayForDate(dateKey, eventObj.text));
        }

        // ---------- Manipulação de Eventos (Checkboxes) ----------
        document.querySelectorAll('.topic-list input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                if (!currentSelectedDay) {
                    alert('Por favor, selecione uma data no calendário primeiro.');
                    event.target.checked = false; // Desmarca se nenhuma data estiver selecionada
                    return;
                }

                const date = currentSelectedDay.dataset.date;
                let dayEvents = events[date] || [];
                const topicValue = event.target.value;
                const isChecked = event.target.checked;
                const eventColor = currentSelectedEventColor; // Usa a cor selecionada no rádio

                // Lógica para o tópico personalizável
                if (event.target.id === 'customTopicCheckbox') {
                    customTopicInput.disabled = !isChecked;
                    if (isChecked) {
                        customTopicInput.focus();
                        // Adiciona um evento placeholder se o checkbox for marcado e o input estiver vazio
                        if (customTopicInput.value.trim() === '') {
                            const placeholderEvent = { text: 'Evento Personalizado', color: eventColor };
                            if (!dayEvents.some(e => e.text === placeholderEvent.text)) {
                                dayEvents.push(placeholderEvent);
                            }
                            customTopicInput.value = placeholderEvent.text; // Preenche o input com o placeholder
                        }
                    } else {
                        // Remove o evento personalizado quando o checkbox é desmarcado
                        dayEvents = dayEvents.filter(e => e.text !== customTopicInput.value);
                        customTopicInput.value = '';
                    }
                } else if (topicValue === 'Feriado') {
                    if (isChecked) {
                        const existingCustomHoliday = getCustomHolidayEvents(date)[0];
                        const typedHolidayName = window.prompt('Digite o nome do feriado ou ponto facultativo:', existingCustomHoliday ? existingCustomHoliday.text.replace(/Feriado:?\s*/i, '').trim() : '');
                        if (typedHolidayName === null) {
                            event.target.checked = (events[date] || []).some(e => e.color === 'holiday');
                            return;
                        }
                        const formattedHoliday = formatHolidayText(typedHolidayName);
                        if (formattedHoliday === 'Feriado') {
                            alert('Informe um nome para o feriado ou ponto facultativo.');
                            event.target.checked = (events[date] || []).some(e => e.color === 'holiday');
                            return;
                        }
                        dayEvents = dayEvents.filter(e => !(e.color === 'holiday' && !isDefaultHolidayForDate(date, e.text)));
                        dayEvents.push({ text: formattedHoliday, color: 'holiday' });
                    } else {
                        dayEvents = dayEvents.filter(e => !(e.color === 'holiday' && !isDefaultHolidayForDate(date, e.text)));
                    }
                } else if (topicValue === nonSchoolDayCheckbox.value) {
                    if (isChecked) {
                        const nonSchoolEvent = { text: nonSchoolDayCheckbox.value, color: 'non-school-day' };
                        if (!dayEvents.some(e => e.text === nonSchoolEvent.text)) {
                            dayEvents.push(nonSchoolEvent);
                        }
                    } else {
                        dayEvents = dayEvents.filter(e => e.text !== nonSchoolDayCheckbox.value);
                    }
                } else if (topicValue === topicInicio1Etapa.value) {
                    if (isChecked) {
                        // Remove qualquer outro "Início 1ª Etapa" existente
                        for (const d in events) {
                            events[d] = events[d].filter(e => e.text !== topicInicio1Etapa.value);
                        }
                        dayEvents.push({ text: topicInicio1Etapa.value, color: eventColor });
                        startDateContagem = date;
                    } else {
                        dayEvents = dayEvents.filter(e => e.text !== topicInicio1Etapa.value);
                        startDateContagem = null;
                    }
                } else if (topicValue === topicFinal4Etapa.value) {
                    if (isChecked) {
                        // Remove qualquer outro "Final 4ª Etapa" existente
                        for (const d in events) {
                            events[d] = events[d].filter(e => e.text !== topicFinal4Etapa.value);
                        }
                        dayEvents.push({ text: topicFinal4Etapa.value, color: eventColor });
                        endDateContagem = date;
                    } else {
                        dayEvents = dayEvents.filter(e => e.text !== topicFinal4Etapa.value);
                        endDateContagem = null;
                    }
                } else {
                    // Tópicos normais
                    if (isChecked) {
                        dayEvents.push({ text: topicValue, color: eventColor });
                    } else {
                        dayEvents = dayEvents.filter(e => e.text !== topicValue);
                    }
                }

                events[date] = dayEvents;
                updateEventDetailsForDayDiv(currentSelectedDay, date);
                updateEventListInSidebar(date);
                updateMonthInfo(allMonths[currentMonth].year, allMonths[currentMonth].monthIndex);
                updateSchoolDaysCounters();
                updateTotalAnnualSchoolDaysCounter();
                saveEventsToStorage();
            });
        });

        // Listener para o input de texto personalizável
        customTopicInput.addEventListener('input', () => {
            if (currentSelectedDay && customTopicCheckbox.checked) {
                const date = currentSelectedDay.dataset.date;
                let dayEvents = events[date] || [];
                const oldText = dayEvents.find(e => e.text.startsWith('Evento Personalizado') || (e.text !== topicInicio1Etapa.value && e.text !== topicFinal4Etapa.value && e.text !== nonSchoolDayCheckbox.value && !document.querySelector(`label[for="customTopicCheckbox"]`)?.textContent.includes(e.text)))?.text;

                if (oldText) {
                    dayEvents = dayEvents.filter(e => e.text !== oldText);
                }
                if (customTopicInput.value.trim() !== '') {
                    dayEvents.push({ text: customTopicInput.value.trim(), color: currentSelectedEventColor, customColor: currentSelectedEventColor === 'custom' ? customSelectedEventColor : null });
                }
                events[date] = dayEvents;
                updateEventDetailsForDayDiv(currentSelectedDay, date);
                updateEventListInSidebar(date);
                updateMonthInfo(allMonths[currentMonth].year, allMonths[currentMonth].monthIndex);
                updateSchoolDaysCounters();
                updateTotalAnnualSchoolDaysCounter();
                saveEventsToStorage();
            }
        });

        // ---------- Feriados Padrão ----------
        let defaultHolidays = {};

        function populateDefaultHolidays() {
            defaultHolidays = {};

            const addHoliday = (dateKey, name) => {
                if (!defaultHolidays[dateKey]) {
                    defaultHolidays[dateKey] = [];
                }
                const formattedName = `Feriado: ${name.replace(/Feriado:?\s*/i, '').trim()}`;
                if (!defaultHolidays[dateKey].some(e => e.text === formattedName)) {
                    defaultHolidays[dateKey].push(normalizeEventEntry({ text: formattedName, color: 'holiday' }));
                }
            };

            const activeCalendar = getActiveCalendar();
            const period = normalizePeriod(activeCalendar.period || DEFAULT_CALENDAR_PERIOD);
            const fixedHolidays = [
                ['01-01', 'Confraternização Universal'],
                ['04-21', 'Tiradentes'],
                ['05-01', 'Dia do Trabalho'],
                ['09-07', 'Independência do Brasil'],
                ['10-12', 'Nossa Senhora Aparecida'],
                ['11-02', 'Finados'],
                ['11-15', 'Proclamação da República'],
                ['12-25', 'Natal']
            ];

            for (let year = period.startYear; year <= period.endYear; year++) {
                fixedHolidays.forEach(([monthDay, label]) => {
                    addHoliday(`${year}-${monthDay}`, label);
                });

                const easter = getEasterDate(year);
                addHoliday(dateToKey(offsetDate(easter, -48)), 'Carnaval');
                addHoliday(dateToKey(offsetDate(easter, -47)), 'Carnaval');
                addHoliday(dateToKey(offsetDate(easter, -46)), 'Quarta-feira de Cinzas');
                addHoliday(dateToKey(offsetDate(easter, -2)), 'Sexta-feira Santa');
                addHoliday(dateToKey(offsetDate(easter, 60)), 'Corpus Christi');
            }
        }


        function mergeDefaultHolidaysIntoEvents() {
            for (const date in defaultHolidays) {
                if (defaultHolidays.hasOwnProperty(date)) {
                    if (!events[date]) {
                        events[date] = [];
                    }
                    defaultHolidays[date].forEach(holidayEvent => {
                        if (!events[date].some(e => e.text === holidayEvent.text && e.color === 'holiday')) {
                            events[date].push(normalizeEventEntry({ ...holidayEvent, color: 'holiday' }));
                        }
                    });
                }
            }
            for (const date in events) {
                if (events.hasOwnProperty(date)) {
                    events[date] = events[date].map(eventObj => {
                        const normalizedEvent = normalizeEventEntry(eventObj);
                        const isDefaultHolidayEvent = (defaultHolidays[date] || []).some(dh => dh.text === normalizedEvent.text);
                        if (isDefaultHolidayEvent) {
                            return { ...normalizedEvent, color: 'holiday' };
                        }
                        return normalizedEvent;
                    });
                }
            }
        }

        // ---------- Seção de Informações do Mês (abaixo do calendário) ----------
        function renderMonthInfoSection(year, monthIndex) {
            const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
            const existingMonthInfo = document.getElementById('monthInfoSection');
            if (existingMonthInfo) {
                existingMonthInfo.remove();
            }

            monthInfoElement = document.createElement('div');
            monthInfoElement.classList.add('month-info');
            monthInfoElement.id = 'monthInfoSection'; // Adiciona um ID para fácil referência

            const title = document.createElement('h4');
            title.textContent = 'Informações e Eventos do Mês:';
            monthInfoElement.appendChild(title);

            monthEventListElement = document.createElement('ul');
            monthEventListElement.id = 'monthEventList';
            monthInfoElement.appendChild(monthEventListElement);

            // Adiciona o campo de observações adicionais
            const additionalNotesDiv = document.createElement('div');
            additionalNotesDiv.classList.add('additional-notes');
            const notesTitle = document.createElement('h4');
            notesTitle.textContent = 'Observações Adicionais:';
            additionalNotesDiv.appendChild(notesTitle);
            monthNotesTextarea = document.createElement('textarea');
            monthNotesTextarea.placeholder = 'Adicione observações gerais para este mês...';
            monthNotesTextarea.value = monthNotes[monthKey] || '';
            monthNotesTextarea.addEventListener('input', () => {
                monthNotes[monthKey] = monthNotesTextarea.value;
                saveEventsToStorage();
            });
            additionalNotesDiv.appendChild(monthNotesTextarea);
            monthInfoElement.appendChild(additionalNotesDiv);

            calendarWrapper.appendChild(monthInfoElement);
            updateMonthInfo(year, monthIndex);
        }

        function updateMonthInfo(year, monthIndex) {
            if (!monthEventListElement) return;

            monthEventListElement.innerHTML = '';
            const daysInMonth = getDaysInMonth(year, monthIndex);
            let hasEvents = false;

            for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                const dateKey = formatDate(year, monthIndex, dayNum);
                const dayEvents = events[dateKey] || [];

                // Filtra o evento "Dia Não Letivo" para não aparecer na lista de informações do mês
                const filteredEvents = dayEvents.filter(event => event.text !== nonSchoolDayCheckbox.value);

                if (filteredEvents.length > 0) {
                    hasEvents = true;
                    const formattedDate = `${String(dayNum).padStart(2, '0')}/${String(monthIndex + 1).padStart(2, '0')}`;

                    filteredEvents.forEach(eventObj => {
                        const li = document.createElement('li');
                        li.classList.add('month-event-item');

                        const dateDisplay = document.createElement('span');
                        dateDisplay.classList.add('event-date-display');
                        dateDisplay.textContent = `${formattedDate}:`;
                        li.appendChild(dateDisplay);

                        const eventInput = document.createElement('input');
                        eventInput.type = 'text';
                        eventInput.value = eventObj.text;
                        eventInput.dataset.originalValue = eventObj.text; // Guarda o valor original
                        eventInput.dataset.dateKey = dateKey;
                        eventInput.dataset.eventColor = eventObj.color; // Guarda a cor do evento
                        li.appendChild(eventInput);

                        const saveBtn = document.createElement('button');
                        saveBtn.classList.add('edit-event-btn');
                        saveBtn.textContent = 'Salvar';
                        saveBtn.addEventListener('click', () => {
                            const newText = eventInput.value.trim();
                            if (newText && newText !== eventInput.dataset.originalValue) {
                                // Atualiza o evento no array 'events'
                                events[dateKey] = events[dateKey].map(e =>
                                    e.text === eventInput.dataset.originalValue ? { ...e, text: newText } : e
                                );
                                eventInput.dataset.originalValue = newText; // Atualiza o valor original
                                saveEventsToStorage();
                                updateEventDetailsForDayDiv(document.querySelector(`.day[data-date="${dateKey}"]`), dateKey);
                                updateMonthInfo(year, monthIndex); // Re-renderiza a lista para refletir a mudança
                                updateEventListInSidebar(dateKey); // Atualiza a sidebar se o dia estiver selecionado
                            }
                        });
                        li.appendChild(saveBtn);

                        const removeBtn = document.createElement('button');
                        removeBtn.classList.add('remove-event-btn');
                        removeBtn.textContent = 'Remover';
                        removeBtn.addEventListener('click', () => {
                            if (confirm(`Tem certeza que deseja remover o evento "${eventObj.text}" de ${formattedDate}?`)) {
                                events[dateKey] = events[dateKey].filter(e => e.text !== eventObj.text);
                                if (events[dateKey].length === 0) {
                                    delete events[dateKey];
                                }
                                saveEventsToStorage();
                                updateEventDetailsForDayDiv(document.querySelector(`.day[data-date="${dateKey}"]`), dateKey);
                                updateMonthInfo(year, monthIndex); // Re-renderiza a lista
                                updateEventListInSidebar(dateKey); // Atualiza a sidebar
                                updateSchoolDaysCounters();
                                updateTotalAnnualSchoolDaysCounter();
                            }
                        });
                        li.appendChild(removeBtn);

                        monthEventListElement.appendChild(li);
                    });
                }
            }

            if (!hasEvents) {
                const li = document.createElement('li');
                li.textContent = 'Nenhuma informação disponível para este mês.';
                monthEventListElement.appendChild(li);
            }
        }

        // ---------- Botão "Apagar Eventos do Dia" ----------
        deleteDayBtn.addEventListener('click', () => {
            if (!currentSelectedDay) {
                alert('Por favor, selecione uma data para apagar os eventos.');
                return;
            }

            const date = currentSelectedDay.dataset.date;
            if (confirm(`Tem certeza que deseja apagar TODOS os eventos para o dia ${date}?`)) {
                // Filtra para manter apenas feriados padrão que não foram removidos explicitamente
                const defaultHolidaysForDate = defaultHolidays[date] || [];
                const eventsToKeep = defaultHolidaysForDate.filter(dh =>
                    (events[date] || []).some(e => e.text === dh.text && e.color === dh.color)
                );

                events[date] = eventsToKeep;

                // Se não houver mais eventos para esta data, remove a entrada da data
                if (events[date].length === 0) {
                    delete events[date];
                }

                // Reseta os checkboxes de início/fim de etapa se o dia selecionado era um deles
                if (startDateContagem === date) startDateContagem = null;
                if (endDateContagem === date) endDateContagem = null;

                updateEventDetailsForDayDiv(currentSelectedDay, date); // Atualiza o visual do dia no calendário
                updateEventListInSidebar(date); // Atualiza a lista de eventos na sidebar
                updateMonthInfo(allMonths[currentMonth].year, allMonths[currentMonth].monthIndex); // Atualiza a seção de informações do mês
                updateSchoolDaysCounters(); // Atualiza o contador de dias letivos do mês
                updateTotalAnnualSchoolDaysCounter(); // Atualiza o contador total de dias letivos do ano
                saveEventsToStorage();
                clearDaySelection(); // Limpa a seleção após apagar
            }
        });

        /* ---------- Botão para limpar TODOS os registros locais ---------- */
        clearStorageBtn.addEventListener('click', () => {
            if (confirm('ATENÇÃO: Isso apagará TODOS os eventos e configurações salvas localmente (incluindo logo e cor selecionada) e o calendário será reiniciado. Tem certeza?')) {
                localStorage.clear();
                calendarDb = createDefaultCalendarDb();
                activeCalendarId = calendarDb.activeCalendarId;
                syncStateFromActiveCalendar();
                populateDefaultHolidays();
                initCalendar();
                alert('Todos os registros locais foram limpos. O calendário foi reiniciado.');
            }
        });

        /* ---------- Navegação entre meses ---------- */
        prevMonthBtn.addEventListener('click', () => {
            if (currentMonth > 0) {
                currentMonth--;
                renderCurrentMonth();
                saveCurrentMonthToStorage();
            }
        });
        nextMonthBtn.addEventListener('click', () => {
            if (currentMonth < allMonths.length - 1) {
                currentMonth++;
                renderCurrentMonth();
                saveCurrentMonthToStorage();
            }
        });

        /* ---------- Contador de Dias Letivos do Mês ---------- */
        function calculateSchoolDays(targetYear, targetMonthIndex) {
            if (!startDateContagem || !endDateContagem) {
                return 'Defina Início e Fim da 1ª/4ª Etapa';
            }
            const start = new Date(startDateContagem + 'T00:00:00');
            const end = new Date(endDateContagem + 'T00:00:00');
            let schoolDays = 0;
            let currentDate = new Date(start);

            while (currentDate <= end) {
                const year = currentDate.getFullYear();
                const monthIndex = currentDate.getMonth();
                const day = currentDate.getDate();
                const dateKey = formatDate(year, monthIndex, day);
                const dayOfWeek = currentDate.getDay(); // 0 = Domingo, 6 = Sábado

                // Verifica se o dia está dentro do mês atual sendo exibido
                if (year === targetYear && monthIndex === targetMonthIndex) {
                    const isSunday = (dayOfWeek === 0);
                    const isSaturday = (dayOfWeek === 6);
                    const hasHolidayEvent = (events[dateKey] || []).some(event => event.color === 'holiday');
                    const isExplicitlyNonSchoolDay = (events[dateKey] || []).some(event => event.text === nonSchoolDayCheckbox.value);
                    const hasCustomEvent = (events[dateKey] || []).some(event =>
                        event.color !== 'holiday' &&
                        event.text !== topicInicio1Etapa.value &&
                        event.text !== topicFinal4Etapa.value &&
                        event.text !== nonSchoolDayCheckbox.value
                    );
                    const isJuly = (monthIndex === 6);

                    if (isExplicitlyNonSchoolDay || hasHolidayEvent || isSunday) {
                        // Não conta
                    } else if (isSaturday) {
                        if (hasCustomEvent) schoolDays++;
                    } else if (!isJuly) {
                        schoolDays++;
                    } else if (hasCustomEvent) {
                        schoolDays++;
                    }
                }
                currentDate.setDate(currentDate.getDate() + 1); // Avança para o próximo dia
            }
            return schoolDays;
        }

        function updateSchoolDaysCounters() {
            const { year, monthIndex } = allMonths[currentMonth];
            const schoolDaysCount = calculateSchoolDays(year, monthIndex);
            schoolDaysCounterDisplay.textContent = `Dias Letivos: ${schoolDaysCount}`;
            updateHeroSummary();
        }

        /* ---------- Contador TOTAL de Dias Letivos do Ano ---------- */
        function calculateTotalAnnualSchoolDays() {
            if (!startDateContagem || !endDateContagem) {
                return 'Defina Início e Fim da 1ª/4ª Etapa';
            }
            const start = new Date(startDateContagem + 'T00:00:00');
            const end = new Date(endDateContagem + 'T00:00:00');
            let totalSchoolDays = 0;
            let currentDate = new Date(start);

            while (currentDate <= end) {
                const year = currentDate.getFullYear();
                const monthIndex = currentDate.getMonth();
                const day = currentDate.getDate();
                const dateKey = formatDate(year, monthIndex, day);
                const dayOfWeek = currentDate.getDay(); // 0 = Domingo, 6 = Sábado
                const isSunday = (dayOfWeek === 0);
                const isSaturday = (dayOfWeek === 6);
                const hasHolidayEvent = (events[dateKey] || []).some(event => event.color === 'holiday');
                const isExplicitlyNonSchoolDay = (events[dateKey] || []).some(event => event.text === nonSchoolDayCheckbox.value);
                const hasCustomEvent = (events[dateKey] || []).some(event =>
                    event.color !== 'holiday' &&
                    event.text !== topicInicio1Etapa.value &&
                    event.text !== topicFinal4Etapa.value &&
                    event.text !== nonSchoolDayCheckbox.value
                );
                const isJuly = (monthIndex === 6);

                if (isExplicitlyNonSchoolDay || hasHolidayEvent || isSunday) {
                    // Não conta
                } else if (isSaturday) {
                    if (hasCustomEvent) totalSchoolDays++;
                } else if (!isJuly) {
                    totalSchoolDays++;
                } else if (hasCustomEvent) {
                    totalSchoolDays++;
                }
                currentDate.setDate(currentDate.getDate() + 1); // Avança para o próximo dia
            }
            return totalSchoolDays;
        }

        function updateTotalAnnualSchoolDaysCounter() {
            const totalCount = calculateTotalAnnualSchoolDays();
            totalAnnualSchoolDaysCounter.textContent = `Total de Dias Letivos (Ano): ${totalCount}`;
            updateHeroSummary();
        }

        /* ---------- Botão de Gerar PDF (impressão) ---------- */
        printPdfBtn.addEventListener('click', () => {
            const printPalette = getPrintPalette(printColorIntensity);
            const printContent = document.createElement('div');
            printContent.classList.add('print-area');
            // Itera por todos os meses e gera o HTML para impressão
            for (let i = 0; i < allMonths.length; i++) {
                const { name, year, monthIndex } = allMonths[i];
                const monthContainer = document.createElement('div');
                monthContainer.classList.add('print-month-container');
                // Contêiner para o título do mês e o contador de dias letivos
                const monthHeaderPrint = document.createElement('div');
                monthHeaderPrint.classList.add('month-header-print');
                const monthTitle = document.createElement('h2');
                monthTitle.classList.add('month-title-print');
               monthTitle.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)} ${year}`;
                monthHeaderPrint.appendChild(monthTitle);
                // Adiciona o contador de dias letivos para impressão
                const schoolDaysCount = calculateSchoolDays(year, monthIndex);
                const schoolDaysCounterPrint = document.createElement('span');
                schoolDaysCounterPrint.classList.add('school-days-counter-print');
                schoolDaysCounterPrint.textContent = `Dias Letivos: ${schoolDaysCount}`;
                monthHeaderPrint.appendChild(schoolDaysCounterPrint);
                monthContainer.appendChild(monthHeaderPrint);
                // Cria o calendário para o mês
                const monthDiv = document.createElement('div');
                monthDiv.classList.add('month');
                const dayNamesGrid = document.createElement('div');
                dayNamesGrid.classList.add('days-grid');
                const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                dayNames.forEach(dayName => {
                    const div = document.createElement('div');
                    div.classList.add('day-name');
                    div.textContent = dayName;
                    dayNamesGrid.appendChild(div);
                });
                monthDiv.appendChild(dayNamesGrid);
                const daysGridContainer = document.createElement('div');
                daysGridContainer.classList.add('days-grid');
                const daysInMonth = getDaysInMonth(year, monthIndex);
                const firstDay = getFirstDayOfMonth(year, monthIndex);
                for (let j = 0; j < firstDay; j++) {
                    const emptyDayDiv = document.createElement('div');
                    emptyDayDiv.classList.add('day', 'empty-day');
                    daysGridContainer.appendChild(emptyDayDiv);
                }
                for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                    const dateKey = formatDate(year, monthIndex, dayNum);
                    const dayDiv = document.createElement('div');
                    dayDiv.classList.add('day');
                    dayDiv.dataset.date = dateKey;
                    dayDiv.innerHTML = `<span class="day-number">${dayNum}</span>`;
                    applyPrintCellStyle(dayDiv, '#f1f3f5', '#d7dde3');
                    const dayOfWeek = new Date(year, monthIndex, dayNum).getDay();
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        dayDiv.classList.add('weekend');
                    }
                    const dayEvents = events[dateKey] || [];
                    let displayEventText = [];
                    let eventColor = '';
                    let eventCustomColor = null;
                    let isHoliday = false;
                    let isNonSchoolDay = false;

                    // --- INÍCIO DA LÓGICA DE IMPRESSÃO PARA "DIA NÃO LETIVO" ---
                    const nonSchoolDayEventIndex = dayEvents.findIndex(event => event.text === nonSchoolDayCheckbox.value);
                    isNonSchoolDay = nonSchoolDayEventIndex !== -1;

                    // Filtra os eventos para a impressão: remove "Dia Não Letivo" do texto a ser exibido
                    // e separa os outros eventos.
                    const eventsForDisplay = dayEvents.filter(event => event.text !== nonSchoolDayCheckbox.value);

                    if (isNonSchoolDay && eventsForDisplay.length === 0) {
                        // Se o dia é APENAS "Dia Não Letivo", não adiciona o dia ao grid de impressão.
                        // Isso faz com que ele não apareça.
                        continue; // Pula para o próximo dia do loop
                    }

                    eventsForDisplay.forEach(eventObj => {
                        if (eventObj.color === 'holiday') {
                            isHoliday = true;
                            const holidayText = eventObj.text.replace(/Feriado:?\s*/i, '').trim();
                            if (!displayEventText.includes(`Feriado: ${holidayText}`)) {
                                displayEventText.push(`Feriado: ${holidayText}`);
                            }
                        } else {
                            displayEventText.push(eventObj.text);
                            if (!eventColor) { // Pega a primeira cor de evento não-feriado
                                eventColor = eventObj.color;
                                eventCustomColor = eventObj.customColor || null;
                            }
                        }
                    });
                    // --- FIM DA LÓGICA DE IMPRESSÃO PARA "DIA NÃO LETIVO" ---

                    // Aplica classes de estilo para o dia (feriado, não letivo, etc.)
                    if (isNonSchoolDay) {
                        dayDiv.classList.add('non-school-day'); // Mantém a classe para estilo de fundo
                        applyPrintCellStyle(dayDiv, printPalette.nonSchool.bg, printPalette.nonSchool.border, !printBorderOnly);
                    }
                    if (isHoliday) {
                        dayDiv.classList.add('holiday');
                        applyPrintCellStyle(dayDiv, printPalette.holiday.bg, printPalette.holiday.border, !printBorderOnly);
                    } else if (eventsForDisplay.length > 0) { // Aplica cor de evento se houver outros eventos
                        dayDiv.classList.add('has-event', `event-color-${eventColor}`);
                        const selectedPrintColor = eventColor === 'custom'
                            ? { bg: mixHexWithWhite(eventCustomColor || customSelectedEventColor, printColorIntensity), border: eventCustomColor || customSelectedEventColor }
                            : printPalette[eventColor];
                        if (selectedPrintColor) {
                            applyPrintCellStyle(dayDiv, selectedPrintColor.bg, selectedPrintColor.border, !printBorderOnly);
                        }
                    } else {
                        const hasWeekendOnly = dayOfWeek === 0 || dayOfWeek === 6;
                        applyPrintCellStyle(
                            dayDiv,
                            hasWeekendOnly ? '#eceff3' : '#f3f4f6',
                            hasWeekendOnly ? '#d2d7de' : '#d7dde3',
                            true
                        );
                    }

                    // Adiciona o texto do evento, se houver
                    if (displayEventText.length > 0) {
                        const eventTextSpan = document.createElement('span');
                        eventTextSpan.classList.add('event-text');
                        eventTextSpan.textContent = displayEventText.join(', ');
                        eventTextSpan.style.fontWeight = boldEventText ? '700' : '500';
                        dayDiv.appendChild(eventTextSpan);
                    }
                    daysGridContainer.appendChild(dayDiv);
                }
                monthDiv.appendChild(daysGridContainer);
                monthContainer.appendChild(monthDiv);
                // Adiciona as informações do mês para impressão
                const monthInfoPrintDiv = document.createElement('div');
                monthInfoPrintDiv.classList.add('month-info');
                monthInfoPrintDiv.innerHTML = `<h4>Informações do Mês:</h4><ul class="month-event-list-print"></ul>`;
                const monthEventListPrint = monthInfoPrintDiv.querySelector('.month-event-list-print');
                let hasEventsInPrintMonth = false;
                for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                    const dateKey = formatDate(year, monthIndex, dayNum);
                    const dayEvents = events[dateKey];
                    if (dayEvents && dayEvents.length > 0) {
                        // Filtra eventos "Dia Não Letivo" para não aparecerem na lista de informações do mês
                        const filteredEvents = dayEvents.filter(event => event.text !== nonSchoolDayCheckbox.value);
                        if (filteredEvents.length > 0) {
                            hasEventsInPrintMonth = true;
                            const formattedDate = `${String(dayNum).padStart(2, '0')}/${String(monthIndex + 1).padStart(2, '0')}`;
                            filteredEvents.forEach(eventObj => {
                                const li = document.createElement('li');
                                li.classList.add('month-event-item-print'); // Nova classe para itens de impressão
                                // Garante que "Feriado: " apareça apenas uma vez e capitalizado
                                const eventText = eventObj.text.replace(/Feriado:?\s*/i, '').trim();
                                li.textContent = `${formattedDate}: ${eventObj.color === 'holiday' ? 'Feriado: ' : ''}${eventText}`;
                                monthEventListPrint.appendChild(li);
                            });
                        }
                    }
                }
                if (!hasEventsInPrintMonth) {
                    monthEventListPrint.innerHTML = '<li>Nenhuma informação disponível para este mês.</li>';
                }
                monthContainer.appendChild(monthInfoPrintDiv);
                // Adiciona as observações adicionais para impressão
                const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
                const notesForMonth = monthNotes[monthKey] || '';
                if (notesForMonth.trim() !== '') {
                    const notesPrintDiv = document.createElement('div');
                    notesPrintDiv.classList.add('additional-notes-print');
                    notesPrintDiv.innerHTML = `<h4>Observações Adicionais do Mês:</h4><p>${notesForMonth.replace(/\n/g, '<br>')}</p>`;
                    monthContainer.appendChild(notesPrintDiv);
                }
                // Adiciona o rodapé a CADA página
                const footerPrint = document.createElement('div');
                footerPrint.classList.add('print-footer');
                const footerP = document.createElement('p');
                footerP.textContent = 'ENSPS - Calendário 2026';
                footerPrint.appendChild(footerP);
                const footerImg = document.createElement('img');
                footerImg.id = 'printFooterLogo';
                footerImg.alt = 'Logo do Rodapé';
                const savedLogo = calendarDb?.ui?.footerLogo || localStorage.getItem('footerLogo');
                if (savedLogo) {
                    footerImg.src = savedLogo;
                    footerImg.style.display = 'inline-block';
                } else {
                    footerImg.src = defaultLogoUrl; // Usa a logo padrão se nenhuma foi salva
                    footerImg.style.display = 'inline-block';
                }
                footerPrint.appendChild(footerImg);
                monthContainer.appendChild(footerPrint); // Adiciona o footer ao container do mês
                printContent.appendChild(monthContainer);
            }
			

            // Abre uma nova janela para impressão
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Boletim Informativo ENSPS - Impressão</title>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
                    <style>
                        /* Inclui todos os estilos relevantes para impressão */
                        ${document.querySelector('style').innerHTML}
                        /* Estilos específicos para a área de impressão */
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: 'Roboto', sans-serif;
                            color: #000;
                            background-color: #fff;
                        }
                        .print-area {
                            width: 100%;
                            margin: 0;
                            padding: 0;
                        }
                        /* Oculta o título principal na impressão */
                        .main-title {
                            display: none;
                        }
                        .print-month-container {
                            page-break-after: always;
                            break-after: page;
                            margin: 15mm 15mm 0 15mm; /* Margens: top 15mm, laterais 15mm, bottom 0 */
                            box-sizing: border-box;
                            width: auto;
                            position: relative;
                            display: block;
                        }
                        .print-month-container:last-child {
                            page-break-after: auto !important;
                            break-after: auto !important;
                        }
                        .month-header-print {
                            display: flex;
                            justify-content: space-between;
                            align-items: baseline;
                            margin: 10mm 0 10mm 0;
                        }
                        .month-title-print {
                            color: #003366;
                            font-size: 1.8em;
                            font-weight: bold;
                            margin: 0;
                        }
                        .school-days-counter-print {
                            font-size: 1.2em;
                            color: #555;
                            font-weight: normal;
                        }
                        .month {
                            box-shadow: none;
                            border: 1px solid #ccc;
                            border-radius: 0;
                            padding: 10px;
                            width: 100%;
                            margin-bottom: 10mm;
                        }
                        .days-grid {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            gap: 5px;
                        }
                        .day-name {
                            font-weight: 700;
                            text-align: center;
                            color: #333;
                            padding-bottom: 5px;
                            border-bottom: 1px solid #ccc;
                            margin-bottom: 2px;
                            font-size: 0.82em;
                        }
                        .day {
                            background-color: #f1f3f5;
                            border: 1px solid #d7dde3;
                            border-radius: 8px;
                            padding: 10px;
                            text-align: center;
                            cursor: pointer;
                            min-height: 100px;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 0.9em;
                            position: relative;
                            transition: all 0.2s ease-in-out;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                            overflow: hidden;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        .day-number {
                            font-weight: 700;
                            font-size: 1.1em; /* Aumenta a fonte do número do dia */
                            margin-bottom: 3px;
                            color: #000;
                        }
                        .event-text {
                            font-size: 0.75em;
                            line-height: 1.2;
                            margin-top: 3px;
                            color: #555;
                            word-break: break-word;
                            text-align: center;
                            width: 100%;
                            padding: 0 2px;
                            box-sizing: border-box;
                            white-space: normal;
                            font-weight: ${boldEventText ? '700' : '500'} !important;
                        }
                        .empty-day {
                            background-color: #f1f3f5;
                            border: 1px dashed #dfe3e8;
                        }
                        /* Cores dos dias para impressão */
                        .day.has-event.event-color-green { border-color: #28a745; }
                        .day.has-event.event-color-pink { border-color: #e83e8c; }
                        .day.has-event.event-color-yellow { border-color: #ffc107; }
                        .day.has-event.event-color-blue { border-color: #007bff; }
                        .day.has-event.event-color-purple { border-color: #6f42c1; }
                        .day.has-event.event-color-orange { border-color: #fd7e14; }
                        .holiday { border-color: #dc3545; color: #a00; }
                        .holiday .day-number, .holiday .event-text { color: #a00; }
                        .non-school-day { border-color: #6c757d; color: #444; }
                        .non-school-day .day-number, .non-school-day .event-text { color: #444; }
                        .weekend { background-color: #f0f0f0; color: #666; }
                        .weekend .day-number, .weekend .event-text { color: #666; }
                        /* NOVO: Estilo para o dia não letivo na impressão - apenas remove o texto, não o dia */
                        .month-info {
                            box-shadow: none;
                            border: 1px solid #ccc;
                            border-radius: 0;
                            padding: 10px;
                            width: 100%;
                            margin-top: 0;
                            min-height: auto;
                            flex-grow: 1;
                        }
                        .month-info h4 {
                            color: #000;
                            border-bottom: 1px solid #ccc;
                            padding-bottom: 5px;
                            margin-bottom: 10px;
                            font-size: 1.2em;
                        }
                        .month-event-list-print {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        }
                        .month-event-list-print li {
                            margin-bottom: 5px;
                            color: #333;
                            font-size: 0.9em;
                        }
                        .additional-notes-print {
                            margin-top: 10mm;
                            padding-top: 5mm;
                            border-top: 1px solid #ccc;
                            font-size: 0.9em;
                            color: #333;
                        }
                        .additional-notes-print h4 {
                            color: #000;
                            font-size: 1.1em;
                            margin-bottom: 5px;
                        }
                        .print-footer {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 10px 0;
                            background-color: #fff;
                            color: #000;
                            border-top: 1px solid #ccc;
                            margin-top: 10mm;
                            width: 100%;
                            box-sizing: border-box;
                            page-break-inside: avoid;
                        }
                        .print-footer img {
                            display: inline-block !important;
                            max-height: 60px;
                            margin: 0 10px;
                        }
                        .print-footer p {
                            color: #000;
                            font-size: 1em;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            // printWindow.close(); // Pode fechar a janela após a impressão, se desejar
        });

        /* ---------- Importação e persistência de Logo ---------- */
        logoUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    footerLogo.src = e.target.result;
                    footerLogo.style.display = 'inline-block';
                    footerText.style.display = 'none';
                    localStorage.setItem('footerLogo', e.target.result);
                    if (calendarDb) {
                        if (!calendarDb.ui) calendarDb.ui = {};
                        calendarDb.ui.footerLogo = e.target.result;
                        saveCalendarDbToStorage();
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        function loadSavedLogo() {
            const savedLogo = calendarDb?.ui?.footerLogo || localStorage.getItem('footerLogo');
            if (savedLogo) {
                footerLogo.src = savedLogo;
                footerLogo.style.display = 'inline-block';
                footerText.style.display = 'none';
            } else {
                footerLogo.src = defaultLogoUrl; // Carrega a logo padrão se nenhuma foi salva
                footerLogo.style.display = 'inline-block';
                footerText.style.display = 'none'; // Esconde o texto padrão quando a logo é exibida
            }
        }

        if (printIntensitySlider) {
            printIntensitySlider.addEventListener('input', (event) => {
                printColorIntensity = Number(event.target.value);
                updatePrintIntensityUI();
                savePrintIntensityToStorage();
            });
        }

        if (printBorderOnlyToggle) {
            printBorderOnlyToggle.addEventListener('change', (event) => {
                printBorderOnly = event.target.checked;
                updatePrintIntensityUI();
                savePrintBorderOnlyToStorage();
            });
        }

        if (boldEventTextToggle) {
            boldEventTextToggle.addEventListener('change', (event) => {
                boldEventText = event.target.checked;
                saveBoldEventTextToStorage();
                renderCurrentMonth();
            });
        }

        if (customColorPicker) {
            customColorPicker.addEventListener('input', (event) => {
                customSelectedEventColor = event.target.value;
                currentSelectedEventColor = 'custom';
                document.getElementById('colorCustom').checked = true;
                saveEventColorToStorage();
                updatePrintIntensityUI();
                if (currentSelectedDay) {
                    const date = currentSelectedDay.dataset.date;
                    if (events[date]) {
                        events[date] = events[date].map(eventObj => {
                            const isDefaultHolidayEvent = (defaultHolidays[date] || []).some(dh => dh.text === eventObj.text);
                            if (!isDefaultHolidayEvent && eventObj.text !== topicInicio1Etapa.value && eventObj.text !== topicFinal4Etapa.value && eventObj.text !== nonSchoolDayCheckbox.value) {
                                return { ...eventObj, color: 'custom', customColor: customSelectedEventColor };
                            }
                            return eventObj;
                        });
                        updateEventDetailsForDayDiv(currentSelectedDay, date);
                        updateEventListInSidebar(date);
                        updateMonthInfo(allMonths[currentMonth].year, allMonths[currentMonth].monthIndex);
                        saveEventsToStorage();
                    }
                }
            });
        }

        /* ---------- Listener para mudança de cor de eventos ---------- */
        eventColorRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                currentSelectedEventColor = event.target.value;
                saveEventColorToStorage();
                if (currentSelectedDay) {
                    const date = currentSelectedDay.dataset.date;
                    if (events[date]) {
                        // Atualiza a cor de todos os eventos personalizados (não feriados ou marcadores de etapa) do dia selecionado
                        events[date] = events[date].map(eventObj => {
                            // Não altera a cor de feriados padrão, marcadores de etapa ou "Dia Não Letivo"
                            const isDefaultHolidayEvent = (defaultHolidays[date] || []).some(dh => dh.text === eventObj.text);
                            if (!isDefaultHolidayEvent && eventObj.text !== topicInicio1Etapa.value && eventObj.text !== topicFinal4Etapa.value && eventObj.text !== nonSchoolDayCheckbox.value) {
                                return { ...eventObj, color: currentSelectedEventColor, customColor: currentSelectedEventColor === 'custom' ? customSelectedEventColor : null };
                            }
                            return eventObj;
                        });
                        // Re-renderiza o dia para aplicar a nova cor e atualiza a sidebar/month-info
                        updateEventDetailsForDayDiv(currentSelectedDay, date);
                        updateEventListInSidebar(date);
                        updateMonthInfo(allMonths[currentMonth].year, allMonths[currentMonth].monthIndex);
                        updateSchoolDaysCounters(); // Atualiza o contador de dias letivos do mês
                        updateTotalAnnualSchoolDaysCounter(); // Atualiza o contador total de dias letivos do ano
                        saveEventsToStorage();
                    }
                }
            });
        });

        /* ---------- Funções de Exportar e Importar Dados ---------- */
        function exportAllData() {
            saveCalendarDbToStorage();
            const dataToExport = {
                ...calendarDb,
                exportedAt: new Date().toISOString()
            };
            const jsonData = JSON.stringify(dataToExport, null, 2); // Formata com indentação para legibilidade
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'calendario_ensps_backup.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('Dados do calendário exportados com sucesso!');
        }

        function importAllData(event) {
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (confirm('Importar dados substituirá todos os registros atuais. Deseja continuar?')) {
                        localStorage.clear();
                        calendarDb = normalizeCalendarDb(importedData);
                        activeCalendarId = calendarDb.activeCalendarId;
                        if (calendarDb.ui?.footerLogo) {
                            localStorage.setItem('footerLogo', calendarDb.ui.footerLogo);
                        }
                        syncStateFromActiveCalendar();
                        saveCalendarDbToStorage();
                        loadCalendarDbFromStorage();
                        initCalendar();
                        updateComunicadosSidebar(null);
                        alert('Dados importados com sucesso!');
                    }
                } catch (error) {
                    alert('Erro ao importar o arquivo. Certifique-se de que é um arquivo JSON válido.');
                    console.error('Erro de importação:', error);
                } finally {
                    event.target.value = '';
                }
            };
            reader.readAsText(file);
        }
        // Adiciona listeners para os novos botões de exportar/importar
        exportDataBtn.addEventListener('click', exportAllData);
        importDataInput.addEventListener('change', importAllData);
        newComunicadoForDayBtn?.addEventListener('click', () => {
            const dateKey = getCurrentSelectedDateKey();
            if (!dateKey) {
                alert('Selecione uma data antes de criar um comunicado do dia.');
                return;
            }
            openComunicadosModal('day', dateKey, true);
        });
        viewDayComunicadosBtn?.addEventListener('click', () => {
            const dateKey = getCurrentSelectedDateKey();
            if (!dateKey) {
                alert('Selecione uma data para visualizar os comunicados do dia.');
                return;
            }
            openComunicadosModal('day', dateKey, false);
        });
        viewAllComunicadosBtn?.addEventListener('click', () => openComunicadosModal('all', null, false));
        closeComunicadosModalBtn?.addEventListener('click', closeComunicadosModal);
        createComunicadoBtn?.addEventListener('click', () => loadComunicadoIntoForm(null, getCurrentSelectedDateKey()));
        filterAllComunicadosBtn?.addEventListener('click', () => {
            comunicadosFilterMode = 'all';
            renderComunicadosList();
        });
        filterDayComunicadosBtn?.addEventListener('click', () => {
            const dateKey = getCurrentSelectedDateKey();
            if (!dateKey) {
                alert('Selecione uma data para filtrar os comunicados do dia.');
                return;
            }
            comunicadosFilterMode = 'day';
            renderComunicadosList(dateKey);
        });
        saveComunicadoBtn?.addEventListener('click', saveComunicado);
        deleteComunicadoBtn?.addEventListener('click', deleteComunicado);
        comunicadosModal?.addEventListener('click', (event) => {
            if (event.target === comunicadosModal) closeComunicadosModal();
        });

        window.addEventListener('message', event => {
            const data = event.data;
            if (!data || typeof data !== 'object') return;
            if (data.type === 'ensps:comunicadosSync') {
                aplicarComunicadosDoPai(data.items || []);
                return;
            }
            if (data.type === 'ensps:boletimDbSync') {
                if (Array.isArray(data.comunicados)) {
                    aplicarComunicadosDoPai(data.comunicados);
                }
                if (data.db && typeof data.db === 'object') {
                    aplicarBancoBoletimDoPai(data.db);
                }
            }
        });
        window.addEventListener('ensps-bootstrap-comunicados', () => {
            aplicarBootstrapComunicadosDoPai();
        });

        /* ---------- Inicialização do calendário e eventos padrão ---------- */
        function initCalendar() {
            loadCalendarDbFromStorage();
            loadThemeFromStorage();
            loadCurrentMonthFromStorage();
            populateDefaultHolidays();
            mergeDefaultHolidaysIntoEvents();
            saveEventsToStorage();
            loadCalendarDbFromStorage();
            refreshCalendarMeta();
            updateCalendarSelectOptions();
            renderCurrentMonth();
            if (calendarSelect && activeCalendarId) {
                calendarSelect.value = activeCalendarId;
            }
            loadSavedLogo();
            loadEventColorFromStorage();
            loadPrintIntensityFromStorage();
            updateSchoolDaysCounters();
            updateTotalAnnualSchoolDaysCounter();
            updateHeroSummary();
            aplicarBootstrapComunicadosDoPai();
            solicitarComunicadosDoPai();
            solicitarBancoBoletimDoPai();
        }
        document.addEventListener('DOMContentLoaded', initCalendar);

