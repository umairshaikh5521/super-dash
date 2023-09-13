import mongoose from 'mongoose';

let isConnected = false;

const connectToDb = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MONGODB iS ALREADY CONNECTED');
		return;
	} else {
		try {
			await mongoose.connect(process.env.MONGODB_URI, {
				dbName: 'next-auth-test',
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			isConnected = true;
			console.log('MONGODB SUCESSFULLY CONNECTED');
		} catch (error) {
			// throw new Error('connection failed');
			console.log(error);
		}
	}
};

export default connectToDb;
