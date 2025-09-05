import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { useCart } from './CartContext';
import { toast } from 'sonner@2.0.3';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Shield, 
  IndianRupee,
  CheckCircle,
  Users,
  MapPin,
  Clock
} from 'lucide-react';

interface PaymentCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentCheckout({ isOpen, onClose }: PaymentCheckoutProps) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [splitPayment, setSplitPayment] = useState(false);
  const [splitMembers, setSplitMembers] = useState(['John Doe', 'Sarah Wilson', 'Mike Chen']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = getCartTotal();
  const splitAmount = splitPayment ? total / splitMembers.length : total;
  const taxes = total * 0.18; // 18% GST
  const finalTotal = total + taxes;

  const paymentMethods = [
    {
      id: 'upi',
      label: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay instantly with UPI (GPay, PhonePe, Paytm)',
      popular: true
    },
    {
      id: 'card',
      label: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Secure payment with your card'
    },
    {
      id: 'wallet',
      label: 'Digital Wallet',
      icon: Wallet,
      description: 'PayPal, Amazon Pay, etc.'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    toast.success('Payment successful! Your activities are confirmed.');
    
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4 py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
            <div>
              <h3 className="text-lg font-medium">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your activities have been confirmed. Check your email for booking details.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Total Paid:</span>
                <div className="flex items-center space-x-1 font-medium">
                  <IndianRupee className="w-4 h-4" />
                  <span>{finalTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Activities Booked:</span>
                <span className="font-medium">{cart.length}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            Review your activities and complete the payment
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Cart Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}</span>
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm font-medium">
                          <IndianRupee className="w-3 h-3" />
                          <span>{(item.price || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Split Payment Option */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Split Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="split" 
                    checked={splitPayment}
                    onCheckedChange={setSplitPayment}
                  />
                  <Label htmlFor="split">Split costs with group members</Label>
                </div>
                
                {splitPayment && (
                  <div className="space-y-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Total will be split among {splitMembers.length} members:
                    </p>
                    {splitMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{member}</span>
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="w-3 h-3" />
                          <span>{Math.round(finalTotal / splitMembers.length).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment */}
          <div className="space-y-4">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={method.id} className="font-medium">
                              {method.label}
                            </Label>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details Form */}
            {paymentMethod === 'upi' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">UPI Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>UPI ID</Label>
                    <Input placeholder="yourname@paytm" />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Shield className="w-4 h-4" />
                    <span>Secured by 256-bit encryption</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cardholder Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} activities)</span>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4" />
                      <span>{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees (18% GST)</span>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4" />
                      <span>{taxes.toLocaleString()}</span>
                    </div>
                  </div>
                  {splitPayment && (
                    <div className="flex justify-between text-blue-600">
                      <span>Your share ({splitMembers.length} people)</span>
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>{Math.round(finalTotal / splitMembers.length).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-5 h-5" />
                      <span>{(splitPayment ? Math.round(finalTotal / splitMembers.length) : finalTotal).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay {splitPayment ? `₹${Math.round(finalTotal / splitMembers.length).toLocaleString()}` : `₹${finalTotal.toLocaleString()}`}
                    </>
                  )}
                </Button>

                <div className="text-xs text-center text-muted-foreground">
                  By proceeding, you agree to our Terms & Conditions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}