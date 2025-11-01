import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useCart } from './CartContext';
import { PaymentCheckout } from './PaymentCheckout';
import { Toaster, toast } from 'sonner';
import {
  Calendar, MapPin, Clock, RefreshCw, Heart, Zap, Mountain, Camera, Utensils,
  Music, Waves, Sun, Compass, Home, ShoppingCart, CreditCard, Star, Users,
  Phone, Plus, Minus, Map, Navigation, IndianRupee, Search, TrendingUp, DollarSign, // Added Icons
} from 'lucide-react';

// --- Interfaces ---
interface Activity { /* ... Interface unchanged ... */
  time: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  price: number;
  location: string;
  rating: number;
  bookable: boolean;
  coordinates: [number, number];
  localGuide?: string;
}
interface DayPlan { /* ... Interface unchanged ... */
    title: string;
    activities: Activity[];
}
interface MoodItinerary { /* ... Interface unchanged ... */
    [day: string]: DayPlan;
}
interface ItineraryData { /* ... Interface unchanged ... */
    [mood: string]: MoodItinerary;
}
// --- End Interfaces ---

export function ItineraryPlanner() {
  const [selectedMood, setSelectedMood] = useState('explorer');
  const [selectedDay, setSelectedDay] = useState('day1');
  // --- New State Variables ---
  const [locationInput, setLocationInput] = useState('Goa, India');
  const [numDays, setNumDays] = useState<number>(3); // State for number of days
  const [budgetInput, setBudgetInput] = useState(''); // State for budget input
  // -------------------------
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Activity | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [hasGeneratedOrShuffled, setHasGeneratedOrShuffled] = useState(false); // Combined state
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { cart, addToCart, removeFromCart, getCartTotal, getCartCount } = useCart();

  const moods = [ /* ...moods array unchanged... */
    { id: 'relaxing', label: 'Relaxing', icon: Waves, color: 'bg-blue-100 text-blue-600' },
    { id: 'adventurous', label: 'Adventurous', icon: Mountain, color: 'bg-green-100 text-green-600' },
    { id: 'social', label: 'Social', icon: Music, color: 'bg-purple-100 text-purple-600' },
    { id: 'cultural', label: 'Cultural', icon: Camera, color: 'bg-orange-100 text-orange-600' },
    { id: 'luxury', label: 'Luxury', icon: Sun, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'foodie', label: 'Foodie', icon: Utensils, color: 'bg-red-100 text-red-600' },
    { id: 'explorer', label: 'Explorer', icon: Compass, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'local', label: 'Local', icon: Home, color: 'bg-amber-100 text-amber-600' },
  ];

  // Static data remains the fallback
  const staticItineraryData: ItineraryData = { /* ...your full static data object... */
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
      },
      day3: {
        title: "Ultimate Serenity",
        activities: [
          {
            time: "8:00 AM",
            title: "Guided Meditation at Villa",
            description: "Private meditation session in a serene garden",
            duration: "1 hour",
            type: "wellness",
            price: 1500,
            location: "Private Villa, Assagao",
            rating: 4.9,
            bookable: true,
            coordinates: [15.5925, 73.7595]
          },
          {
            time: "12:00 PM",
            title: "Private Pool Day & Lunch",
            description: "Relax by a private pool with a catered lunch",
            duration: "4 hours",
            type: "leisure",
            price: 7000,
            location: "Private Villa",
            rating: 4.8,
            bookable: true,
            coordinates: [15.5925, 73.7595]
          },
          {
            time: "5:00 PM",
            title: "Sunset Houseboat Cruise",
            description: "Gentle cruise on the Sal backwaters at sunset",
            duration: "2 hours",
            type: "leisure",
            price: 4500,
            location: "Sal River",
            rating: 4.7,
            bookable: true,
            coordinates: [15.2285, 73.9351]
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
      },
      day3: {
        title: "Coastal Thrills",
        activities: [
          {
            time: "9:00 AM",
            title: "Canyoning at Netravali",
            description: "Jump, slide, and swim through jungle canyons",
            duration: "5 hours",
            type: "adventure",
            price: 4000,
            location: "Netravali Wildlife Sanctuary",
            rating: 4.8,
            bookable: true,
            coordinates: [15.0116, 74.2497]
          },
          {
            time: "3:00 PM",
            title: "Bungee Jumping",
            description: "Leap from a high platform over the Mayem Lake",
            duration: "1 hour",
            type: "adventure",
            price: 3500,
            location: "Mayem Lake, Bicholim",
            rating: 4.7,
            bookable: true,
            coordinates: [15.5583, 73.9408]
          },
          {
            time: "7:00 PM",
            title: "Go-Karting at Arpora",
            description: "Race high-speed karts on a professional track",
            duration: "1.5 hours",
            type: "adventure",
            price: 1000,
            location: "Arpora",
            rating: 4.4,
            bookable: true,
            coordinates: [15.5682, 73.7554]
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
      },
      day2: {
        title: "Party & People",
        activities: [
          {
            time: "11:00 AM",
            title: "Backpacker Hostel Meetup",
            description: "Join the daily meetup at a popular hostel for brunch & games",
            duration: "2 hours",
            type: "social",
            price: 600,
            location: "The Hosteller, Anjuna",
            rating: 4.6,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          },
          {
            time: "4:00 PM",
            title: "Beach Party at Curlies",
            description: "Experience the iconic beach party scene with live DJs",
            duration: "4 hours",
            type: "social",
            price: 1000,
            location: "Curlies Beach Shack, Anjuna",
            rating: 4.3,
            bookable: true,
            coordinates: [15.5735, 73.7407]
          },
          {
            time: "9:00 PM",
            title: "Clubbing at Titos Lane",
            description: "Bar hop and dance the night away at Goa's most famous party street",
            duration: "3 hours",
            type: "social",
            price: 2000,
            location: "Titos Lane, Baga",
            rating: 4.2,
            bookable: true,
            coordinates: [15.5537, 73.7525]
          }
        ]
      },
      day3: {
        title: "Connections & Fun",
        activities: [
          {
            time: "10:00 AM",
            title: "Group Surf Lesson",
            description: "Learn to surf with a group of beginners",
            duration: "2.5 hours",
            type: "social",
            price: 1800,
            location: "Ashwem Beach",
            rating: 4.7,
            bookable: true,
            coordinates: [15.6375, 73.7224]
          },
          {
            time: "2:00 PM",
            title: "Local Market Barter Challenge",
            description: "Team up and find items in a fun barter challenge at Mapusa Market",
            duration: "2 hours",
            type: "social",
            price: 300,
            location: "Mapusa Market",
            rating: 4.4,
            bookable: true,
            coordinates: [15.5909, 73.8081]
          },
          {
            time: "7:00 PM",
            title: "Pub Crawl in Panaji",
            description: "Guided tour of the best local bars and pubs in the capital city",
            duration: "3 hours",
            type: "social",
            price: 1200,
            location: "Panaji",
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
      },
      day2: {
        title: "Temples & Traditions",
        activities: [
          {
            time: "10:00 AM",
            title: "Visit Mangeshi Temple",
            description: "Explore one of Goa's most prominent Hindu temples",
            duration: "2 hours",
            type: "culture",
            price: 500,
            location: "Mangeshi Village, Ponda",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4206, 73.9696]
          },
          {
            time: "1:00 PM",
            title: "Goan Folk Dance Performance",
            description: "Watch a live performance of traditional Goan folk dances with lunch",
            duration: "2.5 hours",
            type: "culture",
            price: 1500,
            location: "Cultural Center, Ponda",
            rating: 4.7,
            bookable: true,
            coordinates: [15.4012, 74.0134]
          },
          {
            time: "4:00 PM",
            title: "Reis Magos Fort Tour",
            description: "Discover the history of this beautifully restored riverside fort",
            duration: "1.5 hours",
            type: "culture",
            price: 200,
            location: "Reis Magos",
            rating: 4.5,
            bookable: true,
            coordinates: [15.4947, 73.8058]
          }
        ]
      },
      day3: {
        title: "Art & Museums",
        activities: [
          {
            time: "11:00 AM",
            title: "Goa Chitra Museum",
            description: "Discover thousands of traditional Goan artifacts",
            duration: "2.5 hours",
            type: "culture",
            price: 300,
            location: "Benaulim",
            rating: 4.8,
            bookable: true,
            coordinates: [15.2530, 73.9351]
          },
          {
            time: "3:00 PM",
            title: "Fontainhas Heritage Walk",
            description: "Explore the colourful Portuguese-style Latin Quarter of Panaji",
            duration: "2 hours",
            type: "culture",
            price: 800,
            location: "Fontainhas, Panaji",
            rating: 4.7,
            bookable: true,
            coordinates: [15.4975, 73.8290]
          },
          {
            time: "7:00 PM",
            title: "Classical Sitar Concert",
            description: "Enjoy an evening of live Indian classical music",
            duration: "2 hours",
            type: "culture",
            price: 750,
            location: "Kala Academy, Panaji",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4967, 73.8188]
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
      },
      day2: {
        title: "Casino Royale Night",
        activities: [
          {
            time: "11:00 AM",
            title: "Designer Shopping",
            description: "Private appointments at high-end boutiques in Panaji",
            duration: "3 hours",
            type: "luxury",
            price: 1000,
            location: "Panaji",
            rating: 4.4,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          },
          {
            time: "4:00 PM",
            title: "High Tea at the Taj",
            description: "Elegant high tea service with ocean views at the Taj Fort Aguada",
            duration: "2 hours",
            type: "luxury",
            price: 3000,
            location: "Taj Fort Aguada, Candolim",
            rating: 4.8,
            bookable: true,
            coordinates: [15.5029, 73.7667]
          },
          {
            time: "8:00 PM",
            title: "VIP Casino Experience",
            description: "VIP entry, private tables, and unlimited drinks at Deltin Royale",
            duration: "5 hours",
            type: "luxury",
            price: 10000,
            location: "Deltin Royale, Mandovi River",
            rating: 4.6,
            bookable: true,
            coordinates: [15.4984, 73.8239]
          }
        ]
      },
      day3: {
        title: "Sky & Sea Indulgence",
        activities: [
          {
            time: "9:00 AM",
            title: "Private Helicopter Tour",
            description: "Breathtaking aerial views of Goa's coastline and ghats",
            duration: "1 hour",
            type: "luxury",
            price: 25000,
            location: "Goa Airport",
            rating: 4.9,
            bookable: true,
            coordinates: [15.3803, 73.8310]
          },
          {
            time: "1:00 PM",
            title: "Private Beach Picnic",
            description: "A gourmet picnic with a private chef on a secluded beach",
            duration: "3 hours",
            type: "luxury",
            price: 12000,
            location: "Butterfly Beach",
            rating: 4.8,
            bookable: true,
            coordinates: [15.0006, 73.9856]
          },
          {
            time: "7:00 PM",
            title: "Exclusive Club Night",
            description: "Private table at an exclusive, invitation-only Goan club",
            duration: "4 hours",
            type: "luxury",
            price: 18000,
            location: "Secret Location, Vagator",
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
      },
      day2: {
        title: "Seafood & Spirits",
        activities: [
          {
            time: "8:00 AM",
            title: "Local Fish Market Tour",
            description: "Visit the bustling wholesale fish market in Margao",
            duration: "2 hours",
            type: "food",
            price: 500,
            location: "Margao Fish Market",
            rating: 4.3,
            bookable: true,
            coordinates: [15.2754, 73.9610]
          },
          {
            time: "11:00 AM",
            title: "Goan Fish Curry Masterclass",
            description: "Learn the secrets to the perfect Goan Prawn Curry",
            duration: "3 hours",
            type: "food",
            price: 2500,
            location: "Siolim Cooking School",
            rating: 4.8,
            bookable: true,
            coordinates: [15.6022, 73.7788]
          },
          {
            time: "5:00 PM",
            title: "Feni & Cashew Tasting",
            description: "Tour a traditional distillery and taste local Feni spirits",
            duration: "2 hours",
            type: "food",
            price: 1200,
            location: "Local Distillery, Ponda",
            rating: 4.5,
            bookable: true,
            coordinates: [15.4012, 74.0134]
          }
        ]
      },
      day3: {
        title: "Modern & Traditional Tastes",
        activities: [
          {
            time: "10:00 AM",
            title: "Assagao Cafe Crawl",
            description: "Explore the trendiest brunch spots and cafes in 'Goa's Brooklyn'",
            duration: "3 hours",
            type: "food",
            price: 1800,
            location: "Assagao",
            rating: 4.6,
            bookable: true,
            coordinates: [15.5925, 73.7595]
          },
          {
            time: "2:00 PM",
            title: "Portuguese Bakery Tour",
            description: "Taste traditional Goan sweets and breads like Pao and Bebinca",
            duration: "2 hours",
            type: "food",
            price: 800,
            location: "Old Panaji",
            rating: 4.7,
            bookable: true,
            coordinates: [15.4909, 73.8278]
          },
          {
            time: "8:00 PM",
            title: "Modern Goan Tasting Menu",
            description: "Experience innovative Goan cuisine at a top-rated restaurant",
            duration: "3 hours",
            type: "food",
            price: 4500,
            location: "The Black Sheep Bistro, Panaji",
            rating: 4.8,
            bookable: true,
            coordinates: [15.4967, 73.8258]
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
      },
      day3: {
        title: "Deep Goa Discovery",
        activities: [
          {
            time: "8:00 AM",
            title: "Tambdi Surla Temple Visit",
            description: "Trek through the jungle to find a hidden 12th-century temple",
            duration: "4 hours",
            type: "adventure",
            price: 1800,
            location: "Bhagwan Mahavir Sanctuary",
            rating: 4.8,
            bookable: true,
            coordinates: [15.4542, 74.2541]
          },
          {
            time: "2:00 PM",
            title: "Hike to a Secret Waterfall",
            description: "Guided hike to a lesser-known waterfall for a private swim",
            duration: "3 hours",
            type: "nature",
            price: 1200,
            location: "Netravali",
            rating: 4.6,
            bookable: true,
            coordinates: [15.0116, 74.2497]
          },
          {
            time: "7:00 PM",
            title: "Dinner in a Local Village",
            description: "Authentic meal in a local village, far from the tourist trail",
            duration: "2.5 hours",
            type: "food",
            price: 900,
            location: "Remote Village, South Goa",
            rating: 4.9,
            bookable: true,
            coordinates: [15.1500, 74.1000]
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
      },
      day3: {
        title: "Community & Craft",
        activities: [
          {
            time: "8:00 AM",
            title: "Poder (Goan Bread) Making",
            description: "Visit a traditional Goan bakery and learn to make Pao",
            duration: "2 hours",
            type: "local",
            price: 700,
            location: "Local Bakery, Saligao",
            rating: 4.8,
            bookable: true,
            coordinates: [15.5667, 73.7667],
            localGuide: "Jose Braganza"
          },
          {
            time: "11:00 AM",
            title: "Coir Weaving Workshop",
            description: "Learn the traditional craft of weaving coconut coir mats",
            duration: "2.5 hours",
            type: "local",
            price: 600,
            location: "Craft Village, Canacona",
            rating: 4.6,
            bookable: true,
            coordinates: [15.0168, 74.0195],
            localGuide: "Anita Gaonkar"
          },
          {
            time: "5:00 PM",
            title: "Attend a Local Football Match",
            description: "Experience Goa's passion for football with local fans at a village game",
            duration: "2 hours",
            type: "local",
            price: 100,
            location: "Village Ground, Varca",
            rating: 4.7,
            bookable: true,
            coordinates: [15.2285, 73.9351],
            localGuide: "Rohan Fernandes"
          }
        ]
      }
    }
  };

  // State holds the currently displayed itinerary
  const [displayedItinerary, setDisplayedItinerary] = useState<ItineraryData>(staticItineraryData);
  const [numDaysDisplay, setNumDaysDisplay] = useState<string>(numDays.toString());

  // Safely get the current day's plan
  const getCurrentItinerary = (): DayPlan => {
    const moodData = displayedItinerary[selectedMood];
    const dayData = moodData?.[selectedDay];
    return dayData || { title: `Plan for ${selectedDay.replace('day', 'Day ')}`, activities: [] };
  };

  // --- Helper Functions (unchanged) ---
  const getActivityIcon = (type: string) => { /* ... */
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
  const triggerCartAnimation = () => { /* ... */
      setIsCartAnimating(true);
    setTimeout(() => { setIsCartAnimating(false); }, 300);
   };
  const bookActivity = (activity: Activity) => { /* ... */
      addToCart(activity);
    toast.success(`${activity.title} added to cart! Click cart to checkout.`, { duration: 2000 });
    triggerCartAnimation();
   };
  const handleAddToCart = (activity: Activity) => { /* ... */
      addToCart(activity);
    toast.success(`${activity.title} added to cart!`, { duration: 2000 });
    triggerCartAnimation();
   };
  const viewOnMap = (activity: Activity) => { /* ... */
      setSelectedLocation(activity);
    setIsMapOpen(true);
   };
  const parseTime = (timeStr: string): number => { /* ... */
      if (!timeStr || !timeStr.includes(':')) {
        console.warn("Invalid time format received:", timeStr);
        return 0;
    }
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    hours = isNaN(hours) ? 0 : hours;
    minutes = isNaN(minutes) ? 0 : minutes;

    if (hours === 12) hours = modifier === 'AM' ? 0 : 12;
    else if (modifier === 'PM') hours += 12;
    return hours * 60 + minutes;
   };
  const getTimeOfDay = (timeStr: string): 'morning' | 'afternoon' | 'evening' => { /* ... */
      const totalMinutes = parseTime(timeStr);
    if (totalMinutes < 12 * 60) return 'morning';
    if (totalMinutes < 17 * 60) return 'afternoon';
    return 'evening';
   };
  // ------------------------------------

  // Generates full plan for specified days via backend
  const generateAiItinerary = async () => {
    if (!locationInput.trim()) {
        toast.error("Please enter a location first.");
        return;
    }
    setIsLoading(true);
    setHasGeneratedOrShuffled(false);

    // Create base titles dynamically
    const baseTitles: { [key: string]: string } = {};
    const dayKeys = Array.from({ length: numDays }, (_, i) => `day${i + 1}`);
    dayKeys.forEach(dayKey => {
        baseTitles[dayKey] = staticItineraryData[selectedMood]?.[dayKey]?.title || `AI Generated ${dayKey.replace('day', 'Day ')}`;
    });


    try {
      const response = await fetch('https://my-fastapi-backend.vercel.app/api/generate-itinerary', { // Ensure URL/port
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // --- Send all inputs ---
        body: JSON.stringify({
            mood: selectedMood,
            location: locationInput,
            num_days: numDays,
            budget: budgetInput // Send budget string (can be empty)
        }),
        // -----------------------
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch activities from backend');
      }

      const generatedActivities: Activity[] = await response.json();
      const expectedMinActivities = numDays * 3;

      if (!Array.isArray(generatedActivities) || generatedActivities.length < expectedMinActivities) {
        console.warn(`Received fewer activities (${generatedActivities.length}) than expected minimum (${expectedMinActivities}).`);
        if (generatedActivities.length === 0) throw new Error('Backend returned no activities.');
      }

      // --- Distribute activities across DYNAMIC number of days ---
      const newMoodItinerary: MoodItinerary = {};
      dayKeys.forEach(dayKey => {
          newMoodItinerary[dayKey] = { title: `${baseTitles[dayKey]} (AI)`, activities: [] };
      });

      generatedActivities.forEach((activity, index) => {
        const targetDayKey = dayKeys[index % numDays]; // Use numDays for distribution
        if (newMoodItinerary[targetDayKey]) {
            newMoodItinerary[targetDayKey].activities.push(activity);
        } else {
            console.error(`Target day ${targetDayKey} does not exist.`); // Should not happen
        }
      });

      // Sort activities within each day
      dayKeys.forEach(dayKey => {
        if (newMoodItinerary[dayKey]?.activities) {
          newMoodItinerary[dayKey].activities.sort((a, b) => parseTime(a.time) - parseTime(b.time));
        }
      });
      // --- End Distribution ---

      setDisplayedItinerary(prev => ({ ...prev, [selectedMood]: newMoodItinerary }));
      setHasGeneratedOrShuffled(true); // Indicate generation happened
      // Update selectedDay if it's now out of bounds
      if (parseInt(selectedDay.replace('day','')) > numDays) {
          setSelectedDay('day1');
      }
      toast.success(`✨ AI generated a ${numDays}-day ${selectedMood} plan for ${locationInput}!`, { duration: 2500 });

    } catch (error: any) {
      console.error("Error generating AI itinerary:", error);
      toast.error(`Error: ${error.message || 'Could not generate AI plan.'}`, { duration: 3000 });
      // Revert to static data on error
      setDisplayedItinerary(prev => ({
          ...prev,
          [selectedMood]: staticItineraryData[selectedMood] || {} // Ensure fallback exists
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Shuffle static data across the first 3 days (keeps original behavior)
  // Shuffle static data across the first 3 days (keeps original behavior)
  const reshuffleStaticData = () => {
      const moodKey = selectedMood as keyof typeof staticItineraryData;
      const sourceItinerary = staticItineraryData[moodKey]; // Use static as source

      // --- Robustness Check 1: Ensure static data exists for the mood ---
      if (!sourceItinerary || typeof sourceItinerary !== 'object') {
          toast.error(`Static itinerary data is missing or invalid for mood: ${selectedMood}`);
          console.error("Missing/invalid static data for mood:", selectedMood, sourceItinerary);
          // Optionally reset to a known good state or just return
           setDisplayedItinerary(staticItineraryData); // Reset to base static data
          return;
      }

      const shuffle = <T,>(arr: T[]): T[] => {
            const copy = [...arr];
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy;
      };

      const allActivities: Record<'morning' | 'afternoon' | 'evening', Activity[]> = {
          morning: [], afternoon: [], evening: [],
      };

      // --- Robustness Check 2: Safely iterate over potential days ---
      Object.values(sourceItinerary).forEach((day: DayPlan | undefined | null) => {
         // Check if day exists and has an activities array
         if (day && Array.isArray(day.activities)) {
             day.activities.forEach((activity: Activity | undefined | null) => {
                 // Check if activity exists and has a time property
                 if (activity && typeof activity.time === 'string' && activity.time.includes(':')) {
                    try {
                        // Attempt to classify time, handle potential errors in getTimeOfDay/parseTime
                        const timeOfDay = getTimeOfDay(activity.time);
                        allActivities[timeOfDay].push(activity);
                    } catch (timeError) {
                        console.warn("Skipping static activity due to time parsing error:", activity, timeError);
                    }
                 } else {
                     console.warn("Skipping static activity due to missing/invalid data:", activity);
                 }
             });
         } else {
             // Log if a day structure is missing or invalid in static data
             // console.warn("Invalid or missing day structure in static data for mood:", selectedMood, day);
         }
      });

      // --- Robustness Check 3: Check if any activities were actually collected ---
       const totalCollected = allActivities.morning.length + allActivities.afternoon.length + allActivities.evening.length;
       if (totalCollected === 0) {
           toast.error(`No valid activities found in the static data for mood: ${selectedMood}. Cannot shuffle.`);
           console.error("No valid activities collected from static data for mood:", selectedMood);
           // Optionally reset to base static data
           setDisplayedItinerary(staticItineraryData);
           return;
       }


      allActivities.morning = shuffle(allActivities.morning);
      allActivities.afternoon = shuffle(allActivities.afternoon);
      allActivities.evening = shuffle(allActivities.evening);

      // --- Ensure base titles exist ---
      const baseTitles = {
          day1: sourceItinerary.day1?.title || "Day 1",
          day2: sourceItinerary.day2?.title || "Day 2",
          day3: sourceItinerary.day3?.title || "Day 3",
      }

      // --- Reconstruct the 3-day structure ---
      const newMoodItinerary: MoodItinerary = {
          day1: { title: `${baseTitles.day1} (Shuffled)`, activities: [] },
          day2: { title: `${baseTitles.day2} (Shuffled)`, activities: [] },
          day3: { title: `${baseTitles.day3} (Shuffled)`, activities: [] },
      };

      const allShuffledActivities = [...allActivities.morning, ...allActivities.afternoon, ...allActivities.evening];
      let dayIndex = 0;
      const dayKeys = ['day1', 'day2', 'day3']; // Shuffle static across 3 days
      allShuffledActivities.forEach((activity) => {
          const targetDayKey = dayKeys[dayIndex % 3];
          // Ensure the target day exists (it should based on initialization)
          if (newMoodItinerary[targetDayKey]) {
             newMoodItinerary[targetDayKey].activities.push(activity);
          }
          dayIndex++;
      });

      // Sort activities within each day
      dayKeys.forEach(dayKey => {
          if (newMoodItinerary[dayKey]?.activities) {
              newMoodItinerary[dayKey].activities.sort((a, b) => parseTime(a.time) - parseTime(b.time));
          }
      });

      // Update the main state
      setDisplayedItinerary((prev) => ({ ...prev, [selectedMood]: newMoodItinerary }));
      setHasGeneratedOrShuffled(true);
      toast.success(`✨ ${selectedMood} itinerary reshuffled across 3 days!`, { duration: 2000 });
   };


  // MapView component (unchanged)
  const MapView = ({ activity }: { activity: Activity | null }) => ( /* ... */
      <div className="space-y-4">
      {activity ? (
        <>
        <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-medium">{activity.title}</h3>
            <p className="text-sm text-muted-foreground">{activity.location}</p>
            {activity.coordinates && (
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
        </>
      ) : (
         <p>No location selected.</p>
      )}
    </div>
  );

  // --- JSX ---
  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" />

      {/* Header with Cart (Keep original) */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Mood & Location Planning</h2>
          <p className="text-muted-foreground">AI adapts your trip based on your mood and chosen place</p>
        </div>
        {/* Cart Button and Dialog (Keep original) */}
         <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={`relative transition-transform duration-300 ease-out ${
                isCartAnimating ? 'scale-110' : 'scale-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({getCartCount()})
              {getCartCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5"> {/* Original Position */}
                  {getCartCount()}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
           <DialogContent className="max-w-md">

             {/* ... Cart Content ... */}
             <DialogHeader>
              <DialogTitle>Your Activity Cart</DialogTitle>
              <DialogDescription>Review and book your selected activities</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-96">
              <div className="space-y-4 p-1">
                {!cart || cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                ) : (
                  cart.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-muted/50">
                      <div className="flex-1 mr-2">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <IndianRupee className="w-3 h-3" />
                          <span className="text-sm font-medium">{(item.price || 0).toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">x {item.quantity || 1}</span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id!)} className="h-8 w-8">
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            {cart && cart.length > 0 && (
              <div className="space-y-4 pt-4 border-t mt-4">
                <div className="flex items-center justify-between font-medium">
                  <span>Total:</span>
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="w-4 h-4" />
                    <span>{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setIsPaymentOpen(true)}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

             {/* Mood Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
         <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-700">
                <Zap className="w-5 h-5" />
                <span>AI Insights & Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {hasGeneratedOrShuffled && ( // Updated message
                  <p className="font-medium text-purple-800">
                    🔄 AI has generated a fresh {numDays}-day plan for your '{selectedMood}' mood in {locationInput}! Check Day 1-{numDays}.
                  </p>
                )}
                 <p>📍 Enter your destination, trip duration (1-7 days), and optionally a budget.</p>
                 <p>💖 Select the mood that best fits your desired trip vibe.</p>
                 <p>⚡ Click "Generate AI Plan" to get a custom itinerary!</p>
                 <p className="text-xs text-muted-foreground pt-2"> (Note: The "Shuffle Static" button uses pre-defined Goa activities for 3 days.)</p>

              </div>
            </CardContent>
      </Card>
      {/* --- MODIFIED: Location, Days, Budget Input Card --- */}
      <Card>
        <CardHeader className="pb-4"> {/* Reduced bottom padding */}
            <CardTitle className="flex items-center space-x-2 text-base font-medium"> {/* Smaller title */}
                <MapPin className="w-4 h-4" />
                <span>Trip Details</span>
            </CardTitle>
             {/* Removed CardDescription or make it smaller if needed */}
        </CardHeader>
        <CardContent>
             {/* Use Flexbox for side-by-side layout, wrap on smaller screens */}
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-end"> {/* Gap adjusted */}
                {/* Location Input */}
                <div className="space-y-1.5 flex-3 w-full sm:w-auto"> {/* flex-1 allows growth */}
                    <Label htmlFor="location" className="text-xs font-normal">Location</Label> {/* Smaller label */}
                    <Input
                        type="text"
                        id="location"
                        placeholder="E.g., Paris, France"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        aria-label="Location Input"
                        className="h-9 text-sm" // Smaller height and text
                    />
                </div>
                {/* Number of Days Input */}
                <div className="space-y-1.5 w-full sm:w-auto sm:min-w-[80px]">
                    <Label htmlFor="numDays" className="text-xs font-normal">Days (1-7)</Label>
                    <Input
                        type="text" // Keep as text to allow intermediate states
                        id="numDays"
                        value={numDaysDisplay} // Bind to the display state
                        onChange={(e) => {
                            const newValue = e.target.value;
                            // Allow only empty string or a single digit from 1 to 7
                            if (/^[1-7]?$/.test(newValue)) {
                                setNumDaysDisplay(newValue); // Update display immediately

                                // If it's a valid number, update the actual numDays state
                                const val = parseInt(newValue, 10);
                                if (!isNaN(val) && val >= 1 && val <= 7) {
                                    setNumDays(val);
                                    // Reset selectedDay if it becomes invalid
                                    if (parseInt(selectedDay.replace('day','')) > val) {
                                        setSelectedDay('day1');
                                    }
                                }
                            }
                            // Do nothing if the input doesn't match the regex (e.g., letters, '0', '8')
                        }}
                        onBlur={() => {
                            // If the user leaves the field empty or invalid, reset to 1
                            const val = parseInt(numDaysDisplay, 10);
                            if (isNaN(val) || val < 1 || val > 7) {
                                setNumDays(1);
                                setNumDaysDisplay('1');
                                if (selectedDay !== 'day1') setSelectedDay('day1'); // Ensure day selector resets
                            }
                        }}
                        maxLength={1} // Only allow one character
                        aria-label="Number of days for itinerary (1 to 7)"
                         className="h-9 text-sm" // Keep smaller style
                    />
                </div>
                 {/* Budget Input */}
                 <div className="space-y-1.5 w-full sm:w-auto sm:min-w-[120px]"> {/* Min width */}
                    <Label htmlFor="budget" className="text-xs font-normal">Budget (Optional)</Label> {/* Smaller label */}
                    <Input
                        type="text"
                        id="budget"
                        placeholder="E.g., 5000 INR or 'Low'"
                        value={budgetInput}
                        onChange={(e) => setBudgetInput(e.target.value)}
                        aria-label="Optional budget for the trip"
                         className="h-9 text-sm" // Smaller height and text
                    />
                </div>
            </div>
            {/* Main AI Generation Button */}
            <Button
                onClick={generateAiItinerary}
                variant="default"
                disabled={isLoading || !locationInput.trim()}
                className="sm:w-20vw px-4 my-5" // Standard padding, auto width on larger screens
                size="sm" // Standard button size
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating... {/* Shorter text */}
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate AI Plan {/* Shorter text */}
                </>
              )}
            </Button>
        </CardContent>
      </Card>


      {/* Mood Selection (Keep original) */}
      <Card>
           <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Select Your Mood</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
             {/* Mood buttons - Original simpler style */}
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => {
                    setSelectedMood(mood.id);
                    setHasGeneratedOrShuffled(false);
                    setSelectedDay('day1');
                    setDisplayedItinerary(staticItineraryData); // Reset on mood change
                  }}
                  className={`
                    p-4 rounded-lg text-center transition-all hover:scale-105
                    ${
                      selectedMood === mood.id
                        ? `${mood.color} ring-2 ring-current ring-opacity-30` // Original selected style
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }
                  `}
                  aria-label={`Select ${mood.label} mood`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">{mood.label}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>


      {/* --- MODIFIED: Day Selection and Action Buttons --- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"> {/* Adjusted gap */}
        {/* Day Select */}
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-20 sm:min-w-[120px]"> {/* Adjusted width */}
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: numDays }, (_, i) => `day${i + 1}`).map(dayKey => (
              <SelectItem key={dayKey} value={dayKey}>
                {`Day ${dayKey.replace('day', '')}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Action Buttons Group - Use flex wrap */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:w-auto">

            {/* Optional: Button to Shuffle Static Data */}
            <Button
                onClick={reshuffleStaticData}
                variant="outline"
                disabled={isLoading}
                className="sm:w-auto px-4" // Standard padding, auto width on larger screens
                size="sm" // Standard button size
            >
                <RefreshCw className="w-4 h-4 mr-2" />
                 Reshuffle activities {/* Shorter text */}
            </Button>
        </div>
      </div>


      {/* Itinerary Display (Keep original) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{getCurrentItinerary()?.title || `Itinerary - ${selectedDay.replace('day', 'Day ')}`}</span>
          </CardTitle>
          <CardDescription>
            {(getCurrentItinerary()?.activities?.length || 0) > 0
              ? `Plan for your ${selectedMood} mood in ${locationInput}${budgetInput ? ` (Budget: ${budgetInput})` : ''}`
              : "No activities planned. Enter details above & generate an AI plan!"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!(getCurrentItinerary()?.activities?.length) ? (
              <p className="text-center text-muted-foreground py-8">
                No activities to display for this day.
              </p>
            ) : (
              // Original Activity Card Layout
              getCurrentItinerary().activities.map((activity: Activity, index: number) => {
                const Icon = getActivityIcon(activity.type);
                const isBookable = activity.bookable;
                const itemKey = `${activity.title}-${activity.time}-${index}`;

                return (
                  <div key={itemKey} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                    {/* ... Activity card content (unchanged) ... */}
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
                          {activity.rating != null && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>{activity.rating}</span>
                            </div>
                          )}
                          {activity.localGuide && (
                             <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3"/>
                              <span>Guide: {activity.localGuide}</span>
                            </div>
                          )}
                        </div>
                         {activity.price != null && (
                          <div className="flex items-center space-x-1 font-medium text-primary">
                            <IndianRupee className="w-4 h-4" />
                            <span>{activity.price === 0 ? 'Free' : activity.price.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                       {isBookable && (
                        <div className="flex items-center space-x-2 pt-2">
                          <Button size="sm" onClick={() => bookActivity(activity)} className="flex-1">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddToCart(activity)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Cart
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => viewOnMap(activity)}>
                            <Map className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

     

      {/* Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
         <DialogContent className="max-w-md">
          {/* ... Map Dialog Content ... */}
           <DialogHeader>
            <DialogTitle>Location & Map</DialogTitle>
            <DialogDescription>View location details and get directions</DialogDescription>
          </DialogHeader>
          <MapView activity={selectedLocation} />
        </DialogContent>
      </Dialog>

      {/* Payment Checkout */}
      <PaymentCheckout isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </div>
  );
}