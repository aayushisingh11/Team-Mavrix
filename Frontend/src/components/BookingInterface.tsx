import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin, Users, Search, Plane, Train, Bus, Building } from 'lucide-react';
import FlightResults from './FlightResults';
import HotelResults from './HotelResults';
import TrainResults from './TrainResults';
import BusResults from './BusResults';

export default function BookingInterface() {
  const [searchMode, setSearchMode] = useState('flights');
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [departureDate, setDepartureDate] = useState('2024-09-05');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleModeChange = (mode: string) => {
    setSearchMode(mode);
    setShowResults(false); // Reset results when switching modes
  };

  const isRoundTrip = !!returnDate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Book Your Next Adventure</h1>
        <div className="text-sm text-gray-500">
          Get the best deals on flights, trains, buses, and hotels
        </div>
      </div>

      {/* Search Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant={searchMode === 'flights' ? 'secondary' : 'ghost'}
            onClick={() => handleModeChange('flights')}
            className="flex items-center gap-2"
          >
            <Plane className="w-4 h-4" />
            Flights
          </Button>
          <Button
            variant={searchMode === 'trains' ? 'secondary' : 'ghost'}
            onClick={() => handleModeChange('trains')}
            className="flex items-center gap-2"
          >
            <Train className="w-4 h-4" />
            Trains
          </Button>
          <Button
            variant={searchMode === 'buses' ? 'secondary' : 'ghost'}
            onClick={() => handleModeChange('buses')}
            className="flex items-center gap-2"
          >
            <Bus className="w-4 h-4" />
            Buses
          </Button>
          <Button
            variant={searchMode === 'hotels' ? 'secondary' : 'ghost'}
            onClick={() => handleModeChange('hotels')}
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            Hotels
          </Button>
        </div>

        {/* Dynamic form based on search mode */}
        {searchMode === 'hotels' ? (
          // Hotel search form
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City/Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                  placeholder="Enter city or hotel name"
                />
              </div>
              <div className="text-xs text-blue-100 h-4">Search hotels in your destination</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <div className="text-xs text-blue-100 h-4"></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <div className="text-xs text-blue-100 h-4"></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guests & Rooms</label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="bg-white text-gray-900">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest, 1 Room</SelectItem>
                  <SelectItem value="2">2 Guests, 1 Room</SelectItem>
                  <SelectItem value="3">3 Guests, 1 Room</SelectItem>
                  <SelectItem value="4">4 Guests, 2 Rooms</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-blue-100 h-4"></div>
            </div>
          </div>
        ) : (
          // Flight/Train/Bus search form
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                  placeholder="Departure city"
                />
              </div>
              <div className="text-xs text-blue-100 h-4">
                {searchMode === 'flights' && 'DEL, Indira Gandhi Intl Airport'}
                {searchMode === 'trains' && 'NDLS, New Delhi Railway Station'}
                {searchMode === 'buses' && 'DEL, Kashmere Gate Bus Terminal'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                  placeholder="Destination city"
                />
              </div>
              <div className="text-xs text-blue-100 h-4">
                {searchMode === 'flights' && 'BOM, Chhatrapati Shivaji Intl Airport'}
                {searchMode === 'trains' && 'CSTM, Mumbai Central Railway Station'}
                {searchMode === 'buses' && 'BOM, Mumbai Central Bus Depot'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchMode === 'flights' ? 'Departure Date' : 
                 searchMode === 'trains' ? 'Journey Date' : 'Travel Date'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <div className="text-xs text-blue-100 h-4"></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchMode === 'buses' ? 'Return Date (Optional)' : 'Return Date'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                  placeholder="Return date (optional)"
                />
              </div>
              <div className="text-xs text-blue-100 h-4"></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchMode === 'flights' ? 'Passengers & Class' :
                 searchMode === 'trains' ? 'Passengers & Class' : 'Passengers'}
              </label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="bg-white text-gray-900">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {searchMode === 'flights' && (
                    <>
                      <SelectItem value="1">1 Traveler, Economy</SelectItem>
                      <SelectItem value="2">2 Travelers, Economy</SelectItem>
                      <SelectItem value="3">3 Travelers, Economy</SelectItem>
                      <SelectItem value="4">4 Travelers, Economy</SelectItem>
                    </>
                  )}
                  {searchMode === 'trains' && (
                    <>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                    </>
                  )}
                  {searchMode === 'buses' && (
                    <>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <div className="text-xs text-blue-100 h-4"></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-4 flex-wrap">
            {searchMode === 'flights' && (
              <>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Special Fares (Optional)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Defence Personnel
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Students
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Senior Citizens
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Doctors & Nurses
                </label>
              </>
            )}
            {searchMode === 'trains' && (
              <>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Senior Citizens
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Persons with Disability
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Tatkal Booking
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Premium Tatkal
                </label>
              </>
            )}
            {searchMode === 'buses' && (
              <>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  AC Buses Only
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Sleeper Buses
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Government Buses
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Live Tracking
                </label>
              </>
            )}
            {searchMode === 'hotels' && (
              <>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Free Cancellation
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Pay at Hotel
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Free WiFi
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Swimming Pool
                </label>
              </>
            )}
          </div>

          <Button 
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold"
          >
            <Search className="w-4 h-4 mr-2" />
            {searchMode === 'hotels' ? 'SEARCH HOTELS' : 
             searchMode === 'trains' ? 'SEARCH TRAINS' :
             searchMode === 'buses' ? 'SEARCH BUSES' : 'SEARCH FLIGHTS'}
          </Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-blue-100">
            Save Lowest up to 40% OFF*
          </span>
        </div>
      </Card>

      {/* Results Section */}
      {showResults && (
        <div className="space-y-6">
          {searchMode === 'flights' && <FlightResults fromCity={fromCity} toCity={toCity} isRoundTrip={isRoundTrip} />}
          {searchMode === 'trains' && <TrainResults fromCity={fromCity} toCity={toCity} isRoundTrip={isRoundTrip} />}
          {searchMode === 'buses' && <BusResults fromCity={fromCity} toCity={toCity} isRoundTrip={isRoundTrip} />}
          {searchMode === 'hotels' && <HotelResults city={toCity} />}
        </div>
      )}
    </div>
  );
}