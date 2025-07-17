const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departments.controller");

router.post("/", departmentsController.create);
router.get("/", departmentsController.getAll);
router.get("/:id", departmentsController.getById);
router.put("/:id", departmentsController.update);
router.delete("/:id", departmentsController.remove);

module.exports = router;
