import Link from 'next/link';
import { 
  MapPin, Phone,Image, AlertTriangle, 
  ChevronLeft, Share2, Heart, Star, Clock, Calendar, 
  Ruler, Eye, Users, Shield, CheckCircle, XCircle, TrendingUp,
  Building, Trees, Droplets, Zap, Wifi, Car, Bus, School, 
  Hospital, ShoppingCart, Plane, FileText, User, Mail, 
  MessageCircle, Navigation, Lightbulb, Wrench, Award, 
  Target, Home, Mountain, CloudRain, Sprout,
  Leaf, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type LandMedia = {
  id: string;
  original_name: string;
  file_name: string;
  url: string;
  type: string;
  file_size: number;
  is_primary: boolean;
  caption?: string;
  created_at: string;
};

type Land = {
  id: string;
  title: string;
  description: string;
  price: number;
  is_negotiable: boolean;
  status: string;
  size_value: number;
  size_unit: string;
  land_type: string;
  zoning_type: string | null;
  development_potential: string | null;
  quarter: string;
  city: string;
  region: string | null;
  country: string;
  latitude: number;
  longitude: number;
  exact_location: string | null;
  google_maps_url: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  street_name: string | null;
  neighborhood: string | null;
  road_access: string | null;
  distance_from_main_road: string;
  access_road_width: string | null;
  public_transport_access: boolean;
  nearest_bus_stop_distance: string | null;
  landmarks: string;
  distance_to_city_center: string | null;
  distance_to_schools: string | null;
  distance_to_hospitals: string | null;
  distance_to_market: string | null;
  distance_to_airport: string | null;
  topography: string;
  flood_risk: string;
  soil_type: string;
  vegetation: string;
  elevation: string | null;
  view: string | null;
  electricity_available: boolean;
  water_available: boolean;
  internet_available: boolean;
  sewage_system: boolean;
  drainage_system: boolean;
  document_type: string;
  document_number: string;
  document_status: string;
  ownership_type: string;
  is_disputed: boolean;
  dispute_details: string | null;
  ownership_duration: string | null;
  previous_owner: string | null;
  inheritance_property: boolean;
  seller_type: string;
  seller_name: string;
  seller_phone: string;
  seller_whatsapp: string;
  seller_email: string | null;
  seller_company: string | null;
  agent_name: string | null;
  agent_phone: string | null;
  agent_email: string | null;
  agency_name: string | null;
  commission_rate: string | null;
  price_per_sqm: number | null;
  original_price: number | null;
  price_reason: string | null;
  payment_plan_available: boolean;
  payment_plan_details: string | null;
  taxes_included: boolean;
  annual_property_tax: string | null;
  features: string | null;
  allowed_uses: string | null;
  restrictions: string | null;
  building_plans_approved: boolean;
  construction_allowed: boolean;
  max_floors_allowed: string | null;
  building_coverage_percentage: string | null;
  featured: boolean;
  premium_listing: boolean;
  listing_expiry_date: string | null;
  views_count: number;
  inquiries_count: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  sold_at: string | null;
  created_by: string | null;
  assigned_agent_id: string | null;
  buyer_id: string | null;
  tags: string | null;
  internal_notes: string | null;
  verification_notes: string | null;
  photos?: LandMedia[];
};

// Server-side fetch from backend API
async function getLand(id: string): Promise<Land> {
  try {
    console.log('🔄 Fetching land with ID:', id);
    
    if (!id || id === 'undefined') {
      throw new Error('Invalid land ID');
    }

    const res = await fetch(`http://localhost:4000/api/land/${id}`, { 
      cache: 'no-store'
    });
    
    console.log('📡 Response status:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ Backend error:', errorData);
      
      if (res.status === 404) {
        throw new Error(`Land not found: ${id}`);
      } else {
        throw new Error(`Failed to fetch land: ${res.status} - ${errorData.error}`);
      }
    }
    
    const data = await res.json();
    console.log('✅ Land data received:', data.id);
    
    // Fetch media for this land
    let media: LandMedia[] = [];
    try {
      console.log('🖼️ Fetching media for land:', id);
      const mediaRes = await fetch(`http://localhost:4000/api/land/${id}/media`, { 
        cache: 'no-store'
      });
      
      if (mediaRes.ok) {
        media = await mediaRes.json();
        console.log('✅ Media fetched:', media.length, 'items');
      } else {
        console.log('⚠️ Media fetch failed with status:', mediaRes.status);
      }
    } catch (mediaError) {
      console.error('❌ Failed to fetch media:', mediaError);
    }

    // Return the complete backend data
    return {
      ...data,
      photos: media
    };
    
  } catch (err: any) {
    console.error('❌ Error in getLand function:', err);
    throw err;
  }
}

// Enhanced Media Gallery Component
function MediaGallery({ media }: { media: LandMedia[] }) {
  if (!media || media.length === 0) {
    return (
      <div className="h-96 bg-linear-to-br from-amber-50/50 to-emerald-50/50 flex flex-col items-center justify-center border-2 border-dashed border-amber-200 rounded-2xl">
        <Image className="h-16 w-16 text-amber-300 mb-4" />
        <div className="text-lg text-amber-600 font-medium">No photos available</div>
        <div className="text-sm text-amber-500 mt-2">Photos will appear here once uploaded</div>
      </div>
    );
  }

  const primaryPhoto = media.find(m => m.is_primary) || media[0];
  const otherPhotos = media.filter(m => m.id !== primaryPhoto.id);

  return (
    <div className="space-y-4">
      {/* Primary/Large Photo */}
      <div className="relative h-80 bg-amber-50 rounded-xl overflow-hidden group">
        <img
          src={primaryPhoto.url}
          alt={primaryPhoto.original_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/20 to-transparent" />
        {primaryPhoto.is_primary && (
          <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
            <Star className="w-3 h-3 inline mr-1" />
            Primary
          </span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {otherPhotos.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {otherPhotos.slice(0, 4).map((photo) => (
            <div key={photo.id} className="relative h-24 bg-amber-50 rounded-lg overflow-hidden group hover:shadow-md transition-all">
              <img
                src={photo.url}
                alt={photo.original_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
          {otherPhotos.length > 4 && (
            <div className="relative h-24 bg-amber-50 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-amber-200">
              <div className="text-center">
                <div className="text-sm font-medium text-amber-600">+{otherPhotos.length - 4}</div>
                <div className="text-xs text-amber-500">more</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, label, value, color = "stone" }: {
  icon: any;
  label: string;
  value: string | boolean | number | null;
  color?: string;
}) {
  const colors = {
    stone: "bg-stone-50 text-stone-700 border-stone-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    green: "bg-green-50 text-green-700 border-green-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200"
  };

  const displayValue = value === null || value === undefined ? 'Not specified' : 
                      typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                      value.toString();

  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl transition-all hover:shadow-md`}>
      <div className={`p-3 rounded-lg ${colors[color as keyof typeof colors].split(' ')[0]} bg-opacity-50`}>
        <Icon className={`w-5 h-5 ${colors[color as keyof typeof colors]}`} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-stone-600">{label}</div>
        <div className="font-semibold text-stone-900">{displayValue}</div>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status, type = "status" }: { status: string; type?: string }) {
  const statusConfig: { [key: string]: { color: string; icon?: any } } = {
    published: { color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
    draft: { color: "bg-stone-500/20 text-stone-700 border-stone-500/30" },
    pending: { color: "bg-amber-500/20 text-amber-700 border-amber-500/30" },
    approved: { color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
    low: { color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
    medium: { color: "bg-amber-500/20 text-amber-700 border-amber-500/30" },
    high: { color: "bg-orange-500/20 text-orange-700 border-orange-500/30" },
    available: { color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
    not_available: { color: "bg-stone-500/20 text-stone-700 border-stone-500/30" },
    true: { color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30" },
    false: { color: "bg-stone-500/20 text-stone-700 border-stone-500/30" }
  };

  const config = statusConfig[status.toLowerCase()] || { color: "bg-stone-500/20 text-stone-700 border-stone-500/30" };

  return (
    <Badge variant="secondary" className={`${config.color} font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LandDetailPage({ params }: PageProps) {
  // Await the params
  const { id } = await params;
  
  console.log('🔍 Page received params ID:', id);

  if (!id) {
    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/20 to-emerald-50/20 p-8">
        <div className="container mx-auto text-center">
          <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-orange-600 mb-4">Invalid Land ID</h1>
          <p className="text-stone-600 mb-6">The land ID is missing or invalid.</p>
          <Link href="/land">
            <Button className="gap-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
              <ChevronLeft className="w-4 h-4" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  try {
    const land = await getLand(id);

    const formatCurrency = (amount: number) => {
      return `XAF ${amount.toLocaleString()}`;
    };

    const pricePerSqm = land.price_per_sqm || Math.round(land.price / land.size_value);

    // Safe tag processing
    const tagsArray = land.tags && typeof land.tags === 'string' ? land.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/20 to-emerald-50/20">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-teal-100/20 rounded-full blur-2xl" />
        </div>

        {/* Header */}
        <div className="relative z-10 border-b border-stone-200/60 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/land" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back to Properties</span>
              </Link>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 border-stone-200/60 bg-white/60 text-stone-700">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2 border-stone-200/60 bg-white/60 text-stone-700">
                  <Heart className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-8">
          {/* Property Header with Integrated Price */}
          <div className="mb-8">
            <div >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <StatusBadge status={land.status} />
                    {land.featured && (
                      <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {land.is_negotiable && (
                      <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/30">
                        Negotiable
                      </Badge>
                    )}
                    {land.premium_listing && (
                      <Badge className="bg-teal-500/20 text-teal-700 border-teal-500/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-stone-900 mb-4 leading-tight">
                    {land.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-stone-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium">{land.quarter}, {land.city}, {land.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{land.views_count} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{land.inquiries_count} inquiries</span>
                    </div>
                  </div>

                  {/* Price Section Integrated into Header */}
                  <div className="flex items-center gap-6 mb-4 p-4 bg-linear-to-r from-amber-50/50 to-emerald-50/50 rounded-xl border border-amber-200/50">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(land.price)}
                      </div>
                      <div className="text-sm text-stone-600">
                        {pricePerSqm.toLocaleString()} XAF per sqm
                      </div>
                    </div>
                    <div className="h-12 w-px bg-stone-300"></div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-stone-900">{land.size_value.toLocaleString()}</div>
                        <div className="text-stone-600">{land.size_unit}</div>
                      </div>
                      <div className="h-8 w-px bg-stone-300"></div>
                      <div className="text-center">
                        <div className="font-semibold text-stone-900">{land.land_type}</div>
                        <div className="text-stone-600">Land Type</div>
                      </div>
                      {land.payment_plan_available && (
                        <>
                          <div className="h-8 w-px bg-stone-300"></div>
                          <div className="text-center">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                              Payment Plan
                            </Badge>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {land.description && (
                    <p className="text-sm text-stone-700 leading-relaxed max-w-4xl bg-white/50 p-1">
                      {land.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Media & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Media Gallery */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Image className="w-5 h-5 text-emerald-600" />
                    Property Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MediaGallery media={land.photos || []} />
                </CardContent>
              </Card>

              {/* Location & Map */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-64 bg-amber-50 rounded-xl overflow-hidden border border-stone-200/60">
                    {land.latitude && land.longitude ? (
                      <iframe
                        src={`https://www.google.com/maps?q=${land.latitude},${land.longitude}&z=15&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        title="Property Location"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-stone-400">
                        <MapPin className="w-8 h-8 mb-2" />
                        <div>Location coordinates not available</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard icon={Car} label="Distance from Main Road" value={land.distance_from_main_road} color="stone" />
                    <FeatureCard icon={Bus} label="Public Transport Access" value={land.public_transport_access} color={land.public_transport_access ? "emerald" : "stone"} />
                    <FeatureCard icon={ShoppingCart} label="Distance to Market" value={land.distance_to_market} color="teal" />
                    <FeatureCard icon={Hospital} label="Distance to Hospitals" value={land.distance_to_hospitals} color="orange" />
                    <FeatureCard icon={School} label="Distance to Schools" value={land.distance_to_schools} color="amber" />
                    <FeatureCard icon={Plane} label="Distance to Airport" value={land.distance_to_airport} color="stone" />
                  </div>

                  {land.landmarks && (
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200/50">
                      <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Nearby Landmarks
                      </h4>
                      <p className="text-stone-700">{land.landmarks}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Physical Characteristics */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Mountain className="w-5 h-5 text-emerald-600" />
                    Physical Characteristics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FeatureCard icon={Mountain} label="Topography" value={land.topography} color="stone" />
                    <FeatureCard icon={Sprout} label="Soil Type" value={land.soil_type} color="amber" />
                    <FeatureCard icon={Trees} label="Vegetation" value={land.vegetation} color="emerald" />
                    <FeatureCard icon={CloudRain} label="Flood Risk" value={land.flood_risk} color={land.flood_risk === 'low' ? 'emerald' : 'orange'} />
                    <FeatureCard icon={TrendingUp} label="Elevation" value={land.elevation} color="teal" />
                    <FeatureCard icon={Home} label="View" value={land.view} color="stone" />
                  </div>
                </CardContent>
              </Card>

              {/* Infrastructure & Utilities */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Wrench className="w-5 h-5 text-emerald-600" />
                    Infrastructure & Utilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FeatureCard icon={Zap} label="Electricity" value={land.electricity_available} color={land.electricity_available ? "emerald" : "stone"} />
                    <FeatureCard icon={Droplets} label="Water Supply" value={land.water_available} color={land.water_available ? "emerald" : "stone"} />
                    <FeatureCard icon={Wifi} label="Internet" value={land.internet_available} color={land.internet_available ? "emerald" : "stone"} />
                    <FeatureCard icon={Building} label="Sewage System" value={land.sewage_system} color={land.sewage_system ? "emerald" : "stone"} />
                    <FeatureCard icon={Building} label="Drainage System" value={land.drainage_system} color={land.drainage_system ? "emerald" : "stone"} />
                    <FeatureCard icon={Car} label="Access Road Width" value={land.access_road_width} color="stone" />
                  </div>
                </CardContent>
              </Card>

              {/* Legal & Documents */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Legal & Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200/60">
                    <div>
                      <div className="font-semibold text-stone-900">Document Verification</div>
                      <div className="text-sm text-stone-600">{land.document_status}</div>
                    </div>
                    <StatusBadge status={land.document_status} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FeatureCard icon={FileText} label="Document Type" value={land.document_type} color="stone" />
                      <FeatureCard icon={FileText} label="Document Number" value={land.document_number} color="teal" />
                      <FeatureCard icon={User} label="Ownership Type" value={land.ownership_type} color="emerald" />
                    </div>
                    
                    <div className="space-y-4">
                      <FeatureCard icon={AlertTriangle} label="Dispute Status" value={land.is_disputed} color={land.is_disputed ? "orange" : "emerald"} />
                      <FeatureCard icon={User} label="Previous Owner" value={land.previous_owner} color="amber" />
                      <FeatureCard icon={Shield} label="Inheritance Property" value={land.inheritance_property} color={land.inheritance_property ? "emerald" : "stone"} />
                    </div>
                  </div>

                  {land.dispute_details && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Dispute Details
                      </h4>
                      <p className="text-orange-700">{land.dispute_details}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Development Potential */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Building className="w-5 h-5 text-emerald-600" />
                    Development Potential
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FeatureCard icon={Target} label="Zoning Type" value={land.zoning_type} color="stone" />
                      <FeatureCard icon={FileText} label="Building Plans Approved" value={land.building_plans_approved} color={land.building_plans_approved ? "emerald" : "stone"} />
                      <FeatureCard icon={CheckCircle} label="Construction Allowed" value={land.construction_allowed} color={land.construction_allowed ? "emerald" : "stone"} />
                    </div>
                    
                    <div className="space-y-4">
                      <FeatureCard icon={Building} label="Max Floors Allowed" value={land.max_floors_allowed} color="teal" />
                      <FeatureCard icon={Ruler} label="Building Coverage" value={land.building_coverage_percentage ? `${land.building_coverage_percentage}%` : null} color="amber" />
                      <FeatureCard icon={Award} label="Featured Listing" value={land.featured} color={land.featured ? "emerald" : "stone"} />
                    </div>
                  </div>

                  {land.development_potential && (
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h4 className="font-semibold text-teal-800 mb-2">Development Potential</h4>
                      <p className="text-teal-700">{land.development_potential}</p>
                    </div>
                  )}

                  {land.allowed_uses && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">Allowed Uses</h4>
                      <p className="text-emerald-700">{land.allowed_uses}</p>
                    </div>
                  )}

                  {land.restrictions && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Restrictions</h4>
                      <p className="text-amber-700">{land.restrictions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Seller Information */}
            <Card className="border border-stone-200/70 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
  <CardHeader className="pb-3">
    <CardTitle className="flex items-center gap-2 text-stone-900 text-base font-semibold">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
        <User className="w-4 h-4 text-emerald-600" />
      </span>
      <span>Seller Information</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-5">
    {/* Seller Avatar + Basic Info */}
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-semibold text-lg shadow-md ring-2 ring-emerald-100">
        {land.seller_name?.[0]?.toUpperCase() ||
          land.seller_type?.[0]?.toUpperCase() ||
          "S"}
      </div>

      <div className="font-semibold text-stone-900">
        {land.seller_name || "Not specified"}
      </div>

      <div className="mt-1 flex items-center justify-center gap-2">
        {land.seller_type && (
          <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 capitalize">
            {land.seller_type}
          </span>
        )}
        {land.seller_company && (
          <span className="text-xs text-stone-500 truncate max-w-40">
            {land.seller_company}
          </span>
        )}
      </div>
    </div>

    {/* Contact Actions */}
    <div className="space-y-3">
      {/* Call Button */}
      {land.seller_phone && (
        <Button
          className="w-full gap-2 py-3 text-white font-medium rounded-xl
                     bg-linear-to-r from-emerald-600 to-green-600 
                     hover:from-emerald-700 hover:to-green-700 
                     shadow-sm hover:shadow transition-all"
        >
          <Phone className="w-4 h-4" />
          Call {land.seller_phone}
        </Button>
      )}

      {/* WhatsApp Button */}
      {land.seller_whatsapp && (
        <Button
          variant="outline"
          className="w-full gap-2 py-3 font-medium rounded-xl
                     border-stone-200 bg-white/70 backdrop-blur-sm 
                     text-stone-700 hover:bg-white 
                     hover:border-stone-300 transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-green-600" />
          WhatsApp {land.seller_whatsapp}
        </Button>
      )}

      {/* Email Button */}
      {land.seller_email && (
        <Button
          variant="outline"
          className="w-full gap-2 py-3 font-medium rounded-xl
                     border-stone-200 bg-white/70 backdrop-blur-sm 
                     text-stone-700 hover:bg-white 
                     hover:border-stone-300 transition-all shadow-sm"
        >
          <Mail className="w-4 h-4 text-emerald-600" />
          Email Seller
        </Button>
      )}
    </div>

    {/* Agent Information */}
    {(land.agent_name || land.agency_name) && (
      <div className="pt-4 border-t border-stone-200/70">
        <h4 className="font-semibold text-sm text-stone-900 mb-1.5">
          Agent Details
        </h4>
        <div className="space-y-1 text-sm text-stone-600">
          {land.agent_name && <div>Agent: {land.agent_name}</div>}
          {land.agency_name && <div>Agency: {land.agency_name}</div>}
          {land.commission_rate && (
            <div>Commission: {land.commission_rate}</div>
          )}
        </div>
      </div>
    )}
  </CardContent>
</Card>


              {/* Quick Facts */}
              <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FeatureCard icon={Calendar} label="Listed Date" value={new Date(land.created_at).toLocaleDateString()} color="stone" />
                  <FeatureCard icon={Clock} label="Last Updated" value={new Date(land.updated_at).toLocaleDateString()} color="teal" />
                  <FeatureCard icon={Ruler} label="Land Type" value={land.land_type} color="emerald" />
                  <FeatureCard icon={Target} label="Property ID" value={land.id.slice(0, 8)} color="amber" />
                  
                  {/* Safe tags display */}
                  {tagsArray.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-stone-600 mb-2">Tags</div>
                      <div className="flex flex-wrap gap-1">
                        {tagsArray.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-stone-500/10 text-stone-600 border-stone-500/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Facts */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                    <div>
                      <div className="text-sm text-stone-600">Negotiable</div>
                      <StatusBadge status={land.is_negotiable.toString()} />
                    </div>
                    <div>
                      <div className="text-sm text-stone-600">Taxes Included</div>
                      <StatusBadge status={land.taxes_included.toString()} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );

  } catch (error: any) {
    console.error('❌ Error rendering land page:', error);
    
    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/20 to-emerald-50/20 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Error Loading Property</h1>
          <p className="text-stone-600 mb-6">{error.message}</p>
          <Link href="/land">
            <Button className="gap-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 p-2">
              <ChevronLeft className="w-4 h-4 text-white" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}