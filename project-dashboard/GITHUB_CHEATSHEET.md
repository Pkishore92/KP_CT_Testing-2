# GitHub Quick Reference Cheat Sheet

## 🔑 Key Concepts

| Term | Simple Explanation | Example |
|------|-------------------|---------|
| **Repository** | Project folder that stores all your files | `project-dashboard` |
| **Commit** | Snapshot of your files with a description | "Added new projects" |
| **Branch** | Different version of your project | `main` (live version) |
| **GitHub Pages** | Free website hosting from your repository | `username.github.io/project-dashboard` |
| **Actions** | Automatic tasks (like building your website) | Build → Deploy workflow |

## 🌐 Your URLs

Replace `yourusername` and `project-dashboard` with your actual names:

- **Repository:** `https://github.com/yourusername/project-dashboard`
- **Live Website:** `https://yourusername.github.io/project-dashboard`
- **Settings:** `https://github.com/yourusername/project-dashboard/settings`
- **Actions:** `https://github.com/yourusername/project-dashboard/actions`

## 📝 Common Tasks

### Update Project Data
1. Go to your repository on GitHub
2. Navigate to `src/data/projects.json`
3. Click pencil icon (Edit)
4. Make your changes
5. Scroll down → Add commit message → "Commit changes"
6. Wait 2-3 minutes for automatic deployment

### Check Build Status
1. Go to **"Actions"** tab
2. Look for green checkmarks ✅ (success) or red X ❌ (failed)
3. Click on any build to see details

### Enable/Disable GitHub Pages
1. **Settings** → **Pages**
2. **Source:** "GitHub Actions" (to enable)
3. **Source:** "None" (to disable)

## 🚨 Emergency Fixes

### Website Shows 404 Error
```
1. Check: Settings → Pages → Source = "GitHub Actions"
2. Check: Actions tab for successful builds (green checkmarks)
3. Wait 5-10 minutes after first setup
4. Try incognito/private browsing mode
```

### Build Failed (Red X in Actions)
```
1. Go to Actions tab
2. Click the failed build (red X)
3. Read error message (usually JSON syntax error)
4. Fix the error in your file
5. Commit the fix
```

### Site Not Updating
```
1. Verify you clicked "Commit changes" 
2. Check Actions tab for recent builds
3. Wait 2-3 minutes for deployment
4. Hard refresh browser (Ctrl+F5 or Cmd+R)
```

## 📊 Project Data Format

Keep this format when adding new projects to `src/data/projects.json`:

```json
{
  "id": "unique-id",
  "name": "Project Name", 
  "description": "What this project does",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060,
    "address": "City, State"
  },
  "status": "Active",           // Active, Completed, or Planning
  "category": "Technology",     // Any category name
  "budget": 500000,            // Number (no commas)
  "completion": 75,            // 0-100
  "startDate": "2024-01-15",   // YYYY-MM-DD format
  "endDate": "2024-12-31",
  "teamLead": "Person Name",
  "teamSize": 8,               // Number
  "stakeholders": ["Company A", "Company B"],
  "tags": ["tag1", "tag2", "tag3"]
}
```

## 🎨 Quick Customizations

### Change Colors
Edit `src/index.css` and modify these variables:
```css
:root {
  --primary: oklch(0.7095 0.1628 244.91);    /* Main blue color */
  --secondary: oklch(0.97 0 0);              /* Light gray */
  --background: oklch(1 0 0);                /* White background */
}
```

### Update Site Title
Edit `index.html`:
```html
<title>Your Custom Title</title>
```

### Modify Stats Cards
Edit `src/components/Dashboard.tsx` around line 45-65

## 🔧 File Structure

```
project-dashboard/
├── src/
│   ├── data/
│   │   └── projects.json      ← Your project data
│   ├── components/
│   │   ├── Dashboard.tsx      ← Main page
│   │   ├── ProjectMap.tsx     ← Map component  
│   │   └── ProjectCard.tsx    ← Project cards
│   └── index.css              ← Styling/colors
├── index.html                 ← Page title/metadata
├── package.json               ← Project configuration
└── .github/workflows/
    └── deploy.yml             ← Auto-deployment
```

## 📱 Mobile-First Tips

Your dashboard is already mobile-responsive, but test on:
- Phone (portrait/landscape)
- Tablet 
- Desktop

## 🤝 Team Collaboration

### Add Team Members
1. **Settings** → **Manage access**
2. **Invite a collaborator**
3. Enter their GitHub username/email

### Review Changes
1. Team member creates **Pull Request**
2. You review and approve
3. Changes merge automatically
4. Website updates automatically

## 💡 Pro Tips

### Good Commit Messages
- ✅ "Added Q4 2024 projects"
- ✅ "Updated Solar Farm Alpha progress to 90%"
- ✅ "Fixed map loading on mobile devices"
- ❌ "Update"
- ❌ "Changes"
- ❌ "Fix stuff"

### Backup Your Work
- Your code is automatically backed up on GitHub
- Download anytime: **Code** → **Download ZIP**
- All changes tracked in commit history

### Performance
- Keep `projects.json` under 1MB
- Optimize any images you add
- Use simple, descriptive project names

## 📞 Getting Help

### GitHub Issues
If something's broken, create an issue in your repository:
1. **Issues** tab → **New issue**
2. Describe the problem
3. Tag team members for help

### GitHub Documentation
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Markdown Guide](https://guides.github.com/features/mastering-markdown/)

## 🎯 Success Metrics

Track your dashboard's success:
- **Usage:** GitHub provides visitor statistics
- **Team Adoption:** How often data gets updated
- **Stakeholder Feedback:** Share the URL and gather input
- **Project Visibility:** Better project tracking and communication

---

**Remember:** Start simple, learn as you go. GitHub has millions of users - you're in good company! 🚀