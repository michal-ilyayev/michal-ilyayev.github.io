// types.ts — shared types for the visual arts gallery
// Location: src/components/gallery/types.ts

// A single optimised image src — used inside allSrcs for multi-view artworks
export type ImageSrc = {
  src: string;       // full-size webp
  srcThumb: string;  // thumbnail webp
  width: number;
  height: number;
};

// One artwork entry as passed to the Gallery component
export type GalleryImage = {
  src: string;         // primary full-size image (shown in lightbox)
  srcThumb: string;    // primary thumbnail (shown in grid)
  width: number;
  height: number;
  title: string;
  description?: string;
  medium?: string;     // e.g. "Oil on canvas" — shown in lightbox info panel
  year?: string;       // e.g. "2023"          — shown in lightbox info panel
  // all views of this artwork (primary + any extra angles)
  // single-photo artworks: allSrcs.length === 1
  // multi-view artworks:   allSrcs.length > 1 → inner carousel appears
  allSrcs: ImageSrc[];
  srcSet?: unknown;
  imageFit?: string;
};

export type GalleryProps = {
  images: GalleryImage[];
};