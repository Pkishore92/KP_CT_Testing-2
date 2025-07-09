# Project Dashboard - User Guide

## Overview

This is a **completely free and open-source** project visualization dashboard that helps teams track, manage, and visualize projects on an interactive map and grid view. Built with modern web technologies and designed for easy sharing and collaboration.

## Features

- 📍 **Interactive Map View** - Visualize projects geographically using OpenStreetMap
- 📋 **Grid View** - Browse projects in a card-based layout
- 🔍 **Search & Filter** - Find projects by name, description, team lead, or tags
- 📊 **Project Statistics** - Overview of project status and budgets
- 📱 **Mobile Responsive** - Works on all devices
- 🎨 **Professional Design** - Clean, modern interface with dark/light mode support

## Technology Stack (All Free & Open Source)

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS V4 + shadcn/ui components  
- **Maps**: Leaflet + OpenStreetMap (no API keys required)
- **Package Manager**: Bun (faster than npm)
- **Deployment**: Can be deployed free on GitHub Pages, Netlify, or Vercel

## How to Update Project Data

### Method 1: Edit JSON File (Recommended for non-technical users)

1. Open `src/data/projects.json`
2. Add/edit project entries using this format:

```json
{
  \"id\": \"unique-project-id\",
  \"name\": \"Project Name\",
  \"description\": \"Brief project description\",
  \"location\": {
    \"lat\": 40.7128,
    \"lng\": -74.0060,
    \"address\": \"City, State\"
  },
  \"status\": \"Active\", // \"Active\", \"Completed\", \"Planning\"
  \"category\": \"Technology\",
  \"budget\": 500000,
  \"completion\": 75, // 0-100
  \"startDate\": \"2024-01-15\",
  \"endDate\": \"2024-12-31\",
  \"teamLead\": \"Team Leader Name\",
  \"teamSize\": 8,
  \"stakeholders\": [\"Stakeholder 1\", \"Stakeholder 2\"],
  \"tags\": [\"tag1\", \"tag2\", \"tag3\"]
}
```

### Method 2: Connect to External Data Source

For advanced users, you can modify `src/components/Dashboard.tsx` to fetch data from:
- Google Sheets API
- Airtable API  
- REST API endpoint
- CSV files uploaded to the project

## Getting Coordinates for New Projects

1. **Google Maps**: Right-click on location → click coordinates to copy
2. **OpenStreetMap**: Right-click → \"Show address\" → copy lat/lng
3. **GPS Coordinates**: Use any GPS app or online geocoding service

## Deployment Options (All Free)

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select \"Deploy from a branch\" 
4. Choose main branch / root folder
5. Your dashboard will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Create account at netlify.com
2. Drag & drop your project folder
3. Automatic deployment and custom domain support

### Vercel
1. Connect your GitHub repository to vercel.com
2. Automatic deployments on every code change

## Customization

### Colors & Theme
- Edit `src/index.css` to change color scheme
- Modify `--primary`, `--secondary` CSS variables

### Project Categories
- Categories are automatically generated from your data
- Add new categories by including them in project entries

### Map Settings
- Change default map center in `src/components/ProjectMap.tsx`
- Modify zoom level and map tiles if needed

### Project Card Layout
- Customize fields shown in `src/components/ProjectCard.tsx`
- Add/remove information displayed on cards

## Team Workflow

1. **Project Manager**: Updates `projects.json` with new project data
2. **Automatic Build**: Site rebuilds automatically (if using GitHub/Netlify/Vercel)
3. **Team Access**: Share the live URL with stakeholders
4. **Version Control**: All changes are tracked in Git history
5. **Collaboration**: Team members can suggest changes via pull requests

## Maintenance

- **No servers to maintain** - it's a static site
- **No database costs** - data stored in JSON files
- **Automatic security updates** - handled by hosting platforms
- **Backup**: Your data is version controlled in Git

## Support

This dashboard is built with standard web technologies. For customization:
- React documentation: reactjs.org
- Leaflet maps: leafletjs.com  
- shadcn/ui components: ui.shadcn.com
- TailwindCSS: tailwindcss.com

## Sample Data Structure

The dashboard comes with 8 sample projects across different categories:
- Renewable Energy (Solar Farm, Waste-to-Energy)
- Community Development (Urban Gardens)
- Technology (Smart Water Management, Digital Learning)
- Environmental (Coastal Restoration)
- Transportation (Clean Fleet)
- Conservation (Mountain Trails)

You can use these as templates and replace with your actual project data.

---

**Total Cost: $0** - Everything is free and open source!