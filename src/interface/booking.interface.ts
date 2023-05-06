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

export interface IBooking{
    id?: string
    userId: string
    resortId: string
    BookingDate?: Date,
    checkInDate: Date
    checkOutDate: Date
    roomDetail: [
        {
            roomType: string
            roomId: string
            roomName: string
            roomNumber: string,
            packageName: string,
            packageCost: number
        }
    ],
    amount: {
        roomCost: number,
        taxCost: number,
        pointsUsed: number,
        totalCost: number,
    },

}

export interface IBookingDetail{
    BookingDate: string
    amount:IAmountDetail
    checkInDate: string
    checkOutDate: string
    createdAt: string
    email: string
    name: string
    phone: number
    resortName: string
    roomDetail: IRoomDetails[]
    _id: string
}

export interface IAmountDetail {
    pointsUsed: number
    taxCost: number
    totalCost: number
    totalRoomCost: number
}

export interface IRoomDetails{
    packageCost: number
    packagename: string
    roomId: string
    roomName: string
    roomNumber: string
    roomTypeId: string
    _id: string
}