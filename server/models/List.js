const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listSchema = new Schema({
  name: {type:String, required:true},
  comics: {type: [Schema.Types.ObjectId], ref: "Comic" ,default:[]},
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  favs: { type: [Schema.Types.ObjectId], ref: "User" ,default:[]},
  nFavs: {type:Number, default:0},
  characters: {type: [Schema.Types.ObjectId], ref: "Character" ,default:[]}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const List = mongoose.model('List', listSchema);

List.add = function({name,userId,character=[]}){
  return List.create({name: name,userId: userId,favs:[userId],nFavs:1,character:character})
  .then(c=>c.data)
  .catch(err=>console.log(err));
}

module.exports = List;
