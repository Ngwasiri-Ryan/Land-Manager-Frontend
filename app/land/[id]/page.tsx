import Link from 'next/link';
import { MapPin, Phone, Globe, DownloadCloud, Image, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
	photos?: string[];
	seller?: { name: string; type: string; phone?: string; whatsapp?: string; verified?: boolean };
	transactionNotes?: string;
	riskRating?: 'Low' | 'Moderate' | 'High';
};

// Server-side fetch from backend API
async function getLand(id: string): Promise<Land> {
	const res = await fetch(`http://localhost:4000/api/land/${id}`, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error(`Failed to fetch land: ${res.status}`);
	}
	const data = await res.json();
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
		electricity: data.has_electricity ? 'Available' : 'Not specified',
		water: data.has_water_utility ? 'Available' : 'Not specified',
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
		buildingPermitsAvailable: false,
		photos: [],
		seller: { name: data.seller_name || '', type: data.seller_type || '', phone: data.seller_phone || '', whatsapp: data.seller_whatsapp || '', verified: false },
		transactionNotes: undefined,
		riskRating: 'Low'
	};
}

export default async function LandDetailPage({ params }: { params: { id: string } }) {
	const land = await getLand(params.id);

	return (
		<div className="min-h-screen p-8  bg-linear-to-r from-gray-50 via-white to-green-50/30 px-8">
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
							<CardContent className="p-0">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<div className="h-64 bg-gray-100 flex items-center justify-center border-r border-b border-gray-200">
										<Image className="h-8 w-8 text-gray-300" />
										<div className="text-sm text-gray-400 ml-2">Photos not available</div>
									</div>
									<div className="h-64 bg-gray-50 border-b border-gray-200">
										{land.coordinates ? (
											// Simple clickable Google Maps preview
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
											<div className="h-full flex items-center justify-center text-gray-400">No coordinates</div>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Topography & Physical Characteristics</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<div className="text-sm text-gray-600">Slope</div>
										<div className="font-medium text-gray-900">{land.slope}</div>
									</div>
									<div>
										<div className="text-sm text-gray-600">Soil</div>
										<div className="font-medium text-gray-900">{land.soil}</div>
									</div>
									<div>
										<div className="text-sm text-gray-600">Vegetation</div>
										<div className="font-medium text-gray-900">{land.vegetation}</div>
									</div>
									<div>
										<div className="text-sm text-gray-600">Flood risk</div>
										<div className="font-medium text-gray-900">{land.floodRisk}</div>
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
										<div className="font-medium text-gray-900">{land.zoning}</div>
									</div>
									<div>
										<div className="text-sm text-gray-600">Nearby developments</div>
										<ul className="list-disc ml-5 text-gray-800">
											{(land.nearbyDevelopments || []).map((d, i) => (
												<li key={i}>{d}</li>
											))}
										</ul>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<div className="text-sm text-gray-600">Building permits available</div>
											<div className="font-medium text-gray-900">{land.buildingPermitsAvailable ? 'Yes' : 'No'}</div>
										</div>
										<div className="text-right">
											<div className="text-sm text-gray-600">Risk rating</div>
											<div className={`font-bold ${land.riskRating === 'High' ? 'text-red-600' : land.riskRating === 'Moderate' ? 'text-amber-600' : 'text-green-600'}`}>{land.riskRating}</div>
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
									<div><strong>Road access:</strong> {land.roadAccess}</div>
									<div><strong>Distance to main road:</strong> {land.distanceToRoad}</div>
									<div><strong>Nearby landmarks:</strong> {(land.landmarks || []).join(', ')}</div>
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
									<div><strong>Document type:</strong> {land.documentType}</div>
									<div><strong>Document status:</strong> {land.documentStatus}</div>
									<div><strong>Ownership:</strong> {land.ownership}</div>
									<div><strong>Disputes:</strong> {land.disputes ?? 'No known disputes'}</div>
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
									<div className="font-semibold">{land.seller?.name}</div>
									<div className="text-sm text-gray-600">{land.seller?.type}</div>
									<div className="flex gap-2 mt-3">
										<Button asChild>
											<a href={`tel:${land.seller?.phone}`} className="flex items-center gap-2"><Phone className="h-4 w-4" /> Call</a>
										</Button>
										<Button asChild variant="outline">
											<a href={`https://wa.me/${(land.seller?.whatsapp || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp</a>
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
									<div className="mt-2"><strong>Notes:</strong> {land.transactionNotes}</div>
								</div>
							</CardContent>
						</Card>

						<div className="text-sm text-gray-500">
							<Link href="/land" className="inline-flex items-center gap-2 text-emerald-700">← Back to listings</Link>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}

