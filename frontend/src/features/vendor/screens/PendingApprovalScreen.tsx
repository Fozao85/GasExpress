export function PendingApprovalScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50">
      <div className="text-6xl mb-6">⏳</div>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">Pending Approval</h1>
      <p className="text-gray-600 text-center max-w-sm">
        Your business registration is under review. We'll notify you once it's approved.
      </p>
    </div>
  );
}
