import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Building, CheckCircle, CreditCard, Users, Wifi, Car, Coffee, Waves } from 'lucide-react';

interface HotelRoomSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    name: string;
    rating: number;
    pricePerNight: number;
    originalPrice?: number;
  };
}

const roomTypes = [
  {
    id: '1',
    name: 'Standard Room',
    price: 2500,
    capacity: '2 guests',
    bedType: '1 Queen Bed',
    size: '25 sqm',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Room Service'],
    image: '🛏️'
  },
  {
    id: '2',
    name: 'Deluxe Room',
    price: 3500,
    capacity: '2 guests',
    bedType: '1 King Bed',
    size: '35 sqm',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Room Service', 'Balcony', 'Mini Bar'],
    image: '🛏️'
  },
  {
    id: '3',
    name: 'Suite',
    price: 5500,
    capacity: '4 guests',
    bedType: '1 King + 1 Sofa Bed',
    size: '50 sqm',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Room Service', 'Balcony', 'Mini Bar', 'Living Area', 'Kitchenette'],
    image: '🏨'
  },
  {
    id: '4',
    name: 'Executive Suite',
    price: 8500,
    capacity: '4 guests',
    bedType: '1 King + 1 Queen',
    size: '75 sqm',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Room Service', 'Balcony', 'Mini Bar', 'Living Area', 'Kitchenette', 'Executive Lounge Access', 'Butler Service'],
    image: '👑'
  }
];

export default function HotelRoomSelection({ isOpen, onClose, hotel }: HotelRoomSelectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [numberOfNights, setNumberOfNights] = useState(2);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = selectedRoom ? selectedRoom.price * numberOfNights : 0;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const amenityIcons: { [key: string]: any } = {
    'Free WiFi': Wifi,
    'Air Conditioning': '❄️',
    'TV': '📺',
    'Room Service': Coffee,
    'Balcony': '🏙️',
    'Mini Bar': '🍷',
    'Living Area': '🛋️',
    'Kitchenette': '🍳',
    'Executive Lounge Access': '🏛️',
    'Butler Service': '🤵',
    'Swimming Pool': Waves,
    'Parking': Car
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
                  <span>{hotel.name}</span>
                  <span>⭐ {hotel.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedRoom?.name}</span>
                  <span>{selectedRoom?.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span>₹{selectedRoom?.price.toLocaleString()} × {numberOfNights} nights</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Guest Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Guest Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone</label>
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
                Back to Room Selection
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                Pay ₹{Math.round(totalPrice * 1.18).toLocaleString()}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Choose Your Room - {hotel.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Hotel Info */}
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{hotel.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>⭐ {hotel.rating}</span>
                  <span>•</span>
                  <span>Luxury Hotel</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-lg font-semibold">₹{hotel.pricePerNight.toLocaleString()}/night</div>
              </div>
            </div>
          </Card>

          {/* Nights Selection */}
          <div className="flex items-center gap-4">
            <label className="font-medium">Number of nights:</label>
            <select 
              value={numberOfNights} 
              onChange={(e) => setNumberOfNights(Number(e.target.value))}
              className="p-2 border rounded-md"
            >
              {[1,2,3,4,5,6,7].map(night => (
                <option key={night} value={night}>{night} night{night > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Room Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roomTypes.map((room) => (
              <Card 
                key={room.id} 
                className={`p-4 cursor-pointer border-2 transition-colors ${
                  selectedRoom?.id === room.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="space-y-4">
                  {/* Room Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{room.image}</span>
                        <h4 className="font-semibold">{room.name}</h4>
                        {selectedRoom?.id === room.id && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{room.capacity}</span>
                        </div>
                        <div>{room.bedType}</div>
                        <div>{room.size}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">₹{room.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h5 className="font-medium mb-2">Amenities</h5>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Total Price */}
                  {selectedRoom?.id === room.id && (
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total for {numberOfNights} night{numberOfNights > 1 ? 's' : ''}</span>
                        <span className="font-semibold text-lg">₹{(room.price * numberOfNights).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        + ₹{Math.round(room.price * numberOfNights * 0.18).toLocaleString()} taxes & fees
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Booking Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCheckout}
              disabled={!selectedRoom}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Continue to Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}