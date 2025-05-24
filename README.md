# TogetherOnly

A location-based web application that helps users share cab rides from airports with others heading to nearby destinations.

## Features

- Google Authentication for secure user verification
- Location-based matching using Google Maps API
- Real-time ride request creation and matching
- Secure phone number sharing between matched users
- Radius-based destination matching

## Tech Stack

- Frontend: Next.js with TypeScript
- Styling: Tailwind CSS
- Authentication: Firebase Auth
- Maps: Google Maps JavaScript API
- State Management: React Context API

## Prerequisites

Before you begin, ensure you have:

1. Node.js (v18 or newer)
2. A Firebase project with Authentication enabled
3. Google Maps API key
4. npm or yarn package manager

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── components/    # Reusable UI components
│   ├── contexts/     # React Context providers
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and helpers
│   ├── types/        # TypeScript type definitions
│   └── pages/        # Application pages
├── public/           # Static assets
└── styles/          # Global styles and Tailwind config
```

## Security Considerations

- All user data is encrypted and stored securely
- Phone numbers are only shared between matched users
- Google Authentication ensures user identity verification
- HTTPS is enforced for all API calls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 