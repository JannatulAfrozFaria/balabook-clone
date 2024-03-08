import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../helpers/server-helpers";
import prisma from "../../../../prisma";
import { PrismaClient } from "@prisma/client";

// Helper function to generate a random 6-digit unique ID
const generateCustomerId = async (prisma: PrismaClient) => {
   const MAX_RETRIES = 3; // Maximum number of attempts to generate a unique ID
 
   for (let i = 0; i < MAX_RETRIES; i++) {
     const newCustomerId = Math.floor(100000 + Math.random() * 900000).toString();
 
     // Check if the generated ID already exists in the database
     const existingCustomer = await prisma.customer.findUnique({
       where: {
         customerId: newCustomerId,
       },
     });
 
     if (!existingCustomer) {
       return newCustomerId;
     }
   }
 
   throw new Error('Failed to generate a unique customer ID');
 };
 
 export const POST = async (req: Request) => {
   try {
      const {
        name,
        phone,
        email,
        address,
        district,
        division,
        company,
        designation,
        attend,
        status,
      } = await req.json();
  
      // Check if required fields are present
      if (!name || !phone || !district || !division ) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 422 });
      }
  
      // Generate a random 6-digit unique customer ID
      const customerId = await generateCustomerId(prisma);
  
      await connectToDatabase();
  
      const customer = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
          address,
          district,
          division,
          company,
          designation,
          attend,
          status,
          customerId,
        },
      });
  
      return NextResponse.json({ customer }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Server side error', error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
 };
 
// Find All Customer
export const GET = async () =>{
  try {
 
     await connectToDatabase()
 
     const customer = await prisma.customer.findMany()
 
     return NextResponse.json({customer}, {status:200})
 
  } catch (error) {
     console.error(error)
     return NextResponse.json({message:"server side error", error}, {status:201})
 
  }finally{
     await prisma.$disconnect()
  }
 };

 
