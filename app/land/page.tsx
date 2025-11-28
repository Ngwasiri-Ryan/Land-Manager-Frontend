'use client'
import React from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, DollarSign, Search, Filter, Eye, Edit2, Trash2, Share2, Tag, Check, X, TrendingUp, FileText, Clock, Users, BarChart3, ChevronDown, MoreVertical } from 'lucide-react';
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
};

export default function LandPage() {
  const [query, setQuery] = useState('');
  const [quarterFilter, setQuarterFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [docFilter, setDocFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [lands, setLands] = useState<Land[]>([]);
  const [loading, setLoading] = useState(false);

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
          verified: false,
          documentType: d.document_type || undefined,
          cover: null,
          views: 0,
          inquiries: 0,
          lastUpdated: d.updated_at || undefined,
        }));
        setLands(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
    return () => { mounted = false; };
  }, []);

  // Summary stats
  const stats = useMemo(() => ({
    total: lands.length,
    published: lands.filter(l => l.status === 'Published').length,
    drafts: lands.filter(l => l.status === 'Draft').length,
    pending: lands.filter(l => l.status === 'Pending').length,
    inquiries: lands.reduce((sum, l) => sum + (l.inquiries || 0), 0),
    totalValue: lands.reduce((sum, l) => sum + l.priceNum, 0),
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

  // Actions
  const togglePublish = async (id: string) => {
    try {
      const land = lands.find(l => l.id === id);
      if (!land) return;
      const newStatus = land.status === 'Published' ? 'draft' : 'published';
      const res = await fetch(`http://localhost:4000/api/land/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      if (!res.ok) throw new Error('Failed to update status');
      setLands(prev => prev.map(l => l.id === id ? { ...l, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) } : l));
    } catch (err) {
      console.error(err);
      alert('Failed to toggle publish status');
    }
  };

  const toggleVerify = (id: string) => {
    // Verification typically requires backend flow; for now toggle locally
    setLands(prev => prev.map(l => l.id === id ? { ...l, verified: !l.verified } : l));
  };

  const removeLand = async (id: string) => {
    if (!confirm('Delete this listing? This cannot be undone.')) return;
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

  const shareWhatsApp = (l: Land) => {
    const text = encodeURIComponent(`${l.title} - ${l.quarter} - ${l.price}. Contact: `);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const formatCurrency = (amount: number) => {
    return `XAF ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
                Land Portfolio
              </h1>
              <p className="text-lg text-gray-600 mt-2 max-w-2xl">
                Manage your property listings, track performance, and connect with potential buyers
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 rounded-xl border-gray-300 hover:border-green-500 hover:bg-green-50"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
              </Button>
              
              <Link 
                href="/land/new" 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Add New Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pending}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{stats.inquiries}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{formatCurrency(stats.totalValue)}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Main Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties by title, location, or document type..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 bg-white/80 backdrop-blur-sm text-lg"
            />
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/60 animate-in slide-in-from-top duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  value={quarterFilter} 
                  onChange={(e) => setQuarterFilter(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
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
                    placeholder="Min" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <input 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                    placeholder="Max" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select 
                  value={docFilter} 
                  onChange={(e) => setDocFilter(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
                >
                  <option value="">Any document</option>
                  <option>Layout plan</option>
                  <option>Land Certificate</option>
                  <option>Sales Agreement</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(land => (
            <Card 
              key={land.id} 
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              {/* Property Header */}
              <div className="relative h-48 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <MapPin className="w-12 h-12 text-emerald-600 opacity-20 group-hover:scale-110 transition-transform duration-300" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm",
                    land.status === 'Published' 
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/25" 
                      : land.status === 'Draft' 
                      ? "bg-gray-500 text-white shadow-lg shadow-gray-500/25"
                      : "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                  )}>
                    {land.status}
                  </span>
                </div>

                {/* Verification Badge */}
                <div className="absolute top-4 right-4">
                  {land.verified ? (
                    <div className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg shadow-emerald-500/25 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-gray-400 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      Unverified
                    </div>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                {/* Property Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {land.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{land.quarter}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm">{land.size}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{land.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{land.inquiries} inquiries</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Updated {land.lastUpdated}
                    </div>
                  </div>

                  {/* Price & Document */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{land.price}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <FileText className="w-3 h-3" />
                        {land.documentType}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 gap-2 rounded-xl border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
                    >
                      <Link href={`/land/${land.id}`}>
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 gap-2 rounded-xl border-gray-300 hover:border-blue-500 hover:bg-blue-50"
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
                        "px-3 rounded-xl transition-all",
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

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {query || quarterFilter || statusFilter ? 'Try adjusting your filters to see more results.' : 'Get started by adding your first property listing.'}
            </p>
            <Link 
              href="/land/new" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
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