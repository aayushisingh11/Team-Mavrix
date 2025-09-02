import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Bus, CheckCircle, CreditCard } from 'lucide-react';

interface BusSeatSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  bus: {
    operator: string;
    busType: string;
    departure: string;
    arrival: string;
    price: number;
  };
}

// Bus seat layout (2x2 seating)
const seatMap = [
  ['A1', 'A2', '', 'B1', 'B2'],
  ['A3', 'A4', '', 'B3', 'B4'],
  ['A5', 'A6', '', 'B5', 'B6'],
  ['A7', 'A8', '', 'B7', 'B8'],
  ['A9', 'A10', '', 'B9', 'B10'],
  ['A11', 'A12', '', 'B11', 'B12'],
  ['A13', 'A14', '', 'B13', 'B14'],
  ['A15', 'A16', '', 'B15', 'B16'],
  ['A17', 'A18', '', 'B17', 'B18'],
  ['A19', 'A20', '', 'B19', 'B20'],
];

const occupiedSeats = ['A1', 'A4', 'B2', 'B7', 'A12', 'B15'];
const windowSeats = ['A1', 'A3', 'A5', 'A7', 'A9', 'A11', 'A13', 'A15', 'A17', 'A19', 'B2', 'B4', 'B6', 'B8', 'B10', 'B12', 'B14', 'B16', 'B18', 'B20'];

export default function BusSeatSelection({ isOpen, onClose, bus }: BusSeatSelectionProps) {
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState(false);

  const getSeatPrice = (seat: string) => {
    if (windowSeats.includes(seat)) return 100;
    return 0;
  };

  const getSeatClass = (seat: string) => {
    if (occupiedSeats.includes(seat)) return 'bg-red-100 text-red-600 cursor-not-allowed';
    if (selectedSeat === seat) return 'bg-green-500 text-white';
    if (windowSeats.includes(seat)) return 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer';
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer';
  };

  const handleSeatSelect = (seat: string) => {
    if (!occupiedSeats.includes(seat)) {
      setSelectedSeat(seat);
    }
  };

  const totalPrice = bus.price + getSeatPrice(selectedSeat);

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
                  <span>{bus.operator} - {bus.busType}</span>
                  <span>₹{bus.price.toLocaleString()}</span>
                </div>
                {selectedSeat && (
                  <div className="flex justify-between">
                    <span>Seat {selectedSeat} {windowSeats.includes(selectedSeat) ? '(Window)' : ''}</span>
                    <span>₹{getSeatPrice(selectedSeat).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Card>

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
                <div>
                  <label className="block text-sm mb-1">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">
                Back to Seat Selection
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bus className="w-5 h-5" />
            Select Your Seat - {bus.operator}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm">
                  Front of Bus
                </div>
              </div>
              
              <div className="space-y-3">
                {seatMap.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-2">
                    {row.map((seat, seatIndex) => (
                      seat ? (
                        <button
                          key={seat}
                          onClick={() => handleSeatSelect(seat)}
                          disabled={occupiedSeats.includes(seat)}
                          className={`w-12 h-8 text-xs rounded ${getSeatClass(seat)}`}
                        >
                          {seat}
                        </button>
                      ) : (
                        <div key={seatIndex} className="w-8"></div>
                      )
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 rounded"></div>
                <span>Window</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Bus Details</h3>
              <div className="space-y-2 text-sm">
                <div>{bus.operator}</div>
                <div>{bus.busType}</div>
                <div>{bus.departure} → {bus.arrival}</div>
              </div>
            </Card>

            {selectedSeat && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Selected Seat</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Seat {selectedSeat}</span>
                  </div>
                  {windowSeats.includes(selectedSeat) && (
                    <Badge variant="secondary">Window Seat</Badge>
                  )}
                  <div className="text-sm text-gray-600">
                    Additional cost: ₹{getSeatPrice(selectedSeat).toLocaleString()}
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>₹{bus.price.toLocaleString()}</span>
                </div>
                {selectedSeat && (
                  <div className="flex justify-between">
                    <span>Seat Fee</span>
                    <span>₹{getSeatPrice(selectedSeat).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Card>

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
                disabled={!selectedSeat}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}