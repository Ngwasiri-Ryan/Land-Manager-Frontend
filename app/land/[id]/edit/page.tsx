"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, MapPin, FileText, Mountain, Users, Eye, CheckCircle, Camera, Shield, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'basic', label: 'Basic Details', description: 'Title, size, type, price', icon: FileText },
  { id: 'location', label: 'Location', description: 'Area, coordinates, landmarks', icon: MapPin },
  { id: 'legal', label: 'Legal Status', description: 'Documents, ownership, disputes', icon: Shield },
  { id: 'physical', label: 'Physical', description: 'Topography, soil, vegetation', icon: Mountain },
  { id: 'media', label: 'Media', description: 'Photos & videos', icon: Camera },
  { id: 'seller', label: 'Seller Info', description: 'Contact, verification', icon: Users },
  { id: 'review', label: 'Review & Save', description: 'Final check', icon: Eye },
];

const iconComponents = { FileText, MapPin, Shield, Mountain, Camera, Users, Eye };

type LandFormData = {
  title: string;
  size: string;
  type: string;
  price: string;
  negotiable: boolean;
  description: string;
  quarter: string;
  city: string;
  latitude: string;
  longitude: string;
  distanceToRoad: string;
  landmarks: string;
  documentType: string;
  documentNumber: string;
  verificationStatus: string;
  ownershipType: string;
  hasDisputes: boolean;
  disputeDetails: string;
  topography: string;
  floodRisk: string;
  soilType: string;
  vegetation: string;
  photos: File[];
  sellerType: string;
  phone: string;
  whatsapp: string;
  verified: boolean;
};

export default function EditLandPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

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
    sellerType: 'Agent',
    phone: '',
    whatsapp: '',
    verified: false,
  });

  const handleInputChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  useEffect(() => {
    let mounted = true;
    const fetchLand = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/land/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch land: ${res.status}`);
        const d = await res.json();
        if (!mounted) return;
        setFormData({
          title: d.title || '',
          size: d.size_value ? `${d.size_value} ${d.size_unit || 'sqm'}` : '',
          type: d.land_type ? (d.land_type.charAt(0).toUpperCase() + d.land_type.slice(1)) : 'Residential',
          price: d.price ? String(d.price) : '',
          negotiable: !!d.is_negotiable,
          description: d.description || '',
          quarter: d.quarter || '',
          city: d.city || 'Buea',
          latitude: d.latitude ? String(d.latitude) : '',
          longitude: d.longitude ? String(d.longitude) : '',
          distanceToRoad: d.distance_from_main_road || '',
          landmarks: Array.isArray(d.landmarks) ? d.landmarks.join(', ') : (d.landmarks || ''),
          documentType: d.document_type || 'Layout plan',
          documentNumber: d.document_number || '',
          verificationStatus: d.document_status || 'Pending',
          ownershipType: d.ownership_type || 'Individual',
          hasDisputes: !!d.is_disputed,
          disputeDetails: d.dispute_details || '',
          topography: d.topography || 'Flat',
          floodRisk: d.flood_risk || 'Low',
          soilType: d.soil_type || 'Volcanic',
          vegetation: d.vegetation || 'Cleared',
          photos: [],
          sellerType: d.seller_type || 'Agent',
          phone: d.seller_phone || '',
          whatsapp: d.seller_whatsapp || '',
          verified: false,
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load land');
      } finally {
        setLoading(false);
      }
    };
    fetchLand();
    return () => { mounted = false; };
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
      const size = parseSize(formData.size);
      const payload: any = {
        title: formData.title,
        description: formData.description,
        price: Number(String(formData.price).replace(/[^0-9.-]+/g, '')) || 0,
        is_negotiable: !!formData.negotiable,
        size_value: Number(size.value) || 0,
        size_unit: size.unit,
        land_type: formData.type ? formData.type.toLowerCase() : 'residential',
        quarter: formData.quarter,
        city: formData.city,
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        distance_from_main_road: formData.distanceToRoad,
        landmarks: formData.landmarks,
        topography: formData.topography,
        flood_risk: formData.floodRisk,
        soil_type: formData.soilType,
        vegetation: formData.vegetation,
        document_type: formData.documentType,
        document_number: formData.documentNumber,
        document_status: formData.verificationStatus,
        ownership_type: formData.ownershipType,
        is_disputed: !!formData.hasDisputes,
        dispute_details: formData.disputeDetails,
        seller_type: formData.sellerType,
        seller_phone: formData.phone,
        seller_whatsapp: formData.whatsapp,
      };

      const res = await fetch(`http://localhost:4000/api/land/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to update (${res.status})`);
      }

      const updated = await res.json();
      console.log('Updated', updated);
      alert('Listing updated successfully');
      router.push(`/land/${id}`);
    } catch (err: any) {
      console.error(err);
      alert('Failed to save: ' + (err.message || err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ label, type = 'text', placeholder, value, onChange, icon: Icon, ...props }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-green-600" />}
        {label}
      </label>
      <div className="relative">
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm" {...props} />
      </div>
    </div>
  );

  const SelectField = ({ label, value, onChange, options, icon: Icon, ...props }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">{Icon && <Icon className="h-4 w-4 text-green-600" />} {label}</label>
      <div className="relative">
        <select value={value} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm" {...props}>
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );

  const TextAreaField = ({ label, placeholder, value, onChange, rows = 3, icon: Icon, ...props }: any) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">{Icon && <Icon className="h-4 w-4 text-green-600" />} {label}</label>
      <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none" {...props} />
    </div>
  );

  const CheckboxField = ({ label, checked, onChange, ...props }: any) => (
    <label className="flex items-center gap-3 group cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-5 h-5 rounded border-2 border-gray-300 text-green-500" {...props} />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );

  const renderBasicDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Title" value={formData.title} onChange={(e: any) => handleInputChange('title', e.target.value)} icon={Star} />
        <InputField label="Size" value={formData.size} onChange={(e: any) => handleInputChange('size', e.target.value)} icon={FileText} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Type" value={formData.type} onChange={(e: any) => handleInputChange('type', e.target.value)} options={['Residential','Commercial','Mixed-use','Agricultural']} icon={MapPin} />
        <InputField label="Price" value={formData.price} onChange={(e: any) => handleInputChange('price', e.target.value)} icon={Zap} />
      </div>
      <CheckboxField label="Price is negotiable" checked={formData.negotiable} onChange={(e: any) => handleInputChange('negotiable', e.target.checked)} />
      <TextAreaField label="Description" value={formData.description} onChange={(e: any) => handleInputChange('description', e.target.value)} rows={4} icon={FileText} />
    </div>
  );

  const renderLocation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Quarter / Area" value={formData.quarter} onChange={(e: any) => handleInputChange('quarter', e.target.value)} options={['-- Select quarter --','Molyko','Mile 16','Bokwango','Muea','Bonduma','Other']} icon={MapPin} />
        <InputField label="City" value={formData.city} onChange={(e: any) => handleInputChange('city', e.target.value)} icon={MapPin} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Latitude" value={formData.latitude} onChange={(e: any) => handleInputChange('latitude', e.target.value)} />
        <InputField label="Longitude" value={formData.longitude} onChange={(e: any) => handleInputChange('longitude', e.target.value)} />
      </div>
      <InputField label="Distance to main road" value={formData.distanceToRoad} onChange={(e: any) => handleInputChange('distanceToRoad', e.target.value)} />
      <TextAreaField label="Nearby landmarks" value={formData.landmarks} onChange={(e: any) => handleInputChange('landmarks', e.target.value)} rows={2} />
    </div>
  );

  const renderLegal = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Document Type" value={formData.documentType} onChange={(e: any) => handleInputChange('documentType', e.target.value)} options={['Layout plan','Land certificate','Sales agreement','Attestation','Allocation']} />
        <InputField label="Document number" value={formData.documentNumber} onChange={(e: any) => handleInputChange('documentNumber', e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Ownership Type" value={formData.ownershipType} onChange={(e: any) => handleInputChange('ownershipType', e.target.value)} options={['Individual','Family','Community','Company']} />
        <SelectField label="Document status" value={formData.verificationStatus} onChange={(e: any) => handleInputChange('verificationStatus', e.target.value)} options={['Pending','Verified','Unverified']} />
      </div>
      <CheckboxField label="Has disputes" checked={formData.hasDisputes} onChange={(e: any) => handleInputChange('hasDisputes', e.target.checked)} />
      {formData.hasDisputes && <TextAreaField label="Dispute details" value={formData.disputeDetails} onChange={(e: any) => handleInputChange('disputeDetails', e.target.value)} rows={3} />}
    </div>
  );

  const renderPhysical = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Topography" value={formData.topography} onChange={(e: any) => handleInputChange('topography', e.target.value)} options={['Flat','Gently sloping','Steep']} />
        <SelectField label="Flood risk" value={formData.floodRisk} onChange={(e: any) => handleInputChange('floodRisk', e.target.value)} options={['Low','Medium','High']} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Soil type" value={formData.soilType} onChange={(e: any) => handleInputChange('soilType', e.target.value)} options={['Volcanic','Clay','Sandy','Mixed']} />
        <SelectField label="Vegetation" value={formData.vegetation} onChange={(e: any) => handleInputChange('vegetation', e.target.value)} options={['Cleared','Partially cleared','Densely vegetated']} />
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-6">
      <label className="block text-sm font-semibold text-gray-900 mb-3">Photos (optional)</label>
      <input type="file" accept="image/*" multiple onChange={(e: any) => handleInputChange('photos', Array.from(e.target.files || []))} />
      <div className="text-sm text-gray-500">Media upload is saved locally in the form and not uploaded to storage in this demo.</div>
    </div>
  );

  const renderSeller = () => (
    <div className="space-y-6">
      <SelectField label="Seller Type" value={formData.sellerType} onChange={(e: any) => handleInputChange('sellerType', e.target.value)} options={['Agent','Owner','Company']} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Phone" value={formData.phone} onChange={(e: any) => handleInputChange('phone', e.target.value)} />
        <InputField label="WhatsApp" value={formData.whatsapp} onChange={(e: any) => handleInputChange('whatsapp', e.target.value)} />
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review your changes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600">Title</div>
          <div className="font-medium text-gray-900">{formData.title}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Price</div>
          <div className="font-medium text-gray-900">{formData.price}</div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic': return renderBasicDetails();
      case 'location': return renderLocation();
      case 'legal': return renderLegal();
      case 'physical': return renderPhysical();
      case 'media': return renderMedia();
      case 'seller': return renderSeller();
      case 'review': return renderReview();
      default: return null;
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Edit Listing</h1>
          <p className="text-gray-600 mt-2">Make changes to your listing and save when ready.</p>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <Stepper steps={steps} activeIndex={currentStep} />
          </div>

          <CardContent>
            <div className="space-y-6">
              {renderStepContent()}
            </div>
          </CardContent>

          <div className="flex items-center justify-between gap-4 mt-6">
            <div>
              <Button variant="ghost" onClick={() => { if (currentStep > 0) setCurrentStep(s => s - 1); }}>
                Back
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(s => s + 1)}>Next</Button>
              ) : (
                <Button onClick={handleSave} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
