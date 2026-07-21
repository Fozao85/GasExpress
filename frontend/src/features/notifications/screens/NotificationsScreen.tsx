import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
} from '../../../hooks/useNotifications';

export function NotificationsScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useNotifications(page);
  const { data: unreadData } = useUnreadCount();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const notifications = data?.notifications ?? [];
  const pagination = data?.pagination;
  const unreadCount = unreadData?.count ?? 0;

  const handleBack = () => navigate(-1);

  return (
    <div className="p-4 pb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-primary-500 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            Mark all read
          </Button>
        )}
      </div>

      {isLoading && <LoadingSkeleton count={5} />}

      {error && (
        <div className="bg-error-50 text-error-700 rounded-xl p-4 text-sm" role="alert">
          Failed to load notifications.
        </div>
      )}

      {!isLoading && !error && notifications.length === 0 && (
        <EmptyState title="No notifications" message="You're all caught up!" />
      )}

      {!isLoading && !error && notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`rounded-xl p-4 transition-colors ${
                notif.isRead
                  ? 'bg-white border border-gray-200'
                  : 'bg-primary-50 border border-primary-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm font-medium ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}
                  >
                    {notif.title}
                  </h3>
                  <p className={`text-sm mt-1 ${notif.isRead ? 'text-gray-500' : 'text-gray-600'}`}>
                    {notif.body}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(notif.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead.mutate(notif.id)}
                    disabled={markAsRead.isPending}
                    className="text-xs text-primary-600 font-medium hover:underline whitespace-nowrap mt-1"
                    aria-label={`Mark "${notif.title}" as read`}
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="text-sm text-primary-500 font-medium disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="text-sm text-primary-500 font-medium disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
