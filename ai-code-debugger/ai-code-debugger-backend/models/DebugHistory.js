import mongoose from 'mongoose';

const debugHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  errors: { type: Array, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('DebugHistory', debugHistorySchema);