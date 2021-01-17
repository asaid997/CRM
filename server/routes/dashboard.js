const express = require('express')
const router = express.Router()

const funcs = require('../SQLfuncs')

router.get('/sales-by-country',(request, response) => funcs.sqlCall(`
    SELECT SUM(sold) AS sales , country_id
    FROM client
    GROUP BY country_id
    ORDER BY sales DESC
`,response))

router.get('/sales-by-date',(request, response) => funcs.sqlCall(`
    SELECT SUM(sold) AS sales ,  date
    FROM client
    GROUP BY date
    ORDER BY STR_TO_DATE(date, "%m/%d/%Y") DESC
`,response))

router.get('/sales-by-email-type',(request, response) => funcs.sqlCall(`
    SELECT SUM(sold) AS sales , email_type_id
    FROM client
    WHERE email_type_id IS NOT NULL
    GROUP BY email_type_id
    ORDER BY sales DESC
`,response))

router.get('/sales-by-months',(request, response) => funcs.sqlCall(`
    SELECT SUM(sold) AS sales ,  MONTHNAME(STR_TO_DATE(date, "%m/%d/%Y")) AS month
    FROM client
    GROUP BY month
    ORDER BY FIELD(MONTH,'January','February','March','April','May','June','July','August','September','October','November','December');
`,response))

router.get('/sales-by-employess',(request, response) => funcs.sqlCall(`
    SELECT SUM(sold) AS sales , owner_id
    FROM client
    GROUP BY owner_id
    ORDER BY sales DESC
`,response))

router.get('/get-countries',(request, response) => funcs.sqlCall(`SELECT * FROM country`,response))
router.get('/get-owners',(request, response) => funcs.sqlCall(`SELECT * FROM owner`,response))
router.get('/get-email-type',(request, response) => funcs.sqlCall(`SELECT * FROM email_type`,response))


module.exports = router
