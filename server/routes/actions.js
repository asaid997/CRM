const express = require('express')
const router = express.Router()

const funcs = require('../SQLfuncs')
const moment = require('moment')


router.put('/owner',(request, response) => {
    const {ownerId,id} = request.body
    funcs.updateActions("owner_id",ownerId,id,response)
})
router.put('/declare',(request, response) => {
    const {id} = request.body
    funcs.updateActions("sold",1,id,response)
})
router.put('/email-type',(request, response) => {
    const {emailTypeId,id} = request.body
    funcs.updateActions("email_type_id",emailTypeId,id,response)
})

router.get('/owners',(request, response) => funcs.sqlCall("SELECT * FROM owner",response))

router.post('/',async (request, response) => {
    const {first,last,country,ownerId,email} = request.body
    let countryId = await funcs.findByID('country', 'country', country)

    funcs.sqlCall(`
    INSERT INTO client
    VALUES(null, "${last}", "${first}", "${email}", 0, "${moment().format("MM/DD/YYYY")}",null, ${ownerId}, ${countryId})
    `,response)
})

module.exports = router