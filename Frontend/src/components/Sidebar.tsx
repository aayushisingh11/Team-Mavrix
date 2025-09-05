import React from 'react';
import { Plane, Users, Brain, BarChart3, CreditCard, LogOut, Star } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { name: 'Book trip', icon: Plane },
  { name: 'Social', icon: Users },
  { name: 'Mood Planning', icon: Brain },
  { name: 'Overview', icon: BarChart3 },
  { name: 'Splitwise', icon: CreditCard },
];

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header with star icon */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Plane className="w-4 h-4 text-white fill-white" />
          </div>
          <h1 className="text-xl font-semibold">Mavrix</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}