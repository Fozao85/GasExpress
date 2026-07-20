import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import {
  usePendingVendors,
  useApproveVendor,
  useRejectVendor,
  useSuspendVendor,
  useReactivateVendor,
} from '../../../hooks/useAdmin';

export function AdminVendorsScreen() {
  const navigate = useNavigate();
  const { data: vendors, isLoading, error } = usePendingVendors();
  const approve = useApproveVendor();
  const reject = useRejectVendor();

  return (
    <div className="p-6 pb-12">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Approvals</h1>

      {isLoading && <LoadingSkeleton count={3} />}
      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load pending vendors.
        </div>
      )}

      {vendors && vendors.length === 0 && (
        <EmptyState
          title="No pending vendors"
          message="All vendor applications have been reviewed"
          icon="✅"
        />
      )}

      {vendors && vendors.length > 0 && (
        <div className="space-y-3">
          {vendors.map((v) => (
            <div key={v.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{v.businessName}</p>
                  <p className="text-sm text-gray-500">
                    Owner: {v.ownerName} &bull; {v.ownerPhone}
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>Address: {v.address}</p>
                <p>Phone: {v.phone}</p>
                <p>
                  Submitted:{' '}
                  {new Date(v.submittedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => approve.mutate(v.id)}
                  isLoading={approve.isPending && approve.variables === v.id}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => reject.mutate(v.id)}
                  isLoading={reject.isPending && reject.variables === v.id}
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
