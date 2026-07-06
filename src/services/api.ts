import { ImageDetails } from "@/types";
import { mockImages } from "@/constants/mockData";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "";
const UNSPLASH_API_URL = "https://api.unsplash.com";

// Helper function to map Unsplash raw data to our ImageDetails interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUnsplashData = (photo: any): ImageDetails => {
  return {
    id: photo.id,
    url: photo.urls.regular,
    thumb: photo.urls.small,
    width: photo.width,
    height: photo.height,
    color: photo.color,
    blur_hash: photo.blur_hash,
    description: photo.description || photo.alt_description,
    alt_description: photo.alt_description,
    author: {
      name: photo.user.name,
      username: photo.user.username,
      avatar: photo.user.profile_image.medium,
      portfolio_url: photo.user.portfolio_url,
    },
    likes: photo.likes,
    created_at: photo.created_at,
    tags: photo.tags?.map((t: { title: string }) => t.title) || [],
    views: photo.views,
    downloads: photo.downloads,
  };
};

export const fetchImages = async (
  page: number = 1,
  perPage: number = 20,
  query: string = ""
): Promise<{ images: ImageDetails[]; totalPages: number }> => {
  
  // Try to use API if key exists
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const endpoint = query 
        ? `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
        : `${UNSPLASH_API_URL}/photos?page=${page}&per_page=${perPage}&order_by=popular`;
        
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (query) {
        return {
          images: data.results.map(mapUnsplashData),
          totalPages: data.total_pages || 1,
        };
      } else {
        return {
          images: data.map(mapUnsplashData),
          totalPages: 100, // Unsplash returns max 1000 items in standard endpoint usually
        };
      }
    } catch (error) {
      console.warn("Failed to fetch from Unsplash, falling back to mock data.", error);
    }
  }

  // Fallback to mock data if no key or API failed
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockImages;
      if (query) {
        const lowerQuery = query.toLowerCase();
        filtered = mockImages.filter(
          (img) =>
            img.description?.toLowerCase().includes(lowerQuery) ||
            img.alt_description?.toLowerCase().includes(lowerQuery) ||
            img.tags?.some((t) => t.toLowerCase().includes(lowerQuery)) ||
            img.author.name.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Simulate pagination for mock data
      // For mock data, we just return the filtered data if page=1, else empty
      // To simulate infinite scroll, we can repeat mock data if no query, just to show how it works
      let results = filtered;
      if (!query && page > 1 && page <= 5) {
        results = mockImages.map(m => ({ ...m, id: `${m.id}-${page}` })); // duplicate with new ID
      } else if (page > 5 || (query && page > 1)) {
        results = [];
      }

      resolve({
        images: results,
        totalPages: query ? 1 : 5,
      });
    }, 800); // simulate network delay
  });
};
