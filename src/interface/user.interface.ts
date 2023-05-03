export interface Iuser {
  image?: string
  name: string;
  email: string;
  phone: string;
  password: string;
  cPassword: string;
}

export interface ILoginInterface{ // not preferable personl  capital I  can be exteneed
  email: string,
  password: string
}