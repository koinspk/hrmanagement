const mongoose = require('mongoose');
const { Schema } = mongoose;

const approvalSchema = new Schema({
    group: { type: String, ref: "group" },
    total: Number,
    level: { type: Number, default: 0 },
    approval: [{
        action: { type: Boolean, default: true },
        approver: [{ 
            user: { type: Schema.Types.ObjectId, ref: "user" },
            status: { type: Number, default: 0 },
            remark: String 
        }]
    }]
});

let approval = mongoose.model('approval', approvalSchema);

module.exports = approval;


