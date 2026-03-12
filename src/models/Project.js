const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: {
      type: String,
      required: true,
      enum: ["planned", "in_progress", "completed", "archived"],
      default: "planned",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tenantId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

projectSchema.index({ owner: 1, tenantId: 1 });

module.exports = mongoose.model("Project", projectSchema);
