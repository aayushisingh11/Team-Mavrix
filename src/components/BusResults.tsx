import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bus, Clock, MapPin, Wifi, Snowflake } from 'lucide-react';
import BusSeatSelection from './BusSeatSelection';

interface BusResultsProps {
  fromCity: string;
  toCity: string;
  isRoundTrip?: boolean;
}

const mockBuses = [
  {
    id: 1,
    operator: 'IntrCity SmartBus',
    busType: 'AC Seater',
    departure: '06:30',
    arrival: '20:45',
    duration: '14h 15m',
    amenities: ['AC', 'WiFi', 'Charging Point'],
    seats: '18 seats left',
    price: 1850,
    originalPrice: 2200,
    rating: 4.2,
  },
  {
    id: 2,
    operator: 'RedBus Express',
    busType: 'AC Sleeper',
    departure: '21:00',
    arrival: '12:30',
    duration: '15h 30m',
    amenities: ['AC', 'Sleeper', 'Blanket'],
    seats: '6 seats left',
    price: 2450,
    originalPrice: null,
    rating: 4.5,
  },
];

const amenityIcons = {
  'AC': Snowflake,
  'WiFi': Wifi,
  'Charging Point': MapPin,
  'Sleeper': Bus,
  'Blanket': Bus,
};

export default function BusResults({ fromCity, toCity }: BusResultsProps) {
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleBookBus = (bus: any) => {
    setSelectedBus(bus);
    setShowSeatSelection(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          DEL → BOM Buses
        </h2>
        <div className="text-sm text-gray-500">
          Showing {mockBuses.length} results
        </div>
      </div>

      {mockBuses.map((bus) => (
        <Card key={bus.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              {/* Bus Icon and Details */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Bus className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold">{bus.operator}</div>
                  <div className="text-sm text-gray-500">{bus.busType}</div>
                </div>
              </div>

              {/* Bus Details */}
              <div className="flex items-center gap-8 flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{bus.departure}</span>
                  <span className="text-gray-400">-</span>
                  <span className="font-semibold">{bus.arrival}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  {bus.duration}
                </div>
                
                <div className="flex gap-2">
                  {bus.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || MapPin;
                    return (
                      <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {amenity}
                      </Badge>
                    );
                  })}
                </div>
                
                <div className="text-sm text-green-600">
                  {bus.seats}
                </div>
              </div>
            </div>

            {/* Price and Book */}
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">₹{bus.price.toLocaleString()}</span>
                {bus.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{bus.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <Button 
                onClick={() => handleBookBus(bus)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Book Now
              </Button>
              
              <div className="text-xs text-gray-500 flex items-center gap-1">
                ⭐ {bus.rating}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Load more */}
      <div className="text-center pt-4">
        <Button variant="outline" className="px-8">
          Load More Buses
        </Button>
      </div>

      {/* Seat Selection Modal */}
      {selectedBus && (
        <BusSeatSelection
          isOpen={showSeatSelection}
          onClose={() => setShowSeatSelection(false)}
          bus={selectedBus}
        />
      )}
    </div>
  );
}