import User from '@/models/User';
import connectToDb from '@/utils/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
	const { email, password, role } = await request.json();

	await connectToDb();

	const hashedPassword = await bcrypt.hash(password, 5);

	const newUser = new User({
		email,
		password: hashedPassword,
		role
	});

	try {
		await newUser.save();
		return new NextResponse('User has been created', {
			status: 201,
		});
	} catch (err: any) {
		console.log(err);
		return new NextResponse(err.message, {
			status: 500,
		});
	}
};
