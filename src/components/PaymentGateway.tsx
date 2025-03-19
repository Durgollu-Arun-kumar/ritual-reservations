
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Service, Priest, BookingDetails } from '@/lib/types';
import { CalendarClock, User, MapPin, Video, Clock, CreditCard, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface PaymentGatewayProps {
  service: Service;
  priest: Priest;
  bookingDetails: BookingDetails;
  onBack: () => void;
  onComplete: () => void;
}

const PaymentGateway = ({ service, priest, bookingDetails, onBack, onComplete }: PaymentGatewayProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const subtotal = service.price;
  const priestFee = priest.price;
  const platformFee = Math.round(subtotal * 0.05); // 5% platform fee
  
  const total = subtotal + priestFee + platformFee - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST10') {
      if (couponApplied) {
        toast.error('Coupon already applied');
        return;
      }
      
      const newDiscount = Math.round(total * 0.1); // 10% discount
      setDiscount(newDiscount);
      setCouponApplied(true);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Simulate completion after showing success
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-medium">Payment Successful!</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Your booking has been confirmed. You will receive a confirmation email and SMS shortly.
        </p>
        <p className="text-sm">Booking Reference: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
        <div className="rounded-lg border p-4 space-y-3 bg-card">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={service.images.main}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{service.name}</h4>
              <p className="text-sm text-muted-foreground">{service.shortDescription}</p>
              <div className="mt-1 flex items-center text-sm">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{service.duration}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{bookingDetails.date instanceof Date ? format(bookingDetails.date, 'PPP') : bookingDetails.date} at {bookingDetails.time}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Priest: {priest.name}</span>
            </div>
            
            {bookingDetails.mode === 'offline' ? (
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span>
                  {bookingDetails.address?.line1}, 
                  {bookingDetails.address?.line2 && ` ${bookingDetails.address.line2},`} 
                  {bookingDetails.address?.city}, {bookingDetails.address?.state}, 
                  {bookingDetails.address?.postalCode}
                </span>
              </div>
            ) : (
              <div className="flex items-center text-sm">
                <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Online via {bookingDetails.onlineMeetingPreference === 'zoom' ? 'Zoom' : 
                  bookingDetails.onlineMeetingPreference === 'google-meet' ? 'Google Meet' : 'Online Platform'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label htmlFor="coupon">Coupon Code</Label>
          {couponApplied && (
            <span className="text-xs text-green-600">FIRST10 applied</span>
          )}
        </div>
        <div className="flex gap-2">
          <Input 
            id="coupon" 
            placeholder="Enter coupon code" 
            value={couponCode} 
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
            disabled={couponApplied}
          />
          <Button 
            variant={couponApplied ? "outline" : "secondary"} 
            onClick={handleApplyCoupon}
            disabled={!couponCode || couponApplied}
          >
            {couponApplied ? "Applied" : "Apply"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Try code "FIRST10" for 10% off your first booking</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Price Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Price</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Priest Fee</span>
            <span>₹{priestFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform Fee</span>
            <span>₹{platformFee.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input 
                  id="card-name" 
                  placeholder="Name on card" 
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456" 
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry" 
                  placeholder="MM/YY" 
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="123" 
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <img src="https://cdn-icons-png.flaticon.com/512/179/179457.png" alt="Visa" className="h-5" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="MasterCard" className="h-5" />
              <img src="https://cdn-icons-png.flaticon.com/512/217/217445.png" alt="American Express" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1200px-RuPay.svg.png" alt="RuPay" className="h-5" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex-1"
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button 
          onClick={handlePayment} 
          className="flex-1"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ₹{total.toLocaleString()}
            </>
          )}
        </Button>
      </div>
      
      <p className="text-xs text-center text-muted-foreground">
        By clicking Pay, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default PaymentGateway;
