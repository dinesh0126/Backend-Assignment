const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const {
  projectCreateSchema,
  projectUpdateSchema,
  projectIdSchema,
} = require("../validators/project.validator");
const projectController = require("../controllers/project.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(projectCreateSchema), projectController.createProject);
router.get("/", projectController.listProjects);
router.get("/:id", validate(projectIdSchema), projectController.getProject);
router.put("/:id", validate(projectUpdateSchema), projectController.updateProject);
router.delete("/:id", validate(projectIdSchema), projectController.deleteProject);

module.exports = router;
