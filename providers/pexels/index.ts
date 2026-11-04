import type {VideoAsset} from '../../src/types/video';
import type {
  AssetProviderClient,
  AssetSearchRequest,
  AssetSearchResult,
} from '../asset-provider';

const API_URL = 'https://api.pexels.com';

export const pexelsProvider: AssetProviderClient = {
  provider: 'pexels',

  async search(
    request: AssetSearchRequest,
  ): Promise<AssetSearchResult[]> {
    const apiKey = process.env.PEXELS_API_KEY;

    if (!apiKey) {
      throw new Error('PEXELS_API_KEY is not configured');
    }

    const isVideo = request.mediaType === 'video';

    const params = new URLSearchParams({
      query: request.query,
      per_page: String(request.limit ?? 10),
    });

    if (request.orientation) {
      params.set('orientation', request.orientation);
    }

    const endpoint = isVideo
      ? `${API_URL}/videos/search`
      : `${API_URL}/v1/search`;

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Pexels request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (isVideo) {
      return data.videos.map((item: any): AssetSearchResult => {
        const author = item.user?.name ?? 'Unknown author';

        const files = (item.video_files ?? [])
          .filter((file: any) => file.file_type === 'video/mp4')
          .sort(
            (a: any, b: any) =>
              (b.width ?? 0) * (b.height ?? 0) -
              (a.width ?? 0) * (a.height ?? 0),
          );

        const selectedFile = files[0];

        const asset: VideoAsset = {
          id: `pexels-video-${item.id}`,
          type: 'video',
          provider: 'pexels',
          sourceUrl: item.url,
          author,
          license: 'Pexels License',
          attribution: `Video by ${author} on Pexels`,
          alt: request.query,
          metadata: {
            width: item.width,
            height: item.height,
            durationInSeconds: item.duration,
          },
        };

        return {
          asset,
          previewUrl: item.image,
          downloadUrl: selectedFile?.link,
          width: item.width,
          height: item.height,
          durationInSeconds: item.duration,
        };
      });
    }

    return data.photos.map((item: any): AssetSearchResult => {
      const author = item.photographer ?? 'Unknown author';

      const asset: VideoAsset = {
        id: `pexels-photo-${item.id}`,
        type: 'image',
        provider: 'pexels',
        sourceUrl: item.url,
        author,
        license: 'Pexels License',
        attribution: `Photo by ${author} on Pexels`,
        alt: item.alt ?? request.query,
        metadata: {
          width: item.width,
          height: item.height,
        },
      };

      return {
        asset,
        previewUrl: item.src?.large ?? item.src?.medium,
        downloadUrl: item.src?.original ?? item.src?.large,
        width: item.width,
        height: item.height,
      };
    });
  },
};
