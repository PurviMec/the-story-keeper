const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/dateFormat'); 

// add price to add more function in furture
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require:true,
      maxlength:400,
    },
    author:{
        type:String,
        require:true,
    },
    publish:{
        type:Date,
        default:undefined,
        get: timestamp => dateFormat(timestamp)
    },
    rent: {
      type: Number,
      require: true,
    },

    //one
    genere:{
      type: String,
      required:true
    },
//list of
reviews: [reviewSchema]
},
{
  toJSON: {
    getters: true,
    virtuals: true
  }
}
);

bookSchema.virtual('reviewCount').get(function() {
  return this.review.length;
});


const Book = model('Book', bookSchema);

module.exports = Book;