"use client";

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, MapPin, FileText, Mountain, Users, Eye, CheckCircle, Camera, AlertTriangle, Star, Shield, Globe, Zap, Droplets, Trees, Home, Wifi, Wrench, Building, CreditCard, Tag, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotify } from '@/components/ui/notify'

const steps = [
  { id: 'basic', label: 'Basic Details', description: 'Title, size, type, price', icon: FileText },
  { id: 'location', label: 'Location', description: 'Area, coordinates, landmarks', icon: MapPin },
  { id: 'legal', label: 'Legal Status', description: 'Documents, ownership, disputes', icon: Shield },
  { id: 'physical', label: 'Physical', description: 'Topography, soil, vegetation', icon: Mountain },
  { id: 'utilities', label: 'Utilities & Features', description: 'Amenities and infrastructure', icon: Wifi },
  { id: 'media', label: 'Media', description: 'Photos & videos', icon: Camera },
  { id: 'seller', label: 'Seller Info', description: 'Contact, verification', icon: Users },
  { id: 'review', label: 'Review & Save', description: 'Final check', icon: Eye },
];

  const notify = useNotify()

const iconComponents = {
  FileText,
  MapPin,
  Shield,
  Mountain,
  Wifi,
  Camera,
  Users,
  Eye
};

type LandFormData = {
  // Step 1: Basic
  title: string;
  size: string;
  type: string;
  price: string;
  negotiable: boolean;
  description: string;

  // Step 2: Location
  quarter: string;
  city: string;
  region: string;
  latitude: string;
  longitude: string;
  distanceToRoad: string;
  accessRoadWidth: string;
  landmarks: string;
  exactLocation: string;
  googleMapsUrl: string;
  addressLine1: string;
  addressLine2: string;
  streetName: string;
  neighborhood: string;

  // Step 3: Legal
  documentType: string;
  documentNumber: string;
  verificationStatus: string;
  ownershipType: string;
  hasDisputes: boolean;
  disputeDetails: string;
  ownershipDuration: string;
  previousOwner: string;
  inheritanceProperty: boolean;

  // Step 4: Physical
  topography: string;
  floodRisk: string;
  soilType: string;
  vegetation: string;
  elevation: string;
  view: string;
  zoningType: string;
  developmentPotential: string;

  // Step 5: Utilities & Features
  roadAccess: string;
  publicTransportAccess: boolean;
  nearestBusStopDistance: string;
  electricityAvailable: boolean;
  waterAvailable: boolean;
  internetAvailable: boolean;
  sewageSystem: boolean;
  drainageSystem: boolean;
  constructionAllowed: boolean;
  buildingPlansApproved: boolean;
  maxFloorsAllowed: string;
  buildingCoveragePercentage: string;
  features: string[];
  allowedUses: string[];
  restrictions: string;

  // Step 6: Media
  photos: File[];

  // Step 7: Seller
  sellerType: string;
  sellerName: string;
  phone: string;
  whatsapp: string;
  sellerEmail: string;
  sellerCompany: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agencyName: string;
  commissionRate: string;
  verified: boolean;

  // Financial
  pricePerSqm: string;
  originalPrice: string;
  priceReason: string;
  paymentPlanAvailable: boolean;
  paymentPlanDetails: string;
  taxesIncluded: boolean;
  annualPropertyTax: string;

  // Marketing
  featured: boolean;
  premiumListing: boolean;
  listingExpiryDate: string;
  tags: string[];
};


  // Fixed Input Component
  const InputField = ({ label, type = "text", placeholder, value, onChange, icon: Icon, required = false, ...props }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-green-600" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-green-400"
          required={required}
          {...props}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </div>
  );

  const SelectField = ({ label, value, onChange, options, icon: Icon, required = false, ...props }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-green-600" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none group-hover:border-green-400"
          required={required}
          {...props}
        >
          {options.map((option: string) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45" />
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </div>
  );

  const TextAreaField = ({ label, placeholder, value, onChange, rows = 3, icon: Icon, ...props }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-green-600" />}
        {label}
      </label>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none group-hover:border-green-400"
          {...props}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </div>
  );

  const CheckboxField = ({ label, checked, onChange, ...props }: any) => (
    <label className="flex items-center gap-3 group cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded border-2 border-gray-300 text-green-500 focus:ring-3 focus:ring-green-500/20 transition-all duration-300 group-hover:border-green-400"
          {...props}
        />
        {checked && (
          <CheckCircle className="w-5 h-5 absolute top-0 left-0 text-green-500 animate-in zoom-in duration-200" />
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );

  const MultiSelectField = ({ label, values, onChange, options, icon: Icon }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-green-600" />}
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option: string) => (
          <CheckboxField
            key={option}
            label={option}
            checked={values.includes(option)}
            onChange={(checked: boolean) => {
              if (checked) {
                onChange([...values, option]);
              } else {
                onChange(values.filter((v: string) => v !== option));
              }
            }}
          />
        ))}
      </div>
    </div>
  );


export default function EditLandPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<LandFormData>({
    // Step 1: Basic
    title: '',
    size: '',
    type: 'Residential',
    price: '',
    negotiable: false,
    description: '',

    // Step 2: Location
    quarter: '',
    city: 'Buea',
    region: 'Southwest',
    latitude: '',
    longitude: '',
    distanceToRoad: '',
    accessRoadWidth: '',
    landmarks: '',
    exactLocation: '',
    googleMapsUrl: '',
    addressLine1: '',
    addressLine2: '',
    streetName: '',
    neighborhood: '',

    // Step 3: Legal
    documentType: 'Layout plan',
    documentNumber: '',
    verificationStatus: 'Pending',
    ownershipType: 'Individual',
    hasDisputes: false,
    disputeDetails: '',
    ownershipDuration: '',
    previousOwner: '',
    inheritanceProperty: false,

    // Step 4: Physical
    topography: 'Flat',
    floodRisk: 'Low',
    soilType: 'Volcanic',
    vegetation: 'Cleared',
    elevation: '',
    view: '',
    zoningType: 'Residential',
    developmentPotential: 'Medium',

    // Step 5: Utilities & Features
    roadAccess: 'gravel',
    publicTransportAccess: false,
    nearestBusStopDistance: '',
    electricityAvailable: false,
    waterAvailable: false,
    internetAvailable: false,
    sewageSystem: false,
    drainageSystem: false,
    constructionAllowed: true,
    buildingPlansApproved: false,
    maxFloorsAllowed: '2',
    buildingCoveragePercentage: '60',
    features: [],
    allowedUses: [],
    restrictions: '',

    // Step 6: Media
    photos: [],
     video: any,

    // Step 7: Seller
    sellerType: 'Agent',
    sellerName: '',
    phone: '',
    whatsapp: '',
    sellerEmail: '',
    sellerCompany: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    agencyName: '',
    commissionRate: '',
    verified: false,

    // Financial
    pricePerSqm: '',
    originalPrice: '',
    priceReason: '',
    paymentPlanAvailable: false,
    paymentPlanDetails: '',
    taxesIncluded: false,
    annualPropertyTax: '',

    // Marketing
    featured: false,
    premiumListing: false,
    listingExpiryDate: '',
    tags: [],
  });

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      video: file
    }));
  }
};

const removeVideo = () => {
  setFormData(prev => ({
    ...prev,
    video: undefined
  }));
};

  const handleInputChange = (field: keyof LandFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    let mounted = true;
    const fetchLand = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/land/${id}`, { 
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) throw new Error(`Failed to fetch land: ${res.status}`);
        const d = await res.json();
        
        if (!mounted) return;
        
        // Map backend data to form fields
        setFormData({
          // Step 1: Basic
          title: d.title || '',
          size: d.size_value ? `${d.size_value} ${d.size_unit || 'sqm'}` : '',
          type: d.land_type ? d.land_type.charAt(0).toUpperCase() + d.land_type.slice(1) : 'Residential',
          price: d.price ? String(d.price) : '',
          negotiable: !!d.is_negotiable,
          description: d.description || '',

          // Step 2: Location
          quarter: d.quarter || '',
          city: d.city || 'Buea',
          region: d.region || 'Southwest',
          latitude: d.latitude ? String(d.latitude) : '',
          longitude: d.longitude ? String(d.longitude) : '',
          distanceToRoad: d.distance_from_main_road || '',
          accessRoadWidth: d.access_road_width || '',
          landmarks: d.landmarks || '',
          exactLocation: d.exact_location || '',
          googleMapsUrl: d.google_maps_url || '',
          addressLine1: d.address_line_1 || '',
          addressLine2: d.address_line_2 || '',
          streetName: d.street_name || '',
          neighborhood: d.neighborhood || '',

          // Step 3: Legal
          documentType: d.document_type ? d.document_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Layout plan',
          documentNumber: d.document_number || '',
          verificationStatus: d.document_status ? d.document_status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Pending',
          ownershipType: d.ownership_type ? d.ownership_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Individual',
          hasDisputes: !!d.is_disputed,
          disputeDetails: d.dispute_details || '',
          ownershipDuration: d.ownership_duration || '',
          previousOwner: d.previous_owner || '',
          inheritanceProperty: !!d.inheritance_property,

          // Step 4: Physical
          topography: d.topography ? d.topography.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Flat',
          floodRisk: d.flood_risk ? d.flood_risk.charAt(0).toUpperCase() + d.flood_risk.slice(1) : 'Low',
          soilType: d.soil_type ? d.soil_type.charAt(0).toUpperCase() + d.soil_type.slice(1) : 'Volcanic',
          vegetation: d.vegetation ? d.vegetation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Cleared',
          elevation: d.elevation || '',
          view: d.view || '',
          zoningType: d.zoning_type || 'Residential',
          developmentPotential: d.development_potential || 'Medium',

          // Step 5: Utilities & Features
          roadAccess: d.road_access || 'gravel',
          publicTransportAccess: !!d.public_transport_access,
          nearestBusStopDistance: d.nearest_bus_stop_distance || '',
          electricityAvailable: !!d.electricity_available,
          waterAvailable: !!d.water_available,
          internetAvailable: !!d.internet_available,
          sewageSystem: !!d.sewage_system,
          drainageSystem: !!d.drainage_system,
          constructionAllowed: !!d.construction_allowed,
          buildingPlansApproved: !!d.building_plans_approved,
          maxFloorsAllowed: d.max_floors_allowed ? String(d.max_floors_allowed) : '2',
          buildingCoveragePercentage: d.building_coverage_percentage ? String(d.building_coverage_percentage) : '60',
          features: Array.isArray(d.features) ? d.features : [],
          allowedUses: Array.isArray(d.allowed_uses) ? d.allowed_uses : [],
          restrictions: d.restrictions || '',

          // Step 6: Media
          photos: [],

          // Step 7: Seller
          sellerType: d.seller_type ? d.seller_type.charAt(0).toUpperCase() + d.seller_type.slice(1) : 'Agent',
          sellerName: d.seller_name || '',
          phone: d.seller_phone || '',
          whatsapp: d.seller_whatsapp || '',
          sellerEmail: d.seller_email || '',
          sellerCompany: d.seller_company || '',
          agentName: d.agent_name || '',
          agentPhone: d.agent_phone || '',
          agentEmail: d.agent_email || '',
          agencyName: d.agency_name || '',
          commissionRate: d.commission_rate ? String(d.commission_rate) : '',
          verified: !!d.verified,

          // Financial
          pricePerSqm: d.price_per_sqm ? String(d.price_per_sqm) : '',
          originalPrice: d.original_price ? String(d.original_price) : '',
          priceReason: d.price_reason || '',
          paymentPlanAvailable: !!d.payment_plan_available,
          paymentPlanDetails: d.payment_plan_details || '',
          taxesIncluded: !!d.taxes_included,
          annualPropertyTax: d.annual_property_tax ? String(d.annual_property_tax) : '',

          // Marketing
          featured: !!d.featured,
          premiumListing: !!d.premium_listing,
          listingExpiryDate: d.listing_expiry_date || '',
          tags: Array.isArray(d.tags) ? d.tags : [],
        });
      } catch (err) {
        console.error('Error loading land:', err);
        alert('Failed to load land data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchLand();
    }
    
    return () => { 
      mounted = false; 
    };
  }, [id]);

  const parseSize = (sizeStr: string) => {
    if (!sizeStr) return { value: 0, unit: 'sqm' };
    const numMatch = sizeStr.replace(/,/g, '').match(/([0-9]+(\.[0-9]+)?)/);
    const value = numMatch ? parseFloat(numMatch[0]) : 0;
    const lower = sizeStr.toLowerCase();
    let unit: string = 'sqm';
    if (lower.includes('ha') || lower.includes('hect')) unit = 'hectare';
    else if (lower.includes('plot')) unit = 'plot';
    else if (lower.includes('m') || lower.includes('sqm') || lower.includes('m²')) unit = 'sqm';
    return { value, unit };
  };
  const handleSave = async () => {
  setIsSubmitting(true);
  try {
    console.log('=== STARTING UPDATE PROCESS ===');
    console.log('Raw form data:', formData);

    // Map frontend fields to backend schema
    const parseSize = (sizeStr: string) => {
      if (!sizeStr) return { value: 0, unit: 'sqm' };
      const numMatch = sizeStr.replace(/,/g, '').match(/([0-9]+(\.[0-9]+)?)/);
      const value = numMatch ? parseFloat(numMatch[0]) : 0;
      const lower = sizeStr.toLowerCase();
      let unit: string = 'sqm';
      if (lower.includes('ha') || lower.includes('hect')) unit = 'hectare';
      else if (lower.includes('plot')) unit = 'plot';
      else if (lower.includes('m') || lower.includes('sqm') || lower.includes('m²')) unit = 'sqm';
      return { value, unit };
    };

    const mapOption = (value: string | undefined, mapping: Record<string, string>) => {
      if (!value) return undefined;
      const key = value.toString().trim().toLowerCase();
      return mapping[key] || key;
    };

    const size = parseSize(formData.size);
    console.log('Parsed size:', size);

    const landTypeMap: Record<string, string> = {
      residential: 'residential',
      commercial: 'commercial',
      'mixed-use': 'mixed',
      mixed: 'mixed',
      agricultural: 'agricultural',
      industrial: 'industrial',
      recreational: 'recreational'
    };

    const docTypeMap: Record<string, string> = {
      'layout plan': 'layout_plan',
      'land certificate': 'land_certificate',
      'sales agreement': 'sales_agreement',
      attestation: 'attestation',
      allocation: 'allocation',
      'gift deed': 'gift_deed',
      inheritance: 'inheritance',
      other: 'other'
    };

    const verificationMap: Record<string, string> = {
      verified: 'verified',
      pending: 'pending',
      unverified: 'unverified',
      'in review': 'in_review'
    };

    const ownershipMap: Record<string, string> = {
      individual: 'individual',
      'family-held': 'family',
      'family': 'family',
      'community land': 'community',
      community: 'community',
      company: 'company',
      government: 'government',
      trust: 'trust'
    };

    const topographyMap: Record<string, string> = {
      flat: 'flat',
      'gently sloping': 'gentle_slope',
      'steep': 'steep',
      hilly: 'hilly',
      mountainous: 'mountainous',
      valley: 'valley'
    };

    const floodMap: Record<string, string> = { 
      low: 'low', 
      medium: 'medium', 
      high: 'high',
      'very high': 'very_high'
    };

    const soilMap: Record<string, string> = { 
      volcanic: 'volcanic', 
      clay: 'clay', 
      sandy: 'sandy', 
      loamy: 'loamy',
      rocky: 'rocky',
      mixed: 'mixed',
      laterite: 'laterite'
    };

    const vegMap: Record<string, string> = { 
      cleared: 'cleared', 
      'partially cleared': 'bush', 
      'densely vegetated': 'semi_bush', 
      bush: 'bush',
      forested: 'forested',
      farmland: 'farmland',
      grassland: 'grassland'
    };

    const sellerMap: Record<string, string> = { 
      agent: 'agent', 
      owner: 'owner', 
      company: 'company',
      bank: 'bank',
      government: 'government',
      inheritance: 'inheritance'
    };

    const roadAccessMap: Record<string, string> = {
      tarred: 'tarred',
      gravel: 'gravel',
      seasonal: 'seasonal',
      none: 'none',
      paved: 'paved',
      unpaved: 'unpaved'
    };

    const payload: any = {
      // Basic Information
      title: formData.title,
      description: formData.description,
      price: Number(String(formData.price).replace(/[^0-9.-]+/g, '')) || 0,
      is_negotiable: !!formData.negotiable,
      size_value: Number(size.value) || 0,
      size_unit: size.unit,
      land_type: mapOption(formData.type, landTypeMap) || 'residential',

      // Location Information
      quarter: formData.quarter,
      city: formData.city || 'Buea',
      region: formData.region || null,
      country: 'Cameroon',
      latitude: formData.latitude ? Number(formData.latitude) : null,
      longitude: formData.longitude ? Number(formData.longitude) : null,
      exact_location: formData.exactLocation || null,
      google_maps_url: formData.googleMapsUrl || null,
      address_line_1: formData.addressLine1 || null,
      address_line_2: formData.addressLine2 || null,
      street_name: formData.streetName || null,
      neighborhood: formData.neighborhood || null,

      // Access & Infrastructure
      road_access: mapOption(formData.roadAccess, roadAccessMap) || null,
      distance_from_main_road: formData.distanceToRoad,
      access_road_width: formData.accessRoadWidth || null,
      public_transport_access: !!formData.publicTransportAccess,
      nearest_bus_stop_distance: formData.nearestBusStopDistance || null,
      landmarks: formData.landmarks,

      // Physical Characteristics
      topography: mapOption(formData.topography, topographyMap) || null,
      flood_risk: mapOption(formData.floodRisk, floodMap) || null,
      soil_type: mapOption(formData.soilType, soilMap) || null,
      vegetation: mapOption(formData.vegetation, vegMap) || null,
      elevation: formData.elevation || null,
      view: formData.view || null,

      // Zoning & Development
      zoning_type: formData.zoningType || null,
      development_potential: formData.developmentPotential || null,

      // Utilities
      electricity_available: !!formData.electricityAvailable,
      water_available: !!formData.waterAvailable,
      internet_available: !!formData.internetAvailable,
      sewage_system: !!formData.sewageSystem,
      drainage_system: !!formData.drainageSystem,

      // Legal & Documentation
      document_type: mapOption(formData.documentType, docTypeMap) || 'other',
      document_number: formData.documentNumber,
      document_status: mapOption(formData.verificationStatus, verificationMap) || 'pending',
      ownership_type: mapOption(formData.ownershipType, ownershipMap) || null,
      is_disputed: !!formData.hasDisputes,
      dispute_details: formData.disputeDetails || null,
      ownership_duration: formData.ownershipDuration || null,
      previous_owner: formData.previousOwner || null,
      inheritance_property: !!formData.inheritanceProperty,

      // Development Information
      construction_allowed: !!formData.constructionAllowed,
      building_plans_approved: !!formData.buildingPlansApproved,
      max_floors_allowed: formData.maxFloorsAllowed ? parseInt(formData.maxFloorsAllowed) : null,
      building_coverage_percentage: formData.buildingCoveragePercentage ? parseFloat(formData.buildingCoveragePercentage) : null,

      // Features & Restrictions
      features: formData.features.length > 0 ? formData.features : null,
      allowed_uses: formData.allowedUses.length > 0 ? formData.allowedUses : null,
      restrictions: formData.restrictions || null,

      // Seller Information
      seller_type: mapOption(formData.sellerType, sellerMap) || 'agent',
      seller_name: formData.sellerName || '',
      seller_phone: formData.phone,
      seller_whatsapp: formData.whatsapp,
      seller_email: formData.sellerEmail || null,
      seller_company: formData.sellerCompany || null,
      agent_name: formData.agentName || null,
      agent_phone: formData.agentPhone || null,
      agent_email: formData.agentEmail || null,
      agency_name: formData.agencyName || null,
      commission_rate: formData.commissionRate ? parseFloat(formData.commissionRate) : null,

      // Financial Details
      price_per_sqm: formData.pricePerSqm ? parseFloat(formData.pricePerSqm) : null,
      original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      price_reason: formData.priceReason || null,
      payment_plan_available: !!formData.paymentPlanAvailable,
      payment_plan_details: formData.paymentPlanDetails || null,
      taxes_included: !!formData.taxesIncluded,
      annual_property_tax: formData.annualPropertyTax ? parseFloat(formData.annualPropertyTax) : null,

      // Marketing
      featured: !!formData.featured,
      premium_listing: !!formData.premiumListing,
      listing_expiry_date: formData.listingExpiryDate || null,
      tags: formData.tags.length > 0 ? formData.tags : null,
    };

    console.log('Final payload for update:', payload);

    // Validate required fields
    const required = ['title', 'price', 'size_value', 'size_unit', 'land_type', 'quarter', 'seller_type', 'seller_phone'];
    const missingFields = required.filter(field => !payload[field] && payload[field] !== 0);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    console.log('Making API request to update land...');
    
    // STEP 1: Update the land record
    const landResp = await fetch(`http://localhost:4000/api/land/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('Update response status:', landResp.status);
    console.log('Update response ok:', landResp.ok);

    if (!landResp.ok) {
      const errorText = await landResp.text();
      console.error('Update error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      throw new Error(errorData.error || `Failed to update land (status ${landResp.status})`);
    }

    const updatedLand = await landResp.json();
    console.log('Success! Updated land:', updatedLand);

    // STEP 2: Upload new photos if any
    if (formData.photos && formData.photos.length > 0) {
      console.log(`Uploading ${formData.photos.length} new photos...`);
      try {
        await uploadMediaFiles(id, formData.photos, 'photos');
        console.log('Photos uploaded successfully');
      } catch (uploadError: any) {
        console.error('Photo upload failed, but land data was saved:', uploadError);
        // Don't throw - land data is saved, just notify about photo upload failure
      }
    } else {
      console.log('No new photos to upload');
    }

    // STEP 3: Upload video if any
    if (formData.video) {
      console.log('Uploading video...');
      try {
        await uploadMediaFiles(id, [formData.video], 'video');
        console.log('Video uploaded successfully');
      } catch (uploadError: any) {
        console.error('Video upload failed, but land data was saved:', uploadError);
        // Don't throw - land data is saved
      }
    } else {
      console.log('No video to upload');
    }

  // Show success notification
    notify.success('Property edited successfully!');
    router.push(`/land/${id}`);
    router.refresh();
    
  } catch (err: any) {
    console.error('Update error details:', err);
    alert('Failed to update listing: ' + (err.message || err));
  } finally {
    setIsSubmitting(false);
  }
};

// Helper function for file uploads
const uploadMediaFiles = async (landId: string, files: File[], fileType: string) => {
  try {
    const formData = new FormData();
    
    // Append all files
    files.forEach(file => {
      formData.append('files', file);
    });

    console.log(`Uploading ${files.length} ${fileType} for land ${landId}...`);

    const uploadResp = await fetch(`http://localhost:4000/api/land/${landId}/media`, {
      method: 'POST',
      body: formData, // Let browser set Content-Type with boundary
    });

    console.log('Upload response status:', uploadResp.status);

    if (!uploadResp.ok) {
      const errorText = await uploadResp.text();
      console.error(`Upload error for ${fileType}:`, errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      throw new Error(`Failed to upload ${fileType}: ${errorData.error || 'Unknown error'}`);
    }

    const result = await uploadResp.json();
    console.log(`${fileType} upload successful:`, result);
    return result;
    
  } catch (err) {
    console.error(`Error uploading ${fileType}:`, err);
    throw err; // Re-throw to handle in main function
  }
};

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.title.trim() || !formData.size.trim() || !formData.price.trim()) {
        alert('Please fill in all required fields: Title, Size, and Price');
        return;
      }
    }
    
    if (currentStep === 1 && !formData.quarter.trim()) {
      alert('Please select a quarter/area');
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Get current step icon component
  const CurrentStepIcon = iconComponents[steps[currentStep].icon.name as keyof typeof iconComponents];

  // Step 1: Basic Details
  const renderBasicDetails = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Land Title"
          placeholder="e.g., Molyko - Prime Residential Plot"
          value={formData.title}
          onChange={(v: string) => handleInputChange('title', v)}
          icon={Star}
          required
        />
        <InputField
          label="Size"
          placeholder="e.g., 500 m²"
          value={formData.size}
          onChange={(v: string) => handleInputChange('size', v)}
          icon={FileText}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Land Type"
          value={formData.type}
          onChange={(v: string) => handleInputChange('type', v)}
          options={['Residential', 'Commercial', 'Mixed-use', 'Agricultural', 'Industrial', 'Recreational']}
          icon={MapPin}
          required
        />
        <InputField
          label="Price"
          placeholder="e.g., 5,000,000 XAF"
          value={formData.price}
          onChange={(v: string) => handleInputChange('price', v)}
          icon={Zap}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Price per SQM"
          placeholder="e.g., 10,000 XAF"
          value={formData.pricePerSqm}
          onChange={(v: string) => handleInputChange('pricePerSqm', v)}
          icon={CreditCard}
        />
        <InputField
          label="Original Price"
          placeholder="e.g., 5,500,000 XAF"
          value={formData.originalPrice}
          onChange={(v: string) => handleInputChange('originalPrice', v)}
          icon={CreditCard}
        />
      </div>

      <CheckboxField
        label="Price is negotiable"
        checked={formData.negotiable}
        onChange={(v: boolean) => handleInputChange('negotiable', v)}
      />

      <TextAreaField
        label="Price Reason/Justification"
        placeholder="Explain the pricing strategy, comparable sales, unique features that justify the price..."
        value={formData.priceReason}
        onChange={(v: string) => handleInputChange('priceReason', v)}
        rows={3}
        icon={FileText}
      />

      <TextAreaField
        label="Property Description"
        placeholder="Detailed overview of the land, unique features, potential uses, development opportunities..."
        value={formData.description}
        onChange={(v: string) => handleInputChange('description', v)}
        rows={4}
        icon={FileText}
      />
    </div>
  );

  // Step 2: Location
  const renderLocation = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Quarter / Area"
          value={formData.quarter}
          onChange={(v: string) => handleInputChange('quarter', v)}
          options={['-- Select quarter --', 'Molyko', 'Mile 16', 'Bokwango', 'Muea', 'Bonduma', 'Bova', 'Other']}
          icon={MapPin}
          required
        />
        <div className="group">
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-600" />
            City
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.city}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50/80 text-gray-600 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Region"
          placeholder="e.g., Southwest"
          value={formData.region}
          onChange={(v: string) => handleInputChange('region', v)}
          icon={MapPin}
        />
        <InputField
          label="Neighborhood"
          placeholder="e.g., University Area"
          value={formData.neighborhood}
          onChange={(v: string) => handleInputChange('neighborhood', v)}
          icon={MapPin}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Latitude"
          placeholder="e.g., 4.153"
          value={formData.latitude}
          onChange={(v: string) => handleInputChange('latitude', v)}
          icon={MapPin}
        />
        <InputField
          label="Longitude"
          placeholder="e.g., 9.281"
          value={formData.longitude}
          onChange={(v: string) => handleInputChange('longitude', v)}
          icon={MapPin}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Exact Location"
          placeholder="e.g., Behind Buea Town Green"
          value={formData.exactLocation}
          onChange={(v: string) => handleInputChange('exactLocation', v)}
          icon={MapPin}
        />
        <InputField
          label="Google Maps URL"
          placeholder="https://maps.google.com/..."
          value={formData.googleMapsUrl}
          onChange={(v: string) => handleInputChange('googleMapsUrl', v)}
          icon={MapPin}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Address Line 1"
          placeholder="Street address"
          value={formData.addressLine1}
          onChange={(v: string) => handleInputChange('addressLine1', v)}
          icon={MapPin}
        />
        <InputField
          label="Address Line 2"
          placeholder="Additional address info"
          value={formData.addressLine2}
          onChange={(v: string) => handleInputChange('addressLine2', v)}
          icon={MapPin}
        />
      </div>

      <InputField
        label="Street Name"
        placeholder="e.g., Molyko Main Street"
        value={formData.streetName}
        onChange={(v: string) => handleInputChange('streetName', v)}
        icon={MapPin}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Distance to Major Road"
          placeholder="e.g., 100 m from main highway"
          value={formData.distanceToRoad}
          onChange={(v: string) => handleInputChange('distanceToRoad', v)}
          icon={MapPin}
        />
        <InputField
          label="Access Road Width"
          placeholder="e.g., 6 meters"
          value={formData.accessRoadWidth}
          onChange={(v: string) => handleInputChange('accessRoadWidth', v)}
          icon={MapPin}
        />
      </div>

      <TextAreaField
        label="Nearby Landmarks"
        placeholder="e.g., University of Buea (1.2 km), Molyko Market (800 m), Schools, Hospitals, Shopping centers..."
        value={formData.landmarks}
        onChange={(v: string) => handleInputChange('landmarks', v)}
        rows={3}
        icon={MapPin}
      />
    </div>
  );

  // Step 3: Legal
  const renderLegal = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Document Type"
          value={formData.documentType}
          onChange={(v: string) => handleInputChange('documentType', v)}
          options={['Layout plan', 'Land Certificate', 'Sales Agreement', 'Attestation', 'Allocation', 'Gift Deed', 'Inheritance', 'Other']}
          icon={Shield}
        />
        <InputField
          label="Document Number"
          placeholder="e.g., DOC-2024-001"
          value={formData.documentNumber}
          onChange={(v: string) => handleInputChange('documentNumber', v)}
          icon={FileText}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Verification Status"
          value={formData.verificationStatus}
          onChange={(v: string) => handleInputChange('verificationStatus', v)}
          options={['Verified', 'Pending', 'Unverified', 'In review']}
          icon={Shield}
        />
        <SelectField
          label="Ownership Type"
          value={formData.ownershipType}
          onChange={(v: string) => handleInputChange('ownershipType', v)}
          options={['Individual', 'Family-held', 'Community land', 'Company', 'Government', 'Trust']}
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Ownership Duration"
          placeholder="e.g., 5 years"
          value={formData.ownershipDuration}
          onChange={(v: string) => handleInputChange('ownershipDuration', v)}
          icon={Shield}
        />
        <InputField
          label="Previous Owner"
          placeholder="Name of previous owner"
          value={formData.previousOwner}
          onChange={(v: string) => handleInputChange('previousOwner', v)}
          icon={Users}
        />
      </div>

      <div className="space-y-4">
        <CheckboxField
          label="Any known disputes?"
          checked={formData.hasDisputes}
          onChange={(v: boolean) => handleInputChange('hasDisputes', v)}
        />

        <CheckboxField
          label="Inheritance Property"
          checked={formData.inheritanceProperty}
          onChange={(v: boolean) => handleInputChange('inheritanceProperty', v)}
        />

        {formData.hasDisputes && (
          <TextAreaField
            label="Dispute Details"
            placeholder="Describe any disputes or legal issues with the property, ongoing cases, resolutions..."
            value={formData.disputeDetails}
            onChange={(v: string) => handleInputChange('disputeDetails', v)}
            rows={4}
            className="border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
            icon={AlertTriangle}
          />
        )}
      </div>
    </div>
  );

  // Step 4: Physical
  const renderPhysical = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Topography"
          value={formData.topography}
          onChange={(v: string) => handleInputChange('topography', v)}
          options={['Flat', 'Gently sloping', 'Steep', 'Hilly', 'Mountainous', 'Valley']}
          icon={Mountain}
        />
        <SelectField
          label="Flood Risk"
          value={formData.floodRisk}
          onChange={(v: string) => handleInputChange('floodRisk', v)}
          options={['Low', 'Medium', 'High', 'Very High']}
          icon={Droplets}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Soil Type"
          value={formData.soilType}
          onChange={(v: string) => handleInputChange('soilType', v)}
          options={['Volcanic', 'Clay', 'Sandy', 'Loamy', 'Rocky', 'Mixed', 'Laterite']}
          icon={Mountain}
        />
        <SelectField
          label="Vegetation"
          value={formData.vegetation}
          onChange={(v: string) => handleInputChange('vegetation', v)}
          options={['Cleared', 'Partially cleared', 'Densely vegetated', 'Bush', 'Forested', 'Farmland', 'Grassland']}
          icon={Trees}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Elevation"
          placeholder="e.g., 1000m above sea level"
          value={formData.elevation}
          onChange={(v: string) => handleInputChange('elevation', v)}
          icon={Mountain}
        />
        <InputField
          label="View"
          placeholder="e.g., Mountain view, Ocean view, City view"
          value={formData.view}
          onChange={(v: string) => handleInputChange('view', v)}
          icon={Mountain}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Zoning Type"
          value={formData.zoningType}
          onChange={(v: string) => handleInputChange('zoningType', v)}
          options={['Residential', 'Commercial', 'Mixed-use', 'Agricultural', 'Industrial', 'Conservation']}
          icon={Building}
        />
        <SelectField
          label="Development Potential"
          value={formData.developmentPotential}
          onChange={(v: string) => handleInputChange('developmentPotential', v)}
          options={['Low', 'Medium', 'High']}
          icon={Building}
        />
      </div>
    </div>
  );

  // Step 5: Utilities & Features
  const renderUtilities = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Road Access"
          value={formData.roadAccess}
          onChange={(v: string) => handleInputChange('roadAccess', v)}
          options={['Tarred', 'Gravel', 'Seasonal', 'None', 'Paved', 'Unpaved']}
          icon={MapPin}
        />
        <InputField
          label="Nearest Bus Stop Distance"
          placeholder="e.g., 500 m"
          value={formData.nearestBusStopDistance}
          onChange={(v: string) => handleInputChange('nearestBusStopDistance', v)}
          icon={MapPin}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Utilities Available</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CheckboxField
            label="Public Transport Access"
            checked={formData.publicTransportAccess}
            onChange={(v: boolean) => handleInputChange('publicTransportAccess', v)}
          />
          <CheckboxField
            label="Electricity Available"
            checked={formData.electricityAvailable}
            onChange={(v: boolean) => handleInputChange('electricityAvailable', v)}
          />
          <CheckboxField
            label="Water Available"
            checked={formData.waterAvailable}
            onChange={(v: boolean) => handleInputChange('waterAvailable', v)}
          />
          <CheckboxField
            label="Internet Available"
            checked={formData.internetAvailable}
            onChange={(v: boolean) => handleInputChange('internetAvailable', v)}
          />
          <CheckboxField
            label="Sewage System"
            checked={formData.sewageSystem}
            onChange={(v: boolean) => handleInputChange('sewageSystem', v)}
          />
          <CheckboxField
            label="Drainage System"
            checked={formData.drainageSystem}
            onChange={(v: boolean) => handleInputChange('drainageSystem', v)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Development Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="Construction Allowed"
            checked={formData.constructionAllowed}
            onChange={(v: boolean) => handleInputChange('constructionAllowed', v)}
          />
          <CheckboxField
            label="Building Plans Approved"
            checked={formData.buildingPlansApproved}
            onChange={(v: boolean) => handleInputChange('buildingPlansApproved', v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Max Floors Allowed"
            placeholder="e.g., 2"
            value={formData.maxFloorsAllowed}
            onChange={(v: string) => handleInputChange('maxFloorsAllowed', v)}
            icon={Building}
          />
          <InputField
            label="Building Coverage %"
            placeholder="e.g., 60"
            value={formData.buildingCoveragePercentage}
            onChange={(v: string) => handleInputChange('buildingCoveragePercentage', v)}
            icon={Building}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MultiSelectField
          label="Property Features"
          values={formData.features}
          onChange={(v: string[]) => handleInputChange('features', v)}
          options={['Waterfront', 'Corner-lot', 'Fenced', 'Gated', 'Security', 'Parking', 'Garden', 'Pool']}
          icon={Home}
        />
        <MultiSelectField
          label="Allowed Uses"
          values={formData.allowedUses}
          onChange={(v: string[]) => handleInputChange('allowedUses', v)}
          options={['Residential', 'Commercial', 'Farming', 'Industrial', 'Recreational', 'Mixed-use']}
          icon={Wrench}
        />
      </div>

      <TextAreaField
        label="Building Restrictions"
        placeholder="Any building restrictions, height limits, setback requirements, environmental restrictions..."
        value={formData.restrictions}
        onChange={(v: string) => handleInputChange('restrictions', v)}
        rows={3}
        icon={AlertTriangle}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="Payment Plan Available"
            checked={formData.paymentPlanAvailable}
            onChange={(v: boolean) => handleInputChange('paymentPlanAvailable', v)}
          />
          <CheckboxField
            label="Taxes Included in Price"
            checked={formData.taxesIncluded}
            onChange={(v: boolean) => handleInputChange('taxesIncluded', v)}
          />
        </div>
        {formData.paymentPlanAvailable && (
          <TextAreaField
            label="Payment Plan Details"
            placeholder="Describe the payment plan terms, down payment, installment periods..."
            value={formData.paymentPlanDetails}
            onChange={(v: string) => handleInputChange('paymentPlanDetails', v)}
            rows={3}
            icon={CreditCard}
          />
        )}
        <InputField
          label="Annual Property Tax"
          placeholder="e.g., 50,000 XAF"
          value={formData.annualPropertyTax}
          onChange={(v: string) => handleInputChange('annualPropertyTax', v)}
          icon={CreditCard}
        />
      </div>
    </div>
  );

  
  // Step 6: Media
const renderMedia = () => (
  <div className="space-y-6">
    <div>
      <label className="flex text-sm font-semibold text-gray-900 mb-4 items-center gap-2">
        <Camera className="h-5 w-5 text-green-600" />
        Add New Photos (Existing photos will be kept)
      </label>
      
      {/* Show selected files before upload */}
      {formData.photos.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-green-600 mb-2">
            {formData.photos.length} new photo(s) ready for upload
          </p>
          <div className="flex flex-wrap gap-2">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img 
                  src={URL.createObjectURL(photo)} 
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
                <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                  {photo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Green styled file upload */}
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handlePhotoUpload}
        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-500 file:to-emerald-600 file:text-white hover:file:from-green-600 hover:file:to-emerald-700 file:transition-all file:duration-300 file:cursor-pointer"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-4">
        Add New Video Walkthrough (Optional)
      </label>
      
      {formData.video && (
        <div className="mb-4">
          <p className="text-sm text-green-600">
            New video selected: {formData.video.name}
          </p>
        </div>
      )}

      <input 
        type="file" 
        accept="video/*" 
        onChange={handleVideoUpload}
        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-500 file:to-emerald-600 file:text-white hover:file:from-green-600 hover:file:to-emerald-700 file:transition-all file:duration-300 file:cursor-pointer"
      />
      <p className="text-sm text-gray-500 mt-2">
        Note: New photos/videos will be added to existing media, not replace them.
      </p>
    </div>
  </div>
);

  // Step 7: Seller Info
  const renderSeller = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Seller Type"
          value={formData.sellerType}
          onChange={(v: string) => handleInputChange('sellerType', v)}
          options={['Agent', 'Owner', 'Company', 'Bank', 'Government', 'Inheritance']}
          icon={Users}
          required
        />
        <InputField
          label="Seller Name"
          placeholder="Full name or company name"
          value={formData.sellerName}
          onChange={(v: string) => handleInputChange('sellerName', v)}
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+237650000000"
          value={formData.phone}
          onChange={(v: string) => handleInputChange('phone', v)}
          icon={Zap}
          required
        />
        <InputField
          label="WhatsApp"
          type="tel"
          placeholder="+237650000000"
          value={formData.whatsapp}
          onChange={(v: string) => handleInputChange('whatsapp', v)}
          icon={Zap}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Email"
          type="email"
          placeholder="seller@example.com"
          value={formData.sellerEmail}
          onChange={(v: string) => handleInputChange('sellerEmail', v)}
          icon={Zap}
        />
        <InputField
          label="Company Name"
          placeholder="Company name (if applicable)"
          value={formData.sellerCompany}
          onChange={(v: string) => handleInputChange('sellerCompany', v)}
          icon={Building}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Agent Information (If applicable)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Agent Name"
            placeholder="Agent's full name"
            value={formData.agentName}
            onChange={(v: string) => handleInputChange('agentName', v)}
            icon={Users}
          />
          <InputField
            label="Agent Phone"
            placeholder="+237650000000"
            value={formData.agentPhone}
            onChange={(v: string) => handleInputChange('agentPhone', v)}
            icon={Zap}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Agent Email"
            type="email"
            placeholder="agent@example.com"
            value={formData.agentEmail}
            onChange={(v: string) => handleInputChange('agentEmail', v)}
            icon={Zap}
          />
          <InputField
            label="Agency Name"
            placeholder="Real estate agency name"
            value={formData.agencyName}
            onChange={(v: string) => handleInputChange('agencyName', v)}
            icon={Building}
          />
        </div>
        <InputField
          label="Commission Rate (%)"
          placeholder="e.g., 3.5"
          value={formData.commissionRate}
          onChange={(v: string) => handleInputChange('commissionRate', v)}
          icon={CreditCard}
        />
      </div>

      <div className="space-y-4">
        <CheckboxField
          label="I am a verified dealer"
          checked={formData.verified}
          onChange={(v: boolean) => handleInputChange('verified', v)}
        />
        
        <MultiSelectField
          label="Listing Tags"
          values={formData.tags}
          onChange={(v: string[]) => handleInputChange('tags', v)}
          options={['prime-location', 'waterfront', 'investment-opportunity', 'first-time-buyer', 'vip', 'quick-sale']}
          icon={Tag}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="Featured Listing"
            checked={formData.featured}
            onChange={(v: boolean) => handleInputChange('featured', v)}
          />
          <CheckboxField
            label="Premium Listing"
            checked={formData.premiumListing}
            onChange={(v: boolean) => handleInputChange('premiumListing', v)}
          />
        </div>

        <InputField
          label="Listing Expiry Date"
          type="date"
          value={formData.listingExpiryDate}
          onChange={(v: string) => handleInputChange('listingExpiryDate', v)}
          icon={Calendar}
        />
      </div>
    </div>
  );

  // Step 8: Review
  const renderReview = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Basic Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Title:</strong> <span className="text-gray-700">{formData.title || '—'}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Size:</strong> <span className="text-gray-700">{formData.size || '—'}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Type:</strong> <span className="text-gray-700">{formData.type}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Price:</strong> <span className="text-gray-700">{formData.price || '—'}</span></div>
            <div className="flex justify-between py-2"><strong>Negotiable:</strong> <span className={formData.negotiable ? "text-green-600 font-semibold" : "text-gray-700"}>{formData.negotiable ? 'Yes' : 'No'}</span></div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Quarter:</strong> <span className="text-gray-700">{formData.quarter || '—'}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Coordinates:</strong> <span className="text-gray-700">{formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : 'Not set'}</span></div>
            <div className="flex justify-between py-2"><strong>Distance to road:</strong> <span className="text-gray-700">{formData.distanceToRoad || '—'}</span></div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Document:</strong> <span className="text-gray-700">{formData.documentType}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Ownership:</strong> <span className="text-gray-700">{formData.ownershipType}</span></div>
            <div className="flex justify-between py-2"><strong>Disputes:</strong> <span className={formData.hasDisputes ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>{formData.hasDisputes ? 'Yes' : 'No'}</span></div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mountain className="h-5 w-5 text-green-600" />
              Physical
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Topography:</strong> <span className="text-gray-700">{formData.topography}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100"><strong>Flood Risk:</strong> <span className="text-gray-700">{formData.floodRisk}</span></div>
            <div className="flex justify-between py-2"><strong>Soil:</strong> <span className="text-gray-700">{formData.soilType}</span></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Seller Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100"><strong>Type:</strong> <span className="text-gray-700">{formData.sellerType}</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><strong>Name:</strong> <span className="text-gray-700">{formData.sellerName || '—'}</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><strong>Phone:</strong> <span className="text-gray-700">{formData.phone || '—'}</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><strong>WhatsApp:</strong> <span className="text-gray-700">{formData.whatsapp || '—'}</span></div>
          <div className="flex justify-between py-2"><strong>Verified:</strong> <span className={formData.verified ? "text-green-600 font-semibold" : "text-gray-700"}>{formData.verified ? '✓ Yes' : 'No'}</span></div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen p-6 md:p-8 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-6 text-xl text-gray-600">Loading land data...</p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we fetch your listing details</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-8 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent mb-4">
            Edit Land Listing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Update your property listing with the latest information
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <Stepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
        </div>

        {/* Form Content */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <CardHeader className="pb-8 border-b border-gray-200/60 bg-gradient-to-r from-white to-green-50/30">
            <CardTitle className="text-3xl flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/25">
                {currentStep + 1}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  {CurrentStepIcon && <CurrentStepIcon className="h-7 w-7 text-green-600" />}
                  {steps[currentStep].label}
                </div>
                <p className="text-lg text-gray-600 mt-2 font-normal">{steps[currentStep].description}</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-10 pb-12 px-8">
            {currentStep === 0 && renderBasicDetails()}
            {currentStep === 1 && renderLocation()}
            {currentStep === 2 && renderLegal()}
            {currentStep === 3 && renderPhysical()}
            {currentStep === 4 && renderUtilities()}
            {currentStep === 5 && renderMedia()}
            {currentStep === 6 && renderSeller()}
            {currentStep === 7 && renderReview()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/60">
          <Button
            onClick={handlePrev}
            variant="outline"
            disabled={currentStep === 0}
            className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            ← Previous
          </Button>

          <div className="text-sm text-gray-600 font-medium">
            Step <span className="text-green-600 font-bold">{currentStep + 1}</span> of {steps.length}
          </div>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving Changes...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Save Changes
                </div>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300"
            >
              Next →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}