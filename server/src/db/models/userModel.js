import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxLength: 80,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	passwordHash: {
		type: String,
		required: true,
		minLength: 6,
	},
});

userSchema.methods.createHash = async function (plainTestPassword) {
	const saltRounds = 10;
	return await bcrypt.hash(plainTestPassword, saltRounds);
};

userSchema.methods.validatePassword = async function (plainTestPassword) {
	return await bcrypt.compare(plainTestPassword, this.passwordHash);
};

const UserModel = model('User', userSchema);
export default UserModel;
