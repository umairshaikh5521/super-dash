import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
	username: {
		type: String,
	},

	role: {
		type: String,
	},

	email: {
		type: String,
		unique: [true, 'Email already Exists'],
		required: [true, 'Email is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = models.User || model('User', UserSchema);

export default User;
