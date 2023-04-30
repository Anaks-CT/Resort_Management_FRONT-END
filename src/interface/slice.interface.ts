import { IGallary } from "./gallary.interface"
import { IResort } from "./resort.interface"

export interface IStore{
    resort:{
        resortId: string
        resortName: string
        
    },
    gallary:IGallary,
    allResort: IResort[] | null
    adminAuth: {token: string}
    userAuth: {token: string}
}