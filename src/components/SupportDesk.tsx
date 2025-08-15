import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Clock, CheckCircle, AlertCircle, User, Bot, X, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/supabase';
import { realtimeSync } from '../lib/realtime';
import LoadingScreen from './LoadingScreen';
import SkeletonLoader from './SkeletonLoader';

interface SupportDeskProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export default function SupportDesk({ isOpen, onClose, orderId }: SupportDeskProps) {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({
    subject: '',
    message: '',
    priority: 'medium' as const,
    orderId: orderId || ''
  });

  useEffect(() => {
    if (user && isOpen) {
      loadTickets();
      setupRealtimeSync();
    }

    return () => {
      if (user) {
        realtimeSync.unsubscribe(`tickets_${user.id}`);
      }
    };
  }, [user, isOpen]);

  const setupRealtimeSync = () => {
    if (!user) return;

    realtimeSync.subscribeToSupportTickets(user.id, (payload) => {
      console.log('Support ticket update:', payload);
      loadTickets();
    });
  };

  const loadTickets = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await db.getUserSupportTickets(user.id);
      
      if (error) {
        console.error('Error loading tickets:', error);
      } else {
        setTickets(data || []);
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async () => {
    if (!user || !newTicketForm.subject || !newTicketForm.message) return;

    try {
      setSending(true);
      
      const ticketData = {
        user_id: user.id,
        order_id: newTicketForm.orderId || null,
        subject: newTicketForm.subject,
        status: 'open',
        priority: newTicketForm.priority
      };

      const { data: ticket, error: ticketError } = await db.createSupportTicket(ticketData);
      
      if (ticketError) {
        throw new Error(ticketError.message);
      }

      // Add initial message
      await db.addSupportMessage({
        ticket_id: ticket.id,
        sender_type: 'user',
        sender_id: user.id,
        message: newTicketForm.message
      });

      // Auto-reply from support
      setTimeout(async () => {
        await db.addSupportMessage({
          ticket_id: ticket.id,
          sender_type: 'admin',
          sender_id: 'admin',
          message: "Thank you for contacting us! We've received your message and will respond within 24 hours. Our support team is reviewing your request."
        });
        loadTickets();
      }, 2000);

      setNewTicketForm({ subject: '', message: '', priority: 'medium', orderId: '' });
      setShowNewTicket(false);
      await loadTickets();

      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Support ticket created successfully!'
        }
      }));

    } catch (error: any) {
      console.error('Error creating ticket:', error);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: error.message || 'Failed to create support ticket'
        }
      }));
    } finally {
      setSending(false);
    }
  };

  const addMessage = async (ticketId: string, message: string) => {
    if (!message.trim() || !user) return;

    try {
      setSending(true);
      
      await db.addSupportMessage({
        ticket_id: ticketId,
        sender_type: 'user',
        sender_id: user.id,
        message: message.trim()
      });

      setNewMessage('');
      await loadTickets();

      // Simulate support response
      setTimeout(async () => {
        await db.addSupportMessage({
          ticket_id: ticketId,
          sender_type: 'admin',
          sender_id: 'admin',
          message: "Thank you for your additional information. Our team is working on your request and will provide an update soon."
        });
        loadTickets();
      }, 3000);

    } catch (error) {
      console.error('Error adding message:', error);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Failed to send message'
        }
      }));
    } finally {
      setSending(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {sending && <LoadingScreen message="Sending message..." />}
      
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex overflow-hidden shadow-2xl">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Support Center</h2>
                    <p className="text-sm text-gray-600">Get help with your orders</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => setShowNewTicket(true)}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <SkeletonLoader type="list" count={3} />
              ) : tickets.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No support tickets yet</p>
                  <p className="text-sm mt-1">Create a ticket to get help</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedTicket?.id === ticket.id
                          ? 'bg-blue-100 border-2 border-blue-300 shadow-md'
                          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">{ticket.status.replace('_', ' ')}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{ticket.subject}</h4>
                      {ticket.order_id && (
                        <p className="text-xs text-gray-500 mb-1">Order: {ticket.order_id}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(ticket.updated_at).toLocaleDateString()}
                      </p>
                      {ticket.support_messages && ticket.support_messages.length > 0 && (
                        <p className="text-xs text-blue-600 mt-1">
                          {ticket.support_messages.length} messages
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {showNewTicket ? (
              <div className="flex-1 p-6 overflow-y-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Create New Support Ticket</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={newTicketForm.subject}
                      onChange={(e) => setNewTicketForm({ ...newTicketForm, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={newTicketForm.priority}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, priority: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={newTicketForm.orderId}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, orderId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="ORD-123456"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={newTicketForm.message}
                      onChange={(e) => setNewTicketForm({ ...newTicketForm, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows={6}
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={createTicket}
                      disabled={!newTicketForm.subject || !newTicketForm.message || sending}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
                    >
                      {sending ? 'Creating...' : 'Create Ticket'}
                    </button>
                    <button
                      onClick={() => setShowNewTicket(false)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-2xl font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : selectedTicket ? (
              <div className="flex-1 flex flex-col">
                {/* Ticket Header */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedTicket.subject}</h3>
                      <p className="text-sm text-gray-600 mt-1">Ticket #{selectedTicket.id.slice(-8)}</p>
                      {selectedTicket.order_id && (
                        <p className="text-sm text-gray-600">Order: {selectedTicket.order_id}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTicket.status)}`}>
                        {getStatusIcon(selectedTicket.status)}
                        <span className="ml-1 capitalize">{selectedTicket.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {selectedTicket.support_messages?.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                        message.sender_type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}>
                        <div className="flex items-center mb-2">
                          {message.sender_type === 'user' ? (
                            <User className="h-3 w-3 mr-1" />
                          ) : (
                            <Bot className="h-3 w-3 mr-1" />
                          )}
                          <span className="text-xs font-medium opacity-75">
                            {message.sender_type === 'user' ? 'You' : 'Support'}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        <p className="text-xs opacity-75 mt-2">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addMessage(selectedTicket.id, newMessage)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => addMessage(selectedTicket.id, newMessage)}
                      disabled={!newMessage.trim() || sending}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select a ticket to view conversation</p>
                  <p className="text-sm mt-1">or create a new support ticket</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}