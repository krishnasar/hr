const express = require("express");
const router = express.Router();
const locationsController = require("../controllers/locations.controller");

router.post("/", locationsController.create);
router.get("/", locationsController.getAll);
router.get("/:id", locationsController.getById);
router.put("/:id", locationsController.update);
router.delete("/:id", locationsController.remove);
module.exports = router;
