/**
 * Gnotheia (Knotea) Responsive Script
 * Works directly with original Webflow component classes
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Webflow Mobile Navigation Drawer Toggle ---
  const hamburger = document.querySelector('.brix---hamburger-menu-wrapper');
  const navMenu = document.querySelector('.brix---header-menu-wrapper');

  if (hamburger && navMenu) {
    const closeMobileNav = () => {
      navMenu.removeAttribute('data-nav-menu-open');
      navMenu.classList.remove('open');
      hamburger.classList.remove('w--open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    const openMobileNav = () => {
      navMenu.setAttribute('data-nav-menu-open', '');
      navMenu.classList.add('open');
      hamburger.classList.add('w--open');
      hamburger.setAttribute('aria-expanded', 'true');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.hasAttribute('data-nav-menu-open') || navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        if (navMenu.hasAttribute('data-nav-menu-open') || navMenu.classList.contains('open')) {
          closeMobileNav();
        }
      }
    });

    // Close drawer when window is resized above 991px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        closeMobileNav();
      }
    });
  }

  // --- 2. Popup Modals (.popup_wraper) ---
  const popups = document.querySelectorAll('.popup_wraper');

  // Trigger buttons with data-popup
  document.querySelectorAll('[data-open-popup]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const popupId = btn.getAttribute('data-open-popup');
      const targetPopup = document.getElementById(popupId) || document.querySelector('.popup_wraper');
      if (targetPopup) {
        targetPopup.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close handlers
  popups.forEach(popup => {
    const closeButtons = popup.querySelectorAll('.button[arial-label="close dialog"], .popup_close_overlay');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  });

  // ESC key to close active popup, dropdowns, and datepickers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popups.forEach(popup => {
        if (popup.classList.contains('open')) {
          popup.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
      document.querySelectorAll('.dropdown-3.w--open').forEach(d => {
        d.classList.remove('w--open');
        const p = d.querySelector('.w-dropdown-list, .datepicker-popup');
        if (p) p.classList.remove('w--open');
        const t = d.querySelector('.w-dropdown-toggle, .datepicker-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // --- 3. Collapsible Sections (e.g. Polycontext History) ---
  const toggleCollapseButtons = document.querySelectorAll('[data-toggle-collapse]');
  toggleCollapseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-toggle-collapse');
      const target = document.getElementById(targetId);
      if (target) {
        const isHidden = target.style.display === 'none';
        target.style.display = isHidden ? '' : 'none';
        btn.classList.toggle('collapsed', !isHidden);
      }
    });
  });

  // --- 4. Live Table Search Filtering ---
  const searchInputs = document.querySelectorAll('input.search-input-field[data-table-filter], [data-table-filter]');
  searchInputs.forEach(input => {
    const tableId = input.getAttribute('data-table-filter');
    const table = tableId ? document.getElementById(tableId) : null;
    if (!table) return;

    input.addEventListener('input', () => {
      const term = input.value.toLowerCase().trim();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });
  });

  // --- 4b. Webflow Dropdowns (.dropdown-3, .w-dropdown) ---
  const dropdowns = document.querySelectorAll('.dropdown-3.w-dropdown:not(.custom-datepicker)');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.w-dropdown-toggle');
    const list = dropdown.querySelector('.w-dropdown-list');
    const selectedText = dropdown.querySelector('.text-block-8, .dropdown-selected-text');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const options = dropdown.querySelectorAll('.dropdown-option-item');

    if (toggle && list) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('w--open');

        // Close any other open dropdowns first
        document.querySelectorAll('.dropdown-3.w--open').forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('w--open');
            const otherList = d.querySelector('.w-dropdown-list, .datepicker-popup');
            if (otherList) otherList.classList.remove('w--open');
            const otherToggle = d.querySelector('.w-dropdown-toggle');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          }
        });

        dropdown.classList.toggle('w--open', !isOpen);
        list.classList.toggle('w--open', !isOpen);
        toggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });

      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const val = opt.getAttribute('data-value') || '';
          const label = opt.querySelector('span') ? opt.querySelector('span').textContent.trim() : opt.textContent.trim();

          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');

          if (selectedText) selectedText.textContent = label;
          if (hiddenInput) {
            hiddenInput.value = val;
            hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
          }

          dropdown.classList.remove('w--open');
          list.classList.remove('w--open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });

  // Global click outside to close any open dropdowns
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target) && dropdown.classList.contains('w--open')) {
        dropdown.classList.remove('w--open');
        const list = dropdown.querySelector('.w-dropdown-list');
        if (list) list.classList.remove('w--open');
        const toggle = dropdown.querySelector('.w-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- 4c. Custom Themed Date Pickers (.custom-datepicker) ---
  const datePickers = document.querySelectorAll('.custom-datepicker');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function closeDatePicker(picker) {
    picker.classList.remove('w--open');
    const popup = picker.querySelector('.datepicker-popup, .w-dropdown-list');
    if (popup) popup.classList.remove('w--open');
    const toggle = picker.querySelector('.datepicker-toggle, .w-dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  datePickers.forEach(picker => {
    const toggle = picker.querySelector('.datepicker-toggle');
    const popup = picker.querySelector('.datepicker-popup');
    const displayText = picker.querySelector('.datepicker-display-text');
    const hiddenInput = picker.querySelector('input[type="hidden"]');

    // Default calendar to February 2026 to match data rows
    let currentYear = 2026;
    let currentMonth = 1; // 0 = Jan, 1 = Feb
    let selectedDate = '';

    const renderCalendar = () => {
      if (!popup) return;

      const firstDay = new Date(currentYear, currentMonth, 1);
      // Monday = 0, Sunday = 6
      const startDay = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      let html = `
        <div class="dp-header">
          <button type="button" class="dp-nav-btn dp-prev-month" title="Previous month">&lsaquo;</button>
          <div class="dp-month-year">${monthNames[currentMonth]} ${currentYear}</div>
          <button type="button" class="dp-nav-btn dp-next-month" title="Next month">&rsaquo;</button>
        </div>
        <div class="dp-weekdays">
          <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
        </div>
        <div class="dp-days-grid">
      `;

      // Previous month trailing days
      for (let i = startDay - 1; i >= 0; i--) {
        const d = prevMonthDays - i;
        html += `<div class="dp-day-cell other-month">${d}</div>`;
      }

      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isSelected = selectedDate === dateStr;
        const isToday = todayStr === dateStr;
        let classes = 'dp-day-cell';
        if (isSelected) classes += ' selected';
        if (isToday) classes += ' today';

        html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
      }

      // Next month trailing days
      const totalCells = startDay + daysInMonth;
      const nextMonthDays = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= nextMonthDays; i++) {
        html += `<div class="dp-day-cell other-month">${i}</div>`;
      }

      html += `
        </div>
        <div class="dp-footer">
          <button type="button" class="dp-action-btn dp-clear-btn">Clear</button>
          <button type="button" class="dp-action-btn dp-today-btn">Today</button>
        </div>
      `;

      popup.innerHTML = html;

      // Event handlers inside popup
      const btnPrev = popup.querySelector('.dp-prev-month');
      const btnNext = popup.querySelector('.dp-next-month');
      const btnClear = popup.querySelector('.dp-clear-btn');
      const btnToday = popup.querySelector('.dp-today-btn');
      const dayCells = popup.querySelectorAll('.dp-day-cell:not(.other-month)');

      if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          currentMonth--;
          if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
          }
          renderCalendar();
        });
      }

      if (btnNext) {
        btnNext.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
          renderCalendar();
        });
      }

      dayCells.forEach(cell => {
        cell.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const dStr = cell.getAttribute('data-date');
          selectedDate = dStr;
          if (displayText) {
            displayText.textContent = dStr;
            displayText.classList.remove('placeholder');
          }
          if (hiddenInput) {
            hiddenInput.value = dStr;
            hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          closeDatePicker(picker);
        });
      });

      if (btnClear) {
        btnClear.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          selectedDate = '';
          if (displayText) {
            displayText.textContent = 'Select date...';
            displayText.classList.add('placeholder');
          }
          if (hiddenInput) {
            hiddenInput.value = '';
            hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          closeDatePicker(picker);
        });
      }

      if (btnToday) {
        btnToday.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          selectedDate = todayStr;
          const [tY, tM] = todayStr.split('-').map(Number);
          currentYear = tY;
          currentMonth = tM - 1;
          if (displayText) {
            displayText.textContent = todayStr;
            displayText.classList.remove('placeholder');
          }
          if (hiddenInput) {
            hiddenInput.value = todayStr;
            hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          closeDatePicker(picker);
        });
      }
    };

    renderCalendar();

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = picker.classList.contains('w--open');

        // Close other dropdowns & datepickers
        document.querySelectorAll('.dropdown-3.w--open').forEach(d => {
          if (d !== picker) {
            d.classList.remove('w--open');
            const p = d.querySelector('.w-dropdown-list, .datepicker-popup');
            if (p) p.classList.remove('w--open');
            const t = d.querySelector('.w-dropdown-toggle, .datepicker-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          closeDatePicker(picker);
        } else {
          picker.classList.add('w--open');
          if (popup) popup.classList.add('w--open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    }

    // Expose reset method
    picker.resetDatePicker = () => {
      selectedDate = '';
      if (displayText) {
        displayText.textContent = 'Select date...';
        displayText.classList.add('placeholder');
      }
      if (hiddenInput) {
        hiddenInput.value = '';
      }
      currentYear = 2026;
      currentMonth = 1;
      renderCalendar();
    };
  });

  // Global click outside to close datepickers
  document.addEventListener('click', (e) => {
    datePickers.forEach(picker => {
      if (!picker.contains(e.target) && picker.classList.contains('w--open')) {
        closeDatePicker(picker);
      }
    });
  });

  // --- 5. Explainability Action & Toast Simulation ---
  const btnExplain = document.getElementById('btnExplain');
  const toast = document.getElementById('explainToastNotification');
  const btnCloseToast = document.getElementById('btnCloseExplainToast');

  if (btnExplain) {
    btnExplain.addEventListener('click', (e) => {
      e.preventDefault();
      if (btnExplain.disabled) return;

      const btnText = btnExplain.querySelector('.btn-text');
      const btnSpinner = btnExplain.querySelector('.btn-spinner');

      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnText) btnText.textContent = 'REQUESTING...';
      btnExplain.disabled = true;

      setTimeout(() => {
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnText) btnText.textContent = 'EXPLAIN REQUESTED';
        btnExplain.title = 'Explain request already running for this version';
        btnExplain.style.opacity = '0.6';
        btnExplain.style.cursor = 'not-allowed';

        if (toast) {
          toast.style.display = 'flex';
        }
      }, 850);
    });
  }

  if (btnCloseToast && toast) {
    btnCloseToast.addEventListener('click', (e) => {
      e.preventDefault();
      toast.style.display = 'none';
    });
  }

  // --- 6. Explainability Screen Advanced Filters ---
  const explainTable = document.getElementById('explainTable');
  if (explainTable) {
    const filterSearch = document.getElementById('filterExplainSearch');
    const filterStatus = document.getElementById('filterExplainStatus');
    const filterDateFrom = document.getElementById('filterDateFrom');
    const filterDateTo = document.getElementById('filterDateTo');
    const btnFilterClear = document.getElementById('btnFilterClear');
    const btnRefresh = document.getElementById('btnRefreshExplain');
    const countBadge = document.getElementById('explainCountBadge');
    const paginationText = document.getElementById('explainPaginationText');
    const emptyState = document.getElementById('explainEmptyState');
    const explainRows = explainTable.querySelectorAll('tbody tr');

    const applyExplainFilters = () => {
      const term = (filterSearch ? filterSearch.value : '').toLowerCase().trim();
      const status = (filterStatus ? filterStatus.value : '').trim();
      const dateFrom = filterDateFrom ? filterDateFrom.value : '';
      const dateTo = filterDateTo ? filterDateTo.value : '';

      let visibleCount = 0;
      explainRows.forEach(row => {
        const rowId = (row.getAttribute('data-id') || '').toLowerCase();
        const rowPoly = (row.getAttribute('data-poly') || '').toLowerCase();
        const rowStatus = (row.getAttribute('data-status') || '');
        const rowDate = (row.getAttribute('data-date') || '');
        const rowText = row.textContent.toLowerCase();

        let matchesSearch = !term || rowId.includes(term) || rowPoly.includes(term) || rowText.includes(term);
        let matchesStatus = !status || rowStatus.toLowerCase() === status.toLowerCase();
        let matchesDate = true;
        if (dateFrom && rowDate && rowDate < dateFrom) matchesDate = false;
        if (dateTo && rowDate && rowDate > dateTo) matchesDate = false;

        const isVisible = matchesSearch && matchesStatus && matchesDate;
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
      });

      if (countBadge) {
        countBadge.textContent = `${visibleCount} request${visibleCount === 1 ? '' : 's'}`;
      }
      if (paginationText) {
        paginationText.textContent = `Showing ${visibleCount} explanation request${visibleCount === 1 ? '' : 's'} · Sorted by Date (Newest first)`;
      }
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    // URL parameter pre-fill
    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get('id') || urlParams.get('polycontext');
    if (queryId && filterSearch) {
      filterSearch.value = queryId;
      applyExplainFilters();
    }

    if (filterSearch) filterSearch.addEventListener('input', applyExplainFilters);
    if (filterStatus) filterStatus.addEventListener('change', applyExplainFilters);
    if (filterDateFrom) filterDateFrom.addEventListener('change', applyExplainFilters);
    if (filterDateTo) filterDateTo.addEventListener('change', applyExplainFilters);

    if (btnFilterClear) {
      btnFilterClear.addEventListener('click', (e) => {
        e.preventDefault();
        if (filterSearch) filterSearch.value = '';
        if (filterStatus) filterStatus.value = '';
        if (filterDateFrom) filterDateFrom.value = '';
        if (filterDateTo) filterDateTo.value = '';

        // Reset dropdown status UI
        const statusSelected = document.getElementById('dropdownStatusSelected');
        if (statusSelected) statusSelected.textContent = 'All Statuses';
        const dropdownStatus = document.getElementById('dropdownStatus');
        if (dropdownStatus) {
          dropdownStatus.querySelectorAll('.dropdown-option-item').forEach(opt => {
            opt.classList.toggle('selected', (opt.getAttribute('data-value') || '') === '');
          });
        }

        // Reset custom date pickers
        document.querySelectorAll('.custom-datepicker').forEach(dp => {
          if (typeof dp.resetDatePicker === 'function') dp.resetDatePicker();
        });

        applyExplainFilters();
      });
    }

    if (btnRefresh) {
      btnRefresh.addEventListener('click', (e) => {
        e.preventDefault();
        const svg = btnRefresh.querySelector('svg');
        if (svg) svg.style.animation = 'btnSpin 0.6s linear infinite';
        setTimeout(() => {
          if (svg) svg.style.animation = '';
          applyExplainFilters();
        }, 500);
      });
    }
  }

  // --- 8. HITL Feedback Reasons & Comments Logic ---
  const btnOpenReasonPicker = document.getElementById('btnOpenReasonPicker');
  const reasonPickerModal = document.getElementById('reasonPickerModal');
  const btnApplyReasonPicker = document.getElementById('btnApplyReasonPicker');
  const btnCancelReasonPicker = document.getElementById('btnCancelReasonPicker');
  const btnCloseReasonPickerHeader = document.getElementById('btnCloseReasonPickerHeader');
  const selectedReasonsContainer = document.getElementById('selectedReasonsContainer');
  const reasonCounterText = document.getElementById('reasonCounterText');
  const pickerCountSummary = document.getElementById('pickerCountSummary');
  const hitlCommentTextarea = document.getElementById('hitlCommentTextarea');
  const otherMinCharWarning = document.getElementById('otherMinCharWarning');
  const charCountNum = document.getElementById('charCountNum');
  const btnSendHitlComment = document.getElementById('btnSendHitlComment');
  const chatReasonFilter = document.getElementById('chatReasonFilter');
  const filterMatchCount = document.getElementById('filterMatchCount');

  if (reasonPickerModal && selectedReasonsContainer) {
    const checkboxes = reasonPickerModal.querySelectorAll('input[type="checkbox"]');
    let selectedReasons = []; // array of { code, name, group }

    const updatePickerState = () => {
      const checkedBoxes = reasonPickerModal.querySelectorAll('input[type="checkbox"]:checked');
      const count = checkedBoxes.length;
      if (pickerCountSummary) {
        pickerCountSummary.textContent = `${count} of 3 reasons selected (min 1, max 3)`;
      }

      checkboxes.forEach(cb => {
        const item = cb.closest('.reason-picker-item');
        if (count >= 3 && !cb.checked) {
          cb.disabled = true;
          if (item) item.classList.add('disabled');
        } else {
          cb.disabled = false;
          if (item) item.classList.remove('disabled');
        }
      });
    };

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updatePickerState);
    });

    if (btnOpenReasonPicker) {
      btnOpenReasonPicker.addEventListener('click', (e) => {
        e.preventDefault();
        // Sync checkboxes with current selectedReasons
        checkboxes.forEach(cb => {
          cb.checked = selectedReasons.some(r => r.code === cb.value);
        });
        updatePickerState();
        reasonPickerModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    const closeReasonModal = () => {
      reasonPickerModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (btnCancelReasonPicker) btnCancelReasonPicker.addEventListener('click', (e) => { e.preventDefault(); closeReasonModal(); });
    if (btnCloseReasonPickerHeader) btnCloseReasonPickerHeader.addEventListener('click', (e) => { e.preventDefault(); closeReasonModal(); });

    const validateHitlSend = () => {
      if (!btnSendHitlComment || !hitlCommentTextarea) return;
      const text = hitlCommentTextarea.value.trim();
      const reasonsCount = selectedReasons.length;
      const hasOther = selectedReasons.some(r => r.code === 'OTHER');

      if (charCountNum) charCountNum.textContent = text.length;

      let isValid = true;
      if (reasonsCount < 1) isValid = false;
      if (!text) isValid = false;

      if (hasOther) {
        if (otherMinCharWarning) otherMinCharWarning.style.display = 'block';
        if (text.length < 20) isValid = false;
      } else {
        if (otherMinCharWarning) otherMinCharWarning.style.display = 'none';
      }

      if (isValid) {
        btnSendHitlComment.classList.remove('disabled');
      } else {
        btnSendHitlComment.classList.add('disabled');
      }
    };

    const renderSelectedReasons = () => {
      selectedReasonsContainer.innerHTML = '';
      if (selectedReasons.length === 0) {
        selectedReasonsContainer.classList.add('empty');
        selectedReasonsContainer.innerHTML = `
          <div id="noReasonsHint" class="reasons-empty-placeholder">
            <div class="code-embed-8 w-embed" style="width: 16px; height: 16px; margin-right: 2px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <span>No reasons selected yet. Click button above.</span>
          </div>`;
      } else {
        selectedReasonsContainer.classList.remove('empty');
        selectedReasons.forEach(r => {
          const tag = document.createElement('div');
          let groupClass = 'other';
          if (r.group === 'doc') groupClass = 'doc';
          else if (r.group === 'rule') groupClass = 'rule';
          else if (r.group === 'data') groupClass = 'data';
          else if (r.group === 'output') groupClass = 'output';
          tag.className = `reason-tag ${groupClass}`;
          tag.innerHTML = `<span>${r.code}</span><span class="reason-tag-remove" data-remove="${r.code}" title="Remove reason">&times;</span>`;
          selectedReasonsContainer.appendChild(tag);
        });
      }

      if (reasonCounterText) {
        reasonCounterText.textContent = `${selectedReasons.length} of 3 reasons selected`;
      }

      validateHitlSend();
    };

    selectedReasonsContainer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.reason-tag-remove');
      if (removeBtn) {
        const codeToRemove = removeBtn.getAttribute('data-remove');
        selectedReasons = selectedReasons.filter(r => r.code !== codeToRemove);
        renderSelectedReasons();
      }
    });

    if (btnApplyReasonPicker) {
      btnApplyReasonPicker.addEventListener('click', (e) => {
        e.preventDefault();
        const checkedBoxes = Array.from(reasonPickerModal.querySelectorAll('input[type="checkbox"]:checked'));
        selectedReasons = checkedBoxes.map(cb => ({
          code: cb.value,
          name: cb.getAttribute('data-name') || cb.value,
          group: cb.getAttribute('data-group') || 'other'
        }));
        renderSelectedReasons();
        closeReasonModal();
      });
    }

    if (hitlCommentTextarea) {
      hitlCommentTextarea.addEventListener('input', validateHitlSend);
    }

    if (btnSendHitlComment) {
      btnSendHitlComment.addEventListener('click', (e) => {
        e.preventDefault();
        if (btnSendHitlComment.classList.contains('disabled')) return;

        const text = hitlCommentTextarea.value.trim();
        if (!text || selectedReasons.length === 0) return;

        // Current time
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${mins}`;

        // Build reason badges HTML
        const reasonBadgesHtml = selectedReasons.map(r => `<span class="reason-badge ${r.group}">${r.code}</span>`).join(' ');
        const reasonCodesStr = selectedReasons.map(r => r.code).join(',');

        // Build new comment box
        const newCommentBox = document.createElement('div');
        newCommentBox.className = 'chat_box';
        newCommentBox.setAttribute('data-reasons', reasonCodesStr);
        newCommentBox.innerHTML = `
          <div class="div-block-87">
            <div class="up_data">Sarah Jenkins <span class="version-pill">v4.1.0</span></div>
            <div class="low_data">${timeStr}</div>
          </div>
          <div class="comment-reasons-wrap">
            ${reasonBadgesHtml}
          </div>
          <div class="text-block-3">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        `;

        // Append to first .chat_date container
        const chatMessagesWrap = document.querySelector('.wrap_chat-messages');
        const firstChatDate = chatMessagesWrap ? chatMessagesWrap.querySelector('.chat_date') : null;
        if (firstChatDate) {
          firstChatDate.insertBefore(newCommentBox, firstChatDate.querySelector('.chat_box'));
        }

        // Reset form
        hitlCommentTextarea.value = '';
        selectedReasons = [];
        renderSelectedReasons();

        // Update comments count badge
        const commentsBadge = document.querySelector('.object-box-copy .status-badge.progress');
        if (commentsBadge) {
          const allComments = document.querySelectorAll('.wrap_chat-messages .chat_box');
          commentsBadge.textContent = `${allComments.length} comments`;
        }

        if (filterMatchCount) {
          const allComments = document.querySelectorAll('.wrap_chat-messages .chat_box');
          filterMatchCount.textContent = `${allComments.length} comments`;
        }
      });
    }

    // Comment Filter by Reason
    if (chatReasonFilter) {
      chatReasonFilter.addEventListener('change', () => {
        const val = chatReasonFilter.value.trim();
        const chatBoxes = document.querySelectorAll('.wrap_chat-messages .chat_box');
        let matched = 0;

        chatBoxes.forEach(box => {
          const reasons = (box.getAttribute('data-reasons') || '').split(',');
          const isMatch = !val || reasons.includes(val);
          box.style.display = isMatch ? '' : 'none';
          if (isMatch) matched++;
        });

        // Hide date sections if all comments inside are hidden
        document.querySelectorAll('.wrap_chat-messages .chat_date').forEach(dateSec => {
          const visibleInSec = Array.from(dateSec.querySelectorAll('.chat_box')).filter(b => b.style.display !== 'none');
          dateSec.style.display = visibleInSec.length > 0 ? '' : 'none';
        });

        const emptyHint = document.getElementById('chatNoCommentsHint');
        if (emptyHint) {
          emptyHint.style.display = matched === 0 ? 'flex' : 'none';
        }

        if (filterMatchCount) {
          filterMatchCount.textContent = `${matched} comment${matched === 1 ? '' : 's'}`;
        }
      });
    }
  }

  // --- 9. Admin Screen: HITL Reasons Management (hitl-reasons.html) ---
  const reasonsTable = document.getElementById('reasonsTable');
  if (reasonsTable) {
    const searchInput = document.getElementById('filterReasonSearch');
    const groupSelect = document.getElementById('filterReasonGroup');
    const statusSelect = document.getElementById('filterReasonStatus');
    const btnClear = document.getElementById('btnFilterReasonsClear');
    const reasonsCountBadge = document.getElementById('reasonsCountBadge');
    const rows = reasonsTable.querySelectorAll('tbody tr');

    const filterReasons = () => {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const group = (groupSelect ? groupSelect.value : '').trim();
      const status = (statusSelect ? statusSelect.value : '').trim();

      let visible = 0;
      rows.forEach(row => {
        const code = (row.getAttribute('data-code') || '').toLowerCase();
        const rowGroup = (row.getAttribute('data-group') || '');
        const rowStatus = (row.getAttribute('data-status') || '');
        const rowText = row.textContent.toLowerCase();

        let matchSearch = !query || code.includes(query) || rowText.includes(query);
        let matchGroup = !group || rowGroup.toLowerCase() === group.toLowerCase();
        let matchStatus = !status || rowStatus.toLowerCase() === status.toLowerCase();

        const isVisible = matchSearch && matchGroup && matchStatus;
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) visible++;
      });

      if (reasonsCountBadge) {
        reasonsCountBadge.textContent = `${visible} reason${visible === 1 ? '' : 's'}`;
      }
    };

    if (searchInput) searchInput.addEventListener('input', filterReasons);
    if (groupSelect) groupSelect.addEventListener('change', filterReasons);
    if (statusSelect) statusSelect.addEventListener('change', filterReasons);

    if (btnClear) {
      btnClear.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput) searchInput.value = '';
        if (groupSelect) groupSelect.value = '';
        if (statusSelect) statusSelect.value = '';

        // Reset dropdown UI labels and selection
        const groupSelText = document.getElementById('dropdownReasonGroupSelected');
        if (groupSelText) groupSelText.textContent = 'All Groups';
        const statusSelText = document.getElementById('dropdownReasonStatusSelected');
        if (statusSelText) statusSelText.textContent = 'All Statuses';

        const ddGroup = document.getElementById('dropdownReasonGroup');
        if (ddGroup) {
          ddGroup.querySelectorAll('.dropdown-option-item').forEach(opt => {
            opt.classList.toggle('selected', (opt.getAttribute('data-value') || '') === '');
          });
        }
        const ddStatus = document.getElementById('dropdownReasonStatus');
        if (ddStatus) {
          ddStatus.querySelectorAll('.dropdown-option-item').forEach(opt => {
            opt.classList.toggle('selected', (opt.getAttribute('data-value') || '') === '');
          });
        }

        filterReasons();
      });
    }

    // Modal: Create New Reason
    const btnOpenCreateReason = document.getElementById('btnOpenCreateReason');
    const createReasonModal = document.getElementById('createReasonModal');
    const btnSaveNewReason = document.getElementById('btnSaveNewReason');

    if (btnOpenCreateReason && createReasonModal) {
      btnOpenCreateReason.addEventListener('click', (e) => {
        e.preventDefault();
        createReasonModal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Reset modal fields and dropdown
        const codeInput = document.getElementById('newReasonCode');
        const groupInput = document.getElementById('newReasonGroup');
        const nameInput = document.getElementById('newReasonName');
        const descInput = document.getElementById('newReasonDesc');
        if (codeInput) codeInput.value = '';
        if (groupInput) groupInput.value = 'Documents';
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';

        const newGroupSelected = document.getElementById('dropdownNewReasonGroupSelected');
        if (newGroupSelected) newGroupSelected.textContent = 'Documents';
        const ddNewGroup = document.getElementById('dropdownNewReasonGroup');
        if (ddNewGroup) {
          ddNewGroup.querySelectorAll('.dropdown-option-item').forEach(opt => {
            opt.classList.toggle('selected', (opt.getAttribute('data-value') || '') === 'Documents');
          });
        }
      });

      if (btnSaveNewReason) {
        btnSaveNewReason.addEventListener('click', (e) => {
          e.preventDefault();
          const codeInput = document.getElementById('newReasonCode');
          const groupInput = document.getElementById('newReasonGroup');
          const nameInput = document.getElementById('newReasonName');
          const descInput = document.getElementById('newReasonDesc');
          const orderInput = document.getElementById('newReasonOrder');

          const code = codeInput ? codeInput.value.trim().toUpperCase() : '';
          const group = groupInput ? groupInput.value.trim() : 'Other';
          const name = nameInput ? nameInput.value.trim() : '';
          const desc = descInput ? descInput.value.trim() : '';
          const order = orderInput ? orderInput.value.trim() : '1';

          if (!code || !name) {
            alert('Please provide at least Reason Code and Name.');
            return;
          }

          // Map group to class
          let groupClass = 'other';
          if (group === 'Documents') groupClass = 'doc';
          else if (group === 'Rules') groupClass = 'rule';
          else if (group === 'Data and context') groupClass = 'data';
          else if (group === 'Output') groupClass = 'output';

          const tbody = reasonsTable.querySelector('tbody');
          const newRow = document.createElement('tr');
          newRow.className = 'clean';
          newRow.setAttribute('data-code', code);
          newRow.setAttribute('data-group', group);
          newRow.setAttribute('data-status', 'Active');
          newRow.setAttribute('data-usage', '0');
          newRow.innerHTML = `
            <td>
              <div class="column_wrap">
                <div class="company-tag code">${code}</div>
              </div>
            </td>
            <td>
              <div class="column_wrap">
                <span class="group-badge ${groupClass}">${group}</span>
              </div>
            </td>
            <td><div class="red-only data">${name}</div></td>
            <td><div class="text-block-3">${desc}</div></td>
            <td style="text-align: center;"><span class="low_data">${order}</span></td>
            <td style="text-align: center;"><span class="status-badge active">Active</span></td>
            <td style="text-align: right;"><span class="up_data">0 uses</span></td>
            <td style="text-align: right;">
              <div style="display: inline-flex; gap: 6px;">
                <a href="#" class="user_btn_dark w-inline-block" title="Edit Reason"><div class="code-embed-8 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></div></a>
                <a href="#" class="user_btn_dark w-inline-block btn-deactivate" title="Deactivate Reason" data-code="${code}" data-usage="0"><div class="code-embed-8 w-embed" style="color: #ee3b76;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ban"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg></div></a>
              </div>
            </td>
          `;
          tbody.appendChild(newRow);

          // Reset inputs and close
          if (codeInput) codeInput.value = '';
          if (nameInput) nameInput.value = '';
          if (descInput) descInput.value = '';
          createReasonModal.classList.remove('open');
          document.body.style.overflow = '';
          filterReasons();
        });
      }
    }

    // Modal: Deactivate Warning
    const deactivateModal = document.getElementById('deactivateWarningModal');
    const deactReasonCodeSpan = document.getElementById('deactReasonCode');
    const deactReasonCountSpan = document.getElementById('deactReasonCount');
    const btnConfirmDeactivate = document.getElementById('btnConfirmDeactivate');
    let targetRowToDeactivate = null;

    reasonsTable.addEventListener('click', (e) => {
      const deactBtn = e.target.closest('.btn-deactivate');
      if (deactBtn) {
        e.preventDefault();
        targetRowToDeactivate = deactBtn.closest('tr');
        const code = deactBtn.getAttribute('data-code') || (targetRowToDeactivate ? targetRowToDeactivate.getAttribute('data-code') : '');
        const usage = deactBtn.getAttribute('data-usage') || (targetRowToDeactivate ? targetRowToDeactivate.getAttribute('data-usage') : '0');

        if (deactReasonCodeSpan) deactReasonCodeSpan.textContent = code;
        if (deactReasonCountSpan) deactReasonCountSpan.textContent = usage;

        if (deactivateModal) {
          deactivateModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }
    });

    if (btnConfirmDeactivate && deactivateModal) {
      btnConfirmDeactivate.addEventListener('click', (e) => {
        e.preventDefault();
        if (targetRowToDeactivate) {
          targetRowToDeactivate.setAttribute('data-status', 'Inactive');
          const statusCell = targetRowToDeactivate.querySelector('.status-badge');
          if (statusCell) {
            statusCell.className = 'status-badge inactive';
            statusCell.textContent = 'Inactive';
          }
        }
        deactivateModal.classList.remove('open');
        document.body.style.overflow = '';
        targetRowToDeactivate = null;
        filterReasons();
      });
    }
  }

  // --- 10. Rules Management Filters (rules-management.html) ---
  const rulesTable = document.getElementById('rulesTable');
  if (rulesTable) {
    const searchRuleInput = document.getElementById('filterRuleSearch') || document.querySelector('input[data-table-filter="rulesTable"]');
    const productInput = document.getElementById('filterRuleProduct');
    const coverageInput = document.getElementById('filterRuleCoverage');
    const subjectInput = document.getElementById('filterRuleSubject');
    const btnRulesClear = document.getElementById('btnFilterRulesClear');
    const ruleRows = rulesTable.querySelectorAll('tbody tr');

    const filterRules = () => {
      const query = (searchRuleInput ? searchRuleInput.value : '').toLowerCase().trim();
      const product = (productInput ? productInput.value : '').trim().toLowerCase();
      const coverage = (coverageInput ? coverageInput.value : '').trim().toLowerCase();
      const subject = (subjectInput ? subjectInput.value : '').trim().toLowerCase();

      ruleRows.forEach(row => {
        const rowProduct = (row.getAttribute('data-product') || '').toLowerCase();
        const rowCoverage = (row.getAttribute('data-coverage') || '').toLowerCase();
        const rowSubject = (row.getAttribute('data-subject') || '').toLowerCase();
        const rowText = row.textContent.toLowerCase();

        let matchSearch = !query || rowText.includes(query);
        let matchProduct = !product || rowProduct === product || rowText.includes(product);
        let matchCoverage = !coverage || rowCoverage === coverage || rowText.includes(coverage);
        let matchSubject = !subject || rowSubject === subject || rowText.includes(subject);

        row.style.display = (matchSearch && matchProduct && matchCoverage && matchSubject) ? '' : 'none';
      });
    };

    if (searchRuleInput) searchRuleInput.addEventListener('input', filterRules);
    if (productInput) productInput.addEventListener('change', filterRules);
    if (coverageInput) coverageInput.addEventListener('change', filterRules);
    if (subjectInput) subjectInput.addEventListener('change', filterRules);

    // Sync any other search inputs targeting rulesTable
    document.querySelectorAll('input[data-table-filter="rulesTable"]').forEach(inp => {
      if (inp !== searchRuleInput) {
        inp.addEventListener('input', (e) => {
          if (searchRuleInput) searchRuleInput.value = e.target.value;
          filterRules();
        });
      }
    });

    if (btnRulesClear) {
      btnRulesClear.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchRuleInput) searchRuleInput.value = '';
        document.querySelectorAll('input[data-table-filter="rulesTable"]').forEach(inp => { inp.value = ''; });
        if (productInput) productInput.value = '';
        if (coverageInput) coverageInput.value = '';
        if (subjectInput) subjectInput.value = '';

        // Reset dropdown texts
        const prodText = document.getElementById('dropdownRuleProductSelected');
        if (prodText) prodText.textContent = 'All Products';
        const covText = document.getElementById('dropdownRuleCoverageSelected');
        if (covText) covText.textContent = 'All Coverages';
        const subjText = document.getElementById('dropdownRuleSubjectSelected');
        if (subjText) subjText.textContent = 'All Subjects';

        // Reset selected classes in dropdowns
        ['dropdownRuleProduct', 'dropdownRuleCoverage', 'dropdownRuleSubject'].forEach(ddId => {
          const dd = document.getElementById(ddId);
          if (dd) {
            dd.querySelectorAll('.dropdown-option-item').forEach(opt => {
              opt.classList.toggle('selected', (opt.getAttribute('data-value') || '') === '');
            });
          }
        });

        filterRules();
      });
    }
  }

  // --- 10b. Reference Data Management (reference-data.html) ---
  const btnOpenAddItem = document.getElementById('btnOpenAddItem');
  const addItemModal = document.getElementById('addItemModal');
  const btnSaveNewItem = document.getElementById('btnSaveNewItem');
  const codesTable = document.getElementById('codesTable');

  if (btnOpenAddItem && addItemModal) {
    btnOpenAddItem.addEventListener('click', (e) => {
      e.preventDefault();
      addItemModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('newItemName');
      if (nameInput) {
        nameInput.value = '';
        setTimeout(() => nameInput.focus(), 50);
      }
    });

    if (btnSaveNewItem && codesTable) {
      btnSaveNewItem.addEventListener('click', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('newItemName');
        const typeInput = document.getElementById('newItemType');

        const itemName = nameInput ? nameInput.value.trim().toUpperCase() : '';
        const itemType = typeInput ? typeInput.value.trim() : 'User defined';

        if (!itemName) {
          alert('Please enter an Item Name.');
          if (nameInput) nameInput.focus();
          return;
        }

        const tbody = codesTable.querySelector('tbody');
        if (tbody) {
          const newRow = document.createElement('tr');
          newRow.className = 'clean';
          newRow.innerHTML = `
            <td><div class="number">${itemName}</div></td>
            <td>
              <div class="column_wrap">
                <div class="company-tag"><strong>${itemType}</strong></div>
              </div>
            </td>
            <td>
              <div class="column_wrap right">
                <a href="#" class="btn_popup w-inline-block" title="Edit Item">
                  <div class="code-embed-8 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen">
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                    </svg></div>
                </a>
              </div>
            </td>
          `;
          tbody.insertBefore(newRow, tbody.firstChild);
        }

        // Reset and close
        if (nameInput) nameInput.value = '';
        addItemModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  // Trace ID Copy to Clipboard handler
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#btnCopyTraceId');
    if (btn) {
      e.preventDefault();
      const traceElem = document.getElementById('traceIdValue');
      const traceId = traceElem ? traceElem.textContent.trim() : '4bf92f3577b34da6a3ce929d0e0e4736';
      navigator.clipboard.writeText(traceId).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg> <span>Copied!</span>`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> <span>Copy</span>`;
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy Trace ID:', err);
      });
    }
  });

  // --- 11. Document Preview Modal (Markdown Viewer) ---
  const docPreviewModal = document.getElementById('documentPreviewModal');
  const docPreviewTitle = document.getElementById('docPreviewTitle');
  const docPreviewTypeBadge = document.getElementById('docPreviewTypeBadge');
  const docPreviewMeta = document.getElementById('docPreviewMeta');
  const docKvReportId = document.getElementById('docKvReportId');

  document.querySelectorAll('.btn-open-doc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docId = btn.getAttribute('data-doc-id') || 'DOC-264384944-001';
      const docTitle = btn.getAttribute('data-doc-title') || 'Photo Documentation';
      const docMeta = btn.getAttribute('data-doc-meta') || 'Created: 2026-02-17 09:15 • Filed: 2026-02-17 11:00 • Entered: 2026-02-17 11:05';

      if (docPreviewTitle) docPreviewTitle.textContent = docId;
      if (docPreviewTypeBadge) docPreviewTypeBadge.textContent = `• ${docTitle}`;
      if (docPreviewMeta) docPreviewMeta.textContent = docMeta;
      if (docKvReportId) docKvReportId.textContent = docId;

      if (docPreviewModal) {
        docPreviewModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Copy Markdown button handler
  const btnCopyMarkdown = document.getElementById('btnCopyMarkdown');
  if (btnCopyMarkdown) {
    btnCopyMarkdown.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDocId = docPreviewTitle ? docPreviewTitle.textContent.trim() : 'DOC-264384944-001';
      const currentDocType = docPreviewTypeBadge ? docPreviewTypeBadge.textContent.replace('•', '').trim() : 'Document';
      const currentMeta = docPreviewMeta ? docPreviewMeta.textContent.trim() : '';

      const markdownContent = `# AI PRE-ASSESSMENT REPORT (POLYCONTEXT SUMMARY)
**Document:** ${currentDocId} • ${currentDocType}
**Metadata:** ${currentMeta}
**Polycontext ID:** 264384944 | **Claim ID:** CLM-9902

---

### 1. HEADER & CLAIM/POLICY AT A GLANCE
#### Governance & Pipeline
- **Report ID:** \`${currentDocId}\`
- **Pipeline Version:** \`v4.1.0\`
- **Generated At:** 2026-02-17 11:05:00 UTC
- **Claim Status:** Validation_Passed

#### Claim Parameters
- **Claim ID:** \`CLM-9902\`
- **Insured Party:** Lenka Nováková
- **Date of Loss:** 2026-02-15
- **Incident Summary:** Water damage from severed drainage pipe.

#### Policy Contract Details
- **Policy ID:** \`POL-264384944\`
- **Product Name:** Home Insurance Plus
- **Policy Status:** Active
- **Coverage Period:** 2025-01-01 to 2027-01-01

#### Evaluation Model & Prompt
- **Model Engine:** \`GPT-4-GNOTHEA-v2\`
- **Prompt Template:** \`PTM-000042\`
- **Trace ID:** \`4bf92f3577b34da6a3ce929d0e0e4736\`
- **Rules Passed:** 2 / 2 Passed (100%)

---

### 2. PROCESS FLOW OVERVIEW (VALUE STREAM)
[1. Registration ✓] ➔ [2. Doc Ingestion ✓] ➔ [3. Policy Match ✓] ➔ **[4. Rule Evaluation (v.3) ⚙️]** ➔ [5. HITL Validation ⚪] ➔ [6. Settlement ⚪]

---

### 3. EVIDENCE & REASONING LOG
> **Inspection Finding (DOC-264384944-003):**
> Inspection notes confirm that drainage pipes remained patent and no water ingress contributed to the structural failure, isolating the event to seismic activity covered under Clause 4.2.
`;

      navigator.clipboard.writeText(markdownContent).then(() => {
        const origHTML = btnCopyMarkdown.innerHTML;
        btnCopyMarkdown.innerHTML = '<div>Copied!</div>';
        btnCopyMarkdown.style.borderColor = '#6ee7b7';
        btnCopyMarkdown.style.color = '#6ee7b7';
        setTimeout(() => {
          btnCopyMarkdown.innerHTML = origHTML;
          btnCopyMarkdown.style.borderColor = '';
          btnCopyMarkdown.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy Markdown content:', err);
      });
    });
  }

  // Universal close buttons inside any modal with .btn-close-modal
  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentModal = btn.closest('.popup_wraper');
      if (parentModal) {
        parentModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
});
