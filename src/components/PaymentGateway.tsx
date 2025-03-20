
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Service, Priest, BookingDetails } from '@/lib/types';
import { CalendarClock, User, MapPin, Video, Clock, CreditCard, CheckCircle2, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [rotate3d, setRotate3d] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('card');

  useEffect(() => {
    // Add subtle tilt effect for 3D card
    const handleMouseMove = (e: MouseEvent) => {
      const card = document.getElementById('payment-card');
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX; // -1 to 1
      const deltaY = (y - centerY) / centerY; // -1 to 1
      
      setRotate3d({ x: deltaY * -5, y: deltaX * 5 });
    };
    
    const resetTilt = () => {
      setRotate3d({ x: 0, y: 0 });
    };
    
    const card = document.getElementById('payment-card');
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', resetTilt);
    }
    
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', resetTilt);
      }
    };
  }, []);

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
  
  const handleCardFlip = () => {
    setCardFlipped(!cardFlipped);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-xl">
          <CheckCircle2 className="h-10 w-10 text-green-600 animate-scale-in" />
        </div>
        <h2 className="text-2xl font-medium bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Payment Successful!</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Your booking has been confirmed. You will receive a confirmation email and SMS shortly.
        </p>
        <div className="p-4 bg-card border rounded-lg animate-scale-in animation-delay-300 shadow-md">
          <p className="text-sm font-medium">Booking Reference: <span className="text-primary">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
        </div>
        <div className="w-full max-w-sm mt-4 rounded-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-primary animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Booking Summary</h3>
          <button 
            onClick={() => setSummaryExpanded(!summaryExpanded)}
            className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {summaryExpanded ? (
              <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>Show Details <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </button>
        </div>
        <div 
          className={cn(
            "rounded-lg border bg-gradient-to-br from-card to-muted/30 p-4 space-y-3 shadow-sm transition-all duration-500 overflow-hidden",
            summaryExpanded ? "max-h-[500px]" : "max-h-28"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transform transition-all duration-300 hover:scale-110 hover:rotate-3">
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
      
      <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Gift className="h-4 w-4 mr-2 text-primary" />
            <Label htmlFor="coupon" className="font-medium">Coupon Code</Label>
          </div>
          {couponApplied && (
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">FIRST10 applied</span>
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
            className={couponApplied ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" : ""}
          >
            {couponApplied ? "Applied" : "Apply"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Try code "FIRST10" for 10% off your first booking</p>
      </div>
      
      <div className="bg-card border rounded-lg p-4 shadow-sm">
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
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Discount (10%)</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="flex mb-4 border rounded-lg overflow-hidden">
          <button 
            className={`flex-1 py-2 text-center transition-colors ${activeTab === 'card' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            onClick={() => setActiveTab('card')}
          >
            Credit / Debit Card
          </button>
          <button 
            className={`flex-1 py-2 text-center transition-colors ${activeTab === 'upi' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            onClick={() => setActiveTab('upi')}
          >
            UPI
          </button>
        </div>
        
        {activeTab === 'card' && (
          <div 
            id="payment-card" 
            className="perspective-1000 mb-4"
            style={{ 
              perspective: '1000px'
            }}
          >
            <div 
              className="w-full p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-primary rounded-xl shadow-lg transition-all duration-500 relative"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotateY(${cardFlipped ? '180deg' : '0deg'}) rotateX(${rotate3d.x}deg) rotateY(${rotate3d.y}deg)`,
                height: '220px'
              }}
            >
              <div 
                className="absolute inset-0 w-full h-full backface-hidden p-4 rounded-xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white/60 text-xs">Card Number</div>
                    <div className="text-white font-mono text-lg mt-1">•••• •••• •••• ••••</div>
                  </div>
                  <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
                </div>
                
                <div className="mt-6">
                  <div className="text-white/60 text-xs">Card Holder</div>
                  <div className="text-white mt-1">YOUR NAME</div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <div>
                    <div className="text-white/60 text-xs">Expires</div>
                    <div className="text-white mt-1">MM/YY</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">CVV</div>
                    <div className="text-white mt-1">•••</div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <div className="w-10 h-6 bg-white/80 rounded-sm"></div>
                  <div className="w-10 h-6 bg-white/80 rounded-sm"></div>
                </div>
                
                <button
                  className="absolute bottom-4 left-4 text-white/80 hover:text-white flex items-center text-xs"
                  onClick={handleCardFlip}
                >
                  Flip Card <ChevronDown className="ml-1 h-3 w-3" />
                </button>
              </div>
              
              <div 
                className="absolute inset-0 w-full h-full backface-hidden p-4 rounded-xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="w-full h-8 bg-black/20 mt-4"></div>
                <div className="mt-4 flex justify-end">
                  <div className="bg-white/90 w-16 h-8 flex items-center justify-center text-sm font-mono text-gray-800">CVV</div>
                </div>
                
                <div className="mt-8 text-white/80 text-xs text-center">
                  This is a secure payment page. Your card details are encrypted.
                </div>
                
                <button
                  className="absolute bottom-4 left-4 text-white/80 hover:text-white flex items-center text-xs"
                  onClick={handleCardFlip}
                >
                  Flip Card <ChevronDown className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
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
                    onFocus={() => setCardFlipped(true)}
                    onBlur={() => setCardFlipped(false)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <img src="https://cdn-icons-png.flaticon.com/512/179/179457.png" alt="Visa" className="h-5" />
                <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="MasterCard" className="h-5" />
                <img src="https://cdn-icons-png.flaticon.com/512/217/217445.png" alt="American Express" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1200px-RuPay.svg.png" alt="RuPay" className="h-5" />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'upi' && (
          <div className="border rounded-lg p-4 mb-4 bg-card">
            <div className="flex justify-center mb-4">
              <div className="p-6 bg-white rounded-lg shadow-inner">
                <div className="w-40 h-40 bg-muted/50 rounded-md flex items-center justify-center border-2 border-dashed">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">QR Code</div>
                    <div className="mt-2 w-24 h-24 mx-auto bg-gradient-to-br from-black/80 to-black/60 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Or pay using UPI ID</p>
              <div className="flex max-w-xs mx-auto">
                <Input placeholder="your.upi@bankname" className="rounded-r-none" />
                <Button variant="secondary" className="rounded-l-none border-l-0">Pay Now</Button>
              </div>
            </div>
          </div>
        )}
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
          className="flex-1 bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-md hover:shadow-lg transition-all"
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
