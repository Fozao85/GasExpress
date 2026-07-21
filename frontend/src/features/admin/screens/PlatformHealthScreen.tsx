import { useQueryClient } from '@tanstack/react-query';
import { LoadingSkeleton } from '../../../components/discovery';
import { Button } from '../../../components/ui';
import {
  usePlatformHealth,
  useQueueStats,
  useWebSocketStats,
  usePaymentStats,
  useMediaStats,
  useRetryFailedJobs,
  usePurgeCompletedJobs,
} from '../../../hooks/useAdmin';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: 'bg-success-100 text-success-700',
    unhealthy: 'bg-error-100 text-error-700',
    degraded: 'bg-warning-100 text-warning-700',
    unknown: 'bg-gray-100 text-gray-600',
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.unknown}`}
    >
      {status}
    </span>
  );
}

function IntegrationCard({ name, status, latencyMs, error }: any) {
  const label = name.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900 text-sm">{label}</h3>
        <StatusBadge status={status} />
      </div>
      {latencyMs !== undefined && <p className="text-xs text-gray-500">{latencyMs}ms</p>}
      {error && <p className="text-xs text-error-600 mt-1 truncate">{error}</p>}
    </div>
  );
}

export function PlatformHealthScreen() {
  const queryClient = useQueryClient();
  const { data: health, isLoading: healthLoading } = usePlatformHealth();
  const { data: queue } = useQueueStats();
  const { data: ws } = useWebSocketStats();
  const { data: payments } = usePaymentStats();
  const { data: media } = useMediaStats();
  const retryMutation = useRetryFailedJobs();
  const purgeMutation = usePurgeCompletedJobs();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['admin'] });
  };

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Platform Health</h1>
        <Button variant="outline" size="sm" onClick={refresh}>
          Refresh
        </Button>
      </div>

      {/* Integration Status */}
      <section className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Integration Status</h2>
        {healthLoading ? (
          <LoadingSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {health?.integrations.map((svc) => (
              <IntegrationCard key={svc.name} {...svc} />
            ))}
          </div>
        )}
      </section>

      {/* Queue Status */}
      <section className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Background Jobs</h2>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          {queue ? (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{queue.waiting}</p>
                <p className="text-xs text-gray-500">Waiting</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">{queue.active}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success-600">{queue.completed}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-error-600">{queue.failed}</p>
                <p className="text-xs text-gray-500">Failed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-600">{queue.delayed}</p>
                <p className="text-xs text-gray-500">Delayed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{queue.paused}</p>
                <p className="text-xs text-gray-500">Paused</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Queue unavailable</p>
          )}
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              isLoading={retryMutation.isPending}
              onClick={() => retryMutation.mutate()}
            >
              Retry Failed
            </Button>
            <Button
              size="sm"
              variant="outline"
              isLoading={purgeMutation.isPending}
              onClick={() => purgeMutation.mutate()}
            >
              Purge Completed
            </Button>
          </div>
        </div>
      </section>

      {/* WebSocket Status */}
      <section className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">WebSocket</h2>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          {ws ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Connected Clients</span>
                <span className="font-semibold">{ws.connectedClients}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Customers</span>
                <span className="font-semibold">{ws.customers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vendors</span>
                <span className="font-semibold">{ws.vendors}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Riders</span>
                <span className="font-semibold">{ws.riders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active Rooms</span>
                <span className="font-semibold">{ws.activeRooms}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">WebSocket unavailable</p>
          )}
        </div>
      </section>

      {/* Payment Health */}
      <section className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Payments</h2>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          {payments ? (
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-success-600">{payments.successful}</p>
                <p className="text-xs text-gray-500">Successful</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-error-600">{payments.failed}</p>
                <p className="text-xs text-gray-500">Failed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-600">{payments.pending}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{payments.webhookFailures}</p>
                <p className="text-xs text-gray-500">Webhook Failures</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Payment data unavailable</p>
          )}
        </div>
      </section>

      {/* Media / Storage */}
      <section className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Media Storage</h2>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          {media ? (
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{media.totalUploads}</p>
                <p className="text-xs text-gray-500">Total Uploads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {(media.storageUsed / (1024 * 1024)).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">MB Used</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-600">{media.uploadsToday}</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-error-600">{media.failedUploads}</p>
                <p className="text-xs text-gray-500">Failed</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Media stats unavailable</p>
          )}
        </div>
      </section>
    </div>
  );
}
