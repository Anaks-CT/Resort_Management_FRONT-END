export interface IBookingForm1{
    destination: {
        name: string;
        id: string;
    };
    roomDetail: string[];
    date: {
        startDate: Date;
        endDate: Date;
        key: string;
    };
}