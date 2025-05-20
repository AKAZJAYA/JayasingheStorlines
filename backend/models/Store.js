import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a store name'],
    trim: true
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide a store address']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    province: {
      type: String,
      required: [true, 'Please provide a province']
    },
    postalCode: {
      type: String,
      required: [true, 'Please provide a postal code']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: {
      type: String,
      required: [true, 'Please provide a phone number']
    },
    email: String
  },
  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  images: [String],
  description: String,
  services: [String],
  isOpen: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Store = mongoose.model('Store', storeSchema);

export default Store;