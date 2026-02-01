import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  createdAt: Date;
  expiresAt?: Date;
  notified: boolean;
  share?: {
    isPublic: boolean;
    token: string;
    permission: "view" | "edit";
  };
}

const TaskSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  completed: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  notified: { type: Boolean, default: false },
});

export default mongoose.model<ITask>("Task", TaskSchema);
