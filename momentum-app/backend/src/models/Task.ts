import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITask>("Task", TaskSchema);
