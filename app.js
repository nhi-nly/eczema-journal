(function () {
  'use strict';

  const toastBanner = document.getElementById('toastBanner');
  let toastTimeout = null;

  function showToast(message) {
    if (!toastBanner) return;
    toastBanner.textContent = message;
    toastBanner.classList.add('visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastBanner.classList.remove('visible');
    }, 2200);
  }

  // 0. Start Screen (Name Input) & 2 Alternating Loading Animations
  const startScreenOverlay = document.getElementById('startScreenOverlay');
  const startScreenForm = document.getElementById('startScreenForm');
  const userNameInput = document.getElementById('userNameInput');
  const greetingText = document.getElementById('greetingText');
  const avatarInitials = document.getElementById('avatarInitials');
  const profileGroupBtn = document.getElementById('profileGroupBtn');

  const loadingScreenOverlay = document.getElementById('loadingScreenOverlay');
  const loadingAnim1 = document.getElementById('loadingAnim1');
  const loadingAnim2 = document.getElementById('loadingAnim2');

  let currentAnimMode = 1; // Alternates between 1 (Single Shred) and 2 (Pile of Shreds)
  let loadingSequenceTimer1 = null;
  let loadingSequenceTimer2 = null;

  function computeInitials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'HN';
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function applyUserName(rawName) {
    const cleanName = (rawName || '').trim() || 'Nhi';
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

    // Start with Animation 1 (Single Skin Shred shrinking & disappearing),
    // then alternate to Animation 2 (Pile of Skin Shreds getting shorter & disappearing)
    setLoadingAnimationMode(1);
    loadingScreenOverlay.classList.remove('is-hidden');

    loadingSequenceTimer1 = setTimeout(() => {
      setLoadingAnimationMode(2);
    }, 2100);

    loadingSequenceTimer2 = setTimeout(() => {
      loadingScreenOverlay.classList.add('is-hidden');
      showToast(`Welcome, ${userName}!`);
    }, 4200);
  }

  if (startScreenForm) {
    startScreenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredName = userNameInput ? userNameInput.value : 'Nhi';
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

  // 1. Date Switcher & Week Strip Navigation (Always synced to Today's real date)
  const weekStrip = document.getElementById('weekStrip');
  const dayPills = weekStrip ? Array.from(weekStrip.querySelectorAll('.day-pill')) : [];
  const currentDateLabel = document.getElementById('currentDateLabel');
  const btnPrevDay = document.getElementById('btnPrevDay');
  const btnNextDay = document.getElementById('btnNextDay');
  const btnOpenCalendar = document.getElementById('btnOpenCalendar');

  const SHORT_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const TITLE_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function formatDateHeader(dateObj) {
    const dayName = TITLE_DAYS[dateObj.getDay()];
    const dayNum = dateObj.getDate();
    const monthName = SHORT_MONTHS[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `Today • ${dayName}, ${dayNum} ${monthName} ${year}`;
  }

  const todayDate = new Date();
  const todayFormattedLabel = formatDateHeader(todayDate);

  // Populate week strip pills around Today (index 3 = TODAY)
  dayPills.forEach((pill, i) => {
    const offset = i - 3;
    const d = new Date(todayDate);
    d.setDate(todayDate.getDate() + offset);
    const dayNum = d.getDate();
    const dayNameEl = pill.querySelector('.day-name');
    const dayNumEl = pill.querySelector('.day-num');
    if (dayNameEl) {
      dayNameEl.textContent = offset === 0 ? 'TODAY' : SHORT_DAYS[d.getDay()];
    }
    if (dayNumEl) {
      dayNumEl.textContent = String(dayNum);
    }
    pill.setAttribute('data-day', String(dayNum));
    pill.setAttribute('data-label', todayFormattedLabel);
    pill.classList.toggle('active', offset === 0);
    pill.classList.toggle('future', offset > 0);
  });

  if (currentDateLabel) {
    currentDateLabel.textContent = todayFormattedLabel;
  }

  let activeDayIndex = 3; // Index 3 is TODAY

  function setActiveDay() {
    activeDayIndex = 3;
    dayPills.forEach((pill, i) => {
      pill.classList.toggle('active', i === 3);
    });
    if (currentDateLabel) {
      currentDateLabel.textContent = todayFormattedLabel;
    }
  }

  dayPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      setActiveDay();
    });
  });

  if (btnPrevDay) {
    btnPrevDay.addEventListener('click', () => {
      setActiveDay();
    });
  }

  if (btnNextDay) {
    btnNextDay.addEventListener('click', () => {
      setActiveDay();
    });
  }

  if (btnOpenCalendar) {
    btnOpenCalendar.addEventListener('click', () => {
      setActiveDay();
      showToast(`Today • ${todayFormattedLabel.replace('Today • ', '')}`);
    });
  }

  // 2. Quick Mood / Skin Feeling Selector
  const moodRow = document.getElementById('moodRow');
  if (moodRow) {
    const moodBtns = Array.from(moodRow.querySelectorAll('.mood-btn'));
    moodBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        moodBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // 3. Collapsible Accordion Headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const card = header.closest('.section-card');
      if (card) {
        card.classList.toggle('accordion-card-collapsed');
      }
    });
  });

  // 4. Custom Checkboxes
  function bindCheckboxItem(item) {
    if (item.dataset.boundCheck === 'true') return;
    item.dataset.boundCheck = 'true';

    item.addEventListener('click', () => {
      const box = item.querySelector('.custom-checkbox');
      if (!box) return;
      const iconPath = item.getAttribute('data-check-icon') || 'assets/check-food.svg';
      const checkSize = item.getAttribute('data-check-size') || '14';
      const isChecked = box.classList.contains('checked') || box.classList.contains('checked-14');

      if (isChecked) {
        box.classList.remove('checked', 'checked-14');
        if (checkSize === '12') {
          box.classList.add('size-12');
        } else {
          box.classList.add('size-14');
        }
        box.innerHTML = '';
        item.classList.remove('checked-gap');
        if (item.hasAttribute('data-highlight-card')) {
          item.classList.remove('active-card');
        }
      } else {
        box.classList.remove('size-14', 'size-12');
        if (checkSize === '12') {
          box.classList.add('checked-14');
        } else {
          box.classList.add('checked');
        }
        box.innerHTML = `<img src="${iconPath}" alt="" />`;
        if (item.classList.contains('timing-check-item')) {
          item.classList.add('checked-gap', 'is-checked');
        }
        if (item.hasAttribute('data-highlight-card')) {
          item.classList.add('active-card');
        }
      }
    });
  }

  document.querySelectorAll('[data-toggle-check="true"]').forEach(bindCheckboxItem);

  // 5. Water Intake Radio Cards
  const waterRadioGroup = document.getElementById('waterRadioGroup');
  if (waterRadioGroup) {
    const waterCards = Array.from(waterRadioGroup.querySelectorAll('.water-radio-card'));
    waterCards.forEach((card) => {
      card.addEventListener('click', () => {
        waterCards.forEach((c) => {
          c.classList.remove('active');
          const wrap = c.querySelector('.radio-circle-wrap');
          if (wrap) {
            wrap.innerHTML = '<div class="radio-unselected"></div>';
          }
        });
        card.classList.add('active');
        const activeWrap = card.querySelector('.radio-circle-wrap');
        if (activeWrap) {
          activeWrap.innerHTML = '<div class="radio-selected"><img src="assets/radio-food.svg" alt="" /></div>';
        }
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
      const val = Math.max(0, parseFloat(pctInput ? pctInput.value : '0') || 0);
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
          let v = parseInt(pctInput.value, 10);
          if (isNaN(v)) v = 0;
          v = Math.max(0, Math.min(100, v));
          rangeInput.value = String(v);
          updateNutritionPie();
        });

        pctInput.addEventListener('blur', () => {
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
          } catch (_) {
            // Fallback to standard focus
          }
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

  function updateSliderOutput(track, ratio) {
    const min = parseFloat(track.getAttribute('data-min') || '0');
    const max = parseFloat(track.getAttribute('data-max') || '100');
    const val = Math.round(min + ratio * (max - min));
    track.setAttribute('data-value', String(val));

    const type = track.getAttribute('data-slider');
    if (type === 'eatingHabits') {
      const el = document.getElementById('eatingHabitsValue');
      if (el) {
        if (val < 35) el.textContent = 'Liquid paste';
        else if (val < 60) el.textContent = 'Semi-soft';
        else el.textContent = 'Mostly chunks';
      }
    } else if (type === 'naturalIngredients') {
      const el = document.getElementById('naturalIngredientsValue');
      if (el) el.textContent = `${val}%`;
    } else if (type === 'exerciseIntensity') {
      const el = document.getElementById('exerciseIntensityValue');
      if (el) {
        if (val < 25) el.textContent = 'Light (No sweat)';
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
    });
  }

  document.querySelectorAll('.slider-track').forEach(bindSlider);

  // 9. Chips / Pills Toggle & Remove from List
  function updateMedProtocolsCount() {
    const wrap = document.getElementById('supplementsChipsWrap');
    const countEl = document.getElementById('medProtocolsCount');
    if (!wrap || !countEl) return;
    const activeCount = wrap.querySelectorAll('.chip-lg.active').length;
    countEl.textContent = `${activeCount} active protocol${activeCount === 1 ? '' : 's'} taken today`;
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
        showToast(`Removed ${cleanLabel}`);
      };

      removeBtn.addEventListener('click', handleRemove);
      removeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRemove(e);
        }
      });

      chip.appendChild(removeBtn);
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
    });
  }

  document.querySelectorAll('[data-chip-toggle="prefix"]').forEach(bindPrefixChip);

  function bindFabricChip(chip) {
    if (chip.dataset.boundFabric === 'true') return;
    chip.dataset.boundFabric = 'true';

    const rawText = chip.textContent.trim();
    const label = chip.getAttribute('data-label') || rawText.replace(/^✓\s*/, '');
    chip.setAttribute('data-label', label);
    const initialDisplay = chip.classList.contains('active') ? `✓ ${label}` : label;
    const textSpan = ensureRemovableChipStructure(chip, initialDisplay, label);

    chip.addEventListener('click', () => {
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        chip.classList.add('strikethrough');
        textSpan.textContent = label;
      } else if (chip.classList.contains('strikethrough')) {
        chip.classList.remove('strikethrough');
        textSpan.textContent = label;
      } else {
        chip.classList.add('active');
        textSpan.textContent = `✓ ${label}`;
      }
    });
  }

  document.querySelectorAll('[data-fabric-chip="true"]').forEach(bindFabricChip);

  function bindZoneChip(chip) {
    if (chip.dataset.boundZone === 'true') return;
    chip.dataset.boundZone = 'true';

    const label = chip.getAttribute('data-label') || chip.textContent.trim();
    chip.setAttribute('data-label', label);
    ensureRemovableChipStructure(chip, label, label);

    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  }

  document.querySelectorAll('[data-zone-chip="true"]').forEach(bindZoneChip);

  // 10. Show / Hide & Clear Helpers for All "Add" Boxes
  function bindOpenAddBtn(btn) {
    if (btn.dataset.boundOpenAdd === 'true') return;
    btn.dataset.boundOpenAdd = 'true';

    btn.addEventListener('click', () => {
      const addCardId = btn.getAttribute('data-open-add');
      const addCard = addCardId ? document.getElementById(addCardId) : null;
      if (addCard) {
        addCard.classList.remove('is-hidden');
      }

      // Pre-select category dropdown if data-category is provided (Product on Skin)
      const presetCategory = btn.getAttribute('data-category');
      if (presetCategory) {
        const catSelect = document.getElementById('topicalCategoryInput');
        if (catSelect) {
          catSelect.value = presetCategory;
        }
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

  // 11. Save Handlers for Fast Add Cards
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
      if (nameInput) nameInput.value = '';
      if (doseInput) doseInput.value = '';
      if (unitInput) unitInput.value = '';
      const addMedCard = document.getElementById('addMedCard');
      if (addMedCard) addMedCard.classList.add('is-hidden');
      showToast(`Added ${fullLabel}`);
    });
  }

  // 11b. Save Topical Product (using dropdown category)
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
      if (nameInput) nameInput.value = '';
      if (catInput) catInput.value = '';
      const addTopicalCard = document.getElementById('addTopicalCard');
      if (addTopicalCard) addTopicalCard.classList.add('is-hidden');
      showToast(`Added ${name}`);
    });
  }

  // 11c. Save Exercise Type (Workout and Sweat Triggers)
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
      if (nameInput) nameInput.value = '';
      const addExerciseCard = document.getElementById('addExerciseCard');
      if (addExerciseCard) addExerciseCard.classList.add('is-hidden');
      showToast(`Added exercise: ${name}`);
    });
  }

  // 11d. Save Fabric Material
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
        chip.setAttribute('data-fabric-chip', 'true');
        chip.setAttribute('data-label', name);
        chip.textContent = `✓ ${name}`;
        wrap.insertBefore(chip, addBtn);
        bindFabricChip(chip);
      }
      if (nameInput) nameInput.value = '';
      const addMaterialCard = document.getElementById('addMaterialCard');
      if (addMaterialCard) addMaterialCard.classList.add('is-hidden');
      showToast(`Added ${name}`);
    });
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
      if (nameInput) nameInput.value = '';
      const addLoadCard = document.getElementById('addLoadCard');
      if (addLoadCard) addLoadCard.classList.add('is-hidden');
      showToast(`Added load: ${name}`);
    });
  }

  // 11f. Save Specific Area for Each Symptom Card
  function bindSaveAreaBtn(btn) {
    if (btn.dataset.boundSaveArea === 'true') return;
    btn.dataset.boundSaveArea = 'true';

    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-area-input');
      const wrapId = btn.getAttribute('data-zone-wrap');
      const cardId = btn.getAttribute('data-area-card');
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
        chip.textContent = name;
        wrap.insertBefore(chip, addBtn);
        bindZoneChip(chip);
      }
      if (areaInput) areaInput.value = '';
      const areaCard = cardId ? document.getElementById(cardId) : null;
      if (areaCard) areaCard.classList.add('is-hidden');
      showToast(`Added body zone: ${name}`);
    });
  }

  document.querySelectorAll('[data-save-area="true"]').forEach(bindSaveAreaBtn);

  // 11g. Save Additional Symptom Track (with its own + Add area chip & hidden Add Specific Area box)
  const btnSaveSymptom = document.getElementById('btnSaveSymptom');
  if (btnSaveSymptom) {
    btnSaveSymptom.addEventListener('click', () => {
      const symInput = document.getElementById('symptomNameInput');
      const name = symInput ? symInput.value.trim() : '';
      if (!name) {
        if (symInput) symInput.focus();
        return;
      }
      const container = document.getElementById('symptomsContainer');
      const actionBtn = document.getElementById('btnOpenAddSymptom');
      if (container && actionBtn) {
        const uid = Date.now();
        const badgeId = `symptomBadgeCustom_${uid}`;
        const wrapId = `customZonesWrap_${uid}`;
        const areaCardId = `addAreaCardCustom_${uid}`;
        const areaInputId = `areaNameInputCustom_${uid}`;

        const card = document.createElement('div');
        card.className = 'symptom-item-card';
        card.innerHTML = `
          <div class="symptom-title-row">
            <div class="symptom-name-group">
              <span class="symptom-dot" style="background-color: #059669;"></span>
              <span class="symptom-name"></span>
            </div>
            <span class="symptom-badge" id="${badgeId}">Mild • 20%</span>
          </div>
          <div class="chips-wrap gap-4" id="${wrapId}">
            <button type="button" class="chip-zone active" data-zone-chip="true">Hands</button>
            <button type="button" class="chip-zone" data-zone-chip="true">Face</button>
            <button type="button" class="chip-zone" data-zone-chip="true">Neck</button>
            <button type="button" class="chip-zone-add" data-open-add="${areaCardId}" data-focus-target="${areaInputId}">+ Add</button>
          </div>
          <div class="slider-track" data-slider="symptom" data-badge-id="${badgeId}" data-min="0" data-max="100" data-value="20">
            <div class="slider-thumb" style="left: 57.59px;"></div>
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
        container.insertBefore(card, actionBtn);

        card.querySelectorAll('[data-zone-chip="true"]').forEach(bindZoneChip);
        card.querySelectorAll('.slider-track').forEach(bindSlider);
        card.querySelectorAll('[data-open-add]').forEach(bindOpenAddBtn);
        card.querySelectorAll('[data-close-add]').forEach(bindCloseAddBtn);
        card.querySelectorAll('[data-save-area="true"]').forEach(bindSaveAreaBtn);
      }
      if (symInput) symInput.value = '';
      const addSymptomCard = document.getElementById('addSymptomCard');
      if (addSymptomCard) addSymptomCard.classList.add('is-hidden');
      showToast(`Added symptom track: ${name}`);
    });
  }

  // 12. Emoji Picker in "Others" Section & Save Custom Section
  const emojiPickerPopover = document.getElementById('emojiPickerPopover');
  const btnPickIcon = document.getElementById('btnPickIcon');
  let activeEmojiTargetBtn = null;
  let pendingNewSectionEmoji = null; // null means default mood-others.svg unless user picked an emoji

  function renderTriggerIcon(btn, emojiChar) {
    if (!btn) return;
    if (emojiChar) {
      btn.setAttribute('data-selected-emoji', emojiChar);
      btn.innerHTML = `<span style="font-size: 16px; line-height: 1;">${emojiChar}</span>`;
    } else {
      btn.removeAttribute('data-selected-emoji');
      btn.innerHTML = '<img src="assets/mood-others.svg" alt="" />';
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
      // Place popover right after the parent card or fast-add-card
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

  const btnSaveOtherSection = document.getElementById('btnSaveOtherSection');
  if (btnSaveOtherSection) {
    btnSaveOtherSection.addEventListener('click', () => {
      const secInput = document.getElementById('otherSectionNameInput');
      const name = secInput ? secInput.value.trim() : '';
      if (!name) {
        if (secInput) secInput.focus();
        return;
      }
      const container = document.getElementById('othersContainer');
      const actionBtn = document.getElementById('btnOpenAddOtherSection');
      if (container && actionBtn) {
        const card = document.createElement('div');
        card.className = 'symptom-item-card';
        const iconHtml = pendingNewSectionEmoji
          ? `<span style="font-size: 16px; line-height: 1;">${pendingNewSectionEmoji}</span>`
          : '<img src="assets/mood-others.svg" alt="" />';
        card.innerHTML = `
          <div class="symptom-title-row">
            <div class="symptom-name-group">
              <button type="button" class="section-emoji-trigger" data-emoji-trigger="true" aria-label="Change section emoji">
                ${iconHtml}
              </button>
              <span class="symptom-name"></span>
            </div>
          </div>
          <input type="text" class="text-input-box placeholder-style" placeholder="Tracking note" />
        `;
        card.querySelector('.symptom-name').textContent = name;
        const triggerBtn = card.querySelector('[data-emoji-trigger="true"]');
        if (triggerBtn && pendingNewSectionEmoji) {
          triggerBtn.setAttribute('data-selected-emoji', pendingNewSectionEmoji);
        }
        container.insertBefore(card, actionBtn);
        if (triggerBtn) bindEmojiTrigger(triggerBtn);
      }

      if (secInput) secInput.value = '';
      pendingNewSectionEmoji = null;
      renderTriggerIcon(btnPickIcon, null);
      if (emojiPickerPopover) emojiPickerPopover.classList.add('is-hidden');
      const addOtherSectionCard = document.getElementById('addOtherSectionCard');
      if (addOtherSectionCard) addOtherSectionCard.classList.add('is-hidden');
      showToast(`Added section: ${name}`);
    });
  }

  // Also reset pending emoji when Cancel is clicked on Add Specific Section
  const cancelOtherBtn = document.querySelector('[data-close-add="addOtherSectionCard"]');
  if (cancelOtherBtn) {
    cancelOtherBtn.addEventListener('click', () => {
      pendingNewSectionEmoji = null;
      renderTriggerIcon(btnPickIcon, null);
      if (emojiPickerPopover) emojiPickerPopover.classList.add('is-hidden');
    });
  }

  // 13. Photos & Visual Log Gallery + Tagged Photo Upload Modal
  const btnTakeSelfie = document.getElementById('btnTakeSelfie');
  const btnMealPhoto = document.getElementById('btnMealPhoto');
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

  function createSamplePhotoSvg(bgStart, bgEnd, emoji, label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#g)" />
      <circle cx="160" cy="94" r="38" fill="rgba(255,255,255,0.65)" />
      <text x="160" y="106" font-size="34" text-anchor="middle">${emoji}</text>
      <text x="160" y="164" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#20372e" text-anchor="middle">${label}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  let loggedPhotos = [
    {
      id: 'photo_1',
      tag: 'Breakfast',
      caption: 'Rolled oats, blueberries & honey',
      time: '08:15 AM',
      src: createSamplePhotoSvg('#fef3c7', '#fde68a', '🥣', 'Oats & Blueberries')
    },
    {
      id: 'photo_2',
      tag: 'Lunch',
      caption: 'Steamed greens, quinoa & salmon',
      time: '12:40 PM',
      src: createSamplePhotoSvg('#d1fae5', '#a7f3d0', '🥗', 'Greens & Salmon Bowl')
    },
    {
      id: 'photo_3',
      tag: 'Selfie',
      caption: 'Inner elbows & neck progress',
      time: '09:10 PM',
      src: createSamplePhotoSvg('#e1efe8', '#c5e0d3', '🤳', 'Evening Skin Check')
    }
  ];

  let activePhotoFilter = 'All';
  let selectedModalTag = 'Selfie';
  let pendingPhotoDataUrl = null;

  function renderPhotosGallery() {
    if (!photosGalleryGrid) return;
    if (photosCountSubtitle) {
      const total = loggedPhotos.length;
      photosCountSubtitle.textContent = `${total} photo${total === 1 ? '' : 's'} logged today`;
    }

    const filtered = activePhotoFilter === 'All'
      ? loggedPhotos
      : loggedPhotos.filter((p) => p.tag.toLowerCase() === activePhotoFilter.toLowerCase());

    photosGalleryGrid.innerHTML = '';

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'photos-empty-state';
      empty.textContent = `No photos with tag "${activePhotoFilter}" yet. Tap "Add / Upload Photo" below to add one.`;
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
      selfiePreviewBox.innerHTML = '<span>Tap "Choose Photo" to upload or capture an image</span>';
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
  if (btnMealPhoto) {
    btnMealPhoto.addEventListener('click', () => openPhotoModal('Breakfast'));
  }
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

  if (btnChoosePhoto && selfieFileInput) {
    btnChoosePhoto.addEventListener('click', () => selfieFileInput.click());
    selfieFileInput.addEventListener('change', () => {
      const file = selfieFileInput.files && selfieFileInput.files[0];
      if (!file || !selfiePreviewBox) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        pendingPhotoDataUrl = ev.target.result;
        selfiePreviewBox.innerHTML = `<img src="${pendingPhotoDataUrl}" alt="Captured preview" />`;
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
        Snacks: '🍎'
      };
      const emoji = tagEmojiMap[selectedModalTag] || '📷';
      const src = pendingPhotoDataUrl || createSamplePhotoSvg('#e1efe8', '#c5e0d3', emoji, caption);

      loggedPhotos.unshift({
        id: 'photo_' + Date.now(),
        tag: selectedModalTag,
        caption,
        time: timeStr,
        src
      });

      // Reset filter to All if the current filter would hide the newly added photo
      if (activePhotoFilter !== 'All' && activePhotoFilter !== selectedModalTag) {
        activePhotoFilter = 'All';
        if (photoFilterBar) {
          photoFilterBar.querySelectorAll('.photo-filter-pill').forEach((p) => {
            p.classList.toggle('active', p.getAttribute('data-photo-filter') === 'All');
          });
        }
      }

      renderPhotosGallery();
      saveJournalState();
      closeSelfieModal();
      if (sectionPhotosLog) {
        sectionPhotosLog.classList.remove('accordion-card-collapsed');
        sectionPhotosLog.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast(`Saved ${selectedModalTag} photo to Visual Log!`);
    });
  }

  // 14. Offline Persistence (localStorage + IndexedDB), navigator.storage.persist(), Backup Export & Service Worker
  const STORAGE_KEY = 'ECZEMA_JOURNAL_STATE_V1';
  const IDB_NAME = 'EczemaJournalOfflineDB';
  const IDB_STORE = 'daily_logs';

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

  function saveToIDB(snapshot) {
    openJournalIDB()
      .then((db) => {
        if (!db) return;
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put({ id: 'latest', ...snapshot });
      })
      .catch(() => {});
  }

  function collectJournalSnapshot() {
    const activeMoodBtn = moodRow ? moodRow.querySelector('.mood-btn.active') : null;
    const activeWaterCard = waterRadioGroup ? waterRadioGroup.querySelector('.water-radio-card.active') : null;

    const sliders = {};
    document.querySelectorAll('.slider-track[data-slider]').forEach((track, idx) => {
      const key = track.getAttribute('data-slider') + '_' + (track.getAttribute('data-badge-id') || idx);
      sliders[key] = track.getAttribute('data-value') || '0';
    });

    const nutritionPortions = {};
    if (nutritionLegend) {
      nutritionLegend.querySelectorAll('.legend-row').forEach((row) => {
        const key = row.getAttribute('data-nutrition-row');
        const input = row.querySelector('.nutrition-pct-input');
        if (key && input) nutritionPortions[key] = input.value;
      });
    }

    const chipLists = {};
    [
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
    ].forEach((wrapId) => {
      const wrap = document.getElementById(wrapId);
      if (!wrap) return;
      chipLists[wrapId] = Array.from(wrap.querySelectorAll('button[data-label]')).map((btn) => ({
        label: btn.getAttribute('data-label'),
        active: btn.classList.contains('active'),
        strikethrough: btn.classList.contains('strikethrough')
      }));
    });

    const textInputs = [];
    document.querySelectorAll('.scrollable-content input.text-input-box, .scrollable-content input.sleep-time-input').forEach((inp) => {
      if (inp.closest('.fast-add-card, .fast-add-inline')) return;
      textInputs.push({
        id: inp.id || '',
        placeholder: inp.getAttribute('placeholder') || '',
        ariaLabel: inp.getAttribute('aria-label') || '',
        value: inp.value
      });
    });

    const userName = greetingText
      ? greetingText.textContent.replace(/^Hi,\s*/i, '').replace(/\s*👋.*$/, '').trim()
      : 'Nhi';

    return {
      updatedAt: new Date().toISOString(),
      dateLabel: todayFormattedLabel,
      userName,
      mood: activeMoodBtn ? activeMoodBtn.getAttribute('data-mood') : 'relieved',
      waterIntake: activeWaterCard ? activeWaterCard.getAttribute('data-water') : 'normal',
      bedTime: document.getElementById('bedTimeInput') ? document.getElementById('bedTimeInput').value : '22:30',
      wakeTime: document.getElementById('wakeTimeInput') ? document.getElementById('wakeTimeInput').value : '06:45',
      nutritionPortions,
      sliders,
      chipLists,
      textInputs,
      photos: loggedPhotos
    };
  }

  function saveJournalState() {
    try {
      const snapshot = collectJournalSnapshot();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      saveToIDB(snapshot);
    } catch (_) {
      // Fallback if localStorage quota is reached
    }
  }

  function restoreJournalState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return;

      if (data.userName) {
        if (userNameInput) userNameInput.value = data.userName;
        applyUserName(data.userName);
      }

      if (data.mood && moodRow) {
        const btns = Array.from(moodRow.querySelectorAll('.mood-btn'));
        btns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-mood') === data.mood));
      }

      if (data.waterIntake && waterRadioGroup) {
        const targetCard = waterRadioGroup.querySelector(`[data-water="${data.waterIntake}"]`);
        if (targetCard) targetCard.click();
      }

      if (data.bedTime && document.getElementById('bedTimeInput')) {
        document.getElementById('bedTimeInput').value = data.bedTime;
      }
      if (data.wakeTime && document.getElementById('wakeTimeInput')) {
        document.getElementById('wakeTimeInput').value = data.wakeTime;
      }

      if (data.nutritionPortions && nutritionLegend) {
        Object.keys(data.nutritionPortions).forEach((key) => {
          const row = nutritionLegend.querySelector(`[data-nutrition-row="${key}"]`);
          if (!row) return;
          const pctInp = row.querySelector('.nutrition-pct-input');
          const rngInp = row.querySelector('.nutrition-range-input');
          if (pctInp) pctInp.value = data.nutritionPortions[key];
          if (rngInp) rngInp.value = data.nutritionPortions[key];
        });
        updateNutritionPie();
      }

      if (Array.isArray(data.photos) && data.photos.length > 0) {
        loggedPhotos = data.photos;
      }
    } catch (_) {
      // Ignore corrupt local state
    }
  }

  // Auto-save on interactions inside the phone frame
  const phoneFrame = document.querySelector('.phone-frame');
  if (phoneFrame) {
    phoneFrame.addEventListener('change', saveJournalState);
    phoneFrame.addEventListener('input', saveJournalState);
    phoneFrame.addEventListener('click', (e) => {
      if (e.target.closest('button, .custom-checkbox, .water-radio-card, .chip-remove-btn')) {
        setTimeout(saveJournalState, 30);
      }
    });
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

  // Export JSON & CSV Backup Handlers
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
      const snapshot = collectJournalSnapshot();
      const dateStamp = new Date().toISOString().slice(0, 10);
      triggerFileDownload(
        `eczema-journal-backup-${dateStamp}.json`,
        'application/json;charset=utf-8',
        JSON.stringify(snapshot, null, 2)
      );
      showToast('Exported JSON backup!');
    });
  }

  const btnExportCsv = document.getElementById('btnExportCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const s = collectJournalSnapshot();
      const dateStamp = new Date().toISOString().slice(0, 10);
      const escapeCsv = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;

      const rows = [
        ['Category', 'Item / Field', 'Value / Status'],
        ['Profile', 'User Name', s.userName],
        ['Profile', 'Date', s.dateLabel],
        ['Skin Feeling', 'Mood', s.mood],
        ['Food & Drink', 'Water Intake', s.waterIntake],
        ['Routine & Sleep', 'Bed Time', s.bedTime],
        ['Routine & Sleep', 'Wake Up Time', s.wakeTime]
      ];

      Object.entries(s.nutritionPortions || {}).forEach(([k, v]) => {
        rows.push(['Nutrition Portion', k, `${v}%`]);
      });

      Object.entries(s.chipLists || {}).forEach(([group, items]) => {
        const activeLabels = items.filter((i) => i.active).map((i) => i.label).join('; ');
        rows.push(['Tracked Chips', group, activeLabels || 'None']);
      });

      (s.textInputs || []).forEach((inp, idx) => {
        const label = inp.ariaLabel || inp.placeholder || inp.id || `Note ${idx + 1}`;
        rows.push(['Notes', label, inp.value]);
      });

      (s.photos || []).forEach((p) => {
        rows.push(['Photo Log', p.tag, `${p.caption} (${p.time})`]);
      });

      const csvContent = rows.map((r) => r.map(escapeCsv).join(',')).join('\r\n');
      triggerFileDownload(
        `eczema-journal-backup-${dateStamp}.csv`,
        'text/csv;charset=utf-8',
        csvContent
      );
      showToast('Exported CSV backup!');
    });
  }

  // Register Service Worker for Offline PWA Support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    });
  }

  restoreJournalState();
  renderPhotosGallery();
})();
