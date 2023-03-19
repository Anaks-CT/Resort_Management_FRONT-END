export interface IResortDetail {
    name: string;
    heading: string;
    description: string;
    image: string
    features: string[];
  };
  
  export interface IResort{
    resortDetails: IResortDetail;
    manager?: string;
    location: string;
    email: string;
    customerCareNo: number;
    gallaryId?: string;
  }