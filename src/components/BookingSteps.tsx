
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
            className="flex flex-col items-center relative"
            onClick={() => handleStepClick(step.number)}
          >
            <div 
              className={`step-number ${
                currentStep > step.number 
                  ? "completed" 
                  : currentStep === step.number 
                  ? "active" 
                  : ""
              } ${allowNavigation && step.number < currentStep ? "cursor-pointer" : ""}`}
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
                className={`absolute top-4 left-8 w-[calc(100vw/4)] h-0.5 -z-10 step-connector ${
                  currentStep > step.number ? "active" : ""
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
