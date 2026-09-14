const projects = [
  {
    number: '01',
    title: 'RaktSetu',
    summary: 'A blood donation network website interface connecting urgent requests, available donors, and nearby hospitals.',
    description: 'RaktSetu brings blood requests, donor availability, hospital coordination, and matching activity into one practical dashboard for faster response.',
    tags: ['React', 'TypeScript', 'AI'],
    role: 'Founding product engineer',
    stack: 'React / TypeScript / AI',
    year: '2025',
    link: '#contact',
    github: 'https://github.com',
    visual: 'assets/raktsetu-dashboard.svg'
  },
  {
    number: '02',
    title: 'DevOpsBot',
    summary: 'An autonomous fix workflow that detects errors, proposes patches, validates changes, and prepares pull requests.',
    description: 'DevOpsBot moves from error detection to context assembly, fix generation, local validation, pull request creation, and reporting in one guided workflow.',
    tags: ['Python', 'Kafka', 'Automation'],
    role: 'Platform + automation',
    stack: 'Python / Kafka / AWS',
    year: '2024',
    link: '#contact',
    github: 'https://github.com',
    visual: 'assets/devopsbot-workflow.svg'
  }
];

const projectList = document.querySelector('#project-list');
const dialog = document.querySelector('#project-dialog');
const closeDialog = document.querySelector('.dialog-close');

projectList.innerHTML = projects.map((project, index) => `
  <article class="project-card reveal" style="animation-delay: ${index * 0.12}s">
    <div class="project-visual">
      ${project.visualType === 'site' ? `<iframe class="project-site-preview" src="${project.visual}" title="${project.title} live website preview" loading="lazy"></iframe>` : project.visual ? `<img class="project-image" src="${project.visual}" alt="${project.title} website interface preview" />` : '<div class="mock-window" aria-hidden="true"><div class="mock-bar"></div><div class="mock-lines"><i></i><i></i><i></i></div></div>'}
    </div>
    <div class="project-info">
      <span class="project-index">${project.number} / 0${projects.length}</span>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <button class="project-open" type="button" data-project="${index}">Explore project</button>
    </div>
  </article>
`).join('');

function openProject(project) {
  document.querySelector('#dialog-kicker').textContent = `${project.number} / selected work`;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-role').textContent = project.role;
  document.querySelector('#dialog-stack').textContent = project.stack;
  document.querySelector('#dialog-year').textContent = project.year;
  document.querySelector('#dialog-link').href = project.link;
  document.querySelector('#dialog-github').href = project.github;
  dialog.showModal();
}

document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => openProject(projects[button.dataset.project]));
});

closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('.menu-toggle').addEventListener('click', event => {
  const navigation = document.querySelector('.nav-links');
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('is-open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealItems.forEach(item => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => revealObserver.observe(item));
}

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('main section[id]')];

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      card.style.setProperty('--tilt-x', `${y * -1.5}deg`);
      card.style.setProperty('--tilt-y', `${x * 1.5}deg`);
      card.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}
