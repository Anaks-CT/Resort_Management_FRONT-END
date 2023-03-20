
export interface IBannerDetails{
    image: string,
    description1: string,
    description2: string
}

export interface IGallary extends Document {
  resortid?: string;
  largeBanner: IBannerDetails[];
  smallBanner: IBannerDetails[];
  communityPics: string[]
}

