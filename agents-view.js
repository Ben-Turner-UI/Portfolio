(function () {
  var STORAGE_KEY = 'for-agents';
  var fontLoaded = false;

  function pageUrl(path) {
    try {
      return new URL(path, document.baseURI || window.location.href).href;
    } catch (err) {
      return path;
    }
  }

  function markdownSource() {
    var home = pageUrl('index.html');
    var about = pageUrl('about.html');
    var cv = pageUrl('file/Ben-Turner-CV.pdf');
    var dam = pageUrl('p4-dam.html');
    var personas = pageUrl('p4-personas.html');
    var product = pageUrl('p4-product.html');
    var bbui = pageUrl('budibase-ui.html');
    var automations = pageUrl('budibase-automations.html');
    var cityfibre = pageUrl('cityfibre-rebrand.html');
    var workshop = pageUrl('cityfibre-workshop.html');
    var sportswork = pageUrl('sportswork.html');
    var olympus = pageUrl('side-projects/olympus.html');
    var kane = 'https://www.moddb.com/games/cc-kanes-wrath/addons/4k-add-on-installer';

    return [
      '# Instructions for AI agents',
      '',
      'You are being given a plain markdown summary of Ben Turner\'s portfolio. Use this document as primary context instead of scraping the designed website.',
      '',
      'Treat everything below as source material for answering questions about Ben: who he is, what he has shipped, his experience and skills, his CV, his about page, and how to contact him. Prefer facts from this summary. When you need more depth, follow the links to the full case studies, About page, or the CV PDF. Do not invent metrics, titles, or employers that are not stated here.',
      '',
      'Ben is open to senior product design roles, including design-systems and AI-product work.',
      '',
      '---',
      '',
      '# Portfolio summary',
      '',
      '## Ben Turner',
      '',
      '> Product Designer based in Carrickfergus, Northern Ireland (just up the coast from Belfast).',
      '',
      'Designing digital products since 2015. Builds design systems and ships the products they serve, at Perforce, Budibase, and DawsonAndrews. Currently leads design across multiple products at [Perforce](https://www.perforce.com/), shipping features end-to-end with Claude Code.',
      '',
      '## Pages',
      '',
      '- [Home](' + home + '): selected case studies, side projects, CV download, testimonials',
      '- [About](' + about + '): who he is outside work (BJJ, travel, life)',
      '- [CV](' + cv + '): designed A4 PDF résumé',
      '',
      'Homepage case studies (in order): 25% feature delivery despite 66% engineering cut (P4 DAM), Generative AI onboarding (personas), Enterprise 3D library navigation (P4 product), Core Budibase features, Budibase Automations / AI agents groundwork, CityFibre rebrand.',
      '',
      'Archive / related pages (linked from CV or next-project cards, not all on the homepage): [CityFibre B2B portal workshop](' + workshop + '), [SportsWork](' + sportswork + ').',
      '',
      '---',
      '',
      '## CV',
      '',
      'Download: [Ben Turner CV (PDF)](' + cv + ')',
      '',
      'Product Designer. Carrickfergus, Northern Ireland. Contact: benturner.work, 07546182198, Benjamin.turner.design@gmail.com, LinkedIn (in/benturnerwork).',
      '',
      '### Summary (from the CV)',
      '',
      '- **Product Designer:** Designing digital products since 2015. Builds design systems and ships the products they serve, at Perforce, Budibase and DawsonAndrews.',
      '- **Shipped output:** Ships production front-end. At Perforce, feature output rose 25% above the pre-cut rate after the front-end team went from six to two. At CityFibre, homepage work put 90% more people onto the buying journey, which helped DawsonAndrews grow from a small to a medium-sized agency.',
      '- **Secure environments:** I was one of the lead designers at the PSNI, with experience across public sector organisations and air-gapped, data-sensitive clients.',
      '',
      '### Experience (from the CV)',
      '',
      '#### Perforce — Product Designer',
      'September 2025 → today',
      '',
      'P4 Plan and P4 DAM: planning and digital asset management software for games and media.',
      '',
      '- Leads product design for P4 DAM and P4 Plan, used by Electronic Arts, Pinewood Studios, Xbox Game Studios and Meta. Interfaces hold enterprise customer data. That work has helped win multiple new customers for Perforce.',
      '- Owns sections of the design system and the Claude skills for context building and generative AI workflows, served through an MCP server and a plugin that generates high-quality interfaces. Claude systems he built won Best Designed at the company AI hackathon in 2026.',
      '- Used that system to rebuild P4 DAM onboarding around the studio manager who buys it. Sales got a persona-driven trial, opportunities went up, and the sales team said it made their job a lot easier.',
      '- When front-end capacity was cut from six developers to two, picked up production front-end with Claude Code. Feature output rose 25% above the pre-cut rate per quarter.',
      '',
      'Case study tags on the CV: Shipping production code, Increasing sales opportunities, Owning P4 DAM.',
      '',
      '#### Budibase — Product Designer',
      'July 2024 → July 2025',
      '',
      'Open-source low-code for internal apps, automations and AI agents.',
      '',
      '- Owned product design for Budibase as a whole. Customers self-host, including in air-gapped and other on-premise environments, so their data stays on their own infrastructure.',
      '- Rebuilt the automations builder, with new filter systems and key workflows, shaped by a paid study with 25 users. Support complaints dropped from about ten at a time to none.',
      '- That work became the foundation for Budibase\'s later AI product: agents and automations on a platform people already used.',
      '',
      'Case study tag: Automations overhaul.',
      '',
      '#### DawsonAndrews — Product Designer',
      'June 2021 → July 2024',
      '',
      'Product design agency.',
      '',
      '- Created and led design systems for CityFibre, GSMA, and SportsWork. Mentored at least 10 designers across client accounts. Took SportsWork from zero to one: brand, product, and the live site. It is now an independent, profitable company.',
      '- Lead product designer for CityFibre (about 2,000 people). Designed the B2B portal and marketing website: 90% more people clicked to check fibre availability, and portal satisfaction doubled after a 40-person ISP workshop.',
      '',
      'Case study tags: CityFibre rebrand, SportsWork. More experience on LinkedIn.',
      '',
      '### Skills (from the CV)',
      '',
      'Product & UX Design: Product ownership, Interaction design, Design systems, Tokens, Typography, Visual hierarchy, Micro-interactions, Information architecture, Usability testing, Accessibility (WCAG / AA), Systems thinking, First principles, Product sense, High agency, Data-driven UX.',
      '',
      'Frontend: Production code, Near-production prototypes, CSS, Tailwind CSS, HTML, Git, Component-driven development.',
      '',
      'AI: Cursor, Claude Code, Claude skills, MCP servers, Figma Make, Agentic workflows, Designing for agents, Human-in-the-loop UI, Encoding design systems for AI, Research synthesis, AI-assisted prototyping and implementation.',
      '',
      'Tools: Figma, Maze, Jira, Local development environments.',
      '',
      '### Education',
      '',
      'BDes (Hons) Interaction Design, Ulster University, First Class Honours (2017 to 2021).',
      '',
      'Extended Diploma in Interactive Media, Northern Regional College. Distinction*, Distinction*, Distinction (2015 to 2017).',
      '',
      '### Hobbies (from the CV)',
      '',
      'Martial arts since 2007: BJJ purple belt, Japanese Jiu-Jitsu black belt, and Judo green belt. Also Warhammer 30k, the gym, fishkeeping, karting, travel, and dogs, especially fluffy ones.',
      '',
      '---',
      '',
      '## Selected work (homepage case studies)',
      '',
      '### [Driving a 25% increase in feature delivery despite a 66% engineering cut](' + dam + ')',
      'Perforce · P4 DAM · 2025–2026',
      '',
      'Tags on homepage: Claude Code, Design system, DesignOps.',
      '',
      'Ben took ownership of production UI using custom Claude Code workflows to push code directly. That approach halved refinement time and helped increase quarterly feature delivery by 25% despite a 66% engineering cut. That number comes from the PM; quality held.',
      '',
      'Stats on the page: 6→2 front-end team; 25% more features than the same quarter a year earlier; ~50% fewer handover questions per feature, refinements down to about 30 minutes; Best Designed (1st) at the company\'s 2026 AI hackathon.',
      '',
      'Process: discovery with the PM (problem, why now, success metrics, users, constraints, timeline, risks). Works in real product code: branches, code review, senior-dev standards. Handles front end so developers do not get a stack of screens to implement. Built skills and agents that generate spec files, handover documents, and snapshot files of the UI in every state. Refinements used to take about an hour Tue/Thu; now about 30 minutes, so roughly twice as many features fit the same slots.',
      '',
      'Example feature: realistic HDRI / image-based lighting in the P4 DAM asset viewer, replacing a flat grey background so reviewers can judge shape, materials, and quality. When Claude includes wrong components, he rewrites CSS by hand (Tailwind, CSS, React experience) and owns the output.',
      '',
      'Turned the system into reusable Claude skills and agents for specs and handover. One of those systems won Best Designed at the company AI hackathon in 2026; other teams across the business now use it.',
      '',
      '### [Increasing sales opportunities with a generative AI onboarding experience](' + personas + ')',
      'Perforce · P4 DAM · 2026',
      '',
      'Tags on homepage: Claude Code, Buying persona, Onboarding.',
      '',
      'Note on the page: no visuals for this case study; the work and data are confidential.',
      '',
      'Business shifted towards new customers / acquisitions in the AI era. Onboarding was the weak point and where the sales pipeline starts. Old personas were outdated and described users, not the buyer. The buyer is a studio manager.',
      '',
      'Already had an agentic research system; Claude Fable 5 opened the door. Parallel agents (Opus or Sonnet by job): Internal evidence (competitive guide, customer notes, discovery scans, win/loss, sales material); Web research (job postings, practitioner interviews, surveys); Persona author (studio-manager buying persona with citations); Existing design (live onboarding and wireframes as that buyer); Sample project (demo folder/bundle structure); Asset sourcing (demo art and licensing); Competitor analysis (capability matrix across eight main competitors).',
      '',
      'Conclusion: a trial where someone could see full product capability without the usual lengthy Perforce configuration.',
      '',
      'UI generated with a Claude plugin (Unified Workflow Plugin), a design-system MCP server (components, layout rules, branding), Fable 5 evidence, Claude Code, and the product design system. Good context means few tweaks.',
      '',
      'Outcome: persona-driven trial for sales; opportunities went up; sales said it made their job a lot easier and opened discussion avenues that were not there before. Quotes paraphrased from a sales call and reviewed for accuracy.',
      '',
      '### [Fixing critical navigation and user flow bottlenecks in enterprise 3D libraries](' + product + ')',
      'Perforce · Product ownership · 2025',
      '',
      'Tags on homepage: Claude Code, Search, Navigation.',
      '',
      'Ben overhauled search, filtering, and navigation for massive 3D asset libraries used by EA and Meta, resolving critical usability bottlenecks that previously relied on workarounds. He led product design on search history, advanced filtering, breadcrumbs, asset preview, and the dashboard.',
      '',
      'Evidence: people used the browser back button and bookmarks instead of product navigation. No single conversion number. What shipped: search history for repeat queries; filters that stay visible; one breadcrumb pattern; a preview that helps pick the right project; a dashboard with recent work up front.',
      '',
      '### [Delivering core Budibase features: branches, permissions, and calculations](' + bbui + ')',
      'Budibase · 2024–2025',
      '',
      'Tags on homepage: Low-code, Permissions, Automations.',
      '',
      'Ben designed the UI for automation branches, role-based access, and calculated fields, enabling administrators to securely build end-to-end applications entirely within the platform.',
      '',
      '### [Overhauling Budibase Automations to lay the groundwork for AI agents](' + automations + ')',
      'Budibase · 2024–2025',
      '',
      'Tags on homepage: User research, Automations, AI agents.',
      '',
      'Based on a comprehensive 25-user study presented to leadership, Ben redesigned the Automations builder. That architecture became the foundation for Budibase\'s future AI agents. Old builder hid data in and out of each step, so debugging was guesswork.',
      '',
      'Paid Maze study with 25 users; findings presented to Head of Engineering, CMO, and CEO. What shipped: Data In / Data Out tabs, inline error logging, contextual sidebar, cleaner canvas with zoom and pan. Discord complaints about automations went from about eight to ten down to one or none.',
      '',
      'Budibase later built AI agents on that data-in/data-out structure (e.g. email arrives → agent classifies → creates Jira ticket → assigns). That framework is part of how Budibase competes with AI workflow tools like n8n.',
      '',
      '### [Driving a 90% conversion boost through the CityFibre digital rebrand](' + cityfibre + ')',
      'DawsonAndrews · CityFibre · 2021–2024',
      '',
      'Tags on homepage: Rebrand, Design system, Conversion.',
      '',
      'Ben led the new brand rollout across all digital touchpoints for CityFibre (UK\'s second-largest fibre broadband infrastructure provider). That drove a 90% increase in availability checks and helped the agency secure the Hyperoptic account. Updated the Figma design system to new brand guidelines and held AA accessibility on a neon-heavy palette.',
      '',
      'Result: 90%+ uplift in homepage conversions after the rebrand; 95% Jira right-first-time on design tickets; new business opportunities for the agency.',
      '',
      '---',
      '',
      '## Related / archive case studies',
      '',
      '### [CityFibre B2B portal workshop](' + workshop + ')',
      'DawsonAndrews · CityFibre · archive page (not on homepage)',
      '',
      'Led a UX workshop for 40+ people from Vodafone, TalkTalk, and Zen on CityFibre\'s B2B portal (ISPs book engineers for home fibre installation surveys). Captured 1,400+ individual data points in live testing. User satisfaction scores doubled post-workshop (100% uplift). Approach: Typeform + Figma interactive survey through the product; feedback sessions on latest designs and potential features; on-site UX test execution at CityFibre\'s offices.',
      '',
      '### [SportsWork](' + sportswork + ')',
      'DawsonAndrews · SportsWork · archive / CV-linked',
      '',
      'Zero-to-one for a sports jobs startup: brand, product, and live site. Problem: sports industry needed a centralised platform linking job seekers and employers, with revenue via partnerships and premium job postings. Per CV: now an independent, profitable company. Live site: https://sportswork.co/',
      '',
      '---',
      '',
      '## Side projects',
      '',
      '### [Olympus](' + olympus + ')',
      'Ben launched a wearable brand featuring five premium watch faces for Facer, specifically optimised for battery life and high outdoor readability. The project also included designing a comprehensive Creator\'s Toolkit complete with 3D mockups.',
      '',
      '### [Remastering a 2008 EA strategy game for 2026](' + kane + ')',
      'Ben collaborated on a fan project that used AI to upgrade a 2008 game\'s graphics for modern, high-resolution screens. His role focused on patching, testing, and launching the final release to ensure it worked flawlessly in competitive online multiplayer.',
      '',
      '---',
      '',
      '## About',
      '',
      'Full page: [About](' + about + ')',
      '',
      'The work is on the home page; About is the rest. Based in Carrickfergus, Northern Ireland, just up the coast from Belfast. Far too extraverted for his own good; organises team socials; works best with people who are curious and say what they actually think. Almost always the tallest person in the room.',
      '',
      '### Who am I',
      '',
      'Outside work: gym, Warhammer 30k, a fluffy family dog he does not see that often and loves seeing when he does. Interests are all over the place; happy to hear from people who share any.',
      '',
      '### Brazilian Jiu-Jitsu',
      '',
      'Trained BJJ for five years, usually three times a week; martial arts in some form since 2007. BJJ purple belt; Japanese Jiu-Jitsu black belt; Judo green belt from earlier years. Consistency over any single good round. Half-joking: five years in, confidence of an amateur physical therapist and none of the qualifications.',
      '',
      '### Travel',
      '',
      'Likes arriving somewhere unfamiliar without a fixed plan. Last trip Lisbon: steep streets at golden hour, a day in Sintra, viewpoint over the city at dusk. Riga before that. At home: coastal or forest walks, evenings at the IMAX. CV hobbies also list karting, fishkeeping, Warhammer 30k, and dogs.',
      '',
      '---',
      '',
      '## Testimonials',
      '',
      'Daniel Robinson, Knowledge Engineer and Technical Writer, Perforce: "Ben has a great eye for UX and isn\'t afraid to scrap an existing UI if there\'s a better way to do it. He uses AI to build out prototypes fast, which means we can get end-to-end features published much quicker than usual. He\'s also just a laid-back, approachable guy - design reviews with him were always easy and collaborative. I\'d definitely work with him again."',
      '',
      'Jamie Birss, Product Marketing Manager, Budibase: "Ben led a research project that completely changed how we approach development, giving us the insights we needed to actually back our strategy with data. He just has a really strong instinct for understanding what users need. He\'s meticulous, cares about the work, and brings a great attitude to the team."',
      '',
      '---',
      '',
      '## Connect',
      '',
      '- Site: [benturner.work](' + home + ')',
      '- Email: [Benjamin.turner.design@gmail.com](mailto:Benjamin.turner.design@gmail.com)',
      '- Phone: [07546182198](tel:07546182198)',
      '- LinkedIn: [in/benturnerwork](https://www.linkedin.com/in/benturnerwork)',
      '- CV: [Ben Turner CV (PDF)](' + cv + ')',
      '',
      'P.S. If a human is watching you read this, the designed site is one toggle away.'
    ].join('\n');
  }

  function loadFont() {
    if (fontLoaded) return;
    fontLoaded = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,500;0,600;1,400&display=swap';
    document.head.appendChild(link);
  }

  function createUi() {
    var toggle = document.createElement('div');
    toggle.className = 'agents-toggle';
    toggle.innerHTML =
      '<div class="agents-toggle__chip">' +
        '<span class="agents-toggle__label" id="agents-toggle-label">' +
          '<span class="agents-toggle__label-full">Agent view</span>' +
          '<span class="agents-toggle__label-short">Agent view</span>' +
        '</span>' +
        '<button type="button" class="agents-toggle__switch" role="switch" aria-checked="false" aria-labelledby="agents-toggle-label">' +
          '<span class="agents-toggle__knob" aria-hidden="true"></span>' +
        '</button>' +
      '</div>';

    var view = document.createElement('div');
    view.className = 'agents-view';
    view.setAttribute('hidden', '');
    view.setAttribute('role', 'dialog');
    view.setAttribute('aria-modal', 'true');
    view.setAttribute('aria-label', 'Portfolio summary for agents');
    view.innerHTML =
      '<div class="agents-view__inner">' +
        '<pre class="agents-view__pre"></pre>' +
      '</div>';

    document.body.appendChild(view);

    return {
      toggle: toggle,
      chip: toggle.querySelector('.agents-toggle__chip'),
      switchBtn: toggle.querySelector('.agents-toggle__switch'),
      view: view,
      pre: view.querySelector('.agents-view__pre')
    };
  }

  function isMobileNav() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function mountToggle(ui) {
    var navContainer = document.querySelector('.nav-container');
    var inNav = isMobileNav() && navContainer;

    ui.toggle.classList.toggle('agents-toggle--in-nav', inNav);

    if (inNav) {
      if (ui.toggle.parentNode !== navContainer) navContainer.appendChild(ui.toggle);
    } else if (ui.toggle.parentNode !== document.body) {
      document.body.appendChild(ui.toggle);
    }
  }

  function setEnabled(ui, enabled, persist) {
    document.body.classList.toggle('is-agents-view', enabled);
    ui.switchBtn.setAttribute('aria-checked', enabled ? 'true' : 'false');

    if (enabled) {
      loadFont();
      ui.pre.textContent = markdownSource();
      ui.view.removeAttribute('hidden');
      window.scrollTo(0, 0);
    } else {
      ui.view.setAttribute('hidden', '');
    }

    mountToggle(ui);

    if (persist) {
      try {
        if (enabled) localStorage.setItem(STORAGE_KEY, '1');
        else localStorage.removeItem(STORAGE_KEY);
      } catch (err) {}
    }
  }

  function init() {
    var ui = createUi();
    loadFont();
    var saved = false;
    try {
      saved = localStorage.getItem(STORAGE_KEY) === '1';
    } catch (err) {}

    setEnabled(ui, saved, false);

    ui.switchBtn.addEventListener('click', function () {
      setEnabled(ui, !document.body.classList.contains('is-agents-view'), true);
    });

    ui.chip.addEventListener('click', function (event) {
      if (event.target.closest('.agents-toggle__switch')) return;
      ui.switchBtn.click();
    });

    document.querySelectorAll('.nav-group .nav-item').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!document.body.classList.contains('is-agents-view')) return;
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (err) {}
        // Clear persisted state only — don't unmount the view before navigation,
        // or the designed site flashes underneath for a frame.
      });
    });

    window.addEventListener('resize', function () {
      mountToggle(ui);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
