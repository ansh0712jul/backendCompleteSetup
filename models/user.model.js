const {Schema,mongoose} =require('mongoose');
const {createHmac,randomBytes} = require('crypto');

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },
    profileImageURL:{
        type: String,
        default: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    Role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},{
    timestamps: true
})
// hashing password with pre save hook 
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword=createHmac('sha512', salt)
        .update(user.password)
        .digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    next();

})
userSchema.static("isValidPassword" , function(email,password) {
    const user = this.findOne({email});
    if(!user) throw new Error('User not found');
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha512', user.salt)
        .update(password)
        .digest('hex');
    if (hashedPassword !== userProvidedHash) throw new Error('Invalid password');
    return {...user,password: undefined,salt: undefined};
})

const User = mongoose.model('user', userSchema);
module.exports = User