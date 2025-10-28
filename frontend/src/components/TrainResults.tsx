import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Train, Clock, Users } from 'lucide-react';
import TrainSeatPreference from './TrainSeatPreference';

interface TrainResultsProps {
  fromCity: string;
  toCity: string;
  isRoundTrip?: boolean;
}

const mockTrains = [
  {
    id: 1,
    name: 'Rajdhani Express',
    number: '12951',
    departure: '16:55',
    arrival: '08:35',
    duration: '15h 40m',
    class: 'AC 2-Tier',
    availability: 'Available',
    price: 3450,
    originalPrice: 4200,
    station: 'NDLS → CSTM',
  },
  {
    id: 2,
    name: 'Duronto Express',
    number: '12263',
    departure: '22:25',
    arrival: '12:00',
    duration: '13h 35m',
    class: 'AC 3-Tier',
    availability: 'RAC 15',
    price: 2850,
    originalPrice: null,
    station: 'NDLS → CSTM',
  },
];

export default function TrainResults({ fromCity, toCity, isRoundTrip = false }: TrainResultsProps) {
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [showSeatPreference, setShowSeatPreference] = useState(false);

  const handleBookTrain = (train: any) => {
    setSelectedTrain(train);
    setShowSeatPreference(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isRoundTrip ? 'NDLS ⇄ CSTM Round Trip Trains' : 'NDLS → CSTM Trains'}
        </h2>
        <div className="text-sm text-gray-500">
          Showing {mockTrains.length} results
        </div>
      </div>

      {mockTrains.map((train) => (
        <Card key={train.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              {/* Train Icon and Details */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Train className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">{train.name}</div>
                  <div className="text-sm text-gray-500">#{train.number}</div>
                </div>
              </div>

              {/* Train Details */}
              <div className="flex items-center gap-8 flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{train.departure}</span>
                  <span className="text-gray-400">-</span>
                  <span className="font-semibold">{train.arrival}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  {train.duration}
                </div>
                
                <Badge variant="secondary" className="text-xs">
                  {train.class}
                </Badge>
                
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className={train.availability === 'Available' ? 'text-green-600' : 'text-orange-600'}>
                    {train.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Price and Book */}
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">₹{train.price.toLocaleString()}</span>
                {train.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{train.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <Button 
                onClick={() => handleBookTrain(train)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Book Now
              </Button>
              
              <div className="text-xs text-gray-500">
                {train.station}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Load more */}
      <div className="text-center pt-4">
        <Button variant="outline" className="px-8">
          Load More Trains
        </Button>
      </div>

      {/* Seat Preference Modal */}
      {selectedTrain && (
        <TrainSeatPreference
          isOpen={showSeatPreference}
          onClose={() => setShowSeatPreference(false)}
          train={selectedTrain}
        />
      )}
    </div>
  );
}