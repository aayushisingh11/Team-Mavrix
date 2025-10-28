import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { useCart } from "./CartContext";
import { toast } from "sonner@2.0.3";
import {
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Plane,
  Clock,
  TrendingUp,
  Heart,
  Train,
  Bus,
  Info,
  Activity,
  Plus,
  Trash2,
  IndianRupee,
  Star,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import JourneyDetailsCard from "./JourneyDetailsCard";

export function TripOverview() {
  const { addToCart } = useCart();
  const [selectedDay, setSelectedDay] = useState("2024-12-15");
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  const journeyDetails = {
    departure: "Mumbai Central",
    arrival: "Goa",
    departureDate: "2024-12-15",
    returnDate: "2024-12-22",
    transport: "flight",
    bookingId: "AI2045",
  };

  const groupInfo = [
    { name: "John Doe", age: 29, gender: "Male" },
    { name: "Sarah Wilson", age: 27, gender: "Female" },
    { name: "Mike Chen", age: 31, gender: "Male" },
  ];

  const moodPlanningStats = {
    totalActivities: 15,
    bookedActivities: 8,
    pendingBookings: 3,
    totalSpent: 12500,
    estimatedTotal: 18000,
  };

  // Sample booked activities timeline
  const [bookedActivities, setBookedActivities] = useState([
    {
      id: "1",
      date: "2024-12-15",
      time: "09:00 AM",
      title: "Sunrise Yoga at Arambol Beach",
      description: "Start your day with peaceful yoga by the sea",
      duration: "1 hour",
      type: "wellness",
      price: 800,
      location: "Arambol Beach",
      rating: 4.7,
      status: "confirmed",
      coordinates: [15.6868, 73.7017],
    },
    {
      id: "2",
      date: "2024-12-15",
      time: "02:00 PM",
      title: "Dudhsagar Waterfall Trek",
      description: "Challenging hike to Goa's highest waterfall",
      duration: "6 hours",
      type: "adventure",
      price: 2500,
      location: "Dudhsagar Falls",
      rating: 4.8,
      status: "confirmed",
      coordinates: [15.3144, 74.3144],
    },
    {
      id: "3",
      date: "2024-12-16",
      time: "10:00 AM",
      title: "Private Yacht Charter",
      description: "Exclusive yacht experience with personal crew",
      duration: "4 hours",
      type: "luxury",
      price: 15000,
      location: "Mandovi Marina",
      rating: 4.9,
      status: "pending",
      coordinates: [15.4909, 73.8278],
    },
    {
      id: "4",
      date: "2024-12-16",
      time: "07:00 PM",
      title: "Seafood Feast by the Beach",
      description: "Fresh catch of the day prepared by local fishermen",
      duration: "2 hours",
      type: "food",
      price: 2200,
      location: "Fisherman's Cove, Anjuna",
      rating: 4.7,
      status: "confirmed",
      coordinates: [15.5735, 73.7407],
    },
    {
      id: "5",
      date: "2024-12-17",
      time: "08:00 AM",
      title: "Parasailing Experience",
      description: "Soar high above the Arabian Sea",
      duration: "2 hours",
      type: "adventure",
      price: 3200,
      location: "Calangute Beach",
      rating: 4.7,
      status: "confirmed",
      coordinates: [15.5333, 73.75],
    },
  ]);

  const availableActivities = [
    {
      title: "Spice Plantation Tour",
      description: "Guided tour of tropical spice gardens",
      duration: "2 hours",
      type: "nature",
      price: 1000,
      location: "Sahakari Spice Farm",
      rating: 4.5,
      coordinates: [15.3173, 74.124],
    },
    {
      title: "Backwater Cruise",
      description: "Serene boat ride through Chapora River",
      duration: "2 hours",
      type: "leisure",
      price: 1500,
      location: "Chapora River",
      rating: 4.4,
      coordinates: [15.5991, 73.7364],
    },
    {
      title: "Heritage Churches Tour",
      description: "Explore UNESCO World Heritage churches",
      duration: "3 hours",
      type: "culture",
      price: 1200,
      location: "Old Goa",
      rating: 4.7,
      coordinates: [15.5057, 73.9135],
    },
  ];

  const getTransportIcon = (transport) => {
    switch (transport) {
      case "flight":
        return Plane;
      case "train":
        return Train;
      case "bus":
        return Bus;
      default:
        return Plane;
    }
  };

  const generateDateRange = () => {
    const start = new Date(journeyDetails.departureDate);
    const end = new Date(journeyDetails.returnDate);
    const dates = [];

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      dates.push(new Date(dt).toISOString().split("T")[0]);
    }
    return dates;
  };

  const getActivitiesForDate = (date) => {
    return bookedActivities
      .filter((activity) => activity.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const cancelActivity = (activityId) => {
    setBookedActivities((prev) =>
      prev.filter((activity) => activity.id !== activityId)
    );
    toast.success("Activity cancelled successfully");
  };

  const addNewActivity = (activity, selectedDate, selectedTime) => {
    const newActivity = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      ...activity,
      status: "pending",
    };

    setBookedActivities((prev) => [...prev, newActivity]);
    addToCart(newActivity);
    setIsAddActivityOpen(false);
    toast.success("Activity added to your timeline!");
  };

  const dateRange = generateDateRange();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h2 className="text-2xl">Trip Overview</h2>
        <p className="text-muted-foreground">
          Manage your complete travel experience
        </p>
      </div>

      {/* Journey Details Section */}
      <Card className="bg-gray-50 shadow-md rounded-lg border border-gray-200">
        <CardContent className="p-8">
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Journey Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Travel information and booking details
            </p>
          </div>

          {/* Main journey info row */}
          <div className="flex items-center gap-6">
            {/* Transport Icon - Leftmost */}
            <div className="flex-shrink-0">
              {React.createElement(getTransportIcon(journeyDetails.transport), {
                className: "w-8 h-8 text-indigo-600",
              })}
            </div>

            {/* Origin Details */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                {journeyDetails.departure}
              </span>
              <span className="mt-1 text-sm text-gray-600 font-medium">
                {new Date(journeyDetails.departureDate).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 text-gray-400">→</div>

            {/* Destination Details */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                {journeyDetails.arrival}
              </span>
              <span className="mt-1 text-sm text-gray-600 font-medium">
                {new Date(journeyDetails.returnDate).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </div>
          </div>

          {/* Booking ID - Below everything */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
            <span className="font-medium">Booking ID:</span>
            <Badge
              variant="secondary"
              className="px-3 py-1 rounded-md text-xs font-semibold"
            >
              {journeyDetails.bookingId}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Social Info Section */}
      <Card className="bg-gray-100">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-red-500">Travel Companions</h3>
            <p className="text-sm text-red-400">Group members for this trip</p>
          </div>

          <div className="space-y-3">
            {groupInfo.map((member, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 bg-white rounded-lg"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-600">
                    {member.age} years, {member.gender}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline Section */}
      <Card className="bg-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900">Activity Timeline</h3>
              <p className="text-sm text-gray-600">
                Your daily schedule and bookings
              </p>
            </div>
            <Button onClick={() => setIsAddActivityOpen(true)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>

          {/* Date Navigation */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {dateRange.map((date) => {
              const dayActivities = getActivitiesForDate(date);
              const isSelected = date === selectedDay;

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDay(date)}
                  className={`flex-shrink-0 p-3 rounded-lg border min-w-[120px] ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-xs mt-1 opacity-70">
                    {dayActivities.length} activities
                  </div>
                </button>
              );
            })}
          </div>

          {/* Activities for Selected Day */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <h4 className="font-medium">
                {new Date(selectedDay).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
            </div>

            <ScrollArea className="max-h-96">
              <div className="space-y-3">
                {getActivitiesForDate(selectedDay).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No activities scheduled for this day</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setIsAddActivityOpen(true)}
                    >
                      Add Activity
                    </Button>
                  </div>
                ) : (
                  getActivitiesForDate(selectedDay).map((activity) => (
                    <Card key={activity.id} className="bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                {activity.time}
                              </div>
                              <Badge
                                variant={
                                  activity.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  activity.status === "confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                                }
                              >
                                {activity.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {activity.type}
                              </Badge>
                            </div>

                            <h5 className="font-medium mb-1">
                              {activity.title}
                            </h5>
                            <p className="text-sm text-gray-600 mb-2">
                              {activity.description}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{activity.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{activity.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{activity.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <IndianRupee className="w-3 h-3" />
                                <span>{activity.price?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancelActivity(activity.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center p-3 bg-white rounded-lg">
              <Activity className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-lg font-medium">
                {bookedActivities.length}
              </div>
              <div className="text-xs text-gray-600">Total Booked</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <IndianRupee className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-lg font-medium">
                ₹
                {bookedActivities
                  .reduce((total, activity) => total + (activity.price || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Total Value</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-lg font-medium">
                {bookedActivities.filter((a) => a.status === "pending").length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Activity Dialog */}
      <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Activity</DialogTitle>
            <DialogDescription>
              Choose from available activities to add to your timeline
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-96">
            <div className="space-y-4">
              {availableActivities.map((activity, index) => (
                <Card key={index} className="cursor-pointer hover:bg-accent">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{activity.title}</h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {activity.description}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{activity.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{activity.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            <div className="flex items-center space-x-1 font-medium">
                              <IndianRupee className="w-4 h-4" />
                              <span>{activity.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <select
                          className="flex-1 p-2 border rounded text-sm"
                          id={`date-${index}`}
                          defaultValue={selectedDay}
                        >
                          {dateRange.map((date) => (
                            <option key={date} value={date}>
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </option>
                          ))}
                        </select>

                        <input
                          type="time"
                          className="p-2 border rounded text-sm"
                          id={`time-${index}`}
                          defaultValue="09:00"
                        />
                      </div>

                      <Button
                        className="w-full"
                        size="sm"
                        onClick={() => {
                          const selectedDate = document.getElementById(
                            `date-${index}`
                          ).value;
                          const selectedTime = document.getElementById(
                            `time-${index}`
                          ).value;
                          const timeFormatted = new Date(
                            `2000-01-01T${selectedTime}`
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          addNewActivity(activity, selectedDate, timeFormatted);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Timeline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Book Now Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-8"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
