
import { useState } from 'react';
import { Priest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, FilterX, X } from 'lucide-react';
import PriestCard from './PriestCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface PriestSelectionProps {
  priests: Priest[];
  onSubmit: (priestId: string) => void;
  onBack: () => void;
}

interface FilterState {
  language: string;
  experience: string;
  rating: string;
}

const PriestSelection = ({ priests, onSubmit, onBack }: PriestSelectionProps) => {
  const [selectedPriestId, setSelectedPriestId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    language: '',
    experience: '',
    rating: '',
  });

  const handleSelectPriest = (priestId: string) => {
    setSelectedPriestId(priestId);
  };

  const handleSubmit = () => {
    if (!selectedPriestId) {
      toast.error('Please select a priest to continue');
      return;
    }
    onSubmit(selectedPriestId);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      language: '',
      experience: '',
      rating: '',
    });
    setSearchTerm('');
  };

  // Get all unique languages from priests
  const allLanguages = Array.from(
    new Set(priests.flatMap(priest => priest.languages))
  );

  // Filter priests based on search and filters
  const filteredPriests = priests.filter(priest => {
    // Search filter
    if (searchTerm && !priest.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Language filter
    if (filters.language && !priest.languages.includes(filters.language)) {
      return false;
    }

    // Experience filter
    if (filters.experience) {
      const minExperience = parseInt(filters.experience);
      if (priest.experience < minExperience) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      if (priest.rating < minRating) {
        return false;
      }
    }

    return true;
  });

  const hasActiveFilters = Boolean(filters.language || filters.experience || filters.rating || searchTerm);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search priests by name"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">Filters</Label>
          {hasActiveFilters && (
            <button 
              className="text-xs flex items-center text-muted-foreground hover:text-foreground"
              onClick={resetFilters}
            >
              <FilterX size={14} className="mr-1" />
              Reset all
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Select 
              value={filters.language} 
              onValueChange={(value) => handleFilterChange('language', value)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {allLanguages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select 
              value={filters.experience} 
              onValueChange={(value) => handleFilterChange('experience', value)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Experience</SelectItem>
                <SelectItem value="5">5+ Years</SelectItem>
                <SelectItem value="10">10+ Years</SelectItem>
                <SelectItem value="20">20+ Years</SelectItem>
                <SelectItem value="30">30+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select 
              value={filters.rating} 
              onValueChange={(value) => handleFilterChange('rating', value)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.8">4.8+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Available Priests</h3>
          <span className="text-sm text-muted-foreground">
            {filteredPriests.length} {filteredPriests.length === 1 ? 'priest' : 'priests'} available
          </span>
        </div>

        {filteredPriests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-muted-foreground mb-2">No priests match your criteria</div>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
            {filteredPriests.map(priest => (
              <PriestCard
                key={priest.id}
                priest={priest}
                isSelected={selectedPriestId === priest.id}
                onSelect={handleSelectPriest}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1"
          disabled={!selectedPriestId}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default PriestSelection;
