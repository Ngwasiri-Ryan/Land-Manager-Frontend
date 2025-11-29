'use client'
import React from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, MapPin, DollarSign, Search, Filter, Eye, Edit2, 
  Check, X, TrendingUp, FileText, Users, BarChart3, 
  ChevronDown, Home, Shield,  Calendar, Copy, MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Land = {
  id: string;
  title: string;
  quarter: string;
  size: string;
  price: string;
  priceNum: number;
  status: 'Published' | 'Draft' | 'Pending' | string;
  verified: boolean;
  documentType?: string;
  cover?: string | null;
  views?: number;
  inquiries?: number;
  lastUpdated?: string;
  landData?: any; // Full backend data
};

export default function LandPage() {
  const [query, setQuery] = useState('');
  const [quarterFilter, setQuarterFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [docFilter, setDocFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLands, setSelectedLands] = useState<string[]>([]);

  const [lands, setLands] = useState<Land[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch lands from backend
  React.useEffect(() => {
    let mounted = true;
    const fetchLands = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/land');
        if (!res.ok) throw new Error(`Failed to fetch lands: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        
        const mapped: Land[] = (data || []).map((d: any) => ({
          id: d.id,
          title: d.title,
          quarter: d.quarter || '',
          size: d.size_value ? `${d.size_value} ${d.size_unit || 'sqm'}` : '',
          price: d.price ? `XAF ${Number(d.price).toLocaleString()}` : '',
          priceNum: Number(d.price) || 0,
          status: d.status ? (d.status.charAt(0).toUpperCase() + d.status.slice(1)) : 'Draft',
          verified: d.document_status === 'approved',
          documentType: d.document_type || undefined,
          cover: null,
          views: d.views_count || 0,
          inquiries: d.inquiries_count || 0,
          lastUpdated: d.updated_at ? new Date(d.updated_at).toLocaleDateString() : 'Recently',
          landData: d // Store full backend data
        }));
        setLands(mapped);
      } catch (err) {
        console.error('Error fetching lands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
    return () => { mounted = false; };
  }, []);

  // Summary stats with better calculations
  const stats = useMemo(() => ({
    total: lands.length,
    published: lands.filter(l => l.status === 'Published').length,
    drafts: lands.filter(l => l.status === 'Draft').length,
    pending: lands.filter(l => l.status === 'Pending').length,
    inquiries: lands.reduce((sum, l) => sum + (l.inquiries || 0), 0),
    totalValue: lands.reduce((sum, l) => sum + l.priceNum, 0),
    verified: lands.filter(l => l.verified).length,
    averagePrice: lands.length > 0 ? Math.round(lands.reduce((sum, l) => sum + l.priceNum, 0) / lands.length) : 0,
  }), [lands]);

  const filtered = useMemo(() => {
    return lands.filter(l => {
      if (query) {
        const q = query.toLowerCase();
        if (!(`${l.title} ${l.quarter} ${l.documentType}`.toLowerCase()).includes(q)) return false;
      }
      if (quarterFilter && l.quarter !== quarterFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (docFilter && l.documentType !== docFilter) return false;
      const min = parseInt(minPrice.replace(/\D/g, '') || '0', 10);
      const max = parseInt(maxPrice.replace(/\D/g, '') || '0', 10);
      if (min && l.priceNum < min) return false;
      if (max && l.priceNum > max) return false;
      return true;
    });
  }, [lands, query, quarterFilter, statusFilter, docFilter, minPrice, maxPrice]);

  // Quick actions
  const togglePublish = async (id: string) => {
    try {
      const land = lands.find(l => l.id === id);
      if (!land) return;
      const newStatus = land.status === 'Published' ? 'draft' : 'published';
      const res = await fetch(`http://localhost:4000/api/land/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ status: newStatus }) 
      });
      if (!res.ok) throw new Error('Failed to update status');
      setLands(prev => prev.map(l => l.id === id ? { 
        ...l, 
        status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) 
      } : l));
    } catch (err) {
      console.error(err);
      alert('Failed to toggle publish status');
    }
  };

  const toggleVerify = async (id: string) => {
    try {
      const land = lands.find(l => l.id === id);
      if (!land) return;
      const newStatus = land.verified ? 'pending' : 'approved';
      const res = await fetch(`http://localhost:4000/api/land/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ document_status: newStatus }) 
      });
      if (!res.ok) throw new Error('Failed to update verification');
      setLands(prev => prev.map(l => l.id === id ? { 
        ...l, 
        verified: !l.verified,
        documentType: l.documentType // Keep document type
      } : l));
    } catch (err) {
      console.error(err);
      alert('Failed to update verification status');
    }
  };

  const removeLand = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/land/${id}`, { method: 'DELETE' });
      if (res.status !== 204 && !res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to delete (${res.status})`);
      }
      setLands(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete listing');
    }
  };

  const duplicateLand = async (id: string) => {
    try {
      const land = lands.find(l => l.id === id);
      if (!land) return;
      
      const { landData } = land;
      const duplicateData = {
        ...landData,
        title: `${landData.title} (Copy)`,
        status: 'draft'
      };
      
      delete duplicateData.id;
      delete duplicateData.created_at;
      delete duplicateData.updated_at;
      
      const res = await fetch('http://localhost:4000/api/land', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData)
      });
      
      if (!res.ok) throw new Error('Failed to duplicate land');
      const newLand = await res.json();
      
      // Refresh the list
      const fetchLands = async () => {
        const res = await fetch('http://localhost:4000/api/land');
        if (res.ok) {
          const data = await res.json();
          const mapped: Land[] = (data || []).map((d: any) => ({
            id: d.id,
            title: d.title,
            quarter: d.quarter || '',
            size: d.size_value ? `${d.size_value} ${d.size_unit || 'sqm'}` : '',
            price: d.price ? `XAF ${Number(d.price).toLocaleString()}` : '',
            priceNum: Number(d.price) || 0,
            status: d.status ? (d.status.charAt(0).toUpperCase() + d.status.slice(1)) : 'Draft',
            verified: d.document_status === 'approved',
            documentType: d.document_type || undefined,
            cover: null,
            views: d.views_count || 0,
            inquiries: d.inquiries_count || 0,
            lastUpdated: d.updated_at ? new Date(d.updated_at).toLocaleDateString() : 'Recently',
            landData: d
          }));
          setLands(mapped);
        }
      };
      fetchLands();
      
    } catch (err) {
      console.error(err);
      alert('Failed to duplicate listing');
    }
  };

  const formatCurrency = (amount: number) => {
    return `XAF ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Enhanced Header */}
      <div className="border-b border-gray-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
                  Land Portfolio
                </h1>
                <p className="text-gray-600 mt-1">
                  {stats.total} properties • {formatCurrency(stats.totalValue)} total value
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "gap-2 rounded-xl border transition-all",
                  showFilters 
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                    : "border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
                )}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
              </Button>

              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "rounded-none border-0 gap-2",
                    viewMode === 'grid' && "bg-emerald-600 text-white"
                  )}
                >
                  <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={cn(
                        "bg-current rounded-sm",
                        viewMode === 'grid' ? "bg-white" : "bg-gray-400"
                      )} />
                    ))}
                  </div>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "rounded-none border-0 gap-2",
                    viewMode === 'list' && "bg-emerald-600 text-white"
                  )}
                >
                  <div className="flex flex-col gap-0.5 w-4 h-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={cn(
                        "bg-current h-1 rounded-sm",
                        viewMode === 'list' ? "bg-white" : "bg-gray-400"
                      )} />
                    ))}
                  </div>
                </Button>
              </div>
              
              <Link 
                href="/land/new" 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Add Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform">
                  <Home className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.published}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.verified}</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{stats.inquiries}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Price</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(stats.averagePrice)}</p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(stats.totalValue)}</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search properties by title, location, document type..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white/80 backdrop-blur-sm text-base shadow-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-gray-300"
                onClick={() => {
                  setQuery('');
                  setQuarterFilter('');
                  setStatusFilter('');
                  setDocFilter('');
                  setMinPrice('');
                  setMaxPrice('');
                }}
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>

          {/* Enhanced Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/60 animate-in slide-in-from-top duration-300 shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  value={quarterFilter} 
                  onChange={(e) => setQuarterFilter(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-sm"
                >
                  <option value="">All quarters</option>
                  <option>Molyko</option>
                  <option>Mile 16</option>
                  <option>Bokwango</option>
                  <option>Muea</option>
                  <option>Bonduma</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-sm"
                >
                  <option value="">All status</option>
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)} 
                    placeholder="Min XAF" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
                  />
                  <input 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                    placeholder="Max XAF" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select 
                  value={docFilter} 
                  onChange={(e) => setDocFilter(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-sm"
                >
                  <option value="">Any document</option>
                  <option>layout_plan</option>
                  <option>Land Certificate</option>
                  <option>Sales Agreement</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Properties Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(land => (
              <Card 
                key={land.id} 
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden cursor-pointer hover:translate-y-[-4px]"
              >
                <div className="relative h-48 bg-linear-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />
                  <MapPin className="w-16 h-16 text-emerald-600/30 group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Status & Verification Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className={cn("text-xs font-semibold border", getStatusColor(land.status))}>
                      {land.status}
                    </Badge>
                    {land.verified && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-semibold flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                  
                      className="h-8 w-8 p-0 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateLand(land.id);
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors text-lg leading-tight">
                        {land.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{land.quarter}</span>
                        <span className="text-gray-300">•</span>
                        <span>{land.size}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{land.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{land.inquiries}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {land.lastUpdated}
                      </div>
                    </div>

                    {/* Price & Document */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        <div className="text-xl font-bold text-emerald-600">{land.price}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <FileText className="w-3 h-3" />
                          {land.documentType}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <Button
                        asChild
                        variant="outline"
                    
                        className="flex-1 gap-2 rounded-lg border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 text-sm"
                      >
                        <Link href={`/land/${land.id}`}>
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                      </Button>
                      
                      <Button
                        asChild
                        variant="outline"
                    
                        className="flex-1 gap-2 rounded-lg border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-sm"
                      >
                        <Link href={`/land/${land.id}/edit`}>
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        onClick={() => togglePublish(land.id)}
                        variant={land.status === 'Published' ? "outline" : "default"}
                    
                        className={cn(
                          "px-3 rounded-lg transition-all text-sm",
                          land.status === 'Published' 
                            ? "border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400" 
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        )}
                      >
                        {land.status === 'Published' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filtered.map(land => (
              <Card 
                key={land.id} 
                className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{land.title}</h3>
                        <Badge className={cn("text-xs", getStatusColor(land.status))}>
                          {land.status}
                        </Badge>
                        {land.verified && (
                          <Badge className="bg-emerald-100 text-emerald-800 text-xs flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {land.quarter}
                        </div>
                        <div>{land.size}</div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {land.documentType}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-emerald-600">{land.price}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Eye className="w-4 h-4" />
                        {land.views}
                        <Users className="w-4 h-4 ml-2" />
                        {land.inquiries}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        asChild
                        variant="ghost"
                    
                        className="h-8 w-8 p-0"
                      >
                        <Link href={`/land/${land.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                    
                        className="h-8 w-8 p-0"
                      >
                        <Link href={`/land/${land.id}/edit`}>
                          <Edit2 className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => togglePublish(land.id)}
                        variant="ghost"
                    
                        className="h-8 w-8 p-0"
                      >
                        {land.status === 'Published' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Enhanced Empty State */}
        {filtered.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {query || quarterFilter || statusFilter || docFilter || minPrice || maxPrice 
                ? 'Try adjusting your filters to see more results.' 
                : 'Get started by adding your first property listing.'}
            </p>
            <Link 
              href="/land/new" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Your First Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}