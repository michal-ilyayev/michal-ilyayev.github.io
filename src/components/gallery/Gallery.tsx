import React, { useState, useRef, useMemo, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';

// Photo Album
import { ColumnsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/columns.css';

// Lightbox + plugins
import Lightbox, { type Slide } from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';

// CSS
import 'yet-another-react-lightbox/styles.css';
import './Gallery.scss';

import type { GalleryProps, GalleryImage } from './types.ts';
import { THUMB_SIZE } from './consts.ts';

type Callback<T = void> = [T] extends [void] ? () => void : (props: T) => void;
interface SlideShowRef {
  playing: boolean; disabled: boolean;
  play: Callback; pause: Callback;
}

// ── CUSTOM SLIDE ─────────────────────────────────────────────────────────────
// Replaces the default yarl slide entirely so we control the layout
const ArtSlide: React.FC<{ image: GalleryImage }> = ({ image }) => {
  const [viewIndex, setViewIndex] = useState(0);
  const hasMultiple = image.allSrcs.length > 1;
  const current = image.allSrcs[viewIndex] ?? image.allSrcs[0];

  return (
    <div className="as-wrap">

      {/* ── main image ── */}
      <div className="as-img-wrap">
        <img
          src={current.src}
          alt={`${image.title}${hasMultiple ? ` — view ${viewIndex + 1}` : ''}`}
          className="as-img"
        />
      </div>

      {/* ── info panel ── */}
      <div className="as-info">
        <div className="as-info__top">
          <h2 className="as-title">{image.title}</h2>
          {(image.medium || image.year) && (
            <p className="as-meta">{[image.medium, image.year].filter(Boolean).join(' · ')}</p>
          )}
          {image.description && (
            <p className="as-desc">{image.description}</p>
          )}
        </div>

        {/* inner carousel thumbnails — only shown for multi-view artworks */}
        {hasMultiple && (
          <div className="as-thumbs">
            <p className="as-thumbs__label">
              {viewIndex + 1} / {image.allSrcs.length} views
            </p>
            <div className="as-thumbs__strip">
              {image.allSrcs.map((s, i) => (
                <button
                  key={i}
                  className={`as-thumb ${i === viewIndex ? 'as-thumb--active' : ''}`}
                  onClick={() => setViewIndex(i)}
                  aria-label={`View ${i + 1}`}
                >
                  <img src={s.srcThumb} alt="" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// ── GALLERY ───────────────────────────────────────────────────────────────────
const Gallery: React.FC<GalleryProps> = ({ images }) => {

  const [index, setIndex] = useState(-1);
  const slideShowRef = useRef<SlideShowRef>(null);

  const slides: Slide[] = useMemo(() => images.map((image) => ({
    type: 'image',
    src: image.src,
    width: image.width,
    height: image.height,
    alt: image.title,
  })), [images]);

  const thumbnails = useMemo(() => images.map((image) => ({
    src: image.srcThumb ?? image.src,
    width: image.width,
    height: image.height,
    alt: image.title,
  })), images);

  const isSingleImage = images.length === 1;
  const currentImage  = index >= 0 ? images[index] : null;

  if (images.length === 0) return null;

  return (
    <>
      {/* ── GRID ────────────────────────────────────────────────── */}
      <ColumnsPhotoAlbum
        photos={thumbnails}
        columns={(width) => Math.max(width / THUMB_SIZE, 1)}
        spacing={10}
        padding={10}
        onClick={({ index: i }) => setIndex(i)}
      />

      {/* ── LIGHTBOX ────────────────────────────────────────────── */}
      <Lightbox
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        on={{
          click: () => { if (slideShowRef.current?.playing) slideShowRef.current.pause(); },
          view: ({ index: i }) => setIndex(i), // keep in sync for close/reopen
        }}
        carousel={{
          finite: isSingleImage,
          preload: isSingleImage ? 0 : Math.min(images.length, 2),
          padding: 0,
          spacing: 0,
        }}
        render={{
          buttonPrev: isSingleImage ? () => null : undefined,
          buttonNext: isSingleImage ? () => null : undefined,
          // offset === 0 means this is the active slide
          // using offset avoids the 1-frame state lag when navigating
          slide: ({ slide, offset }) => {
            if (offset !== 0) return null; // only render active slide
            const slideIndex = slides.findIndex(s => s.src === slide.src);
            const img = images[slideIndex >= 0 ? slideIndex : index];
            return img ? <ArtSlide image={img} /> : null;
          },
        }}
        animation={{}}
        zoom={{ scrollToZoom: true, maxZoomPixelRatio: 5 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        slideshow={{ ref: slideShowRef, autoplay: false, delay: 3000 }}
        plugins={[Fullscreen, Zoom, Slideshow]}
      />

      {/* ── STYLES ──────────────────────────────────────────────── */}
      <style>{`
        /* full-size slide wrapper — fills the yarl backdrop */
        .as-wrap {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* image takes most of the space */
        .as-img-wrap {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 1.5rem;
          min-width: 0;
        }

        .as-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 0.5rem;
        }

        /* info panel — right side on desktop */
        .as-info {
          flex: 0 0 240px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem 1.4rem;
          background: rgba(10, 5, 20, 0.75);
          backdrop-filter: blur(10px);
          border-left: 1px solid rgba(255,255,255,0.07);
          overflow-y: auto;
          gap: 1rem;
        }

        .as-info__top { display: flex; flex-direction: column; gap: 0.5rem; }

        .as-title {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 1.3rem;
          font-weight: 400;
          color: #fff;
          margin: 0;
          line-height: 1.3;
        }

        .as-meta {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a89ec0;
          margin: 0;
        }

        .as-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: #ccc;
          margin: 0;
        }

        /* inner carousel thumbnails */
        .as-thumbs {
          border-top: 0.5px solid rgba(255,255,255,0.1);
          padding-top: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .as-thumbs__label {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a89ec0;
          margin: 0;
        }

        .as-thumbs__strip {
          display: flex;
          flex-direction: column; /* stacked vertically on the right */
          gap: 6px;
        }

        .as-thumb {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
          padding: 0;
          background: rgba(255,255,255,0.05);
          cursor: pointer;
          transition: border-color 0.15s;
        }

        .as-thumb img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .as-thumb--active { border-color: #7065f9; }
        .as-thumb:hover:not(.as-thumb--active) { border-color: rgba(112,101,249,0.4); }

        /* ── mobile — stack vertically ── */
        @media (max-width: 680px) {
          .as-wrap { flex-direction: column; }

          .as-img-wrap { flex: 1 1 55%; padding: 1rem; }

          .as-info {
            flex: 0 0 auto;
            flex-direction: row;
            flex-wrap: wrap;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.07);
            padding: 1rem;
            gap: 0.75rem;
          }

          .as-info__top { flex: 1 1 60%; }

          .as-thumbs {
            flex: 0 0 auto;
            border-top: none;
            border-left: 0.5px solid rgba(255,255,255,0.1);
            padding-top: 0;
            padding-left: 0.75rem;
          }

          .as-thumbs__strip {
            flex-direction: row; /* horizontal on mobile */
            flex-wrap: wrap;
          }

          .as-thumb { width: 52px; aspect-ratio: 1; }
        }
      `}</style>
    </>
  );
};

export default Gallery;