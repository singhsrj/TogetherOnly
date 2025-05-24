/// <reference types="@types/google.maps" />

declare module '@react-google-maps/api' {
  export interface LoadScriptProps {
    googleMapsApiKey: string;
    libraries?: Array<'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'>;
  }

  export function useLoadScript(props: LoadScriptProps): {
    isLoaded: boolean;
    loadError: Error | undefined;
  };

  export function Autocomplete(props: {
    children: React.ReactNode;
    onLoad?: (autocomplete: google.maps.places.Autocomplete) => void;
    onPlaceChanged?: () => void;
    restrictions?: google.maps.places.ComponentRestrictions;
  }): JSX.Element;
} 