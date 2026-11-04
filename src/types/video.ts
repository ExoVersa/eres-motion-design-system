export type VideoEngine = 'auto' | 'remotion' | 'hyperframes';

export type VideoFormat = 'landscape' | 'portrait' | 'square';

export type AssetProvider =
  | 'figma'
  | 'unsplash'
  | 'pexels'
  | 'pixabay'
  | 'wikimedia'
  | 'local'
  | 'ai-generated';

export type SceneKind =
  | 'hook'
  | 'voiceover'
  | 'text'
  | 'image'
  | 'video'
  | 'screen'
  | 'ui'
  | 'chart'
  | 'transition'
  | 'outro';

export interface VideoProject {
  id: string;
  title: string;
  description?: string;
  engine: VideoEngine;

  format: {
    type: VideoFormat;
    width: number;
    height: number;
    fps: number;
  };

  durationInSeconds?: number;

  brand: {
    theme: 'eres' | 'eres-entreprise' | 'eres-patrimoine' | 'academy';
    darkMode?: boolean;
    typography?: string;
  };

  assets: VideoAsset[];
  scenes: VideoScene[];
  audio?: AudioTrack[];
  captions?: CaptionTrack[];
  outputs?: VideoOutput[];
}

export interface VideoAsset {
  id: string;
  type: 'image' | 'video' | 'audio' | 'font' | 'logo' | 'icon';
  provider: AssetProvider;
  sourceUrl?: string;
  localPath?: string;
  author?: string;
  license?: string;
  attribution?: string;
  alt?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VideoScene {
  id: string;
  kind: SceneKind;
  startInSeconds: number;
  durationInSeconds: number;

  title?: string;
  narration?: string;
  assetIds?: string[];

  animation?: {
    entrance?: string;
    exit?: string;
    easing?: string;
    camera?: string;
    motionBlur?: boolean;
  };

  data?: Record<string, unknown>;
}

export interface AudioTrack {
  id: string;
  type: 'voiceover' | 'music' | 'sound-design';
  assetId?: string;
  startInSeconds: number;
  durationInSeconds?: number;
  volume?: number;
  fadeInSeconds?: number;
  fadeOutSeconds?: number;
}

export interface CaptionTrack {
  id: string;
  language: string;
  words: CaptionWord[];
  style?: 'eres' | 'minimal' | 'social';
}

export interface CaptionWord {
  text: string;
  startInSeconds: number;
  endInSeconds: number;
}

export interface VideoOutput {
  format: VideoFormat;
  width: number;
  height: number;
  fps: number;
  codec?: 'h264' | 'vp9' | 'prores';
  filename: string;
}