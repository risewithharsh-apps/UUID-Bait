export interface Asset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  size: string;
  uploadDate: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeoError {
  code: number;
  message: string;
}