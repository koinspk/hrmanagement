const mongoose = require('mongoose');
const { Schema } = mongoose;

const approvalSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: "group" },
    total: Number,
    level: { type: Number, default: 0 },
    approval: [{
        action: { type: Boolean, default: false },
        approver: [{ 
            user: [{ type: Schema.Types.ObjectId, ref: "user" }],
            status: { type: Number, default: 0 },
            remark: String 
        }]
    }]
});

let approval = mongoose.model('approvalaction', approvalSchema);

module.exports = approval;