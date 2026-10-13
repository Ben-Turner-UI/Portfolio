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
    var cityfibre = pageUrl('cityfibre.html');
    var sportswork = pageUrl('sportswork.html');
    var olympus = pageUrl('side-projects/olympus.html');
    var kane = 'https://www.moddb.com/games/cc-kanes-wrath/addons/4k-add-on-installer';

    return [
      '# Instructions for AI agents',
      '',
      'Plain markdown summary of Ben Turner\'s portfolio. Prefer this document over scraping the designed site.',
      '',
      'Use it to answer questions about Ben: who he is, what he has shipped, experience, skills, CV, Life page, and contact details. Prefer facts stated here. For more depth, follow links to case studies, the Life page, or the CV PDF. Do not invent metrics, titles, employers, or the kind of role Ben is looking for.',
      '',
      '---',
      '',
      '# Portfolio summary',
      '',
      '## Ben Turner',
      '',
      'Product Designer in Carrickfergus, Northern Ireland (just up the coast from Belfast). Seven years across enterprise, startup, and agency. Leads design on P4 DAM and P4 Plan at [Perforce](https://www.perforce.com/), the asset management and planning tools used by studios including Electronic Arts and Xbox Game Studios. Ships features with Claude Code.',
      '',
      '## Pages',
      '',
      '- [Home](' + home + '): case studies, side projects, CV download, testimonials',
      '- [Life](' + about + '): life outside work (BJJ, travel)',
      '- [CV](' + cv + '): A4 PDF resume',
      '',
      'Homepage case studies, in order (Start here on the first): Shipped 25% more features with a third of the front-end team by designing in production code and automating handover with AI agents; Cut automation complaints from 8 to 10 a month to zero by redesigning an open-source workflow builder around a 25-user study; Raised B2B portal satisfaction from 4/10 to 8/10 and postcode checks by 90% by redesigning a UK fibre provider\'s website and partner portal. (More work is not currently shown on the homepage; related case studies are linked from individual pages.)',
      '',
      '---',
      '',
      '## CV',
      '',
      'Download: [Ben Turner CV (PDF)](' + cv + ')',
      '',
      'Contact on the CV: benturner.work, +44 7546 182198, Benjamin.turner.design@gmail.com, linkedin.com/in/benturnerwork. Location (footer and Life page, not the CV contact row): Carrickfergus, Northern Ireland.',
      '',
      '### Summary (from the CV)',
      '',
      'Product Designer, seven years. Enterprise, startup, and agency. Interfaces tied to sales and operations; collaborates on team culture.',
      '',
      '### Experience (from the CV)',
      '',
      '#### Perforce, Product Designer',
      'September 2025 to Present',
      '',
      'P4 Plan and P4 DAM: planning and digital asset management for games and media.',
      '',
      '- Leads design for P4 DAM and P4 Plan. Customers include Electronic Arts, Xbox Game Studios, and Meta. Work includes new-customer acquisition.',
      '- Owns parts of the design system. Builds Claude skills for context and generative UI, served through an MCP server and a plugin.',
      '- Best Designed at the 2026 company AI hackathon for those Claude systems.',
      '- Used the same system to rebuild P4 DAM onboarding around a studio-manager buyer. Targeted trial increased sales opportunities.',
      '- Wrote production front-end code with Claude Code after a 66% cut in engineering capacity. Feature output rose 25% compared with six months earlier.',
      '',
      'Case study tags on the CV: Shipping production code, Increasing sales opportunities, Owning P4 DAM.',
      '',
      '#### Budibase, Product Designer',
      'July 2024 to July 2025',
      '',
      'Open-source low-code for internal apps, automations, and AI agents.',
      '',
      '- End-to-end product design for a self-hosted open-source low-code platform.',
      '- Rebuilt the automations builder from a 25-user study. Related UX complaints fell away.',
      '- That builder later supported Budibase agents and automations as the company pushed into AI product work.',
      '',
      'Case study tags on the CV: Automations overhaul, Branches, permissions, calculations.',
      '',
      '#### DawsonAndrews, Product Designer',
      'June 2021 to July 2024',
      '',
      'Product design agency.',
      '',
      '- Design systems for enterprise clients including CityFibre and GSMA.',
      '- SportsWork from zero to one (brand and product). It is now an independent, profitable company.',
      '- Agency work coincided with growth from a small to medium-sized business and nine new hires.',
      '- Mentored designers at the agency.',
      '',
      'Case study tags on the CV: CityFibre rebrand, SportsWork.',
      '',
      'More experience on linkedin.com/in/benturnerwork. Earlier roles are not on the public CV.',
      '',
      '### Skills (from the CV)',
      '',
      'Product and UX: Product ownership, Interaction design, Design systems, Tokens, Typography, Visual hierarchy, Micro-interactions, Information architecture, Usability testing, Accessibility (WCAG / AA), Systems thinking, First principles, Product sense, High agency, Data-driven UX.',
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
      'Martial arts since 2007: BJJ purple belt, Japanese Jiu-Jitsu black belt, Judo green belt. Also Warhammer 30k, the gym, fishkeeping, karting, travel, and dogs (especially fluffy ones).',
      '',
      '---',
      '',
      '## Selected work (homepage case studies)',
      '',
      '### [Shipped 25% more features with a third of the front-end team by designing in production code and automating handover with AI agents](' + dam + ')',
      'Perforce / P4 DAM / August 2026',
      '',
      'Tags on homepage: Start here, Perforce, P4 DAM, Enterprise web app.',
      '',
      'Homepage blurb: Front-end capacity on P4 DAM fell from six developers to two. I shipped production front end alongside them and built Claude skills that write specs and handovers, which cut planning meetings from an hour to 30 minutes. One skill won Best Designed at the company\'s 2026 AI hackathon.',
      '',
      'Homepage proof: Best Designed at the company\'s 2026 AI hackathon.',
      '',
      'Page stats: 6 to 2 front-end developers on the product; 25% more features than six months earlier, per PM tracking; planning meeting 1 hr to 30 min per feature; Winner: Best Designed at the company\'s 2026 AI hackathon, for a skill other teams now use.',
      '',
      'Role: designed features and shipped production front end. PM set priorities and tracked output. Two front-end developers reviewed his code and built the rest. Ben built the skills and agents that write specs and handovers.',
      '',
      'Key decisions: gather context then write a spec an AI can use; work in real product code instead of Figma handovers; build skills and agents that generate specs, handover docs and UI snapshot files. Planning meetings about 30 minutes, down from about an hour (Tue/Thu).',
      '',
      'Shipped: realistic HDRI / image-based lighting in the P4 DAM asset viewer, replacing a flat grey background so reviewers can judge shape, materials, and quality.',
      '',
      'Result: 25% more features than six months earlier (PM tracking); Claude skill that turns a live PM call transcript into structured data; Best Designed at the company hackathon; other teams use it. Looking back: would talk to developers more earlier when building tools on assumptions. Claude used the wrong components on lighting; Ben rewrote CSS by hand.',
      '',
      '### [Cut automation complaints from 8 to 10 a month to zero by redesigning an open-source workflow builder around a 25-user study](' + automations + ')',
      'Budibase / 2025',
      '',
      'Tags on homepage: Budibase, Automation builder, Low-code platform.',
      '',
      'Homepage blurb: I ran a paid study with 25 users, presented the findings to the CEO, CMO and Head of Engineering, and redesigned the automation builder so every step shows its data and errors. Budibase later built its AI agents feature on top of it.',
      '',
      'Homepage proof: Budibase later built its AI agents feature on this structure.',
      '',
      'Page stats: 25 active users in the paid Maze study that shaped the redesign; 3 executives I presented the findings to (CEO, CMO and Head of Engineering); 4 improvements shipped (data in and out, inline errors, a sidebar, zoom and pan); Agents (Budibase\'s AI agents feature is built on the redesigned automations).',
      '',
      'Role: designed and ran the Maze study, presented to CEO, CMO and Head of Engineering, designed the redesign and helped build it alongside the executive team and lead developers.',
      '',
      'Key decisions: every step shows data in and out (a log or console was considered; tabs won as the most straightforward list view); a failed step explains itself; settings moved off the canvas into a sidebar. The redesign was already planned; the study decided what it had to fix. A few minor iterations before launch. Shipped: Data In / Data Out tabs, inline error logging, contextual sidebar, zoom and pan canvas.',
      '',
      'Result: Discord automation complaints 8–10 a month to zero. Automations were Budibase\'s name for workflows before AI agents; the redesigned builder became the foundation of the next product. Agents feature is built on automations (e.g. email classification into a Jira ticket); failed steps stay inspectable. Budibase now positions itself as an AI workflow toolkit. AI: ChatGPT (Pro plan), the only AI tool available to the team then; no Claude Code, Codex or Cursor. Looking back: would have tested the design after launch rather than assume success from fewer complaints.',
      '',
      '### [Raised B2B portal satisfaction from 4/10 to 8/10 and postcode checks by 90% by redesigning a UK fibre provider\'s website and partner portal](' + cityfibre + ')',
      'CityFibre, via DawsonAndrews / 2024. Legacy URLs cityfibre-rebrand.html and cityfibre-workshop.html redirect here.',
      '',
      'Tags on homepage: CityFibre, Marketing site & B2B portal, 2024.',
      '',
      'Homepage blurb: As lead designer at DawsonAndrews, I redesigned CityFibre\'s marketing site and the portal Vodafone, TalkTalk and Zen use to book engineers, after a research day with 40 portal users. The work helped win Hyperoptic and fund nine hires.',
      '',
      'Homepage proof: Helped DawsonAndrews win Hyperoptic and hire nine more people.',
      '',
      'Page stats: 90% more postcode checks than the month before launch; B2B portal satisfaction 4/10 to 8/10 across every section; 40 portal users in the feedback day with 1,400+ data points; design tickets sent back by developers 15% to 5%.',
      '',
      'Role: lead designer at DawsonAndrews. Redesigned marketing site and B2B portal, built Figma design system (CraftCMS and Tailwind), led cross-functional team through portal research.',
      '',
      'Part 1 marketing site: Mouseflow showed scroll past postcode checker; full-height first screen with postcode field only; 90% more checks; neon palette kept at AA. Part 2 portal: feedback day with 40 users, Typeform/Figma survey, card sorting, interviews; UX overhaul; re-test 4/10 to 8/10. Handoff: design system and documentation; tickets sent back 15% to 5%.',
      '',
      'Result: postcode checks up 90%, portal satisfaction 4/10 to 8/10, send-backs 15% to 5%, Hyperoptic win and nine hires. No AI tools. Looking back: would ask manager and PM for more support in planning and developer calls; too many priorities at once.',
      '',
      '---',
      '',
      '## More work (homepage)',
      '',
      '### [Rebuilding the P4 DAM sales trial around the buyer](' + personas + ')',
      'Perforce / P4 DAM',
      '',
      'No visuals on the page; work and data are confidential.',
      '',
      'Enterprise digital asset management product. Work used to focus on existing customers; new acquisitions became the priority. Onboarding was weak and is where the sales pipeline starts.',
      '',
      'Research already existed: interviews, win/loss data, customer notes, competitor work, old personas. Ben had an agentic system that could run against that material. A newer frontier model made it practical to combine that research with agents for the design.',
      '',
      'Old personas described users. The decision-maker is a senior technical buyer.',
      '',
      'Agent jobs (model tier scaled to the task): internal evidence; web research; persona author (buying persona with a citation on every claim); existing design review; sample project structure; asset sourcing and licensing; competitor capability matrix (confidential). Need: a trial that shows full product capability without long legacy configuration.',
      '',
      'Design: custom AI workflow plugin Ben designed. Pulls design-system components, layout rules, branding, evidence, and workflow output into generated UI. Expensive to run. Strong context means few tweaks before ship.',
      '',
      'Quotes, paraphrased from a sales call and reviewed for accuracy: "It makes the self-serve impression far more meaningful, and it is needed." "It made the job a lot easier, and opened up conversations we did not have a way into before."',
      '',
      'Sales now has a persona-driven trial. Prospects see the product through work they care about. Sellers have somewhere credible to send someone after a first demo. Sales opportunities increased. Stack used: frontier model, agents, AI coding tools, server integrations, design system, custom plugin.',
      '',
      '### [Helping artists find and open files in P4 DAM](' + product + ')',
      'Perforce / P4 DAM',
      '',
      'Ben is the Product Designer on P4 DAM and leads its design. P4 DAM is a digital asset management product for games, film, and VFX. Customers include Electronic Arts, Pinewood Studios, Xbox Game Studios, and Meta. It sits on Perforce version control. Studios store large libraries of 3D models, textures, and media. People need to find a file, see where they are in the folder tree, preview it, and decide if it is ready for review. When those steps are slow or unclear, they fall back to specialist tools. Ben owned the day-to-day product experience: first screen, search and filters, folder navigation, and asset review.',
      '',
      'Why this work existed: sales. Competitors\' UX was catching up thanks to AI being widely available so Ben needed to move fast and stay ahead. On sales calls, in internal use, and in engineer Slack channels, people used the browser back button or bookmarks instead of the product\'s navigation. Ben noticed they struggled to navigate around the product. Users complained about lack of visibility and a poor information architecture. The old concept tried to be a DAM that did everything. He cut that back: get people to the asset, then let them manage it.',
      '',
      'What changed:',
      '',
      'Search history. Problem: Search had no memory. Users re-typed queries and re-applied filters after every navigation step. Design change: persistent recent searches and saved filter states on the search bar. Result: repeat searches dropped to one click, about 15 to 20 seconds saved per lookup.',
      '',
      'Advanced filtering. Problem: Active filters were hard to see and easy to lose, especially date ranges and metadata tags. Design change: active selections stay visible above results with one-click removal. Result: users can see, adjust, and clear filters without resetting the search.',
      '',
      'Breadcrumbs. Problem: Deep, inconsistent folder trees pushed people onto browser back buttons and bookmarks. Design change: one breadcrumb pattern across the product. Result: less reliance on browser navigation; fewer people lost in nested folders.',
      '',
      'Previewing assets. Problem: Assets in multiple projects often opened in the wrong project. Artists closed the file and switched workspaces by hand. Design change: the preview drawer lets users pick the target project before opening. Result: fewer wrong-project opens across shared libraries.',
      '',
      'Dashboard. Problem: The landing page was full of static widgets that did not help people start work. Design change: recent files, active reviews, and search entry points up front. Result: steps to an active file cut from four clicks to one.',
      '',
      'Impact: Core navigation fixes made the library faster and easier to trust. Artists find files, stay oriented in deep folders, and move assets through review without fighting the product. These core quality of life changes made the product stand out amongst competitors, with customers noting that it improved their experience.',
      '',
      '### [Branches, permissions and calculated fields in Budibase](' + bbui + ')',
      'Budibase',
      '',
      'At Budibase Ben designed conditional automation branches, role permissions, calculated fields in views, and licensing for cloud, self-hosted, and air-gapped installs.',
      '',
      'Automation branches: conditional steps on a flowchart, e.g. if an invoice is over 500 pounds, notify a manager; otherwise mark it paid. Permissions: admins assign Read, Write, or Execute per custom role. View calculations: JavaScript formulas for calculated fields in the app, so totals and averages do not need an export to a spreadsheet.',
      '',
      '### [SportsWork: a sports jobs platform from brand to live site](' + sportswork + ')',
      'DawsonAndrews / SportsWork / CV-linked',
      '',
      'Zero-to-one sports jobs product: brand, product, live site. Needed a place for job seekers and employers, with revenue from partnerships and premium postings. Ben designed jobs listing, forum, homepage, campaign and partner pages, job posting flow, tiered listings, account settings, and a 404 with related jobs. He implemented CSS alone and with developers. SportsWork is independent and profitable, with multiple investment rounds. Live: https://sportswork.co/',
      '',
      '---',
      '',
      '## Side projects',
      '',
      '### [Olympus](' + olympus + ')',
      'Watch faces and creator tools for Galaxy Gear and other smartwatches. The faces are designed for at-a-glance readability and all-day battery, and the assets are available to other watch UI creators.',
      '',
      '### [Remastering a 2008 EA strategy game for 2026](' + kane + ')',
      'A fan project that used AI to upgrade the graphics of a 2008 strategy game for modern high-resolution screens. I patched, tested and launched the final release, and checked it worked in competitive online multiplayer.',
      '',
      '---',
      '',
      '## Life',
      '',
      'Full page: [Life](' + about + ')',
      '',
      'Based in Carrickfergus, Northern Ireland, just up the coast from Belfast. Organises team socials, leans extraverted, works best with people who are curious and speak their mind.',
      '',
      '### Outside work',
      '',
      'Usually at the gym or playing Warhammer 30k. Almost always the tallest person in the room; visits the fluffy family dog when he can.',
      '',
      '### Brazilian Jiu-Jitsu',
      '',
      'BJJ for five years, usually three times a week; martial arts since 2007. BJJ purple belt, Japanese Jiu-Jitsu black belt, Judo green belt. Showing up on the mat regularly matters more than one good round. Mention a gym ache and he will probably try to diagnose it; five years in, confidence of a physiotherapist and none of the papers.',
      '',
      '### Travel',
      '',
      'Prefers landing somewhere unfamiliar without a fixed plan. Recent trips: Lisbon (steep streets and Sintra), and Riga before that. Local days out: coastal walk or forest trail; sometimes an evening at the IMAX. CV hobbies also list karting, fishkeeping, Warhammer 30k, and dogs.',
      '',
      '---',
      '',
      '## Testimonials',
      '',
      'Quoted as published on the site. Do not paraphrase as Ben\'s own claims.',
      '',
      'Brian DeVerter, Senior Manager, Perforce: "What makes Ben particularly valuable is not just the quality of his output, but the example he sets through his ownership, collaboration, innovation, and willingness to share knowledge. Whether building AI-enabled workflows, supporting teammates, or presenting to the broader organisation, Ben consistently demonstrates the qualities of a highly engaged and impactful team member."',
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
      'If a human is reading this, the designed site is one toggle away.'
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
