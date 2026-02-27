import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  data: { type: Buffer, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['logo', 'header', 'footer', 'feature', 'installation', 'guide', 'blog', 'general'],
    default: 'general' 
  },
  usedIn: { type: String }
}, { timestamps: true })

export default mongoose.models.Image || mongoose.model('Image', ImageSchema)
