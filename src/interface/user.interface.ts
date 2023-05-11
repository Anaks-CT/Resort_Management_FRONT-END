export interface Iuser {
  _id: string
  points: number
  image?: string
  name: string;
  email: string;
  phone: string;
  password: string;
  type: "member" | "platinum" | "diamond"
  totalmoneySpent: number
  cPassword: string;
  bookings: string[]
  createdAt: Date
  status: boolean
  blockedBy: any
}

export interface ILoginInterface{ // not preferable personl  capital I  can be exteneed
  email: string,
  password: string
}