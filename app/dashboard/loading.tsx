'use client';

import { Mountain } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-50 via-white to-green-50/30 p-6 relative">
      {/* Decorative animated background to match the sidebar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-blue-100 rounded-full blur-2xl opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="inline-flex items-center space-x-4 p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)'
            }}
          >
            <Mountain className="h-6 w-6 text-white" />
          </div>

          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900">Preparing your dashboard</h3>
            <p className="text-sm text-gray-600">Loading data and getting things ready...</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-green-100 border-t-green-600 animate-spin" />
        </div>

        <div className="mt-6 text-sm text-gray-500">This may take a moment. Thanks for your patience.</div>
      </div>
    </div>
  );
}