import React, { useState, useRef, useMemo, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';

// Photo Album
import { ColumnsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/columns.css';

// Lightbox + plugins
import Lightbox, { type Slide } from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';

// CSS: Lightbox + plugins
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import './Gallery.scss';

import type { GalleryProps } from './types.ts';
import { THUMB_SIZE } from './consts.ts';


type Callback<T = void> = [T] extends [void] ? () => void : (props: T) => void;

interface CaptionsRef {
  /** if `true`, captions are visible */
  visible: boolean;
  /** show captions */
  show: Callback;
  /** hide captions */
  hide: Callback;
}

interface SlideShowRef {
  /** current slideshow playback status */
  playing: boolean;
  /** if `true`, the slideshow playback is disabled */
  disabled: boolean;
  /** start the slideshow playback */
  play: Callback;
  /** pause the slideshow playback */
  pause: Callback;
}

interface ThumbnailsRef {
  /** if `true`, thumbnails are visible */
  visible: boolean;
  /** show thumbnails */
  show: Callback;
  /** hide thumbnails */
  hide: Callback;
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {

  // Index of the current slide
  const [index, setIndex] = useState(-1);

  // Refs for the lightbox plugins
  const slideShowRef = useRef<SlideShowRef>(null);
  const captionsRef = useRef<CaptionsRef>(null);
  const thumbnailsRef = useRef<ThumbnailsRef>(null);

  const [showThumbnails, setShowThumbnails] = useLocalStorageState<boolean>('showThumbnails', {defaultValue: false});
  const [showCaptions, setShowCaptions] = useLocalStorageState<boolean>('showCaptions', {defaultValue: false});

  // Remember the last state of the thumbnails visibility
  const thumbnailsVisible = thumbnailsRef.current?.visible;
  useEffect(() => {
    if (thumbnailsVisible !== undefined) {
      setShowThumbnails(thumbnailsVisible);
      }
  }, [thumbnailsVisible]);

  // Remember the last state of the captions visibility
  const captionsVisible = captionsRef.current?.visible;
  useEffect(() => {
    if (captionsVisible !== undefined) {
      setShowCaptions(captionsVisible);
    }
  }, [captionsVisible]);

  const slides: Slide[] = useMemo(() => {
    return images.map((image) => ({
      type: 'image',
      src: image.src,
      width: image.width,
      height: image.height,
      alt: image.title,
      title: image.title,
      description: image.description,
      srcSet: image.srcSet,
      imageFit: image.imageFit || 'contain',
    }));
  }, [images]);

  const thumbnails = useMemo(() => {
    return images.map((image) => ({
      src: image.srcThumb ? image.srcThumb : image.src,
      width: image.width,
      height: image.height,
      imageFit: 'contain',
      alt: image.title,
      title: image.title
    }));
  }, images);

  const isSingleImage = images.length === 1;

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <ColumnsPhotoAlbum
          photos={thumbnails}
          columns={(width) => Math.max(width / THUMB_SIZE, 1)}
          spacing={10}
          padding={10}
          onClick={({ index }) => setIndex(index)}
        />
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        on={{
          click: () => {
            // stop slideshow on click
            if (slideShowRef.current?.playing) {
              slideShowRef.current?.pause();
            }
          }
        }}
        index={index}

        carousel={{
          finite: isSingleImage,
          preload: isSingleImage ? 0 : Math.min(images.length, 2),
          imageFit: 'contain',
          padding: '20px',
          spacing: 0,
        }}

        render={{
          // hide navigation buttons for single image
          buttonPrev: isSingleImage ? () => null : undefined,
          buttonNext: isSingleImage ? () => null : undefined,
        }}

        animation={{}}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5,
        }}

        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true
        }}

        captions={{
          ref: captionsRef,
          hidden: !showCaptions,
          showToggle: true,
          descriptionTextAlign: 'start',
          descriptionMaxLines: 5
        }}

        thumbnails={{
          ref: thumbnailsRef,
          hidden: !showThumbnails || images.length < 3,
          position: 'bottom',
          showToggle: images.length >= 3,
          vignette: true
        }}

        slideshow={{
          ref: slideShowRef,
          autoplay: false,
          delay: 3000
        }}

        // enable optional lightbox plugins
        plugins={[Fullscreen, Zoom, Captions, Thumbnails, Slideshow]}
      />
    </>
  );
};

export default Gallery;