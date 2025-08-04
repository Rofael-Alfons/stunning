'use client';

import WebsiteGenerator from '@/components/WebsiteGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
              Stunning
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Transform your stunning website ideas into stunning previews instantly
            </p>
          </div>

          {/* Main Component */}
          <WebsiteGenerator />
        </div>
      </div>
    </div>
  );
}