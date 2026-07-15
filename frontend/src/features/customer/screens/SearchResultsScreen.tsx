import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, VendorCard, EmptyState, LoadingSkeleton } from '../../../components/discovery';
import { useSearchVendors } from '../../../hooks/useDiscovery';

export function SearchResultsScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error } = useSearchVendors({
    q: debouncedQuery,
    page: 1,
    limit: 20,
  });

  const handleSearch = () => {
    if (query.trim()) setSearchParams({ q: query.trim() });
  };

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Search</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        placeholder="Search vendors..."
      />

      {!debouncedQuery && (
        <EmptyState
          title="Search for vendors"
          message="Enter a vendor name to find nearby gas suppliers."
          icon="🔍"
        />
      )}

      {debouncedQuery && isLoading && <LoadingSkeleton count={3} />}

      {debouncedQuery && error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm mt-4" role="alert">
          Search failed. Please try again.
        </div>
      )}

      {debouncedQuery && data && data.vendors.length === 0 && (
        <EmptyState
          title={`No results for "${debouncedQuery}"`}
          message="Try a different search term or check your spelling."
          icon="🔍"
        />
      )}

      {data && data.vendors.length > 0 && (
        <div className="space-y-3 mt-4">
          <p className="text-sm text-gray-500">
            {data.pagination.total} vendor{data.pagination.total !== 1 ? 's' : ''} found
          </p>
          {data.vendors.map((v) => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </div>
      )}
    </div>
  );
}
