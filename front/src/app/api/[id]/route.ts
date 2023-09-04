import { NextRequest, NextResponse } from "next/server";

                                                
export async function DELETE(request: NextRequest, { params }: { params: { id: string } } ) {
    try {
        const idClient = params.id;
    
        const response = await fetch(`${process.env.URL_BACK}/cliente/${idClient}`, { 
            method: "DELETE",
        });

        if (response.status === 200) {
            const mensagemUsuario = await response.text();
            return NextResponse.json({ mensagemUsuario }, { status: 200 });
        } else {
            return NextResponse.json({ mensagemUsuario: 'Erro interno da aplicação' }, { status: 500 });    
        }
    } catch(err) {
        return NextResponse.json({ mensagemUsuario: 'Erro interno da aplicação' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } } ) {
    try {
        const res = await request.json()
        const idClient = params.id;
    
        const response = await fetch(`${process.env.URL_BACK}/cliente/${idClient}`, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res)
        });

        const mensagemUsuario = await response.text();    
        return NextResponse.json({ mensagemUsuario }, { status: response.status });        
    } catch(err) {
        console.log("🚀 ~ file: route.ts:47 ~ PATCH ~ err:", err)
        return NextResponse.json({ mensagemUsuario: 'Erro interno da aplicação' }, { status: 500 });
    }
}
