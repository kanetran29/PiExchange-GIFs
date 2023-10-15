export interface GiphyUser {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface GiphyGif {
  type: string;
  id: string;
  url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  images: {
    original: GiphyImage;
  };
  user?: GiphyUser;
}

export interface GiphyImage {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface GiphyArrayResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export interface GiphyObjectResponse {
  data: GiphyGif;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

