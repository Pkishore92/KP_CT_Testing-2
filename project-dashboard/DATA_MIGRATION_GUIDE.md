# 📋 Step-by-Step Data Migration Guide

## Overview

This guide shows you exactly how to replace the sample data with your own polygon and point layer data for your 6 locations.

## 🎯 Your Goal

Transform the sample dashboard into a professional geospatial visualization tool showing:
- **Polygon layers** - Boundaries, zones, development areas for each location
- **Point layers** - Facilities, access points, landmarks, services
- **Interactive controls** - Toggle layers on/off, click for details
- **Professional presentation** - Ready to share with stakeholders

## 📁 What You Have vs What You Need

### Your Current Data (What you might have):
- Shapefiles (.shp, .dbf, .shx files)
- KML/KMZ files from Google Earth
- CAD files (DWG, DXF)
- CSV files with coordinates
- ArcGIS data

### What the Dashboard Needs:
- **GeoJSON format** - Web-friendly geospatial data format
- **Organized file structure** - Polygons and points in separate folders
- **Consistent naming** - Following the pattern I've established
- **Updated project metadata** - Coordinates and references to your data

## 🔄 Step 1: Convert Your Data to GeoJSON

### Option A: Online Conversion (Easiest)
1. **Go to mapshaper.org**
2. **Drag/drop your shapefile** (.shp + .dbf + .shx together)
3. **Click "Export"** → **Format: GeoJSON**
4. **Download the .geojson file**

### Option B: QGIS (Free GIS Software)
1. **Download QGIS** (free at qgis.org)
2. **Open your data** (File → Open → Select your shapefile/KML)
3. **Right-click layer** → Export → Save Features As
4. **Format: GeoJSON** → Save

### Option C: ArcGIS (If you have it)
1. **Open ArcGIS Pro/ArcMap**
2. **Use "Features to JSON" tool**
3. **Output format: GeoJSON**

## 📋 Step 2: Organize Your Converted Files

### Naming Convention:
Follow this pattern for your 6 locations:

```
Polygons:
- location1_boundary.geojson  (your first site)
- location2_boundary.geojson  (your second site)
- location3_boundary.geojson
- location4_boundary.geojson
- location5_boundary.geojson
- location6_boundary.geojson

Points:
- location1_facilities.geojson
- location2_facilities.geojson
- location3_facilities.geojson
- location4_facilities.geojson
- location5_facilities.geojson
- location6_facilities.geojson
```

### File Placement:
```
src/data/geospatial/
├── polygons/
│   ├── location1_boundary.geojson  ← Your polygon data here
│   ├── location2_boundary.geojson
│   └── ... (up to location6)
└── points/
    ├── location1_facilities.geojson  ← Your point data here
    ├── location2_facilities.geojson
    └── ... (up to location6)
```

## 📝 Step 3: Update Project Metadata

### Edit `src/data/projects.json`:

Replace the sample data with your real project information:

```json
[
  {
    "id": "location-1",  // Keep this format: location-1, location-2, etc.
    "name": "YOUR PROJECT NAME",
    "description": "YOUR PROJECT DESCRIPTION",
    "location": {
      "lat": YOUR_LATITUDE,      // Center point of your project
      "lng": YOUR_LONGITUDE,     // Center point of your project  
      "address": "YOUR ADDRESS",
      "bounds": {                // Optional: Define rectangular bounds
        "north": NORTH_LAT,
        "south": SOUTH_LAT, 
        "east": EAST_LNG,
        "west": WEST_LNG
      }
    },
    "geospatial": {
      "polygon": "/src/data/geospatial/polygons/location1_boundary.geojson",
      "points": "/src/data/geospatial/points/location1_facilities.geojson",
      "layers": ["boundary", "facilities"]  // Customize as needed
    },
    "status": "Active",           // "Active", "Completed", "Planning"
    "category": "YOUR CATEGORY",  // Development, Infrastructure, etc.
    "budget": YOUR_BUDGET,        // Number without commas
    "completion": 65,             // 0-100 percentage
    "startDate": "2024-01-15",    // YYYY-MM-DD format
    "endDate": "2024-12-31",
    "teamLead": "YOUR TEAM LEAD",
    "teamSize": 8,
    "stakeholders": ["Stakeholder 1", "Stakeholder 2"],
    "tags": ["tag1", "tag2", "tag3"]
  }
  // Repeat for your other 5 locations...
]
```

### Quick Data Collection Template:

| Field | Location 1 | Location 2 | Location 3 | Location 4 | Location 5 | Location 6 |
|-------|------------|------------|------------|------------|------------|------------|
| **Name** | | | | | | |
| **Description** | | | | | | |
| **Address** | | | | | | |
| **Latitude** | | | | | | |
| **Longitude** | | | | | | |
| **Status** | | | | | | |
| **Category** | | | | | | |
| **Budget** | | | | | | |
| **Completion %** | | | | | | |
| **Team Lead** | | | | | | |
| **Team Size** | | | | | | |

## 🗺️ Step 4: Get Coordinates for Your Locations

### Method A: Google Maps
1. **Right-click on your location** in Google Maps
2. **Click the coordinates** that appear (they'll copy automatically)
3. **Format is: Latitude, Longitude** (e.g., "40.7589, -73.9851")

### Method B: Google Earth
1. **Find your location** in Google Earth
2. **Look at bottom-right corner** for coordinates
3. **Use decimal degrees format**

### Method C: GPS Device/Phone
1. **Use any GPS app** that shows decimal coordinates
2. **Stand at the center** of your project area
3. **Record the lat/lng values**

## 🔧 Step 5: Customize Layer Configuration

### Edit `src/data/geospatial/layers.json`:

Update the categories to match your project types:

```json
{
  "categories": {
    "YOUR_CATEGORY_1": {
      "color": "#3b82f6",      // Blue
      "icon": "building",      // Icon name
      "description": "Description of this category"
    },
    "YOUR_CATEGORY_2": {
      "color": "#10b981",      // Green  
      "icon": "tree",
      "description": "Another category description"
    }
    // Add more categories as needed
  }
}
```

### Color Options:
- **Blue**: `#3b82f6`
- **Green**: `#10b981` 
- **Orange**: `#f59e0b`
- **Purple**: `#8b5cf6`
- **Red**: `#ef4444`
- **Teal**: `#06b6d4`

## 📤 Step 6: Upload Your Data

### Using GitHub Web Interface:
1. **Navigate to your repository** on GitHub
2. **Go to `src/data/geospatial/polygons/`**
3. **Click "Add file" → "Upload files"**
4. **Drag your polygon .geojson files**
5. **Repeat for the `points/` folder**
6. **Update `projects.json`** by clicking the edit (pencil) icon
7. **Commit changes** with message "Updated with real project data"

### Your Dashboard Will Automatically:
- **Rebuild in 2-3 minutes**
- **Display your polygon boundaries**
- **Show your point locations**
- **Include interactive popups** with your data
- **Provide layer toggle controls**

## ✅ Quality Check

Before publishing, verify:

### Data Validation:
- [ ] **GeoJSON files are valid** (test at geojsonlint.com)
- [ ] **Coordinates are in correct location** (check on map)
- [ ] **File names match** the references in projects.json
- [ ] **All 6 locations have both polygon and point files**

### Content Check:
- [ ] **Project names are accurate**
- [ ] **Descriptions are professional**
- [ ] **Coordinates center on your actual locations**
- [ ] **Status reflects current project state**
- [ ] **Budget and timeline data is current**

### Visual Check:
- [ ] **Map zooms to show all your locations**
- [ ] **Polygons display in correct locations**
- [ ] **Points appear within/near polygons**
- [ ] **Layer controls work properly**
- [ ] **Popups show correct information**

## 🎨 Step 7: Customize Appearance (Optional)

### Update Site Title:
Edit `index.html`:
```html
<title>Your Organization Project Dashboard</title>
```

### Customize Colors:
Edit `src/index.css` to match your brand colors:
```css
:root {
  --primary: oklch(0.7095 0.1628 244.91);  /* Your primary color */
}
```

### Add Your Logo:
1. **Add logo file** to `public/` folder
2. **Update the header** in `src/components/Dashboard.tsx`

## 🚀 Step 8: Go Live

Once you've updated all your data:

1. **Commit all changes** to GitHub
2. **Wait 2-3 minutes** for automatic build
3. **Visit your live dashboard** at `yourusername.github.io/project-dashboard`
4. **Test all functionality**
5. **Share the URL** with your team!

## 📊 Sample Data Structure Examples

### Your Polygon Properties Should Include:
```json
{
  "name": "Zone Name",
  "project_id": "location-1", 
  "zone_type": "residential",
  "area_sqft": 125000,
  "description": "Detailed description"
}
```

### Your Point Properties Should Include:
```json
{
  "name": "Facility Name",
  "project_id": "location-1",
  "type": "facility",        // facility, access, service, landmark
  "description": "What this point represents",
  "status": "planned",       // planned, under_construction, completed
  "capacity": 100
}
```

## 🆘 Common Issues & Solutions

### Issue: Map shows empty or wrong location
**Solution:** 
- Verify coordinates are in decimal degrees format
- Check that longitude is negative for western hemisphere
- Ensure coordinates are in correct order (lat, lng)

### Issue: GeoJSON files don't load
**Solution:**
- Validate GeoJSON at geojsonlint.com
- Check file paths match exactly in projects.json
- Ensure files are properly uploaded to GitHub

### Issue: Styling looks wrong
**Solution:**
- Check layer.json configuration
- Verify category names match between projects.json and layers.json
- Confirm color codes are valid hex values

---

**You're now ready to transform your geospatial data into a professional, interactive dashboard! 🎉**

Your team will be able to:
- **Visualize all 6 locations** on an interactive map
- **Toggle different data layers** on/off
- **Click polygons and points** for detailed information
- **Search and filter** projects by various criteria
- **Access the dashboard** from any device, anywhere

**Total setup time: 1-2 hours for data preparation + 30 minutes for upload and testing**