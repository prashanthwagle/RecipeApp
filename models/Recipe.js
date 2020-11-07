const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    images:{
        type: [String],
    },
    ingredients:{
        type: String,
        isRequired: true
    },
    steps:{
        type: String,
        required: true
    }


})


module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
