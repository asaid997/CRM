import { observable, action, makeAutoObservable } from 'mobx'
import apiManager from '../api'

export class Client {
    constructor (c,cById,oById,eById) {
        this.cById = cById
        this.oById = oById
        this.eById = eById
        
        this.assingNewValues(c)


        makeAutoObservable(this,{
            last: observable,
            first: observable,
            email: observable,
            sold: observable,
            date: observable,
            email_type_id: observable,
            owner_id: observable,
            country_id: observable,
            country: observable,
            owner: observable,
            email_type: observable,
            cl_updateClient: action,
            ac_transfer: action
        })
    }

    assingNewValues = (c) => {
        if(!c) return 
        this.id= c.id
        this.last= c.last
        this.first= c.first
        this.email= c.email
        this.sold= c.sold
        this.date= c.date
        this.email_type_id= c.email_type_id
        this.owner_id= c.owner_id
        this.country_id= c.country_id
        this.country= this.cById(c.country_id)
        this.owner= this.oById(c.owner_id)
        this.email_type = this.eById(c.email_type_id)
    }

    makeChange = async result => {
        if(result)
            this.assingNewValues((await apiManager.getClient(this.id))[0])
        return result
    }


    cl_updateClient = async (first,last,country) => this.makeChange(await apiManager.cl_updateClient({id: this.id,first,last,country}))
    ac_transfer = async emailTypeId => this.makeChange(await apiManager.ac_transfer({id: this.id, emailTypeId}))
    ac_declareSale = async () => this.makeChange(await apiManager.ac_declareSale({id: this.id}))
    ac_changeOwner = async ownerId => this.makeChange(await apiManager.ac_changeOwner({id: this.id,ownerId}))
}