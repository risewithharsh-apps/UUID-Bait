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

export interface LocationLog {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  action: string;
}