const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:1234@localhost/crm')

function sqlCall(query,response){
    sequelize
    .query(query)
    .then(function ([results]) {
      response.send(results)
    })
    .catch(function(error){
        response.send(false)
    })
}

module.exports = {
    findByID: async (table, name, value) => {
        let query = `SELECT id FROM ${table} WHERE ${name} = "${value}"`
        let results = await sequelize.query(query)
        return results[0][0].id
    },
    sqlCall,
    updateActions: (col,newVal,id,response)=>{
        sqlCall(`
        UPDATE client
        SET ${col} = ${newVal}
        WHERE id = ${id}`
        ,response)
    }
}