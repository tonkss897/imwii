/* ===== IMWI — MAIN JAVASCRIPT ===== */

// ============= SCROLL PROGRESS =============
window.addEventListener('scroll', function () {
  const h = document.documentElement;
  const pct = (h.scrollTop || document.body.scrollTop) /
    ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight) * 100;
  const line = document.getElementById('scrollLine');
  if (line) line.style.width = pct + '%';
}, { passive: true });

// ============= FADE IN OBSERVER =============
function initObserver() {
  const els = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right'
  );
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { obs.observe(el); });
}

// ============= HERO REVEAL (index.html) =============
var heroRevealed = false;
function revealHero() {
  if (heroRevealed) return;
  heroRevealed = true;
  var content = document.getElementById('heroContent');
  var hint    = document.getElementById('heroHint');
  if (content) content.classList.add('revealed');
  if (hint)    hint.style.display = 'none';
}

// ============= LOTUS TITLE REVEAL =============
function revealLotusTitle() {
  var el = document.getElementById('lotusTitleEl');
  if (el) el.classList.add('revealed');
}

// ============= IMAGE SLIDER (about section) =============
var sliderStates = {};
function slideImages(id, dir) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var imgs = wrap.querySelectorAll('img');
  if (!sliderStates[id]) sliderStates[id] = 0;
  imgs[sliderStates[id]].classList.remove('active');
  sliderStates[id] = (sliderStates[id] + dir + imgs.length) % imgs.length;
  imgs[sliderStates[id]].classList.add('active');
}

// ============= FOOD SLIDER (pir drakona) =============
var foodSliderStates = {};
function slideFoodSlider(id, dir) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var slides = wrap.querySelectorAll('.food-slide');
  if (!foodSliderStates[id]) foodSliderStates[id] = 0;
  foodSliderStates[id] = (foodSliderStates[id] + dir + slides.length) % slides.length;
  wrap.style.transform = 'translateX(' + (-foodSliderStates[id] * (100 / 3)) + '%)';
}

// ============= LOTUS FOOD SLIDER =============
var lotusFoodSets = [
  [
    '../img/сетлотос1.png',
    '../img/сетлотос2.png',
    '../img/сетлотос3.png'
  ],
  [
    '../img/сетвеганлотос1.png',
    '../img/веганлотос2.png',
    '../img/сетлотос1.png'
  ]
];
var lotusFoodIdx = [0, 0];

function slideLotusFood(col, dir) {
  var imgs  = lotusFoodSets[col];
  lotusFoodIdx[col] = (lotusFoodIdx[col] + dir + imgs.length) % imgs.length;
  var id    = col === 0 ? 'lotusMegaImg1' : 'lotusMegaImg2';
  var el    = document.getElementById(id);
  if (el) el.src = imgs[lotusFoodIdx[col]];
}

// ============= TEAM SLIDER (lotos.html) =============
var teamMembers = [
  {
    name: 'U-wei',
    role: 'РЕЖИССЁР ПОСТАНОВЩИК-ПРОЕКТА',
    desc: 'Создаёт визуальную драматургию спектакля, соединяя сценическое действие, свет, звук и гастрономию в единое пространство переживания. В основе его работы — медитативный ритм, минимализм и внимание к деталям, характерные для эстетики восточного театра.',
    img: '../img/режиссер.png'
  },
  {
    name: 'Wei Wan',
    role: 'КОНЦЕПТ-ШЕФ',
    desc: 'Автор гастрономических концепций всех программ IMWI. Его подход — создание блюд как продолжения визуального образа сцены, где каждое блюдо рассказывает свою часть истории через вкус, аромат и текстуру.',
    img: '../img/шеф.png'
  },
  {
    name: 'Lin Zhao',
    role: 'ХУДОЖНИК ПО СВЕТУ',
    desc: 'Отвечает за световую партитуру каждого шоу. Свет в его руках — не технический инструмент, а нарративный элемент, который управляет вниманием, создаёт ритм и поддерживает атмосферу каждой сцены.',
    img: '../img/световик.png'
  }
];
var teamIdx = 0;

function slideTeam(dir) {
  teamIdx = (teamIdx + dir + teamMembers.length) % teamMembers.length;
  var m = teamMembers[teamIdx];
  var img  = document.getElementById('teamImg');
  var name = document.getElementById('teamName');
  var role = document.getElementById('teamRole');
  var desc = document.getElementById('teamDesc');
  if (img)  img.src         = m.img;
  if (name) name.textContent = m.name;
  if (role) role.textContent = m.role;
  if (desc) desc.textContent = m.desc;
}

// ============= IMMERSIVE CARDS REVEAL (about page) =============
function revealImmCards(i) {
  var cards = document.querySelectorAll('.imm-card');
  for (var j = 0; j <= i; j++) {
    if (cards[j]) cards[j].classList.add('revealed');
  }
}

// ============= CERTIFICATE FLIP =============
function flipCert(el) {
  if (el.classList.contains('flipped')) {
    // second click — go to order page
    window.location.href = 'payment.html';
  } else {
    el.classList.add('flipped');
  }
}

// ============= PROMO TOGGLE (payment page) =============
function togglePromo() {
  var wrap = document.getElementById('promoInput');
  if (!wrap) return;
  wrap.style.display = wrap.style.display === 'none' ? 'block' : 'none';
}

// ============= TICKET FILTER =============
function filterTickets(type, btn) {
  document.querySelectorAll('.tf-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.querySelectorAll('.ticket-card').forEach(function (c) {
    c.style.display = (type === 'all' || c.dataset.type === type) ? 'block' : 'none';
  });
}

// ============= FAQ =============
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('open');
    });
  });
}

// ============= CALENDAR =============
var showData = {
  pir:   { name: 'ПИР ДРАКОНА',      color: 'var(--red3)',  days: [5, 12, 19, 26] },
  lotus: { name: 'САД ЛОТОСА',        color: '#c9a84c',      days: [6, 13, 20, 27] },
  fenix: { name: 'РИТУАЛ ФЕНИКСА',    color: 'var(--text2)', days: [7, 14, 21]     }
};

function buildCalendar(containerId, year, month, filter, showName) {
  var monthNames = ['ЯНВАРЬ','ФЕВРАЛЬ','МАРТ','АПРЕЛЬ','МАЙ','ИЮНЬ',
                    'ИЮЛЬ','АВГУСТ','СЕНТЯБРЬ','ОКТЯБРЬ','НОЯБРЬ','ДЕКАБРЬ'];
  var dayNames   = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var firstDay    = new Date(year, month, 1).getDay();
  var offset      = firstDay === 0 ? 6 : firstDay - 1;

  var shows = [];
  if (filter === 'all') {
    Object.values(showData).forEach(function (s) {
      shows = shows.concat(s.days);
    });
  } else if (showData[filter]) {
    shows = showData[filter].days.slice();
  }
  shows = [...new Set(shows)];

  var filterSelect = !showName
    ? '<select class="cal-filter" onchange="filterCalendarChange(this,\'' + containerId + '\',' + year + ',' + month + ')">' +
      '<option value="all">Все шоу</option>' +
      '<option value="pir">Пир Дракона</option>' +
      '<option value="lotus">Сад Лотоса</option>' +
      '<option value="fenix">Ритуал Феникса</option>' +
      '</select>'
    : '';

  var days = '';
  dayNames.forEach(function (d) {
    days += '<div class="cal-day-header">' + d + '</div>';
  });
  for (var o = 0; o < offset; o++) {
    days += '<div class="cal-day empty"></div>';
  }
  for (var i = 1; i <= daysInMonth; i++) {
    var hasEv  = shows.indexOf(i) > -1;
    var today  = (year === 2026 && month === 5 && i === 26);
    var cls    = 'cal-day' + (hasEv ? ' has-event' : '') + (today ? ' selected' : '');
    days += '<div class="' + cls + '" onclick="selectCalDay(this,' + i + ',' + month + ',\'' + (showName || filter || 'all') + '\',\'' + containerId + '\')">' + i + '</div>';
  }

  var html =
    '<div class="cal-header">' +
      '<span class="cal-month">' + monthNames[month] + ' ' + year + '</span>' +
      filterSelect +
      '<div style="display:flex;gap:0.5vw">' +
        '<button class="arrow-btn" onclick="navigateCal(\'' + containerId + '\',' + year + ',' + month + ',-1,\'' + (filter || 'all') + '\',\'' + (showName || '') + '\')">‹</button>' +
        '<button class="arrow-btn" onclick="navigateCal(\'' + containerId + '\',' + year + ',' + month + ',1,\'' + (filter || 'all') + '\',\'' + (showName || '') + '\')">›</button>' +
      '</div>' +
    '</div>' +
    '<div class="cal-wrapper">' +
      '<div><div class="cal-grid">' + days + '</div></div>' +
      '<div class="cal-info-panel" id="' + containerId + '-info"></div>' +
    '</div>' +
    '<div class="gift-btn-wrap"><a href="sertificats.html" class="btn btn-red">ПОДАРИТЬ СЕРТИФИКАТ</a></div>';

  var cont = document.getElementById(containerId);
  if (cont) {
    cont.innerHTML = html;
    if (today) showCalInfo(containerId, 26, 5, showName || filter || 'all');
  }
}

function selectCalDay(el, day, month, show, containerId) {
  el.closest('.cal-grid').querySelectorAll('.cal-day').forEach(function (d) {
    d.classList.remove('selected');
  });
  el.classList.add('selected');
  if (!el.classList.contains('has-event')) {
    var panel = document.getElementById(containerId + '-info');
    if (panel) panel.classList.remove('visible');
    return;
  }
  showCalInfo(containerId, day, month, show);
}

function showCalInfo(containerId, day, month, show) {
  var panel = document.getElementById(containerId + '-info');
  if (!panel) return;
  var info = getShowForDay(day, show);
  if (!info) return;
  var mNames = ['января','февраля','марта','апреля','мая','июня',
                'июля','августа','сентября','октября','ноября','декабря'];
  panel.innerHTML =
    '<div class="ci-date">' + day + ' ' + mNames[month] + ' 2026, 20:00</div>' +
    '<h4>' + info.name + '</h4>' +
    '<div class="ci-price">12 000 ₽</div>' +
    '<div class="ci-seats" style="color:' + info.color + '">Осталось мест: 5</div>' +
    '<a href="payment.html" class="btn btn-filled" style="font-size:0.75vw;padding:0.8vw 1.5vw;display:inline-block;margin-top:1vw">КУПИТЬ БИЛЕТЫ</a>';
  panel.classList.add('visible');
}

function getShowForDay(day, filterKey) {
  if (filterKey === 'all') {
    for (var k in showData) {
      if (showData[k].days.indexOf(day) > -1) return showData[k];
    }
    return null;
  }
  return showData[filterKey] || null;
}

function navigateCal(containerId, year, month, dir, filter, showName) {
  var m = month + dir;
  var y = year;
  if (m > 11) { m = 0; y++; }
  if (m < 0)  { m = 11; y--; }
  buildCalendar(containerId, y, m, filter, showName);
}

function filterCalendarChange(sel, containerId, year, month) {
  buildCalendar(containerId, year, month, sel.value, '');
}

// ============= INIT ON LOAD =============
document.addEventListener('DOMContentLoaded', function () {
  initObserver();
  initFaq();

  // Build calendars if placeholders exist
  if (document.getElementById('cal-june')) {
    buildCalendar('cal-june', 2026, 5, 'all', '');
  }
  if (document.getElementById('cal-july')) {
    buildCalendar('cal-july', 2026, 6, 'all', '');
  }
  if (document.getElementById('cal-pir')) {
    buildCalendar('cal-pir', 2026, 5, 'pir', 'ПИР ДРАКОНА');
  }
  if (document.getElementById('cal-lotus')) {
    buildCalendar('cal-lotus', 2026, 6, 'lotus', 'САД ЛОТОСА');
  }
  if (document.getElementById('cal-fenix')) {
    buildCalendar('cal-fenix', 2026, 6, 'fenix', 'РИТУАЛ ФЕНИКСА');
  }
});

// Re-run observer on scroll (for elements entering view)
document.addEventListener('scroll', initObserver, { passive: true });
