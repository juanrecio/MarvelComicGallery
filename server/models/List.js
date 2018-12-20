const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listSchema = new Schema({
  name: {type:String, required:true},
  comics: {type: [Number],required:true, default:[]},
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  favs: { type: [Schema.Types.ObjectId], ref: "User" ,default:[]},
  character: {type: [Number]}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const List = mongoose.model('List', listSchema);

List.add = function(name,userId){
  return List.create({name: name,userId: userId,favs:[userId]})
  .then(c=>c.data)
  .catch(err=>console.log(err));
}

module.exports = List;
