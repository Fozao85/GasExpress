import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { usePendingRiders, useApproveRider, useRejectRider } from '../../../hooks/useAdmin';

export function AdminRidersScreen() {
  const navigate = useNavigate();
  const { data: riders, isLoading, error } = usePendingRiders();
  const approve = useApproveRider();
  const reject = useRejectRider();

  return (
    <div className="p-6 pb-12">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Rider Approvals</h1>

      {isLoading && <LoadingSkeleton count={3} />}
      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load pending riders.
        </div>
      )}

      {riders && riders.length === 0 && (
        <EmptyState
          title="No pending riders"
          message="All rider applications have been reviewed"
          icon="✅"
        />
      )}

      {riders && riders.length > 0 && (
        <div className="space-y-3">
          {riders.map((r) => (
            <div key={r.id || r.userId} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{r.fullName}</p>
                  <p className="text-sm text-gray-500">{r.phone}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>Vehicle: {r.vehicleType || 'N/A'}</p>
                <p>License: {r.licenseNumber || 'N/A'}</p>
                <p>National ID: {r.nationalId || 'N/A'}</p>
                <p>
                  Registered:{' '}
                  {new Date(r.registeredAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => approve.mutate(r.id!)}
                  isLoading={approve.isPending && approve.variables === r.id}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => reject.mutate(r.id!)}
                  isLoading={reject.isPending && reject.variables === r.id}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
