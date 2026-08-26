'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from '@/components/property/ImageLightbox';
import { PropertyImage } from '@/lib/api';

interface PropertyGalleryClientProps {
    images: PropertyImage[];
    title: string;
}

export default function PropertyGalleryClient({ images, title }: PropertyGalleryClientProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            {/* Zillow-style Mosaic Grid (1 Large, 4 Small) */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[50vh] min-h-[400px] mb-8 rounded-2xl overflow-hidden">
                {/* 1. Main Hero Image (Spans 2 cols, 2 rows) */}
                <div
                    className="md:col-span-2 md:row-span-2 relative cursor-pointer group bg-gray-100"
                    onClick={() => openLightbox(0)}
                >
                    {images[0] ? (
                        <Image
                            src={images[0].url}
                            alt={title || "Property Image"}
                            fill
                            priority
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}

                    {/* Zillow-style Floating Buttons (Desktop) */}
                    <div className="absolute bottom-4 left-4 flex gap-3 z-20">
                        <button className="bg-white/90 hover:bg-white text-[#2A2A33] px-4 py-1.5 rounded-[4px] font-bold text-xs uppercase tracking-wide shadow-md transition-all flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full border border-gray-400" />
                            See all photos ({images.length})
                        </button>
                    </div>

                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 text-[#2A2A33] text-xs font-bold px-3 py-1 rounded-[2px] uppercase tracking-wider shadow-sm">
                            For Sale
                        </span>
                    </div>
                </div>

                {/* 2. Top Right 1 */}
                <div className="hidden md:block relative cursor-pointer group bg-gray-100" onClick={() => openLightbox(1)}>
                    {images[1] ? (
                        <Image
                            src={images[1].url}
                            alt="Gallery 2"
                            fill
                            className="object-cover group-hover:brightness-90 transition-all"
                            sizes="25vw"
                        />
                    ) : null}
                </div>

                {/* 3. Top Right 2 (Corner) */}
                <div className="hidden md:block relative cursor-pointer group bg-gray-100" onClick={() => openLightbox(2)}>
                    {images[2] ? (
                        <Image
                            src={images[2].url}
                            alt="Gallery 3"
                            fill
                            className="object-cover group-hover:brightness-90 transition-all"
                            sizes="25vw"
                        />
                    ) : null}
                </div>

                {/* 4. Bottom Right 1 */}
                <div className="hidden md:block relative cursor-pointer group bg-gray-100" onClick={() => openLightbox(3)}>
                    {images[3] ? (
                        <Image
                            src={images[3].url}
                            alt="Gallery 4"
                            fill
                            className="object-cover group-hover:brightness-90 transition-all"
                            sizes="25vw"
                        />
                    ) : null}
                </div>

                {/* 5. Bottom Right 2 (Corner + "View All" Button) */}
                <div className="hidden md:block relative cursor-pointer group bg-gray-100" onClick={() => openLightbox(4)}>
                    {images[4] ? (
                        <Image
                            src={images[4].url}
                            alt="Gallery 5"
                            fill
                            className="object-cover group-hover:brightness-90 transition-all"
                            sizes="25vw"
                        />
                    ) : null}

                    {/* View All Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center z-10">
                        <button className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-[4px] font-bold text-sm shadow-lg backdrop-blur-sm transition-all flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-900 inline-block" />
                            Show all photos
                        </button>
                    </div>
                </div>
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={images}
                    initialIndex={photoIndex}
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    onIndexChange={setPhotoIndex}
                />
            )}
        </>
    );
}
