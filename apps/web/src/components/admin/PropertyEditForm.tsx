import { useState, useEffect } from "react";
import { X, Save, MapPin, Home, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PropertyEditFormProps {
    property: any;
    onClose: () => void;
    onSave: (updatedData: any) => Promise<void>;
}

export function PropertyEditForm({ property, onClose, onSave }: PropertyEditFormProps) {
    const [formData, setFormData] = useState<any>({ ...property });
    const [featuresJson, setFeaturesJson] = useState(JSON.stringify(property.features || {}, null, 2));
    const [activeTab, setActiveTab] = useState("basics");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setFormData({ ...property });
        setFeaturesJson(JSON.stringify(property.features || {}, null, 2));
    }, [property]);

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const dataToSave = {
                ...formData,
                features: JSON.parse(featuresJson)
            };
            await onSave(dataToSave);
            onClose();
        } catch (error) {
            console.error("Invalid JSON or Save Error", error);
            alert("Failed to save. Check JSON format.");
        } finally {
            setSaving(false);
        }
    };

    const TabButton = ({ id, label, icon: Icon }: any) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === id ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-50"
                }`}
        >
            <Icon className="w-4 h-4" /> {label}
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
                        <p className="text-sm text-gray-500">Update details for {property.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 p-2 border-b border-gray-100 bg-white">
                    <TabButton id="basics" label="Basics" icon={Home} />
                    <TabButton id="location" label="Location" icon={MapPin} />
                    <TabButton id="details" label="Details" icon={List} />
                    <TabButton id="features" label="Features (JSON)" icon={List} />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {activeTab === "basics" && (
                        <div className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                                    <Input value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
                                    <Input type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => handleChange("status", e.target.value)}
                                        className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    >
                                        <option value="DRAFT">Draft</option>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="SOLD">Sold</option>
                                        <option value="RENTED">Rented</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleChange("type", e.target.value)}
                                        className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    >
                                        <option value="RESIDENTIAL">Residential</option>
                                        <option value="COMMERCIAL">Commercial</option>
                                        <option value="INDUSTRIAL">Industrial</option>
                                        <option value="LAND">Land</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Listing Type</label>
                                    <select
                                        value={formData.listingType}
                                        onChange={(e) => handleChange("listingType", e.target.value)}
                                        className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    >
                                        <option value="SALE">For Sale</option>
                                        <option value="RENT">For Rent</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "location" && (
                        <div className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                                <Input value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                                    <Input value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Zip Code</label>
                                    <Input value={formData.zipCode} onChange={(e) => handleChange("zipCode", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Latitude</label>
                                    <Input type="number" value={formData.latitude} onChange={(e) => handleChange("latitude", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Longitude</label>
                                    <Input type="number" value={formData.longitude} onChange={(e) => handleChange("longitude", e.target.value)} />
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg text-xs text-gray-500">
                                ℹ️ Changing Lat/Long will move the property marker on the map. Use Google Maps to find coordinates.
                            </div>
                        </div>
                    )}

                    {activeTab === "details" && (
                        <div className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bedrooms</label>
                                    <Input type="number" value={formData.bedrooms} onChange={(e) => handleChange("bedrooms", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bathrooms</label>
                                    <Input type="number" value={formData.bathrooms} onChange={(e) => handleChange("bathrooms", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sq Ft</label>
                                    <Input type="number" value={formData.areaSqFt} onChange={(e) => handleChange("areaSqFt", e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    className="min-h-[200px]"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "features" && (
                        <div className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Features JSON</label>
                            <Textarea
                                value={featuresJson}
                                onChange={(e) => setFeaturesJson(e.target.value)}
                                className="font-mono text-xs min-h-[300px] bg-gray-50"
                            />
                            <div className="text-xs text-gray-500">
                                <p>Format: Key-Value pairs or Nested Objects.</p>
                                <pre className="bg-gray-100 p-2 mt-2 rounded">
                                    {`{
  "View": "City Skyline",
  "Parking": "2 Spots Garage",
  "AC": "Central",
  "Pool": true
}`}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-brand-600 hover:bg-brand-700 text-white gap-2"
                    >
                        {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                    </Button>
                </div>
            </div>
        </div>
    );
}
