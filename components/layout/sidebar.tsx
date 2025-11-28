'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MapPin, 
  FileText, 
  DollarSign, 
  Calendar,
  Settings,
  Landmark,
  ChevronLeft,
  ChevronRight,
  Zap,
  Mountain,
  Leaf,
  Sparkles,
  Crown,
  Menu,
  X
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Simple cn utility function
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & analytics',
    count: 12
  },
  { 
    name: 'Properties', 
    href: '/land', 
    icon: MapPin,
    description: 'Land parcels & assets',
    count: 8
  },
  { 
    name: 'Documents', 
    href: '/documents', 
    icon: FileText,
    description: 'Contracts & permits',
    count: 47
  },
  { 
    name: 'Finances', 
    href: '/finances', 
    icon: DollarSign,
    description: 'Revenue & expenses',
    count: 23
  },
  { 
    name: 'Transactions', 
    href: '/transactions', 
    icon: Landmark,
    description: 'Financial records',
    count: 15
  },
  { 
    name: 'Calendar', 
    href: '/calendar', 
    icon: Calendar,
    description: 'Schedule & events',
    count: 5
  },
];

const tools = [
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'App configuration',
    premium: false
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Light theme premium color palette
  const colors = {
    primary: {
      light: '#22c55e',
      DEFAULT: '#16a34a',
      dark: '#15803d',
      foreground: '#ffffff'
    },
    accent: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
      foreground: '#1c1917'
    },
    background: {
      light: '#ffffff',
      DEFAULT: '#fefefe',
      dark: '#f8fafc'
    },
    foreground: {
      light: '#374151',
      DEFAULT: '#1a1a1a',
      dark: '#0f172a'
    },
    gradients: {
      premium: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)',
      gold: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
      sidebar: 'linear-gradient(180deg, #ffffff 0%, #fefefe 30%, #f8fafc 100%)',
      glass: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
    }
  };

  // Auto-expand on hover when collapsed (desktop only)
  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const sidebar = sidebarRef.current;
    if (sidebar && window.innerWidth >= 768) {
      sidebar.addEventListener('mouseenter', handleMouseEnter);
      sidebar.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('mouseenter', handleMouseEnter);
        sidebar.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveWidth = collapsed && !isHovered ? 88 : 320;
  const showFullContent = (!collapsed || isHovered) && !isMobile;

  // Mobile sidebar component
  const MobileSidebar = () => (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:hidden",
          "flex flex-col backdrop-blur-xl border-r border-gray-200",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ 
          background: colors.gradients.sidebar,
          boxShadow: '0 0 60px rgba(5, 150, 105, 0.08), 0 0 20px rgba(5, 150, 105, 0.04)'
        }}
      >
        {/* Mobile Header */}
        <div className="relative z-20 flex items-center justify-between p-6 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 relative overflow-hidden group"
                style={{ background: colors.gradients.premium }}
              >
                <Mountain className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
                LandManager
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2.5 rounded-xl transition-all duration-500 hover:scale-110 border border-gray-300 relative overflow-hidden group shadow-lg bg-white/60 backdrop-blur-sm"
          >
            <X className="h-4 w-4 relative z-10 text-gray-600 group-hover:text-gray-900" />
          </button>
        </div>

        {/* Mobile Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-5 space-y-2">
            <div className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center rounded-2xl p-4 text-sm font-semibold transition-all duration-500",
                      "hover:scale-105 hover:shadow-xl border backdrop-blur-sm",
                      "overflow-hidden",
                      isActive
                        ? "shadow-lg scale-105 border-green-500/40 bg-green-50 text-gray-900"
                        : "border-gray-200/60 bg-white/50 text-gray-600 hover:text-gray-900 hover:border-green-300/60"
                    )}
                  >
                    <div 
                      className={cn(
                        "absolute inset-0 opacity-0 transition-all duration-500",
                        isActive 
                          ? "opacity-100" 
                          : "group-hover:opacity-100"
                      )}
                      style={{
                        background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
                      }}
                    />
                    
                    <div 
                      className={cn(
                        "absolute inset-0 rounded-2xl blur-md opacity-0 transition-opacity duration-500",
                        isActive ? "opacity-40" : "group-hover:opacity-20"
                      )}
                      style={{
                        background: 'radial-gradient(circle at center, rgba(22, 163, 74, 0.2) 0%, transparent 70%)'
                      }}
                    />

                    <div 
                      className={cn(
                        "relative z-10 flex-shrink-0 p-2.5 rounded-xl transition-all duration-500 shadow-lg border",
                        isActive 
                          ? "bg-green-500 text-white shadow-green-500/30 border-green-600/30" 
                          : "bg-gray-100 text-gray-600 border-gray-200 group-hover:bg-green-500/10 group-hover:text-green-700 group-hover:border-green-300 group-hover:shadow-green-500/15"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>

                    <div className="relative z-10 flex-1 ml-4 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "font-bold truncate transition-colors duration-300",
                          isActive ? "text-gray-900" : "group-hover:text-gray-900"
                        )}>
                          {item.name}
                        </span>
                        {item.count && (
                          <span 
                            className={cn(
                              "flex items-center justify-center px-2 py-1 text-xs font-black rounded-full min-w-[24px] transition-all duration-300 shadow-lg border",
                              isActive 
                                ? "bg-green-600 text-white border-green-700/30" 
                                : "bg-amber-500/10 text-amber-700 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-amber-50 group-hover:border-amber-600/50"
                            )}
                          >
                            {item.count}
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-xs truncate mt-1 transition-colors duration-300",
                        isActive ? "text-gray-700" : "text-gray-500 group-hover:text-gray-600"
                      )}>
                        {item.description}
                      </p>
                    </div>

                    {isActive && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
                          <div className="w-2 h-2 bg-green-500 rounded-full relative border border-green-600/30" />
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Tools Section */}
            <div className="pt-6">
              <div className="flex items-center px-3 py-3">
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                <span className="px-4 text-xs font-black text-gray-500 uppercase tracking-widest bg-white/50 rounded-full py-1.5 border border-gray-200">
                  Premium Tools
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
              </div>
            </div>

            <div className="space-y-2">
              {tools.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center rounded-2xl p-4 text-sm font-semibold transition-all duration-500",
                      "hover:scale-105 hover:shadow-xl border backdrop-blur-sm overflow-hidden",
                      isActive
                        ? "shadow-lg scale-105 border-amber-500/40 bg-amber-50 text-gray-900"
                        : "border-gray-200/60 bg-white/50 text-gray-600 hover:text-gray-900 hover:border-amber-300/60"
                    )}
                  >
                    <div 
                      className={cn(
                        "absolute inset-0 opacity-0 transition-all duration-500",
                        isActive 
                          ? "opacity-100" 
                          : "group-hover:opacity-100"
                      )}
                      style={{
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)'
                      }}
                    />

                    <div 
                      className={cn(
                        "relative z-10 flex-shrink-0 p-2.5 rounded-xl transition-all duration-500 shadow-lg border",
                        isActive 
                          ? "bg-amber-500 text-amber-900 shadow-amber-500/30 border-amber-600/30" 
                          : "bg-gray-100 text-gray-600 border-gray-200 group-hover:bg-amber-500/10 group-hover:text-amber-700 group-hover:border-amber-300 group-hover:shadow-amber-500/15"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>

                    <div className="relative z-10 flex-1 ml-4 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "font-bold truncate transition-colors duration-300",
                          isActive ? "text-gray-900" : "group-hover:text-gray-900"
                        )}>
                          {item.name}
                        </span>
                      </div>
                      <p className={cn(
                        "text-xs truncate mt-1 transition-colors duration-300",
                        isActive ? "text-gray-700" : "text-gray-500 group-hover:text-gray-600"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile User Profile */}
          <div className="p-5 border-t border-gray-200/60 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center rounded-2xl p-4 transition-all duration-500 group cursor-pointer relative overflow-hidden border border-gray-200/60 bg-white/50 backdrop-blur-sm">
              <div className="relative">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/20 relative overflow-hidden border border-green-600/30"
                  style={{ background: colors.gradients.premium }}
                >
                  <span className="text-sm font-black text-white">JD</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg">
                  <div className="w-full h-full bg-green-500 rounded-full animate-ping absolute" />
                </div>
              </div>
              
              <div className="flex-1 ml-4 min-w-0 relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-900 truncate">John Doe</p>
                  <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Desktop sidebar component
  const DesktopSidebar = () => (
    <div
      ref={sidebarRef}
      className="relative hidden md:flex flex-col transition-all duration-700 ease-out backdrop-blur-xl border-r border-gray-200"
      style={{ 
        width: `${effectiveWidth}px`,
        background: colors.gradients.sidebar,
        boxShadow: '0 0 60px rgba(5, 150, 105, 0.08), 0 0 20px rgba(5, 150, 105, 0.04)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-100 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-50 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px),
                             linear-gradient(90deg, #16a34a 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Header with Premium Logo */}
      <div className="relative z-20 flex items-center justify-between p-6 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
        {showFullContent ? (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 relative overflow-hidden group"
                style={{ background: colors.gradients.premium }}
              >
                <Mountain className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
                LandManager
              </span>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 group"
              style={{ background: colors.gradients.premium }}
            >
              <Leaf className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-amber-300"
                 style={{ background: colors.gradients.gold }}>
              <Crown className="h-2 w-2 text-amber-900" />
            </div>
          </div>
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-2.5 rounded-xl transition-all duration-500 hover:scale-110 border border-gray-300 relative overflow-hidden group",
            "shadow-lg bg-white/60 backdrop-blur-sm",
            showFullContent ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {collapsed ? (
            <ChevronRight className="h-4 w-4 relative z-10 text-gray-600 group-hover:text-gray-900" />
          ) : (
            <ChevronLeft className="h-4 w-4 relative z-10 text-gray-600 group-hover:text-gray-900" />
          )}
        </button>
      </div>

      {/* Premium Navigation */}
      <nav className="relative z-10 flex-1 p-5 space-y-2 overflow-y-auto">
        <div className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-2xl p-4 text-sm font-semibold transition-all duration-500",
                  "hover:scale-105 hover:shadow-xl border backdrop-blur-sm",
                  "overflow-hidden",
                  isActive
                    ? "shadow-lg scale-105 border-green-500/40 bg-green-50 text-gray-900"
                    : "border-gray-200/60 bg-white/50 text-gray-600 hover:text-gray-900 hover:border-green-300/60"
                )}
              >
                <div 
                  className={cn(
                    "absolute inset-0 opacity-0 transition-all duration-500",
                    isActive 
                      ? "opacity-100" 
                      : "group-hover:opacity-100"
                  )}
                  style={{
                    background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
                  }}
                />
                
                <div 
                  className={cn(
                    "absolute inset-0 rounded-2xl blur-md opacity-0 transition-opacity duration-500",
                    isActive ? "opacity-40" : "group-hover:opacity-20"
                  )}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(22, 163, 74, 0.2) 0%, transparent 70%)'
                  }}
                />

                <div 
                  className={cn(
                    "relative z-10 flex-shrink-0 p-2.5 rounded-xl transition-all duration-500 shadow-lg border",
                    isActive 
                      ? "bg-green-500 text-white shadow-green-500/30 border-green-600/30" 
                      : "bg-gray-100 text-gray-600 border-gray-200 group-hover:bg-green-500/10 group-hover:text-green-700 group-hover:border-green-300 group-hover:shadow-green-500/15"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>

                {showFullContent && (
                  <div className="relative z-10 flex-1 ml-4 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "font-bold truncate transition-colors duration-300",
                        isActive ? "text-gray-900" : "group-hover:text-gray-900"
                      )}>
                        {item.name}
                      </span>
                      {item.count && (
                        <span 
                          className={cn(
                            "flex items-center justify-center px-2 py-1 text-xs font-black rounded-full min-w-[24px] transition-all duration-300 shadow-lg border",
                            isActive 
                              ? "bg-green-600 text-white border-green-700/30" 
                              : "bg-amber-500/10 text-amber-700 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-amber-50 group-hover:border-amber-600/50"
                          )}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                    <p className={cn(
                      "text-xs truncate mt-1 transition-colors duration-300",
                      isActive ? "text-gray-700" : "text-gray-500 group-hover:text-gray-600"
                    )}>
                      {item.description}
                    </p>
                  </div>
                )}

                {isActive && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
                      <div className="w-2 h-2 bg-green-500 rounded-full relative border border-green-600/30" />
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {showFullContent && (
          <div className="pt-6">
            <div className="flex items-center px-3 py-3">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
              <span className="px-4 text-xs font-black text-gray-500 uppercase tracking-widest bg-white/50 rounded-full py-1.5 border border-gray-200">
                Premium Tools
              </span>
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          {tools.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-2xl p-4 text-sm font-semibold transition-all duration-500",
                  "hover:scale-105 hover:shadow-xl border backdrop-blur-sm overflow-hidden",
                  isActive
                    ? "shadow-lg scale-105 border-amber-500/40 bg-amber-50 text-gray-900"
                    : "border-gray-200/60 bg-white/50 text-gray-600 hover:text-gray-900 hover:border-amber-300/60"
                )}
              >
                <div 
                  className={cn(
                    "absolute inset-0 opacity-0 transition-all duration-500",
                    isActive 
                      ? "opacity-100" 
                      : "group-hover:opacity-100"
                  )}
                  style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)'
                  }}
                />

                <div 
                  className={cn(
                    "relative z-10 flex-shrink-0 p-2.5 rounded-xl transition-all duration-500 shadow-lg border",
                    isActive 
                      ? "bg-amber-500 text-amber-900 shadow-amber-500/30 border-amber-600/30" 
                      : "bg-gray-100 text-gray-600 border-gray-200 group-hover:bg-amber-500/10 group-hover:text-amber-700 group-hover:border-amber-300 group-hover:shadow-amber-500/15"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>

                {showFullContent && (
                  <div className="relative z-10 flex-1 ml-4 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "font-bold truncate transition-colors duration-300",
                        isActive ? "text-gray-900" : "group-hover:text-gray-900"
                      )}>
                        {item.name}
                      </span>
                    </div>
                    <p className={cn(
                      "text-xs truncate mt-1 transition-colors duration-300",
                      isActive ? "text-gray-700" : "text-gray-500 group-hover:text-gray-600"
                    )}>
                      {item.description}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Premium User Profile Section */}
      <div className="relative z-20 p-5 border-t border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <div 
          className={cn(
            "flex items-center rounded-2xl p-4 transition-all duration-500 group cursor-pointer relative overflow-hidden border border-gray-200/60",
            "hover:scale-105 hover:shadow-xl bg-white/50 backdrop-blur-sm"
          )}
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
            }}
          />

          <div className="relative">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/20 relative overflow-hidden group-hover:scale-110 transition-transform duration-500 border border-green-600/30"
              style={{ background: colors.gradients.premium }}
            >
              <span className="text-sm font-black text-white">JD</span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:translate-x-12 transition-transform duration-1000" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg">
              <div className="w-full h-full bg-green-500 rounded-full animate-ping absolute" />
            </div>
          </div>
          
          {showFullContent && (
            <div className="flex-1 ml-4 min-w-0 relative z-10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900 truncate">John Doe</p>
                <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {showFullContent && (
          <div className="mt-4 grid grid-cols-3 gap-3 p-4 rounded-2xl border border-gray-200/60 bg-white/30">
            {[
              { value: '12', label: 'Lands', color: 'green', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-700' },
              { value: '47', label: 'Docs', color: 'blue', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-700' },
              { value: '8', label: 'Tasks', color: 'amber', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-700' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={cn(
                  "text-center p-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm border",
                  stat.bg, stat.border
                )}
              >
                <div className={cn("text-sm font-black mb-1", stat.text)}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {collapsed && !isHovered && (
        <div 
          className="absolute inset-y-0 right-0 w-1 transition-all duration-500"
          style={{
            background: 'linear-gradient(to bottom, rgba(22, 163, 74, 0.4), rgba(245, 158, 11, 0.3))',
            boxShadow: '0 0 15px rgba(22, 163, 74, 0.2)'
          }}
        />
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-300 shadow-lg hover:scale-110 transition-all duration-300 md:hidden"
        style={{
          background: colors.gradients.glass
        }}
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      {/* Render both mobile and desktop sidebars */}
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}