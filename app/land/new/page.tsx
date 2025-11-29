'use client';

import React from 'react';
import { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, MapPin, FileText, Mountain, Users, Eye, CheckCircle, Camera, AlertTriangle, Star, Shield, Globe, Zap, Droplets, Trees } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'basic', label: 'Basic Details', description: 'Title, size, type, price', icon: FileText },
  { id: 'location', label: 'Location', description: 'Area, coordinates, landmarks', icon: MapPin },
  { id: 'legal', label: 'Legal Status', description: 'Documents, ownership, disputes', icon: Shield },
  { id: 'physical', label: 'Physical', description: 'Topography, soil, vegetation', icon: Mountain },
  { id: 'media', label: 'Media', description: 'Photos & videos', icon: Camera },
  { id: 'seller', label: 'Seller Info', description: 'Contact, verification', icon: Users },
  { id: 'review', label: 'Review & Publish', description: 'Final check', icon: Eye },
];

// Icon mapping
const iconComponents = {
  FileText,
  MapPin,
  Shield,
  Mountain,
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
  latitude: string;
  longitude: string;
  distanceToRoad: string;
  landmarks: string;

  // Step 3: Legal
  documentType: string;
  documentNumber: string;
  verificationStatus: string;
  ownershipType: string;
  hasDisputes: boolean;
  disputeDetails: string;

  // Step 4: Physical
  topography: string;
  floodRisk: string;
  soilType: string;
  vegetation: string;

  // Step 5: Media
  photos: File[];
  video?: File;

  // Step 6: Seller
  sellerType: string;
  phone: string;
  whatsapp: string;
  verified: boolean;
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

  

  // Fixed SelectField Component
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

  // Fixed TextAreaField Component
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

  // Fixed CheckboxField Component
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


export default function CreateLandPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LandFormData>({
    title: '',
    size: '',
    type: 'Residential',
    price: '',
    negotiable: false,
    description: '',
    quarter: '',
    city: 'Buea',
    latitude: '',
    longitude: '',
    distanceToRoad: '',
    landmarks: '',
    documentType: 'Layout plan',
    documentNumber: '',
    verificationStatus: 'Pending',
    ownershipType: 'Individual',
    hasDisputes: false,
    disputeDetails: '',
    topography: 'Flat',
    floodRisk: 'Low',
    soilType: 'Volcanic',
    vegetation: 'Cleared',
    photos: [],
    video: undefined,
    sellerType: 'Agent',
    phone: '',
    whatsapp: '',
    verified: false,
  });

  // Fixed input change handler
  const handleInputChange = (field: keyof LandFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Fixed file upload handlers
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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        video: file
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
    // Basic validation before proceeding
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

  const handlePublish = async () => {
  setIsSubmitting(true);
  try {
    console.log('=== STARTING PUBLISH PROCESS ===');
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
      agricultural: 'agricultural'
    };

    const docTypeMap: Record<string, string> = {
      'layout plan': 'layout_plan',
      'land certificate': 'land_certificate',
      'sales agreement': 'sales_agreement',
      attestation: 'attestation',
      allocation: 'allocation'
    };

    const verificationMap: Record<string, string> = {
      verified: 'verified',
      pending: 'pending',
      unverified: 'unverified'
    };

    const ownershipMap: Record<string, string> = {
      individual: 'individual',
      'family-held': 'family',
      'family': 'family',
      'community land': 'community',
      community: 'community',
      company: 'company'
    };

    const topographyMap: Record<string, string> = {
      flat: 'flat',
      'gently sloping': 'gentle_slope',
      'steep': 'steep'
    };

    const floodMap: Record<string, string> = { low: 'low', medium: 'medium', high: 'high' };
    const soilMap: Record<string, string> = { volcanic: 'volcanic', clay: 'clay', sandy: 'sand', mixed: 'mixed' };
    const vegMap: Record<string, string> = { cleared: 'cleared', 'partially cleared': 'bush', 'densely vegetated': 'semi_bush', bush: 'bush' };
    const sellerMap: Record<string, string> = { agent: 'agent', owner: 'owner', company: 'company' };

    const payload: any = {
      title: formData.title,
      description: formData.description,
      price: Number(String(formData.price).replace(/[^0-9.-]+/g, '')) || 0,
      is_negotiable: !!formData.negotiable,
      size_value: Number(size.value) || 0,
      size_unit: size.unit,
      land_type: mapOption(formData.type, landTypeMap) || 'residential',
      quarter: formData.quarter,
      city: formData.city || 'Buea',
      latitude: formData.latitude ? Number(formData.latitude) : null,
      longitude: formData.longitude ? Number(formData.longitude) : null,
      distance_from_main_road: formData.distanceToRoad,
      landmarks: formData.landmarks,
      topography: mapOption(formData.topography, topographyMap) || null,
      flood_risk: mapOption(formData.floodRisk, floodMap) || null,
      soil_type: mapOption(formData.soilType, soilMap) || null,
      vegetation: mapOption(formData.vegetation, vegMap) || null,
      document_type: mapOption(formData.documentType, docTypeMap) || 'other',
      document_number: formData.documentNumber,
      document_status: mapOption(formData.verificationStatus, verificationMap) || 'pending',
      ownership_type: mapOption(formData.ownershipType, ownershipMap) || null,
      is_disputed: !!formData.hasDisputes,
      // Make dispute_details conditional
      ...(formData.disputeDetails && formData.disputeDetails.trim() !== '' && { 
        dispute_details: formData.disputeDetails 
      }),
      seller_type: mapOption(formData.sellerType, sellerMap) || 'agent',
      seller_phone: formData.phone,
      seller_whatsapp: formData.whatsapp,
      road_access: null,
      seller_name: '',
      status: 'published'
    };

    console.log('Final payload being sent:', payload);

    // Validate required fields
    const required = ['title', 'price', 'size_value', 'size_unit', 'land_type', 'quarter', 'seller_type'];
    const missingFields = required.filter(field => !payload[field] && payload[field] !== 0);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    console.log('Making API request to create land...');
    
    // STEP 1: Create the land record
    const landResp = await fetch('http://localhost:4000/api/land', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('Land response status:', landResp.status);
    console.log('Land response ok:', landResp.ok);

    if (!landResp.ok) {
      const errorText = await landResp.text();
      console.error('Land creation error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      throw new Error(errorData.error || `Failed to create land (status ${landResp.status})`);
    }

    const createdLand = await landResp.json();
    console.log('Success! Created land:', createdLand);

    // STEP 2: Upload photos if any
    if (formData.photos && formData.photos.length > 0) {
      console.log(`Uploading ${formData.photos.length} photos...`);
      await uploadMediaFiles(createdLand.id, formData.photos, 'photos');
    } else {
      console.log('No photos to upload');
    }

    // STEP 3: Upload video if any
    if (formData.video) {
      console.log('Uploading video...');
      await uploadMediaFiles(createdLand.id, [formData.video], 'video');
    } else {
      console.log('No video to upload');
    }

    alert('Land listing published successfully! 🎉\nPhotos and documents have been uploaded.');
    
    // Reset form or redirect
    // window.location.href = '/lands'; // Uncomment to redirect
    
  } catch (err: any) {
    console.error('Publish error details:', err);
    alert('Failed to publish listing: ' + (err.message || err));
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
          options={['Residential', 'Commercial', 'Mixed-use', 'Agricultural']}
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

      <CheckboxField
        label="Price is negotiable"
        checked={formData.negotiable}
        onChange={(v: boolean) => handleInputChange('negotiable', v)}
      />

      <TextAreaField
        label="Short Description"
        placeholder="Brief overview of the land, unique features, and potential uses..."
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
          options={['-- Select quarter --', 'Molyko', 'Mile 16', 'Bokwango', 'Muea', 'Bonduma', 'Other']}
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

      <InputField
        label="Distance to Major Road"
        placeholder="e.g., 100 m from main highway"
        value={formData.distanceToRoad}
        onChange={(v: string) => handleInputChange('distanceToRoad', v)}
        icon={MapPin}
      />

      <TextAreaField
        label="Nearby Landmarks"
        placeholder="e.g., University of Buea (1.2 km), Molyko Market (800 m), Schools, Hospitals..."
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
          options={['Layout plan', 'Land Certificate', 'Sales Agreement', 'Attestation', 'Allocation']}
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
          options={['Verified', 'Pending', 'Unverified']}
          icon={Shield}
        />
        <SelectField
          label="Ownership Type"
          value={formData.ownershipType}
          onChange={(v: string) => handleInputChange('ownershipType', v)}
          options={['Individual', 'Family-held', 'Community land', 'Company']}
          icon={Users}
        />
      </div>

      <CheckboxField
        label="Any known disputes?"
        checked={formData.hasDisputes}
        onChange={(v: boolean) => handleInputChange('hasDisputes', v)}
      />

      {formData.hasDisputes && (
        <TextAreaField
          label="Dispute Details"
          placeholder="Describe any disputes or legal issues with the property..."
          value={formData.disputeDetails}
          onChange={(v: string) => handleInputChange('disputeDetails', v)}
          rows={4}
          className="border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
          icon={AlertTriangle}
        />
      )}
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
          options={['Flat', 'Gently sloping', 'Steep']}
          icon={Mountain}
        />
        <SelectField
          label="Flood Risk"
          value={formData.floodRisk}
          onChange={(v: string) => handleInputChange('floodRisk', v)}
          options={['Low', 'Medium', 'High']}
          icon={Droplets}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Soil Type"
          value={formData.soilType}
          onChange={(v: string) => handleInputChange('soilType', v)}
          options={['Volcanic', 'Clay', 'Sandy', 'Mixed']}
          icon={Mountain}
        />
        <SelectField
          label="Vegetation"
          value={formData.vegetation}
          onChange={(v: string) => handleInputChange('vegetation', v)}
          options={['Cleared', 'Partially cleared', 'Densely vegetated']}
          icon={Trees}
        />
      </div>
    </div>
  );

 // In your renderMedia function, show actual uploaded files
const renderMedia = () => (
  <div className="space-y-6">
    <div>
      <label className="flex text-sm font-semibold text-gray-900 mb-4 items-center gap-2">
        <Camera className="h-5 w-5 text-green-600" />
        Land Photos
      </label>
      
      {/* Show selected files before upload */}
      {formData.photos.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-green-600 mb-2">
            {formData.photos.length} photo(s) ready for upload
          </p>
          <div className="flex flex-wrap gap-2">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img 
                  src={URL.createObjectURL(photo)} 
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                  {photo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Upload input */}
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handlePhotoUpload}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
      />
    </div>
  </div>
);

  // Step 6: Seller Info
  const renderSeller = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Seller Type"
          value={formData.sellerType}
          onChange={(v: string) => handleInputChange('sellerType', v)}
          options={['Agent', 'Owner', 'Company']}
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

      <CheckboxField
        label="I am a verified dealer"
        checked={formData.verified}
        onChange={(v: boolean) => handleInputChange('verified', v)}
      />
    </div>
  );

  // Step 7: Review
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
          <div className="flex justify-between py-2 border-b border-gray-100"><strong>Phone:</strong> <span className="text-gray-700">{formData.phone || '—'}</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><strong>WhatsApp:</strong> <span className="text-gray-700">{formData.whatsapp || '—'}</span></div>
          <div className="flex justify-between py-2"><strong>Verified:</strong> <span className={formData.verified ? "text-green-600 font-semibold" : "text-gray-700"}>{formData.verified ? '✓ Yes' : 'No'}</span></div>
        </CardContent>
      </Card>

      {/* Media summary */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="h-5 w-5 text-green-600" />
            Media
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <strong>Photos:</strong> 
            <span className="text-gray-700">{formData.photos.length} uploaded</span>
          </div>
          <div className="flex justify-between py-2">
            <strong>Video:</strong> 
            <span className="text-gray-700">{formData.video ? 'Uploaded' : 'None'}</span>
          </div>
        </CardContent>
      </Card>
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
            Create Land Listing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to showcase your property to potential buyers
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
            {currentStep === 4 && renderMedia()}
            {currentStep === 5 && renderSeller()}
            {currentStep === 6 && renderReview()}
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
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Publish Listing
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