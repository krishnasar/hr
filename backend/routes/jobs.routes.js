const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs.controllers");

router.post("/", jobsController.create);
router.get("/", jobsController.getAll);
router.get("/:id", jobsController.getById);
router.put("/:id", jobsController.update);
router.delete("/:id", jobsController.remove);

module.exports = router;
