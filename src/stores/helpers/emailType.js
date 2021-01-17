import { makeObservable, observable } from 'mobx'
import apiManager from '../../api'


export class EmailType {
    constructor() {
        this.types = []

        makeObservable(this,{
            types: observable
        })
    }

    populate = async () => {
        const types = await apiManager.getEmailTypes()
        this.types = types
    }
    byId = id => {
        const i = this.types.findIndex(e => e.id === id)
        if(this.types[i])
            return this.types[i].email_type
        return null
    }
    byName = name => {
        const i = this.types.findIndex(e => e.email_type === name)
        return this.types[i].id
    }
}