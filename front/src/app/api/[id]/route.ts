import { NextRequest, NextResponse } from "next/server";

                                                
export async function DELETE(request: NextRequest, { params }: { params: { id: string } } ) {
    try {
        const idClient = params.id;
    
        const response = await fetch(`http://localhost:3003/cliente/${idClient}`, { 
            method: "DELETE",
        });
        console.log();
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