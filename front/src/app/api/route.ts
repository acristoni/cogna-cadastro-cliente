import { NextResponse } from 'next/server'
 
export async function GET() {
    let response = await fetch("http://localhost:3003/cliente", { 
        method: "GET",
        next: { revalidate: 60 }
    });

    let data = await response.text();

    return NextResponse.json({ data })
}