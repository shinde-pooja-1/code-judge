import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    statement: {
      type: String,
      required: true,
      trim: true,
    },
    inputFormat: {
      type: String,
      required: true,
      trim: true,
    },
    outputFormat: {
      type: String,
      required: true,
      trim: true,
    },
    constraints: {
      type: [String],
      default: [],
    },
    samples: {
      type: [
        {
          input: { type: String, required: true, trim: true },
          output: { type: String, required: true, trim: true },
          explanation: { type: String, default: "", trim: true },
        },
      ],
      default: [],
    },
    hiddenTests: {
      type: [
        {
          input: { type: String, required: true, trim: true },
          output: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    starterCode: {
      javascript: {
        type: String,
        default: "function twoSum(nums, target) {\n  \n}",
      },
      python: {
        type: String,
        default: "def twoSum(nums, target):\n    pass",
      },
      cpp: {
        type: String,
        default:
          "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    \n}",
      },
    },
  },
  { timestamps: true },
);

const Problem =
  mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);

export default Problem;
