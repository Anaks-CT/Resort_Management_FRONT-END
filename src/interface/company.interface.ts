export type circleBanner = {
  miniHeading: String;
  heading: String;
  description: String;
  image: String;
};
export interface ICompany {
  companyName: string;
  resortDetails?: string[];
  bannerDetails: {
    image: string;
    description: string;
  };
  circleBanners: circleBanner[];
  faqs: {
    _id: string
    Q: string;
    A: string;
  }[];
}
