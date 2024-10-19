import type { ImageMetadata } from "astro";


export type ImageSource = {
  // image URL
  src: string;

  // image width in pixels
  width: number;

  // image height in pixels
  height: number;
};

export type GalleryImage = ImageSource & {
  // thumbnail image URL
  srcThumb?: string;

  // image title
  title: string;

  // optional image description
  description?: string;

  // responsive image sources
  srcSet?: ImageSource[];

  imageFit?: 'cover' | 'contain';
};


export type GalleryProps = {
  images: GalleryImage[];
};
