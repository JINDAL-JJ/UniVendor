const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imgPro : {
        type: String
    }
});

const prodSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_type:{
        type: String,
        required: true,
    },
    product_price:{
        type: Number,
        required: true,
    }
    ,
    product_img:{
        type: [Object]
    }
})

const Post = mongoose.model('Post', postSchema);
const Product = mongoose.model('Product', prodSchema);

module.exports = Post;
module.exports = Product;
