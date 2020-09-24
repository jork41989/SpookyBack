const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
   username: {
       type: String,
       required: true
     },
     email: {
       type: String,
       required: true
     },
     admin: {
       type: Boolean,
       required: true
     }
})

const User = mongoose.model('users', UserSchema);
module.exports = User