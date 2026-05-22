// types.ts — shared types for the gallery component

export type ImageSrc = {
  src: string;
  srcThumb: string;
  width: number;
  height: number;
};

export type GalleryImage = {
  src: string;
  srcThumb: string;
  width: number;
  height: number;
  title: string;
  description?: string;
  medium?: string;
  year?: string;
  // all views of this artwork — single item if only one photo
  allSrcs: ImageSrc[];
  srcSet?: unknown;
  imageFit?: string;
};

export type GalleryProps = {
  images: GalleryImage[];
};