import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Layers } from 'lucide-react';

// Ensure Leaflet is properly imported
import L from 'leaflet';

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
    polygon?: string;
    points?: string;
    layers?: string[];
  };
  status: string;
  category: string;
  budget: number;
  completion: number;
  teamLead: string;
  teamSize: number;
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
              if (polygonResponse.ok) {
                polygons[project.id] = await polygonResponse.json();
              }
            }

            // Load point data  
            if (project.geospatial.points) {
              const pointsResponse = await fetch(project.geospatial.points);
              if (pointsResponse.ok) {
                points[project.id] = await pointsResponse.json();
              }
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
                  
                  <div className="pt-1">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
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