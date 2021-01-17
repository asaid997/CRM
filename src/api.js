const axios = require('axios')

const promiseHandler = async pr => pr.then(data => data.data).catch(error => null)

module.exports = {
    getClients: async () => await promiseHandler(axios.get('http://localhost:3001/clients')),
    getClient: async id => await promiseHandler(axios.get(`http://localhost:3001/clients/${id}`)),
    cl_updateClient: async data => await promiseHandler(axios.put('http://localhost:3001/clients',data)),
    
    getCountries: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/get-countries')),
    getOwners: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/get-owners')),
    getEmailTypes: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/get-email-type')),
    
    ac_addClient: async client => await promiseHandler(axios.post('http://localhost:3001/actions/',client)),
    ac_transfer: async data => await promiseHandler(axios.put('http://localhost:3001/actions/email-type',data)),
    ac_declareSale: async data => await promiseHandler(axios.put('http://localhost:3001/actions/declare',data)),
    ac_changeOwner: async data => await promiseHandler(axios.put('http://localhost:3001/actions/owner',data)),
    
    
    dash_salesByDate: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/sales-by-date')),
    dash_salesByEmployee: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/sales-by-employess')),
    dash_salesByMonth: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/sales-by-months')),
    dash_salesByEmail: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/sales-by-email-type')),
    dash_salesByCountry: async () => await promiseHandler(axios.get('http://localhost:3001/dashboard/sales-by-country')),
}