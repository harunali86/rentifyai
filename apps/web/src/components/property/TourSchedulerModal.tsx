'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Video, UserCheck, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface TourSchedulerModalProps {
    propertyTitle: string;
    propertyAddress: string;
    agentName?: string;
    agentAvatar?: string;
}

export function TourSchedulerModal({
    propertyTitle,
    propertyAddress,
    agentName = 'Verified Real Estate Partner',
    agentAvatar
}: TourSchedulerModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tourType, setTourType] = useState<'in-person' | 'video'>('in-person');
    const [selectedDate, setSelectedDate] = useState('Tomorrow');
    const [selectedTime, setSelectedTime] = useState('11:00 AM');
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const dates = [
        { label: 'Today', day: 'Wed', date: 'Oct 1' },
        { label: 'Tomorrow', day: 'Thu', date: 'Oct 2' },
        { label: 'Friday', day: 'Fri', date: 'Oct 3' },
        { label: 'Saturday', day: 'Sat', date: 'Oct 4' },
        { label: 'Sunday', day: 'Sun', date: 'Oct 5' },
    ];

    const times = [
        '10:00 AM',
        '11:30 AM',
        '02:00 PM',
        '03:30 PM',
        '05:00 PM',
        '06:30 PM'
    ];

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConfirmed(true);
        toast.success(`🎉 Tour requested for ${selectedDate} at ${selectedTime}!`, {
            description: `${agentName} will confirm your slot via WhatsApp/Phone.`
        });
        setTimeout(() => {
            setIsConfirmed(false);
            setIsOpen(false);
        }, 2200);
    };

    return (
        <>
            {/* The Main CTA Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
            >
                <Calendar className="w-4 h-4" />
                Request a Tour
            </button>

            {/* Modal Backdrop & Dialog */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden relative animate-in zoom-in-95 duration-200">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Modal Header */}
                        <div className="p-6 pb-4 border-b border-gray-100">
                            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                                Zillow Instant Tour
                            </span>
                            <h3 className="text-xl font-black text-gray-900 leading-snug">
                                Schedule a Showing
                            </h3>
                            <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">
                                {propertyTitle} • {propertyAddress}
                            </p>
                        </div>

                        {isConfirmed ? (
                            <div className="p-10 text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-black text-gray-900">Tour Request Sent!</h4>
                                <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">
                                    {agentName} has been notified for your {tourType === 'in-person' ? 'In-Person' : 'Video'} tour on <strong>{selectedDate} ({selectedTime})</strong>.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleConfirm} className="p-6 space-y-5">
                                {/* 1. Tour Type Selector */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                                        Select Tour Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setTourType('in-person')}
                                            className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                                tourType === 'in-person'
                                                    ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-sm'
                                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <UserCheck className="w-4 h-4" /> In-Person
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTourType('video')}
                                            className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                                tourType === 'video'
                                                    ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-sm'
                                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Video className="w-4 h-4" /> Video Chat
                                        </button>
                                    </div>
                                </div>

                                {/* 2. Date Picker Carousel */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                                        Select Day
                                    </label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {dates.map((d) => (
                                            <button
                                                key={d.label}
                                                type="button"
                                                onClick={() => setSelectedDate(d.label)}
                                                className={`p-2.5 rounded-xl border text-center transition-all ${
                                                    selectedDate === d.label
                                                        ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-md'
                                                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                <span className="block text-[10px] uppercase font-semibold opacity-75">{d.day}</span>
                                                <span className="block text-xs font-black mt-0.5">{d.date.split(' ')[1]}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Time Slots */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                                        Select Time
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {times.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setSelectedTime(t)}
                                                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                                    selectedTime === t
                                                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Clock className="w-3 h-3 text-gray-400" />
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Buyer Contact */}
                                <div className="space-y-2 pt-2 border-t border-gray-100">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Full Name"
                                        value={buyerName}
                                        onChange={(e) => setBuyerName(e.target.value)}
                                        className="w-full text-xs font-medium px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Phone Number (for SMS confirmation)"
                                        value={buyerPhone}
                                        onChange={(e) => setBuyerPhone(e.target.value)}
                                        className="w-full text-xs font-medium px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    Confirm Tour for {selectedDate} ({selectedTime})
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
