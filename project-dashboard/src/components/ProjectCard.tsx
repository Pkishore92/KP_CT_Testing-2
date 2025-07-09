import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-md' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{project.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{project.location.address}</span>
            </div>
          </div>
          <Badge variant={
            project.status === 'Completed' ? 'default' :
            project.status === 'Active' ? 'secondary' :
            'outline'
          }>
            {project.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.completion}%</span>
          </div>
          <Progress value={project.completion} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{formatBudget(project.budget)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{project.teamSize} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(project.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-4 w-4">
              <AvatarFallback className="text-[10px]">
                {getInitials(project.teamLead)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{project.teamLead}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}