const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Deferred", "Cancelled", "In Progress"],
    default: "Pending",
  },
  dueDate: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (v) {
        return v >= Date.now();
      },
      message: props => `${props.value} should be greater than current date`,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
