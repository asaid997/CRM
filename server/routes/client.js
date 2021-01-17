const express = require("express");
const router = express.Router();

const funcs = require("../SQLfuncs");

router.get("/", (request, response) =>
  funcs.sqlCall("SELECT * FROM client", response)
);
router.get("/:id", (request, response) =>
  funcs.sqlCall(
    `SELECT * FROM client WHERE id = ${request.params.id}`,
    response
  )
);

router.put("/", async (request, response) => {
  const { id, first, last, country } = request.body;
  let countryId = await funcs.findByID("country", "country", country);

  funcs.sqlCall(
    `UPDATE client
    SET first = "${first}", last = "${last}" , country_id = ${countryId}
    WHERE id = ${id}`,
    response
  );
});

module.exports = router;
