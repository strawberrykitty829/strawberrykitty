(function () {
  var S = window.SITE;
  var page = document.body.getAttribute('data-page');

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function param(k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } }
  function getTheme() { try { return localStorage.getItem('theme') || 'dark'; } catch (e) { return 'dark'; } }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    var b = $('.mode'); if (b) b.textContent = modeLabel(t);
  }
  function modeLabel(t) { return t === 'dark' ? 'Dark · switch to light' : 'Light · switch to dark'; }
  function discordLink() { return '<a class="inline-link" href="' + esc(S.discordUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(S.discord) + '</a>'; }
  function hubPlugin(p) { return S.hubPlugin + p.id; }

  /* ---------- header / footer ---------- */
  var nav = [
    ['index.html', 'Home', 'home'],
    ['plugins.html', 'Plugins', 'plugins'],
    ['themes.html', 'Themes', 'themes'],
    ['about.html', 'About', 'about'],
    ['feedback.html', 'Feedback', 'feedback']
  ];
  var header = '<header class="site-header"><div class="wrap">' +
    '<a class="logo" href="index.html">' + esc(S.name) + '</a>' +
    '<button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="nav">Menu</button>' +
    '<nav class="nav" id="nav" aria-label="Main">' +
    nav.map(function (n) {
      return '<a class="link' + (n[2] === page ? ' on' : '') + '" href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
    }).join('') +
    '<button class="mode" id="modeBtn" type="button">' + modeLabel(getTheme()) + '</button>' +
    '</nav></div></header>';
  var footer = '<footer class="site-footer"><div class="wrap">' +
    '<div class="foot-left"><span>Found a bug or have an idea? Discord: ' + discordLink() + '</span>' +
    '<a class="btn ghost small" href="feedback.html">Open the feedback form</a></div>' +
    (S.kofi ? '<div class="foot-links"><a class="btn ghost small" href="' + esc(S.kofi) + '" rel="noopener">Buy me a coffee</a></div>' : '') +
    '</div></footer>';
  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
  $('#modeBtn').addEventListener('click', function () { setTheme(getTheme() === 'dark' ? 'light' : 'dark'); });
  $('#menuBtn').addEventListener('click', function () {
    var n = $('#nav'); var open = n.classList.toggle('open');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
    this.textContent = open ? 'Close' : 'Menu';
  });

  /* ---------- shared pieces ---------- */
  function allThemeCards() {
    var fams = S.themeFamilies.map(function (f) { return { fam: f, idx: 0 }; });
    return fams;
  }
  function themeCardHTML(c, i) {
    if (c.fam) {
      var v = c.fam.variants[c.idx];
      return '<div class="card theme-card" data-card="' + i + '">' +
        '<img src="img/themes/' + v.img + '" alt="' + esc(v.n) + ' theme screenshot" loading="lazy">' +
        '<div class="note">' + esc(c.fam.note) + '</div>' +
        '<div class="nm">' + esc(c.fam.name) + '</div>' +
        '<div class="variant">' + esc(v.n) + '</div>' +
        '<div class="dots" role="group" aria-label="Colours">' +
        c.fam.variants.map(function (d, j) {
          return '<button class="dot' + (j === c.idx ? ' on' : '') + '" type="button" data-dot="' + j + '" aria-label="' + esc(d.n) + '" aria-pressed="' + (j === c.idx) + '"><span style="background:' + d.dot + '"></span></button>';
        }).join('') + '</div>' +
        '<a class="btn ghost small" style="align-self:flex-start" href="' + S.hubTheme + v.hub + '" rel="noopener">Get on Tavo Hub</a></div>';
    }
    var s = c.single;
    return '<div class="card theme-card">' +
      '<img src="img/themes/' + s.img + '" alt="' + esc(s.name) + ' theme screenshot" loading="lazy">' +
      '<div class="note">' + esc(s.note) + '</div>' +
      '<div class="nm">' + esc(s.name) + '</div>' +
      '<div class="variant"></div><div class="dots"></div>' +
      '<a class="btn ghost small" style="align-self:flex-start" href="' + S.hubTheme + s.hub + '" rel="noopener">Get on Tavo Hub</a></div>';
  }
  function buildCards() {
    return S.themeFamilies.map(function (f) { return { fam: f, idx: 0, tags: f.tags }; })
      .concat(S.themeSingles.map(function (s) { return { single: s, tags: s.tags }; }));
  }
  function themeTotal() {
    var n = S.themeSingles.length;
    S.themeFamilies.forEach(function (f) { n += f.variants.length; });
    return n;
  }
  function mountThemeGrid(container, cards, filter) {
    function render() {
      var list = cards.filter(function (c) { return filter === 'all' || c.tags.indexOf(filter) >= 0; });
      container.innerHTML = list.map(function (c) { return themeCardHTML(c, cards.indexOf(c)); }).join('');
    }
    container.addEventListener('click', function (e) {
      var b = e.target.closest('[data-dot]'); if (!b) return;
      var card = b.closest('[data-card]'); var c = cards[+card.getAttribute('data-card')];
      c.idx = +b.getAttribute('data-dot');
      var tmp = document.createElement('div'); tmp.innerHTML = themeCardHTML(c, +card.getAttribute('data-card'));
      card.replaceWith(tmp.firstChild);
    });
    return { set: function (f) { filter = f; render(); }, render: render };
  }
  function filterBar(el, onPick) {
    var opts = [['all', 'All ' + themeTotal()], ['dark', 'Dark'], ['light', 'Light'], ['animated', 'Animated']];
    el.innerHTML = opts.map(function (o, i) { return '<button class="pill' + (i === 0 ? ' on' : '') + '" type="button" data-f="' + o[0] + '">' + o[1] + '</button>'; }).join('');
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-f]'); if (!b) return;
      $all('.pill', el).forEach(function (x) { x.classList.toggle('on', x === b); });
      onPick(b.getAttribute('data-f'));
    });
  }

  /* ---------- pages ---------- */
  var app = $('#app');

  if (page === 'home') {
    var P = S.plugins;
    app.innerHTML =
      '<div class="wrap">' +
      '<section class="hero"><div class="hero-text">' +
      '<div class="eyebrow">By ' + esc(S.name) + '</div>' +
      '<h1>Plugins and themes for Tavo</h1>' +
      '<p class="lead">Everything I\'ve made for Tavo, in one place. Pick a plugin or theme to read more, then find it on Tavo Hub.</p>' +
      '<div class="row"><a class="btn" href="plugins.html">Browse plugins</a><a class="btn ghost" href="themes.html">Browse themes</a></div></div>' +
      '<div class="hero-covers">' + P.slice(0, 3).map(function (p) { return '<img src="img/plugins/' + p.slug + '.jpg" alt="' + esc(p.name) + ' cover">'; }).join('') + '</div></section>' +
      '<section class="section"><div class="section-head"><h2>Plugins</h2><a class="more" href="plugins.html">See all ' + P.length + ' &rarr;</a></div>' +
      '<div class="plugin-grid">' + P.map(function (p) {
        return '<a class="card plugin-tile" href="plugins.html?p=' + p.slug + '"><img src="img/plugins/' + p.slug + '.jpg" alt="' + esc(p.alt) + '" loading="lazy">' +
          '<div><div class="nm">' + esc(p.name) + '</div><div class="tg">' + esc(p.tagline) + '</div><div class="sm">' + esc(p.summary) + '</div></div></a>';
      }).join('') + '</div></section>' +
      '<section class="section"><div class="section-head"><h2>Themes</h2><div class="filters" id="filters"></div></div>' +
      '<div class="theme-grid" id="grid"></div>' +
      '<p style="margin-top:18px"><a class="btn ghost" href="themes.html">See all themes and regex packs</a></p></section></div>';
    var cards = buildCards();
    // Home shows a handful: the 4 singles first, then families
    var homeCards = [cards[3], cards[4], cards[5], cards[6]].filter(Boolean).concat(cards.slice(0, 3));
    var g = mountThemeGrid($('#grid'), cards, 'all');
    var current = 'all';
    function homeRender() {
      var list = current === 'all' ? homeCards.slice(0, 4) : cards.filter(function (c) { return c.tags.indexOf(current) >= 0; }).slice(0, 4);
      $('#grid').innerHTML = list.map(function (c) { return themeCardHTML(c, cards.indexOf(c)); }).join('');
    }
    filterBar($('#filters'), function (f) { current = f; homeRender(); });
    homeRender();
  }

  if (page === 'plugins') {
    var P2 = S.plugins;
    var start = Math.floor(Math.random() * P2.length);
    var q = param('p');
    P2.forEach(function (p, i) { if (p.slug === q) start = i; });
    var sel = start;
    function detail(p) {
      return '<div class="plug-top"><img src="img/plugins/' + p.slug + '.jpg" alt="' + esc(p.alt) + '">' +
        '<div class="plug-info"><div class="ver">Version ' + esc(p.version) + ' · by ' + esc(S.name) + '</div>' +
        '<h1>' + esc(p.name) + '</h1><p>' + esc(p.summary) + '</p>' +
        '<div class="row" style="margin-top:6px"><a class="btn" href="' + hubPlugin(p) + '" rel="noopener">Get it on Tavo Hub</a>' +
        '<a class="btn ghost" href="feedback.html?item=' + p.slug + '">Report a bug</a></div></div></div>' +
        '<div class="features">' + p.features.map(function (f) {
          return '<div class="card feature"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p></div>';
        }).join('') + '</div>';
    }
    app.innerHTML = '<div class="wrap">' +
      '<div class="plug-layout"><div class="plug-list"><h2>Plugins</h2>' +
      P2.map(function (p, i) { return '<button class="plug-btn" type="button" data-i="' + i + '"><img src="img/plugins/' + p.slug + '.jpg" alt=""><span>' + esc(p.name) + '</span></button>'; }).join('') +
      '</div><div class="plug-detail" id="detail"></div></div>' +
      '<div class="plug-acc"><h1 style="margin-bottom:6px">Plugins</h1>' +
      P2.map(function (p, i) {
        return '<div class="card acc-item" data-a="' + i + '"><button class="acc-head" type="button" aria-expanded="false"><img src="img/plugins/' + p.slug + '.jpg" alt=""><span><div class="nm">' + esc(p.name) + '</div><div class="sm">' + esc(p.summary) + '</div></span></button>' +
          '<div class="acc-body"><img class="big" src="img/plugins/' + p.slug + '.jpg" alt="' + esc(p.alt) + '" loading="lazy">' +
          '<div class="ver">Version ' + esc(p.version) + ' · by ' + esc(S.name) + '</div><p>' + esc(p.summary) + '</p>' +
          '<div class="row"><a class="btn" href="' + hubPlugin(p) + '" rel="noopener">Get it on Tavo Hub</a><a class="btn ghost" href="feedback.html?item=' + p.slug + '">Report a bug</a></div>' +
          '<div class="features">' + p.features.map(function (f) { return '<div class="card feature"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p></div>'; }).join('') + '</div></div></div>';
      }).join('') + '</div></div>';
    function show(i) {
      sel = i;
      $('#detail').innerHTML = detail(P2[i]);
      $all('.plug-btn').forEach(function (b, j) { b.classList.toggle('on', j === i); });
    }
    $all('.plug-btn').forEach(function (b) { b.addEventListener('click', function () { show(+b.getAttribute('data-i')); }); });
    $all('.acc-head').forEach(function (b) {
      b.addEventListener('click', function () {
        var it = b.closest('.acc-item'); var open = it.classList.toggle('open');
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    show(start);
    if (q) { var it0 = $('[data-a="' + start + '"]'); if (it0) { it0.classList.add('open'); $('.acc-head', it0).setAttribute('aria-expanded', 'true'); } }
  }

  if (page === 'themes') {
    app.innerHTML = '<div class="wrap"><div class="page-title"><h1>Themes</h1>' +
      '<div class="tabs" role="tablist"><button class="tab on" type="button" role="tab" data-t="themes" aria-selected="true">Themes</button>' +
      '<button class="tab" type="button" role="tab" data-t="regex" aria-selected="false">Regex</button></div></div>' +
      '<div id="tab-themes" class="stack"><div class="filters" id="filters"></div><div class="theme-grid" id="grid"></div></div>' +
      '<div id="tab-regex" class="stack" hidden><p class="lead" style="color:var(--muted);font-size:16px">Regex packs to import in Tavo. Each one is a .zip file.</p>' +
      '<div class="pack-grid">' + S.regexPacks.map(function (r) {
        return '<div class="card pack"><div class="eyebrow" style="font-size:11px;letter-spacing:.08em">' + esc(r.forTheme) + '</div><div class="nm">' + esc(r.name) + '</div>' +
          '<div class="ds">' + esc(r.desc) + '</div><div class="ft"><span class="mt">' + esc(r.meta) + '</span>' +
          '<a class="btn small" href="downloads/' + r.file + '" download>Download .zip</a></div></div>';
      }).join('') + '</div></div></div>';
    var tc = buildCards();
    var grid = mountThemeGrid($('#grid'), tc, 'all'); grid.render();
    filterBar($('#filters'), function (f) { grid.set(f); });
    function tab(t) {
      $all('.tab').forEach(function (b) { var on = b.getAttribute('data-t') === t; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      $('#tab-themes').hidden = t !== 'themes'; $('#tab-regex').hidden = t !== 'regex';
    }
    $all('.tab').forEach(function (b) { b.addEventListener('click', function () { var t = b.getAttribute('data-t'); tab(t); try { history.replaceState(null, '', t === 'regex' ? '#regex' : location.pathname); } catch (e) {} }); });
    if (location.hash === '#regex') tab('regex');
  }

  if (page === 'about') {
    app.innerHTML = '<div class="wrap"><img class="about-img" src="img/about-banner.jpg" alt="A black cat sitting in a moonlit garden, looking up at a crescent moon">' +
      '<div class="about-text"><h1>About</h1>' +
      '<p>Hello, I\'m ' + esc(S.name) + '. These are my plugins and themes for Tavo, each with a link to Tavo Hub. I make things I find useful or fun, and I like to get creative with them.</p>' +
      '<p>Feedback or bugs? Use the feedback form or find me on Discord: ' + discordLink() + '.</p>' +
      '<a class="btn" style="align-self:flex-start;margin-top:4px" href="feedback.html">Open the feedback form</a></div></div>';
  }

  if (page === 'feedback') {
    var kinds = ['Bug', 'Idea', 'Just saying hi'];
    var kind = 'Bug';
    var pre = param('item');
    var opts = '<optgroup label="Plugins">' + S.plugins.map(function (p) { return '<option value="' + esc(p.name) + '"' + (p.slug === pre ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('') + '</optgroup>' +
      '<optgroup label="Themes">' + S.themeFamilies.map(function (f) { return '<option>' + esc(f.name) + '</option>'; }).concat(S.themeSingles.map(function (s) { return '<option>' + esc(s.name) + '</option>'; })).join('') + '</optgroup>' +
      '<optgroup label="Other"><option>A regex pack</option><option>This website</option><option>Something else</option></optgroup>';
    app.innerHTML = '<div class="wrap"><div class="fb-layout"><div class="fb-side"><h1>Feedback and bugs</h1>' +
      '<p class="lead">Found a bug, or have an idea? Write to me here. It lands straight in my inbox.</p>' +
      '<div class="card fb-note">Prefer Discord? I\'m ' + discordLink() + '.<br>Helpful to include: your Tavo version, the plugin version, and what you were doing when it happened.</div></div>' +
      '<form class="card fb-form" id="fb" novalidate>' +
      '<div class="row" role="group" aria-label="Type of message" style="gap:8px">' + kinds.map(function (k, i) { return '<button type="button" class="pill' + (i === 0 ? ' on' : '') + '" data-k="' + k + '" aria-pressed="' + (i === 0) + '">' + k + '</button>'; }).join('') + '</div>' +
      '<div><label for="which">Which plugin or theme?</label><select id="which" name="which">' + opts + '</select></div>' +
      '<div><label for="ver">Plugin or theme version</label><input id="ver" name="version" type="text" placeholder="For example 1.4.1" autocomplete="off"></div>' +
      '<div><label for="msg">What happened? What did you expect?</label><textarea id="msg" name="message" rows="5" required placeholder="Describe it in your own words"></textarea></div>' +
      '<div><label for="contact">Want me to get back to you? (optional)</label><input id="contact" name="contact" type="text" placeholder="Your Discord or email" autocomplete="off"><div class="hint">Only used if I have questions about your bug or feedback.</div></div>' +
      '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="status" id="status" role="status" aria-live="polite"></div>' +
      '<button class="btn" id="send" type="submit" style="align-self:flex-start;padding:0 28px">Send</button></form></div></div>';
    var form = $('#fb'), status = $('#status');
    form.addEventListener('click', function (e) {
      var b = e.target.closest('[data-k]'); if (!b) return;
      kind = b.getAttribute('data-k');
      $all('[data-k]', form).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('#msg').value.trim();
      status.className = 'status';
      if (!msg) { status.textContent = 'Please write a short message first.'; status.className = 'status err'; $('#msg').focus(); return; }
      var btn = $('#send'); btn.disabled = true; btn.textContent = 'Sending…';
      var body = {
        access_key: S.formKey,
        subject: kind + ': ' + $('#which').value,
        from_name: S.name + ' site',
        type: kind,
        which: $('#which').value,
        version: $('#ver').value.trim() || '(not given)',
        message: msg,
        contact: $('#contact').value.trim() || '(not given)',
        botcheck: form.botcheck.checked ? 'yes' : ''
      };
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body)
      }).then(function (r) { return r.json(); }).then(function (j) {
        if (j && j.success) {
          status.textContent = 'Thank you, it was sent. I read everything.'; status.className = 'status ok';
          form.reset(); btn.textContent = 'Send'; btn.disabled = false;
        } else { throw new Error((j && j.message) || 'failed'); }
      }).catch(function () {
        status.textContent = 'Sorry, that did not go through. Please try again, or find me on Discord: ' + S.discord + '.';
        status.className = 'status err'; btn.textContent = 'Send'; btn.disabled = false;
      });
    });
  }
})();
