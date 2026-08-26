
'use client';

import { School } from '@/lib/api';
import { GraduationCap, Star } from 'lucide-react';

interface SchoolsProps {
    schools: School[];
}

export default function Schools({ schools }: SchoolsProps) {
    if (!schools?.length) return null;

    return (
        <div className="space-y-6" id="schools">
            <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-brand-600" />
                <h3 className="text-xl font-bold text-gray-900">Nearby Schools</h3>
            </div>

            <p className="text-gray-500 text-sm">
                GreatSchools ratings provided by third-party data. Ratings are on a scale of 1-10.
            </p>

            <div className="grid gap-4">
                {schools.map((school) => (
                    <div key={school.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-200 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-black text-white shadow-sm
                                ${school.rating >= 8 ? 'bg-green-500' : school.rating >= 5 ? 'bg-yellow-500' : 'bg-red-500'}
                            `}>
                                {school.rating}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{school.name}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                    <span className="font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200">{school.level}</span>
                                    <span>•</span>
                                    <span>{school.type}</span>
                                    <span>•</span>
                                    <span>{school.distance} mi</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <button className="text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline">
                                See Data
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
