"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let promiseSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    promisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    promisee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    witnesses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    beneficiaries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    // 0 = Deleted,
    // 10 = Initiated (yet not verified),
    // 20 = Pending (promisee/promisor/witness approved but promise is still not fulfilled),
    // 30 = Rejected (promisor/promisee declined)
    // 40 = Settled (both parties approved to drop it)
    // 50 = Fulfilled (both parties demanded its done)
    status: {
        type: Number,
        enum: [0, 10, 20, 30, 40, 50],
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

// on every save, add the date
promiseSchema.pre('save', function(next) {
    // get the current date
    let currentDate = new Date();

    // change the updated_at field to current date
    this.updated = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

let Promise = mongoose.model('Promise', promiseSchema);
module.exports = Promise;