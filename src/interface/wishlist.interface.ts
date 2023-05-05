

export interface IWishlist{
    _id?: string
    userId: string
    resortId: string
    resortName?: string
    roomDetail: string[];
    dates: {
        startDate: Date;
        endDate: Date;
        key: string;
    };
}


export interface IAddToWishlistData{
    resortId?: string
    noOfRooms: number
    noOfGuests: number
    dates: {
        startDate: Date
        endDate: Date
    }
}