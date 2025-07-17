const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employees.controller");

router.post("/", employeesController.create);
router.get("/", employeesController.getAll);
router.get("/:id", employeesController.getById);
router.put("/:id", employeesController.update);
router.delete("/:id", employeesController.remove);

module.exports = router;
