import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  completed: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
});

export default mongoose.model<ITask>("Task", TaskSchema);
