const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const schema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Number,
        required: true,
        ref : 'User'
    },
    remain : {
        type: Number,
        required: true,
    },
    form : {
        type: Number,
        required: true,
        ref : 'User'
    },
    amount : {
        type: Number,
        required: true,
    }
}, {
    collection: 'transaction',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});


schema.plugin(autoIncrement.plugin, {
    model: 'transaction',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const transaction = mongoose.model('transaction', schema);

module.exports = transaction;