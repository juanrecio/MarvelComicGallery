const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const characterSchema = new Schema({
  extId: {type: Number,required:true,unique:true},
  name: {type: String,required:true,unique:true},
  img: {path :String, extension:String},
  favs: { type: [Schema.Types.ObjectId], ref: "User" ,default:[]},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Character = mongoose.model('Character', characterSchema);

// Character.add = function(characterId,userId=1){
//   return Character.create({characterId: characterId, favs:[userId]
//   })
//   .catch(err=>console.log(err));
// }

module.exports = Character;
