import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import PageHeader from "../views/Header/PageHeader";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-1">
          <PageHeader></PageHeader>
      </header>
      <main className="flex-1 p-4 flex flex-col items-center justify-start bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
