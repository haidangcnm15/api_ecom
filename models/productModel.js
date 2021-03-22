const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    count_favor: { type: Number, required: true, default: 0 },
    image_id: [{ type: String, required: true }],
    product_type: { type: String, required: true },
    material: { type: String, required: true },
    size: [{ type: String, required: true }],
    color: [{ type: String, required: true }],
    sale: { type: Number, default: 0, required: true },
    isHidden: { type: Boolean, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null }
});

productSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllProducts() {
        return this.find({}).sort({ created_at: -1 }).exec();
    },
    findProductById(productId) {
        return this.findById(productId).exec();
    },
    findProductByType(type) {
        return this.find({ product_type: type }).exec();
    },
    findProductByisSale() {
        return this.find({ sale: { $gt: 0 } }).sort({ sale: -1 }).exec();
    },
    updateProduct(product) {
        return this.findOneAndUpdate({ _id: product._id }, { $set: product }).exec();;
    },
    updateSaleForProduct(_id, sale) {
        return this.findOneAndUpdate({ _id: _id }, { $set: { sale: sale, updated_at: Date.now() } }).exec();
    },

    hiddenProduct(productId) {
        return this.findOneAndUpdate({
            _id: productId
        }, { $set: { isHidden: true, updated_at: Date.now() } }).exec();
    },

    showProduct(productId) {
        return this.findOneAndUpdate({
            _id: productId
        }, { $set: { isHidden: false, updated_at: Date.now() } }).exec();
    },

    updateProductImages(product) {
        return this.updateOne(
            {
                _id: product._id,
            },
            { $push: { images: { $each: product.images } } }
        ).exec();
    },

    deleteImage(productId, linkImage) {
        return this.updateOne(
            {
                _id: productId,
            },
            { $pull: { images: linkImage } }
        ).exec();
    },
    reduceQuantity(productId, subProductId, quantity) {
        return this.updateOne(
            {
                _id: productId,
                'product_attr._id': subProductId,
            },
            { $inc: { 'product_attr.$.quantity': -quantity } }
        ).exec();
    },
    getSizeByColor(productId, color) {
        return this.aggregate([
            // Filter possible documents
            { $match: { _id: ObjectId(productId) } },

            // Unwind the array to denormalize
            { $unwind: '$product_attr' },

            // Match specific array elements
            { $match: { 'product_attr.color': color } },

            // Group back to array form
            {
                $group: {
                    _id: '$_id',
                    sizes: { $push: '$product_attr.size' },
                },
            },
        ]);
    },
    getColorBySize(productId, size) {
        return this.aggregate([
            // Filter possible documents
            { $match: { _id: ObjectId(productId) } },

            // Unwind the array to denormalize
            { $unwind: '$product_attr' },

            // Match specific array elements
            { $match: { 'product_attr.size': size } },

            // Group back to array form
            {
                $group: {
                    _id: '$_id',
                    colors: { $push: '$product_attr.color' },
                },
            },
        ]);
    },
};

module.exports = mongoose.model("product", productSchema);
