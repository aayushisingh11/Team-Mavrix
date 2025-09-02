import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Train, CheckCircle, CreditCard } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface TrainSeatPreferenceProps {
  isOpen: boolean;
  onClose: () => void;
  train: {
    name: string;
    number: string;
    departure: string;
    arrival: string;
    price: number;
    class: string;
  };
}

export default function TrainSeatPreference({ isOpen, onClose, train }: TrainSeatPreferenceProps) {
  const [seatPreference, setSeatPreference] = useState('');
  const [berthPreference, setBerthPreference] = useState('');
  const [coachType, setCoachType] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const seatOptions = [
    'Window Seat',
    'Aisle Seat',
    'No Preference'
  ];

  const berthOptions = [
    'Lower Berth',
    'Middle Berth', 
    'Upper Berth',
    'Side Lower',
    'Side Upper',
    'No Preference'
  ];

  const coachOptions = [
    'AC 1st Class',
    'AC 2-Tier',
    'AC 3-Tier',
    'Sleeper Class',
    'Chair Car'
  ];

  const getAdditionalCost = () => {
    let cost = 0;
    if (coachType === 'AC 1st Class') cost += 2000;
    if (coachType === 'AC 2-Tier') cost += 1000;
    if (seatPreference === 'Window Seat') cost += 50;
    if (berthPreference === 'Lower Berth') cost += 100;
    return cost;
  };

  const totalPrice = train.price + getAdditionalCost();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Checkout
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{train.name} ({train.number})</span>
                  <span>₹{train.price.toLocaleString()}</span>
                </div>
                {coachType && (
                  <div className="flex justify-between">
                    <span>Coach Type: {coachType}</span>
                    <span>Included</span>
                  </div>
                )}
                {seatPreference && seatPreference !== 'No Preference' && (
                  <div className="flex justify-between">
                    <span>Seat Preference</span>
                    <span>₹50</span>
                  </div>
                )}
                {berthPreference && berthPreference !== 'No Preference' && (
                  <div className="flex justify-between">
                    <span>Berth Preference</span>
                    <span>₹{berthPreference === 'Lower Berth' ? '100' : '0'}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Passenger Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Passenger Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="As per ID proof"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Age</label>
                  <input 
                    type="number" 
                    placeholder="25"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Gender</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 9876543210"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Payment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">
                Back to Preferences
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                Pay ₹{totalPrice.toLocaleString()}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Train className="w-5 h-5" />
            Set Your Preferences - {train.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Preferences Form */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Train Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Train:</span>
                  <span>{train.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number:</span>
                  <span>{train.number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Journey:</span>
                  <span>{train.departure} → {train.arrival}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span>{train.class}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Coach Type</label>
                <Select value={coachType} onValueChange={setCoachType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coach type" />
                  </SelectTrigger>
                  <SelectContent>
                    {coachOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Seat Preference</label>
                <Select value={seatPreference} onValueChange={setSeatPreference}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seat preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {seatOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Berth Preference</label>
                <Select value={berthPreference} onValueChange={setBerthPreference}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select berth preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {berthOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preferences Summary */}
            {(seatPreference || berthPreference || coachType) && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Selected Preferences</h3>
                <div className="space-y-2">
                  {coachType && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{coachType}</span>
                    </div>
                  )}
                  {seatPreference && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{seatPreference}</span>
                    </div>
                  )}
                  {berthPreference && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{berthPreference}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Ticket Price</span>
                  <span>₹{train.price.toLocaleString()}</span>
                </div>
                
                {seatPreference && seatPreference !== 'No Preference' && (
                  <div className="flex justify-between">
                    <span>Seat Preference Fee</span>
                    <span>₹50</span>
                  </div>
                )}
                
                {berthPreference === 'Lower Berth' && (
                  <div className="flex justify-between">
                    <span>Lower Berth Fee</span>
                    <span>₹100</span>
                  </div>
                )}
                
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold">Important Notes</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Seat preferences are subject to availability</p>
                <p>• Lower berth preference for senior citizens is complimentary</p>
                <p>• Coach type upgrade may incur additional charges</p>
                <p>• Final seat allocation will be confirmed after booking</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCheckout}
                disabled={!coachType}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continue to Checkout
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}