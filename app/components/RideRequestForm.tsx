'use client';

import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Autocomplete } from '@react-google-maps/api';
import { RideRequest, Location } from '../types/types';

interface RideRequestFormProps {
  onSubmit: (request: Partial<RideRequest>) => Promise<void>;
}

export default function RideRequestForm({ onSubmit }: RideRequestFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [radius, setRadius] = useState(5);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);
  
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setDestinationLocation(location);
      setDestination(place.formatted_address || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !destinationLocation) return;

    try {
      setLoading(true);
      const request: Partial<RideRequest> = {
        userId: user.uid,
        userEmail: user.email || '',
        userPhoneNumber: phoneNumber,
        destination: {
          address: destination,
          location: destinationLocation,
        },
        radius,
        status: 'active',
      };

      await onSubmit(request);
      // Reset form
      setDestination('');
      setRadius(5);
      setPhoneNumber('');
      setDestinationLocation(null);
    } catch (error) {
      console.error('Error creating ride request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          Destination Address
        </label>
        <div className="mt-1">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
              // Set additional options directly on the autocomplete instance
              autocomplete.setTypes(['geocode', 'establishment']);
              autocomplete.setFields(['formatted_address', 'geometry', 'name']);
            }}
            onPlaceChanged={handlePlaceSelect}
            restrictions={{ country: 'in' }}
          >
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your destination in India"
              required
            />
          </Autocomplete>
        </div>
      </div>

      <div>
        <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
          Search Radius (km)
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            min="1"
            max="50"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1">
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter 10-digit mobile number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
            required
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading || !destinationLocation}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Creating Request...' : 'Create Ride Request'}
        </button>
      </div>
    </form>
  );
} 