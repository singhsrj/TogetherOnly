'use client';

import { RideRequest } from '../types/types';
import { useAuth } from '../contexts/AuthContext';

interface RideRequestListProps {
  requests: RideRequest[];
  onMatch: (requestId: string) => Promise<void>;
}

export default function RideRequestList({ requests, onMatch }: RideRequestListProps) {
  const { user } = useAuth();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d * 10) / 10;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No ride requests found.</p>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  To: {request.destination.address}
                </h3>
                <p className="text-sm text-gray-500">Posted by: {request.userEmail}</p>
                <p className="text-sm text-gray-500">Created: {formatDate(request.createdAt)}</p>
                <p className="text-sm text-gray-500">
                  Distance: {calculateDistance(
                    request.airport.location.lat,
                    request.airport.location.lng,
                    request.destination.location.lat,
                    request.destination.location.lng
                  )} km
                </p>
                <p className="text-sm text-gray-500">Search radius: {request.radius} km</p>
              </div>
              {user && user.uid !== request.userId && request.status === 'active' && (
                <button
                  onClick={() => onMatch(request.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Match
                </button>
              )}
              {request.status === 'matched' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Matched
                </span>
              )}
            </div>
            {request.matchedWith && user && (request.userId === user.uid || request.matchedWith.userId === user.uid) && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h4 className="text-sm font-medium text-blue-900">Match Details</h4>
                <p className="text-sm text-blue-800">Email: {request.matchedWith.userEmail}</p>
                <p className="text-sm text-blue-800">
                  Phone: {request.matchedWith.userPhoneNumber}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
} 