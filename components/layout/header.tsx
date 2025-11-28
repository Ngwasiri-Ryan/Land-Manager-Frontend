'use client';

import { Search, Bell, User, Settings, LogOut, ChevronDown, Zap, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative border-b border-gray-200/60 bg-white/80 ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-100 rounded-full blur-2xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-amber-100 rounded-full blur-2xl opacity-60 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Search Bar with Premium Styling */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-300 group-focus-within:text-green-500" />
            <input
              type="text"
              placeholder="Search properties, documents, transactions..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/40 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md focus:shadow-lg"
              style={{
                boxShadow: '0 2px 20px rgba(5, 150, 105, 0.08)'
              }}
            />
            {/* Animated focus effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-amber-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications with Premium Badge */}
          <button 
            className="relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 group backdrop-blur-sm border border-gray-200/60 bg-white/50 hover:bg-white/80"
            style={{
              boxShadow: '0 2px 15px rgba(5, 150, 105, 0.05)'
            }}
          >
            <Bell className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-green-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            
            {/* Hover gradient effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          {/* User Menu with Premium Styling */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-2xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm border border-gray-200/60 bg-white/50 hover:bg-white/80"
              style={{
                boxShadow: '0 2px 15px rgba(5, 150, 105, 0.05)'
              }}
            >
              {/* User Avatar with Premium Gradient */}
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)'
                }}
              >
                <span className="text-sm font-bold text-white">JD</span>
                {/* Animated shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:translate-x-12 transition-transform duration-1000" />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-green-800">
                    John Doe
                  </p>
                 
                </div>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-all duration-300 group-hover:text-green-600",
                    isUserMenuOpen && "rotate-180"
                  )}
                />
              </div>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Premium User Dropdown Menu */}
            {isUserMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl border border-gray-200/60 backdrop-blur-xl py-3 z-50 bg-white/95"
                style={{
                  boxShadow: '0 20px 40px rgba(5, 150, 105, 0.15), 0 0 20px rgba(5, 150, 105, 0.05)'
                }}
              >
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-200/60 z-200">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                      style={{ 
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)'
                      }}
                    >
                      <span className="text-sm font-bold text-white">JD</span>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          John Doe
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        john.doe@landmanager.com
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-medium text-amber-600">Premium Plan</span>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Menu Items */}
                <div className="py-2">
                  <button 
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-100/80 group rounded-xl mx-2"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-green-500/10 transition-colors duration-200">
                      <User className="h-4 w-4 text-gray-600 group-hover:text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 group-hover:text-green-800">Profile Settings</p>
                      <p className="text-xs text-gray-500">Manage your account</p>
                    </div>
                  </button>
                  
                  <button 
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-100/80 group rounded-xl mx-2"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-amber-500/10 transition-colors duration-200">
                      <Settings className="h-4 w-4 text-gray-600 group-hover:text-amber-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 group-hover:text-amber-800">App Settings</p>
                      <p className="text-xs text-gray-500">Customize your experience</p>
                    </div>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200/60 my-1" />

                {/* Logout */}
                <button 
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-red-50/80 group rounded-xl mx-2 text-red-600"
                >
                  <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-200">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Sign Out</p>
                    <p className="text-xs text-red-500/80">End your session</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </header>
  );
}