'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';

interface ImageLightboxProps {
    images: { url: string }[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onIndexChange: (index: number) => void;
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose, onIndexChange }: ImageLightboxProps) {
    const nextImage = useCallback(() => {
        onIndexChange((initialIndex + 1) % images.length);
    }, [initialIndex, images.length, onIndexChange]);

    const prevImage = useCallback(() => {
        onIndexChange((initialIndex - 1 + images.length) % images.length);
    }, [initialIndex, images.length, onIndexChange]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return; // Guard inside the effect

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // Prevent scroll

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto'; // Restore scroll
        };
    }, [isOpen, onClose, nextImage, prevImage]);

    if (!isOpen) return null;

    const currentImage = images?.[initialIndex];
    if (!currentImage) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-sm flex items-center justify-center animate-fade-in">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-50">
                <div className="text-sm font-medium opacity-80">
                    {initialIndex + 1} / {images.length}
                </div>
                <div className="flex gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors bg-white/10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Navigation Buttons (Desktop) */}
            <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all hidden md:block"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all hidden md:block"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <div className="w-full h-full flex items-center justify-center p-4 md:p-12" onClick={onClose}>
                <div
                    className="relative max-w-full max-h-full"
                    onClick={(e) => e.stopPropagation()} // Prevent close on image click
                >
                    <img
                        src={currentImage.url}
                        alt={`Property image ${initialIndex + 1}`}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            </div>

            {/* Thumbnail Strip (Optional, good for "PhD" level) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => onIndexChange(idx)}
                        className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === initialIndex ? 'border-brand-500 opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                            }`}
                    >
                        <img src={img.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
