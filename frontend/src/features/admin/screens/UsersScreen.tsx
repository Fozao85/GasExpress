import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useUsers, useUpdateUserStatus, useDeleteUser } from '../../../hooks/useAdmin';

export function AdminUsersScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading, error } = useUsers({
    page,
    limit: 20,
    role: roleFilter || undefined,
    status: statusFilter || undefined,
    search: search || undefined,
  });
  const updateStatus = useUpdateUserStatus();
  const deleteUser = useDeleteUser();

  return (
    <div className="p-6 pb-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Users</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <Input
          placeholder="Search name, phone, email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Roles</option>
          <option value="CUSTOMER">Customer</option>
          <option value="VENDOR">Vendor</option>
          <option value="RIDER">Rider</option>
          <option value="ADMIN">Admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {isLoading && <LoadingSkeleton count={5} />}
      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load users.
        </div>
      )}

      {data && data.users.length === 0 && (
        <EmptyState title="No users found" message="Try adjusting your filters" icon="👤" />
      )}

      {data && data.users.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Phone</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Joined</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-900">{user.fullName}</td>
                  <td className="p-3 text-gray-500">{user.phone}</td>
                  <td className="p-3">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-1 justify-end">
                      {user.status === 'ACTIVE' ? (
                        <button
                          onClick={() => updateStatus.mutate({ id: user.id, status: 'SUSPENDED' })}
                          className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        >
                          Suspend
                        </button>
                      ) : user.status === 'SUSPENDED' ? (
                        <button
                          onClick={() => updateStatus.mutate({ id: user.id, status: 'ACTIVE' })}
                          className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          Reactivate
                        </button>
                      ) : null}
                      <button
                        onClick={() => {
                          if (confirm('Delete this user?')) deleteUser.mutate(user.id);
                        }}
                        className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && data.pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center text-sm text-gray-500 px-2">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= data.pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    CUSTOMER: 'bg-blue-100 text-blue-700',
    VENDOR: 'bg-green-100 text-green-700',
    RIDER: 'bg-amber-100 text-amber-700',
    ADMIN: 'bg-purple-100 text-purple-700',
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[role] || 'bg-gray-100 text-gray-600'}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700',
    SUSPENDED: 'bg-red-100 text-red-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-600'}`}
    >
      {status}
    </span>
  );
}
