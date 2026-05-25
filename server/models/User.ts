import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
});

// Avoid OverwriteModelError in case of HMR or multiple imports
let User: any;
try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', UserSchema);
}

export default User;
