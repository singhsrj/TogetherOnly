'use client';

import { useAuth } from './contexts/AuthContext';
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import RideRequestForm from './components/RideRequestForm';
import RideRequestList from './components/RideRequestList';
import { RideRequest } from './types/types';

const libraries = ['places'];

// Mock data for demonstration
const MOCK_AIRPORT = {
  id: 'jfk',
  name: 'John F. Kennedy International Airport',
  location: {
    lat: 40.6413,
    lng: -73.7781,
  },
};

export default function Home() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<RideRequest[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as ['places'],
  });

  const handleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (request: Partial<RideRequest>) => {
    if (!user) return;

    const newRequest: RideRequest = {
      id: Date.now().toString(), // In production, this would be a UUID
      ...request,
      airport: MOCK_AIRPORT,
      createdAt: new Date(),
      status: 'active',
    } as RideRequest;

    setRequests((prev) => [...prev, newRequest]);
  };

  const handleMatch = async (requestId: string) => {
    if (!user) return;

    setRequests((prev) =>
      prev.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status: 'matched',
            matchedWith: {
              userId: user.uid,
              userEmail: user.email || '',
              userPhoneNumber: '', // In production, this would be handled properly
            },
          };
        }
        return request;
      })
    );
  };

  if (loadError) {
    return <div>Error loading maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">TogetherOnly</h1>
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {user ? (
          <div className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Create a Ride Request</h2>
              <RideRequestForm onSubmit={handleCreateRequest} />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Available Ride Requests</h2>
              <RideRequestList requests={requests} onMatch={handleMatch} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Share Airport Cab Rides with Fellow Travelers
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sign in to start finding ride-sharing partners for your journey.
            </p>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Get Started'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 