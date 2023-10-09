import { NextRequest, NextResponse } from "next/server";
import User from '@/models/User';
import connectToDb from '@/utils/db';

export const GET = async (request: NextRequest) => {
    await connectToDb();
    console.log('reached till db connect');

    try {
        const users = await User.find({});
        console.log(users);
        return NextResponse.json({users});
        
    }catch(err){
        console.log(err);
        
    }

}