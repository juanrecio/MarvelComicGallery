const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: {type:String, required:true},
  mail: {type:String, required:true},
  comicUnwantedList: {type: [Schema.Types.ObjectId], ref: "Comic" ,default:[]},
  avatarImg: {type: String, default:"https://www.synbio.cam.ac.uk/images/avatar-generic.jpg/image"}

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
