export interface ICompany{
    companyName: string;
    resortDetails?:  string[]
    bannerDetails: {
      image: string,
      description: string
    }
    faqs: {
      Q: string
      A: string
    }[]
  }