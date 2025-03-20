
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { services } from '@/data/services';
import { Service } from '@/lib/types';
import { Clock, Calendar, ChevronLeft, Star, Heart, Share2 } from 'lucide-react';
import AnimatedRoute from '@/components/AnimatedRoute';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ServiceDetails = () => {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      const foundService = services.find(s => s.id === id);
      if (foundService) {
        setService(foundService);
      } else {
        toast.error('Service not found');
        navigate('/');
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, navigate]);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        const translateY = scrollY * 0.1; // Parallax factor
        imageRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBookNow = () => {
    if (service) {
      navigate(`/booking/${service.id}`);
    }
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service?.name || 'Ritual Service',
        text: service?.shortDescription || 'Check out this ritual service',
        url: window.location.href
      }).catch(err => {
        toast.error('Error sharing');
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-shimmer h-8 w-48 rounded-md mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-shimmer rounded-xl aspect-[4/3]"></div>
          <div className="space-y-4">
            <div className="animate-shimmer h-8 w-3/4 rounded-md"></div>
            <div className="animate-shimmer h-4 w-full rounded-md"></div>
            <div className="animate-shimmer h-4 w-full rounded-md"></div>
            <div className="animate-shimmer h-4 w-3/4 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  // Create a dummy array of additional images for demonstration
  const additionalImages = [
    service.images.main,
    'https://images.unsplash.com/photo-1624461072473-526d64899e51',
    'https://images.unsplash.com/photo-1601878053694-18dfa6e2b68b',
    'https://images.unsplash.com/photo-1545487250-35a4e452ef3c'
  ];

  return (
    <AnimatedRoute>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div 
            className={cn(
              "space-y-4 transition-all duration-1000 transform",
              isInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            )}
          >
            <div className="relative rounded-xl overflow-hidden border bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-900 shadow-lg" ref={imageRef}>
              <div className={`absolute inset-0 animate-shimmer ${mainImageLoaded ? 'hidden' : 'block'}`}></div>
              <img 
                src={service.images.main} 
                alt={service.name}
                className={`w-full aspect-[4/3] object-cover transition-opacity duration-500 hover:scale-105 transform transition-transform filter hover:saturate-150 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setMainImageLoaded(true)}
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={handleFavoriteToggle}
                  className={`rounded-full p-2 backdrop-blur-sm transition-colors ${
                    isFavorite 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/30 text-muted-foreground hover:bg-white/50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="rounded-full p-2 bg-white/30 text-muted-foreground hover:bg-white/50 backdrop-blur-sm transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent>
                {additionalImages.map((img, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl aspect-square border">
                        <img 
                          src={img} 
                          alt={`${service.name} - Image ${index + 1}`} 
                          className="h-full w-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 bg-white/80" />
              <CarouselNext className="-right-4 bg-white/80" />
            </Carousel>
          </div>

          <div 
            className={cn(
              "space-y-6 transition-all duration-1000 transform",
              isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}
          >
            <div>
              <h1 className="text-3xl font-display mb-4 bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">{service.name}</h1>
              <p className="text-muted-foreground">{service.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                <span className="text-sm">{service.duration}</span>
              </div>
              {service.whenPerformed && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-sm">Traditional</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl backdrop-blur-sm">
              <div>
                <span className="text-sm text-muted-foreground">Price</span>
                <div className="text-2xl font-medium">₹{service.price.toLocaleString()}</div>
              </div>
              <Button 
                size="lg" 
                onClick={handleBookNow}
                className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Book Now
              </Button>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-medium mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-amber-500" />
                Benefits
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start transform hover:-translate-x-1 transition-transform">
                    <span className="text-primary mr-2 text-xl">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="group">
              <h2 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">Purpose</h2>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">{service.purpose}</p>
            </div>

            <Separator />

            <div className="group">
              <h2 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">When It Is Performed</h2>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">{service.whenPerformed}</p>
            </div>

            {service.performedBy && (
              <>
                <Separator />
                <div className="group">
                  <h2 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">Performed By</h2>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">{service.performedBy}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 text-center transform transition-all duration-500 hover:scale-105">
          <h2 className="text-2xl font-display mb-6 bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">Experience The Divine Ceremony</h2>
          <Button 
            size="lg" 
            onClick={handleBookNow} 
            className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-md hover:shadow-lg transition-all px-8 py-6 text-lg"
          >
            Book This Ceremony
          </Button>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default ServiceDetails;
