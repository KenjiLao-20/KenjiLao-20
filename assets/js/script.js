/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════════════ */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks      = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('active');
  const icon = this.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ═══════════════════════════════════════════════════════════════
   HEADER SCROLL EFFECT
═══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
═══════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.05) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM (only if the form exists)
═══════════════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE FILTER
═══════════════════════════════════════════════════════════════ */
const filterButtons    = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    certificateCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE MODAL
═══════════════════════════════════════════════════════════════ */
const certificateModal = document.getElementById('certificateModal');
const modalImage       = document.getElementById('modalCertificateImage');
const modalTitle       = document.getElementById('modalCertificateTitle');
const modalProvider    = document.getElementById('modalCertificateProvider');
const modalDate        = document.getElementById('modalCertificateDate');
const modalDescription = document.getElementById('modalCertificateDescription');
const modalSkills      = document.getElementById('modalCertificateSkills');
const modalClose       = document.getElementById('certificateModalClose');
const modalPrev        = document.getElementById('modalPrev');
const modalNext        = document.getElementById('modalNext');

let currentModalIndex = 0;

const certificateData = [
  // 1. IT Specialist - Cybersecurity
  {
    title:       'IT Specialist - Cybersecurity',
    provider:    'Certiport (Pearson VUE)',
    date:        'Issued: 2025',
    image:       'assets/images/pic11.png',
    description: 'Foundational cybersecurity certification covering key security paradigms, terminology, and mindset. Recognizes the importance of security and threats to business.',
    skills:      ['Cybersecurity', 'Ethical Hacking', 'Information Security', 'Security Analyst', 'EC-Council']
  },
  // 2. Introduction to Data Science
  {
    title:       'Introduction to Data Science',
    provider:    'Cisco Networking Academy',
    date:        'Issued: 2025',
    image:       'assets/images/pic10.png',
    description: 'Overview of the promises and challenges of data analytics, its role in AI and Machine Learning, and career pathways in the field.',
    skills:      ['Data Science', 'Data Analytics', 'AI', 'Machine Learning', 'Career Pathways']
  },
  // 3. Data Analytics Essentials
  {
    title:       'Data Analytics Essentials',
    provider:    'Cisco Networking Academy',
    date:        'Issued: 2025',
    image:       'assets/images/pic9.png',
    description: 'Hands-on data analytics using Excel, SQL, and Tableau. Learn to transform, analyze, and present data to create business value.',
    skills:      ['Data Analytics', 'Excel', 'SQL', 'Tableau', 'Data Visualization']
  },
  // 4. AI Fundamentals
  {
    title:       'AI Fundamentals: Foundations for Understanding AI',
    provider:    'Cisco Networking Academy / IBM SkillsBuild',
    date:        'Issued: 2025',
    image:       'assets/images/pic8.png',
    description: 'Foundations of artificial intelligence, machine learning, neural networks, deep learning, bias and fairness, and practical applications of AI in everyday and professional contexts.',
    skills:      ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Deep Learning', 'AI Ethics']
  },
  // 5. Networking Basics
  {
    title:       'Networking Basics',
    provider:    'Netacad',
    date:        'Issued: 2025',
    image:       'assets/images/pic1.png',
    description: 'Completed comprehensive course covering the foundation of networking and network devices, media, and protocols. You will observe data flowing through a network and configure devices to connect to networks.',
    skills:      ['Networking', 'Cisco Packet Tracer']
  },
  // 6. Introduction to CSS (TESDA)
  {
    title:       'Introduction to CSS',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic2.png',
    description: 'Completed the prerequisite module for Computer Systems Servicing NC II. This course covers fundamental computer concepts and system servicing basics.',
    skills:      ['Computer Fundamentals', 'CSS']
  },
  // 7. Installing and Configuring Computer Systems (TESDA)
  {
    title:       'Installing and Configuring Computer Systems',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic3.png',
    description: 'Completed module about installing and configuring computer hardware and software, including system setup, driver installation, and basic troubleshooting.',
    skills:      ['Computer System', 'Hardware', 'Software']
  },
  // 8. Setting Up Computer Networks (TESDA)
  {
    title:       'Setting Up Computer Networks',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic4.png',
    description: 'Completed comprehensive module on setting up computer networks, including network design, cable installation, router configuration, and network troubleshooting.',
    skills:      ['Computer Networks', 'Network Setup', 'Troubleshooting']
  },
  // 9. Setting Up Computer Servers (TESDA)
  {
    title:       'Setting Up Computer Servers',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic5.png',
    description: 'Completed module on setting up computer servers, including server installation, configuration, user management, and server maintenance.',
    skills:      ['Computer Server', 'Server Configuration', 'User Management']
  },
  // 10. Maintaining Computer Systems and Networks (TESDA)
  {
    title:       'Maintaining Computer Systems and Networks',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic6.png',
    description: 'Completed comprehensive module on maintaining computer systems and networks, including preventive maintenance, system optimization, and network security basics.',
    skills:      ['Computer System', 'Computer Network', 'Maintenance', 'Troubleshooting']
  }
];

// Open modal on card click
certificateCards.forEach(card => {
  card.addEventListener('click', () => {
    openCertificateModal(parseInt(card.getAttribute('data-index')));
  });

  // View button inside card
  const viewBtn = card.querySelector('.view-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', e => {
      e.stopPropagation();
      openCertificateModal(parseInt(card.getAttribute('data-index')));
    });
  }
});

function openCertificateModal(index) {
  currentModalIndex = index;
  updateModalContent();
  certificateModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function updateModalContent() {
  const cert = certificateData[currentModalIndex];

  modalImage.src           = cert.image;
  modalImage.alt           = cert.title;
  modalTitle.textContent   = cert.title;
  modalProvider.textContent= cert.provider;
  modalDate.textContent    = cert.date;
  modalDescription.textContent = cert.description;

  // Build skill tags
  modalSkills.innerHTML = '';
  cert.skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className   = 'modal-skill-tag';
    tag.textContent = skill;
    modalSkills.appendChild(tag);
  });

  // Nav button states
  modalPrev.disabled = currentModalIndex === 0;
  modalNext.disabled = currentModalIndex === certificateData.length - 1;
}

function closeCertificateModal() {
  certificateModal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Close events
modalClose.addEventListener('click', closeCertificateModal);
certificateModal.addEventListener('click', e => {
  if (e.target === certificateModal) closeCertificateModal();
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!certificateModal.classList.contains('show')) return;
  if (e.key === 'Escape')      closeCertificateModal();
  if (e.key === 'ArrowLeft'  && currentModalIndex > 0)                         { currentModalIndex--; updateModalContent(); }
  if (e.key === 'ArrowRight' && currentModalIndex < certificateData.length - 1){ currentModalIndex++; updateModalContent(); }
});

// Prev / Next buttons
modalPrev.addEventListener('click', () => {
  if (currentModalIndex > 0) { currentModalIndex--; updateModalContent(); }
});
modalNext.addEventListener('click', () => {
  if (currentModalIndex < certificateData.length - 1) { currentModalIndex++; updateModalContent(); }
});

// Preload certificate images
window.addEventListener('load', () => {
  certificateData.forEach(cert => {
    const img = new Image();
    img.src = cert.image;
  });
});