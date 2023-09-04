import { NextRequest, NextResponse } from 'next/server'
 
export async function GET() {
    let response = await fetch(`${process.env.URL_BACK}/cliente`, { 
        method: "GET",
        next: { revalidate: 0 }
    });

    let data = await response.text();

    return NextResponse.json({ data })
}

export async function POST( request: NextRequest ) {
    const res = await request.json()
    try {    
        const response = await fetch(`${process.env.URL_BACK}/cliente/`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res)
        });

        const responseString = await response.text();
        const mensagemUsuario = JSON.parse(responseString).message
        return NextResponse.json({ mensagemUsuario }, { status: response.status });
    } catch(err) {
        console.log("🚀 ~ file: route.ts:25 ~ POST ~ err:", err)
        return NextResponse.json({ mensagemUsuario: 'Erro interno da aplicação' }, { status: 500 });
    }
}