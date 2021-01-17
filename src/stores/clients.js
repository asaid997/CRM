import { observable, action, computed, makeAutoObservable } from "mobx"
import apiManager from "../api"
import { Client } from "./client"

export class ClientStore {
  constructor(countires, owners, emailType) {
    this.clients = []

    this.countires = countires
    this.owners = owners
    this.emailType = emailType

    this.populate()

    makeAutoObservable(this, {
      clients: observable,
      cl_updateClient: action,
      ac_addClient: action,
      ac_transfer: action,
      emails_sent: computed,
      outstanding_clients: computed,      
    })
  }

  get emails_sent () {
    let sum = 0
    this.clients.forEach(c => c.email_type_id && sum++  )
    return sum
  }
  get outstanding_clients () {
    let sum = 0
    this.clients.forEach(c => sum+= c.sold)
    return sum
  }

  populate = async () => {
    const clients = await apiManager.getClients()
    await this.countires.populate()
    await this.owners.populate()
    await this.emailType.populate()
    this.clients = clients.map(c =>new Client(c,this.countires.byId,this.owners.byId,this.emailType.byId))
  }

  cl_updateClient = async (id, first, last, country) => {
    const i = this.clients.findIndex((c) => c.id === id)
    return await this.clients[i].cl_updateClient(first, last, country)
  }
  ac_addClient = async (client) => {
    const result = await apiManager.ac_addClient(client)
    await this.populate()
    return result
  }

  getIndexByName = (name) => {
    const [first, last] = name.split(" ")
    const i = this.clients.findIndex(
      (c) => c.first === first && c.last === last
    )
    return i
  }

  ac_transfer = async (name, email_type) => {
    const i = this.getIndexByName(name)
    return await this.clients[i].ac_transfer(this.emailType.byName(email_type))
  }
  ac_declareSale = async (name) => {
    const i = this.getIndexByName(name)
    return await this.clients[i].ac_declareSale()
  }
  ac_changeOwner = async (name, owner) => {
    const i = this.getIndexByName(name)
    return await this.clients[i].ac_changeOwner(this.owners.byName(owner))
  }
}
