import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  deliveryId: {
    type: String,
    required: true,
    unique: true
  },
  driver: {
    id: String,
    name: String,
    phone: String,
    vehicle: String,
    licenseNumber: String
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  actualDeliveryTime: Date,
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'in_transit', 'delivered', 'failed', 'cancelled'],
    default: 'pending'
  },
  deliveryInstructions: String,
  notes: String,
  proof: {
    signature: String,
    photo: String,
    recipientName: String
  },
  trackingUpdates: [{
    status: String,
    timestamp: Date,
    location: String,
    notes: String
  }]
}, {
  timestamps: true
});

// Generate delivery ID before saving
deliverySchema.pre('save', async function(next) {
  if (!this.deliveryId) {
    const count = await mongoose.model('Delivery').countDocuments();
    this.deliveryId = `DEL-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;