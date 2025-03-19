
import { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import AnimatedRoute from '@/components/AnimatedRoute';
import { services } from '@/data/services';
import { Service } from '@/lib/types';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleServices, setVisibleServices] = useState<Service[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setVisibleServices(services);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            Sacred Ceremonies
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-normal mb-4">
            Traditional Homam Services
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover ancient Vedic rituals performed with precision and devotion by experienced priests.
            Book a ceremony to invoke divine blessings for various aspects of life.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden">
                <div className="animate-shimmer aspect-square"></div>
                <div className="p-4 space-y-3">
                  <div className="animate-shimmer h-4 w-3/4 rounded-md"></div>
                  <div className="animate-shimmer h-3 w-full rounded-md"></div>
                  <div className="animate-shimmer h-3 w-2/3 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </AnimatedRoute>
  );
};

export default Index;
