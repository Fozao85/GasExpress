import { usePromotions } from '../../../hooks/useDiscovery';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';

export function PromotionsScreen() {
  const { data: promos, isLoading, error } = usePromotions();

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Promotions & Offers</h1>

      {isLoading && <LoadingSkeleton count={3} />}

      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load promotions. Please try again.
        </div>
      )}

      {promos && promos.length === 0 && (
        <EmptyState
          title="No active promotions"
          message="Check back later for new offers and discounts."
          icon="🏷️"
        />
      )}

      {promos && promos.length > 0 && (
        <div className="space-y-3">
          {promos.map((promo) => (
            <div key={promo.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {promo.discountType === 'PERCENTAGE'
                      ? `${promo.value}% off`
                      : `GHS ${promo.value} off`}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  Valid until {new Date(promo.validUntil).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
