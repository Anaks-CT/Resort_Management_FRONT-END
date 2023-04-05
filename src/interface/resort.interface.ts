export interface IResortDetail {
    name: string;
    heading: string;
    description: string;
    image: string
    features: string[];
  };
  
  export interface IResort{
    _id: string
    resortDetails: IResortDetail;
    manager?: string;
    location: string;
    email: string;
    customerCareNo: number;
    gallaryId?: string;
    active?: boolean
  }

  export interface IAddResort{
    image: string,
    name: string,
    heading: string,
    description: string,
    location: string,
    email: string,
    customerCareNo: string,
    features: string[],
    
  }