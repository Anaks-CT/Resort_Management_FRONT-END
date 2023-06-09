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
    managerAuth: {token: string}
    userAuth: {token: string}
    currentResort: {
        resortId: string
        resortName: string
    }
}