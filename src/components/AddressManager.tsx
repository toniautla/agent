import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/supabase';

interface Address {
  id: string;
  name: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface AddressManagerProps {
  onAddressSelect?: (address: Address) => void;
  selectedAddressId?: string;
  showSelection?: boolean;
}

export default function AddressManager({ onAddressSelect, selectedAddressId, showSelection = false }: AddressManagerProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'United States',
    is_default: false,
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await db.getUserAddresses(user.id);
    
    if (error) {
      console.error('Error fetching addresses:', error);
    } else {
      setAddresses(data || []);
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingId) {
        // Update existing address
        const { error } = await db.updateAddress(editingId, formData);
        if (error) throw error;
      } else {
        // Create new address
        const { error } = await db.addAddress({
          ...formData,
          user_id: user.id,
        });
        if (error) throw error;
      }

      await fetchAddresses();
      resetForm();
    } catch (error: any) {
      console.error('Error saving address:', error);
      alert('Error saving address: ' + error.message);
    }
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      street_address: address.street_address,
      city: address.city,
      state: address.state || '',
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const { error } = await db.deleteAddress(addressId);
      if (error) throw error;
      await fetchAddresses();
    } catch (error: any) {
      console.error('Error deleting address:', error);
      alert('Error deleting address: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      street_address: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'United States',
      is_default: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          {showSelection ? 'Select Shipping Address' : 'Manage Addresses'}
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 transition-colors ${
              showSelection
                ? selectedAddressId === address.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                : 'border-gray-200'
            }`}
            onClick={() => showSelection && onAddressSelect?.(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{address.name}</h4>
                  {address.is_default && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Default
                    </span>
                  )}
                  {showSelection && selectedAddressId === address.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {address.street_address}<br />
                  {address.city}, {address.state} {address.postal_code}<br />
                  {address.country}
                </p>
              </div>
              {!showSelection && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {addresses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No addresses added yet</p>
            <p className="text-sm">Add an address to get started</p>
          </div>
        )}
      </div>

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Home, Office"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.street_address}
                  onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={formData.is_default}
                  onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_default" className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingId ? 'Update Address' : 'Add Address'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}