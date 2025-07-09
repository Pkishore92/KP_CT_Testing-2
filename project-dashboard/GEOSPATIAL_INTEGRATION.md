# 🗺️ Integrating Your Geospatial Data with the Project Dashboard

## Overview

You have polygon and point layers for 6 locations. Here's how to integrate them perfectly with your project dashboard to create a professional geospatial visualization tool.

## 📁 File Organization Structure

### Your Downloaded Project Structure
```
project-dashboard/
├── src/
│   ├── data/
│   │   ├── projects.json          ← Main project data
│   │   ├── geospatial/            ← NEW: Your geospatial files go here
│   │   │   ├── polygons/          ← Polygon layer files
│   │   │   │   ├── location1.geojson
│   │   │   │   ├── location2.geojson
│   │   │   │   └── ...
│   │   │   ├── points/            ← Point layer files
│   │   │   │   ├── location1_points.geojson
│   │   │   │   ├── location2_points.geojson
│   │   │   │   └── ...
│   │   │   └── layers.json        ← NEW: Layer configuration
│   │   └── README.md              ← Data documentation
│   ├── components/
│   │   ├── ProjectMap.tsx         ← MODIFY: Enhanced map component
│   │   ├── ProjectCard.tsx        ← MODIFY: Add geospatial info
│   │   └── LayerControls.tsx      ← NEW: Layer toggle controls
│   └── ...
└── ...
```

### Step 1: Prepare Your Geospatial Data

#### Convert Your Data to GeoJSON (if needed)
If your data isn't already in GeoJSON format:

```bash
# If you have shapefiles, convert them using GDAL or online tools
# Recommended online converter: mapshaper.org
# Upload your .shp files → Export as GeoJSON
```

#### File Naming Convention
```
Location 1: 
- location1_boundary.geojson (polygon)
- location1_facilities.geojson (points)

Location 2:
- location2_boundary.geojson (polygon) 
- location2_facilities.geojson (points)
...
```

### Step 2: Create the Geospatial Folder Structure

Create these new folders in your downloaded project:

```
src/data/geospatial/
├── polygons/
└── points/
```

### Step 3: Update Your Project Data Structure

Modify `src/data/projects.json` to reference your geospatial data:

```json
[
  {
    "id": "location-1",
    "name": "Site Alpha Development",
    "description": "Mixed-use development project with residential and commercial zones",
    "location": {
      "lat": 40.7589,
      "lng": -73.9851,
      "address": "Manhattan, NY",
      "bounds": {
        "north": 40.7639,
        "south": 40.7539, 
        "east": -73.9801,
        "west": -73.9901
      }
    },
    "geospatial": {
      "polygon": "/src/data/geospatial/polygons/location1_boundary.geojson",
      "points": "/src/data/geospatial/points/location1_facilities.geojson",
      "layers": ["boundary", "facilities", "zones"]
    },
    "status": "Active",
    "category": "Development",
    "budget": 2500000,
    "completion": 65,
    "startDate": "2024-01-15",
    "endDate": "2025-06-30",
    "teamLead": "Sarah Chen",
    "teamSize": 12,
    "stakeholders": ["City Planning", "Development Corp"],
    "tags": ["development", "mixed-use", "urban"],
    "zoning": {
      "residential": "40%",
      "commercial": "35%", 
      "green_space": "25%"
    }
  }
  // ... repeat for your other 5 locations
]
```

### Step 4: Create Layer Configuration File

Create `src/data/geospatial/layers.json`:

```json
{
  "defaultView": {
    "center": [40.7589, -73.9851],
    "zoom": 10
  },
  "layerTypes": {
    "polygons": {
      "style": {
        "color": "#3b82f6",
        "weight": 2,
        "opacity": 0.8,
        "fillColor": "#3b82f6",
        "fillOpacity": 0.2
      },
      "hover": {
        "weight": 3,
        "opacity": 1,
        "fillOpacity": 0.4
      }
    },
    "points": {
      "style": {
        "radius": 6,
        "fillColor": "#ef4444", 
        "color": "#dc2626",
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
      },
      "cluster": true,
      "clusterRadius": 50
    }
  },
  "categories": {
    "development": {
      "color": "#3b82f6",
      "icon": "building"
    },
    "infrastructure": {
      "color": "#059669", 
      "icon": "road"
    },
    "environmental": {
      "color": "#10b981",
      "icon": "tree"
    }
  }
}
```

## 🔧 Code Modifications

### Step 5: Enhanced Map Component

Replace `src/components/ProjectMap.tsx` with this enhanced version:

```typescript
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Layers } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  geospatial?: {
    polygon: string;
    points: string;
    layers: string[];
  };
  status: string;
  category: string;
  completion: number;
}

interface GeospatialData {
  polygons: { [key: string]: any };
  points: { [key: string]: any };
}

interface ProjectMapProps {
  projects: Project[];
  selectedProject?: string;
  onProjectSelect: (projectId: string) => void;
}

export function ProjectMap({ projects, selectedProject, onProjectSelect }: ProjectMapProps) {
  const [geospatialData, setGeospatialData] = useState<GeospatialData>({ polygons: {}, points: {} });
  const [visibleLayers, setVisibleLayers] = useState<{ [key: string]: boolean }>({
    polygons: true,
    points: true,
    markers: true
  });
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);

  // Load geospatial data
  useEffect(() => {
    const loadGeospatialData = async () => {
      const polygons: { [key: string]: any } = {};
      const points: { [key: string]: any } = {};

      for (const project of projects) {
        if (project.geospatial) {
          try {
            // Load polygon data
            if (project.geospatial.polygon) {
              const polygonResponse = await fetch(project.geospatial.polygon);
              polygons[project.id] = await polygonResponse.json();
            }

            // Load point data  
            if (project.geospatial.points) {
              const pointsResponse = await fetch(project.geospatial.points);
              points[project.id] = await pointsResponse.json();
            }
          } catch (error) {
            console.warn(`Failed to load geospatial data for ${project.id}:`, error);
          }
        }
      }

      setGeospatialData({ polygons, points });

      // Calculate bounds to fit all projects
      if (projects.length > 0) {
        const bounds = new LatLngBounds([]);
        projects.forEach(project => {
          if (project.location.bounds) {
            bounds.extend([
              [project.location.bounds.south, project.location.bounds.west],
              [project.location.bounds.north, project.location.bounds.east]
            ]);
          } else {
            bounds.extend([project.location.lat, project.location.lng]);
          }
        });
        setMapBounds(bounds);
      }
    };

    loadGeospatialData();
  }, [projects]);

  // Polygon styling
  const getPolygonStyle = (project: Project) => ({
    color: project.status === 'Completed' ? '#22c55e' : 
           project.status === 'Active' ? '#3b82f6' : '#f59e0b',
    weight: selectedProject === project.id ? 3 : 2,
    opacity: 0.8,
    fillColor: project.status === 'Completed' ? '#22c55e' : 
               project.status === 'Active' ? '#3b82f6' : '#f59e0b',
    fillOpacity: selectedProject === project.id ? 0.4 : 0.2
  });

  // Point styling
  const getPointStyle = () => ({
    radius: 4,
    fillColor: '#ef4444',
    color: '#dc2626', 
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  });

  return (
    <div className="relative h-full w-full">
      {/* Layer Controls */}
      <div className="absolute top-4 right-4 z-[1000] bg-background border rounded-lg shadow-lg p-2 space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Layers className="h-4 w-4" />
          Layers
        </div>
        
        <div className="space-y-1">
          <Button
            variant={visibleLayers.polygons ? "default" : "outline"}
            size="sm"
            onClick={() => setVisibleLayers(prev => ({ ...prev, polygons: !prev.polygons }))}
            className="w-full justify-start text-xs"
          >
            {visibleLayers.polygons ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Boundaries
          </Button>
          
          <Button
            variant={visibleLayers.points ? "default" : "outline"} 
            size="sm"
            onClick={() => setVisibleLayers(prev => ({ ...prev, points: !prev.points }))}
            className="w-full justify-start text-xs"
          >
            {visibleLayers.points ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Points
          </Button>
          
          <Button
            variant={visibleLayers.markers ? "default" : "outline"}
            size="sm" 
            onClick={() => setVisibleLayers(prev => ({ ...prev, markers: !prev.markers }))}
            className="w-full justify-start text-xs"
          >
            {visibleLayers.markers ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            Project Markers
          </Button>
        </div>
      </div>

      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        bounds={mapBounds || undefined}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Polygon Layers */}
        {visibleLayers.polygons && Object.entries(geospatialData.polygons).map(([projectId, polygonData]) => {
          const project = projects.find(p => p.id === projectId);
          if (!project || !polygonData) return null;

          return (
            <GeoJSON
              key={`polygon-${projectId}`}
              data={polygonData}
              style={() => getPolygonStyle(project)}
              eventHandlers={{
                click: () => onProjectSelect(projectId),
                mouseover: (e) => {
                  e.target.setStyle({ weight: 3, fillOpacity: 0.4 });
                },
                mouseout: (e) => {
                  e.target.setStyle(getPolygonStyle(project));
                }
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <Badge variant="outline" className="mt-1">
                    {project.status} - {project.completion}%
                  </Badge>
                </div>
              </Popup>
            </GeoJSON>
          );
        })}

        {/* Point Layers */}
        {visibleLayers.points && Object.entries(geospatialData.points).map(([projectId, pointData]) => {
          const project = projects.find(p => p.id === projectId);
          if (!project || !pointData) return null;

          return (
            <GeoJSON
              key={`points-${projectId}`}
              data={pointData}
              pointToLayer={(feature, latlng) => {
                return L.circleMarker(latlng, getPointStyle());
              }}
              onEachFeature={(feature, layer) => {
                layer.bindPopup(`
                  <div>
                    <strong>${feature.properties?.name || 'Point Feature'}</strong><br/>
                    <small>${feature.properties?.description || 'No description'}</small>
                  </div>
                `);
              }}
            />
          );
        })}

        {/* Project Markers */}
        {visibleLayers.markers && projects.map((project) => (
          <Marker
            key={`marker-${project.id}`}
            position={[project.location.lat, project.location.lng]}
            icon={createCustomIcon(project.status)}
            eventHandlers={{
              click: () => onProjectSelect(project.id),
            }}
          >
            <Popup>
              <Card className="border-0 shadow-none">
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm">{project.name}</h3>
                    <Badge variant={
                      project.status === 'Completed' ? 'default' :
                      project.status === 'Active' ? 'secondary' :
                      'outline'
                    } className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.category}</span>
                    <span>{project.completion}% complete</span>
                  </div>
                </div>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Keep the existing createCustomIcon function
const createCustomIcon = (status: string) => {
  const color = 
    status === 'Completed' ? '#22c55e' :
    status === 'Active' ? '#3b82f6' :
    status === 'Planning' ? '#f59e0b' : '#6b7280';
    
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};
```

### Step 6: Add Required Dependencies

Update your `package.json` by adding these dependencies:

```bash
bun add react-leaflet-markercluster
```

## 📋 Implementation Checklist

### File Placement Checklist:
- [ ] Create `src/data/geospatial/polygons/` folder
- [ ] Create `src/data/geospatial/points/` folder  
- [ ] Place your polygon GeoJSON files in `polygons/` folder
- [ ] Place your point GeoJSON files in `points/` folder
- [ ] Create `layers.json` configuration file
- [ ] Update `projects.json` with geospatial references
- [ ] Replace `ProjectMap.tsx` with enhanced version

### Data Preparation Checklist:
- [ ] Convert your data to GeoJSON format (if needed)
- [ ] Name files consistently (location1_boundary.geojson, etc.)
- [ ] Verify GeoJSON validity using geojsonlint.com
- [ ] Update project coordinates to match your locations
- [ ] Set appropriate map bounds for your area

### Testing Checklist:
- [ ] Test map loads with your data
- [ ] Verify polygons display correctly
- [ ] Check point layers appear properly  
- [ ] Test layer toggle controls work
- [ ] Confirm popup information displays
- [ ] Verify mobile responsiveness

## 🔧 Customization Options

### Styling Your Polygons
```javascript
// In ProjectMap.tsx, modify getPolygonStyle function
const getPolygonStyle = (project: Project) => ({
  color: project.category === 'Development' ? '#3b82f6' : 
         project.category === 'Infrastructure' ? '#059669' : '#10b981',
  weight: 2,
  opacity: 0.8,
  fillColor: project.category === 'Development' ? '#3b82f6' : 
             project.category === 'Infrastructure' ? '#059669' : '#10b981',
  fillOpacity: 0.2
});
```

### Adding Custom Point Icons
```javascript
// Create different icons for different point types
const getPointIcon = (feature) => {
  const type = feature.properties.type;
  const color = type === 'facility' ? '#ef4444' : 
               type === 'access' ? '#3b82f6' : '#10b981';
  // Return custom icon...
};
```

## 🚀 Publishing Your Enhanced Dashboard

Follow the same GitHub steps as before:

1. **Upload all files** including your new geospatial folder
2. **GitHub will automatically build** and deploy your enhanced dashboard
3. **Your team can now see** interactive polygons, points, and project markers
4. **Layer controls** let users toggle different data views

## 📊 Sample File Structure for Your 6 Locations

```
src/data/geospatial/
├── polygons/
│   ├── site_alpha_boundary.geojson
│   ├── site_beta_boundary.geojson  
│   ├── site_gamma_boundary.geojson
│   ├── site_delta_boundary.geojson
│   ├── site_epsilon_boundary.geojson
│   └── site_zeta_boundary.geojson
├── points/
│   ├── site_alpha_facilities.geojson
│   ├── site_beta_facilities.geojson
│   ├── site_gamma_facilities.geojson
│   ├── site_delta_facilities.geojson
│   ├── site_epsilon_facilities.geojson
│   └── site_zeta_facilities.geojson
└── layers.json
```

Your enhanced dashboard will now display professional geospatial visualizations with full interactivity!