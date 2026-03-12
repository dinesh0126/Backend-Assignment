const Project = require("../models/Project");
const { ApiError } = require("../utils/ApiError");

const createProject = async ({ title, description, status, owner, tenantId }) => {
  const project = await Project.create({ title, description, status, owner, tenantId });
  return project;
};

const listProjects = async ({ owner, tenantId }) => {
  return Project.find({ owner, tenantId }).sort({ createdAt: -1 });
};

const getProjectById = async ({ id, owner, tenantId }) => {
  const project = await Project.findOne({ _id: id, owner, tenantId });
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return project;
};

const updateProject = async ({ id, owner, tenantId, update }) => {
  const project = await Project.findOneAndUpdate(
    { _id: id, owner, tenantId },
    update,
    { new: true }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

const deleteProject = async ({ id, owner, tenantId }) => {
  const project = await Project.findOneAndDelete({ _id: id, owner, tenantId });
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return project;
};

module.exports = {
  createProject,
  listProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
