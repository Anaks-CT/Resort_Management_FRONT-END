
export interface IRoom{
    _id?: string
    name: string
    description: string
    area: number
    resortId: string
    images: string[]
    packages: [{
        packageName: string
        cost: number
        features: string[]
    }],
    maxPeople: number
    roomNumbers: {number: number, unavailableDates: Date[]}[]
    highlights: string[]
    amenities: string[]
    facilities: string[]
    active?: true
}

export interface IAddRoom{
    images: string[]
    name: string
    description: string
    area: string
    resortId: string
    packages: [{
        packageName: string
        cost: string
        features: string[]
    }], 
    maxPeople: string
    noOfRooms: string
    highlights: string[]
    amenities: string[]
    facilities: string[]
}