import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../helpers/server-helpers";
import prisma from "../../../../prisma";
import bcrypt from 'bcrypt'

// create User
export const POST = async (req: Request) =>{
 try {
    let {name, phone, email, username, password, type, status} = await req.json();
    
    if(!name || !phone || !username || ! password) 
        return NextResponse.json({message:"invalide data"}, {status:422})
    
    password = await bcrypt.hash(password,10)

    await connectToDatabase()

    const user = await prisma.user.create({
    data:{name, phone, email, username, password, type, status},
    })

    return NextResponse.json({user}, {status:201})

 } catch (error) {
    console.error(error)
    return NextResponse.json({message:"server side error", error}, {status:201})

 }finally{
    await prisma.$disconnect()
 }
};


// Find All Users
export const GET = async () =>{
   try {
  
      await connectToDatabase()
  
      const user = await prisma.user.findMany({select: {
        id: true,     // Include the 'id' field
        name: true,   // Include the 'name' field
        email: true,   // Include the 'name' field
        username: true,   // Include the 'name' field
        phone: true,   // Include the 'name' field
        // password: false, // Exclude the 'email' field
        status: true, // Exclude the 'email' field
      },})
  
      return NextResponse.json({user}, {status:200})
  
   } catch (error) {
      console.error(error)
      return NextResponse.json({message:"server side error", error}, {status:201})
  
   }finally{
      await prisma.$disconnect()
   }
  };

