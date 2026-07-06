export interface ImageAuthor {
  name: string;
  username: string;
  avatar: string;
  portfolio_url: string | null;
}

export interface ImageDetails {
  id: string;
  url: string;
  thumb: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  author: ImageAuthor;
  likes: number;
  created_at: string;
  tags?: string[];
  views?: number;
  downloads?: number;
}

export interface Collection {
  id: string;
  name: string;
  coverImage?: string;
  imageIds: string[];
  createdAt: string;
}
