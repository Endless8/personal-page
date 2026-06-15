// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after clicking a link
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// EXPERIENCE ACCORDIONS
// ============================================================
function setupCardBody(card) {
  const button = card.querySelector('.card-header');
  const body = card.querySelector('.card-body');

  // Wrap inner content for accurate height measurement
  if (!body.querySelector('.card-body-inner')) {
    const inner = document.createElement('div');
    inner.className = 'card-body-inner';
    while (body.firstChild) inner.appendChild(body.firstChild);
    body.appendChild(inner);
  }

  const inner = body.querySelector('.card-body-inner');

  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  body.style.height = isExpanded ? inner.offsetHeight + 'px' : '0px';

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));

    if (!expanded) {
      body.style.height = inner.offsetHeight + 'px';
    } else {
      // force reflow before collapsing for smooth transition
      body.style.height = inner.offsetHeight + 'px';
      requestAnimationFrame(() => {
        body.style.height = '0px';
      });
    }
  });
}

document.querySelectorAll('.timeline-card').forEach(setupCardBody);

// Recalculate expanded card heights on resize (text reflow changes height)
window.addEventListener('resize', () => {
  document.querySelectorAll('.card-header[aria-expanded="true"]').forEach(button => {
    const body = button.closest('.timeline-card').querySelector('.card-body');
    const inner = body.querySelector('.card-body-inner');
    body.style.height = inner.offsetHeight + 'px';
  });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealTargets = document.querySelectorAll(
  '.about-grid, .timeline-item, .skill-block, .edu-card, .contact-card'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// ============================================================
// i18n — IT / EN TOGGLE
// ============================================================
const translations = {
  en: {
    'hero.eyebrow': 'Backend Developer — Java &amp; Cloud Specialist',
    'hero.title1': 'I build backend systems',
    'hero.title2': 'designed to last and to scale.',
    'hero.lede': '7 years of experience with Java &amp; Kotlin microservices, event-driven architectures and cloud infrastructure. From re-engineering healthcare systems to managing identity at enterprise scale.',
    'hero.cta1': 'View experience',
    'hero.cta2': 'Download CV (PDF)',

    'about.heading': 'Profile',
    'about.p1': 'I&rsquo;m a Software Engineer specialized in backend development with Java and Kotlin, focused on microservices architectures on cloud platforms (AWS, Azure). I&rsquo;ve worked on re-engineering projects for public sector entities &mdash; including the Transplant Information System of the Italian Ministry of Health and a project for the Italian Ministry of Enterprises (MIMIT) &mdash; and on enterprise identity &amp; access management systems.',
    'about.p2': 'I&rsquo;m interested in event-driven systems, containerization, and everything related to CI/CD and cloud computing. In recent projects I&rsquo;ve contributed to functional and architectural decisions &mdash; from stack choices to data modeling &mdash; and I&rsquo;m aiming to grow into roles with greater technical responsibility.',
    'about.p3': 'Before software, I studied Architecture &mdash; a path that, on reflection, shares more with software engineering than it might seem: both are about structure, constraints, and systems built to hold up over time. Outside of work, I play the drums.',
    'about.meta.location': 'Based in',
    'about.meta.locationValue': 'San Benedetto del Tronto (AP), Italy',
    'about.meta.role': 'Current role',
    'about.meta.focus': 'Focus',
    'about.meta.languages': 'Languages',
    'about.meta.languagesValue': 'Italian (native) · English (B2)',

    'experience.heading': 'Work Experience',

    'exp.teamsystem.dates': 'Dec 2025 — Present',
    'exp.teamsystem.b1': 'Development, maintenance and deployment (CI/CD via GitLab and ArgoCD/Kubernetes) of Java/Kotlin microservices with Spring Boot in the IAM domain, both greenfield and on existing systems.',
    'exp.teamsystem.b2': 'Integration of services with Apache Kafka and Azure Service Bus for event-driven communication, cache management with Redis and database migrations with Flyway on PostgreSQL.',
    'exp.teamsystem.b3': 'Load testing of existing applications to identify performance bottlenecks.',
    'exp.teamsystem.b4': 'Authoring technical documentation on development processes, within a team of 12 people.',

    'exp.ibm.dates': 'May 2024 — Nov 2025',
    'exp.ibm.b1': 'Co-responsible, together with a colleague and under the supervision of the architect, for functional and architectural decisions on the backend of the MIMIT project (Java/Quarkus on AWS).',
    'exp.ibm.b2': 'Adapted application logic and data models following the database migration from relational to NoSQL, handling mismatches between the two paradigms.',
    'exp.ibm.b3': 'Developed serverless functions (AWS Lambda) for asynchronous generation of thumbnails from images uploaded by users.',

    'exp.softlab.dates': 'Jun 2023 — Dec 2023',
    'exp.softlab.b1': 'Design and development of Java/Spring Boot microservices for the Transplant Information System of the Italian Ministry of Health.',
    'exp.softlab.b2': 'Implementation of CI/CD pipelines to optimize the deployment process.',

    'exp.supernova.dates': 'May 2022 — Mar 2023',
    'exp.supernova.b1': 'Developed solutions on a C#/.NET stack for a warehouse management and order tracking system.',
    'exp.supernova.b2': 'Supported the implementation of both backend and frontend features.',

    'exp.relatech.dates': 'Nov 2021 — May 2022',
    'exp.relatech.b1': 'Created and automated test suites in Java for pharmaceutical retail applications, working alongside the development team to improve software quality.',

    'exp.gruppoSI.dates': 'Nov 2019 — Nov 2021',
    'exp.gruppoSI.b1': 'Developed and maintained SOAP and REST web services in Java and ObjectScript for healthcare projects, including requirements analysis and support in defining custom solutions.',

    'skills.heading': 'Skills',
    'skills.languages.title': 'Languages',
    'skills.frameworks.title': 'Architecture &amp; Frameworks',
    'skills.data.title': 'Databases &amp; Storage',
    'skills.cloud.title': 'Cloud &amp; DevOps',
    'skills.messaging.title': 'Messaging',
    'skills.testing.title': 'Testing &amp; Tooling',

    'education.heading': 'Education',
    'edu.webdev.title': 'Web Developer Course',
    'edu.webdev.dates': 'Jun 2019 — Oct 2019',
    'edu.webdev.desc': 'Intensive course on Java, Spring Boot, Databases and Algorithms, focused on building enterprise applications.',
    'edu.architecture.title': "Master&rsquo;s Degree in Architecture",
    'edu.architecture.dates': 'Oct 2009 — Apr 2013',
    'edu.architecture.desc': 'Studies in architectural design and composition, with a strong focus on structure, method, and systems thinking.',

    'contact.heading': 'Contact',
    'contact.email': 'Email',
    'contact.phone': 'Phone',

    'footer.top': 'Back to top ↑',
  }
};

// Cache original (Italian) text content for each i18n element so we can
// restore it when switching back to IT.
const i18nElements = Array.from(document.querySelectorAll('[data-i18n]'));
const originalText = new Map();
i18nElements.forEach(el => originalText.set(el, el.innerHTML));

const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');

function setLanguage(lang) {
  document.documentElement.lang = lang;

  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang === 'en' && translations.en[key]) {
      el.innerHTML = translations.en[key];
    } else {
      el.innerHTML = originalText.get(el);
    }
  });

  langOptions.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Swap CV download link
  const cvLink = document.getElementById('cvDownload');
  if (cvLink) {
    cvLink.setAttribute('href', lang === 'en'
      ? 'cv/CV_Edoardo_Ciarrocchi_EN.pdf'
      : 'cv/CV_Edoardo_Ciarrocchi.pdf');
  }

  // Re-measure any expanded accordion bodies after text length changes
  requestAnimationFrame(() => {
    document.querySelectorAll('.card-header[aria-expanded="true"]').forEach(button => {
      const body = button.closest('.timeline-card').querySelector('.card-body');
      const inner = body.querySelector('.card-body-inner');
      body.style.height = inner.offsetHeight + 'px';
    });
  });
}

langToggle.addEventListener('click', () => {
  const current = document.documentElement.lang === 'en' ? 'en' : 'it';
  setLanguage(current === 'it' ? 'en' : 'it');
});
