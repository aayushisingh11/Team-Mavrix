import React, { useState } from 'react';
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
  MapPinIcon
} from 'lucide-react';

export function SocialMatching() {
  const [activeTab, setActiveTab] = useState('group');
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const currentGroup = [
    { 
      id: 1, 
      name: 'John Doe', 
      avatar: 'JD', 
      interests: ['nightlife', 'food', 'photography'],
      compatibility: 95
    },
    { 
      id: 2, 
      name: 'Sarah Wilson', 
      avatar: 'SW', 
      interests: ['temples', 'culture', 'shopping'],
      compatibility: 78
    },
    { 
      id: 3, 
      name: 'Mike Chen', 
      avatar: 'MC', 
      interests: ['shopping', 'food', 'adventure'],
      compatibility: 85
    }
  ];

  const suggestedCompanions = [
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

  const userProfile = {
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
    rating: 4.8
  };

  const localGuides = [
    {
      id: 7,
      name: 'Ravi Desai',
      avatar: 'RD',
      location: 'Panaji, Goa',
      rating: 4.9,
      reviews: 156,
      specialties: ['Local culture', 'Hidden gems', 'Food tours'],
      languages: ['English', 'Hindi', 'Konkani'],
      pricePerDay: 2500,
      verified: true
    },
    {
      id: 8,
      name: 'Maria Fernandes', 
      avatar: 'MF',
      location: 'Old Goa',
      rating: 4.8,
      reviews: 89,
      specialties: ['Heritage sites', 'Photography', 'Portuguese history'],
      languages: ['English', 'Portuguese', 'Hindi'],
      pricePerDay: 3000,
      verified: true
    }
  ];

  const getInterestIcon = (interest: string) => {
    switch (interest) {
      case 'nightlife': case 'music': return Music;
      case 'food': return Coffee;
      case 'photography': return Camera;
      case 'adventure': return Mountain;
      case 'temples': case 'culture': return Star;
      default: return Heart;
    }
  };

  const getCompatibilityColor = (score: number) => {
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
              <div className={`max-w-[70%] p-3 rounded-lg ${
                msg.isSelf 
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

  const ProfileEdit = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm">
          <Camera className="w-4 h-4 mr-2" />
          Change Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input defaultValue={userProfile.name} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Age</label>
          <Input defaultValue={userProfile.age} type="number" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input defaultValue={userProfile.location} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Occupation</label>
          <Input defaultValue={userProfile.occupation} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bio</label>
        <Textarea defaultValue={userProfile.bio} rows={3} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Languages</label>
        <Input defaultValue={userProfile.languages.join(', ')} placeholder="English, Spanish, French..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Travel Interests</label>
        <div className="flex flex-wrap gap-2">
          {['photography', 'adventure', 'food', 'nightlife', 'culture', 'beaches', 'shopping', 'spa'].map((interest) => (
            <Badge
              key={interest}
              variant={userProfile.interests.includes(interest) ? "default" : "secondary"}
              className="cursor-pointer"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );

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
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
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
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Group Compatibility</span>
              </CardTitle>
              <CardDescription>
                AI analysis of your group's shared and individual interests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Group Overview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4>Overall Group Compatibility</h4>
                  <Badge className="bg-green-100 text-green-700">86% Match</Badge>
                </div>
                <Progress value={86} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Great balance of shared and individual interests. Perfect for both group activities and solo exploration.
                </p>
              </div>

              {/* Individual Members */}
              <div className="space-y-4">
                <h4>Group Members</h4>
                {currentGroup.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="font-medium">{member.name}</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.interests.map((interest, idx) => {
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
                    <div className="text-right">
                      <Badge className={getCompatibilityColor(member.compatibility)}>
                        {member.compatibility}% match
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Suggestions */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="space-y-2">
                      <h5 className="font-medium text-blue-900">AI Recommendations</h5>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p>🌅 <strong>Morning:</strong> Group temple visit (Sarah's favorite) + photography walk (John's interest)</p>
                        <p>🍽️ <strong>Lunch:</strong> Food tour that everyone will enjoy</p>
                        <p>🛍️ <strong>Afternoon:</strong> Split time - Sarah & Mike shopping, John photography</p>
                        <p>🌃 <strong>Evening:</strong> Reunite for dinner + nightlife (John's preference)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Itinerary with Group
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Travel Companions */}
        <TabsContent value="companions" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by location, interests..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Individual Companions */}
          <div className="space-y-4">
            <h3 className="font-medium">Individual Travelers</h3>
            <div className="grid gap-4">
              {suggestedCompanions.map((companion) => (
                <Card key={companion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback>{companion.avatar}</AvatarFallback>
                          </Avatar>
                          {companion.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">{companion.name}, {companion.age}</h4>
                            <p className="text-sm text-muted-foreground flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{companion.location}</span>
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center space-x-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>{companion.tripDates}</span>
                            </p>
                          </div>

                          <p className="text-sm">{companion.bio}</p>

                          <div className="flex flex-wrap gap-1">
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

                          {companion.mutualFriends > 0 && (
                            <p className="text-xs text-blue-600">
                              {companion.mutualFriends} mutual friend{companion.mutualFriends > 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <Badge className={`${getCompatibilityColor(companion.matchScore)} px-3 py-1`}>
                          {companion.matchScore}% match
                        </Badge>
                        
                        <div className="space-y-2">
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleMessage(companion)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Invite to Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Group to Group */}
          <div className="space-y-4">
            <h3 className="font-medium">Group Collaborations</h3>
            <div className="grid gap-4">
              {suggestedGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="flex -space-x-2">
                            {group.avatars.slice(0, 3).map((avatar, idx) => (
                              <Avatar key={idx} className="w-12 h-12 border-2 border-white">
                                <AvatarFallback className="text-xs">{avatar}</AvatarFallback>
                              </Avatar>
                            ))}
                            {group.members > 3 && (
                              <div className="w-12 h-12 rounded-full bg-muted border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-medium">+{group.members - 3}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">{group.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{group.members} members</span>
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center space-x-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{group.location}</span>
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center space-x-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>{group.tripDates}</span>
                            </p>
                          </div>

                          <p className="text-sm">{group.description}</p>

                          <div className="flex flex-wrap gap-1">
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
                      </div>

                      <div className="text-right space-y-3">
                        <Badge className={`${getCompatibilityColor(group.matchScore)} px-3 py-1`}>
                          {group.matchScore}% match
                        </Badge>
                        
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact Group
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <Users className="w-4 h-4 mr-2" />
                            Collaborate
                          </Button>
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
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">{guide.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{guide.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({guide.reviews} reviews)
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{guide.location}</span>
                          </p>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-1">Specialties</h5>
                          <div className="flex flex-wrap gap-1">
                            {guide.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-1">Languages</h5>
                          <p className="text-sm text-muted-foreground">
                            {guide.languages.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-3">
                      <div>
                        <div className="text-xl">₹{guide.pricePerDay.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">per day</div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact Guide
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          View Profile
                        </Button>
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
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <div className="h-full">
            {selectedChat && (
              <ChatInterface 
                companion={selectedChat} 
                onClose={() => setIsChatOpen(false)} 
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}