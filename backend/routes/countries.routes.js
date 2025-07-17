const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/countries.controller");

router.post("/", countriesController.create);
router.get("/", countriesController.getAll);
router.get("/:id", countriesController.getById);
router.put("/:id", countriesController.update);
router.delete("/:id", countriesController.remove);

module.exports = router;
