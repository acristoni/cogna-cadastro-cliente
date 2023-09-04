import { Client } from "interfaces/client.interface";

export default async function getClients(setClientList: (value: Client[]) => void) {
    const res = await fetch(`${process.env.URL_FRONT}/api`)   
    const resJson = await res.json();
    setClientList( JSON.parse(resJson.data) )
    return
}