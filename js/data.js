/* ------------------------------------------------------------------
   All the content of the site lives in this one file.
   To update a plugin: change its version/text here and replace its
   cover in img/plugins/. To add a theme: add it below and put its
   cover in img/themes/.
------------------------------------------------------------------- */
window.SITE = {
  name: 'strawberrykitty',
  discord: 'sbkitty',

  // Web3Forms access key for the feedback form
  formKey: 'c07ddaed-f2bf-4d59-b793-2c0a8fefa63f',

  // Leave empty to hide the Ko-fi link. Add e.g. 'https://ko-fi.com/yourname' to show it.
  kofi: 'https://ko-fi.com/sbkitty',

  hubPlugin: 'https://hub.tavoai.dev/plugins/package/',
  hubTheme: 'https://hub.tavoai.dev/themes/',

  plugins: [
    { slug: 'unspoken-thoughts', name: 'Unspoken Thoughts', version: '6.9.4', id: 'com.strawberrykitty.unspoken-thoughts',
      tagline: 'Inner monologue',
      alt: 'Unspoken Thoughts cover: a black cat looking up at empty thought bubbles',
      summary: "Reveal your character's inner monologue. Thoughts appear in a foldable bubble under each message.",
      features: [
        { title: 'Thought profiles', text: 'Give each character and the Narrator their own thought prompt.' },
        { title: 'Reroll and history', text: 'Up to 5 drafts per message, with an optional hint to steer a reroll.' },
        { title: 'Thought log', text: 'Read, search, filter and export every thought in the chat.' },
        { title: 'Colours and layout', text: 'Solid, gradient, neon and custom colours, plus width and font.' }
      ] },
    { slug: 'memory-lorebook', name: 'Memory Lorebook', version: '1.4.1', id: 'com.strawberrykitty.memory-lorebook',
      tagline: 'Moments to memories',
      alt: 'Memory Lorebook cover: a black cat reaching for floating memory orbs above an open book',
      summary: 'Turn important moments in your roleplay into memory entries in a lorebook, so the story remembers what happened.',
      features: [
        { title: 'Gentle prompts', text: 'A small card asks every few messages whether to keep the moment.' },
        { title: 'Clever scan', text: 'Reads the whole chat and suggests the moments worth keeping.' },
        { title: 'Review first', text: 'Edit the title, text and keywords before anything is saved.' },
        { title: 'Chapters', text: 'Merge several memories into one.' }
      ] },
    { slug: 'scenekeeper', name: 'Scenekeeper', version: '2.4.1', id: 'com.cottagecore.seasonal-weather',
      tagline: 'Weather and calendar',
      alt: 'Scenekeeper cover: a cup of tea, a candle and autumn leaves',
      summary: 'A weather and calendar companion for roleplay. A floating scene bar shows the time, weather, season and mood of your story.',
      features: [
        { title: 'Your own calendar', text: 'Custom time scale, months, seasons, moon phases and a story day counter.' },
        { title: 'Story context', text: 'Optionally adds a short block with date, weather and upcoming events to your message.' },
        { title: 'Outfits', text: 'Tracks what everyone is wearing, and lets you lock an outfit.' },
        { title: 'Look', text: 'Four colour sets, custom themes and sliders for opacity and size.' }
      ] },
    { slug: 'little-things', name: 'Little Things', version: '2.1.5', id: 'com.strawberrykitty.little-things',
      tagline: 'Tabs and notes',
      alt: 'Little Things cover',
      summary: 'Tabs, notes and lorebook tools for keeping the small details of a character in one place.',
      features: [
        { title: 'Tabs', text: 'Favourite foods, habits, fears and more in your own coloured tabs.' },
        { title: 'Notes', text: 'Sticky notes with checklists, highlights and colours.' },
        { title: 'Lorebook activity', text: 'See which lorebook entries are active right now, and why.' },
        { title: 'Per chat', text: 'Everything is saved separately for each chat.' }
      ] },
    { slug: 'behind-the-scenes', name: 'Behind the Scenes', version: '2.8.3', id: 'com.example.plot-summary-bubble',
      tagline: 'Hidden blocks',
      alt: 'Behind the Scenes cover',
      summary: 'Pulls a hidden block out of the message and shows it as a collapsible bubble with custom colours, width and font.',
      features: [
        { title: 'Any wrapper tag', text: 'Set one tag and label pair, or point it at an existing regex group.' },
        { title: 'Your look', text: 'Choose the bubble colours, width and font.' },
        { title: 'Always hidden', text: 'The hiding regex applies to both character and user messages.' },
        { title: 'Languages', text: 'Eight interface languages.' }
      ] }
  ],

  // Themes that come in several colours share one card.
  // dot = colour of the little switch, img = file in img/themes/, hub = Tavo Hub theme id
  themeFamilies: [
    { key: 'witch', name: 'Witchlight Letters', note: '10 colours', tags: ['dark'], variants: [
      { n: 'Mosswood',       img: 't-mosswood.jpg',        hub: '6abfb3ccd2bd36b61343ed1c', dot: '#262d1f' },
      { n: 'Nightshade',     img: 't-wl-nightshade.jpg',   hub: '6abfb434d2bd36b61343ed1e', dot: '#3a1830' },
      { n: 'Twilight Veil',  img: 't-wl-twilight-veil.jpg',hub: '6abfb4dcd2bd36b61343ed20', dot: '#3a3560' },
      { n: 'Moonlit Ink',    img: 't-wl-moonlit-ink.jpg',  hub: '6abfb5a7d2bd36b61343ed23', dot: '#1c2030' },
      { n: 'Obsidian Night', img: 't-wl-obsidian-night.jpg',hub: '6abfb632d2bd36b61343ed25', dot: '#1c2a38' },
      { n: 'Starlit Dusk',   img: 't-wl-starlit-dusk.jpg', hub: '6abfb6a2d2bd36b61343ed27', dot: '#2c2838' },
      { n: 'Graphite Veil',  img: 't-wl-graphite-veil.jpg',hub: '6abfb84cd2bd36b61343ed29', dot: '#3a352e' },
      { n: 'Honeysuckle',    img: 't-wl-honeysuckle.jpg',  hub: '6abfb8b5d2bd36b61343ed2b', dot: '#4a4526' },
      { n: 'Bark & Bramble', img: 't-wl-bark-bramble.jpg', hub: '6abfe7c0d2bd36b61343ed3b', dot: '#3a2417' },
      { n: 'Forest Floor',   img: 't-wl-forest-floor.jpg', hub: '6abfe823d2bd36b61343ed3d', dot: '#4a3c28' }
    ] },
    { key: 'snap', name: 'Snap', note: '2 looks', tags: ['dark', 'light'], variants: [
      { n: 'Snap Light', img: 't-snap-light.jpg', hub: '6ad05b1c5868ec9b751a07b5', dot: '#f4f1ea' },
      { n: 'Snap Dark',  img: 't-snap-dark.jpg',  hub: '6ad05ae85868ec9b751a07b3', dot: '#1a1a1f' }
    ] },
    { key: 'thorn', name: 'Thorn and Moth', note: '2 looks', tags: ['dark'], variants: [
      { n: 'Thorn and Moth',         img: 't-thorn-moth.jpg',       hub: '6ac2e982d2bd36b61343ed75', dot: '#4a4a66' },
      { n: 'Thorn and Moth (solid)', img: 't-thorn-moth-solid.jpg', hub: '6ac2eaadd2bd36b61343ed77', dot: '#262626' }
    ] }
  ],

  themeSingles: [
    { name: 'Moonlit Arcana',    note: '',         img: 't-moonlit-arcana.jpg',    hub: '6ad107f45868ec9b751a07c5', tags: ['dark'] },
    { name: 'The Night Ledger',  note: '',         img: 't-night-ledger.jpg',      hub: '6ac17255d2bd36b61343ed53', tags: ['dark'] },
    { name: 'Vintage Fantasy',   note: '',         img: 't-vintage.jpg',           hub: '6ad04f315868ec9b751a07ad', tags: ['dark'] },
    { name: 'Ashleaf Patch',     note: 'Animated', img: 't-ashleaf.jpg',           hub: '6ad8d2065868ec9b751a08c6', tags: ['dark', 'animated'] },
    { name: 'Midnight Downpour', note: 'Animated', img: 't-midnight-downpour.jpg', hub: '6adc0b2c5868ec9b751a097b', tags: ['dark', 'animated'] }
  ],

  // Regex packs: files in downloads/
  regexPacks: [
    { forTheme: 'Witchlight Letters', name: 'Witchlight Letters v1.2', file: 'witchlight-letters-v1.2.zip',
      desc: 'Styles character and user messages in the Witchlight Letters look, with or without numbers. Includes fixes for details boxes and bullet lists.', meta: '8 regexes · 56 KB' },
    { forTheme: 'Witchlight Letters', name: 'Message bubbles', file: 'witchlight-letters-message-bubbles.zip',
      desc: 'A $Message bubble in each of the 10 colours.', meta: '10 regexes · 22 KB' },
    { forTheme: 'Witchlight Letters', name: 'Mail', file: 'witchlight-letters-mail.zip',
      desc: 'An $Email card in each of the 10 colours.', meta: '10 regexes · 18 KB' },
    { forTheme: 'Thorn and Moth', name: 'Message bubbles', file: 'thorn-and-moth-message-bubbles.zip',
      desc: 'Incoming and outgoing $Message bubbles, with or without a time.', meta: '6 regexes · 4 KB' },
    { forTheme: 'Midnight Downpour', name: 'Message bubbles', file: 'midnight-downpour-message-bubbles.zip',
      desc: 'Incoming and outgoing $Message bubbles with a time.', meta: '3 regexes · 2 KB' },
    { forTheme: 'Any theme', name: 'Letters and email', file: 'letters-and-email.zip',
      desc: 'An email card, an inbox row, and two parchment styles with or without a seal.', meta: '4 regexes · 6 KB' },
    { forTheme: 'Any theme', name: 'Skulls v1.2', file: 'skulls-v1.2.zip',
      desc: 'A skull style for character and user messages, in fixed or automatic size.', meta: '9 regexes · 18 KB' },
    { forTheme: 'Any theme', name: 'Petals and Stone v1.2', file: 'petals-and-stone-v1.2.zip',
      desc: 'Three message styles for character and user messages, with fixes for details boxes.', meta: '11 regexes · 18 KB' }
  ]
};
