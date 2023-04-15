import mongoose, {Model, Schema} from 'mongoose';
import {Entry} from '../interfaces/entry';

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  createdAt: {type: Number, required: true},
  status: {
    type: String,
    enum: {
      values: ['pending', 'inProgress', 'finished'],
      message: '{VALUE} no es un estado permitido',
    },
    default: 'pending',
  },
});

const entryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default entryModel;
