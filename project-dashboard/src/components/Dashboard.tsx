import { useState, useMemo } from 'react';
import { ProjectMap } from './ProjectMap';
import { ProjectCard } from './ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, LayoutGrid, Map as MapIcon } from 'lucide-react';
import projectsData from '@/data/projects_with_geospatial.json';

interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: string;
  category: string;
  budget: number;
  completion: number;
  startDate: string;
  endDate: string;
  teamLead: string;
  teamSize: number;
  stakeholders: string[];
  tags: string[];
}

export function Dashboard() {
  const [projects] = useState<Project[]>(projectsData);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.teamLead.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, searchTerm, statusFilter, categoryFilter]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status === 'Active').length;
    const completed = projects.filter(p => p.status === 'Completed').length;
    const planning = projects.filter(p => p.status === 'Planning').length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    
    return { total, active, completed, planning, totalBudget };
  }, [projects]);

  const uniqueStatuses = [...new Set(projects.map(p => p.status))];
  const uniqueCategories = [...new Set(projects.map(p => p.category))];

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Project Dashboard</h1>
              <p className="text-muted-foreground">Manage and visualize your projects</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <MapIcon className="h-4 w-4" />
                Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-yellow-600">{stats.planning}</div>
            <div className="text-sm text-muted-foreground">Planning</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-emerald-600">{formatBudget(stats.totalBudget)}</div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, team leads, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {uniqueStatuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Content */}
        {viewMode === 'map' ? (
          <div className="h-[600px] rounded-lg border overflow-hidden">
            <ProjectMap
              projects={filteredProjects}
              selectedProject={selectedProject}
              onProjectSelect={setSelectedProject}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject === project.id}
                onClick={() => setSelectedProject(
                  selectedProject === project.id ? '' : project.id
                )}
              />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}