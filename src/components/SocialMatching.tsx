import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import {
  Users,
  MessageCircle,
  Heart,
  MapPin,
  Calendar,
  Star,
  UserPlus,
  Share2,
  Target,
  Zap,
  Clock,
  Coffee,
  Camera,
  Mountain,
  Music,
  Settings,
  Edit3,
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Search,
  Filter,
  X,
  UserCircle,
  Globe,
  Briefcase,
  Mail,
  MapPinIcon,
  Plus,
  Minus,
  Check,
  UserX,
  AlertCircle,
  ExternalLink,
  Navigation,
  Shield,
  Eye,
  EyeOff,
  Wallet,
  CreditCard,
  Car,
  Home,
  Smartphone,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Book,
  Plane,
  TrendingUp,
  Lock,
  Upload,
  Save,
  User
} from 'lucide-react';
import Gemini from "./Gemini";

export function SocialMatching() {
  const [activeTab, setActiveTab] = useState('group');
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [interestFilters, setInterestFilters] = useState([]);
  const [compatibilityFilter, setCompatibilityFilter] = useState('any');
  const [verifiedFilter, setVerifiedFilter] = useState(false);

  // Group management states
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [showInvited, setShowInvited] = useState(false);
  const [isGroupChatOpen, setIsGroupChatOpen] = useState(false);

  // Profile editing states
  const [editingProfile, setEditingProfile] = useState(null);
  const [tempProfileData, setTempProfileData] = useState(null);
  const [profileEditTab, setProfileEditTab] = useState('basic');

  // Guide states
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isGuideProfileOpen, setIsGuideProfileOpen] = useState(false);

  // Companion profile states
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [isCompanionProfileOpen, setIsCompanionProfileOpen] = useState(false);

  const [currentGroup, setCurrentGroup] = useState([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'JD',
      age: 29,
      location: 'New York, USA',
      interests: ['nightlife', 'food', 'photography'],
      compatibility: 95,
      status: 'confirmed'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      avatar: 'SW',
      age: 26,
      location: 'Toronto, Canada',
      interests: ['temples', 'culture', 'shopping'],
      compatibility: 78,
      status: 'confirmed'
    },
    {
      id: 3,
      name: 'Mike Chen',
      avatar: 'MC',
      age: 31,
      location: 'Vancouver, Canada',
      interests: ['shopping', 'food', 'adventure'],
      compatibility: 85,
      status: 'confirmed'
    }
  ]);

  const allCompanions = [
    {
      id: 4,
      name: 'Priya Sharma',
      avatar: 'PS',
      location: 'Mumbai, India',
      age: 28,
      interests: ['photography', 'temples', 'food'],
      matchScore: 92,
      tripDates: 'Dec 15-22, 2024',
      bio: 'Solo traveler who loves capturing cultural moments and trying local cuisines.',
      verified: true,
      mutualFriends: 3
    },
    {
      id: 5,
      name: 'Alex Johnson',
      avatar: 'AJ',
      location: 'London, UK',
      age: 32,
      interests: ['adventure', 'nightlife', 'music'],
      matchScore: 87,
      tripDates: 'Dec 16-23, 2024',
      bio: 'Adventure enthusiast looking for travel buddies to explore Goa together.',
      verified: true,
      mutualFriends: 1
    },
    {
      id: 6,
      name: 'Lisa Chang',
      avatar: 'LC',
      location: 'Singapore',
      age: 26,
      interests: ['shopping', 'spa', 'beaches'],
      matchScore: 79,
      tripDates: 'Dec 14-21, 2024',
      bio: 'Love relaxing beach holidays and discovering local markets.',
      verified: false,
      mutualFriends: 0
    },
    {
      id: 9,
      name: 'Carlos Rodriguez',
      avatar: 'CR',
      location: 'Barcelona, Spain',
      age: 30,
      interests: ['culture', 'food', 'photography'],
      matchScore: 89,
      tripDates: 'Dec 12-19, 2024',
      bio: 'Food lover and culture enthusiast seeking travel companions.',
      verified: true,
      mutualFriends: 2
    },
    {
      id: 10,
      name: 'Emma Thompson',
      avatar: 'ET',
      location: 'Sydney, Australia',
      age: 25,
      interests: ['beaches', 'adventure', 'nightlife'],
      matchScore: 84,
      tripDates: 'Dec 10-17, 2024',
      bio: 'Beach lover and party enthusiast looking for fun travel buddies.',
      verified: false,
      mutualFriends: 1
    }
  ];

  const suggestedGroups = [
    {
      id: 7,
      name: 'Goa Beach Explorers',
      members: 4,
      location: 'Goa, India',
      tripDates: 'Dec 18-25, 2024',
      interests: ['beaches', 'nightlife', 'water sports'],
      matchScore: 88,
      description: 'Fun-loving group planning beach hopping and water adventures',
      avatars: ['BE1', 'BE2', 'BE3', 'BE4']
    },
    {
      id: 8,
      name: 'Cultural Heritage Squad',
      members: 3,
      location: 'Rajasthan, India',
      tripDates: 'Dec 20-27, 2024',
      interests: ['culture', 'photography', 'history'],
      matchScore: 91,
      description: 'Photography enthusiasts exploring palaces and heritage sites',
      avatars: ['CH1', 'CH2', 'CH3']
    }
  ];

  const chatMessages = [
    { id: 1, sender: 'Priya Sharma', message: 'Hey! Excited about the Goa trip!', time: '2:30 PM', isSelf: false },
    { id: 2, sender: 'You', message: 'Me too! Have you been to Goa before?', time: '2:32 PM', isSelf: true },
    { id: 3, sender: 'Priya Sharma', message: 'Yes, a couple of times. I know some amazing local spots for photography!', time: '2:35 PM', isSelf: false },
    { id: 4, sender: 'You', message: 'Perfect! Would love to check them out', time: '2:36 PM', isSelf: true }
  ];

  const groupChatMessages = [
    { id: 1, sender: 'Sarah Wilson', message: 'Welcome everyone to our Goa adventure group! 🏖️', time: '9:00 AM', isSelf: false, avatar: 'SW' },
    { id: 2, sender: 'Mike Chen', message: 'Super excited! I found some amazing beach restaurants we should try', time: '9:15 AM', isSelf: false, avatar: 'MC' },
    { id: 3, sender: 'You', message: 'Can\'t wait! Should we create a shared itinerary?', time: '9:20 AM', isSelf: true, avatar: 'JD' },
    { id: 4, sender: 'Sarah Wilson', message: 'Great idea! I can set up a shared document for our plans', time: '9:25 AM', isSelf: false, avatar: 'SW' },
    { id: 5, sender: 'Mike Chen', message: 'Perfect! Also, what time should we meet at the airport?', time: '9:30 AM', isSelf: false, avatar: 'MC' }
  ];

  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    age: 29,
    location: 'New York, USA',
    bio: 'Passionate traveler and photographer looking for adventure companions',
    interests: ['photography', 'adventure', 'food', 'nightlife'],
    languages: ['English', 'Spanish'],
    occupation: 'Software Engineer',
    verified: true,
    joinedDate: 'March 2023',
    tripsCompleted: 12,
    rating: 4.8,
    // Additional profile fields
    phone: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    website: 'www.johndoe.com',
    travelStyle: 'Adventure Explorer',
    budgetPreference: 'Mid-range',
    groupSize: 'Small groups (2-4 people)',
    accommodation: 'Hotels & Hostels',
    transportation: 'Public transport',
    socialMedia: {
      instagram: '@johndoe_travels',
      facebook: 'john.doe.travels',
      twitter: '@johndoe'
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showSocialMedia: true,
      allowMessages: true,
      profileVisibility: 'public'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Sister',
      phone: '+1 (555) 987-6543'
    },
    travelExperience: 'Intermediate',
    favoriteDestinations: ['Japan', 'Iceland', 'New Zealand'],
    bucketList: ['Northern Lights', 'Safari in Africa', 'Machu Picchu'],
    badges: ['Explorer', 'Culture Enthusiast', 'Photo Master']
  });

  const localGuides = [
    {
      id: 7,
      name: 'Ravi Desai',
      avatar: 'RD',
      location: 'Panaji, Goa',
      address: 'MG Road, Panaji, Goa 403001',
      coordinates: { lat: 15.4909, lng: 73.8278 },
      phone: '+91 98765 43210',
      email: 'ravi.desai@email.com',
      rating: 4.9,
      reviews: 156,
      specialties: ['Local culture', 'Hidden gems', 'Food tours'],
      languages: ['English', 'Hindi', 'Konkani'],
      pricePerDay: 2500,
      verified: true,
      bio: 'Born and raised in Goa, I have been sharing the beauty of my homeland with travelers for over 8 years. I specialize in off-the-beaten-path experiences and authentic local cuisine.',
      experience: '8+ years'
    },
    {
      id: 8,
      name: 'Maria Fernandes',
      avatar: 'MF',
      location: 'Old Goa',
      address: 'Basilica of Bom Jesus Road, Old Goa 403402',
      coordinates: { lat: 15.5007, lng: 73.9114 },
      phone: '+91 87654 32109',
      email: 'maria.fernandes@email.com',
      rating: 4.8,
      reviews: 89,
      specialties: ['Heritage sites', 'Photography', 'Portuguese history'],
      languages: ['English', 'Portuguese', 'Hindi'],
      pricePerDay: 3000,
      verified: true,
      bio: 'Heritage enthusiast with a deep knowledge of Portuguese colonial history. I love helping photographers capture the perfect shots of Old Goa\'s magnificent architecture.',
      experience: '6+ years'
    }
  ];

  // Calculate group compatibility dynamically
  const groupCompatibility = useMemo(() => {
    if (currentGroup.length === 0) return 0;

    // Get all interests from group members
    const allInterests = currentGroup.flatMap(member => member.interests);
    const uniqueInterests = [...new Set(allInterests)];

    // Calculate shared interests
    let sharedInterestScore = 0;
    uniqueInterests.forEach(interest => {
      const membersWithInterest = currentGroup.filter(member =>
        member.interests.includes(interest)
      ).length;
      if (membersWithInterest > 1) {
        sharedInterestScore += (membersWithInterest / currentGroup.length) * 20;
      }
    });

    // Calculate individual compatibility average
    const avgCompatibility = currentGroup.reduce((sum, member) =>
      sum + member.compatibility, 0) / currentGroup.length;

    // Combine scores (60% individual avg + 40% shared interests)
    const totalScore = Math.round((avgCompatibility * 0.6) + (sharedInterestScore * 0.4));

    return Math.min(100, Math.max(0, totalScore));
  }, [currentGroup]);

  // Filter companions based on search and filters
  const filteredCompanions = useMemo(() => {
    return allCompanions.filter(companion => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          companion.name.toLowerCase().includes(query) ||
          companion.location.toLowerCase().includes(query) ||
          companion.bio.toLowerCase().includes(query) ||
          companion.interests.some(interest => interest.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Location filter
      if (locationFilter && !companion.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      // Interest filters
      if (interestFilters.length > 0) {
        const hasMatchingInterest = interestFilters.some(interest =>
          companion.interests.includes(interest)
        );
        if (!hasMatchingInterest) return false;
      }

      // Compatibility filter
      if (compatibilityFilter && compatibilityFilter !== 'any') {
        const minScore = parseInt(compatibilityFilter);
        if (companion.matchScore < minScore) return false;
      }

      // Verified filter
      if (verifiedFilter && !companion.verified) {
        return false;
      }

      return true;
    });
  }, [allCompanions, searchQuery, locationFilter, interestFilters, compatibilityFilter, verifiedFilter]);

  const getInterestIcon = (interest) => {
    switch (interest) {
      case 'nightlife': case 'music': return Music;
      case 'food': return Coffee;
      case 'photography': return Camera;
      case 'adventure': return Mountain;
      case 'temples': case 'culture': return Star;
      default: return Heart;
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  const handleMessage = (companion) => {
    setSelectedChat(companion);
    setIsChatOpen(true);
  };

  const handleInviteToGroup = (companion) => {
    // Check if already invited or in group
    const isAlreadyInGroup = currentGroup.some(member => member.id === companion.id);
    const isAlreadyInvited = invitedMembers.some(member => member.id === companion.id);

    if (isAlreadyInGroup) {
      toast.error('User is already in your group');
      return;
    }

    if (isAlreadyInvited) {
      toast.error('User is already invited');
      return;
    }

    // Add to invited members
    const invitedMember = {
      ...companion,
      status: 'invited',
      invitedAt: new Date().toISOString()
    };

    setInvitedMembers(prev => [...prev, invitedMember]);
    toast.success(`Invitation sent to ${companion.name}!`);
  };

  const handleRemoveMember = (memberId) => {
    const removedMember = currentGroup.find(member => member.id === memberId);
    setCurrentGroup(prev => prev.filter(member => member.id !== memberId));
    toast.success(`${removedMember?.name} removed from group`);
  };

  const handleCancelInvite = (memberId) => {
    setInvitedMembers(prev => prev.filter(member => member.id !== memberId));
    toast.success('Invitation cancelled');
  };

  const handleAcceptInvite = (memberId) => {
    const invitedMember = invitedMembers.find(member => member.id === memberId);
    if (invitedMember) {
      const newMember = {
        ...invitedMember,
        compatibility: invitedMember.matchScore, // Map matchScore to compatibility
        status: 'confirmed'
      };
      setCurrentGroup(prev => [...prev, newMember]);
      setInvitedMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success(`${invitedMember.name} joined the group!`);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setInterestFilters([]);
    setCompatibilityFilter('any');
    setVerifiedFilter(false);
  };

  const handleEditProfile = () => {
    setTempProfileData({ ...userProfile });
    setEditingProfile(true);
    setIsProfileOpen(true);
  };

  const handleSaveProfile = () => {
    if (tempProfileData) {
      setUserProfile(tempProfileData);
      toast.success('Profile updated successfully!');
    }
    setEditingProfile(false);
    setTempProfileData(null);
    setIsProfileOpen(false);
  };

  const handleCancelProfile = () => {
    setEditingProfile(false);
    setTempProfileData(null);
    setIsProfileOpen(false);
  };

  const toggleInterest = (interest) => {
    if (!tempProfileData) return;

    setTempProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleViewGuideProfile = (guide) => {
    setSelectedGuide(guide);
    setIsGuideProfileOpen(true);
  };

  const handleViewCompanionProfile = (companion) => {
    setSelectedCompanion(companion);
    setIsCompanionProfileOpen(true);
  };

  const handleContactGuide = (guide) => {
    // Open email client or show contact dialog
    window.open(`mailto:${guide.email}?subject=Inquiry about Local Guide Services&body=Hi ${guide.name},%0D%0A%0D%0AI am interested in your local guide services in ${guide.location}. Please let me know your availability and any additional details.%0D%0A%0D%0AThank you!`);
    toast.success(`Opening email to contact ${guide.name}`);
  };

  const handleViewOnMap = (guide) => {
    // Open Google Maps with the guide's location
    const { lat, lng } = guide.coordinates;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&zoom=15&ll=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
    toast.success(`Opening ${guide.name}'s location on Google Maps`);
  };

  const handleGroupChat = () => {
    setIsGroupChatOpen(true);
    toast.success('Opening group chat');
  };

  const ChatInterface = ({ companion, onClose }) => (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{companion?.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{companion?.name}</h3>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.isSelf
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
                }`}>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const GroupChatInterface = ({ onClose }) => (
    <div className="flex flex-col h-full">
      {/* Group Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {currentGroup.slice(0, 3).map((member, index) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
              </Avatar>
            ))}
            {currentGroup.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                +{currentGroup.length - 3}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">Group Chat</h3>
            <p className="text-sm text-muted-foreground">{currentGroup.length} members</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Group Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {groupChatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${msg.isSelf ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!msg.isSelf && (
                  <Avatar className="w-7 h-7 mt-1">
                    <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`p-3 rounded-lg ${msg.isSelf
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
                  }`}>
                  {!msg.isSelf && (
                    <p className="text-xs font-medium mb-1 text-muted-foreground">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Group Chat Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message to the group..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const ProfileEdit = () => {
    if (!tempProfileData) return null;

    const BasicInfoTab = () => (
      <div className="space-y-6">
        {/* Profile Photo Section */}
        <div className="flex items-center space-x-6 p-4 bg-muted/20 rounded-lg border border-border/50">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-lg">
              {tempProfileData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="font-medium">Profile Photo</h4>
            <p className="text-sm text-muted-foreground">Choose a clear photo that shows your face</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button variant="ghost" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                value={tempProfileData.name}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age *</label>
              <Input
                value={tempProfileData.age}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                type="number"
                placeholder="Your age"
                min="18"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input
                value={tempProfileData.location}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Occupation</label>
              <Input
                value={tempProfileData.occupation}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                placeholder="Your profession"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio *</label>
            <Textarea
              value={tempProfileData.bio}
              onChange={(e) => setTempProfileData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              placeholder="Tell other travelers about yourself, your travel experiences, and what you're looking for in travel companions..."
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {tempProfileData.bio?.length || 0}/500 characters
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Languages</label>
            <Input
              value={tempProfileData.languages?.join(', ') || ''}
              onChange={(e) => {
                const languages = e.target.value.split(',').map(lang => lang.trim()).filter(Boolean);
                setTempProfileData(prev => ({ ...prev, languages }));
              }}
              placeholder="English, Spanish, French..."
            />
            <p className="text-xs text-muted-foreground">Separate multiple languages with commas</p>
          </div>
        </div>
      </div>
    );

    const TravelPreferencesTab = () => (
      <div className="space-y-6">
        {/* Travel Interests */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Travel Interests</h3>
          </div>
          <p className="text-sm text-muted-foreground">Select the activities and experiences you enjoy while traveling</p>
          <div className="flex flex-wrap gap-2">
            {['photography', 'adventure', 'food', 'nightlife', 'culture', 'beaches', 'shopping', 'spa', 'temples', 'music', 'history', 'nature', 'art', 'festivals', 'wildlife'].map((interest) => {
              const Icon = getInterestIcon(interest);
              return (
                <Badge
                  key={interest}
                  variant={tempProfileData.interests?.includes(interest) ? "default" : "secondary"}
                  className="cursor-pointer hover:opacity-80 transition-opacity capitalize flex items-center gap-1.5 py-2 px-3"
                  onClick={() => toggleInterest(interest)}
                >
                  <Icon className="w-3 h-3" />
                  {interest}
                </Badge>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {tempProfileData.interests?.length || 0} interests
          </p>
        </div>

        {/* Travel Style */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Plane className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Travel Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Style</label>
              <Select
                value={tempProfileData.travelStyle || ''}
                onValueChange={(value) => setTempProfileData(prev => ({ ...prev, travelStyle: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Luxury Traveler">Luxury Traveler</SelectItem>
                  <SelectItem value="Adventure Explorer">Adventure Explorer</SelectItem>
                  <SelectItem value="Budget Backpacker">Budget Backpacker</SelectItem>
                  <SelectItem value="Cultural Enthusiast">Cultural Enthusiast</SelectItem>
                  <SelectItem value="Relaxation Seeker">Relaxation Seeker</SelectItem>
                  <SelectItem value="Food & Drink Explorer">Food & Drink Explorer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Preference</label>
              <Select
                value={tempProfileData.budgetPreference || ''}
                onValueChange={(value) => setTempProfileData(prev => ({ ...prev, budgetPreference: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Budget (Under $50/day)">Budget (Under $50/day)</SelectItem>
                  <SelectItem value="Mid-range ($50-150/day)">Mid-range ($50-150/day)</SelectItem>
                  <SelectItem value="Luxury ($150+/day)">Luxury ($150+/day)</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Group Size</label>
              <Select
                value={tempProfileData.groupSize || ''}
                onValueChange={(value) => setTempProfileData(prev => ({ ...prev, groupSize: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solo travel">Solo travel</SelectItem>
                  <SelectItem value="Small groups (2-4 people)">Small groups (2-4 people)</SelectItem>
                  <SelectItem value="Medium groups (5-8 people)">Medium groups (5-8 people)</SelectItem>
                  <SelectItem value="Large groups (8+ people)">Large groups (8+ people)</SelectItem>
                  <SelectItem value="No preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Experience</label>
              <Select
                value={tempProfileData.travelExperience || ''}
                onValueChange={(value) => setTempProfileData(prev => ({ ...prev, travelExperience: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Experienced">Experienced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Favorite Destinations */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Travel Experience</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Favorite Destinations</label>
              <Input
                value={tempProfileData.favoriteDestinations?.join(', ') || ''}
                onChange={(e) => {
                  const destinations = e.target.value.split(',').map(dest => dest.trim()).filter(Boolean);
                  setTempProfileData(prev => ({ ...prev, favoriteDestinations: destinations }));
                }}
                placeholder="Japan, Iceland, New Zealand..."
              />
              <p className="text-xs text-muted-foreground">Places you've visited and loved</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Bucket List</label>
              <Input
                value={tempProfileData.bucketList?.join(', ') || ''}
                onChange={(e) => {
                  const bucketList = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                  setTempProfileData(prev => ({ ...prev, bucketList: bucketList }));
                }}
                placeholder="Northern Lights, Safari in Africa, Machu Picchu..."
              />
              <p className="text-xs text-muted-foreground">Places and experiences you want to have</p>
            </div>
          </div>
        </div>
      </div>
    );

    const ContactInfoTab = () => (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                value={tempProfileData.email || ''}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, email: e.target.value }))}
                type="email"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={tempProfileData.phone || ''}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, phone: e.target.value }))}
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                value={tempProfileData.website || ''}
                onChange={(e) => setTempProfileData(prev => ({ ...prev, website: e.target.value }))}
                type="url"
                placeholder="www.yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Social Media</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </label>
              <Input
                value={tempProfileData.socialMedia?.instagram || ''}
                onChange={(e) => setTempProfileData(prev => ({
                  ...prev,
                  socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                }))}
                placeholder="@yourusername"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </label>
              <Input
                value={tempProfileData.socialMedia?.facebook || ''}
                onChange={(e) => setTempProfileData(prev => ({
                  ...prev,
                  socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                }))}
                placeholder="your.facebook.profile"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </label>
              <Input
                value={tempProfileData.socialMedia?.twitter || ''}
                onChange={(e) => setTempProfileData(prev => ({
                  ...prev,
                  socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                }))}
                placeholder="@yourusername"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Emergency Contact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Name</label>
              <Input
                value={tempProfileData.emergencyContact?.name || ''}
                onChange={(e) => setTempProfileData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                }))}
                placeholder="Full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Relationship</label>
              <Input
                value={tempProfileData.emergencyContact?.relationship || ''}
                onChange={(e) => setTempProfileData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                }))}
                placeholder="Sister, Parent, Friend..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={tempProfileData.emergencyContact?.phone || ''}
                onChange={(e) => setTempProfileData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                }))}
                type="tel"
                placeholder="+1 (555) 987-6543"
              />
            </div>
          </div>
        </div>
      </div>
    );

    const PrivacyTab = () => (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Privacy & Visibility</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/20">
              <div className="space-y-1">
                <h4 className="font-medium">Profile Visibility</h4>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
              <Select
                value={tempProfileData.privacy?.profileVisibility || 'public'}
                onValueChange={(value) => setTempProfileData(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, profileVisibility: value }
                }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="members">Members Only</SelectItem>
                  <SelectItem value="connections">Connections Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Contact Information Visibility</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Show email address</span>
                  </div>
                  <Checkbox
                    checked={tempProfileData.privacy?.showEmail || false}
                    onCheckedChange={(checked) => setTempProfileData(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showEmail: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Show phone number</span>
                  </div>
                  <Checkbox
                    checked={tempProfileData.privacy?.showPhone || false}
                    onCheckedChange={(checked) => setTempProfileData(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showPhone: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Show social media profiles</span>
                  </div>
                  <Checkbox
                    checked={tempProfileData.privacy?.showSocialMedia || false}
                    onCheckedChange={(checked) => setTempProfileData(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showSocialMedia: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Allow direct messages</span>
                  </div>
                  <Checkbox
                    checked={tempProfileData.privacy?.allowMessages || false}
                    onCheckedChange={(checked) => setTempProfileData(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, allowMessages: checked }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Statistics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Profile Statistics</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/20 rounded-lg border border-border/50 text-center">
              <div className="font-semibold text-2xl text-primary">{userProfile.tripsCompleted}</div>
              <div className="text-sm text-muted-foreground">Trips Completed</div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg border border-border/50 text-center">
              <div className="font-semibold text-2xl text-primary">{userProfile.rating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg border border-border/50 text-center">
              <div className="font-semibold text-2xl text-primary">{userProfile.badges?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg border border-border/50 text-center">
              <div className="font-semibold text-2xl text-primary">2023</div>
              <div className="text-sm text-muted-foreground">Member Since</div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Profile Edit Tabs */}
        <Tabs value={profileEditTab} onValueChange={setProfileEditTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="travel" className="flex items-center space-x-2">
              <Plane className="w-4 h-4" />
              <span>Travel</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <BasicInfoTab />
          </TabsContent>

          <TabsContent value="travel" className="mt-6">
            <TravelPreferencesTab />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ContactInfoTab />
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <PrivacyTab />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-border/50">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Save className="w-4 h-4" />
            <span>All changes are saved automatically</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancelProfile}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const FiltersPanel = () => (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">Filters</h3>
          <p className="text-xs text-muted-foreground">Refine your search results</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="w-3 h-3 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">Location</label>
          </div>
          <Input
            placeholder="Enter city or country..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Interests Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-medium">Travel Interests</label>
            </div>
            {interestFilters.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {interestFilters.length} selected
              </Badge>
            )}
          </div>
          <div className="border border-border/50 rounded-lg bg-muted/20">
            <ScrollArea className="h-48 p-3">
              <div className="space-y-3">
                {['photography', 'adventure', 'food', 'nightlife', 'culture', 'beaches', 'shopping', 'spa', 'temples', 'music'].map((interest) => {
                  const Icon = getInterestIcon(interest);
                  return (
                    <div key={interest} className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors">
                      <Checkbox
                        id={interest}
                        checked={interestFilters.includes(interest)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setInterestFilters(prev => [...prev, interest]);
                          } else {
                            setInterestFilters(prev => prev.filter(i => i !== interest));
                          }
                        }}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <label
                        htmlFor={interest}
                        className="text-sm cursor-pointer capitalize flex-1 font-medium"
                      >
                        {interest}
                      </label>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Compatibility Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">Minimum Compatibility</label>
          </div>
          <Select value={compatibilityFilter} onValueChange={setCompatibilityFilter}>
            <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select minimum score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any compatibility</SelectItem>
              <SelectItem value="70">70%+ compatibility</SelectItem>
              <SelectItem value="80">80%+ compatibility</SelectItem>
              <SelectItem value="90">90%+ compatibility</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Verified Users Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">Account Status</label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-accent/50 transition-colors">
            <Checkbox
              id="verified"
              checked={verifiedFilter}
              onCheckedChange={setVerifiedFilter}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1">
              <label htmlFor="verified" className="text-sm cursor-pointer font-medium">
                Verified users only
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Show only users with verified profiles
              </p>
            </div>
          </div>
        </div>

        {/* Applied Filters Summary */}
        {(locationFilter || interestFilters.length > 0 || (compatibilityFilter && compatibilityFilter !== 'any') || verifiedFilter) && (
          <div className="pt-4 border-t border-border/50">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {locationFilter && (
                  <Badge variant="outline" className="text-xs">
                    📍 {locationFilter}
                  </Badge>
                )}
                {interestFilters.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs capitalize">
                    ❤️ {interest}
                  </Badge>
                ))}
                {compatibilityFilter && compatibilityFilter !== 'any' && (
                  <Badge variant="outline" className="text-xs">
                    🎯 {compatibilityFilter}%+
                  </Badge>
                )}
                {verifiedFilter && (
                  <Badge variant="outline" className="text-xs">
                    ✅ Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const GuideProfileDialog = () => {
    if (!selectedGuide) return null;

    return (
      <Dialog open={isGuideProfileOpen} onOpenChange={setIsGuideProfileOpen}>
        <DialogContent className="max-w-2xl" aria-describedby="guide-profile-description">
          <DialogHeader>
            <DialogTitle>Guide Profile</DialogTitle>
            <DialogDescription id="guide-profile-description">
              Detailed information about {selectedGuide.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback>{selectedGuide.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-medium">{selectedGuide.name}</h3>
                  {selectedGuide.verified && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedGuide.rating}</span>
                  <span className="text-sm text-muted-foreground">({selectedGuide.reviews} reviews)</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedGuide.address}</span>
                  </p>
                  <p className="flex items-center space-x-1 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedGuide.experience} experience</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{selectedGuide.bio}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGuide.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGuide.languages.map((language, idx) => (
                    <Badge key={idx} variant="outline">{language}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pricing</h4>
                <p className="text-lg font-medium">₹{selectedGuide.pricePerDay}/day</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleContactGuide(selectedGuide)}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Guide
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleViewOnMap(selectedGuide)}
                  className="flex-1"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const CompanionProfileDialog = () => {
    if (!selectedCompanion) return null;

    return (
      <Dialog open={isCompanionProfileOpen} onOpenChange={setIsCompanionProfileOpen}>
        <DialogContent className="max-w-2xl" aria-describedby="companion-profile-description">
          <DialogHeader>
            <DialogTitle>Companion Profile</DialogTitle>
            <DialogDescription id="companion-profile-description">
              Detailed information about {selectedCompanion.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarFallback>{selectedCompanion.avatar}</AvatarFallback>
                </Avatar>
                {selectedCompanion.verified && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-medium">{selectedCompanion.name}, {selectedCompanion.age}</h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedCompanion.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedCompanion.tripDates}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getCompatibilityColor(selectedCompanion.matchScore)}>
                    {selectedCompanion.matchScore}% Match
                  </Badge>
                  {selectedCompanion.mutualFriends > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {selectedCompanion.mutualFriends} mutual friend{selectedCompanion.mutualFriends > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{selectedCompanion.bio}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Travel Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanion.interests.map((interest, index) => {
                    const Icon = getInterestIcon(interest);
                    return (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        <span className="capitalize">{interest}</span>
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleMessage(selectedCompanion)}
                  className="flex-1"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInviteToGroup(selectedCompanion)}
                  className="flex-1"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite to Group
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl">Social Travel Hub</h2>
          <p className="text-muted-foreground">Connect with fellow travelers and local guides</p>
        </div>

        <div className="flex items-center space-x-2">
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>
                <Settings className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl" aria-describedby="profile-description">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription id="profile-description">
                  Update your travel profile to get better matches
                </DialogDescription>
              </DialogHeader>
              <ProfileEdit />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="group">My Group</TabsTrigger>
          <TabsTrigger value="companions">Find Companions</TabsTrigger>
          <TabsTrigger value="guides">Local Guides</TabsTrigger>
        </TabsList>

        {/* Current Group */}
        <TabsContent value="group" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Group Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGroupChat}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Group Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInvited(!showInvited)}
                  >
                    {showInvited ? 'Show Members' : 'Show Invitations'}
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                {showInvited ? 'Manage pending invitations' : 'AI analysis of your group\'s shared and individual interests'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showInvited ? (
                <>
                  {/* Group Overview */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4>Overall Group Compatibility</h4>
                      <Badge className={`px-3 py-1 ${getCompatibilityColor(groupCompatibility)}`}>
                        {groupCompatibility}% Match
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={groupCompatibility} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {groupCompatibility >= 85
                        ? "Excellent compatibility! Great balance of shared and individual interests."
                        : groupCompatibility >= 70
                          ? "Good compatibility. Some shared interests with room for diverse activities."
                          : groupCompatibility >= 50
                            ? "Moderate compatibility. Consider adding members with similar interests."
                            : "Low compatibility. Try inviting members with more aligned interests."
                      }
                    </p>
                    <div className="mt-2 text-xs text-blue-700">
                      Current score: {groupCompatibility} (Average: {Math.round(currentGroup.reduce((sum, member) => sum + member.compatibility, 0) / currentGroup.length)}%, Shared interests bonus)
                    </div>
                    {/* AI generated overall group compatibility explanation */}
                    <div className="mt-3">
                      <Gemini
                        variant="group"
                        prompt={`Summarize the group's overall compatibility in 3–5 sentences.
                                  Group members:
                                  ${currentGroup
                            .map(
                              (m) => `${m.name} (${m.compatibility}%) – ${m.interests.join(", ")}`
                            )
                            .join("\n")}
                                  Overall score: ${groupCompatibility}%.
                                  Explain briefly why the score makes sense, what strengths the group shares, and one suggestion to improve teamwork or trip harmony.
                                  Write in natural language — no lists or section titles.`}
                      />

                    </div>


                  </div>

                  {/* Group Members */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4>Group Members ({currentGroup.length})</h4>
                      {invitedMembers.length > 0 && (
                        <Badge variant="secondary">
                          {invitedMembers.length} pending
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-3">
                      {currentGroup.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                              <div>
                                <h5 className="font-medium">{member.name}</h5>
                                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                  <span>Age {member.age}</span>
                                  <span>•</span>
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{member.location}</span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {member.interests.slice(0, 3).map((interest, idx) => {
                                  const Icon = getInterestIcon(interest);
                                  return (
                                    <Badge key={idx} variant="secondary" className="text-xs flex items-center space-x-1">
                                      <Icon className="w-3 h-3" />
                                      <span>{interest}</span>
                                    </Badge>
                                  );
                                })}
                                {member.interests.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{member.interests.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* AI summary for each member */}
                          <div className="mt-2">
                            <Gemini
                              variant="member"
                              prompt={`Give a short, 3–4 sentence compatibility summary for ${member.name} (age ${member.age}, from ${member.location}).
                                          Interests: ${member.interests.join(", ")}.
                                          Compatibility score: ${member.compatibility}%.
                                          Describe briefly:
                                          • The key reason for this score.
                                          • One or two personality traits the user will appreciate.
                                          • A one-line closing remark about how they fit in the group.
                                          Respond in a friendly, natural tone — no lists or headings, only short sentences.`}
                            />

                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="text-right space-y-1">
                              <Badge className={`px-3 py-1 ${getCompatibilityColor(member.compatibility)}`}>
                                {member.compatibility}% compatible
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  {member.status}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <UserX className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Pending Invitations */}
                  <div className="space-y-4">
                    <h4>Pending Invitations ({invitedMembers.length})</h4>
                    {invitedMembers.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No pending invitations</p>
                        <p className="text-sm">Switch to "Find Companions" to invite new members</p>
                      </div>
                    ) : (
                      invitedMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                              <div>
                                <h5 className="font-medium">{member.name}</h5>
                                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                  <span>Age {member.age}</span>
                                  <span>•</span>
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{member.location}</span>
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Invited {new Date(member.invitedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {member.interests.slice(0, 3).map((interest, idx) => {
                                  const Icon = getInterestIcon(interest);
                                  return (
                                    <Badge key={idx} variant="secondary" className="text-xs flex items-center space-x-1">
                                      <Icon className="w-3 h-3" />
                                      <span>{interest}</span>
                                    </Badge>
                                  );
                                })}
                                {member.interests.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{member.interests.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right space-y-1">
                              <Badge className={`px-3 py-1 ${getCompatibilityColor(member.matchScore)}`}>
                                {member.matchScore}% match
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  Pending
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAcceptInvite(member.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCancelInvite(member.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
              {/* Final AI Summary and Trip Suggestion */}
              <div className="bg-gray-50 border border-blue-100 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-blue-700 mb-2">AI Summary & Trip Suggestions</h4>
                <Gemini
                  variant="trip"
                  prompt={`
                          Based on the current group composition and their interests:
                          ${currentGroup
                      .map((m) => `- ${m.name}: ${m.interests.join(", ")}`)
                      .join("\n")}

                            Please provide a response in the following clear format:

                            ✨ **Group Synergy & Travel Style:**  
                            - [Short, punchy summary of the group's dynamic and style]

                            🌍 **Suggested Trip Destinations (2-3):**  
                            1. [Destination 1] - [Why it fits the group]  
                            2. [Destination 2] - [Why it fits the group]  
                            3. [Destination 3] - [Optional]

                            🤝 **Recommended Group Activity:**  
                            - [One activity that will help everyone bond]
                            `}

                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Find Companions */}
        <TabsContent value="companions" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, interests, name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {(locationFilter || interestFilters.length > 0 || (compatibilityFilter && compatibilityFilter !== 'any') || verifiedFilter) && (
                    <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                      {[locationFilter, ...interestFilters, (compatibilityFilter && compatibilityFilter !== 'any') ? compatibilityFilter : '', verifiedFilter ? 'verified' : ''].filter(Boolean).length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" aria-describedby="filters-description">
                <SheetHeader>
                  <SheetTitle>Filter Companions</SheetTitle>
                  <SheetDescription id="filters-description">
                    Refine your search to find the perfect travel companions
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Suggested Groups */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Suggested Groups</span>
            </h3>
            <div className="grid gap-4">
              {suggestedGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{group.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{group.tripDates}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{group.members} members</span>
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.interests.map((interest, idx) => {
                            const Icon = getInterestIcon(interest);
                            return (
                              <Badge key={idx} variant="secondary" className="text-xs flex items-center space-x-1">
                                <Icon className="w-3 h-3" />
                                <span>{interest}</span>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={`px-3 py-1 ${getCompatibilityColor(group.matchScore)}`}>
                          {group.matchScore}% match
                        </Badge>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
                            Join Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Individual Companions */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2">
              <UserCircle className="w-5 h-5" />
              <span>Individual Companions</span>
            </h3>
            <div className="grid gap-4">
              {filteredCompanions.map((companion) => (
                <Card key={companion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback>{companion.avatar}</AvatarFallback>
                          </Avatar>
                          {companion.verified && (
                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <h4 className="font-medium">{companion.name}, {companion.age}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{companion.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{companion.tripDates}</span>
                              </span>
                              {companion.mutualFriends > 0 && (
                                <span className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{companion.mutualFriends} mutual</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{companion.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {companion.interests.map((interest, idx) => {
                              const Icon = getInterestIcon(interest);
                              return (
                                <Badge key={idx} variant="secondary" className="text-xs flex items-center space-x-1">
                                  <Icon className="w-3 h-3" />
                                  <span>{interest}</span>
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={`px-3 py-1 ${getCompatibilityColor(companion.matchScore)}`}>
                          {companion.matchScore}% match
                        </Badge>
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMessage(companion)}
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleInviteToGroup(companion)}
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Invite
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Local Guides */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid gap-4">
            {localGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback>{guide.avatar}</AvatarFallback>
                        </Avatar>
                        {guide.verified && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 flex-1">
                        <div>
                          <h4 className="font-medium">{guide.name}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-sm text-muted-foreground">({guide.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{guide.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{guide.experience} experience</span>
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h5 className="text-sm font-medium">Specialties</h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {guide.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{specialty}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium">Languages</h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {guide.languages.map((language, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{language}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-3">
                      <div>
                        <p className="text-lg font-medium">₹{guide.pricePerDay}</p>
                        <p className="text-xs text-muted-foreground">per day</p>
                      </div>
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewGuideProfile(guide)}
                          className="w-full"
                        >
                          <UserCircle className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            onClick={() => handleContactGuide(guide)}
                            className="flex-1"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Contact
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewOnMap(guide)}
                            className="flex-1"
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Chat Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0" aria-describedby="chat-description">
          <SheetHeader className="sr-only">
            <SheetTitle id="chat-title">Chat with {selectedChat?.name}</SheetTitle>
            <SheetDescription id="chat-description">Private messaging interface with travel companion</SheetDescription>
          </SheetHeader>
          <ChatInterface companion={selectedChat} onClose={() => setIsChatOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Group Chat Sheet */}
      <Sheet open={isGroupChatOpen} onOpenChange={setIsGroupChatOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0" aria-describedby="group-chat-description">
          <SheetHeader className="sr-only">
            <SheetTitle id="group-chat-title">Group Chat</SheetTitle>
            <SheetDescription id="group-chat-description">Group messaging interface for travel companions</SheetDescription>
          </SheetHeader>
          <GroupChatInterface onClose={() => setIsGroupChatOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Guide Profile Dialog */}
      <GuideProfileDialog />

      {/* Companion Profile Dialog */}
      <CompanionProfileDialog />
    </div>
  );
}