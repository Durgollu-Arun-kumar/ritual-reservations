
import { Priest } from '@/lib/types';
import { Star, Check, Languages, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PriestCardProps {
  priest: Priest;
  isSelected: boolean;
  onSelect: (priestId: string) => void;
}

const PriestCard = ({ priest, isSelected, onSelect }: PriestCardProps) => {
  return (
    <div 
      className={`relative p-4 rounded-xl border ${isSelected ? 'border-primary bg-primary/5' : 'border-border'} transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img 
            src={priest.image} 
            alt={priest.name} 
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1">
            <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5">
              <Star size={12} className="fill-primary text-primary" />
              <span className="text-xs font-medium">{priest.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg">{priest.name}</h3>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="text-xs bg-secondary rounded-full px-2 py-0.5">
              {priest.experience} years exp.
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="text-xs bg-secondary rounded-full px-2 py-0.5 flex items-center gap-1">
                  <Languages size={10} />
                  <span>{priest.languages.length} languages</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-56 p-2">
                <div className="text-xs space-y-1">
                  {priest.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <Check size={12} className="text-primary" />
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {priest.specializations.slice(0, 2).map((spec, idx) => (
              <span key={idx} className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {spec}
              </span>
            ))}
            {priest.specializations.length > 2 && (
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                +{priest.specializations.length - 2} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm font-medium">₹{priest.price.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{priest.availability.length} days/week</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <Button 
          onClick={() => onSelect(priest.id)} 
          variant={isSelected ? "default" : "outline"} 
          className="w-full"
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
          <Check size={14} />
        </div>
      )}
    </div>
  );
};

export default PriestCard;
