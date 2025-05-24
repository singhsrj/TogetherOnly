export interface Location {
  lat: number;
  lng: number;
}

export interface Airport {
  id: string;
  name: string;
  location: Location;
}

export interface RideRequest {
  id: string;
  userId: string;
  userEmail: string;
  userPhoneNumber?: string;
  airport: Airport;
  destination: {
    address: string;
    location: Location;
  };
  radius: number; // in kilometers
  createdAt: Date;
  status: 'active' | 'matched' | 'completed' | 'cancelled';
  matchedWith?: {
    userId: string;
    userEmail: string;
    userPhoneNumber?: string;
  };
}

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  activeRideRequests: string[]; // Array of ride request IDs
  completedRideRequests: string[]; // Array of ride request IDs
} 