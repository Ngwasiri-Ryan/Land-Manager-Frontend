import Link from 'next/link';
import { MapPin, Phone, Globe, DownloadCloud, Image, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  location: string;
  quarter?: string;
  size?: string;
  price?: string;
  landType?: string;
  roadAccess?: string;
  distanceToRoad?: string;
  landmarks?: string[];
  electricity?: string;
  water?: string;
  documentType?: string;
  documentStatus?: string;
  ownership?: string;
  disputes?: string | null;
  surveyPlanUrl?: string;
  slope?: string;
  soil?: string;
  vegetation?: string;
  floodRisk?: string;
  view?: string;
  coordinates?: { lat: number; lng: number } | null;
  zoning?: string;
  nearbyDevelopments?: string[];
  buildingPermitsAvailable?: boolean;
  photos?: LandMedia[];
  seller?: { name: string; type: string; phone?: string; whatsapp?: string; verified?: boolean };
  transactionNotes?: string;
  riskRating?: 'Low' | 'Moderate' | 'High';
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

    // Map backend fields to frontend view model
    return {
      id: data.id,
      title: data.title,
      location: `${data.quarter || ''}, ${data.city || ''}`,
      quarter: data.quarter,
      size: data.size_value ? `${data.size_value} ${data.size_unit || 'sqm'}` : undefined,
      price: data.price ? `XAF ${data.price.toLocaleString()}` : undefined,
      landType: data.land_type,
      roadAccess: data.road_access,
      distanceToRoad: data.distance_from_main_road,
      landmarks: data.landmarks ? (typeof data.landmarks === 'string' ? [data.landmarks] : data.landmarks) : [],
      electricity: data.electricity_available ? 'Available' : 'Not specified',
      water: data.water_available ? 'Available' : 'Not specified',
      documentType: data.document_type,
      documentStatus: data.document_status,
      ownership: data.ownership_type,
      disputes: data.is_disputed ? data.dispute_details : null,
      surveyPlanUrl: undefined,
      slope: data.topography,
      soil: data.soil_type,
      vegetation: data.vegetation,
      floodRisk: data.flood_risk,
      view: undefined,
      coordinates: data.latitude && data.longitude ? { lat: Number(data.latitude), lng: Number(data.longitude) } : null,
      zoning: data.zoning_type,
      nearbyDevelopments: [],
      buildingPermitsAvailable: data.construction_allowed,
      photos: media,
      seller: { 
        name: data.seller_name || '', 
        type: data.seller_type || '', 
        phone: data.seller_phone || '', 
        whatsapp: data.seller_whatsapp || '', 
        verified: false 
      },
      transactionNotes: undefined,
      riskRating: 'Low'
    };
    
  } catch (err: any) {
    console.error('❌ Error in getLand function:', err);
    throw err;
  }
}

// Media Gallery Component
function MediaGallery({ media }: { media: LandMedia[] }) {
  if (!media || media.length === 0) {
    return (
      <div className="h-64 bg-gray-100 flex flex-col items-center justify-center border border-gray-200 rounded-lg">
        <Image className="h-12 w-12 text-gray-300 mb-2" />
        <div className="text-sm text-gray-400">No photos available</div>
      </div>
    );
  }

  const primaryPhoto = media.find(m => m.is_primary) || media[0];
  const otherPhotos = media.filter(m => m.id !== primaryPhoto.id);

  return (
    <div className="space-y-2">
      {/* Primary/Large Photo */}
      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={primaryPhoto.url}
          alt={primaryPhoto.original_name}
          className="w-full h-full object-cover"
        />
        {primaryPhoto.is_primary && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Primary
          </span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {otherPhotos.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {otherPhotos.slice(0, 4).map((photo) => (
            <div key={photo.id} className="relative h-20 bg-gray-100 rounded overflow-hidden">
              <img
                src={photo.url}
                alt={photo.original_name}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
          {otherPhotos.length > 4 && (
            <div className="relative h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              <div className="text-xs text-gray-600 text-center">
                +{otherPhotos.length - 4} more
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Add this interface for the props
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LandDetailPage({ params }: PageProps) {
  // Await the params
  const { id } = await params;
  
  console.log('🔍 Page received params ID:', id);

  if (!id) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 via-white to-green-50/30">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Land ID</h1>
          <p className="text-gray-600 mb-4">The land ID is missing or invalid.</p>
          <Link href="/land" className="text-emerald-700 hover:underline">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  try {
    const land = await getLand(id);

    return (
      <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 via-white to-green-50/30">
        <div className="container mx-auto">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{land.title}</h1>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                {land.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold">{land.size}</span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold">{land.price}</span>
                <span className="px-3 py-1 rounded-full bg-white/60 text-gray-800 text-sm font-semibold border border-gray-200">{land.landType}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Photos & map */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Property Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <MediaGallery media={land.photos || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-50">
                    {land.coordinates ? (
                      <a
                        href={`https://www.google.com/maps?q=${land.coordinates.lat},${land.coordinates.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full h-full"
                      >
                        <iframe
                          src={`https://www.google.com/maps?q=${land.coordinates.lat},${land.coordinates.lng}&output=embed`}
                          className="w-full h-full"
                          loading="lazy"
                          title="map"
                        />
                      </a>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        No coordinates available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* ... rest of your card components ... */}
              <Card>
                <CardHeader>
                  <CardTitle>Topography & Physical Characteristics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Slope</div>
                      <div className="font-medium text-gray-900">{land.slope || 'Not specified'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Soil</div>
                      <div className="font-medium text-gray-900">{land.soil || 'Not specified'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Vegetation</div>
                      <div className="font-medium text-gray-900">{land.vegetation || 'Not specified'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Flood risk</div>
                      <div className="font-medium text-gray-900">{land.floodRisk || 'Not specified'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Development & Zoning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-gray-600">Zoning</div>
                      <div className="font-medium text-gray-900">{land.zoning || 'Not specified'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Nearby developments</div>
                      <ul className="list-disc ml-5 text-gray-800">
                        {(land.nearbyDevelopments || []).length > 0 ? (
                          land.nearbyDevelopments!.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))
                        ) : (
                          <li className="text-gray-500">No nearby developments specified</li>
                        )}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Building permits available</div>
                        <div className="font-medium text-gray-900">{land.buildingPermitsAvailable ? 'Yes' : 'No'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Risk rating</div>
                        <div className={`font-bold ${land.riskRating === 'High' ? 'text-red-600' : land.riskRating === 'Moderate' ? 'text-amber-600' : 'text-green-600'}`}>
                          {land.riskRating}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Details, docs, seller, transaction */}
            <aside className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility & Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><strong>Road access:</strong> {land.roadAccess || 'Not specified'}</div>
                    <div><strong>Distance to main road:</strong> {land.distanceToRoad || 'Not specified'}</div>
                    <div><strong>Nearby landmarks:</strong> {(land.landmarks || []).join(', ') || 'None specified'}</div>
                    <div><strong>Electricity:</strong> {land.electricity}</div>
                    <div><strong>Water:</strong> {land.water}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal & Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><strong>Document type:</strong> {land.documentType || 'Not specified'}</div>
                    <div><strong>Document status:</strong> {land.documentStatus || 'Not specified'}</div>
                    <div><strong>Ownership:</strong> {land.ownership || 'Not specified'}</div>
                    <div><strong>Disputes:</strong> {land.disputes || 'No known disputes'}</div>
                    {land.surveyPlanUrl ? (
                      <div className="mt-2">
                        <a href={land.surveyPlanUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-700">
                          <DownloadCloud className="h-4 w-4" /> Download survey plan
                        </a>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seller / Dealer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold">{land.seller?.name || 'Not specified'}</div>
                    <div className="text-sm text-gray-600">{land.seller?.type}</div>
                    <div className="flex gap-2 mt-3">
                      <Button asChild>
                        <a href={`tel:${land.seller?.phone}`} className="flex items-center gap-2">
                          <Phone className="h-4 w-4" /> Call
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a 
                          href={`https://wa.me/${(land.seller?.whatsapp || '').replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" /> WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction & Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-700">
                    <div><strong>Required documents:</strong> ID, proof of funds, signed sales agreement</div>
                    <div className="mt-2"><strong>Deposit policy:</strong> 10% deposit to secure (example)</div>
                    <div className="mt-2"><strong>Commission:</strong> 3% (agent)</div>
                    <div className="mt-2"><strong>Notes:</strong> {land.transactionNotes || 'No additional notes'}</div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-sm text-gray-500">
                <Link href="/land" className="inline-flex items-center gap-2 text-emerald-700">
                  ← Back to listings
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );

  } catch (error: any) {
    console.error('❌ Error rendering land page:', error);
    
    return (
      <div className="min-h-screen p-8 bg-gradient-to-r from-gray-50 via-white to-green-50/30">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Land</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link href="/land" className="text-emerald-700 hover:underline">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }
}