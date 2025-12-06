// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Header scroll effect and theme toggle
const headerEl = document.getElementById('site-header');
function handleScrollHeader() {
    if (!headerEl) return;
    const scrolled = window.scrollY > 8;
    headerEl.style.boxShadow = scrolled ? '0 6px 24px rgba(0,0,0,0.35)' : 'none';
}
window.addEventListener('scroll', handleScrollHeader);
handleScrollHeader();

// Theme handling
const themeToggleBtn = document.getElementById('theme-toggle');
const rootEl = document.documentElement;
const navToggleBtn = document.getElementById('nav-toggle');
const navCenter = document.querySelector('.nav-center');

function setTheme(theme) {
    if (theme === 'light') {
        rootEl.setAttribute('data-theme', 'light');
    } else {
        rootEl.removeAttribute('data-theme');
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    renderThemeIcon(theme);
}

function renderThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
        themeToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm7.071 2.429a1 1 0 0 1 0 1.414l-1.06 1.06a1 1 0 1 1-1.415-1.414l1.061-1.06a1 1 0 0 1 1.414 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm7.5 3a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V13a1 1 0 0 1 1-1ZM6.5 12a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V13a1 1 0 0 1 1-1Zm12.07 5.57a1 1 0 0 1-1.414 0l-1.06-1.061a1 1 0 0 1 1.414-1.414l1.06 1.061a1 1 0 0 1 0 1.414ZM12 17a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V18a1 1 0 0 1 1-1Zm-6.096.57a1 1 0 0 1-1.414-1.414l1.06-1.061a1 1 0 1 1 1.415 1.414L5.904 17.57ZM5.5 7.5A1 1 0 0 1 6.5 6.5l1.061 1.06A1 1 0 1 1 6.146 9.02L5.5 8.374a1 1 0 0 1 0-1.414Z"/></svg>';
    } else {
        themeToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>';
    }
}

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme || 'dark');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// Mobile nav toggle
if (navToggleBtn && navCenter) {
    navToggleBtn.addEventListener('click', () => {
        const isOpen = navCenter.classList.toggle('open');
        navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu when a link is clicked
    navCenter.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navCenter.classList.remove('open');
            navToggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe about content
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    observer.observe(aboutContent);
}

// Observe skills intro
const skillsIntro = document.querySelector('.skills-intro');
if (skillsIntro) {
    observer.observe(skillsIntro);
}

// Observe skill cards with stagger effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    observer.observe(card);
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Project cards are now dynamically generated and observed in renderProjects()

// Observe contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    observer.observe(contactForm);
}

// Form Validation
const contactFormElement = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Real-time validation functions
function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 2) {
        nameInput.classList.add('error');
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
        emailInput.classList.add('error');
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message.length < 10) {
        messageInput.classList.add('error');
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageInput.classList.remove('error');
        messageError.textContent = '';
        return true;
    }
}

// Add event listeners for real-time validation
nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', function() {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

messageInput.addEventListener('blur', validateMessage);
messageInput.addEventListener('input', function() {
    if (messageInput.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission handler
contactFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Form is valid - ready for backend integration
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Placeholder: Log to console (replace with API call later)
        console.log('Form submitted:', formData);
        
        // Show success message (you can enhance this with a toast notification)
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        contactFormElement.reset();
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        messageInput.classList.remove('error');
    }
});

// Chat Box Functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

let isChatOpen = false;

// Toggle chat window
function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle('active', isChatOpen);
    chatToggle.classList.toggle('active', isChatOpen);
    
    if (isChatOpen) {
        chatInput.focus();
    }
}

// Close chat window
function closeChat() {
    isChatOpen = false;
    chatWindow.classList.remove('active');
    chatToggle.classList.remove('active');
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get bot response (placeholder - ready for API integration)
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Simple placeholder responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! How can I help you today?";
    } else if (message.includes('project') || message.includes('work')) {
        return "Gokul has worked on various projects including E-Commerce APIs, Task Management Apps, and Real-Time Chat Platforms. Check out the Projects section for more details!";
    } else if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
        return "Gokul specializes in Python, FastAPI, Django, React, JavaScript, and modern web technologies. You can see all skills in the About section!";
    } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
        return "You can reach out through the Contact form on this page, or feel free to ask me anything else!";
    } else if (message.includes('experience') || message.includes('background')) {
        return "Gokul is a Fullstack Python Developer with expertise in building scalable web applications and APIs. He loves creating clean, efficient code!";
    } else {
        // Default responses
        const responses = [
            "That's interesting! Can you tell me more?",
            "I'm here to help! Feel free to ask about Gokul's projects, skills, or anything else.",
            "Thanks for your message! Is there anything specific you'd like to know?",
            "I'd be happy to help! What would you like to know about Gokul?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Simulate bot thinking (small delay for better UX)
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 500);
}

// Event listeners for chat
chatToggle.addEventListener('click', toggleChat);
chatClose.addEventListener('click', closeChat);

chatSend.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Close chat when clicking outside (optional enhancement)
document.addEventListener('click', function(e) {
    if (isChatOpen && 
        !chatWindow.contains(e.target) && 
        !chatToggle.contains(e.target)) {
        // Uncomment to enable click-outside-to-close
        // closeChat();
    }
});

// Initialize: Make sure chat is closed on page load
closeChat();

// ==================== CRUD Operations for Projects ====================

// Default projects data
const defaultProjects = [
    {
        id: 1,
        title: "E-Commerce API",
        description: "A robust RESTful API built with FastAPI featuring user authentication, product management, and order processing with real-time updates.",
        tags: ["Python", "FastAPI", "PostgreSQL"],
        link: ""
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A full-stack web application for managing tasks and projects with drag-and-drop functionality, team collaboration, and analytics dashboard.",
        tags: ["Django", "React", "Tailwind"],
        link: ""
    },
    {
        id: 3,
        title: "Real-Time Chat Platform",
        description: "A modern chat application with WebSocket support, file sharing, and end-to-end encryption for secure messaging.",
        tags: ["Python", "WebSocket", "JavaScript"],
        link: ""
    }
];

// Get projects from localStorage or use defaults
function getProjects() {
    const stored = localStorage.getItem('portfolio-projects');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('portfolio-projects', JSON.stringify(defaultProjects));
    return defaultProjects;
}

// Save projects to localStorage
function saveProjects(projects) {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
}

// Render projects on the page
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const projects = getProjects();
    const isAdminMode = document.getElementById('admin-toggle')?.classList.contains('active');
    const addProjectBtn = document.getElementById('add-project-btn') || createAddProjectButton();

    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, isAdminMode);
        projectsGrid.appendChild(projectCard);
        
        // Observe the card for animations
        observer.observe(projectCard);
        projectCard.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add "Add Project" button if in admin mode
    if (isAdminMode) {
        if (!document.getElementById('add-project-btn')) {
            projectsGrid.appendChild(addProjectBtn);
        } else {
            addProjectBtn.classList.add('show');
        }
    } else {
        const btn = document.getElementById('add-project-btn');
        if (btn) btn.classList.remove('show');
    }
}

// Create project card element
function createProjectCard(project, isAdminMode) {
    const card = document.createElement('div');
    card.className = `project-card ${isAdminMode ? 'admin-mode' : ''}`;
    card.dataset.projectId = project.id;

    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const linkHTML = project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : '';

    card.innerHTML = `
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">${tagsHTML}</div>
        ${linkHTML}
        ${isAdminMode ? `
            <div class="project-actions">
                <button class="project-action-btn edit" onclick="editProject(${project.id})" title="Edit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="project-action-btn delete" onclick="deleteProject(${project.id})" title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        ` : ''}
    `;

    return card;
}

// Create "Add Project" button
function createAddProjectButton() {
    const btn = document.createElement('button');
    btn.id = 'add-project-btn';
    btn.className = 'add-project-btn';
    btn.innerHTML = '+ Add New Project';
    btn.onclick = () => openProjectModal();
    return btn;
}

// Admin mode toggle
const adminToggle = document.getElementById('admin-toggle');
let isAdminMode = false;

if (adminToggle) {
    adminToggle.addEventListener('click', () => {
        isAdminMode = !isAdminMode;
        adminToggle.classList.toggle('active', isAdminMode);
        renderProjects();
    });
}

// Modal management
const adminModal = document.getElementById('admin-modal');
const projectForm = document.getElementById('project-form');
const modalTitle = document.getElementById('modal-title');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');

function openProjectModal(projectId = null) {
    if (!adminModal) return;
    
    if (projectId) {
        const projects = getProjects();
        const project = projects.find(p => p.id === projectId);
        if (project) {
            document.getElementById('project-id').value = project.id;
            document.getElementById('project-title').value = project.title;
            document.getElementById('project-description').value = project.description;
            document.getElementById('project-tags').value = project.tags.join(', ');
            document.getElementById('project-link').value = project.link || '';
            modalTitle.textContent = 'Edit Project';
        }
    } else {
        projectForm.reset();
        document.getElementById('project-id').value = '';
        modalTitle.textContent = 'Add New Project';
    }
    
    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!adminModal) return;
    adminModal.classList.remove('active');
    document.body.style.overflow = '';
    projectForm.reset();
}

if (closeModal) {
    closeModal.addEventListener('click', closeProjectModal);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', closeProjectModal);
}

// Close modal on outside click
if (adminModal) {
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            closeProjectModal();
        }
    });
}

// Form submission - Create/Update
if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const projectId = document.getElementById('project-id').value;
        const title = document.getElementById('project-title').value.trim();
        const description = document.getElementById('project-description').value.trim();
        const tagsInput = document.getElementById('project-tags').value.trim();
        const link = document.getElementById('project-link').value.trim();
        
        if (!title || !description || !tagsInput) {
            alert('Please fill in all required fields');
            return;
        }
        
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        const projects = getProjects();
        
        if (projectId) {
            // Update existing project
            const index = projects.findIndex(p => p.id === parseInt(projectId));
            if (index !== -1) {
                projects[index] = {
                    ...projects[index],
                    title,
                    description,
                    tags,
                    link
                };
                saveProjects(projects);
                renderProjects();
                closeProjectModal();
            }
        } else {
            // Create new project
            const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
            const newProject = {
                id: newId,
                title,
                description,
                tags,
                link
            };
            projects.push(newProject);
            saveProjects(projects);
            renderProjects();
            closeProjectModal();
        }
    });
}

// Edit project
window.editProject = function(projectId) {
    openProjectModal(projectId);
};

// Delete project
window.deleteProject = function(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = getProjects();
        const filtered = projects.filter(p => p.id !== projectId);
        saveProjects(filtered);
        renderProjects();
    }
};

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    // Enable ripple water effect on interactive elements
    enableRippleEffects([
        '.btn',
        '.nav-link',
        '.theme-toggle',
        '.nav-toggle',
        '.skill-card',
        '.project-card',
        '.project-action-btn',
        '.admin-toggle-btn',
        '.chat-toggle',
        '.chat-send',
        '.social-link'
    ]);
});

// Water ripple effect implementation
function enableRippleEffects(selectors) {
    const els = document.querySelectorAll(selectors.join(','));
    els.forEach((el) => {
        // Make element a ripple host
        el.classList.add('ripple-effect');
        el.addEventListener('pointerdown', createRippleCircle);
    });
}

function createRippleCircle(event) {
    const host = event.currentTarget;
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const circle = document.createElement('span');
    circle.className = 'ripple-circle';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    // Slightly different duration for larger elements
    if (host.classList.contains('project-card') || host.classList.contains('skill-card')) {
        circle.style.animationDuration = '900ms';
    }

    host.appendChild(circle);
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

