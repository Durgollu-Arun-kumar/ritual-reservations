
import { Service } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div 
      className="service-card group rounded-xl overflow-hidden bg-white dark:bg-card border border-border hover:border-primary/20 shadow-sm hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden aspect-square">
        <div className={`absolute inset-0 animate-shimmer rounded-t-xl ${imageLoaded ? 'hidden' : 'block'}`}></div>
        <img 
          src={service.images.main} 
          alt={service.name}
          className={`service-image w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute bottom-0 left-0 w-full p-2">
          <div className="glass rounded-lg px-3 py-1 text-xs font-medium">
            {service.performedBy ? `Performed by ${service.performedBy}` : "Traditional Ceremony"}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{service.shortDescription}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">₹{service.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{service.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
