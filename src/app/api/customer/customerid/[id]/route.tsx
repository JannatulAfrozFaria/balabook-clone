import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../../helpers/server-helpers";
import prisma from "../../../../../../prisma";



// Get User by customer id
export const GET = async (req: Request, params:{params:{id:string}}) => {
    const id = params.params.id
    try {
       
    await connectToDatabase();

    const customer = await prisma.customer.findFirst({
        where: { customerId: id }
    });

        return NextResponse.json(customer, { status: 200 });
} catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server side error", error }, { status: 500 });
} finally {
    await prisma.$disconnect();
}
};

export const PUT = async (req: Request, params:{params:{id:string}}) => {
    const id = params.params.id
    // console.log("id", id)
    try {
        const { attend } = await req.json();
       
    await connectToDatabase();

    const updatedUser = await prisma.customer.update({
    where: { id: id },
    //@ts-ignore
    data:{ attend },
    });

    return NextResponse.json({ user: updatedUser, message:"User Update Successful" }, { status: 200 });
} catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server side error", error }, { status: 500 });
} finally {
    await prisma.$disconnect();
}
};