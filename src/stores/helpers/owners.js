import { makeObservable, observable } from 'mobx'
import apiManager from '../../api'


export class Owners {
    constructor() {
        this.owners = []

        makeObservable(this,{
            owners: observable
        })
    }

    populate = async () => {
        const owners = await apiManager.getOwners()
        this.owners = owners
    }
    byId = id => {
        const i = this.owners.findIndex(o => o.id === id)
        if(this.owners[i])
            return this.owners[i].owner
        return null
    }
    byName = name => {
        const i = this.owners.findIndex(o => o.owner === name)
        if(this.owners[i])
            return this.owners[i].id
        return null
    }
}