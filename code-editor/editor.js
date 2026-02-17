// Code templates for different languages
const codeTemplates = {
    javascript: `// Welcome to VS Code Editor!
// Full-stack JavaScript Development

// ES6+ Features
const greet = (name) => {
    return \`Hello, \${name}! Welcome to my portfolio.\`;
};

// Async/Await Example
async function fetchUserData(userId) {
    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Array Methods
const skills = ["React", "Node.js", "Python", "TypeScript", "AWS"];
const filteredSkills = skills
    .filter(skill => skill.length > 5)
    .map(skill => skill.toUpperCase());

console.log("My skills:", filteredSkills);

// Object Destructuring
const developer = {
    name: "Sadaka Wijerathna",
    role: "Full-stack Developer",
    experience: 5,
    skills: ["React", "Node.js", "Python"]
};

const { name, role, skills: devSkills } = developer;
console.log(\`\${name} is a \${role}\`);

// Promise Example
const loadData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data loaded successfully!");
        }, 1000);
    });
};

loadData().then(message => console.log(message));`,

    typescript: `// Welcome to VS Code Editor!
// TypeScript with Advanced Types

interface Developer {
    name: string;
    role: string;
    skills: string[];
    experience: number;
    contact?: {
        email: string;
        github: string;
    };
}

type ProjectStatus = 'planning' | 'development' | 'testing' | 'deployed';

interface Project {
    id: number;
    title: string;
    description: string;
    status: ProjectStatus;
    technologies: string[];
    startDate: Date;
}

// Generic Function
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// Class with Decorators
class Portfolio {
    private projects: Project[] = [];
    
    constructor(private developer: Developer) {}
    
    addProject(project: Project): void {
        this.projects.push(project);
        console.log(\`Added project: \${project.title}\`);
    }
    
    getProjectsByStatus(status: ProjectStatus): Project[] {
        return this.projects.filter(p => p.status === status);
    }
    
    get totalProjects(): number {
        return this.projects.length;
    }
}

// Usage Example
const me: Developer = {
    name: "Sadaka Wijerathna",
    role: "Full-stack Developer",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    experience: 5,
    contact: {
        email: "contact@malith.dev",
        github: "Malith-Rukshan"
    }
};

const myPortfolio = new Portfolio(me);

// Async/Await with Types
async function fetchProjects(): Promise<Project[]> {
    const response = await fetch('/api/projects');
    const data: Project[] = await response.json();
    return data;
}

// Union Types and Type Guards
type Response<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

function handleResponse<T>(response: Response<T>): T | null {
    if (response.success) {
        return response.data;
    } else {
        console.error(response.error);
        return null;
    }
}`,

    react: `// Welcome to VS Code Editor!
// React with TypeScript & Hooks

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface PortfolioProps {
    name: string;
    title: string;
    initialProjects?: Project[];
}

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
    name, 
    title, 
    initialProjects = [] 
}) => {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [filter, setFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch projects on mount
    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Memoized filtered projects
    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;
        return projects.filter(p => 
            p.technologies.some(tech => 
                tech.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [projects, filter]);

    // Callback for adding project
    const handleAddProject = useCallback((project: Project) => {
        setProjects(prev => [...prev, project]);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    if (isLoading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <motion.div 
            className="portfolio-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header className="portfolio-header">
                <h1>Hello, I'm {name}</h1>
                <h2>{title}</h2>
            </header>

            <div className="filter-bar">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('react')}>React</button>
                <button onClick={() => setFilter('node')}>Node.js</button>
                <button onClick={() => setFilter('python')}>Python</button>
            </div>

            <motion.div className="projects-grid">
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="technologies">
                            {project.technologies.map((tech, idx) => (
                                <span key={idx} className="tech-badge">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                View Project
                            </a>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Portfolio;`,

    python: `# Welcome to VS Code Editor!
# Python Full-stack Development

from typing import List, Dict, Optional, Union
from dataclasses import dataclass
from datetime import datetime
import asyncio
import aiohttp

@dataclass
class Developer:
    """Developer profile data class"""
    name: str
    role: str
    skills: List[str]
    experience: int
    contact: Optional[Dict[str, str]] = None
    
    def __post_init__(self):
        if self.experience < 0:
            raise ValueError("Experience cannot be negative")
    
    def add_skill(self, skill: str) -> None:
        """Add a new skill to the developer's skillset"""
        if skill not in self.skills:
            self.skills.append(skill)
            print(f"Added skill: {skill}")
    
    def get_experience_level(self) -> str:
        """Determine experience level based on years"""
        if self.experience < 2:
            return "Junior"
        elif self.experience < 5:
            return "Mid-level"
        else:
            return "Senior"

class Portfolio:
    """Portfolio management system"""
    
    def __init__(self, developer: Developer):
        self.developer = developer
        self.projects: List[Dict] = []
    
    def add_project(self, project: Dict) -> None:
        """Add a new project to portfolio"""
        required_fields = ['title', 'description', 'technologies']
        if not all(field in project for field in required_fields):
            raise ValueError("Missing required project fields")
        
        self.projects.append(project)
        print(f"Added project: {project['title']}")
    
    def get_projects_by_tech(self, technology: str) -> List[Dict]:
        """Filter projects by technology"""
        return [
            project for project in self.projects
            if technology.lower() in [
                tech.lower() for tech in project['technologies']
            ]
        ]
    
    @property
    def total_projects(self) -> int:
        """Get total number of projects"""
        return len(self.projects)

# Async function example
async def fetch_github_repos(username: str) -> List[Dict]:
    """Fetch GitHub repositories asynchronously"""
    url = f"https://api.github.com/users/{username}/repos"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                repos = await response.json()
                return repos
            else:
                raise Exception(f"Failed to fetch repos: {response.status}")

# List comprehension and filtering
def filter_skills(skills: List[str], min_length: int = 5) -> List[str]:
    """Filter skills by minimum length"""
    return [skill.upper() for skill in skills if len(skill) >= min_length]

# Main execution
if __name__ == "__main__":
    # Create developer instance
    me = Developer(
        name="Sadaka Wijerathna",
        role="Full-stack Developer",
        skills=["React", "Node.js", "Python", "TypeScript", "AWS"],
        experience=5,
        contact={
            "email": "contact@malith.dev",
            "github": "Malith-Rukshan"
        }
    )
    
    # Create portfolio
    portfolio = Portfolio(me)
    
    # Add sample project
    portfolio.add_project({
        "title": "LearniX AI",
        "description": "AI Learning Assistant",
        "technologies": ["Python", "TensorFlow", "FastAPI"],
        "status": "deployed"
    })
    
    print(f"Experience Level: {me.get_experience_level()}")
    print(f"Total Projects: {portfolio.total_projects}")
    
    # Filter skills
    filtered = filter_skills(me.skills)
    print(f"Filtered Skills: {filtered}")`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sadaka Wijerathna - Full-stack Developer Portfolio">
    <meta name="keywords" content="web developer, full-stack, React, Node.js, Python">
    <meta name="author" content="Sadaka Wijerathna">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Sadaka Wijerathna | Full-stack Developer">
    <meta property="og:description" content="Experienced web developer crafting modern applications">
    <meta property="og:image" content="/images/preview.jpg">
    <meta property="og:url" content="https://malith.dev">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Sadaka Wijerathna | Full-stack Developer">
    <meta name="twitter:description" content="Experienced web developer crafting modern applications">
    <meta name="twitter:image" content="/images/preview.jpg">
    
    <title>Sadaka Wijerathna | Full-stack Developer</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <img src="/images/logo.png" alt="Logo">
                <span>Sadaka Wijerathna</span>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">
                    Hi, I'm <span class="gradient-text">Sadaka Wijerathna</span>
                </h1>
                <h2 class="hero-subtitle">Full-stack Web Developer & AI Integration Specialist</h2>
                <p class="hero-description">
                    Crafting modern web applications with cutting-edge technologies.
                    Specializing in React, Node.js, Python, and AI-powered features.
                </p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn btn-primary">View Projects</a>
                    <a href="#contact" class="btn btn-outline">Get in Touch</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="/images/developer.svg" alt="Developer illustration">
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                <article class="project-card">
                    <div class="project-image">
                        <img src="/images/project1.jpg" alt="Project 1">
                    </div>
                    <div class="project-content">
                        <h3>LearniX AI</h3>
                        <p>AI-powered learning assistant with Sinhala language support</p>
                        <div class="project-tags">
                            <span class="tag">Python</span>
                            <span class="tag">TensorFlow</span>
                            <span class="tag">FastAPI</span>
                        </div>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </article>
                
                <!-- More project cards... -->
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <form class="contact-form" action="/api/contact" method="POST">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Sadaka Wijerathna. All rights reserved.</p>
            <div class="social-links">
                <a href="https://github.com/Malith-Rukshan" target="_blank" aria-label="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com/in/malith-rukshan" target="_blank" aria-label="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://t.me/MalithRukshan" target="_blank" aria-label="Telegram">
                    <i class="fab fa-telegram"></i>
                </a>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="script.js"></script>
</body>
</html>`,

    css: `/* Welcome to VS Code Editor! */
/* Modern CSS with Advanced Features */

/* CSS Variables (Custom Properties) */
:root {
    /* Colors */
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --text-color: #333333;
    --text-light: #666666;
    --bg-color: #ffffff;
    --bg-secondary: #f8f9fa;
    --border-color: #e0e0e0;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;
    
    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'Consolas', 'Monaco', 'Courier New', monospace;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;
}

/* Dark Mode Variables */
@media (prefers-color-scheme: dark) {
    :root {
        --text-color: #ffffff;
        --text-light: #cccccc;
        --bg-color: #1e1e1e;
        --bg-secondary: #2d2d2d;
        --border-color: #404040;
    }
}

/* Reset & Base Styles */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-primary);
    color: var(--text-color);
    background: var(--bg-color);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
}

h1 { font-size: 3rem; }
h2 { font-size: 2.5rem; }
h3 { font-size: 2rem; }

p {
    margin-bottom: var(--spacing-md);
}

/* Gradient Text */
.gradient-text {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-full);
    font-weight: 500;
    text-decoration: none;
    transition: all var(--transition-normal);
    cursor: pointer;
    border: 2px solid transparent;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-outline {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: transparent;
}

.btn-outline:hover {
    background: var(--primary-color);
    color: white;
}

/* Cards */
.card {
    background: var(--bg-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-normal);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

/* Grid System */
.grid {
    display: grid;
    gap: var(--spacing-lg);
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Flexbox Utilities */
.flex {
    display: flex;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

/* Responsive Design */
@media (max-width: 768px) {
    html {
        font-size: 14px;
    }
    
    .grid-2,
    .grid-3,
    .grid-4 {
        grid-template-columns: 1fr;
    }
    
    .container {
        padding: 0 var(--spacing-md);
    }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }
.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}`
};

// File metadata
const fileMetadata = {
    javascript: { name: 'app.js', icon: 'fab fa-js-square', color: '#f7df1e', language: 'JavaScript' },
    typescript: { name: 'app.ts', icon: 'fas fa-file-code', color: '#3178c6', language: 'TypeScript' },
    react: { name: 'Portfolio.tsx', icon: 'fab fa-react', color: '#61dafb', language: 'React' },
    python: { name: 'main.py', icon: 'fab fa-python', color: '#3776ab', language: 'Python' },
    html: { name: 'index.html', icon: 'fab fa-html5', color: '#e34c26', language: 'HTML' },
    css: { name: 'styles.css', icon: 'fab fa-css3-alt', color: '#264de4', language: 'CSS' }
};

// DOM Elements
const codeEditor = document.getElementById('codeEditor');
const lineNumbers = document.getElementById('lineNumbers');
const currentFileSpan = document.getElementById('currentFile');
const lineColSpan = document.getElementById('lineCol');
const languageModeSpan = document.getElementById('languageMode');
const minimapContent = document.getElementById('minimapContent');
const tabBar = document.querySelector('.tab-bar');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebar = document.querySelector('.sidebar');

// State
let currentFile = 'javascript';
let openTabs = ['javascript'];
let isMobileSidebarOpen = false;

// Initialize
function init() {
    loadFile('javascript');
    updateLineNumbers();
    updateStatus();
    updateMinimap();
    setupEventListeners();
}

// Load file content
function loadFile(fileType) {
    currentFile = fileType;
    codeEditor.value = codeTemplates[fileType];
    
    const metadata = fileMetadata[fileType];
    currentFileSpan.textContent = metadata.name;
    languageModeSpan.textContent = metadata.language;
    
    updateLineNumbers();
    updateStatus();
    updateMinimap();
    updateActiveStates();
}

// Update line numbers
function updateLineNumbers() {
    const lines = codeEditor.value.split('\n').length;
    let lineNumbersHTML = '';
    for (let i = 1; i <= lines; i++) {
        lineNumbersHTML += i + '\n';
    }
    lineNumbers.textContent = lineNumbersHTML;
}

// Update status bar
function updateStatus() {
    const text = codeEditor.value;
    const lines = text.split('\n');
    const cursorPosition = codeEditor.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPosition);
    const currentLine = textBeforeCursor.split('\n').length;
    const currentCol = textBeforeCursor.split('\n').pop().length + 1;
    
    lineColSpan.textContent = `Ln ${currentLine}, Col ${currentCol}`;
}

// Update minimap
function updateMinimap() {
    const text = codeEditor.value;
    const lines = text.split('\n');
    const maxLines = 200; // Limit for performance
    const displayLines = lines.slice(0, maxLines);
    minimapContent.textContent = displayLines.join('\n');
}

// Update active states
function updateActiveStates() {
    // Update file items
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.toggle('active', item.dataset.file === currentFile);
    });
    
    // Update tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.file === currentFile);
    });
}

// Add tab
function addTab(fileType) {
    if (openTabs.includes(fileType)) {
        loadFile(fileType);
        return;
    }
    
    openTabs.push(fileType);
    const metadata = fileMetadata[fileType];
    
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.dataset.file = fileType;
    tab.innerHTML = `
        <i class="${metadata.icon}" style="color: ${metadata.color};"></i>
        <span class="tab-name">${metadata.name}</span>
        <i class="fas fa-times tab-close"></i>
    `;
    
    tabBar.appendChild(tab);
    loadFile(fileType);
}

// Remove tab
function removeTab(fileType, event) {
    event.stopPropagation();
    
    const index = openTabs.indexOf(fileType);
    if (index > -1) {
        openTabs.splice(index, 1);
    }
    
    const tab = document.querySelector(`.tab[data-file="${fileType}"]`);
    if (tab) {
        tab.remove();
    }
    
    if (currentFile === fileType && openTabs.length > 0) {
        loadFile(openTabs[openTabs.length - 1]);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Code editor events
    codeEditor.addEventListener('input', () => {
        updateLineNumbers();
        updateStatus();
        updateMinimap();
    });
    
    codeEditor.addEventListener('keydown', (e) => {
        // Tab key handling
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            const value = codeEditor.value;
            
            codeEditor.value = value.substring(0, start) + '    ' + value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
            
            updateLineNumbers();
            updateStatus();
            updateMinimap();
        }
    });
    
    codeEditor.addEventListener('click', updateStatus);
    codeEditor.addEventListener('keyup', updateStatus);
    
    // Sync scroll
    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });
    
    // File item clicks
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const fileType = item.dataset.file;
            addTab(fileType);
            // Close sidebar on mobile after selecting a file
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
        });
    });
    
    // Tab clicks (using event delegation)
    tabBar.addEventListener('click', (e) => {
        const tab = e.target.closest('.tab');
        if (!tab) return;
        
        const closeBtn = e.target.closest('.tab-close');
        if (closeBtn) {
            removeTab(tab.dataset.file, e);
        } else {
            loadFile(tab.dataset.file);
        }
    });
    
    // Activity bar clicks
    document.querySelectorAll('.activity-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const view = icon.dataset.view;
            if (view) {
                switchSidebarView(view);
            }
            document.querySelectorAll('.activity-icon').forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
        });
    });
    
    // Mobile sidebar toggle
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    // Sidebar overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Toggle mobile sidebar
function toggleMobileSidebar() {
    isMobileSidebarOpen = !isMobileSidebarOpen;
    
    if (isMobileSidebarOpen) {
        sidebar.classList.add('mobile-open');
        sidebarOverlay.classList.add('active');
        mobileSidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
        mobileSidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Close mobile sidebar
function closeMobileSidebar() {
    if (isMobileSidebarOpen) {
        isMobileSidebarOpen = false;
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
        mobileSidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Handle window resize
function handleResize() {
    // Close mobile sidebar when resizing to desktop
    if (window.innerWidth > 768 && isMobileSidebarOpen) {
        closeMobileSidebar();
    }
}

// Switch sidebar view
function switchSidebarView(view) {
    const views = {
        'explorer': { title: 'EXPLORER', viewId: 'explorerView' },
        'search': { title: 'SEARCH', viewId: 'searchView' },
        'git': { title: 'SOURCE CONTROL', viewId: 'gitView' },
        'extensions': { title: 'EXTENSIONS', viewId: 'extensionsView' },
        'settings': { title: 'SETTINGS', viewId: 'settingsView' }
    };
    
    // Hide all views
    document.querySelectorAll('.sidebar-view').forEach(v => v.style.display = 'none');
    
    // Show selected view
    const selectedView = views[view];
    if (selectedView) {
        document.getElementById('sidebarTitle').textContent = selectedView.title;
        const viewElement = document.getElementById(selectedView.viewId);
        if (viewElement) {
            viewElement.style.display = 'block';
        }
    }
}

// Theme support - listen for theme changes from parent
window.addEventListener('message', (event) => {
    if (event.data.type === 'theme-change') {
        // VS Code editor stays in dark theme always
        // But you can add light theme support if needed
    }
});

// Initialize on load
window.addEventListener('load', init);

// Prevent context menu for more IDE-like feel
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.code-editor')) {
        // Allow default context menu for editor
        return;
    }
    // e.preventDefault(); // Uncomment to disable context menu everywhere
});

// Auto-save indicator (visual feedback)
let saveTimeout;
codeEditor.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        // Visual feedback that changes are "saved"
        const statusBar = document.querySelector('.status-bar');
        statusBar.style.background = '#28a745';
        setTimeout(() => {
            statusBar.style.background = '#007acc';
        }, 500);
    }, 1000);
});
