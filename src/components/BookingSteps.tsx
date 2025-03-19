
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
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div 
            key={step.number} 
            className={`flex flex-col items-center relative ${
              allowNavigation && step.number < currentStep ? "cursor-pointer" : ""
            }`}
            onClick={() => handleStepClick(step.number)}
          >
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep > step.number 
                  ? "bg-primary text-primary-foreground" 
                  : currentStep === step.number 
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > step.number ? (
                <Check size={16} />
              ) : (
                step.number
              )}
            </div>
            <span 
              className={`mt-2 text-xs ${
                currentStep >= step.number 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            
            {/* Connector lines between steps */}
            {i < steps.length - 1 && (
              <div 
                className={`absolute top-4 left-10 w-[calc(100%-2.5rem)] h-0.5 -z-10 ${
                  currentStep > step.number + 1 
                    ? "bg-primary" 
                    : currentStep > step.number
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
