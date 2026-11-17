(function () {
  'use strict';

  var PHOTOS = ['img/paslon1.jpg', 'img/paslon2.jpg', 'img/paslon3.jpg'];
  var EASE_OUT = 'cubic-bezier(.2,.8,.2,1)';

  var candidates = [
    { id: 1, label: 'Paslon 1', name: 'Arika dan Diwa', votes: 0, tag: 64, btn: 32 },
    { id: 2, label: 'Paslon 2', name: 'Aufa dan Ivy', votes: 0, tag: 66, btn: 32 },
    { id: 3, label: 'Paslon 3', name: 'Ana dan Reynard', votes: 0, tag: 68, btn: 31 }
  ];

  var profiles = [
    {
      visi: 'Menjadikan Ekstrakurikuler Broadcasting sebagai wadah yang kreatif, terampil, dan profesional dalam bidang produksi media untuk mendukung kegiatan sekolah serta menciptakan konten yang bermanfaat dan berkesan bagi seluruh warga sekolah.',
      misi: [
        { k: 'B', t: 'Berintegritas dan Berdedikasi', d: 'Seluruh anggota Broadcasting menjalankan tugas dengan menjunjung tinggi kedisiplinan dan, yang paling penting, mempunyai rasa tanggung jawab.' },
        { k: 'A', t: 'Aktif dalam meliput serta mendokumentasikan kegiatan', d: 'Broadcasting berperan aktif dalam meliput dan mendokumentasikan setiap kegiatan seperti upacara hari besar, kegiatan seminar, dan banyak lagi kegiatan lainnya.' },
        { k: 'I', t: 'Inovatif dalam mengemas program konten digital', d: 'Menciptakan konten-konten digital yang menarik, edukatif, dan relevan dengan perkembangan zaman.' },
        { k: 'K', t: 'Kolaborasi dengan ekstrakurikuler lainnya', d: 'Membangun hubungan kerja sama yang harmonis dengan seluruh ekstrakurikuler lainnya melalui kolaborasi yang menguntungkan semua pihak.' }
      ],
      proker: [
        'Menjalankan Podcast yang menambah wawasan antara sesama warga sekolah (seperti Podcast Ramadhan dan Podcast PKL Stories).',
        'Mengembangkan Web VHS10tv dengan membagikan artikel prestasi-prestasi yang diraih oleh siswa/siswi SMK Negeri 10 Semarang.',
        'Membuat konten digital (setiap 1 minggu 2 konten) yang pastinya dapat mengedukasi para penonton dan juga mengikuti perkembangan zaman yang ada.',
        'Mengadakan kegiatan <b>&ldquo;Kelas Media&rdquo;</b> untuk seluruh anggota Broadcasting agar dapat mengembangkan keterampilan (menulis naskah, editing video, dokumentasi yang baik, interaksi atau public speaking, dan aktualisasi karya).'
      ]
    },
    {
      visi: 'Menjadi wadah pengembangan karakter yang membentuk siswa menjadi pribadi yang berani tampil, berpikir kritis, dan terampil berkomunikasi sebagai calon pemimpin masa depan.',
      misi: [
        { k: '1', d: 'Setiap divisi mempunyai dua penanggung jawab yaitu dari kelas 10 dan 11. Agar mereka dapat merasakan pertanggungjawaban antara mereka berdua (kelas 10, 11)' }
      ],
      proker: [
        'Membuat podcast di hari spesial, dengan membahas tentang hari spesial tersebut, bisa juga menanyai tentang opini mereka tentang hari spesial tersebut, bisa dengan anggota OSIS ataupun PPL/guru.'
      ]
    },
    {
      visi: 'Menjadikan Broadcasting sebagai ruang yang kreatif, inovatif dan mengubah setiap informasi yang ada menjadi inspirasi, motivasi dan setiap karya menjadikan sebuah identitas sekolah (ciri khas) yang membuat Broadcasting lebih terkenal dan maju.',
      misi: [
        { k: '1', d: 'Pemerataan kemampuan seluruh anggota melalui rotasi tugas dan proyek kolaborasi, sehingga anggota tidak hanya bergantung pada satu orang yang paling menguasai bidangnya (tidak berlaku jika ada event penting dan besar.)' },
        { k: '2', d: 'Memberikan piket berkala agar bisa membuat ruang broadcasting lebih bersih dan terlihat rapi.' },
        { k: '3', d: 'Mengurangi penggunaan AI dalam pengerjaan tugas yang dapat mempergunakan AI, boleh jika hanya sebagai referensi bahan editing atau desain dalam divisi bersangkutan (secara tidak berlebihan).' }
      ],
      proker: [
        'Membuat sistem podcast sekali satu bulan pada aplikasi Spotify. Membahas tentang berbagai isu yang sedang trend atau keluh kesah pada divisi masing-masing.',
        'Melakukan evaluasi secara bertahap 3 kali dalam sebulan untuk anggota Broadcasting yang kurang aktif, apalagi menolak bertugas di job yang sudah dipilihnya.',
        'Mengadakan event satu tahun sekali di ekstrakurikuler Broadcasting berupa kompetisi masing-masing divisi dengan tema yang berbeda untuk melatih kreativitas dan kemampuan setiap divisi.'
      ]
    }
  ];

  var state = 1;
  var setupCount = 20;
  var maxVotes = 0;
  var currentVotes = 0;
  var currentPage = 'home';
  var navigating = false;
  var vmIndex = 0;
  var vmBusy = false;
  var touchX = null;

  var $ = function (id) { return document.getElementById(id); };
  var toArray = function (list) { return Array.prototype.slice.call(list); };

  var cardsEl = $('cards');
  var numEl = $('num');
  var counterEl = $('counter');
  var stepper = $('stepper');
  var mainBtn = $('mainBtn');
  var minusBtn = $('minus');
  var plusBtn = $('plus');
  var titleEl = $('boxTitle');
  var vmSlide = $('vmSlide');
  var vmCard = $('vmCard');
  var vmVisi = $('vmVisi');
  var vmMisi = $('vmMisi');
  var vmProker = $('vmProker');
  var vmDots = $('vmDots');
  var stage = $('stage');
  var bgTL = $('bgTL');
  var bgTR = $('bgTR');

  var pageEls = {
    home: document.querySelector('.page-home'),
    about: document.querySelector('.page-about'),
    visimisi: document.querySelector('.page-vm')
  };
  var pageOrder = ['home', 'about', 'visimisi'];
  var navLinks = toArray(document.querySelectorAll('[data-nav]'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobileQuery = window.matchMedia('(max-width: 820px), (max-aspect-ratio: 11/10)');
  var segL = toArray(document.querySelectorAll('.seg-l'));
  var segM = toArray(document.querySelectorAll('.seg-m'));
  var segR = toArray(document.querySelectorAll('.seg-r'));

  candidates.forEach(function (c, i) {
    var card = document.createElement('article');
    card.className = 'abs card c' + c.id;
    card.setAttribute('data-stagger', '');
    card.innerHTML =
      '<span class="tag" style="left:' + c.tag + 'px">' + c.label + '</span>' +
      '<div class="photo"><img src="' + PHOTOS[i] + '" alt="' + c.name + '">' +
      '<div class="result" aria-hidden="true"><span class="n" id="n' + c.id + '">0</span><span class="s">Suara</span></div></div>' +
      '<p class="name">' + c.name + '</p>' +
      '<div class="vote" style="left:' + c.btn + 'px" data-id="' + c.id + '" aria-label="Tekan tombol ' + c.id + ' di keyboard untuk memilih ' + c.name + '">' + c.id + '</div>';
    cardsEl.appendChild(card);
  });
  var voteBtns = toArray(cardsEl.querySelectorAll('.vote'));

  function render() {
    var setup = state === 1;
    document.body.classList.remove('state-1', 'state-2', 'state-3');
    document.body.classList.add('state-' + state);

    stepper.hidden = !setup;
    counterEl.hidden = setup;
    titleEl.innerHTML = setup ? 'Masukan Jumlah<br>Peserta Voting' : 'Ayo Pilih Kandidat<br>Kepercayaanmu!';
    numEl.textContent = setupCount;
    minusBtn.disabled = setupCount <= 1;
    counterEl.textContent = currentVotes + '/' + maxVotes;

    mainBtn.textContent = state === 1 ? 'Mulai' : state === 2 ? 'selesai' : 'Mulai Ulang';
    mainBtn.disabled = state === 2 && currentVotes !== maxVotes;

    var canVote = state === 2 && currentVotes < maxVotes;
    voteBtns.forEach(function (b) { b.classList.toggle('off', !canVote); });
    candidates.forEach(function (c) { $('n' + c.id).textContent = c.votes; });
  }

  function resetVotes() {
    currentVotes = 0;
    candidates.forEach(function (c) { c.votes = 0; });
  }

  function vote(id) {
    if (state !== 2 || currentVotes >= maxVotes) return;
    candidates[id - 1].votes++;
    currentVotes++;
    render();
  }

  minusBtn.addEventListener('click', function () {
    if (setupCount > 1) { setupCount--; render(); }
  });

  plusBtn.addEventListener('click', function () {
    setupCount++;
    render();
  });

  mainBtn.addEventListener('click', function () {
    if (state === 1) {
      maxVotes = Math.max(1, setupCount);
      resetVotes();
      state = 2;
    } else if (state === 2 && currentVotes === maxVotes) {
      state = 3;
    } else if (state === 3) {
      resetVotes();
      maxVotes = 0;
      state = 1;
    }
    render();
  });

  document.addEventListener('keydown', function (e) {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    if (currentPage === 'home') {
      var id = { '1': 1, '2': 2, '3': 3 }[e.key];
      if (id) vote(id);
    } else if (currentPage === 'visimisi') {
      if (e.key === 'ArrowRight') showProfile(vmIndex + 1, 1);
      else if (e.key === 'ArrowLeft') showProfile(vmIndex - 1, -1);
    }
  });

  function setActiveNav(name) {
    navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === name); });
  }

  function goTo(name) {
    if (navigating || name === currentPage || !pageEls[name]) return;
    var from = pageEls[currentPage];
    var to = pageEls[name];
    var dir = pageOrder.indexOf(name) > pageOrder.indexOf(currentPage) ? 1 : -1;
    currentPage = name;
    setActiveNav(name);
    window.scrollTo(0, 0);

    if (reduceMotion.matches || !from.animate) {
      from.classList.remove('active');
      to.classList.add('active');
      return;
    }

    navigating = true;
    from.classList.add('leaving');
    from.classList.remove('active');
    to.classList.add('active');

    var outAnim = from.animate(
      [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(' + (-dir * 140) + 'px)' }],
      { duration: 380, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
    var inAnim = to.animate(
      [{ opacity: 0, transform: 'translateX(' + (dir * 140) + 'px)' }, { opacity: 1, transform: 'translateX(0)' }],
      { duration: 560, delay: 200, easing: EASE_OUT, fill: 'backwards' });

    toArray(to.querySelectorAll('[data-stagger]')).forEach(function (el, i) {
      el.animate(
        [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 520, delay: 380 + i * 90, easing: EASE_OUT, fill: 'backwards' });
    });

    outAnim.onfinish = function () {
      from.classList.remove('leaving');
      outAnim.cancel();
    };
    inAnim.onfinish = function () { navigating = false; };
  }

  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      goTo(a.getAttribute('data-nav'));
    });
  });

  function prokerHTML(items) {
    return items.map(function (t) { return '<li><div>' + t + '</div></li>'; }).join('');
  }

  function misiHTML(items) {
    return items.map(function (m) {
      return '<li><span class="bd">' + m.k + '</span><div>' + (m.t ? '<h4>' + m.t + '</h4>' : '') + '<p>' + m.d + '</p></div></li>';
    }).join('');
  }

  function fillProfile(i) {
    var c = candidates[i];
    var p = profiles[i];
    vmIndex = i;
    vmCard.innerHTML =
      '<span class="tag" style="left:' + c.tag + 'px">' + c.label + '</span>' +
      '<div class="photo"><img src="' + PHOTOS[i] + '" alt="' + c.name + '"></div>' +
      '<p class="name">' + c.name + '</p>' +
      '<div class="vote" style="left:' + c.btn + 'px">' + c.id + '</div>';
    vmVisi.textContent = p.visi;
    vmMisi.innerHTML = misiHTML(p.misi);
    vmProker.innerHTML = prokerHTML(p.proker);
    toArray(vmDots.children).forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }

  function showProfile(i, dir) {
    i = (i + profiles.length) % profiles.length;
    if (vmBusy || i === vmIndex) return;
    if (reduceMotion.matches || !vmSlide.animate) {
      fillProfile(i);
      return;
    }
    vmBusy = true;
    var out = vmSlide.animate(
      [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(' + (-dir * 90) + 'px)' }],
      { duration: 220, easing: 'ease-in', fill: 'forwards' });
    out.onfinish = function () {
      fillProfile(i);
      out.cancel();
      var inn = vmSlide.animate(
        [{ opacity: 0, transform: 'translateX(' + (dir * 90) + 'px)' }, { opacity: 1, transform: 'translateX(0)' }],
        { duration: 380, easing: EASE_OUT });
      inn.onfinish = function () { vmBusy = false; };
    };
  }

  candidates.forEach(function (c, i) {
    var d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', 'Lihat ' + c.label);
    d.addEventListener('click', function () { showProfile(i, i > vmIndex ? 1 : -1); });
    vmDots.appendChild(d);
  });

  toArray(document.querySelectorAll('.vm-prev')).forEach(function (b) {
    b.addEventListener('click', function () { showProfile(vmIndex - 1, -1); });
  });

  toArray(document.querySelectorAll('.vm-next')).forEach(function (b) {
    b.addEventListener('click', function () { showProfile(vmIndex + 1, 1); });
  });

  pageEls.visimisi.addEventListener('touchstart', function (e) {
    touchX = e.touches[0].clientX;
  }, { passive: true });

  pageEls.visimisi.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60) showProfile(vmIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });

  function setAll(list, value) {
    list.forEach(function (el) { el.setAttribute('transform', value); });
  }

  function layoutBg(ex, ey) {
    var sx = (200 + ex) / 200;
    bgTL.setAttribute('transform', 'translate(' + (-ex / 2) + ' ' + (-ey / 2) + ')');
    bgTR.setAttribute('transform', 'translate(' + (ex / 2) + ' ' + (-ey / 2) + ')');
    setAll(segL, 'translate(' + (-ex / 2) + ' ' + (ey / 2) + ')');
    setAll(segR, 'translate(' + (ex / 2) + ' ' + (ey / 2) + ')');
    setAll(segM, 'translate(' + (700 - ex / 2) + ' ' + (ey / 2) + ') scale(' + sx + ' 1) translate(-700 0)');
  }

  function fit() {
    if (mobileQuery.matches) {
      stage.style.transform = '';
      stage.style.left = '';
      stage.style.top = '';
      layoutBg(0, 0);
      return;
    }
    var s = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    stage.style.transform = 'scale(' + s + ')';
    stage.style.left = ((window.innerWidth - 1600 * s) / 2) + 'px';
    stage.style.top = ((window.innerHeight - 900 * s) / 2) + 'px';
    layoutBg(window.innerWidth / s - 1600, window.innerHeight / s - 900);
  }

  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);

  fillProfile(0);
  fit();
  render();
})();
