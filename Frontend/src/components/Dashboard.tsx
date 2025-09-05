import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BookingInterface from './BookingInterface';
import { SocialMatching } from './SocialMatching'; 
import { ItineraryPlanner } from './ItineraryPlanner';
import { TripOverview } from './TripOverview';
import { Splitwise } from './Splitwise';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Book trip');

  const renderContent = () => {
    switch (activeTab) {
      case 'Book trip':
        return <BookingInterface />;  
      case 'Social':
        return <SocialMatching />; 
      case 'Mood Planning':
        return <ItineraryPlanner />;  
      case 'Overview':
        return <TripOverview />;       
      case 'Splitwise':
        return <Splitwise />;          
      default:
        return <BookingInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
