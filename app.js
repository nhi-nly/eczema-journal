(function () {
  'use strict';

  // Inline SVG constants so icons always render reliably on all devices offline & online
  const SVG_CHECK_14 = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10.6811 4.19388C11.0227 4.53556 11.0227 5.08944 10.6811 5.43113L6.30612 9.80613C5.96444 10.1477 5.41056 10.1477 5.06887 9.80613L3.31887 8.05613C2.98727 7.71279 2.99202 7.16705 3.32953 6.82953C3.66705 6.49202 4.21279 6.48727 4.55612 6.81888L5.6875 7.95025L9.44388 4.19388C9.78556 3.85229 10.3394 3.85229 10.6811 4.19388Z" fill="white"/></svg>';
  const SVG_CHECK_12 = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.15525 3.59475C9.44804 3.88762 9.44804 4.36238 9.15525 4.65525L5.40525 8.40525C5.11238 8.69804 4.63762 8.69804 4.34475 8.40525L2.84475 6.90525C2.56052 6.61097 2.56459 6.14319 2.85389 5.85389C3.14319 5.56459 3.61097 5.56052 3.90525 5.84475L4.875 6.8145L8.09475 3.59475C8.38762 3.30196 8.86238 3.30196 9.15525 3.59475Z" fill="white"/></svg>';
  const SVG_RADIO_DOT = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4.375 7C4.375 8.44878 5.55122 9.625 7 9.625C8.44878 9.625 9.625 8.44878 9.625 7C9.625 5.55122 8.44878 4.375 7 4.375C5.55122 4.375 4.375 5.55122 4.375 7Z" fill="white"/></svg>';
  const SVG_MOOD_OTHERS = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10.3333 7.33333C10.6111 7.33333 10.8472 7.23611 11.0417 7.04167C11.2361 6.84722 11.3333 6.61111 11.3333 6.33333C11.3333 6.05556 11.2361 5.81944 11.0417 5.625C10.8472 5.43056 10.6111 5.33333 10.3333 5.33333C10.0556 5.33333 9.81944 5.43056 9.625 5.625C9.43056 5.81944 9.33333 6.05556 9.33333 6.33333C9.33333 6.61111 9.43056 6.84722 9.625 7.04167C9.81944 7.23611 10.0556 7.33333 10.3333 7.33333ZM5.66667 7.33333C5.94444 7.33333 6.18056 7.23611 6.375 7.04167C6.56944 6.84722 6.66667 6.61111 6.66667 6.33333C6.66667 6.05556 6.56944 5.81944 6.375 5.625C6.18056 5.43056 5.94444 5.33333 5.66667 5.33333C5.38889 5.33333 5.15278 5.43056 4.95833 5.625C4.76389 5.81944 4.66667 6.05556 4.66667 6.33333C4.66667 6.61111 4.76389 6.84722 4.95833 7.04167C5.15278 7.23611 5.38889 7.33333 5.66667 7.33333ZM8 11.6667C8.75556 11.6667 9.44167 11.4528 10.0583 11.025C10.675 10.5972 11.1222 10.0333 11.4 9.33333H4.6C4.87778 10.0333 5.325 10.5972 5.94167 11.025C6.55833 11.4528 7.24444 11.6667 8 11.6667ZM8 14.6667C7.07778 14.6667 6.21111 14.4917 5.4 14.1417C4.58889 13.7917 3.88333 13.3167 3.28333 12.7167C2.68333 12.1167 2.20833 11.4111 1.85833 10.6C1.50833 9.78889 1.33333 8.92222 1.33333 8C1.33333 7.07778 1.50833 6.21111 1.85833 5.4C2.20833 4.58889 2.68333 3.88333 3.28333 3.28333C3.88333 2.68333 4.58889 2.20833 5.4 1.85833C6.21111 1.50833 7.07778 1.33333 8 1.33333C8.92222 1.33333 9.78889 1.50833 10.6 1.85833C11.4111 2.20833 12.1167 2.68333 12.7167 3.28333C13.3167 3.88333 13.7917 4.58889 14.1417 5.4C14.4917 6.21111 14.6667 7.07778 14.6667 8C14.6667 8.92222 14.4917 9.78889 14.1417 10.6C13.7917 11.4111 13.3167 12.1167 12.7167 12.7167C12.1167 13.3167 11.4111 13.7917 10.6 14.1417C9.78889 14.4917 8.92222 14.6667 8 14.6667ZM8 13.3333C9.48889 13.3333 10.75 12.8167 11.7833 11.7833C12.8167 10.75 13.3333 9.48889 13.3333 8C13.3333 6.51111 12.8167 5.25 11.7833 4.21667C10.75 3.18333 9.48889 2.66667 8 2.66667C6.51111 2.66667 5.25 3.18333 4.21667 4.21667C3.18333 5.25 2.66667 6.51111 2.66667 8C2.66667 9.48889 3.18333 10.75 4.21667 11.7833C5.25 12.8167 6.51111 13.3333 8 13.3333Z" fill="#386652"/></svg>';
  const SVG_DELETE_TRASH = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.66667 4.66667H13.3333M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333M3.33333 4.66667L4 12.6667C4 13.403 4.59695 14 5.33333 14H10.6667C11.403 14 12 13.403 12 12.6667L12.6667 4.66667M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const USER_NAME_KEY = 'ECZEMA_JOURNAL_USER_NAME_V2';
  const LOGS_BY_DATE_KEY = 'ECZEMA_JOURNAL_LOGS_BY_DATE_V2';
  const IDB_NAME = 'EczemaJournalOfflineDB';
  const IDB_STORE = 'daily_logs';

  const toastBanner = document.getElementById('toastBanner');
  let toastTimeout = null;
  let isRestoringState = false;

  function showToast(message) {
    if (!toastBanner) return;
    toastBanner.textContent = message;
    toastBanner.classList.add('visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastBanner.classList.remove('visible');
    }, 2200);
  }

  // 0. Start Screen (Input Name Once) & 2 Alternating Loading Animations
  const startScreenOverlay = document.getElementById('startScreenOverlay');
  const startScreenForm = document.getElementById('startScreenForm');
  const userNameInput = document.getElementById('userNameInput');
  const greetingText = document.getElementById('greetingText');
  const avatarInitials = document.getElementById('avatarInitials');
  const profileGroupBtn = document.getElementById('profileGroupBtn');

  const loadingScreenOverlay = document.getElementById('loadingScreenOverlay');
  const loadingAnim1 = document.getElementById('loadingAnim1');
  const loadingAnim2 = document.getElementById('loadingAnim2');

  let currentAnimMode = 1;
  let loadingSequenceTimer1 = null;
  let loadingSequenceTimer2 = null;

  function computeInitials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'EJ';
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function applyUserName(rawName) {
    const cleanName = (rawName || '').trim();
    if (!cleanName) {
      if (greetingText) greetingText.textContent = 'Hi 👋';
      if (avatarInitials) avatarInitials.textContent = 'EJ';
      return '';
    }
    if (greetingText) {
      greetingText.textContent = `Hi, ${cleanName} 👋`;
    }
    if (avatarInitials) {
      avatarInitials.textContent = computeInitials(cleanName);
    }
    return cleanName;
  }

  function setLoadingAnimationMode(mode) {
    currentAnimMode = mode === 2 ? 2 : 1;
    if (loadingAnim1) loadingAnim1.classList.toggle('is-hidden', currentAnimMode !== 1);
    if (loadingAnim2) loadingAnim2.classList.toggle('is-hidden', currentAnimMode !== 2);
  }

  function clearLoadingTimers() {
    if (loadingSequenceTimer1) {
      clearTimeout(loadingSequenceTimer1);
      loadingSequenceTimer1 = null;
    }
    if (loadingSequenceTimer2) {
      clearTimeout(loadingSequenceTimer2);
      loadingSequenceTimer2 = null;
    }
  }

  function runAlternatingLoadingTransition(userName) {
    if (!loadingScreenOverlay) return;
    clearLoadingTimers();

    setLoadingAnimationMode(1);
    loadingScreenOverlay.classList.remove('is-hidden');

    loadingSequenceTimer1 = setTimeout(() => {
      setLoadingAnimationMode(2);
    }, 2000);

    loadingSequenceTimer2 = setTimeout(() => {
      loadingScreenOverlay.classList.add('is-hidden');
      if (userName) showToast(`Welcome, ${userName}!`);
    }, 4000);
  }

  // Only show Start Screen if user hasn't saved their name yet
  const savedUserName = localStorage.getItem(USER_NAME_KEY);
  if (savedUserName && savedUserName.trim()) {
    applyUserName(savedUserName);
    if (userNameInput) userNameInput.value = savedUserName;
    if (startScreenOverlay) startScreenOverlay.classList.add('is-hidden');
  } else {
    if (startScreenOverlay) startScreenOverlay.classList.remove('is-hidden');
  }

  if (startScreenForm) {
    startScreenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredName = userNameInput ? userNameInput.value.trim() : '';
      if (!enteredName) {
        if (userNameInput) userNameInput.focus();
        return;
      }
      localStorage.setItem(USER_NAME_KEY, enteredName);
      const finalName = applyUserName(enteredName);
      if (startScreenOverlay) {
        startScreenOverlay.classList.add('is-hidden');
      }
      runAlternatingLoadingTransition(finalName);
    });
  }

  if (profileGroupBtn) {
    profileGroupBtn.addEventListener('click', () => {
      clearLoadingTimers();
      if (loadingScreenOverlay) loadingScreenOverlay.classList.add('is-hidden');
      if (startScreenOverlay) {
        startScreenOverlay.classList.remove('is-hidden');
        if (userNameInput) {
          userNameInput.focus();
          userNameInput.select();
        }
      }
    });
  }

  // 1. Multi-Day Date Switcher & Week Strip Navigation (View & Log Older Days + Today)
  const weekStrip = document.getElementById('weekStrip');
  const dayPills = weekStrip ? Array.from(weekStrip.querySelectorAll('.day-pill')) : [];
  const currentDateLabel = document.getElementById('currentDateLabel');
  const btnPrevDay = document.getElementById('btnPrevDay');
  const btnNextDay = document.getElementById('btnNextDay');
  const calendarDateInput = document.getElementById('calendarDateInput');

  const SHORT_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const TITLE_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function normalizeDate(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function toDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function parseDateKey(key) {
    const parts = (key || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return normalizeDate(new Date());
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  const todayDate = normalizeDate(new Date());
  const todayKey = toDateKey(todayDate);
  let selectedDate = new Date(todayDate);
  let selectedDateKey = todayKey;

  if (calendarDateInput) {
    calendarDateInput.max = todayKey;
    calendarDateInput.value = todayKey;
  }

  function formatDateHeader(dateObj) {
    const d = normalizeDate(dateObj);
    const dayName = TITLE_DAYS[d.getDay()];
    const dayNum = d.getDate();
    const monthName = SHORT_MONTHS[d.getMonth()];
    const year = d.getFullYear();
    const isToday = toDateKey(d) === todayKey;
    const diffDays = Math.round((todayDate.getTime() - d.getTime()) / 86400000);
    if (isToday) {
      return `Today • ${dayName}, ${dayNum} ${monthName} ${year}`;
    }
    if (diffDays === 1) {
      return `Yesterday • ${dayName}, ${dayNum} ${monthName} ${year}`;
    }
    return `${dayName}, ${dayNum} ${monthName} ${year}`;
  }

  function renderWeekStrip() {
    // Anchor the 6-day strip so that when near Today, Today is at index 3 (with 2 future days shown).
    // When viewing older dates more than 3 days in the past, center the strip around selectedDate.
    const diffFromToday = Math.round((todayDate.getTime() - selectedDate.getTime()) / 86400000);
    let anchorIndex3Date = new Date(todayDate);
    if (diffFromToday > 3) {
      anchorIndex3Date = new Date(selectedDate);
    }

    dayPills.forEach((pill, i) => {
      const offset = i - 3;
      const d = new Date(anchorIndex3Date);
      d.setDate(anchorIndex3Date.getDate() + offset);
      const dKey = toDateKey(d);
      const isToday = dKey === todayKey;
      const isFuture = d.getTime() > todayDate.getTime();
      const isSelected = dKey === selectedDateKey;

      const dayNameEl = pill.querySelector('.day-name');
      const dayNumEl = pill.querySelector('.day-num');
      if (dayNameEl) {
        dayNameEl.textContent = isToday ? 'TODAY' : SHORT_DAYS[d.getDay()];
      }
      if (dayNumEl) {
        dayNumEl.textContent = String(d.getDate());
      }
      pill.setAttribute('data-date-key', dKey);
      pill.classList.toggle('active', isSelected);
      pill.classList.toggle('future', isFuture && !isSelected);
    });

    if (currentDateLabel) {
      currentDateLabel.textContent = formatDateHeader(selectedDate);
    }
    if (calendarDateInput) {
      calendarDateInput.value = selectedDateKey;
    }
  }

  function switchToDate(newDate) {
    const target = normalizeDate(newDate);
    // Prevent selecting future days beyond Today
    if (target.getTime() > todayDate.getTime()) {
      showToast('Cannot log future dates beyond Today');
      return;
    }
    saveCurrentDayLog();
    selectedDate = target;
    selectedDateKey = toDateKey(selectedDate);
    renderWeekStrip();
    loadDayLog(selectedDateKey);
  }

  dayPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const key = pill.getAttribute('data-date-key');
      if (!key) return;
      switchToDate(parseDateKey(key));
    });
  });

  if (btnPrevDay) {
    btnPrevDay.addEventListener('click', () => {
      const prev = new Date(selectedDate);
      prev.setDate(selectedDate.getDate() - 1);
      switchToDate(prev);
    });
  }

  if (btnNextDay) {
    btnNextDay.addEventListener('click', () => {
      const next = new Date(selectedDate);
      next.setDate(selectedDate.getDate() + 1);
      if (next.getTime() > todayDate.getTime()) {
        showToast('Already on Today');
        return;
      }
      switchToDate(next);
    });
  }

  if (calendarDateInput) {
    calendarDateInput.addEventListener('change', () => {
      if (!calendarDateInput.value) return;
      switchToDate(parseDateKey(calendarDateInput.value));
    });
  }

  // 2. Quick Mood / Skin Feeling Selector (Can select or tap active to unselect)
  const moodRow = document.getElementById('moodRow');
  if (moodRow) {
    const moodBtns = Array.from(moodRow.querySelectorAll('.mood-btn'));
    moodBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('active');
        moodBtns.forEach((b) => b.classList.remove('active'));
        if (!wasActive) {
          btn.classList.add('active');
        }
        saveCurrentDayLog();
      });
    });
  }

  // 3. Collapsible Accordion Headers
  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const card = header.closest('.section-card');
      if (card) {
        card.classList.toggle('accordion-card-collapsed');
      }
    });
  });

  // 4. Custom Checkboxes (including hiding/showing target input like Harsh Environment note)
  function setCheckboxState(item, checked) {
    const box = item.querySelector('.custom-checkbox');
    if (!box) return;
    const checkSize = item.getAttribute('data-check-size') || '14';
    const targetInputId = item.getAttribute('data-toggle-target-input');
    const targetInput = targetInputId ? document.getElementById(targetInputId) : null;

    if (!checked) {
      box.classList.remove('checked', 'checked-14');
      box.classList.add(checkSize === '12' ? 'size-12' : 'size-14');
      box.innerHTML = '';
      item.classList.remove('checked-gap', 'is-checked');
      if (item.hasAttribute('data-highlight-card')) {
        item.classList.remove('active-card');
      }
      if (targetInput) {
        targetInput.classList.add('is-hidden');
      }
    } else {
      box.classList.remove('size-14', 'size-12');
      if (checkSize === '12') {
        box.classList.add('checked-14');
        box.innerHTML = SVG_CHECK_12;
      } else {
        box.classList.add('checked');
        box.innerHTML = SVG_CHECK_14;
      }
      if (item.classList.contains('timing-check-item')) {
        item.classList.add('checked-gap', 'is-checked');
      }
      if (item.hasAttribute('data-highlight-card')) {
        item.classList.add('active-card');
      }
      if (targetInput) {
        targetInput.classList.remove('is-hidden');
        if (!isRestoringState) {
          targetInput.focus();
        }
      }
    }
  }

  function isCheckboxChecked(item) {
    const box = item.querySelector('.custom-checkbox');
    return Boolean(box && (box.classList.contains('checked') || box.classList.contains('checked-14')));
  }

  function bindCheckboxItem(item) {
    if (item.dataset.boundCheck === 'true') return;
    item.dataset.boundCheck = 'true';

    item.addEventListener('click', () => {
      const nextState = !isCheckboxChecked(item);
      setCheckboxState(item, nextState);
      saveCurrentDayLog();
    });
  }

  document.querySelectorAll('[data-toggle-check="true"]').forEach(bindCheckboxItem);

  // Auto-check meal checkbox when user types a meal/drink note
  document.querySelectorAll('.meal-active-card').forEach((mealCard) => {
    const checkItem = mealCard.querySelector('[data-toggle-check="true"]');
    const noteInput = mealCard.querySelector('input.text-input-box');
    if (checkItem && noteInput) {
      noteInput.addEventListener('input', () => {
        if (noteInput.value.trim().length > 0 && !isCheckboxChecked(checkItem)) {
          setCheckboxState(checkItem, true);
        }
      });
    }
  });

  // 5. Water Intake Radio Cards (Can select or tap active to unselect)
  const waterRadioGroup = document.getElementById('waterRadioGroup');
  function setWaterIntakeValue(waterVal) {
    if (!waterRadioGroup) return;
    const waterCards = Array.from(waterRadioGroup.querySelectorAll('.water-radio-card'));
    waterCards.forEach((c) => {
      const isMatch = Boolean(waterVal && c.getAttribute('data-water') === waterVal);
      c.classList.toggle('active', isMatch);
      const wrap = c.querySelector('.radio-circle-wrap');
      if (wrap) {
        wrap.innerHTML = isMatch
          ? `<div class="radio-selected">${SVG_RADIO_DOT}</div>`
          : '<div class="radio-unselected"></div>';
      }
    });
  }

  if (waterRadioGroup) {
    const waterCards = Array.from(waterRadioGroup.querySelectorAll('.water-radio-card'));
    waterCards.forEach((card) => {
      card.addEventListener('click', () => {
        const val = card.getAttribute('data-water');
        const wasActive = card.classList.contains('active');
        setWaterIntakeValue(wasActive ? null : val);
        saveCurrentDayLog();
      });
    });
  }

  // 6. Editable Nutrition Portion Breakdown
  const nutritionPie = document.getElementById('nutritionPie');
  const nutritionLegend = document.getElementById('nutritionLegend');

  function updateNutritionPie() {
    if (!nutritionPie || !nutritionLegend) return;
    const rows = Array.from(nutritionLegend.querySelectorAll('.legend-row'));
    const items = rows.map((row) => {
      const pctInput = row.querySelector('.nutrition-pct-input');
      const val = Math.max(0, parseFloat(pctInput && pctInput.value !== '' ? pctInput.value : '0') || 0);
      const color = row.getAttribute('data-color') || '#48bb78';
      return { val, color };
    });

    const total = items.reduce((acc, item) => acc + item.val, 0);
    if (total <= 0) {
      nutritionPie.style.background = '#e2ede8';
      return;
    }

    let cumulative = 0;
    const stops = items.map((item) => {
      const start = (cumulative / total) * 100;
      cumulative += item.val;
      const end = (cumulative / total) * 100;
      return `${item.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`;
    });

    nutritionPie.style.background = `conic-gradient(from 0deg, ${stops.join(', ')})`;
  }

  if (nutritionLegend) {
    const rows = Array.from(nutritionLegend.querySelectorAll('.legend-row'));
    rows.forEach((row) => {
      const rangeInput = row.querySelector('.nutrition-range-input');
      const pctInput = row.querySelector('.nutrition-pct-input');

      if (rangeInput && pctInput) {
        rangeInput.addEventListener('input', () => {
          pctInput.value = rangeInput.value;
          updateNutritionPie();
        });

        pctInput.addEventListener('input', () => {
          if (pctInput.value === '') {
            rangeInput.value = '0';
            updateNutritionPie();
            return;
          }
          let v = parseInt(pctInput.value, 10);
          if (isNaN(v)) v = 0;
          v = Math.max(0, Math.min(100, v));
          rangeInput.value = String(v);
          updateNutritionPie();
        });

        pctInput.addEventListener('blur', () => {
          if (pctInput.value === '') {
            rangeInput.value = '0';
            updateNutritionPie();
            return;
          }
          let v = parseInt(pctInput.value, 10);
          if (isNaN(v)) v = 0;
          v = Math.max(0, Math.min(100, v));
          pctInput.value = String(v);
          rangeInput.value = String(v);
          updateNutritionPie();
        });
      }
    });
  }

  // 7. Editable Bed Time & Wake Up Time
  document.querySelectorAll('.sleep-time-card').forEach((card) => {
    const input = card.querySelector('.sleep-time-input');
    if (!input) return;
    card.addEventListener('click', (e) => {
      if (e.target !== input) {
        input.focus();
        if (typeof input.showPicker === 'function') {
          try {
            input.showPicker();
          } catch (_) {}
        }
      }
    });
  });

  // 8. Interactive Custom Sliders
  function getSeverityInfo(pct) {
    if (pct <= 15) return { label: `Minimal • ${pct}%`, cls: 'minimal' };
    if (pct <= 25) return { label: `Mild • ${pct}%`, cls: '' };
    if (pct <= 45) return { label: `Low • ${pct}%`, cls: '' };
    if (pct <= 70) return { label: `Moderate • ${pct}%`, cls: 'moderate' };
    return { label: `Severe • ${pct}%`, cls: 'moderate' };
  }

  function setSliderValue(track, numericVal) {
    const min = parseFloat(track.getAttribute('data-min') || '0');
    const max = parseFloat(track.getAttribute('data-max') || '100');
    const clamped = Math.max(min, Math.min(max, numericVal));
    const ratio = max > min ? (clamped - min) / (max - min) : 0;
    track.setAttribute('data-value', String(Math.round(clamped)));

    const thumb = track.querySelector('.slider-thumb');
    if (thumb) {
      const rect = track.getBoundingClientRect();
      if (rect.width > 24) {
        const maxLeft = rect.width - 24;
        thumb.style.left = `${(ratio * maxLeft).toFixed(2)}px`;
      } else {
        thumb.style.left = `calc(${(ratio * 100).toFixed(1)}% - ${(ratio * 24).toFixed(1)}px)`;
      }
    }
    updateSliderOutput(track, ratio);
  }

  function updateSliderOutput(track, ratio) {
    const min = parseFloat(track.getAttribute('data-min') || '0');
    const max = parseFloat(track.getAttribute('data-max') || '100');
    const val = Math.round(min + ratio * (max - min));
    track.setAttribute('data-value', String(val));

    const type = track.getAttribute('data-slider');
    if (type === 'eatingHabits') {
      const el = document.getElementById('eatingHabitsValue');
      if (el) {
        if (val === 0) el.textContent = 'Not set';
        else if (val < 35) el.textContent = 'Liquid paste';
        else if (val < 60) el.textContent = 'Semi-soft';
        else el.textContent = 'Mostly chunks';
      }
    } else if (type === 'naturalIngredients') {
      const el = document.getElementById('naturalIngredientsValue');
      if (el) el.textContent = `${val}%`;
    } else if (type === 'exerciseIntensity') {
      const el = document.getElementById('exerciseIntensityValue');
      if (el) {
        if (val === 0) el.textContent = 'Not set';
        else if (val < 25) el.textContent = 'Light (No sweat)';
        else if (val < 55) el.textContent = 'Gentle (Light sweat)';
        else if (val < 80) el.textContent = 'Moderate (Sweating)';
        else el.textContent = 'Intense (Heavy sweat)';
      }
    } else if (type === 'breathability') {
      const el = document.getElementById('breathabilityValue');
      if (el) el.textContent = `${val}%`;
    } else if (type === 'roomTemp') {
      const el = document.getElementById('roomTempValue');
      if (el) el.textContent = `${val}°C`;
    } else if (type === 'humidity') {
      const el = document.getElementById('humidityValue');
      if (el) {
        const status = val < 40 ? 'Dry' : val <= 60 ? 'Optimal' : 'Humid';
        el.textContent = `${val}% (${status})`;
      }
    } else if (type === 'symptom') {
      const badgeId = track.getAttribute('data-badge-id');
      const badge = badgeId ? document.getElementById(badgeId) : null;
      if (badge) {
        const info = getSeverityInfo(val);
        badge.textContent = info.label;
        badge.classList.remove('moderate', 'minimal');
        if (info.cls) badge.classList.add(info.cls);
      }
    }
  }

  function bindSlider(track) {
    if (track.dataset.boundSlider === 'true') return;
    track.dataset.boundSlider = 'true';

    const thumb = track.querySelector('.slider-thumb');
    if (!thumb) return;

    let dragging = false;

    function setFromClientX(clientX) {
      const rect = track.getBoundingClientRect();
      const maxLeft = Math.max(1, rect.width - 24);
      let left = clientX - rect.left - 12;
      left = Math.max(0, Math.min(maxLeft, left));
      thumb.style.left = `${left.toFixed(2)}px`;
      const ratio = left / maxLeft;
      updateSliderOutput(track, ratio);
    }

    track.addEventListener('pointerdown', (e) => {
      dragging = true;
      track.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    });

    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      setFromClientX(e.clientX);
    });

    track.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      track.releasePointerCapture(e.pointerId);
      saveCurrentDayLog();
    });
  }

  document.querySelectorAll('.slider-track').forEach(bindSlider);

  // 9. Chips / Pills Toggle, Dynamic Med Dosage Timing Table & Remove from List
  const dosageTimingTable = document.getElementById('dosageTimingTable');

  function getExistingMedTimingsFromDOM() {
    const map = {};
    if (!dosageTimingTable) return map;
    dosageTimingTable.querySelectorAll('.timing-row-card[data-med-label]').forEach((row) => {
      const label = row.getAttribute('data-med-label');
      if (!label) return;
      const mEl = row.querySelector('[data-timing-slot="morning"]');
      const nEl = row.querySelector('[data-timing-slot="noon"]');
      const niEl = row.querySelector('[data-timing-slot="night"]');
      map[label] = {
        morning: mEl ? isCheckboxChecked(mEl) : false,
        noon: nEl ? isCheckboxChecked(nEl) : false,
        night: niEl ? isCheckboxChecked(niEl) : false
      };
    });
    return map;
  }

  function syncDosageTimingTable(overrideTimingsMap) {
    const wrap = document.getElementById('supplementsChipsWrap');
    if (!wrap || !dosageTimingTable) return;
    const currentTimings = overrideTimingsMap || getExistingMedTimingsFromDOM();
    const activeChips = Array.from(wrap.querySelectorAll('.chip-lg.active'));

    if (activeChips.length === 0) {
      dosageTimingTable.innerHTML = '';
      dosageTimingTable.classList.add('is-hidden');
      return;
    }

    dosageTimingTable.classList.remove('is-hidden');
    dosageTimingTable.innerHTML = '';

    activeChips.forEach((chip) => {
      const label = chip.getAttribute('data-label') || chip.textContent.replace('×', '').replace(/^[✓+]\s*/, '').trim();
      const saved = currentTimings[label] || { morning: false, noon: false, night: false };

      const row = document.createElement('div');
      row.className = 'timing-row-card';
      row.setAttribute('data-med-label', label);
      row.innerHTML = `
        <span class="timing-med-name"></span>
        <div class="timing-checks-group">
          <div class="timing-check-item" data-timing-slot="morning" data-toggle-check="true">
            <div class="custom-checkbox size-14"></div>
            <span class="timing-check-text">Morning</span>
          </div>
          <div class="timing-check-item" data-timing-slot="noon" data-toggle-check="true">
            <div class="custom-checkbox size-14"></div>
            <span class="timing-check-text">Noon</span>
          </div>
          <div class="timing-check-item" data-timing-slot="night" data-toggle-check="true">
            <div class="custom-checkbox size-14"></div>
            <span class="timing-check-text">Night</span>
          </div>
        </div>
      `;
      row.querySelector('.timing-med-name').textContent = label;

      const mItem = row.querySelector('[data-timing-slot="morning"]');
      const nItem = row.querySelector('[data-timing-slot="noon"]');
      const niItem = row.querySelector('[data-timing-slot="night"]');

      [mItem, nItem, niItem].forEach((item) => {
        if (item) bindCheckboxItem(item);
      });

      if (mItem) setCheckboxState(mItem, Boolean(saved.morning));
      if (nItem) setCheckboxState(nItem, Boolean(saved.noon));
      if (niItem) setCheckboxState(niItem, Boolean(saved.night));

      dosageTimingTable.appendChild(row);
    });
  }

  function updateMedProtocolsCount(overrideTimingsMap) {
    const wrap = document.getElementById('supplementsChipsWrap');
    const countEl = document.getElementById('medProtocolsCount');
    if (!wrap || !countEl) return;
    const activeCount = wrap.querySelectorAll('.chip-lg.active').length;
    countEl.textContent = `${activeCount} active protocol${activeCount === 1 ? '' : 's'} taken today`;
    syncDosageTimingTable(overrideTimingsMap);
  }

  function ensureRemovableChipStructure(chip, initialText, cleanLabel) {
    let textSpan = chip.querySelector('.chip-text-label');
    if (!textSpan) {
      chip.textContent = '';
      textSpan = document.createElement('span');
      textSpan.className = 'chip-text-label';
      textSpan.textContent = initialText;
      chip.appendChild(textSpan);

      const removeBtn = document.createElement('span');
      removeBtn.className = 'chip-remove-btn';
      removeBtn.setAttribute('role', 'button');
      removeBtn.setAttribute('tabindex', '0');
      removeBtn.setAttribute('aria-label', `Remove ${cleanLabel}`);
      removeBtn.textContent = '×';

      const handleRemove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const parentWrap = chip.parentElement;
        chip.remove();
        if (parentWrap && parentWrap.id === 'supplementsChipsWrap') {
          updateMedProtocolsCount();
        }
        if (parentWrap) {
          handleChipWrapPossiblyEmpty(parentWrap);
        }
        saveCurrentDayLog();
        showToast(`Removed ${cleanLabel}`);
      };

      removeBtn.addEventListener('click', handleRemove);
      removeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRemove(e);
        }
      });

      chip.appendChild(removeBtn);
    } else {
      textSpan.textContent = initialText;
    }
    return textSpan;
  }

  function bindPrefixChip(chip) {
    if (chip.dataset.boundChip === 'true') return;
    chip.dataset.boundChip = 'true';

    const rawText = chip.textContent.trim();
    const label = chip.getAttribute('data-label') || rawText.replace(/^[✓+]\s*/, '');
    chip.setAttribute('data-label', label);
    const initialDisplay = `${chip.classList.contains('active') ? '✓' : '+'} ${label}`;
    const textSpan = ensureRemovableChipStructure(chip, initialDisplay, label);

    chip.addEventListener('click', () => {
      const isNowActive = !chip.classList.contains('active');
      chip.classList.toggle('active', isNowActive);
      textSpan.textContent = `${isNowActive ? '✓' : '+'} ${label}`;
      updateMedProtocolsCount();
      saveCurrentDayLog();
    });
  }

  document.querySelectorAll('[data-chip-toggle="prefix"]').forEach(bindPrefixChip);

  function bindZoneChip(chip) {
    if (chip.dataset.boundZone === 'true') return;
    chip.dataset.boundZone = 'true';

    const rawText = chip.textContent.trim();
    const label = chip.getAttribute('data-label') || rawText.replace(/^[✓+]\s*/, '');
    chip.setAttribute('data-label', label);
    const initialDisplay = `${chip.classList.contains('active') ? '✓' : '+'} ${label}`;
    const textSpan = ensureRemovableChipStructure(chip, initialDisplay, label);

    chip.addEventListener('click', () => {
      const isNowActive = !chip.classList.contains('active');
      chip.classList.toggle('active', isNowActive);
      textSpan.textContent = `${isNowActive ? '✓' : '+'} ${label}`;
      saveCurrentDayLog();
    });
  }

  document.querySelectorAll('[data-zone-chip="true"]').forEach(bindZoneChip);

  // Chip Suggestions in Add (with text box) sections: always show remaining suggestions until all are added
  const WRAP_SUGGESTION_CONFIG = {
    supplementsChipsWrap: {
      addCardId: 'addMedCard',
      inputId: 'medNameInput',
      saveBtnId: 'btnSaveMed',
      suggestions: ['Omega 3 (1000 IU)', 'Vitamin D (4000 IU)', 'Vitamin B3', 'Zinc (45 mg)', 'Quercetin', 'Probiotics', 'Vitamin C (500 mg)', 'L-Histidine']
    },
    moisturizerChipsWrap: {
      addCardId: 'addTopicalCard',
      inputId: 'topicalNameInput',
      saveBtnId: 'btnSaveTopical',
      category: 'Moisturizer / Emollient',
      suggestions: ['Cetaphil Restoraderm', 'Cerave Healing Ointment', 'Vanicream', 'Shea Butter', 'Jojoba Oil']
    },
    cleanserChipsWrap: {
      addCardId: 'addTopicalCard',
      inputId: 'topicalNameInput',
      saveBtnId: 'btnSaveTopical',
      category: 'Body Bath / Cleanser',
      suggestions: ['Gentle Soap-Free Cleanser', 'Colloidal Oatmeal Soak', 'Dead Sea Salt Bath', 'Micellar Water']
    },
    compressChipsWrap: {
      addCardId: 'addTopicalCard',
      inputId: 'topicalNameInput',
      saveBtnId: 'btnSaveTopical',
      category: 'Anti-bacterial and Compresses',
      suggestions: ['Saline sterile compress', 'Dilute Methylene Blue', 'Hypochlorous Acid Spray', 'Black Tea Compress']
    },
    exerciseChipsWrap: {
      addCardId: 'addExerciseCard',
      inputId: 'exerciseNameInput',
      saveBtnId: 'btnSaveExercise',
      suggestions: ['Yoga', 'Meditation', 'Walking', 'Weight lifting', 'Pilates', 'Swimming', 'Cycling']
    },
    fabricsChipsWrap: {
      addCardId: 'addMaterialCard',
      inputId: 'materialNameInput',
      saveBtnId: 'btnSaveMaterial',
      suggestions: ['100% Cotton', 'Synthetic / Polyester', 'Silk', 'Linen', 'Wool', 'Bamboo Viscose', 'Tencel / Lyocell']
    },
    loadChipsWrap: {
      addCardId: 'addLoadCard',
      inputId: 'loadNameInput',
      saveBtnId: 'btnSaveLoad',
      suggestions: ['Catching Cold / Flu', 'Work Stress', 'Menstrual phase', 'Fatigue / Anemia', 'Travel / Jetlag', 'Lack of Sleep']
    },
    weepingZonesWrap: {
      addCardId: 'addAreaCard1',
      inputId: 'areaNameInput1',
      suggestions: ['Inner Elbows', 'Face', 'Neck', 'Hands', 'Wrists', 'Knees', 'Ankles']
    },
    itchZonesWrap: {
      addCardId: 'addAreaCard2',
      inputId: 'areaNameInput2',
      suggestions: ['Forearms', 'Neck', 'Legs', 'Back', 'Inner Elbows', 'Scalp', 'Hands']
    },
    dryingZonesWrap: {
      addCardId: 'addAreaCard3',
      inputId: 'areaNameInput3',
      suggestions: ['Hands', 'Cheeks', 'Legs', 'Arms', 'Neck', 'Forehead', 'Lips']
    },
    stingingZonesWrap: {
      addCardId: 'addAreaCard4',
      inputId: 'areaNameInput4',
      suggestions: ['Hands', 'Lips', 'Eyelids', 'Neck', 'Fingers', 'Cheeks']
    }
  };

  function getWrapConfig(wrap) {
    if (!wrap) return null;
    if (WRAP_SUGGESTION_CONFIG[wrap.id]) {
      return WRAP_SUGGESTION_CONFIG[wrap.id];
    }
    const addBtn = wrap.querySelector('.chip-zone-add');
    if (addBtn) {
      return {
        addCardId: addBtn.getAttribute('data-open-add'),
        inputId: addBtn.getAttribute('data-focus-target'),
        suggestions: ['Hands', 'Face', 'Neck', 'Inner Elbows', 'Forearms', 'Legs', 'Back']
      };
    }
    return null;
  }

  function renderSuggestionsInsideAddCard(addCard, suggestions, onPickSuggestion) {
    if (!addCard) return;
    let box = addCard.querySelector('.chip-suggestions-box');
    if (!suggestions || suggestions.length === 0) {
      if (box) box.remove();
      return;
    }
    if (!box) {
      box = document.createElement('div');
      box.className = 'chip-suggestions-box';
      const actionsRow = addCard.querySelector('.fast-add-actions');
      if (actionsRow) {
        addCard.insertBefore(box, actionsRow);
      } else {
        addCard.appendChild(box);
      }
    }
    box.innerHTML = `
      <span class="chip-suggestions-label">Suggestions (tap to add):</span>
      <div class="chip-suggestions-list"></div>
    `;
    const listEl = box.querySelector('.chip-suggestions-list');
    suggestions.forEach((itemLabel) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'chip-suggestion-pill';
      pill.textContent = `+ ${itemLabel}`;
      pill.addEventListener('click', () => {
        onPickSuggestion(itemLabel);
      });
      listEl.appendChild(pill);
    });
  }

  function syncSuggestionsForWrap(wrap, autoOpenWhenEmpty) {
    if (!wrap) return;
    const cfg = getWrapConfig(wrap);
    if (!cfg || !cfg.addCardId) return;
    const addCard = document.getElementById(cfg.addCardId);
    if (!addCard) return;

    // For topical products, resolve which wrap corresponds to the currently selected category in #topicalCategoryInput
    let targetWrap = wrap;
    let targetCfg = cfg;
    if (cfg.addCardId === 'addTopicalCard') {
      const catSelect = document.getElementById('topicalCategoryInput');
      if (autoOpenWhenEmpty && cfg.category && catSelect) {
        catSelect.value = cfg.category;
      }
      const activeCat = (catSelect && catSelect.value) || cfg.category || 'Moisturizer / Emollient';
      if (activeCat === 'Body Bath / Cleanser') {
        targetWrap = document.getElementById('cleanserChipsWrap') || wrap;
      } else if (activeCat === 'Anti-bacterial and Compresses') {
        targetWrap = document.getElementById('compressChipsWrap') || wrap;
      } else {
        targetWrap = document.getElementById('moisturizerChipsWrap') || wrap;
      }
      targetCfg = getWrapConfig(targetWrap) || cfg;
    }

    const existingBtns = Array.from(targetWrap.querySelectorAll('button[data-label]'));
    const existingSet = new Set(
      existingBtns.map((b) => (b.getAttribute('data-label') || '').trim().toLowerCase())
    );
    const remainingSuggestions = (targetCfg.suggestions || []).filter(
      (s) => !existingSet.has(s.trim().toLowerCase())
    );

    renderSuggestionsInsideAddCard(addCard, remainingSuggestions, (pickedLabel) => {
      const inputEl = targetCfg.inputId ? document.getElementById(targetCfg.inputId) : null;
      if (targetCfg.category) {
        const catSelect = document.getElementById('topicalCategoryInput');
        if (catSelect) catSelect.value = targetCfg.category;
      }
      if (inputEl) {
        inputEl.value = pickedLabel;
      }
      const saveBtn = targetCfg.saveBtnId
        ? document.getElementById(targetCfg.saveBtnId)
        : addCard.querySelector('[data-save-area="true"], .btn-save');
      if (saveBtn) {
        saveBtn.click();
      }
    });

    if (autoOpenWhenEmpty && existingBtns.length === 0) {
      addCard.classList.remove('is-hidden');
    }
  }

  const topicalCategorySelect = document.getElementById('topicalCategoryInput');
  if (topicalCategorySelect) {
    topicalCategorySelect.addEventListener('change', () => {
      const wrap = document.getElementById('moisturizerChipsWrap');
      if (wrap) syncSuggestionsForWrap(wrap, false);
    });
  }

  function syncSpecialAddCardSuggestions() {
    const addSymptomCard = document.getElementById('addSymptomCard');
    const symList = document.getElementById('customSymptomsList');
    if (addSymptomCard) {
      const existingSymSet = new Set(
        symList
          ? Array.from(symList.querySelectorAll('.symptom-name')).map((el) => el.textContent.trim().toLowerCase())
          : []
      );
      const allSymSuggestions = ['Redness / Erythema', 'Swelling', 'Skin Cracking', 'Hives'];
      const remainingSym = allSymSuggestions.filter((s) => !existingSymSet.has(s.toLowerCase()));
      renderSuggestionsInsideAddCard(
        addSymptomCard,
        remainingSym,
        (picked) => {
          const inp = document.getElementById('symptomNameInput');
          const saveBtn = document.getElementById('btnSaveSymptom');
          if (inp && saveBtn) {
            inp.value = picked;
            saveBtn.click();
          }
        }
      );
    }

    const addOtherCard = document.getElementById('addOtherSectionCard');
    const otherList = document.getElementById('customOthersList');
    if (addOtherCard) {
      const existingOtherSet = new Set(
        otherList
          ? Array.from(otherList.querySelectorAll('.symptom-name')).map((el) => el.textContent.trim().toLowerCase())
          : []
      );
      const allOtherSuggestions = ['House duty', 'Laundry detergent', 'Pet exposure', 'Air purifier'];
      const remainingOther = allOtherSuggestions.filter((s) => !existingOtherSet.has(s.toLowerCase()));
      renderSuggestionsInsideAddCard(
        addOtherCard,
        remainingOther,
        (picked) => {
          const inp = document.getElementById('otherSectionNameInput');
          const saveBtn = document.getElementById('btnSaveOtherSection');
          if (inp && saveBtn) {
            inp.value = picked;
            saveBtn.click();
          }
        }
      );
    }
  }

  function syncAllChipSuggestions() {
    Object.keys(WRAP_SUGGESTION_CONFIG).forEach((wrapId) => {
      const wrap = document.getElementById(wrapId);
      if (wrap) syncSuggestionsForWrap(wrap, false);
    });
    document.querySelectorAll('#customSymptomsList .chips-wrap').forEach((wrap) => {
      syncSuggestionsForWrap(wrap, false);
    });
    syncSpecialAddCardSuggestions();
  }

  function handleChipWrapPossiblyEmpty(parentWrap) {
    syncSuggestionsForWrap(parentWrap, true);
  }

  // 10. Show / Hide & Keep Focus Helpers for All "Add" Boxes
  function bindOpenAddBtn(btn) {
    if (btn.dataset.boundOpenAdd === 'true') return;
    btn.dataset.boundOpenAdd = 'true';

    btn.addEventListener('click', () => {
      const addCardId = btn.getAttribute('data-open-add');
      const addCard = addCardId ? document.getElementById(addCardId) : null;
      if (addCard) {
        addCard.classList.remove('is-hidden');
      }

      const presetCategory = btn.getAttribute('data-category');
      if (presetCategory) {
        const catSelect = document.getElementById('topicalCategoryInput');
        if (catSelect) {
          catSelect.value = presetCategory;
        }
      }

      const parentWrap = btn.closest('.chips-wrap');
      if (parentWrap) {
        syncSuggestionsForWrap(parentWrap, false);
      } else {
        syncSpecialAddCardSuggestions();
      }

      const targetId = btn.getAttribute('data-focus-target');
      const input = targetId ? document.getElementById(targetId) : null;
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  document.querySelectorAll('[data-open-add]').forEach(bindOpenAddBtn);

  function bindCloseAddBtn(btn) {
    if (btn.dataset.boundCloseAdd === 'true') return;
    btn.dataset.boundCloseAdd = 'true';

    btn.addEventListener('click', () => {
      const ids = (btn.getAttribute('data-clear-inputs') || '').split(',');
      ids.forEach((id) => {
        const trimmed = id.trim();
        if (!trimmed) return;
        const el = document.getElementById(trimmed);
        if (el) el.value = '';
      });

      const closeCardId = btn.getAttribute('data-close-add');
      const closeCard = closeCardId ? document.getElementById(closeCardId) : null;
      if (closeCard) {
        closeCard.classList.add('is-hidden');
      }
    });
  }

  document.querySelectorAll('[data-close-add]').forEach(bindCloseAddBtn);

  // Helper to allow pressing Enter inside an Add input to trigger its Save button and stay focused
  function bindEnterToSave(inputIds, saveBtn) {
    if (!saveBtn) return;
    inputIds.forEach((id) => {
      const inp = document.getElementById(id);
      if (!inp) return;
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveBtn.click();
        }
      });
    });
  }

  // 11. Save Handlers for Fast Add Cards (Keeps input/section in focus after adding/saving)
  // 11a. Save Medication
  const btnSaveMed = document.getElementById('btnSaveMed');
  if (btnSaveMed) {
    btnSaveMed.addEventListener('click', () => {
      const nameInput = document.getElementById('medNameInput');
      const doseInput = document.getElementById('medDoseInput');
      const unitInput = document.getElementById('medUnitInput');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (nameInput) nameInput.focus();
        return;
      }
      const dose = doseInput ? doseInput.value.trim() : '';
      const unit = (unitInput && unitInput.value.trim()) || 'mg';
      const fullLabel = dose ? `${name} (${dose} ${unit})` : name;

      const wrap = document.getElementById('supplementsChipsWrap');
      const addBtn = wrap ? wrap.querySelector('.chip-lg-add') : null;
      if (wrap && addBtn) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-lg active';
        chip.setAttribute('data-chip-toggle', 'prefix');
        chip.setAttribute('data-label', fullLabel);
        chip.textContent = `✓ ${fullLabel}`;
        wrap.insertBefore(chip, addBtn);
        bindPrefixChip(chip);
        updateMedProtocolsCount();
      }
      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (doseInput) doseInput.value = '';
      if (unitInput) unitInput.value = '';
      saveCurrentDayLog();
      showToast(`Added ${fullLabel}`);
    });
    bindEnterToSave(['medNameInput', 'medDoseInput', 'medUnitInput'], btnSaveMed);
  }

  // 11b. Save Topical Product
  const btnSaveTopical = document.getElementById('btnSaveTopical');
  if (btnSaveTopical) {
    btnSaveTopical.addEventListener('click', () => {
      const nameInput = document.getElementById('topicalNameInput');
      const catInput = document.getElementById('topicalCategoryInput');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (nameInput) nameInput.focus();
        return;
      }
      const cat = catInput ? catInput.value : '';
      let targetWrapId = 'moisturizerChipsWrap';
      if (cat === 'Body Bath / Cleanser') {
        targetWrapId = 'cleanserChipsWrap';
      } else if (cat === 'Anti-bacterial and Compresses') {
        targetWrapId = 'compressChipsWrap';
      }
      const wrap = document.getElementById(targetWrapId);
      const addBtn = wrap ? wrap.querySelector('.chip-sm-add') : null;
      if (wrap && addBtn) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-sm active';
        chip.setAttribute('data-chip-toggle', 'prefix');
        chip.setAttribute('data-label', name);
        chip.textContent = `✓ ${name}`;
        wrap.insertBefore(chip, addBtn);
        bindPrefixChip(chip);
      }
      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      saveCurrentDayLog();
      showToast(`Added ${name}`);
    });
    bindEnterToSave(['topicalNameInput'], btnSaveTopical);
  }

  // 11c. Save Exercise Type
  const btnSaveExercise = document.getElementById('btnSaveExercise');
  if (btnSaveExercise) {
    btnSaveExercise.addEventListener('click', () => {
      const nameInput = document.getElementById('exerciseNameInput');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (nameInput) nameInput.focus();
        return;
      }
      const wrap = document.getElementById('exerciseChipsWrap');
      const addBtn = document.getElementById('btnAddExercise');
      if (wrap && addBtn) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-sm active';
        chip.setAttribute('data-chip-toggle', 'prefix');
        chip.setAttribute('data-label', name);
        chip.textContent = `✓ ${name}`;
        wrap.insertBefore(chip, addBtn);
        bindPrefixChip(chip);
      }
      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      saveCurrentDayLog();
      showToast(`Added exercise: ${name}`);
    });
    bindEnterToSave(['exerciseNameInput'], btnSaveExercise);
  }

  // 11d. Save Fabric Material (No crossed-out state)
  const btnSaveMaterial = document.getElementById('btnSaveMaterial');
  if (btnSaveMaterial) {
    btnSaveMaterial.addEventListener('click', () => {
      const nameInput = document.getElementById('materialNameInput');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (nameInput) nameInput.focus();
        return;
      }
      const wrap = document.getElementById('fabricsChipsWrap');
      const addBtn = wrap ? wrap.querySelector('.chip-sm-add') : null;
      if (wrap && addBtn) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-sm px-8 active';
        chip.setAttribute('data-chip-toggle', 'prefix');
        chip.setAttribute('data-label', name);
        chip.textContent = `✓ ${name}`;
        wrap.insertBefore(chip, addBtn);
        bindPrefixChip(chip);
      }
      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      saveCurrentDayLog();
      showToast(`Added ${name}`);
    });
    bindEnterToSave(['materialNameInput'], btnSaveMaterial);
  }

  // 11e. Save Physical / Mental Load
  const btnSaveLoad = document.getElementById('btnSaveLoad');
  if (btnSaveLoad) {
    btnSaveLoad.addEventListener('click', () => {
      const nameInput = document.getElementById('loadNameInput');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (nameInput) nameInput.focus();
        return;
      }
      const wrap = document.getElementById('loadChipsWrap');
      const addBtn = wrap ? wrap.querySelector('.chip-sm-add') : null;
      if (wrap && addBtn) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-sm active';
        chip.setAttribute('data-chip-toggle', 'prefix');
        chip.setAttribute('data-label', name);
        chip.textContent = `✓ ${name}`;
        wrap.insertBefore(chip, addBtn);
        bindPrefixChip(chip);
      }
      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      saveCurrentDayLog();
      showToast(`Added load: ${name}`);
    });
    bindEnterToSave(['loadNameInput'], btnSaveLoad);
  }

  // 11f. Save Specific Area for Each Symptom Card (Keeps input focused)
  function bindSaveAreaBtn(btn) {
    if (btn.dataset.boundSaveArea === 'true') return;
    btn.dataset.boundSaveArea = 'true';

    const inputId = btn.getAttribute('data-area-input');
    const handleSave = () => {
      const wrapId = btn.getAttribute('data-zone-wrap');
      const areaInput = inputId ? document.getElementById(inputId) : null;
      const name = areaInput ? areaInput.value.trim() : '';
      if (!name) {
        if (areaInput) areaInput.focus();
        return;
      }
      const wrap = wrapId ? document.getElementById(wrapId) : null;
      const addBtn = wrap ? wrap.querySelector('.chip-zone-add') : null;
      if (wrap && addBtn) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-zone active';
        chip.setAttribute('data-zone-chip', 'true');
        chip.setAttribute('data-label', name);
        chip.textContent = name;
        wrap.insertBefore(chip, addBtn);
        bindZoneChip(chip);
      }
      if (areaInput) {
        areaInput.value = '';
        areaInput.focus();
        areaInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      saveCurrentDayLog();
      showToast(`Added body zone: ${name}`);
    };

    btn.addEventListener('click', handleSave);
    if (inputId) {
      const areaInput = document.getElementById(inputId);
      if (areaInput) {
        areaInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
          }
        });
      }
    }
  }

  document.querySelectorAll('[data-save-area="true"]').forEach(bindSaveAreaBtn);

  // 11g. Create & Save Additional Symptom Track (with delete icon on the right & own area add box)
  const customSymptomsList = document.getElementById('customSymptomsList');

  function createCustomSymptomCard(symptomData) {
    if (!customSymptomsList) return null;
    const uid = symptomData.uid || ('sym_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6));
    const name = symptomData.name || 'Custom Symptom';
    const val = typeof symptomData.value === 'number' ? symptomData.value : 0;
    const zones = Array.isArray(symptomData.zones)
      ? symptomData.zones
      : [
          { label: 'Hands', active: false },
          { label: 'Face', active: false },
          { label: 'Neck', active: false }
        ];

    const badgeId = `symptomBadgeCustom_${uid}`;
    const wrapId = `customZonesWrap_${uid}`;
    const areaCardId = `addAreaCardCustom_${uid}`;
    const areaInputId = `areaNameInputCustom_${uid}`;
    const info = getSeverityInfo(val);

    const card = document.createElement('div');
    card.className = 'symptom-item-card custom-symptom-card';
    card.setAttribute('data-custom-symptom-id', uid);
    card.innerHTML = `
      <div class="symptom-title-row">
        <div class="symptom-name-group">
          <span class="symptom-dot" style="background-color: #059669;"></span>
          <span class="symptom-name"></span>
        </div>
        <div class="label-inline-group">
          <span class="symptom-badge ${info.cls}" id="${badgeId}">${info.label}</span>
          <button type="button" class="block-delete-btn" aria-label="Delete symptom track" title="Delete symptom track">
            ${SVG_DELETE_TRASH}
          </button>
        </div>
      </div>
      <div class="chips-wrap gap-4" id="${wrapId}">
        <button type="button" class="chip-zone-add" data-open-add="${areaCardId}" data-focus-target="${areaInputId}">+ Add</button>
      </div>
      <div class="slider-track" data-slider="symptom" data-badge-id="${badgeId}" data-min="0" data-max="100" data-value="${val}">
        <div class="slider-thumb" style="left: 0px;"></div>
      </div>
      <div class="fast-add-inline is-hidden" id="${areaCardId}">
        <span class="fast-add-title">Add Specific Area:</span>
        <input
          type="text"
          id="${areaInputId}"
          class="text-input-box placeholder-style"
          placeholder="Area name"
        />
        <div class="fast-add-actions">
          <button type="button" class="btn-cancel" data-close-add="${areaCardId}" data-clear-inputs="${areaInputId}">Cancel</button>
          <button type="button" class="btn-save" data-save-area="true" data-zone-wrap="${wrapId}" data-area-input="${areaInputId}" data-area-card="${areaCardId}">Save</button>
        </div>
      </div>
    `;
    card.querySelector('.symptom-name').textContent = name;

    const wrap = card.querySelector(`#${wrapId}`);
    const addBtn = wrap.querySelector('.chip-zone-add');
    zones.forEach((z) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip-zone' + (z.active ? ' active' : '');
      chip.setAttribute('data-zone-chip', 'true');
      chip.setAttribute('data-label', z.label);
      chip.textContent = z.label;
      wrap.insertBefore(chip, addBtn);
      bindZoneChip(chip);
    });

    const delBtn = card.querySelector('.block-delete-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        card.remove();
        saveCurrentDayLog();
        showToast(`Deleted symptom: ${name}`);
      });
    }

    customSymptomsList.appendChild(card);

    const sliderTrack = card.querySelector('.slider-track');
    if (sliderTrack) {
      bindSlider(sliderTrack);
      setSliderValue(sliderTrack, val);
    }
    card.querySelectorAll('[data-open-add]').forEach(bindOpenAddBtn);
    card.querySelectorAll('[data-close-add]').forEach(bindCloseAddBtn);
    card.querySelectorAll('[data-save-area="true"]').forEach(bindSaveAreaBtn);

    return card;
  }

  const btnSaveSymptom = document.getElementById('btnSaveSymptom');
  if (btnSaveSymptom) {
    btnSaveSymptom.addEventListener('click', () => {
      const symInput = document.getElementById('symptomNameInput');
      const name = symInput ? symInput.value.trim() : '';
      if (!name) {
        if (symInput) symInput.focus();
        return;
      }
      createCustomSymptomCard({ name, value: 0 });
      if (symInput) {
        symInput.value = '';
        symInput.focus();
        symInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      saveCurrentDayLog();
      showToast(`Added symptom track: ${name}`);
    });
    bindEnterToSave(['symptomNameInput'], btnSaveSymptom);
  }

  // 12. Emoji Picker in "Others" Section & Custom Blocks with Delete Icon on the Right
  const emojiPickerPopover = document.getElementById('emojiPickerPopover');
  const btnPickIcon = document.getElementById('btnPickIcon');
  const customOthersList = document.getElementById('customOthersList');
  let activeEmojiTargetBtn = null;
  let pendingNewSectionEmoji = null;

  function renderTriggerIcon(btn, emojiChar) {
    if (!btn) return;
    if (emojiChar) {
      btn.setAttribute('data-selected-emoji', emojiChar);
      btn.innerHTML = `<span style="font-size: 16px; line-height: 1;">${emojiChar}</span>`;
    } else {
      btn.removeAttribute('data-selected-emoji');
      btn.innerHTML = SVG_MOOD_OTHERS;
    }
  }

  function bindEmojiTrigger(btn) {
    if (btn.dataset.boundEmojiTrigger === 'true') return;
    btn.dataset.boundEmojiTrigger = 'true';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!emojiPickerPopover) return;

      const isSameTarget = activeEmojiTargetBtn === btn && !emojiPickerPopover.classList.contains('is-hidden');
      if (isSameTarget) {
        emojiPickerPopover.classList.add('is-hidden');
        activeEmojiTargetBtn = null;
        return;
      }

      activeEmojiTargetBtn = btn;
      const hostCard = btn.closest('.symptom-item-card, .fast-add-card');
      if (hostCard && hostCard.parentNode) {
        hostCard.parentNode.insertBefore(emojiPickerPopover, hostCard.nextSibling);
      }
      emojiPickerPopover.classList.remove('is-hidden');
    });
  }

  document.querySelectorAll('[data-emoji-trigger="true"]').forEach(bindEmojiTrigger);

  if (emojiPickerPopover) {
    emojiPickerPopover.querySelectorAll('.emoji-option-btn').forEach((optBtn) => {
      optBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = optBtn.getAttribute('data-emoji') || '😊';
        if (activeEmojiTargetBtn) {
          renderTriggerIcon(activeEmojiTargetBtn, emoji);
          if (activeEmojiTargetBtn === btnPickIcon) {
            pendingNewSectionEmoji = emoji;
          }
          saveCurrentDayLog();
        }
        emojiPickerPopover.classList.add('is-hidden');
        activeEmojiTargetBtn = null;
      });
    });

    document.addEventListener('click', (e) => {
      if (!emojiPickerPopover.classList.contains('is-hidden') && !emojiPickerPopover.contains(e.target)) {
        emojiPickerPopover.classList.add('is-hidden');
        activeEmojiTargetBtn = null;
      }
    });
  }

  function createCustomOtherSectionCard(itemData, focusNote) {
    if (!customOthersList) return null;
    const name = itemData.name || 'Custom Section';
    const emoji = itemData.emoji || null;
    const note = itemData.note || '';

    const card = document.createElement('div');
    card.className = 'symptom-item-card custom-other-card';
    const iconHtml = emoji
      ? `<span style="font-size: 16px; line-height: 1;">${emoji}</span>`
      : SVG_MOOD_OTHERS;

    card.innerHTML = `
      <div class="symptom-title-row">
        <div class="symptom-name-group">
          <button type="button" class="section-emoji-trigger" data-emoji-trigger="true" aria-label="Change section emoji">
            ${iconHtml}
          </button>
          <span class="symptom-name"></span>
        </div>
        <button type="button" class="block-delete-btn" aria-label="Delete section" title="Delete section">
          ${SVG_DELETE_TRASH}
        </button>
      </div>
      <input type="text" class="text-input-box placeholder-style other-tracking-note" placeholder="Tracking note" />
    `;
    card.querySelector('.symptom-name').textContent = name;
    const noteInput = card.querySelector('.other-tracking-note');
    if (noteInput) {
      noteInput.value = note;
      noteInput.addEventListener('input', saveCurrentDayLog);
    }

    const triggerBtn = card.querySelector('[data-emoji-trigger="true"]');
    if (triggerBtn) {
      if (emoji) triggerBtn.setAttribute('data-selected-emoji', emoji);
      bindEmojiTrigger(triggerBtn);
    }

    const delBtn = card.querySelector('.block-delete-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (emojiPickerPopover && card.contains(emojiPickerPopover)) {
          document.getElementById('othersContainer').appendChild(emojiPickerPopover);
          emojiPickerPopover.classList.add('is-hidden');
        }
        card.remove();
        saveCurrentDayLog();
        showToast(`Deleted section: ${name}`);
      });
    }

    customOthersList.appendChild(card);
    if (focusNote && noteInput) {
      noteInput.focus();
      noteInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return card;
  }

  const btnSaveOtherSection = document.getElementById('btnSaveOtherSection');
  if (btnSaveOtherSection) {
    btnSaveOtherSection.addEventListener('click', () => {
      const secInput = document.getElementById('otherSectionNameInput');
      const name = secInput ? secInput.value.trim() : '';
      if (!name) {
        if (secInput) secInput.focus();
        return;
      }
      createCustomOtherSectionCard(
        {
          name,
          emoji: pendingNewSectionEmoji,
          note: ''
        },
        false
      );

      if (secInput) {
        secInput.value = '';
        secInput.focus();
        secInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      pendingNewSectionEmoji = null;
      renderTriggerIcon(btnPickIcon, null);
      if (emojiPickerPopover) emojiPickerPopover.classList.add('is-hidden');
      saveCurrentDayLog();
      showToast(`Added section: ${name}`);
    });
    bindEnterToSave(['otherSectionNameInput'], btnSaveOtherSection);
  }

  const cancelOtherBtn = document.querySelector('[data-close-add="addOtherSectionCard"]');
  if (cancelOtherBtn) {
    cancelOtherBtn.addEventListener('click', () => {
      pendingNewSectionEmoji = null;
      renderTriggerIcon(btnPickIcon, null);
      if (emojiPickerPopover) emojiPickerPopover.classList.add('is-hidden');
    });
  }

  // 13. Photos & Visual Log Gallery + Mobile Camera / Photo Gallery Upload Modal
  const btnTakeSelfie = document.getElementById('btnTakeSelfie');
  const btnAddPhotoLog = document.getElementById('btnAddPhotoLog');
  const selfieModalBackdrop = document.getElementById('selfieModalBackdrop');
  const btnCloseSelfieModal = document.getElementById('btnCloseSelfieModal');
  const btnChoosePhoto = document.getElementById('btnChoosePhoto');
  const btnSaveSelfie = document.getElementById('btnSaveSelfie');
  const selfieFileInput = document.getElementById('selfieFileInput');
  const selfiePreviewBox = document.getElementById('selfiePreviewBox');
  const photoCaptionInput = document.getElementById('photoCaptionInput');
  const modalTagChips = document.getElementById('modalTagChips');
  const photoFilterBar = document.getElementById('photoFilterBar');
  const photosGalleryGrid = document.getElementById('photosGalleryGrid');
  const photosCountSubtitle = document.getElementById('photosCountSubtitle');
  const sectionPhotosLog = document.getElementById('sectionPhotosLog');

  function createPlaceholderPhotoSvg(emoji, label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
      <rect width="320" height="220" fill="#e1efe8" />
      <circle cx="160" cy="94" r="38" fill="rgba(255,255,255,0.7)" />
      <text x="160" y="106" font-size="34" text-anchor="middle">${emoji}</text>
      <text x="160" y="164" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#20372e" text-anchor="middle">${label}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  let loggedPhotos = [];
  let activePhotoFilter = 'All';
  let selectedModalTag = 'Selfie';
  let pendingPhotoDataUrl = null;

  function renderPhotosGallery() {
    if (!photosGalleryGrid) return;
    if (photosCountSubtitle) {
      const total = loggedPhotos.length;
      photosCountSubtitle.textContent = `${total} photo${total === 1 ? '' : 's'} logged`;
    }

    const filtered = activePhotoFilter === 'All'
      ? loggedPhotos
      : loggedPhotos.filter((p) => p.tag.toLowerCase() === activePhotoFilter.toLowerCase());

    photosGalleryGrid.innerHTML = '';

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'photos-empty-state';
      empty.textContent = activePhotoFilter === 'All'
        ? 'No photos logged for this day yet. Tap "Add / Upload Photo" or "Take a selfie" to add one.'
        : `No photos with tag "${activePhotoFilter}" for this day.`;
      photosGalleryGrid.appendChild(empty);
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'photo-log-card';
      const tagClass = `tag-${item.tag.toLowerCase()}`;
      card.innerHTML = `
        <div class="photo-thumb-wrap">
          <img src="${item.src}" alt="" />
          <span class="photo-tag-badge ${tagClass}">${item.tag}</span>
          <button type="button" class="photo-delete-btn" aria-label="Remove photo">×</button>
        </div>
        <div class="photo-card-meta">
          <span class="photo-card-caption"></span>
          <span class="photo-card-time"></span>
        </div>
      `;
      card.querySelector('.photo-card-caption').textContent = item.caption || `${item.tag} photo`;
      card.querySelector('.photo-card-time').textContent = item.time;

      const delBtn = card.querySelector('.photo-delete-btn');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          loggedPhotos = loggedPhotos.filter((p) => p.id !== item.id);
          renderPhotosGallery();
          saveCurrentDayLog();
          showToast(`Removed ${item.tag} photo`);
        });
      }

      photosGalleryGrid.appendChild(card);
    });
  }

  if (photoFilterBar) {
    const filterPills = Array.from(photoFilterBar.querySelectorAll('.photo-filter-pill'));
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        activePhotoFilter = pill.getAttribute('data-photo-filter') || 'All';
        filterPills.forEach((p) => p.classList.toggle('active', p === pill));
        renderPhotosGallery();
      });
    });
  }

  function setModalTag(tag) {
    selectedModalTag = tag;
    if (!modalTagChips) return;
    modalTagChips.querySelectorAll('.modal-tag-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.getAttribute('data-modal-tag') === tag);
    });
  }

  if (modalTagChips) {
    modalTagChips.querySelectorAll('.modal-tag-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-modal-tag') || 'Selfie';
        setModalTag(tag);
      });
    });
  }

  function openPhotoModal(defaultTag) {
    if (!selfieModalBackdrop) return;
    setModalTag(defaultTag || 'Selfie');
    pendingPhotoDataUrl = null;
    if (selfieFileInput) selfieFileInput.value = '';
    if (photoCaptionInput) photoCaptionInput.value = '';
    if (selfiePreviewBox) {
      selfiePreviewBox.innerHTML = '<span>Upload photo from camera or photo gallery</span>';
    }
    selfieModalBackdrop.classList.add('open');
    selfieModalBackdrop.setAttribute('aria-hidden', 'false');
  }

  function closeSelfieModal() {
    if (!selfieModalBackdrop) return;
    selfieModalBackdrop.classList.remove('open');
    selfieModalBackdrop.setAttribute('aria-hidden', 'true');
  }

  if (btnTakeSelfie) {
    btnTakeSelfie.addEventListener('click', () => openPhotoModal('Selfie'));
  }

  // Bind camera buttons on all 5 meal & drink cards (Breakfast, Lunch, Dinner, Snacks, Drinks)
  document.querySelectorAll('[data-meal-photo-tag]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mealTag = btn.getAttribute('data-meal-photo-tag') || 'Breakfast';
      openPhotoModal(mealTag);
    });
  });

  if (btnAddPhotoLog) {
    btnAddPhotoLog.addEventListener('click', () => {
      const initialTag = activePhotoFilter !== 'All' ? activePhotoFilter : 'Selfie';
      openPhotoModal(initialTag);
    });
  }
  if (btnCloseSelfieModal) btnCloseSelfieModal.addEventListener('click', closeSelfieModal);
  if (selfieModalBackdrop) {
    selfieModalBackdrop.addEventListener('click', (e) => {
      if (e.target === selfieModalBackdrop) closeSelfieModal();
    });
  }

  // Tapping either the photo slot (#selfiePreviewBox) or "Camera / Gallery" (#btnChoosePhoto) opens native mobile Camera / Photo Gallery chooser
  function triggerFilePicker() {
    if (selfieFileInput) {
      selfieFileInput.click();
    }
  }

  if (selfiePreviewBox) {
    selfiePreviewBox.addEventListener('click', triggerFilePicker);
  }
  if (btnChoosePhoto) {
    btnChoosePhoto.addEventListener('click', triggerFilePicker);
  }

  if (selfieFileInput) {
    selfieFileInput.addEventListener('change', () => {
      const file = selfieFileInput.files && selfieFileInput.files[0];
      if (!file || !selfiePreviewBox) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        pendingPhotoDataUrl = ev.target.result;
        selfiePreviewBox.innerHTML = `<img src="${pendingPhotoDataUrl}" alt="Selected photo preview" />`;
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnSaveSelfie) {
    btnSaveSelfie.addEventListener('click', () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const caption = (photoCaptionInput && photoCaptionInput.value.trim()) || `${selectedModalTag} log`;
      const tagEmojiMap = {
        Selfie: '🤳',
        Breakfast: '🥣',
        Lunch: '🥗',
        Dinner: '🍲',
        Snacks: '🍎',
        Drinks: '🍵'
      };
      const emoji = tagEmojiMap[selectedModalTag] || '📷';
      const src = pendingPhotoDataUrl || createPlaceholderPhotoSvg(emoji, caption);

      loggedPhotos.unshift({
        id: 'photo_' + Date.now(),
        tag: selectedModalTag,
        caption,
        time: timeStr,
        src
      });

      if (activePhotoFilter !== 'All' && activePhotoFilter !== selectedModalTag) {
        activePhotoFilter = 'All';
        if (photoFilterBar) {
          photoFilterBar.querySelectorAll('.photo-filter-pill').forEach((p) => {
            p.classList.toggle('active', p.getAttribute('data-photo-filter') === 'All');
          });
        }
      }

      renderPhotosGallery();
      saveCurrentDayLog();
      closeSelfieModal();
      if (sectionPhotosLog) {
        sectionPhotosLog.classList.remove('accordion-card-collapsed');
        sectionPhotosLog.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast(`Saved ${selectedModalTag} photo!`);
    });
  }

  // 14. Per-Date Offline Persistence (localStorage + IndexedDB), Reset to Blank for New Dates, Backup Export
  const CHIP_WRAP_IDS = [
    'supplementsChipsWrap',
    'moisturizerChipsWrap',
    'cleanserChipsWrap',
    'compressChipsWrap',
    'exerciseChipsWrap',
    'fabricsChipsWrap',
    'loadChipsWrap',
    'weepingZonesWrap',
    'itchZonesWrap',
    'dryingZonesWrap',
    'stingingZonesWrap'
  ];

  // Capture initial default chip labels (all unselected) so unlogged dates start clean with default chips unselected
  const DEFAULT_CHIP_LISTS = {};
  CHIP_WRAP_IDS.forEach((wrapId) => {
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    DEFAULT_CHIP_LISTS[wrapId] = Array.from(wrap.querySelectorAll('button[data-label]')).map((btn) => ({
      label: btn.getAttribute('data-label'),
      active: false,
      isZone: btn.hasAttribute('data-zone-chip'),
      className: btn.className.replace(/\bactive\b/g, '').trim()
    }));
  });

  const CHECKBOX_IDS = [
    'checkMultitaskEating',
    'checkMealBreakfast',
    'checkMealLunch',
    'checkMealDinner',
    'checkMealSnacks',
    'checkMealDrinks',
    'checkNightItch',
    'checkBathMorning',
    'checkBathAfternoon',
    'checkBathEvening',
    'checkBowelMorning',
    'checkBowelAfternoon',
    'checkBowelEvening',
    'checkHarshEnv'
  ];

  const TEXT_INPUT_IDS = [
    'mealNoteBreakfast',
    'mealNoteLunch',
    'mealNoteDinner',
    'mealNoteSnacks',
    'mealNoteDrinks',
    'bedTimeInput',
    'wakeTimeInput',
    'nightItchNoteInput',
    'harshEnvNoteInput'
  ];

  function openJournalIDB() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        resolve(null);
        return;
      }
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function saveToIDB(dateKey, snapshot) {
    openJournalIDB()
      .then((db) => {
        if (!db) return;
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put({ id: dateKey, ...snapshot });
      })
      .catch(() => {});
  }

  function getAllLogsByDate() {
    try {
      const raw = localStorage.getItem(LOGS_BY_DATE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function collectCurrentDaySnapshot() {
    const activeMoodBtn = moodRow ? moodRow.querySelector('.mood-btn.active') : null;
    const activeWaterCard = waterRadioGroup ? waterRadioGroup.querySelector('.water-radio-card.active') : null;

    const checkboxes = {};
    CHECKBOX_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) checkboxes[id] = isCheckboxChecked(el);
    });

    const textValues = {};
    TEXT_INPUT_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) textValues[id] = el.value;
    });

    const nutritionPortions = {};
    if (nutritionLegend) {
      nutritionLegend.querySelectorAll('.legend-row').forEach((row) => {
        const key = row.getAttribute('data-nutrition-row');
        const input = row.querySelector('.nutrition-pct-input');
        if (key && input) nutritionPortions[key] = input.value;
      });
    }

    const sliders = {};
    document.querySelectorAll('.slider-track[data-slider]').forEach((track, idx) => {
      if (track.closest('#customSymptomsList')) return;
      const key = track.getAttribute('data-slider') + '_' + (track.getAttribute('data-badge-id') || idx);
      sliders[key] = parseFloat(track.getAttribute('data-value') || '0');
    });

    const chipLists = {};
    CHIP_WRAP_IDS.forEach((wrapId) => {
      const wrap = document.getElementById(wrapId);
      if (!wrap) return;
      chipLists[wrapId] = Array.from(wrap.querySelectorAll('button[data-label]')).map((btn) => ({
        label: btn.getAttribute('data-label'),
        active: btn.classList.contains('active'),
        isZone: btn.hasAttribute('data-zone-chip'),
        className: btn.className.replace(/\bactive\b/g, '').trim()
      }));
    });

    const customSymptoms = [];
    if (customSymptomsList) {
      customSymptomsList.querySelectorAll('.custom-symptom-card').forEach((card) => {
        const uid = card.getAttribute('data-custom-symptom-id');
        const nameEl = card.querySelector('.symptom-name');
        const track = card.querySelector('.slider-track');
        const zones = Array.from(card.querySelectorAll('button[data-zone-chip="true"]')).map((z) => ({
          label: z.getAttribute('data-label') || z.textContent.replace('×', '').trim(),
          active: z.classList.contains('active')
        }));
        customSymptoms.push({
          uid,
          name: nameEl ? nameEl.textContent : 'Symptom',
          value: track ? parseFloat(track.getAttribute('data-value') || '0') : 0,
          zones
        });
      });
    }

    const customOthers = [];
    if (customOthersList) {
      customOthersList.querySelectorAll('.custom-other-card').forEach((card) => {
        const nameEl = card.querySelector('.symptom-name');
        const triggerBtn = card.querySelector('[data-emoji-trigger="true"]');
        const noteInp = card.querySelector('.other-tracking-note');
        customOthers.push({
          name: nameEl ? nameEl.textContent : 'Section',
          emoji: triggerBtn ? triggerBtn.getAttribute('data-selected-emoji') : null,
          note: noteInp ? noteInp.value : ''
        });
      });
    }

    const medTimings = getExistingMedTimingsFromDOM();

    return {
      dateKey: selectedDateKey,
      dateLabel: formatDateHeader(selectedDate),
      updatedAt: new Date().toISOString(),
      userName: localStorage.getItem(USER_NAME_KEY) || '',
      mood: activeMoodBtn ? activeMoodBtn.getAttribute('data-mood') : null,
      waterIntake: activeWaterCard ? activeWaterCard.getAttribute('data-water') : null,
      checkboxes,
      medTimings,
      textValues,
      nutritionPortions,
      sliders,
      chipLists,
      customSymptoms,
      customOthers,
      photos: loggedPhotos
    };
  }

  function saveCurrentDayLog() {
    if (isRestoringState) return;
    syncAllChipSuggestions();
    try {
      const snapshot = collectCurrentDaySnapshot();
      const allLogs = getAllLogsByDate();
      allLogs[selectedDateKey] = snapshot;
      localStorage.setItem(LOGS_BY_DATE_KEY, JSON.stringify(allLogs));
      saveToIDB(selectedDateKey, snapshot);
    } catch (_) {}
  }

  function renderChipWrapList(wrapId, items) {
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    const addBtn = wrap.querySelector('.chip-lg-add, .chip-sm-add, .chip-zone-add');
    Array.from(wrap.querySelectorAll('button[data-label]')).forEach((b) => b.remove());

    items.forEach((item) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      const baseCls = item.className || (item.isZone ? 'chip-zone' : 'chip-sm');
      chip.className = baseCls + (item.active ? ' active' : '');
      chip.setAttribute('data-label', item.label);
      if (item.isZone) {
        chip.setAttribute('data-zone-chip', 'true');
        chip.textContent = `${item.active ? '✓' : '+'} ${item.label}`;
        if (addBtn) wrap.insertBefore(chip, addBtn);
        else wrap.appendChild(chip);
        bindZoneChip(chip);
      } else {
        chip.setAttribute('data-chip-toggle', 'prefix');
        chip.textContent = `${item.active ? '✓' : '+'} ${item.label}`;
        if (addBtn) wrap.insertBefore(chip, addBtn);
        else wrap.appendChild(chip);
        bindPrefixChip(chip);
      }
    });
  }

  function resetFormToBlank() {
    // 1. Mood
    if (moodRow) {
      moodRow.querySelectorAll('.mood-btn').forEach((b) => b.classList.remove('active'));
    }
    // 2. Water Intake
    setWaterIntakeValue(null);
    // 3. Checkboxes
    CHECKBOX_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) setCheckboxState(el, false);
    });
    // 4. Text & Time Inputs
    TEXT_INPUT_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    // 5. Nutrition Portions
    if (nutritionLegend) {
      nutritionLegend.querySelectorAll('.legend-row').forEach((row) => {
        const pctInp = row.querySelector('.nutrition-pct-input');
        const rngInp = row.querySelector('.nutrition-range-input');
        if (pctInp) pctInp.value = '';
        if (rngInp) rngInp.value = '0';
      });
      updateNutritionPie();
    }
    // 6. Sliders
    document.querySelectorAll('.slider-track[data-slider]').forEach((track) => {
      if (track.closest('#customSymptomsList')) return;
      const min = parseFloat(track.getAttribute('data-min') || '0');
      setSliderValue(track, min);
    });
    // 7. Chips reset to default unselected list
    CHIP_WRAP_IDS.forEach((wrapId) => {
      if (DEFAULT_CHIP_LISTS[wrapId]) {
        renderChipWrapList(wrapId, DEFAULT_CHIP_LISTS[wrapId]);
      }
    });
    updateMedProtocolsCount();
    // 8. Clear custom symptoms & custom Others sections
    if (customSymptomsList) customSymptomsList.innerHTML = '';
    if (customOthersList) customOthersList.innerHTML = '';
    // 9. Clear photos for this date
    loggedPhotos = [];
    renderPhotosGallery();
  }

  function loadDayLog(dateKey) {
    isRestoringState = true;
    try {
      const allLogs = getAllLogsByDate();
      const data = allLogs[dateKey];
      resetFormToBlank();

      if (!data || typeof data !== 'object') {
        isRestoringState = false;
        return;
      }

      if (data.mood && moodRow) {
        moodRow.querySelectorAll('.mood-btn').forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-mood') === data.mood);
        });
      }

      if (data.waterIntake) {
        setWaterIntakeValue(data.waterIntake);
      }

      if (data.checkboxes) {
        Object.entries(data.checkboxes).forEach(([id, checked]) => {
          const el = document.getElementById(id);
          if (el) setCheckboxState(el, Boolean(checked));
        });
      }

      if (data.textValues) {
        Object.entries(data.textValues).forEach(([id, val]) => {
          const el = document.getElementById(id);
          if (el) el.value = val || '';
        });
      }

      if (data.nutritionPortions && nutritionLegend) {
        Object.entries(data.nutritionPortions).forEach(([key, val]) => {
          const row = nutritionLegend.querySelector(`[data-nutrition-row="${key}"]`);
          if (!row) return;
          const pctInp = row.querySelector('.nutrition-pct-input');
          const rngInp = row.querySelector('.nutrition-range-input');
          if (pctInp) pctInp.value = val ?? '';
          if (rngInp) rngInp.value = val !== '' && val != null ? String(val) : '0';
        });
        updateNutritionPie();
      }

      if (data.sliders) {
        document.querySelectorAll('.slider-track[data-slider]').forEach((track, idx) => {
          if (track.closest('#customSymptomsList')) return;
          const key = track.getAttribute('data-slider') + '_' + (track.getAttribute('data-badge-id') || idx);
          if (typeof data.sliders[key] === 'number') {
            setSliderValue(track, data.sliders[key]);
          }
        });
      }

      if (data.chipLists) {
        Object.entries(data.chipLists).forEach(([wrapId, items]) => {
          if (Array.isArray(items)) {
            renderChipWrapList(wrapId, items);
          }
        });
        updateMedProtocolsCount(data.medTimings || {});
      }

      if (Array.isArray(data.customSymptoms)) {
        data.customSymptoms.forEach((sym) => createCustomSymptomCard(sym));
      }

      if (Array.isArray(data.customOthers)) {
        data.customOthers.forEach((sec) => createCustomOtherSectionCard(sec, false));
      }

      if (Array.isArray(data.photos)) {
        loggedPhotos = data.photos;
        renderPhotosGallery();
      }
    } finally {
      isRestoringState = false;
    }
  }

  // Auto-save on any input or change in the journal
  const phoneFrame = document.querySelector('.phone-frame');
  if (phoneFrame) {
    phoneFrame.addEventListener('change', saveCurrentDayLog);
    phoneFrame.addEventListener('input', saveCurrentDayLog);
  }

  // Request Persistent Storage
  const storagePersistStatus = document.getElementById('storagePersistStatus');
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then((persisted) => {
      if (storagePersistStatus) {
        storagePersistStatus.textContent = persisted
          ? 'Persistent offline storage protected'
          : 'Auto-saved locally on device';
      }
    }).catch(() => {});
  }

  // Export JSON & CSV Backup (Exports all logged dates!)
  function triggerFileDownload(filename, mimeType, content) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 250);
  }

  const btnExportJson = document.getElementById('btnExportJson');
  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      saveCurrentDayLog();
      const allLogs = getAllLogsByDate();
      const payload = {
        exportedAt: new Date().toISOString(),
        userName: localStorage.getItem(USER_NAME_KEY) || '',
        currentDateKey: selectedDateKey,
        logsByDate: allLogs
      };
      triggerFileDownload(
        `eczema-journal-backup-${selectedDateKey}.json`,
        'application/json;charset=utf-8',
        JSON.stringify(payload, null, 2)
      );
      showToast('Exported JSON backup!');
    });
  }

  const btnExportCsv = document.getElementById('btnExportCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      saveCurrentDayLog();
      const allLogs = getAllLogsByDate();
      const escapeCsv = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;
      const rows = [['Date', 'Category', 'Item / Field', 'Value / Status']];

      Object.keys(allLogs).sort().reverse().forEach((dKey) => {
        const s = allLogs[dKey];
        if (!s) return;
        rows.push([dKey, 'Profile', 'User Name', s.userName || '']);
        rows.push([dKey, 'Skin Feeling', 'Mood', s.mood || 'Not set']);
        rows.push([dKey, 'Food & Drink', 'Water Intake', s.waterIntake || 'Not set']);

        Object.entries(s.nutritionPortions || {}).forEach(([k, v]) => {
          if (v !== '' && v != null) rows.push([dKey, 'Nutrition Portion', k, `${v}%`]);
        });

        Object.entries(s.textValues || {}).forEach(([k, v]) => {
          if (v) rows.push([dKey, 'Notes & Times', k, v]);
        });

        Object.entries(s.chipLists || {}).forEach(([group, items]) => {
          const activeLabels = (items || []).filter((i) => i.active).map((i) => i.label).join('; ');
          if (activeLabels) rows.push([dKey, 'Selected Chips', group, activeLabels]);
        });

        (s.customOthers || []).forEach((o) => {
          rows.push([dKey, 'Others', o.name, o.note]);
        });

        (s.photos || []).forEach((p) => {
          rows.push([dKey, 'Photo Log', p.tag, `${p.caption} (${p.time})`]);
        });
      });

      const csvContent = rows.map((r) => r.map(escapeCsv).join(',')).join('\r\n');
      triggerFileDownload(
        `eczema-journal-backup-${selectedDateKey}.csv`,
        'text/csv;charset=utf-8',
        csvContent
      );
      showToast('Exported CSV backup!');
    });
  }

  // Register Service Worker for Offline PWA Support (with automatic update check)
  if ('serviceWorker' in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then((reg) => {
        reg.update();
      }).catch(() => {});
    });
  }

  // Initialize Today's Week Strip & Load Today's Log
  renderWeekStrip();
  loadDayLog(selectedDateKey);
  syncAllChipSuggestions();
})();
