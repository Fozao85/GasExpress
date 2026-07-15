import { useNavigate } from 'react-router-dom';
import { RatingBadge } from './RatingBadge';
import { DistanceBadge } from './DistanceBadge';
import { AvailabilityBadge } from './AvailabilityBadge';
import type { VendorListItem } from '../../services/discovery.service';

interface VendorCardProps {
  vendor: VendorListItem;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/customer/vendors/${vendor.id}`)}
      className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-300"
      aria-label={`${vendor.businessName} - ${vendor.averageRating.toFixed(1)} stars, ${vendor.lowestPrice ? `from GHS ${vendor.lowestPrice}` : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{vendor.businessName}</h3>
        <AvailabilityBadge isOpen={vendor.isOpen} />
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
        <RatingBadge rating={vendor.averageRating} />
        <DistanceBadge distance={vendor.distance} />
      </div>

      {vendor.lowestPrice !== undefined && (
        <p className="text-sm font-medium text-primary-600">
          From GHS {vendor.lowestPrice.toFixed(2)}
        </p>
      )}

      {vendor.availableProducts > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          {vendor.availableProducts} product{vendor.availableProducts !== 1 ? 's' : ''} available
        </p>
      )}
    </button>
  );
}
