import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <div className="p-4">
              <h1 className="text-2xl font-bold text-primary-500">GasNow</h1>
              <p className="text-gray-600 mt-2">Welcome to GasNow. Select an app to continue.</p>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
