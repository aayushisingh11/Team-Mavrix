import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { useSplitwise } from './SplitwiseContext';
import { toast } from 'sonner@2.0.3';
import { 
  Plus, 
  IndianRupee,
  Calculator,
  Receipt,
  UserPlus,
  Clock,
  MapPin,
  Delete,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number; // positive = they owe you, negative = you owe them
  email?: string;
}

interface Transaction {
  id: string;
  type: 'expense' | 'payment';
  amount: number;
  description: string;
  date: string;
  paidBy: string;
  splitBetween: string[];
  category?: string;
  location?: string;
  settled?: boolean;
}

export function Splitwise() {
  const { friends, transactions, addExpense, recordPayment } = useSplitwise();

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');

  // New expense form state
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food',
    location: '',
    paidBy: '1',
    splitBetween: ['1']
  });

  const getTotalBalance = () => {
    return friends.reduce((total, friend) => total + friend.balance, 0);
  };

  const getTransactionsForFriend = (friendId: string) => {
    return transactions.filter(t => 
      t.paidBy === friendId || t.splitBetween.includes(friendId)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    addExpense({
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      paidBy: newExpense.paidBy,
      splitBetween: newExpense.splitBetween,
      category: newExpense.category,
      location: newExpense.location
    });

    setNewExpense({
      description: '',
      amount: '',
      category: 'food',
      location: '',
      paidBy: '1',
      splitBetween: ['1']
    });
    setIsAddExpenseOpen(false);
    toast.success('Expense added successfully!');
  };

  const handleRecordPayment = () => {
    const amount = parseFloat(calculatorDisplay);
    if (!amount || !selectedFriend) return;

    recordPayment({
      amount: amount,
      fromFriend: selectedFriend.id,
      description: `Payment from ${selectedFriend.name}`
    });

    setCalculatorDisplay('0');
    setIsRecordPaymentOpen(false);
    setSelectedFriend(null);
    toast.success('Payment recorded successfully!');
  };

  const handleCalculatorInput = (value: string) => {
    if (value === 'clear') {
      setCalculatorDisplay('0');
    } else if (value === 'delete') {
      setCalculatorDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (value === '.') {
      if (!calculatorDisplay.includes('.')) {
        setCalculatorDisplay(prev => prev + '.');
      }
    } else {
      setCalculatorDisplay(prev => prev === '0' ? value : prev + value);
    }
  };

  const CalculatorButton = ({ value, className = "", children }: { value: string; className?: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleCalculatorInput(value)}
      className={`h-12 rounded-lg border bg-white hover:bg-gray-50 transition-colors flex items-center justify-center text-lg font-medium ${className}`}
    >
      {children}
    </button>
  );

  if (selectedFriend) {
    const friendTransactions = getTransactionsForFriend(selectedFriend.id);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedFriend(null)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl">{selectedFriend.name}</h2>
            <p className="text-muted-foreground">
              {selectedFriend.balance > 0 
                ? `You are owed ₹${selectedFriend.balance.toFixed(2)} overall`
                : selectedFriend.balance < 0
                ? `You owe ₹${Math.abs(selectedFriend.balance).toFixed(2)} overall`
                : 'You are settled up'
              }
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-teal-50 to-green-50 border-teal-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{selectedFriend.avatar}</div>
                <div>
                  <h3 className="font-medium">{selectedFriend.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFriend.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-semibold ${
                  selectedFriend.balance > 0 ? 'text-green-600' : 
                  selectedFriend.balance < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  ₹{Math.abs(selectedFriend.balance).toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedFriend.balance > 0 ? 'owes you' : 
                   selectedFriend.balance < 0 ? 'you owe' : 'settled'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            className="flex-1"
            onClick={() => {
              setSelectedFriend(selectedFriend);
              setIsRecordPaymentOpen(true);
            }}
          >
            <Receipt className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
          <Button variant="outline" className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Remind
          </Button>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>{friendTransactions.length} transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {friendTransactions.map((transaction) => {
                  const isPayer = transaction.paidBy === selectedFriend.id;
                  const splitAmount = transaction.amount / transaction.splitBetween.length;
                  
                  return (
                    <div key={transaction.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {transaction.type === 'expense' ? (
                          <Receipt className="w-5 h-5 text-gray-600" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{transaction.description}</h4>
                          <div className="text-right">
                            <div className={`font-medium ${
                              transaction.type === 'payment' ? 'text-green-600' :
                              isPayer ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'payment' ? '+' : isPayer ? '+' : '-'}₹{
                                transaction.type === 'payment' ? transaction.amount.toFixed(2) :
                                isPayer ? (transaction.amount - splitAmount).toFixed(2) : splitAmount.toFixed(2)
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          {transaction.category && (
                            <>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">
                                {transaction.category}
                              </Badge>
                            </>
                          )}
                          {transaction.location && (
                            <>
                              <MapPin className="w-3 h-3" />
                              <span>{transaction.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Record Payment Dialog */}
        <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Record a payment</DialogTitle>
              <DialogDescription>
                {selectedFriend?.name} paid you
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Amount Display */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-3xl font-medium">
                  <IndianRupee className="w-8 h-8" />
                  <span>{calculatorDisplay}</span>
                </div>
              </div>

              {/* Category Tabs */}
              <Tabs defaultValue="no-group" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="no-group">No group</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Calculator */}
              <div className="grid grid-cols-3 gap-3">
                <CalculatorButton value="1">1</CalculatorButton>
                <CalculatorButton value="2">2</CalculatorButton>
                <CalculatorButton value="3">3</CalculatorButton>
                <CalculatorButton value="4">4</CalculatorButton>
                <CalculatorButton value="5">5</CalculatorButton>
                <CalculatorButton value="6">6</CalculatorButton>
                <CalculatorButton value="7">7</CalculatorButton>
                <CalculatorButton value="8">8</CalculatorButton>
                <CalculatorButton value="9">9</CalculatorButton>
                <CalculatorButton value=".">.</CalculatorButton>
                <CalculatorButton value="0">0</CalculatorButton>
                <CalculatorButton value="delete">
                  <Delete className="w-4 h-4" />
                </CalculatorButton>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsRecordPaymentOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  onClick={handleRecordPayment}
                  disabled={calculatorDisplay === '0'}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl">Friends</h2>
          <p className="text-muted-foreground">Manage group expenses and payments</p>
        </div>
        <Button onClick={() => setIsAddExpenseOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Total Balance */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Total balance</div>
            <div className={`text-2xl font-semibold ${
              getTotalBalance() > 0 ? 'text-green-600' : 
              getTotalBalance() < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              ₹{Math.abs(getTotalBalance()).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              {getTotalBalance() > 0 ? 'you are owed overall' : 
               getTotalBalance() < 0 ? 'you owe overall' : 'you are all settled up'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Friends List */}
      <div className="space-y-3">
        {friends.map((friend) => (
          <Card 
            key={friend.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedFriend(friend)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{friend.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{friend.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {friend.balance > 0 ? (
                      <>
                        <span>{friend.name} owes ₹{friend.balance.toFixed(2)} to</span>
                        <span className="text-green-600 font-medium">NYC Trip 2023</span>
                      </>
                    ) : friend.balance < 0 ? (
                      <>
                        <span>You owe ₹{Math.abs(friend.balance).toFixed(2)} to</span>
                        <span className="text-red-600 font-medium">{friend.name}</span>
                      </>
                    ) : (
                      <span className="text-gray-500">Settled up</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    friend.balance > 0 ? 'text-green-600' : 
                    friend.balance < 0 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {friend.balance !== 0 && (
                      <>
                        {friend.balance > 0 ? 'owes ' : 'you owe '}
                        ₹{Math.abs(friend.balance).toFixed(2)}
                      </>
                    )}
                    {friend.balance === 0 && 'settled up'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Friends Button */}
      <Button variant="outline" className="w-full">
        <UserPlus className="w-4 h-4 mr-2" />
        Add friends
      </Button>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Split a new expense with your friends
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Description *</Label>
              <Input
                placeholder="What was this expense for?"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Amount *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={newExpense.category} 
                  onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="accommodation">Accommodation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Paid by</Label>
                <Select 
                  value={newExpense.paidBy} 
                  onValueChange={(value) => setNewExpense({...newExpense, paidBy: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">You</SelectItem>
                    {friends.map(friend => (
                      <SelectItem key={friend.id} value={friend.id}>
                        {friend.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location (optional)</Label>
              <Input
                placeholder="Where was this expense?"
                value={newExpense.location}
                onChange={(e) => setNewExpense({...newExpense, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Split between</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="split-you"
                    checked={newExpense.splitBetween.includes('1')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewExpense({
                          ...newExpense, 
                          splitBetween: [...newExpense.splitBetween, '1']
                        });
                      } else {
                        setNewExpense({
                          ...newExpense, 
                          splitBetween: newExpense.splitBetween.filter(id => id !== '1')
                        });
                      }
                    }}
                  />
                  <Label htmlFor="split-you">You</Label>
                </div>
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`split-${friend.id}`}
                      checked={newExpense.splitBetween.includes(friend.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewExpense({
                            ...newExpense, 
                            splitBetween: [...newExpense.splitBetween, friend.id]
                          });
                        } else {
                          setNewExpense({
                            ...newExpense, 
                            splitBetween: newExpense.splitBetween.filter(id => id !== friend.id)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`split-${friend.id}`}>{friend.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsAddExpenseOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}