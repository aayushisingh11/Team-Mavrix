import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Plane, 
  Hotel, 
  Car, 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard,
  Zap,
  TrendingUp,
  Clock,
  Smartphone
} from 'lucide-react';

export function BookingWidget() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [splitPayment, setSplitPayment] = useState(false);
  const [groupMembers] = useState([
    { id: 1, name: 'John Doe', avatar: 'JD', amount: 5600 },
    { id: 2, name: 'Sarah Wilson', avatar: 'SW', amount: 5600 },
    { id: 3, name: 'Mike Chen', avatar: 'MC', amount: 5600 },
  ]);

  const bookingOptions = {
    flights: [
      {
        id: 1,
        airline: "IndiGo",
        route: "DEL → GOI",
        time: "06:30 - 08:45",
        price: 8400,
        originalPrice: 9000,
        urgency: "2 seats left at this price",
        features: ["Direct flight", "Cabin baggage included"]
      },
      {
        id: 2,
        airline: "SpiceJet", 
        route: "DEL → GOI",
        time: "14:15 - 16:30",
        price: 7200,
        originalPrice: 8200,
        urgency: "Price may rise by ₹600 tomorrow",
        features: ["Direct flight", "Meal included"]
      }
    ],
    hotels: [
      {
        id: 1,
        name: "Taj Exotica Resort & Spa",
        location: "Benaulim, South Goa",
        price: 12000,
        originalPrice: 15000,
        rating: 4.8,
        urgency: "Only 2 rooms left for your dates",
        features: ["Beach front", "Pool", "Spa", "Breakfast included"]
      },
      {
        id: 2,
        name: "Alila Diwa Goa",
        location: "Majorda, South Goa", 
        price: 8500,
        originalPrice: 10500,
        rating: 4.6,
        urgency: "Special offer expires in 6 hours",
        features: ["Pool", "Spa", "Restaurant", "WiFi"]
      }
    ]
  };

  const handleBookNow = (item: any) => {
    setSelectedBooking(item);
  };

  const handleSplitPayment = () => {
    setSplitPayment(true);
    // Simulate sending payment requests
    setTimeout(() => {
      alert('Payment requests sent to all group members via Google Pay!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl">Book Your Travel</h2>
        <p className="text-muted-foreground">AI-powered booking with instant split payments</p>
      </div>

      {/* Booking Tabs */}
      <Tabs defaultValue="flights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flights" className="flex items-center space-x-2">
            <Plane className="w-4 h-4" />
            <span>Flights</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center space-x-2">
            <Hotel className="w-4 h-4" />
            <span>Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Activities</span>
          </TabsTrigger>
        </TabsList>

        {/* Flights */}
        <TabsContent value="flights" className="space-y-4">
          <div className="grid gap-4">
            {bookingOptions.flights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Plane className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{flight.airline}</h4>
                          <p className="text-sm text-muted-foreground">{flight.route}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{flight.time}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {flight.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-orange-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{flight.urgency}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div>
                        <div className="text-2xl">₹{flight.price.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground line-through">
                          ₹{flight.originalPrice.toLocaleString()}
                        </div>
                      </div>
                      <Button onClick={() => handleBookNow(flight)} className="w-full">
                        <Zap className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Hotels */}
        <TabsContent value="hotels" className="space-y-4">
          <div className="grid gap-4">
            {bookingOptions.hotels.map((hotel) => (
              <Card key={hotel.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Hotel className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{hotel.name}</h4>
                          <p className="text-sm text-muted-foreground">{hotel.location}</p>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm">⭐ {hotel.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {hotel.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-orange-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{hotel.urgency}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div>
                        <div className="text-2xl">₹{hotel.price.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground line-through">
                          ₹{hotel.originalPrice.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">per night</div>
                      </div>
                      <Button onClick={() => handleBookNow(hotel)} className="w-full">
                        <Zap className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Activity booking coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Split Payment Modal */}
      {selectedBooking && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Split Payment</span>
            </CardTitle>
            <CardDescription>
              Split the cost of "{selectedBooking.name || selectedBooking.airline}" with your group
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span>Total Amount:</span>
                <span className="text-xl">₹{selectedBooking.price.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                    </div>
                    <span className="text-sm">₹{(selectedBooking.price / groupMembers.length).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={handleSplitPayment}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Send Google Pay Requests
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedBooking(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}