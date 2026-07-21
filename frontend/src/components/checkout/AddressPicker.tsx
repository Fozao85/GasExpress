import { useState } from 'react';
import { useGeocode } from '../../hooks/useMaps';
import { useGeolocation } from '../../hooks/useGeolocation';

interface AddressPickerProps {
  value: string;
  onChange: (address: string, lat?: number, lng?: number) => void;
  placeholder?: string;
}

export function AddressPicker({ value, onChange, placeholder }: AddressPickerProps) {
  const [query, setQuery] = useState(value);
  const [showResults, setShowResults] = useState(false);
  const { data: results } = useGeocode(query);
  const { latitude, longitude } = useGeolocation();

  const handleSelect = (result: {
    formattedAddress: string;
    latitude: number;
    longitude: number;
  }) => {
    setQuery(result.formattedAddress);
    onChange(result.formattedAddress, result.latitude, result.longitude);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
          onChange(e.target.value);
        }}
        onFocus={() => query.length >= 3 && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        placeholder={placeholder || 'Search for an address...'}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
      />

      {latitude && longitude && (
        <p className="text-xs text-gray-400 mt-1">Current location detected</p>
      )}

      {showResults && results && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {results.map((r, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-primary-50 focus:bg-primary-50 focus:outline-none"
                onMouseDown={() => handleSelect(r)}
              >
                {r.formattedAddress}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
