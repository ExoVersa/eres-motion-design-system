import type {VideoAsset} from '../../src/types/video';
import type {
  AssetProviderClient,
  AssetSearchRequest,
  AssetSearchResult,
} from '../asset-provider';

const API_URL = 'https://api.unsplash.com';

export const unsplashProvider: AssetProviderClient = {
  provider: 'unsplash',

  async search(
    request: AssetSearchRequest,
  ): Promise<AssetSearchResult[]> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      throw new Error('UNSPLASH_ACCESS_KEY is not configured');
    }

    const params = new URLSearchParams({
      query: request.query,
      per_page: String(request.limit ?? 10),
    });

    if (request.orientation) {
      params.set('orientation', request.orientation);
    }

    const response = await fetch(
      `${API_URL}/search/photos?${params.toString()}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Unsplash request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data.results.map((item: any): AssetSearchResult => {
      const author = item.user?.name ?? 'Unknown author';

      const asset: VideoAsset = {
        id: `unsplash-${item.id}`,
        type: 'image',
        provider: 'unsplash',
        sourceUrl: item.links?.html,
        author,
        license: 'Unsplash License',
        attribution: `Photo by ${author} on Unsplash`,
        alt: item.alt_description ?? request.query,
        metadata: {
          width: item.width,
          height: item.height,
        },
      };

      return {
        asset,
        previewUrl: item.urls?.regular ?? item.urls?.small,
        downloadUrl: item.urls?.full ?? item.urls?.regular,
        width: item.width,
        height: item.height,
      };
    });
  },
};
