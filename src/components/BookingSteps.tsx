
import { Check } from 'lucide-react';

interface BookingStepsProps {
  currentStep: number;
  setStep?: (step: number) => void;
  allowNavigation?: boolean;
}

const steps = [
  {
    number: 1,
    title: "Booking Details",
  },
  {
    number: 2,
    title: "Select Priest",
  },
  {
    number: 3,
    title: "Payment",
  },
];

const BookingSteps = ({ currentStep, setStep, allowNavigation = false }: BookingStepsProps) => {
  const handleStepClick = (step: number) => {
    if (allowNavigation && setStep && step < currentStep) {
      setStep(step);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div 
            key={step.number} 
            className={`flex flex-col items-center relative group ${
              allowNavigation && step.number < currentStep ? "cursor-pointer" : ""
            }`}
            onClick={() => handleStepClick(step.number)}
          >
            <div 
              className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium transform transition-all duration-500 shadow-md ${
                currentStep > step.number 
                  ? "bg-primary text-primary-foreground rotate-y-180" 
                  : currentStep === step.number 
                  ? "bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="relative">
                {currentStep > step.number ? (
                  <Check size={20} className="animate-fade-in" />
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="absolute opacity-20 animate-ping">{step.number}</span>
                    <span>{step.number}</span>
                  </div>
                )}
              </div>
            </div>
            <span 
              className={`mt-3 text-sm font-medium transition-all duration-300 ${
                currentStep >= step.number 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            
            {/* Connector lines between steps */}
            {i < steps.length - 1 && (
              <div 
                className={`absolute top-7 left-12 w-[calc(100%-4rem)] h-1 rounded-full transition-all duration-1000 -z-10 ${
                  currentStep > step.number + 1 
                    ? "bg-primary" 
                    : currentStep > step.number
                    ? "bg-gradient-to-r from-primary to-muted"
                    : "bg-muted"
                }`}
              >
                {currentStep === step.number + 1 && (
                  <div className="h-full w-[50%] bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
