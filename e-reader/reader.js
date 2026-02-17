// State
let currentPageIndex = 0;
let fontSize = 16;
let lineHeight = 1.6;
let zoomLevel = 100;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let isZooming = false;

// DOM Elements
const librarySidebar = document.getElementById('librarySidebar');
const settingsPanel = document.getElementById('settingsPanel');
const leftContent = document.getElementById('leftContent');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const bookTitle = document.getElementById('bookTitle');
const bookContainer = document.getElementById('bookContainer');
const book = document.getElementById('book');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');

// Load PDF.js
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
script.onload = () => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    init();
};
document.head.appendChild(script);

// Initialize
function init() {
    // Force dark mode permanently
    document.body.classList.add('night-mode');
    
    // Prevent keyboard events from bubbling to parent window
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || 
            e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
    
    // Prevent scroll events from bubbling to parent
    document.addEventListener('scroll', (e) => {
        e.stopPropagation();
    }, true);
    
    // Prevent wheel events from bubbling to parent when inside the reader
    document.addEventListener('wheel', (e) => {
        e.stopPropagation();
    }, true);
    
    setupEventListeners();
    loadPDF('data-and-information.pdf');
}

// Load PDF
async function loadPDF(pdfPath) {
    try {
        const loadingTask = pdfjsLib.getDocument({
            url: pdfPath,
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true
        });
        pdfDoc = await loadingTask.promise;
        
        totalPagesSpan.textContent = pdfDoc.numPages;
        bookTitle.textContent = 'Data and Information';
        
        currentPageIndex = 1;
        await renderAllPages();
        updatePageIndicator();
        setupScrollTracking();
    } catch (error) {
        console.error('Error loading PDF:', error);
        leftContent.innerHTML = '<p style="color: red; padding: 20px;">Error loading PDF file. Please make sure the PDF exists.</p>';
    }
}

// Render page
async function renderPage(num) {
    pageRendering = true;
    
    try {
        const page = await pdfDoc.getPage(num);
        
        // Calculate scale to fit width
        const containerWidth = bookContainer.clientWidth - 100;
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min((containerWidth / viewport.width) * (zoomLevel / 100), 2);
        const scaledViewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page';
        canvas.dataset.page = num;
        canvas.style.marginBottom = '20px';
        const context = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        leftContent.appendChild(canvas);
        
        pageRendering = false;
        
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
    } catch (error) {
        console.error('Error rendering page:', error);
        pageRendering = false;
    }
}

// Render all pages for scrolling
async function renderAllPages(skipThumbnails = false) {
    leftContent.innerHTML = '';
    
    if (!skipThumbnails) {
        const pagesContainer = document.getElementById('pagesContainer');
        pagesContainer.innerHTML = '';
    }
    
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        await renderPage(i);
        if (!skipThumbnails) {
            await renderPageThumbnail(i);
        }
    }
}

// Render page thumbnail for sidebar
async function renderPageThumbnail(num) {
    try {
        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: 0.3 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
        
        const pageItem = document.createElement('div');
        pageItem.className = 'page-item';
        if (num === currentPageIndex) {
            pageItem.classList.add('active');
        }
        pageItem.dataset.page = num;
        
        const pageThumb = document.createElement('div');
        pageThumb.className = 'page-thumb';
        pageThumb.appendChild(canvas);
        
        const pageLabel = document.createElement('div');
        pageLabel.className = 'page-label';
        pageLabel.textContent = `Page ${num}`;
        
        pageItem.appendChild(pageThumb);
        pageItem.appendChild(pageLabel);
        
        pageItem.addEventListener('click', () => {
            scrollToPage(num);
        });
        
        document.getElementById('pagesContainer').appendChild(pageItem);
    } catch (error) {
        console.error('Error rendering thumbnail:', error);
    }
}

// Setup scroll tracking to update current page
let scrollHandler = null;
function setupScrollTracking() {
    // Remove old handler if exists
    if (scrollHandler) {
        bookContainer.removeEventListener('scroll', scrollHandler);
    }
    
    let scrollTimeout;
    scrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCurrentPageFromScroll();
        }, 100);
    };
    
    bookContainer.addEventListener('scroll', scrollHandler);
}

// Update current page based on scroll position
function updateCurrentPageFromScroll() {
    // Don't update during zoom operations
    if (isZooming) return;
    
    const canvases = leftContent.querySelectorAll('.pdf-page');
    const containerTop = bookContainer.scrollTop;
    const containerHeight = bookContainer.clientHeight;
    const viewportCenter = containerTop + containerHeight / 2;
    
    let closestPage = 1;
    let closestDistance = Infinity;
    
    canvases.forEach((canvas) => {
        const pageNum = parseInt(canvas.dataset.page);
        const canvasTop = canvas.offsetTop;
        const canvasCenter = canvasTop + canvas.offsetHeight / 2;
        const distance = Math.abs(viewportCenter - canvasCenter);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestPage = pageNum;
        }
    });
    
    if (closestPage !== currentPageIndex) {
        currentPageIndex = closestPage;
        updatePageIndicator();
        updateActiveThumbnail();
    }
}

// Update active thumbnail in sidebar
function updateActiveThumbnail() {
    const pageItems = document.querySelectorAll('.page-item');
    pageItems.forEach(item => {
        if (parseInt(item.dataset.page) === currentPageIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Scroll to specific page
function scrollToPage(pageNum) {
    const canvas = leftContent.querySelector(`[data-page="${pageNum}"]`);
    if (canvas) {
        canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Apply zoom
async function applyZoom() {
    // Prevent concurrent zoom operations
    if (isZooming) return;
    
    // Block all scroll tracking
    isZooming = true;
    
    // Disable zoom buttons during operation
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    zoomButtons.forEach(btn => btn.disabled = true);
    
    const savedPage = currentPageIndex;
    
    // Calculate current scroll position relative to the current page
    const currentCanvas = leftContent.querySelector(`[data-page="${savedPage}"]`);
    let relativeScrollPosition = 0;
    
    if (currentCanvas) {
        const canvasTop = currentCanvas.offsetTop;
        const canvasHeight = currentCanvas.offsetHeight;
        const containerScrollTop = bookContainer.scrollTop;
        const containerHeight = bookContainer.clientHeight;
        const viewportCenter = containerScrollTop + containerHeight / 2;
        
        // Calculate how far down the page the viewport center is (as percentage)
        relativeScrollPosition = (viewportCenter - canvasTop) / canvasHeight;
    }
    
    // Re-render all pages with new zoom
    await renderAllPages(true);
    document.getElementById('zoomLevel').textContent = zoomLevel + '%';
    
    // Wait for rendering to complete and DOM to update
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Use requestAnimationFrame to ensure layout is complete
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    // Restore scroll position based on relative position
    const newCanvas = leftContent.querySelector(`[data-page="${savedPage}"]`);
    if (newCanvas) {
        const newCanvasTop = newCanvas.offsetTop;
        const newCanvasHeight = newCanvas.offsetHeight;
        const containerHeight = bookContainer.clientHeight;
        
        // Calculate the new absolute scroll position
        const targetScrollPosition = newCanvasTop + (newCanvasHeight * relativeScrollPosition) - (containerHeight / 2);
        
        // Smoothly scroll to the target position
        bookContainer.scrollTo({
            top: Math.max(0, targetScrollPosition),
            behavior: 'auto'
        });
    }
    
    // Force update the page indicator
    currentPageIndex = savedPage;
    updatePageIndicator();
    updateActiveThumbnail();
    
    // Wait a bit before re-enabling scroll tracking
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Re-enable zoom buttons
    zoomButtons.forEach(btn => btn.disabled = false);
    
    // Re-enable scroll tracking
    isZooming = false;
}

// Navigation
function nextPage() {
    if (currentPageIndex >= pdfDoc.numPages) {
        return;
    }
    currentPageIndex++;
    scrollToPage(currentPageIndex);
    updatePageIndicator();
}

function prevPage() {
    if (currentPageIndex <= 1) {
        return;
    }
    currentPageIndex--;
    scrollToPage(currentPageIndex);
    updatePageIndicator();
}

// Update page indicator
function updatePageIndicator() {
    currentPageSpan.textContent = currentPageIndex;
    // Navigation buttons removed - display only
}

// Zoom controls - Completely rewritten
function handleZoomIn(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    
    // Do nothing - UI only
    console.log('Zoom In clicked - UI only, no action');
    return false;
}

function handleZoomOut(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    
    // Do nothing - UI only
    console.log('Zoom Out clicked - UI only, no action');
    return false;
}

function handleFitToWidth(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    
    // Do nothing - UI only
    console.log('Fit to Width clicked - UI only, no action');
    return false;
}

// Print
function printDocument() {
    window.print();
}

// Event listeners
function setupEventListeners() {
    // Library
    document.getElementById('libraryBtn').addEventListener('click', () => {
        librarySidebar.classList.toggle('open');
        settingsPanel.classList.remove('open');
    });
    
    document.getElementById('closeLibrary').addEventListener('click', () => {
        librarySidebar.classList.remove('open');
    });
    
    // Navigation buttons removed - page indicator display only
    
    // Zoom - Using mousedown instead of click to prevent conflicts
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const fitWidthBtn = document.getElementById('fitWidthBtn');
    
    zoomInBtn.addEventListener('mousedown', handleZoomIn, true);
    zoomInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    zoomOutBtn.addEventListener('mousedown', handleZoomOut, true);
    zoomOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    fitWidthBtn.addEventListener('mousedown', handleFitToWidth, true);
    fitWidthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    // Print
    document.getElementById('printBtn').addEventListener('click', printDocument);
    
    // Settings
    document.getElementById('settingsBtn').addEventListener('click', () => {
        settingsPanel.classList.toggle('open');
        librarySidebar.classList.remove('open');
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
        settingsPanel.classList.remove('open');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Check if we're focused on the e-reader
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            nextPage();
            return false;
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            prevPage();
            return false;
        }
        // Zoom keyboard shortcuts removed - UI only
    }, true);
    
    // Close panels when clicking outside
    document.addEventListener('click', (e) => {
        if (!librarySidebar.contains(e.target) && 
            !document.getElementById('libraryBtn').contains(e.target)) {
            librarySidebar.classList.remove('open');
        }
        if (!settingsPanel.contains(e.target) && 
            !document.getElementById('settingsBtn').contains(e.target)) {
            settingsPanel.classList.remove('open');
        }
    });
}
