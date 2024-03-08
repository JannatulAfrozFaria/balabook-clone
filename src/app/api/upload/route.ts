import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req:NextRequest) {
    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File

    if(!file){
        return NextResponse.json({success:false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = `./public/img/${file.name}`
    // console.log(path,buffer)
    await writeFile(path, buffer)

    // console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({success:true})
}