import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useCart } from './CartContext';
import { PaymentCheckout } from './PaymentCheckout';
import { toast } from 'sonner@2.0.3';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  RefreshCw, 
  Heart,
  Zap,
  Mountain,
  Coffee,
  Camera,
  Utensils,
  Music,
  ShoppingBag,
  Waves,
  Sun,
  Compass,
  Home,
  ShoppingCart,
  CreditCard,
  Star,
  Users,
  Phone,
  ExternalLink,
  Plus,
  Minus,
  Map,
  Navigation,
  IndianRupee
} from 'lucide-react';

export function ItineraryPlanner() {
  const [selectedMood, setSelectedMood] = useState('explorer');
  const [selectedDay, setSelectedDay] = useState('day1');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  const { cart, addToCart, removeFromCart, getCartTotal, getCartCount } = useCart();

  const moods = [
    { id: 'relaxing', label: 'Relaxing', icon: Waves, color: 'bg-blue-100 text-blue-600' },
    { id: 'adventurous', label: 'Adventurous', icon: Mountain, color: 'bg-green-100 text-green-600' },
    { id: 'social', label: 'Social', icon: Music, color: 'bg-purple-100 text-purple-600' },
    { id: 'cultural', label: 'Cultural', icon: Camera, color: 'bg-orange-100 text-orange-600' },
    { id: 'luxury', label: 'Luxury', icon: Sun, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'foodie', label: 'Foodie', icon: Utensils, color: 'bg-red-100 text-red-600' },
    { id: 'explorer', label: 'Explorer', icon: Compass, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'local', label: 'Local', icon: Home, color: 'bg-amber-100 text-amber-600' },
  ];

  const itineraryData = {
    relaxing: {
      day1: {
        title: "Calm Beach Day",
        activities: [
          {
            time: "9:00 AM",
            title: "Sunrise Yoga at Arambol Beach",
            description: "Start your day with peaceful yoga by the sea",
            duration: "1 hour",
            type: "wellness",
            price: 800,
            location: "Arambol Beach",
            rating: 4.7,
            bookable: true,
            coordinates: [15.6868, 73.7017]
          },
          {
            time: "11:00 AM", 
            title: "Beach Cafe Brunch",
            description: "Leisurely brunch at Café Lilliput with ocean views",
            duration: "1.5 hours",
            type: "food",
            price: 1200,
            location: "Café Lilliput, Anjuna",
            rating: 4.5,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          },
          {
            time: "1:00 PM",
            title: "Spa Treatment",
            description: "Ayurvedic massage at resort spa",
            duration: "2 hours", 
            type: "wellness",
            price: 3500,
            location: "Leela Spa, Cavelossim",
            rating: 4.8,
            bookable: true,
            coordinates: [15.2667, 73.9500]
          },
          {
            time: "4:00 PM",
            title: "Beach Lounging",
            description: "Relax on Candolim Beach with complimentary refreshments",
            duration: "3 hours",
            type: "leisure",
            price: 500,
            location: "Candolim Beach",
            rating: 4.3,
            bookable: true,
            coordinates: [15.5167, 73.7667]
          },
          {
            time: "7:00 PM",
            title: "Sunset Dinner",
            description: "Romantic dinner at Fisherman's Wharf",
            duration: "2 hours",
            type: "food",
            price: 2800,
            location: "Fisherman's Wharf, Cavelossim",
            rating: 4.6,
            bookable: true,
            coordinates: [15.2667, 73.9500]
          }
        ]
      },
      day2: {
        title: "Peaceful Exploration",
        activities: [
          {
            time: "10:00 AM",
            title: "Backwater Cruise",
            description: "Serene boat ride through Chapora River",
            duration: "2 hours",
            type: "leisure",
            price: 1500,
            location: "Chapora River",
            rating: 4.4,
            bookable: true,
            coordinates: [15.5991, 73.7364]
          },
          {
            time: "1:00 PM",
            title: "Village Lunch",
            description: "Traditional Goan meal in Assagao village",
            duration: "1 hour",
            type: "food",
            price: 800,
            location: "Assagao Village",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5925, 73.7595]
          },
          {
            time: "3:00 PM",
            title: "Spice Plantation Visit", 
            description: "Guided tour of tropical spice gardens",
            duration: "2 hours",
            type: "nature",
            price: 1000,
            location: "Sahakari Spice Farm",
            rating: 4.5,
            bookable: true,
            coordinates: [15.3173, 74.1240]
          },
          {
            time: "6:00 PM",
            title: "Beach Walk",
            description: "Evening stroll at Morjim Beach with guide",
            duration: "1 hour",
            type: "leisure",
            price: 300,
            location: "Morjim Beach",
            rating: 4.2,
            bookable: true,
            coordinates: [15.6167, 73.7333]
          }
        ]
      }
    },
    adventurous: {
      day1: {
        title: "Thrill & Adventure", 
        activities: [
          {
            time: "6:00 AM",
            title: "Dudhsagar Waterfall Trek",
            description: "Challenging hike to Goa's highest waterfall with equipment",
            duration: "6 hours",
            type: "adventure",
            price: 2500,
            location: "Dudhsagar Falls",
            rating: 4.8,
            bookable: true,
            coordinates: [15.3144, 74.3144]
          },
          {
            time: "2:00 PM",
            title: "White Water Rafting",
            description: "Adrenaline rush on Mandovi River rapids with safety gear",
            duration: "3 hours", 
            type: "adventure",
            price: 1800,
            location: "Mandovi River",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          },
          {
            time: "7:00 PM",
            title: "Night Market Exploration",
            description: "Discover local culture at Anjuna Flea Market with guide",
            duration: "2 hours",
            type: "culture",
            price: 600,
            location: "Anjuna Flea Market",
            rating: 4.3,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          }
        ]
      },
      day2: {
        title: "Adventure Continues",
        activities: [
          {
            time: "8:00 AM",
            title: "Parasailing Experience",
            description: "Soar high above the Arabian Sea with certified instructors",
            duration: "2 hours",
            type: "adventure",
            price: 3200,
            location: "Calangute Beach",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5333, 73.7500]
          },
          {
            time: "11:00 AM",
            title: "Jet Ski Adventure",
            description: "High-speed water adventure along the coastline",
            duration: "1 hour",
            type: "adventure",
            price: 2000,
            location: "Baga Beach",
            rating: 4.5,
            bookable: true,
            coordinates: [15.5500, 73.7500]
          },
          {
            time: "3:00 PM",
            title: "Rock Climbing & Rappelling",
            description: "Scale natural rock formations with professional guides",
            duration: "4 hours",
            type: "adventure",
            price: 2800,
            location: "Western Ghats",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4000, 74.0000]
          }
        ]
      }
    },
    social: {
      day1: {
        title: "Social Connections",
        activities: [
          {
            time: "10:00 AM",
            title: "Group Beach Volleyball",
            description: "Join locals and tourists for friendly beach volleyball matches",
            duration: "2 hours",
            type: "social",
            price: 400,
            location: "Baga Beach",
            rating: 4.4,
            bookable: true,
            coordinates: [15.5500, 73.7500]
          },
          {
            time: "1:00 PM",
            title: "Community Lunch & Cultural Exchange",
            description: "Share meals and stories with local families",
            duration: "2.5 hours",
            type: "social",
            price: 1500,
            location: "Saligao Village",
            rating: 4.8,
            bookable: true,
            coordinates: [15.5667, 73.7667]
          },
          {
            time: "6:00 PM",
            title: "Sunset Party Cruise",
            description: "Meet fellow travelers on a sunset party boat",
            duration: "3 hours",
            type: "social",
            price: 2200,
            location: "Mandovi River",
            rating: 4.5,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          }
        ]
      }
    },
    cultural: {
      day1: {
        title: "Cultural Immersion",
        activities: [
          {
            time: "9:00 AM",
            title: "Heritage Churches Tour",
            description: "Explore UNESCO World Heritage churches of Old Goa",
            duration: "3 hours",
            type: "culture",
            price: 1200,
            location: "Old Goa",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5057, 73.9135]
          },
          {
            time: "2:00 PM",
            title: "Traditional Goan Art Workshop",
            description: "Learn traditional painting techniques from local artists",
            duration: "2.5 hours",
            type: "culture",
            price: 1800,
            location: "Fontainhas, Panaji",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          },
          {
            time: "6:00 PM",
            title: "Fado Music Evening",
            description: "Experience traditional Portuguese music in colonial setting",
            duration: "2 hours",
            type: "culture",
            price: 1000,
            location: "Old Goa",
            rating: 4.5,
            bookable: true,
            coordinates: [15.5057, 73.9135]
          }
        ]
      }
    },
    luxury: {
      day1: {
        title: "Luxury Experience",
        activities: [
          {
            time: "10:00 AM",
            title: "Private Yacht Charter",
            description: "Exclusive yacht experience with personal crew and chef",
            duration: "4 hours",
            type: "luxury",
            price: 15000,
            location: "Mandovi Marina",
            rating: 4.9,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          },
          {
            time: "3:00 PM",
            title: "Premium Spa & Wellness",
            description: "Full-service luxury spa experience with organic treatments",
            duration: "3 hours",
            type: "luxury",
            price: 8500,
            location: "The Leela Goa",
            rating: 4.8,
            bookable: true,
            coordinates: [15.2667, 73.9500]
          },
          {
            time: "7:00 PM",
            title: "Fine Dining Experience",
            description: "Michelin-recommended restaurant with wine pairing",
            duration: "2.5 hours",
            type: "luxury",
            price: 6500,
            location: "Thalassa, Vagator",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5833, 73.7333]
          }
        ]
      }
    },
    foodie: {
      day1: {
        title: "Culinary Journey",
        activities: [
          {
            time: "9:00 AM",
            title: "Street Food Walking Tour",
            description: "Discover authentic Goan street food with local food expert",
            duration: "3 hours",
            type: "food",
            price: 1500,
            location: "Panaji Market",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          },
          {
            time: "1:00 PM",
            title: "Spice Farm Cooking Class",
            description: "Learn to cook with fresh spices in traditional setting",
            duration: "4 hours",
            type: "food",
            price: 2800,
            location: "Sahakari Spice Farm",
            rating: 4.8,
            bookable: true,
            coordinates: [15.3173, 74.1240]
          },
          {
            time: "7:00 PM",
            title: "Seafood Feast by the Beach",
            description: "Fresh catch of the day prepared by local fishermen",
            duration: "2 hours",
            type: "food",
            price: 2200,
            location: "Fisherman's Cove, Anjuna",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          }
        ]
      }
    },
    explorer: {
      day1: {
        title: "Ultimate Explorer Experience",
        activities: [
          {
            time: "6:00 AM",
            title: "Sunrise Hot Air Balloon",
            description: "Bird's eye view of Goa's coastline and countryside",
            duration: "3 hours",
            type: "adventure",
            price: 8500,
            location: "Arambol Beach",
            rating: 4.8,
            bookable: true,
            coordinates: [15.6868, 73.7017]
          },
          {
            time: "10:00 AM",
            title: "Heritage Walking Tour",
            description: "Explore Old Goa's Portuguese architecture and history",
            duration: "2.5 hours",
            type: "culture",
            price: 1200,
            location: "Old Goa",
            rating: 4.6,
            bookable: true,
            coordinates: [15.5057, 73.9135]
          },
          {
            time: "1:00 PM",
            title: "Authentic Goan Cooking Class",
            description: "Learn to cook traditional dishes with a local family",
            duration: "3 hours",
            type: "food",
            price: 2800,
            location: "Saligao Village",
            rating: 4.9,
            bookable: true,
            coordinates: [15.5667, 73.7667]
          },
          {
            time: "5:00 PM",
            title: "Dolphin Watching Cruise",
            description: "Spot playful dolphins in their natural habitat",
            duration: "2 hours",
            type: "nature",
            price: 1800,
            location: "Dona Paula Jetty",
            rating: 4.4,
            bookable: true,
            coordinates: [15.4585, 73.8074]
          },
          {
            time: "8:00 PM",
            title: "Night Market & Live Music",
            description: "Experience Goa's vibrant nightlife and local crafts",
            duration: "3 hours",
            type: "social",
            price: 500,
            location: "Anjuna Flea Market",
            rating: 4.2,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          }
        ]
      },
      day2: {
        title: "Multi-Dimensional Adventure",
        activities: [
          {
            time: "7:00 AM",
            title: "Scuba Diving Experience",
            description: "Discover underwater life at Grande Island",
            duration: "4 hours",
            type: "adventure",
            price: 4500,
            location: "Grande Island",
            rating: 4.7,
            bookable: true,
            coordinates: [15.2629, 73.9420]
          },
          {
            time: "2:00 PM",
            title: "Spice Plantation & Zip-lining",
            description: "Combine nature learning with thrilling zip-line",
            duration: "3 hours",
            type: "mixed",
            price: 2200,
            location: "Sahakari Spice Farm",
            rating: 4.5,
            bookable: true,
            coordinates: [15.3173, 74.1240]
          },
          {
            time: "6:00 PM",
            title: "Beach Shack Sunset & Live Music",
            description: "Relaxing evening with local musicians",
            duration: "3 hours",
            type: "social",
            price: 800,
            location: "Curlies Beach Shack",
            rating: 4.3,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          }
        ]
      }
    },
    local: {
      day1: {
        title: "Authentic Local Immersion",
        activities: [
          {
            time: "8:00 AM",
            title: "Local Fish Market Tour",
            description: "Experience the bustling Mapusa Friday Market with local insights",
            duration: "2 hours",
            type: "local",
            price: 300,
            location: "Mapusa Market",
            rating: 4.1,
            bookable: true,
            coordinates: [15.5909, 73.8081],
            localGuide: "Maria Fernandes"
          },
          {
            time: "11:00 AM",
            title: "Village Pottery Workshop",
            description: "Learn traditional pottery from local artisans in authentic setting",
            duration: "2.5 hours",
            type: "local",
            price: 800,
            location: "Bicholim Village",
            rating: 4.8,
            bookable: true,
            coordinates: [15.5978, 73.9489],
            localGuide: "João D'Souza"
          },
          {
            time: "2:00 PM",
            title: "Home-Style Goan Lunch",
            description: "Traditional meal with a local Goan family in their home",
            duration: "2 hours",
            type: "local",
            price: 650,
            location: "Private Home, Aldona",
            rating: 4.9,
            bookable: true,
            coordinates: [15.5936, 73.8728],
            localGuide: "Sunita Kamat"
          },
          {
            time: "5:00 PM",
            title: "Cashew Distillery Visit",
            description: "Learn about Feni production from local cashew farmers",
            duration: "1.5 hours",
            type: "local",
            price: 450,
            location: "Traditional Distillery",
            rating: 4.4,
            bookable: true,
            coordinates: [15.4909, 74.0240],
            localGuide: "Antonio Pereira"
          },
          {
            time: "7:00 PM",
            title: "Village Evening at Temple",
            description: "Experience local evening prayers and community gathering",
            duration: "1 hour",
            type: "local",
            price: 200,
            location: "Shanta Durga Temple",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4167, 74.0167],
            localGuide: "Pradeep Naik"
          }
        ]
      },
      day2: {
        title: "Deep Local Connections",
        activities: [
          {
            time: "9:00 AM",
            title: "Backyard Farming Experience",
            description: "Help with organic farming and learn sustainable local practices",
            duration: "3 hours",
            type: "local",
            price: 900,
            location: "Organic Farm, Assagao",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5925, 73.7595],
            localGuide: "Raghav Shetty"
          },
          {
            time: "1:00 PM",
            title: "Local Fisherman's Experience",
            description: "Join local fishermen for afternoon catch and traditional boat ride",
            duration: "3 hours",
            type: "local",
            price: 1200,
            location: "Chapora Beach",
            rating: 4.5,
            bookable: true,
            coordinates: [15.5991, 73.7364],
            localGuide: "Ravi Velip"
          },
          {
            time: "6:00 PM",
            title: "Neighborhood Evening Walk",
            description: "Discover hidden lanes and local stories with community guide",
            duration: "2 hours",
            type: "local",
            price: 400,
            location: "Fontainhas, Panaji",
            rating: 4.3,
            bookable: true,
            coordinates: [15.4909, 73.8278],
            localGuide: "Carmen Rodrigues"
          }
        ]
      }
    }
  };

  const getCurrentItinerary = () => {
    return itineraryData[selectedMood as keyof typeof itineraryData]?.[selectedDay as keyof typeof itineraryData.relaxing] || itineraryData.explorer.day1;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'wellness': return Heart;
      case 'food': return Utensils;
      case 'leisure': return Waves;
      case 'adventure': return Mountain;
      case 'culture': return Camera;
      case 'nature': return Mountain;
      case 'local': return Home;
      case 'mixed': return Compass;
      case 'social': return Music;
      default: return MapPin;
    }
  };

  const bookActivity = (activity) => {
    addToCart(activity);
    toast.success(`${activity.title} added to cart! Click cart to checkout.`);
  };

  const viewOnMap = (activity) => {
    setSelectedLocation(activity);
    setIsMapOpen(true);
  };

  const reshuffleItinerary = () => {
    toast.success(`AI is reshuffling your itinerary for a more ${selectedMood} experience...`);
  };

  const MapView = ({ activity }) => (
    <div className="space-y-4">
      <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <MapPin className="w-12 h-12 mx-auto text-primary" />
          <h3 className="font-medium">{activity?.title}</h3>
          <p className="text-sm text-muted-foreground">{activity?.location}</p>
          {activity?.coordinates && (
            <p className="text-xs text-muted-foreground">
              Coordinates: {activity.coordinates[0]}, {activity.coordinates[1]}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Button className="w-full" variant="outline">
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
        <Button className="w-full" variant="outline">
          <Phone className="w-4 h-4 mr-2" />
          Call Vendor
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Cart */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl">Mood Planning</h2>
          <p className="text-muted-foreground">AI adapts your trip based on your daily mood</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({getCartCount()})
              {getCartCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5">
                  {getCartCount()}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Your Activity Cart</DialogTitle>
              <DialogDescription>
                Review and book your selected activities
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Your cart is empty
                  </p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <IndianRupee className="w-3 h-3" />
                          <span className="text-sm font-medium">{(item.price || 0).toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">x {item.quantity || 1}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => removeFromCart(item.id!)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            {cart.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between font-medium">
                  <span>Total:</span>
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="w-4 h-4" />
                    <span>{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setIsPaymentOpen(true)}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Mood Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Today's Mood</span>
          </CardTitle>
          <CardDescription>
            Select how you're feeling today and AI will adjust your itinerary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`
                    p-4 rounded-lg text-center transition-all hover:scale-105
                    ${selectedMood === mood.id 
                      ? `${mood.color} ring-2 ring-current ring-opacity-30` 
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">{mood.label}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Day Selection and Reshuffle */}
      <div className="flex items-center justify-between">
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day1">Day 1</SelectItem>
            <SelectItem value="day2">Day 2</SelectItem>
            <SelectItem value="day3">Day 3</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={reshuffleItinerary} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reshuffle for {selectedMood} mood
        </Button>
      </div>

      {/* Itinerary Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{getCurrentItinerary().title}</span>
          </CardTitle>
          <CardDescription>
            Optimized for your {selectedMood} mood
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getCurrentItinerary().activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const isBookable = activity.bookable;
              
              return (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {activity.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{activity.duration}</span>
                        </div>
                        {activity.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{activity.location}</span>
                          </div>
                        )}
                        {activity.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{activity.rating}</span>
                          </div>
                        )}
                        {activity.localGuide && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>Guide: {activity.localGuide}</span>
                          </div>
                        )}
                      </div>
                      
                      {activity.price && (
                        <div className="flex items-center space-x-1 font-medium text-primary">
                          <IndianRupee className="w-4 h-4" />
                          <span>{activity.price.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {isBookable && (
                      <div className="flex items-center space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => bookActivity(activity)}
                          className="flex-1"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addToCart(activity)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => viewOnMap(activity)}
                        >
                          <Map className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mood Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-700">
            <Zap className="w-5 h-5" />
            <span>AI Mood Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {selectedMood === 'explorer' && (
              <>
                <p>🌟 Explorer mode combines the best of all worlds - adventure, culture, food, and social experiences!</p>
                <p>💡 Your itinerary includes diverse activities from sunrise balloons to local cooking classes.</p>
                <p>🎯 I've balanced high-energy adventures with cultural immersion for the perfect exploration day.</p>
              </>
            )}
            {selectedMood === 'local' && (
              <>
                <p>🏠 Local mode focuses on authentic experiences with community guides and traditional activities.</p>
                <p>💡 Every activity connects you directly with local families, artisans, and community members.</p>
                <p>🎯 Experience Goa like a local - from market tours to family meals and traditional crafts.</p>
              </>
            )}
            {selectedMood === 'relaxing' && (
              <p>🌊 I've replaced the planned museum visit with extra beach time as it better matches your relaxed vibe.</p>
            )}
            {!['explorer', 'local', 'relaxing'].includes(selectedMood) && (
              <>
                <p>🎯 Based on your "{selectedMood}" mood, I've prioritized high-energy experiences.</p>
                <p>💡 Tip: If you feel like switching moods tomorrow, just update your preference and I'll reshuffle everything!</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Location & Map</DialogTitle>
            <DialogDescription>
              View location details and get directions
            </DialogDescription>
          </DialogHeader>
          <MapView activity={selectedLocation} />
        </DialogContent>
      </Dialog>

      {/* Payment Checkout */}
      <PaymentCheckout 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
      />
    </div>
  );
}