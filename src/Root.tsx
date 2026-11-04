import React from 'react';
import {Composition} from 'remotion';
import {EresShowreel} from './EresShowreel';

export const Root: React.FC = () => (
  <Composition
    id="EresShowreel"
    component={EresShowreel}
    durationInFrames={30 * 60}
    fps={60}
    width={1920}
    height={1080}
    defaultProps={{direction: 'premium-editorial'}}
  />
);
