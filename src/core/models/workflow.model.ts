import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkflowSchema = new Schema(
  {
    name: {
      // entire workflow schema name
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    created_by: {
      type: String,
      required: true,
    },
    initiators: {
      type: Array(String),
      default: [],
    },
    stages: [
      {
        name: {
          // name of the particular stage
          type: String,
          required: true,
        },
        description: {
          // description of the form stage
          type: String,
        },
        ordinality: {
          // the sequence number of the stage that determines order of the multistaged forms
          type: Number,
          required: true,
        },
        fields: [
          {
            type: Schema.Types.Mixed,
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Workflow = mongoose.model("workflows", WorkflowSchema);

export default Workflow;
