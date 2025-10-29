import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Plane, CheckCircle, CreditCard } from 'lucide-react';

interface FlightSeatSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  flight: {
    airline: string;
    flightNumber: string;
    departure: string;
    arrival: string;
    price: number;
  };
}

const seatMap = [
  ['A1', 'B1','C1', '', 'D1', 'E1', 'F1'],
  ['A2', 'B2','C2', '', 'D2', 'E2', 'F2'],
  ['A3', 'B3','C3', '', 'D3', 'E3', 'F3'],
  ['A4', 'B4','C4', '', 'D4', 'E4', 'F4'],
  ['A5', 'B5','C5', '', 'D5', 'E5', 'F5'],
  ['A6', 'B6','C6', '', 'D6', 'E6', 'F6'],
  ['A7', 'B7','C7', '', 'D7', 'E7', 'F7'],
  ['A8', 'B8','C8', '', 'D8', 'E8', 'F8'],
];

const occupiedSeats = ['A1', 'B2', 'D3', 'E4', 'F5'];
const premiumSeats = ['A1', 'A2', 'F1', 'F2'];

export default function FlightSeatSelection({ isOpen, onClose, flight }: FlightSeatSelectionProps) {
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState(false);

  const getSeatPrice = (seat: string) => {
    if (premiumSeats.includes(seat)) return 1500;
    return 0;
  };

  const getSeatClass = (seat: string) => {
    if (occupiedSeats.includes(seat)) return 'bg-red-100 text-red-600 cursor-not-allowed';
    if (selectedSeat === seat) return 'bg-green-500 text-white';
    if (premiumSeats.includes(seat)) return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer';
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer';
  };

  const handleSeatSelect = (seat: string) => {
    if (!occupiedSeats.includes(seat)) {
      setSelectedSeat(seat);
    }
  };

  const totalPrice = flight.price + getSeatPrice(selectedSeat);

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
                  <span>{flight.airline} {flight.flightNumber}</span>
                  <span>₹{flight.price.toLocaleString()}</span>
                </div>
                {selectedSeat && (
                  <div className="flex justify-between">
                    <span>Seat {selectedSeat} {premiumSeats.includes(selectedSeat) ? '(Premium)' : ''}</span>
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
            <Plane className="w-5 h-5" />
            Select Your Seat - {flight.airline} {flight.flightNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm">
                  Front of Aircraft
                </div>
              </div>
              
              <div className="space-y-2">
                {seatMap.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1">
                    {row.map((seat, seatIndex) => (
                      seat ? (
                        <button
                          key={seat}
                          onClick={() => handleSeatSelect(seat)}
                          disabled={occupiedSeats.includes(seat)}
                          className={`w-8 h-8 text-xs rounded ${getSeatClass(seat)}`}
                        >
                          {seat}
                        </button>
                      ) : (
                        <div key={seatIndex} className="w-8 h-8"></div>
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
                <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                <span>Premium</span>
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
              <h3 className="font-semibold mb-3">Flight Details</h3>
              <div className="space-y-2 text-sm">
                <div>{flight.airline}</div>
                <div>{flight.flightNumber}</div>
                <div>{flight.departure} → {flight.arrival}</div>
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
                  {premiumSeats.includes(selectedSeat) && (
                    <Badge variant="secondary">Premium Seat</Badge>
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
                  <span>₹{flight.price.toLocaleString()}</span>
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