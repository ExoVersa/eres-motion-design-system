import type {VideoAsset} from '../src/types/video';

export type AssetMediaType = 'image' | 'video';

export interface AssetSearchRequest {
  query: string;
  mediaType: AssetMediaType;
  limit?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
  language?: string;
}

export interface AssetSearchResult {
  asset: VideoAsset;
  previewUrl: string;
  downloadUrl?: string;
  width?: number;
  height?: number;
  durationInSeconds?: number;
}

export interface AssetProviderClient {
  provider: 'unsplash' | 'pexels' | 'pixabay' | 'wikimedia' | 'local';
  search(request: AssetSearchRequest): Promise<AssetSearchResult[]>;
}
