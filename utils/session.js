import AuthOptions from "./authOptions";
import { getServerSession } from "next-auth";
import ConnectDataBase from "./connectDataBase";

export default async function Session(){
    await ConnectDataBase()
    let session = await getServerSession(AuthOptions)
    return session;
} 