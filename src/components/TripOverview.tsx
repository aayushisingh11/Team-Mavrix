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
import { UserCircle2, ArrowRight } from "lucide-react";
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
      <Card className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <h3 className="text-lg font-bold text-black">Journey Details</h3>
            <p className="mt-0.5 text-xs text-indigo-50">
              Travel information and booking details
            </p>
          </div>

          {/* Main Journey Info */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-8">
              {/* Transport Icon */}
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                {React.createElement(
                  getTransportIcon(journeyDetails.transport),
                  {
                    className: "w-6 h-6 text-indigo-600",
                  }
                )}
              </div>

              {/* Departure */}
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900">
                  {journeyDetails.departure}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    {new Date(journeyDetails.departureDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>

              {/* Arrival */}
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900">
                  {journeyDetails.arrival}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    {new Date(journeyDetails.returnDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking ID */}
            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-200">
              <CreditCard className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Booking ID
              </span>
              <Badge
                variant="secondary"
                className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded text-sm font-mono font-semibold"
              >
                {journeyDetails.bookingId}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Info Section */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <CardContent className="p-0">
          {/* Header Section - Matching gradient style */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-black">
                  Travel Companions
                </h3>
                <p className="mt-0.5 text-xs text-indigo-50">
                  Group members for this trip
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Users className="w-3.5 h-3.5" />
                {groupInfo.length}{" "}
                {groupInfo.length === 1 ? "Member" : "Members"}
              </span>
            </div>
          </div>

          {/* Members List */}
          <div className="px-6 py-6 space-y-3">
            {groupInfo.map((member, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {/* Avatar - Matching the transport icon style */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    member.gender === "Female" ? "bg-pink-100" : "bg-indigo-100"
                  } transition-transform group-hover:scale-110`}
                >
                  <UserCircle2
                    className={`w-6 h-6 ${
                      member.gender === "Female"
                        ? "text-pink-600"
                        : "text-indigo-600"
                    }`}
                  />
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-gray-900 truncate">
                    {member.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-1.5">
                    <span>{member.age} years</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>{member.gender}</span>
                  </div>
                </div>

                {/* Status Badge - Matching the booking ID badge style */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    Confirmed
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-blue-500/0 group-hover:from-indigo-500/5 group-hover:to-blue-500/5 transition-all pointer-events-none"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline Section */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <CardContent className="p-0">
          {/* Header Section - Matching gradient style */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-black">
                  Activity Timeline
                </h3>
                <p className="mt-0.5 text-xs text-indigo-50">
                  Your daily schedule and bookings
                </p>
              </div>
              <Button
                onClick={() => setIsAddActivityOpen(true)}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dateRange.map((date) => {
                const dayActivities = getActivitiesForDate(date);
                const isSelected = date === selectedDay;

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDay(date)}
                    className={`flex-shrink-0 p-4 rounded-lg border min-w-[130px] transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white border-indigo-700 shadow-lg scale-105 ring-2 ring-indigo-400/50"
                        : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`text-sm font-semibold ${
                        isSelected ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div
                      className={`text-xs mt-1.5 ${
                        isSelected ? "text-indigo-100" : "text-gray-600"
                      }`}
                    >
                      {dayActivities.length} activities
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activities for Selected Day */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                <CalendarIcon className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-900">
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
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-8 h-8 text-indigo-600" />
                    </div>
                    <p className="text-gray-600 font-medium mb-3">
                      No activities scheduled for this day
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddActivityOpen(true)}
                      className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                ) : (
                  getActivitiesForDate(selectedDay).map((activity) => (
                    <Card
                      key={activity.id}
                      className="bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                <Clock className="w-3.5 h-3.5" />
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
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-orange-100 text-orange-700 border-orange-200"
                                }
                              >
                                {activity.status}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs border-gray-300"
                              >
                                {activity.type}
                              </Badge>
                            </div>

                            <h5 className="font-bold text-gray-900 mb-1.5">
                              {activity.title}
                            </h5>
                            <p className="text-sm text-gray-600 mb-3">
                              {activity.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{activity.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{activity.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                  {activity.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 font-semibold text-gray-900">
                                <IndianRupee className="w-3.5 h-3.5" />
                                <span>{activity.price?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancelActivity(activity.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-300"
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
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {bookedActivities.length}
                </div>
                <div className="text-xs text-gray-600 mt-1">Total Booked</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ₹
                  {bookedActivities
                    .reduce(
                      (total, activity) => total + (activity.price || 0),
                      0
                    )
                    .toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 mt-1">Total Value</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {
                    bookedActivities.filter((a) => a.status === "pending")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-600 mt-1">Pending</div>
              </div>
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
