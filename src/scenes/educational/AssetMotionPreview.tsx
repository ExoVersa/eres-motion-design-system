import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {MediaReveal} from '../../components/MediaReveal';

export const AssetMotionPreview: React.FC = () => {
  return (
    <AbsoluteFill>
      <MediaReveal
        src={staticFile('figma/select-open.png')}
        type="image"
        eyebrow="Eres Video Factory"
        title="Une idée devient une histoire."
        description="Images, mouvement, narration et identité de marque dans une même scène."
      />
    </AbsoluteFill>
  );
};