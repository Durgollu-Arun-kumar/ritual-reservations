
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { services } from '@/data/services';
import { Service } from '@/lib/types';
import { Clock, Calendar, ChevronLeft } from 'lucide-react';
import AnimatedRoute from '@/components/AnimatedRoute';
import { toast } from 'sonner';

const ServiceDetails = () => {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
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

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBookNow = () => {
    if (service) {
      navigate(`/booking/${service.id}`);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-xl overflow-hidden border bg-white shadow-sm">
            <div className={`absolute inset-0 animate-shimmer ${mainImageLoaded ? 'hidden' : 'block'}`}></div>
            <img 
              src={service.images.main} 
              alt={service.name}
              className={`w-full aspect-[4/3] object-cover transition-opacity duration-500 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setMainImageLoaded(true)}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display mb-4">{service.name}</h1>
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

            <div className="flex items-center gap-4">
              <span className="text-2xl font-medium">₹{service.price.toLocaleString()}</span>
              <Button size="lg" onClick={handleBookNow}>Book Now</Button>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-medium mb-3">Benefits</h2>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-medium mb-3">Purpose</h2>
              <p>{service.purpose}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-medium mb-3">When It Is Performed</h2>
              <p>{service.whenPerformed}</p>
            </div>

            {service.performedBy && (
              <>
                <Separator />
                <div>
                  <h2 className="text-xl font-medium mb-3">Performed By</h2>
                  <p>{service.performedBy}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-display mb-6">Experience The Divine Ceremony</h2>
          <Button size="lg" onClick={handleBookNow}>Book This Ceremony</Button>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default ServiceDetails;
