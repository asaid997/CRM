import { makeObservable, observable } from 'mobx'
import apiManager from '../../api'


export class Countires {
    constructor() {
        this.countries = []

        makeObservable(this,{
            countries: observable
        })
    }

    populate = async () => {
        const countries = await apiManager.getCountries()
        this.countries = countries
    }
    byId = id => {
        const i = this.countries.findIndex(c => c.id === id)
        if(this.countries[i])
            return this.countries[i].country
        return null
    }
    byName = name => {
        const i = this.countries.findIndex(c => c.name === name)
        return this.countries[i].id
    }
}