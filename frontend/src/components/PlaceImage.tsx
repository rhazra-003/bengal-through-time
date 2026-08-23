import React, { useState } from 'react';

interface PlaceImageProps {
  placeName: string;
  slug: string;
}

export const PlaceImage: React.FC<PlaceImageProps> = ({ placeName, slug }) => {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const imagePath = `/images/places/${slug}.jpg`;

  return (
    <figure className="overflow-hidden rounded-xl border border-parchment-300 bg-parchment-200 shadow-sm">
      {!imageUnavailable ? (
        <img
          src={imagePath}
          alt={`${placeName} in a historical black-and-white photograph`}
          className="aspect-[16/9] w-full object-cover grayscale contrast-110"
          loading="lazy"
          onError={() => setImageUnavailable(true)}
        />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-stone-800 px-6 text-center">
          <p className="font-serif text-sm text-parchment-100/80">
            Historical photograph unavailable for {placeName}.
          </p>
        </div>
      )}
      <figcaption className="border-t border-parchment-300 px-4 py-2 text-[11px] text-ink-light">
        Archival view of {placeName}
      </figcaption>
    </figure>
  );
};
