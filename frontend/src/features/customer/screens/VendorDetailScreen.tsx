import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import {
  RatingBadge,
  AvailabilityBadge,
  ProductCard,
  LoadingSkeleton,
} from '../../../components/discovery';
import { useVendorDetail } from '../../../hooks/useDiscovery';

export function VendorDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: vendor, isLoading, error } = useVendorDetail(id);

  if (isLoading)
    return (
      <div className="p-4">
        <LoadingSkeleton type="detail" />
      </div>
    );

  if (error) {
    return (
      <div className="p-4">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load vendor details. Please try again.
        </div>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  if (!vendor) return null;

  const inStockProducts = vendor.inventory.filter((p) => p.inStock);
  const outOfStockProducts = vendor.inventory.filter((p) => !p.inStock);

  return (
    <div className="pb-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
        aria-label="Go back"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Vendor Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{vendor.businessName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{vendor.ownerName}</p>
          </div>
          <AvailabilityBadge isOpen={vendor.isOpen} />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <RatingBadge rating={vendor.averageRating} size="md" />
        </div>

        <p className="text-sm text-gray-600 mb-1">{vendor.address}</p>
        {vendor.openingTime && vendor.closingTime && (
          <p className="text-xs text-gray-400">
            Hours: {vendor.openingTime} - {vendor.closingTime}
          </p>
        )}

        {vendor.lowestPrice && (
          <p className="text-lg font-bold text-primary-600 mt-3">
            From GHS {vendor.lowestPrice.toFixed(2)}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`tel:${vendor.phone}`)}
            aria-label={`Call ${vendor.businessName}`}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call
          </Button>
          <Button variant="outline" size="sm" aria-label={`Chat with ${vendor.businessName}`}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Chat
          </Button>
          <Button variant="outline" size="sm" aria-label={`Share ${vendor.businessName}`}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </Button>
        </div>
      </div>

      {/* Available Cylinders */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">Available Cylinders</h2>
      {inStockProducts.length > 0 ? (
        <div className="space-y-3 mb-6">
          {inStockProducts.map((p) => (
            <ProductCard
              key={p.id}
              cylinderSize={p.cylinderSize}
              description={p.description}
              price={p.price}
              inStock={p.inStock}
              stockQuantity={p.stockQuantity}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">No cylinders currently in stock.</p>
      )}

      {/* Out of Stock */}
      {outOfStockProducts.length > 0 && (
        <>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Out of Stock</h2>
          <div className="space-y-3">
            {outOfStockProducts.map((p) => (
              <ProductCard
                key={p.id}
                cylinderSize={p.cylinderSize}
                description={p.description}
                price={p.price}
                inStock={p.inStock}
                stockQuantity={p.stockQuantity}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
