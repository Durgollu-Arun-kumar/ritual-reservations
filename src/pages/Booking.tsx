
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services, priests } from '@/data/services';
import { BookingDetails, Service, Priest } from '@/lib/types';
import AnimatedRoute from '@/components/AnimatedRoute';
import BookingSteps from '@/components/BookingSteps';
import BookingForm from '@/components/BookingForm';
import PriestSelection from '@/components/PriestSelection';
import PaymentGateway from '@/components/PaymentGateway';
import { toast } from 'sonner';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [selectedPriestId, setSelectedPriestId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
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

  const handleBookingFormSubmit = (data: BookingDetails) => {
    setBookingDetails(data);
    window.scrollTo(0, 0);
    setStep(2);
  };

  const handlePriestSelection = (priestId: string) => {
    setSelectedPriestId(priestId);
    window.scrollTo(0, 0);
    setStep(3);
  };

  const handleComplete = () => {
    navigate('/');
    toast.success('Booking completed successfully! Check your email for details.');
  };

  const renderStepContent = () => {
    if (!service) {
      return null;
    }

    switch (step) {
      case 1:
        return <BookingForm service={service} onSubmit={handleBookingFormSubmit} />;
      case 2:
        if (!bookingDetails) return null;
        return (
          <PriestSelection 
            priests={priests} 
            onSubmit={handlePriestSelection}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        if (!bookingDetails || !selectedPriestId) return null;
        const selectedPriest = priests.find(p => p.id === selectedPriestId);
        if (!selectedPriest) return null;
        return (
          <PaymentGateway
            service={service}
            priest={selectedPriest}
            bookingDetails={bookingDetails}
            onBack={() => setStep(2)}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-shimmer h-8 w-48 rounded-md mb-8"></div>
        <div className="animate-shimmer h-4 w-full rounded-md mb-4"></div>
        <div className="animate-shimmer h-64 w-full rounded-md"></div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <AnimatedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-display">Book {service.name}</h1>
          <p className="text-muted-foreground mt-2">Complete your booking in three simple steps</p>
        </div>

        <BookingSteps 
          currentStep={step} 
          setStep={setStep} 
          allowNavigation={step > 1}
        />

        <div className="mt-8 p-6 border rounded-xl bg-card">
          {renderStepContent()}
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Booking;
