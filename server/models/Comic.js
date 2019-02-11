const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const comicSchema = new Schema({
  extId: {type: Number,required:true},
  favs: { type: [Schema.Types.ObjectId], ref: "User" },
  nFavs: {type:Number, default:1}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Comic = mongoose.model('Comic', comicSchema);

Comic.add = function(extId,userId){
  return Comic.create({extId: extId, favs:[userId]
  })
  .catch(err=>console.log(err));
}

module.exports = Comic;
