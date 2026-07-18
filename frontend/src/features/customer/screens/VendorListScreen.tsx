import { useState } from 'react';
import {
  SearchBar,
  FilterChip,
  VendorCard,
  EmptyState,
  LoadingSkeleton,
} from '../../../components/discovery';
import { useVendors } from '../../../hooks/useDiscovery';

const SORT_OPTIONS = [
  { key: 'distance' as const, label: 'Nearest' },
  { key: 'speed' as const, label: 'Fastest' },
  { key: 'rating' as const, label: 'Top Rated' },
  { key: 'price' as const, label: 'Cheapest' },
];

export function VendorListScreen() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'distance' | 'speed' | 'rating' | 'price'>('distance');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useVendors({
    page,
    limit: 10,
    sort,
    q: search || undefined,
    lat: 5.6037,
    lng: -0.187,
  });

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">All Vendors</h1>

      <SearchBar
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        placeholder="Search by name..."
      />

      {/* Sort Filters */}
      <div
        className="flex gap-2 mt-4 mb-4 overflow-x-auto pb-1"
        role="group"
        aria-label="Sort vendors"
      >
        {SORT_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.key}
            label={opt.label}
            selected={sort === opt.key}
            onClick={() => {
              setSort(opt.key);
              setPage(1);
            }}
          />
        ))}
      </div>

      {/* Content */}
      {isLoading && <LoadingSkeleton count={4} />}

      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load vendors. Please try again.
        </div>
      )}

      {data && data.vendors.length === 0 && (
        <EmptyState
          title="No vendors found"
          message={
            search
              ? `No results for "${search}". Try a different search term.`
              : 'No vendors available in your area.'
          }
        />
      )}

      {data && data.vendors.length > 0 && (
        <>
          <div className="space-y-3 mt-4">
            {data.vendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>

          {/* Pagination */}
          {data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {data.pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(data.pagination.totalPages, page + 1))}
                disabled={page === data.pagination.totalPages}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
