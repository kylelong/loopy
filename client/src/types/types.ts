export interface Song {
  id?: number;
  link: string;
  genre: string;
  user: string;
  location: string;
  created_at?: string;
  hash?: string;
  onLandingPage?: boolean;
  caption?: string;
  source?: string;
}
