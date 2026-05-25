import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
});

let Contact: any;
try {
  Contact = mongoose.model('Contact');
} catch {
  Contact = mongoose.model('Contact', ContactSchema);
}

export default Contact;
