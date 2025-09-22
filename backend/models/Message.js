import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema(
  {
    url: { type: String, required: true }, // Supabase public URL
    type: { type: String }, // MIME type, e.g. image/png, video/mp4
    name: { type: String }, // Original filename
  },
  { _id: false }
);

const MessageSchema = new Schema({
  conversationId: { type: String, required: true }, // deterministic id for two users, e.g. smallerId_largerId
  from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: '' },
  attachments: [AttachmentSchema],
},{ timestamps: true });

MessageSchema.index({ conversationId: 1, createdAt: -1 });

export default mongoose.model('Message', MessageSchema);
