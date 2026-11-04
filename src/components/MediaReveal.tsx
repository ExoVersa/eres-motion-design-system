import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type MediaRevealProps = {
  src: string;
  type?: 'image' | 'video';
  eyebrow?: string;
  title?: string;
  description?: string;
  accent?: string;
};

export const MediaReveal: React.FC<MediaRevealProps> = ({
  src,
  type = 'image',
  eyebrow,
  title,
  description,
  accent = '#00EAB4',
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const progress = frame / Math.max(durationInFrames - 1, 1);

  const scale = interpolate(progress, [0, 1], [1.04, 1.16]);
  const translateX = interpolate(progress, [0, 1], [-18, 18]);
  const translateY = interpolate(progress, [0, 1], [12, -12]);

  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    inset: -40,
    width: 'calc(100% + 80px)',
    height: 'calc(100% + 80px)',
    objectFit: 'cover',
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    filter: 'saturate(0.92) contrast(1.04)',
  };

  return (
    <AbsoluteFill style={{backgroundColor: '#0C1F1C', opacity}}>
      {type === 'video' ? (
        <OffthreadVideo src={src} style={mediaStyle} />
      ) : (
        <Img src={src} style={mediaStyle} />
      )}

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(0,20,17,.88) 0%, rgba(0,20,17,.42) 48%, rgba(0,20,17,.08) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(0deg, rgba(0,20,17,.72) 0%, transparent 42%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          bottom: 120,
          color: '#FFFFFF',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {eyebrow && (
          <div
            style={{
              color: accent,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        )}

        {title && (
          <div
            style={{
              maxWidth: 1050,
              fontSize: 78,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
        )}

        {description && (
          <div
            style={{
              maxWidth: 780,
              marginTop: 26,
              color: '#D5E8E0',
              fontSize: 28,
              lineHeight: 1.3,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          bottom: 64,
          height: 4,
          borderRadius: 8,
          backgroundColor: 'rgba(255,255,255,.22)',
        }}
      >
        <div
          style={{
            width: `${Math.max(4, progress * 100)}%`,
            height: '100%',
            borderRadius: 8,
            backgroundColor: accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
