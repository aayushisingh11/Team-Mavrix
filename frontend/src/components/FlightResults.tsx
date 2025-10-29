import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plane, Clock, Luggage } from 'lucide-react';
import FlightSeatSelection from './FlightSeatSelection';

interface FlightResultsProps {
  fromCity: string;
  toCity: string;
  isRoundTrip?: boolean;
}

const mockFlights = [
  {
    id: 1,
    airline: 'IndiGo',
    code: 'DEL → BOM',
    departure: '06:30',
    arrival: '08:45',
    duration: '2h 15m',
    type: 'Direct flight',
    baggage: 'Cabin baggage included',
    price: 8400,
    originalPrice: 10500,
    discount: '2 seats left at this price',
  },
  {
    id: 2,
    airline: 'SpiceJet',
    code: 'DEL → BOM',
    departure: '14:15',
    arrival: '16:30',
    duration: '2h 15m',
    type: 'Direct flight',
    baggage: 'Meal included',
    price: 7200,
    originalPrice: null,
    discount: 'Price may rise by ₹500 tomorrow',
  },
];

export default function FlightResults({ fromCity, toCity, isRoundTrip = false }: FlightResultsProps) {
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleBookFlight = (flight: any) => {
    setSelectedFlight(flight);
    setShowSeatSelection(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isRoundTrip ? 'DEL ⇄ BOM Round Trip Flights' : 'DEL → BOM Flights'}
        </h2>
        <div className="text-sm text-gray-500">
          Showing {mockFlights.length} results
        </div>
      </div>

      {mockFlights.map((flight) => (
        <Card key={flight.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              {/* Airline */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">{flight.airline}</div>
                  <div className="text-sm text-gray-500">{flight.code}</div>
                </div>
              </div>

              {/* Flight Details */}
              <div className="flex items-center gap-8 flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{flight.departure}</span>
                  <span className="text-gray-400">-</span>
                  <span className="font-semibold">{flight.arrival}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  {flight.duration}
                </div>
                
                <Badge variant="secondary" className="text-xs">
                  {flight.type}
                </Badge>
                
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Luggage className="w-4 h-4" />
                  {flight.baggage}
                </div>
              </div>
            </div>

            {/* Price and Book */}
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">₹{flight.price.toLocaleString()}</span>
                {flight.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{flight.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <Button 
                onClick={() => handleBookFlight(flight)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Book Now
              </Button>
              
              <div className="text-xs text-orange-600">
                {flight.discount}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Load more */}
      <div className="text-center pt-4">
        <Button variant="outline" className="px-8">
          Load More Flights
        </Button>
      </div>

      {/* Seat Selection Modal */}
      {selectedFlight && (
        <FlightSeatSelection
          isOpen={showSeatSelection}
          onClose={() => setShowSeatSelection(false)}
          flight={selectedFlight}
        />
      )}
    </div>
  );
}