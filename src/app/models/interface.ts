export interface AuthResponse {
  sub: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface Banner {
  imageUrl: string;
  title: string;
}

export interface BannerOffers extends Banner {
  subtitle: string;
}

export interface Card {
  imageUrl: string;
  title: string;
  subtitle: string;
  type: string;
}
