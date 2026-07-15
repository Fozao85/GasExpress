import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-sticky">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-500">GasNow</span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
