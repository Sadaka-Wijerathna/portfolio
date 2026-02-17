# Portfolio Website - Setup Instructions

## 🚨 IMPORTANT: You MUST use a local web server!

Your portfolio uses features that require a web server (not just opening the HTML file directly). This is because:
- **CORS Policy**: Browsers block local file access for security
- **TGS Animations**: Need HTTP protocol to load properly
- **Module Imports**: JavaScript modules require a server

## ✅ Quick Start (Easiest Method)

### Option 1: Using the Batch File (Windows)

1. **Double-click** `start-server.bat` in the portfolio folder
2. Your browser will automatically open at `http://localhost:8000`
3. The portfolio will work perfectly!
4. Press `Ctrl+C` in the command window to stop the server

**Requirements**: Python must be installed on your computer
- Download from: https://www.python.org/downloads/
- During installation, check "Add Python to PATH"

---

## 🔧 Alternative Methods

### Option 2: Using Python Manually

Open Command Prompt in the portfolio folder and run:

```bash
python -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

### Option 3: Using Node.js (if you have it installed)

```bash
npx http-server -p 8000
```

### Option 4: Using VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: Using PHP (if you have it installed)

```bash
php -S localhost:8000
```

---

## ✨ Features That Will Work

Once you run the local server:

✅ **TGS Animations** - All animated stickers will play  
✅ **Theme Toggle** - Switch between light and dark modes  
✅ **Theme Persistence** - Your theme choice is saved  
✅ **All Images** - Project images and icons load properly  
✅ **Smooth Scrolling** - Navigation works perfectly  

---

## 🐛 Troubleshooting

### Problem: "Python is not recognized"
**Solution**: Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation

### Problem: Port 8000 is already in use
**Solution**: Use a different port:
```bash
python -m http.server 8080
```
Then open: `http://localhost:8080`

### Problem: Theme is stuck on light mode
**Solution**: 
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page

### Problem: Animations still not showing
**Solution**:
1. Make sure you're accessing via `http://localhost:8000` (not `file:///`)
2. Check browser console for errors
3. Try a different browser (Chrome, Firefox, Edge)

---

## 📁 File Structure

```
portfolio/
├── index.html              # Main portfolio page
├── test.html              # Test page for diagnostics
├── start-server.bat       # Quick start script (Windows)
├── README.md              # This file
├── anim/                  # Animation files (.tgs)
├── images/                # All images
├── _app/                  # SvelteKit app files
├── css/                   # Stylesheets
├── js/                    # JavaScript files
└── fonts/                 # Font files
```

---

## 🎉 Enjoy Your Portfolio!

Once the server is running, your portfolio will work perfectly with:
- Smooth animations
- Working theme toggle
- All features enabled

**Need help?** Check the browser console (F12) for any error messages.
