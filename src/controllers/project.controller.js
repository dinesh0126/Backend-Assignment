const { asyncHandler } = require("../utils/asyncHandler");
const projectService = require("../services/project.service");

const createProject = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const project = await projectService.createProject({
    title,
    description,
    status,
    owner: req.user.id,
    tenantId: req.user.tenantId,
  });

  res.status(201).json(project);
});

const listProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.listProjects({
    owner: req.user.id,
    tenantId: req.user.tenantId,
  });

  res.status(200).json(projects);
});

const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById({
    id: req.params.id,
    owner: req.user.id,
    tenantId: req.user.tenantId,
  });

  res.status(200).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject({
    id: req.params.id,
    owner: req.user.id,
    tenantId: req.user.tenantId,
    update: req.body,
  });

  res.status(200).json(project);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await projectService.deleteProject({
    id: req.params.id,
    owner: req.user.id,
    tenantId: req.user.tenantId,
  });

  res.status(200).json({
    message: "Project deleted",
    project,
  });
});

module.exports = {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
};
