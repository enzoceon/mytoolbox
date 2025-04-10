
// Define the QR code options types to match the requirements of qr-code-styling library

export type DotsType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornersSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornersDotsType = 'square' | 'dot';
export type GradientType = 'linear' | 'radial';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type Mode = 'Byte';
export type Extension = 'svg' | 'png' | 'jpeg' | 'webp';
export type TypeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;

export interface QRCodeOptions {
  width: number;
  height: number;
  type: 'svg' | 'canvas';
  data: string;
  margin: number;
  qrOptions: {
    typeNumber: TypeNumber;
    mode: Mode;
    errorCorrectionLevel: ErrorCorrectionLevel;
  };
  imageOptions: {
    hideBackgroundDots: boolean;
    imageSize: number;
    crossOrigin?: 'anonymous';
    margin: number;
  };
  dotsOptions: {
    type: DotsType;
    color: string;
    gradient?: {
      type: GradientType;
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  cornersSquareOptions: {
    type: CornersSquareType;
    color: string;
    gradient?: {
      type: GradientType;
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  cornersDotOptions: {
    type: CornersDotsType;
    color: string;
    gradient?: {
      type: GradientType;
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  backgroundOptions: {
    color: string;
    gradient?: {
      type: GradientType;
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  image?: string;
}

export interface QrCodeTemplate {
  name: string;
  options: QRCodeOptions;
}
