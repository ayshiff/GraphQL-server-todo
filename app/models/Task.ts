import mongoose, { model, Model } from "mongoose";
const { Schema } = mongoose;

/**
 * Interface used to check model type
 */
export interface ITaskModel extends mongoose.Document {
  content: string;
  isChecked: boolean;
}

/**
 * Here is the our task schema which will be used to
 * validate the data sent to our database.
 */
const taskSchema = new Schema({
  content: String,
  isChecked: Boolean
});

/**
 * This property will ensure our virtuals (including "id")
 * are set on the task when we use it.
 */
taskSchema.set("toObject", { getters: true, virtuals: true });

const Task: Model<ITaskModel> = model("task", taskSchema);

export default Task;
