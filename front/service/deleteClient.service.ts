export default async function deleteClient(
    clientToDelete: string | undefined,
    setDelectedClient: (value: string) => void,
    setMensagemConcluido: (value: string) => void
) {
    const res = await fetch(`${process.env.URL_FRONT}/api/${clientToDelete}`, {
        method: "DELETE",
    })
    if (res.status === 200 && clientToDelete) {
        setDelectedClient(clientToDelete)
        setMensagemConcluido('Usuário excluído com sucesso!')
    } else {
        setMensagemConcluido('Tivemos um problema interno, tente novamente mais tarde ou entre em contato conosco!')
    }
}