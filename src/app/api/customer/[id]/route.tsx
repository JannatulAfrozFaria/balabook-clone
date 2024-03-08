import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../helpers/server-helpers";
import prisma from "../../../../../prisma";


export const GET = async (req: Request, params:{id:string}) => {
    // console.log(params)
    return NextResponse.json({id: params.id})
}

// Update User
export const PUT = async (req: Request, params:{params:{id:string}}) => {
    const id = params.params.id
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
            status, } = await req.json();
        
        if (!name || !phone  ) {
            return NextResponse.json({ message: "Invalid data" }, { status: 422 });
        }
        
        
    await connectToDatabase();

    const updatedUser = await prisma.customer.update({
    where: { id: id },
    data:{ 
        name,
        phone,
        email,
        address,
        district,
        division,
        company,
        designation,
        attend,
        status, },
    });

    return NextResponse.json({ user: updatedUser, message:"User Update Successful" }, { status: 200 });
} catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server side error", error }, { status: 500 });
} finally {
    await prisma.$disconnect();
}
};

// Delete User
export const DELETE = async (req: Request, params:{params:{id:string}}) => {
try {
    const  id  =  params.params.id

    if (!id) {
    return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    }

    await connectToDatabase();

    await prisma.customer.delete({
    where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
} catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server side error", error }, { status: 500 });
} finally {
    await prisma.$disconnect();
}
};