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
      'Product Designer with seven years of experience driving business growth across enterprise, startup, and agency. Leads design across multiple products at [Perforce](https://www.perforce.com/), shipping features end-to-end with Claude Code.',
      '',
      '## Pages',
      '',
      '- [Home](' + home + '): selected case studies, side projects, CV download, testimonials',
      '- [About](' + about + '): who he is outside work (BJJ, travel, life)',
      '- [CV](' + cv + '): designed A4 PDF résumé',
      '',
      'Homepage case studies (in order): 25% feature delivery despite 66% engineering cut (P4 DAM), Generative AI onboarding (personas), Enterprise 3D library navigation (P4 product), Budibase Automations / AI agents groundwork, Core Budibase features (branches, permissions, calculations).',
      '',
      'Archive / related pages (linked from CV or next-project cards, not on the homepage): [CityFibre rebrand](' + cityfibre + '), [CityFibre B2B portal workshop](' + workshop + '), [SportsWork](' + sportswork + ').',
      '',
      '---',
      '',
      '## CV',
      '',
      'Download: [Ben Turner CV (PDF)](' + cv + ')',
      '',
      'Product Designer. Contact on the CV: benturner.work, +44 7546 182198, Benjamin.turner.design@gmail.com, linkedin.com/in/benturnerwork. Location (site footer and About, not the CV contact row): Carrickfergus, Northern Ireland.',
      '',
      '### Summary (from the CV)',
      '',
      'Product Designer with seven years of experience driving business growth across enterprise, startup, and agency sectors. Known for delivering high-impact interfaces that boost sales and scale operations, while bringing energy and a collaborative spark to team culture.',
      '',
      '### Experience (from the CV)',
      '',
      '#### Perforce, Product Designer',
      'September 2025 to Present',
      '',
      'P4 Plan and P4 DAM: planning and digital asset management software for games and media.',
      '',
      '- Leads design for P4 DAM and P4 Plan, handling enterprise customer data for clients like Electronic Arts, Xbox Game Studios and Meta, and contributing to new customer acquisition.',
      '- Owns sections of the design system and develops Claude skills for context building and generative AI workflows, served through an MCP server and a plugin that generates high-quality interfaces.',
      '- Won Best Designed at the 2026 company AI Hackathon for these custom Claude systems.',
      '- Used this AI system to rebuild P4 DAM onboarding around the studio manager persona, delivering a targeted trial that increased sales opportunities and streamlined the sales process.',
      '- Wrote production front-end code and built workflows using Claude Code to bridge a 66% drop in engineering capacity, ultimately increasing feature output by 25%.',
      '',
      'Case study tags on the CV: Shipping production code, Increasing sales opportunities, Owning P4 DAM.',
      '',
      '#### Budibase, Product Designer',
      'July 2024 to July 2025',
      '',
      'Open-source low-code for internal apps, automations and AI agents.',
      '',
      '- Owned end-to-end product design for a self-hosted, open-source low-code platform.',
      '- Rebuilt the automations builder based on a 25-user study, eliminating related user experience complaints.',
      '- That design became the foundation for Budibase\'s later AI product: agents and automations, and was pivotal as the company moved towards becoming an AI-focused startup.',
      '',
      'Case study tags on the CV: Automations overhaul, Branches, permissions, calculations.',
      '',
      '#### DawsonAndrews, Product Designer',
      'June 2021 to July 2024',
      '',
      'Product design agency.',
      '',
      '- Created and managed scalable design systems for major enterprise clients, including CityFibre and GSMA.',
      '- Took SportsWork from zero to one across brand and product, launching it into an independent, profitable company.',
      '- Project work played a key role in helping the agency scale from a small to medium-sized business and hire 10 new employees.',
      '- Mentored multiple designers throughout the agency.',
      '',
      'Case study tags on the CV: CityFibre rebrand, SportsWork.',
      '',
      'More experience on linkedin.com/in/benturnerwork. Earlier roles are not on the public CV.',
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
      'Turned the system into reusable Claude skills and agents for specs and handover. One of those systems won Best Designed at the company\'s annual AI hackathon in 2026, and he got a prize for it. Other teams across the business now use it.',
      '',
      'Outcome: when the team shrank, output went up because the spec files and workflows were already in place. The team delivered the features on time. He took responsibility for the front end.',
      '',
      '### [Increasing sales opportunities with a generative AI onboarding experience](' + personas + ')',
      'Perforce · P4 DAM · 2026',
      '',
      'Tags on homepage: Claude Code, Buying persona, Onboarding.',
      '',
      'Homepage: leveraging custom AI agents, Ben rebuilt P4 DAM\'s buyer-centric onboarding. That targeted approach increased sales opportunities and streamlined the closing process.',
      '',
      'Note on the page: no visuals for this case study; the work and data are confidential.',
      '',
      'Enterprise digital asset management product. For a long time the work focused on existing customers; then new acquisitions became the priority in the AI era. Onboarding was the weak point and where the sales pipeline starts.',
      '',
      'Research already existed: interviews, win/loss data, customer notes, competitor work, and old personas. Ben had an agentic system that could run against that material; a new frontier model opened the door to combine research methods and agents for the right design.',
      '',
      'Old personas described users, not the buyer. The decision-maker is a senior technical buyer.',
      '',
      'Agent jobs (each on a model tier scaled to the task): internal evidence; web research; persona author (buying persona with a citation on every claim); existing design review; sample project structure; asset sourcing and licensing; competitor capability matrix (confidential). Takeaway: a trial showing full product capability without lengthy legacy enterprise configuration.',
      '',
      'Design: custom AI workflow plugin Ben designed, with design-system integration (components, layout rules, branding), evidence, and workflow output turning into generated UI. Expensive to run; strong context means few tweaks before ship.',
      '',
      'Quotes, paraphrased from a sales call and reviewed for accuracy: "It makes the self-serve impression far more meaningful, and it is needed." "It made the job a lot easier, and opened up conversations we did not have a way into before."',
      '',
      'Outcome: persona-driven trial; prospects see the product through work they care about; sellers have a credible post-demo destination. Sales opportunities increased; sales team reported the job got easier. Workflow: frontier model, agents, AI coding tools, server integrations, design system, and custom plugin generating UI that increased sales.',
      '',
      '### [Fixing critical navigation and user flow bottlenecks in enterprise 3D libraries](' + product + ')',
      'Perforce · Product ownership · 2025',
      '',
      'Tags on homepage: Claude Code, Search, Navigation.',
      '',
      'Homepage: Ben overhauled search, filtering, and navigation for massive 3D asset libraries used by EA and Meta, resolving critical usability bottlenecks that previously relied on workarounds.',
      '',
      'He is product design lead for P4 DAM, a digital asset management platform for games, film, and VFX, including Electronic Arts, Pinewood Studios, Xbox Game Studios, and Meta. It sits on Perforce version control. Studios need to find the right file, see where they are, preview it, and decide if it is ready for review.',
      '',
      'Why the work existed: sales. Competitors\' UX was getting more current, raising the expected standard. Observing users on calls, internal use, and engineer Slack channels showed people using the browser back button or bookmarks instead of built-in navigation. The original concept tried to do everything at once; he stripped that back to get people to the asset, then let them manage it.',
      '',
      'What changed:',
      '',
      'Search history — Problem: Search had no memory, forcing users to re-type identical queries and re-apply filters whenever they navigated. Design change: I added persistent recent searches and saved filter states directly to the search bar. Result: Repeat searches dropped to a single click, saving users around 15 to 20 seconds per lookup.',
      '',
      'Advanced filtering — Problem: Active filters were hidden and easy to lose track of, particularly date ranges and metadata tags. Design change: I redesigned the filter UI so active selections stay visible above results with one-click removal. Result: Users can see, adjust, and clear active filters immediately without resetting their whole search.',
      '',
      'Breadcrumbs — Problem: Folder structures were deep and inconsistent, leading people to rely on browser back buttons and bookmarks to stay oriented. Design change: I built a single, responsive breadcrumb pattern across the entire application. Result: Replaced reliance on browser navigation and stopped users getting lost in nested folder trees.',
      '',
      'Previewing assets — Problem: Assets stored across multiple projects frequently opened in the wrong context, forcing artists to close the file and switch workspaces manually. Design change: The updated preview drawer lets users pick their target project before opening. Result: Removed wrong-project opens across shared asset libraries.',
      '',
      'Dashboard — Problem: The landing page was cluttered with static widgets that did not help users start their daily work. Design change: I replaced the noise with recent files, active reviews, and direct search entry points. Result: Reduced the steps needed to reach an active file from four clicks down to one.',
      '',
      'Impact: Fixing core navigation rather than making cosmetic updates made the library faster and more predictable. Artists can locate files quickly, stay oriented in deep folder trees, and move assets through review without leaving their workflow.',
      '',
      '### [Delivering core Budibase features: branches, permissions, and calculations](' + bbui + ')',
      'Budibase · 2024–2025',
      '',
      'Tags on homepage: Low-code, Permissions, Automations.',
      '',
      'Homepage: Ben designed the UI for automation branches, role-based access, and calculated fields, enabling administrators to securely build end-to-end applications entirely within the platform.',
      '',
      'Automation branches: conditional steps in a flowchart, such as "if an invoice is over £500, notify a manager; otherwise mark it paid." Permissions: admins assign Read, Write, or Execute for each custom role. View calculations: JavaScript formulas that create calculated fields inside the app, so totals, averages, and counts do not need an export to a spreadsheet.',
      '',
      '### [Overhauling Budibase Automations to Lay the Groundwork for AI Agents](' + automations + ')',
      'Budibase · 2024–2025',
      '',
      'Tags on homepage: User research, Automations, AI agents.',
      '',
      'Based on a 25-user study presented to leadership, Ben redesigned the Automations builder. That architecture became the foundation for Budibase\'s future AI agents.',
      '',
      'He led the end-to-end UX redesign of the workflow builder. Budibase is open-source low-code for customer portals, admin panels, and internal tools, self-hosted so data stays on customer infrastructure. The work supported a pivot to an AI-first automations platform.',
      '',
      'The builder hid data in and out of each step; Discord saw roughly eight to ten automations complaints at a time. AI-first automations needed every step to show data clearly.',
      '',
      'Stats: 25 paid Maze participants; 4+ workflow features shipped; complaints after launch near zero (header stat 0, down from 8–10). Findings PDF to Head of Engineering, CMO, and CEO. Shipped Data In / Data Out tabs, inline error logging, contextual sidebar, zoom and pan canvas.',
      '',
      'Agents section later built on automations with the same data-in/data-out framework (email → classify → Jira ticket). Failed steps are inspectable, not a black box. Helps Budibase compete with tools like n8n. Outcome: executive-backed redesign on user evidence; agents built on workflows users already understood.',
      '',
      '### [Driving a 90% conversion boost through the CityFibre digital rebrand](' + cityfibre + ')',
      'DawsonAndrews · CityFibre · 2021–2024',
      '',
      'Tags: Rebrand, Design system, Conversion.',
      '',
      'Ben led the new brand rollout across all digital touchpoints for CityFibre (UK\'s second-largest fibre broadband infrastructure provider). That drove a 90% increase in availability checks and helped the agency secure the Hyperoptic account. Updated the Figma design system to new brand guidelines and held AA accessibility on a neon-heavy palette.',
      '',
      'Result: 90%+ uplift in homepage conversions after the rebrand; 95% Jira right-first-time on design tickets; new business opportunities for the agency.',
      '',
      '---',
      '',
      '## Related / archive case studies',
      '',
      '### [CityFibre B2B portal: user satisfaction doubled after a workshop with Vodafone, TalkTalk and Zen](' + workshop + ')',
      'DawsonAndrews · CityFibre · archive page (not on homepage)',
      '',
      'Led a UX workshop for 40+ people from Vodafone, TalkTalk, and Zen on CityFibre\'s B2B portal (ISPs book engineers for home fibre installation surveys). Captured 1,400+ individual data points in live testing. User satisfaction scores doubled post-workshop (100% uplift). Approach: Typeform + Figma interactive survey through the product; feedback sessions on latest designs and potential features; on-site UX test execution at CityFibre\'s offices.',
      '',
      '### [Innovating job searches in sports with Sportswork: A user-centric design approach](' + sportswork + ')',
      'DawsonAndrews · SportsWork · archive / CV-linked',
      '',
      'Zero-to-one for a sports jobs startup: brand, product, and live site. Problem: the sports industry needed a centralised platform linking job seekers and employers, with revenue via partnerships and premium job postings. Ben designed the jobs listing, forum, homepage, campaign and partner pages, a job posting flow, tiered listings, account settings, and a 404 page with related jobs. He also implemented CSS, solo and with developers. SportsWork is now a fully independent, profitable startup and has attracted multiple investment rounds. Live site: https://sportswork.co/',
      '',
      '---',
      '',
      '## Side projects',
      '',
      '### [Olympus](' + olympus + ')',
      'Premium watch faces. Professional design tools.',
      '',
      'Olympus is a smartwatch brand focused on clean product design and user experience. Watch faces are built for at-a-glance readability, all-day battery, and a wide variety of smartwatches via Facer, plus professional design assets and 3D mockups for watch UI creators.',
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
      'Based in Carrickfergus, Northern Ireland, just up the coast from Belfast. The portfolio lives on the home page; About is the rest. Organises team socials, leans extraverted, works best with people who are curious and speak their mind.',
      '',
      'Outside work: usually at the gym or deep in Warhammer 30k. Almost always the tallest person in the room; visits the fluffy family dog whenever he can. Fairly varied interests; happy to hear from people if any overlap.',
      '',
      '### Brazilian Jiu-Jitsu',
      '',
      'BJJ for five years, typically three times a week; martial arts in various forms since 2007. BJJ purple belt, Japanese Jiu-Jitsu black belt, Judo green belt. Consistency on the mat beats any single good round. Half-joking: mention a gym ache and he will try to diagnose it; five years in, confidence of a physical therapist and none of the qualifications.',
      '',
      '### Travel',
      '',
      'Prefers landing somewhere unfamiliar without a rigid itinerary. Recent trips: Lisbon (steep streets and Sintra), preceded by Riga. Local days out: coastal walk, forest trail, or an evening at the IMAX. CV hobbies also list karting, fishkeeping, Warhammer 30k, and dogs.',
      '',
      '---',
      '',
      '## Testimonials',
      '',
      'Brian DeVerter, Senior Manager, Perforce: "Ben is a model employee and a standout contributor within the Product Design organisation. His commitment, passion, positive attitude, and ability to consistently deliver results set a high standard for others to aspire to. He approaches every challenge with energy and professionalism, embraces new opportunities, and continuously looks for ways to improve his work and that of those around him. What makes Ben particularly valuable is not just the quality of his output, but the example he sets through his ownership, collaboration, innovation, and willingness to share knowledge. Whether building AI-enabled workflows, supporting teammates, or presenting to the broader organisation, Ben consistently demonstrates the qualities of a highly engaged and impactful team member."',
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
      '- Phone: [+44 7546 182198](tel:+447546182198)',
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
        // Clear persisted state only; don't unmount the view before navigation,
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
