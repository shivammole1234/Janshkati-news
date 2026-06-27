export type Language = 'english' | 'marathi' | 'hindi';

export interface Author {
  name: string;
  avatar: string;
  role?: string;
  bio?: string;
}

export interface Article {
  id: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  content: Record<Language, string[]>;
  category: string; // e.g., 'politics', 'maharashtra', 'india', 'world', 'business', 'technology', 'sports', 'entertainment', 'lifestyle', 'education', 'health', 'science', 'opinion'
  city?: string; // e.g., 'pune', 'mumbai', 'jalgaon', 'dhule', 'bhusawal', 'nashik', 'nagpur', 'akola', 'satara', 'amravati'
  image: string;
  author: Author;
  date: string;
  updatedDate?: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  commentsCount: number;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isLive?: boolean;
  liveUpdates?: LiveUpdate[];
  videoUrl?: string; // If present, this is a video article
  imagesGallery?: string[]; // If present, this represents a photo gallery article
  columnist?: boolean; // True if this is an editorial opinion piece
  columnName?: Record<Language, string>;
}

export interface LiveUpdate {
  id: string;
  time: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  isPinned?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
  isVerified?: boolean;
  replies?: Comment[];
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export interface Poll {
  id: string;
  question: Record<Language, string>;
  options: {
    id: string;
    text: Record<Language, string>;
    votes: number;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isSubscribed: boolean;
  bookmarks: string[]; // article IDs
  history: string[]; // article IDs
  likedArticles: string[]; // article IDs
  followedCategories: string[];
  notifications: {
    breakingNews: boolean;
    dailyNewsletter: boolean;
    weeklyRoundup: boolean;
  };
}
