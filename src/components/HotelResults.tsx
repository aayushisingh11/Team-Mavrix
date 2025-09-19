import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, MapPin, Wifi, Car, Utensils, Waves } from 'lucide-react';
import { ImageWithFallback } from './pic/ImageWithFallback';
import HotelRoomSelection from './HotelRoomSelection';

interface HotelResultsProps {
  city: string;
}

const mockHotels = [
  {
    id: 1,
    name: 'The Grand Palace Hotel',
    location: 'Marine Drive, South Mumbai',
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1729605411476-defbdab14c54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGx1eHVyeSUyMHJvb218ZW58MXx8fHwxNzU2NzU2NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Parking'],
    price: 12500,
    originalPrice: 15000,
    discount: 'Free cancellation until 6 PM today',
  },
  {
    id: 2,
    name: 'Boutique Suites & Spa',
    location: 'Bandra West, Mumbai',
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1649731000184-7ced04998f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsfGVufDF8fHx8MTc1NjcyMDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Gym'],
    price: 8900,
    originalPrice: null,
    discount: 'Limited time offer',
  },
];

const amenityIcons = {
  'Free WiFi': Wifi,
  'Pool': Waves,
  'Restaurant': Utensils,
  'Parking': Car,
  'Spa': Star,
  'Gym': Star,
};

export default function HotelResults({ city }: HotelResultsProps) {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [showRoomSelection, setShowRoomSelection] = useState(false);

  const handleBookHotel = (hotel: any) => {
    setSelectedHotel({
      name: hotel.name,
      rating: hotel.rating,
      pricePerNight: hotel.price,
      originalPrice: hotel.originalPrice
    });
    setShowRoomSelection(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Hotels in BOM
        </h2>
        <div className="text-sm text-gray-500">
          Showing {mockHotels.length} results
        </div>
      </div>

      {mockHotels.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden">
          <div className="flex">
            {/* Hotel Image */}
            <div className="w-64 h-48 flex-shrink-0">
              <ImageWithFallback
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hotel Details */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{hotel.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">₹{hotel.price.toLocaleString()}</span>
                    {hotel.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{hotel.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">per night</div>
                  <Button 
                    onClick={() => handleBookHotel(hotel)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-4 mb-4">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Star;
                  return (
                    <div key={amenity} className="flex items-center gap-1">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{amenity}</span>
                    </div>
                  );
                })}
              </div>

              {/* Special Offer */}
              <Badge variant="outline" className="text-green-600 border-green-600">
                {hotel.discount}
              </Badge>
            </div>
          </div>
        </Card>
      ))}

      {/* Load more */}
      <div className="text-center pt-4">
        <Button variant="outline" className="px-8">
          Load More Hotels
        </Button>
      </div>

      {/* Room Selection Modal */}
      {selectedHotel && (
        <HotelRoomSelection
          isOpen={showRoomSelection}
          onClose={() => setShowRoomSelection(false)}
          hotel={selectedHotel}
        />
      )}
    </div>
  );
}