import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number;
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

interface SplitwiseContextType {
  friends: Friend[];
  transactions: Transaction[];
  addExpenseFromBooking: (bookingData: {
    amount: number;
    description: string;
    category: string;
    location?: string;
    paidBy: string;
    splitBetween: string[];
  }) => void;
  addExpense: (expense: Omit<Transaction, 'id' | 'type' | 'date'>) => void;
  recordPayment: (payment: {
    amount: number;
    fromFriend: string;
    description?: string;
  }) => void;
  updateFriendBalance: (friendId: string, amount: number, isPayment?: boolean) => void;
}

const SplitwiseContext = createContext<SplitwiseContextType | undefined>(undefined);

export function SplitwiseProvider({ children }: { children: ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Bindu Nandwani',
      avatar: '👩‍💼',
      balance: -420.00,
      email: 'bindu@email.com'
    },
    {
      id: '2', 
      name: 'Cathy Choi',
      avatar: '👩‍🎨',
      balance: 514.24,
      email: 'cathy@email.com'
    },
    {
      id: '3',
      name: 'Reena Mehra',
      avatar: '👩‍💻',
      balance: -634.30,
      email: 'reena@email.com'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'expense',
      amount: 2477.50,
      description: 'NYC Trip 2023',
      date: '2024-03-15',
      paidBy: '3',
      splitBetween: ['1', '2', '3'],
      category: 'Travel',
      location: 'New York'
    },
    {
      id: '2',
      type: 'expense', 
      amount: 822.75,
      description: 'Groceries',
      date: '2024-03-14',
      paidBy: '2',
      splitBetween: ['2', '3'],
      category: 'Food'
    }
  ]);

  const addExpenseFromBooking = (bookingData: {
    amount: number;
    description: string;
    category: string;
    location?: string;
    paidBy: string;
    splitBetween: string[];
  }) => {
    const expense: Transaction = {
      id: Date.now().toString(),
      type: 'expense',
      amount: bookingData.amount,
      description: bookingData.description,
      date: new Date().toISOString().split('T')[0],
      paidBy: bookingData.paidBy,
      splitBetween: bookingData.splitBetween,
      category: bookingData.category,
      location: bookingData.location
    };

    setTransactions(prev => [...prev, expense]);
    
    // Update friend balances
    const splitAmount = expense.amount / expense.splitBetween.length;
    const updatedFriends = friends.map(friend => {
      if (friend.id === expense.paidBy) {
        // Person who paid gets credit for others' shares
        const othersShares = (expense.splitBetween.length - 1) * splitAmount;
        return { ...friend, balance: friend.balance + othersShares };
      } else if (expense.splitBetween.includes(friend.id)) {
        // Person who owes money
        return { ...friend, balance: friend.balance - splitAmount };
      }
      return friend;
    });

    setFriends(updatedFriends);
    toast.success('Expense added to Splitwise!');
  };

  const addExpense = (expenseData: Omit<Transaction, 'id' | 'type' | 'date'>) => {
    const expense: Transaction = {
      ...expenseData,
      id: Date.now().toString(),
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions(prev => [...prev, expense]);
    
    // Update friend balances
    const splitAmount = expense.amount / expense.splitBetween.length;
    const updatedFriends = friends.map(friend => {
      if (friend.id === expense.paidBy) {
        const othersShares = (expense.splitBetween.length - 1) * splitAmount;
        return { ...friend, balance: friend.balance + othersShares };
      } else if (expense.splitBetween.includes(friend.id)) {
        return { ...friend, balance: friend.balance - splitAmount };
      }
      return friend;
    });

    setFriends(updatedFriends);
  };

  const recordPayment = (payment: {
    amount: number;
    fromFriend: string;
    description?: string;
  }) => {
    const paymentTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'payment',
      amount: payment.amount,
      description: payment.description || `Payment from ${friends.find(f => f.id === payment.fromFriend)?.name}`,
      date: new Date().toISOString().split('T')[0],
      paidBy: payment.fromFriend,
      splitBetween: [payment.fromFriend],
      settled: true
    };

    setTransactions(prev => [...prev, paymentTransaction]);
    
    // Update friend balance
    const updatedFriends = friends.map(friend => 
      friend.id === payment.fromFriend 
        ? { ...friend, balance: friend.balance + payment.amount }
        : friend
    );

    setFriends(updatedFriends);
  };

  const updateFriendBalance = (friendId: string, amount: number, isPayment: boolean = false) => {
    const updatedFriends = friends.map(friend => 
      friend.id === friendId 
        ? { ...friend, balance: friend.balance + (isPayment ? amount : -amount) }
        : friend
    );
    setFriends(updatedFriends);
  };

  return (
    <SplitwiseContext.Provider value={{
      friends,
      transactions,
      addExpenseFromBooking,
      addExpense,
      recordPayment,
      updateFriendBalance
    }}>
      {children}
    </SplitwiseContext.Provider>
  );
}

export function useSplitwise() {
  const context = useContext(SplitwiseContext);
  if (context === undefined) {
    throw new Error('useSplitwise must be used within a SplitwiseProvider');
  }
  return context;
}