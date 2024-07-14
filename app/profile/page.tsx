import ProfilePage from "@/components/template/profilePage"
import Session from "@/utils/session";
import { redirect } from "next/navigation";


const Profile = async () => {
  const session = await Session();
  if(!session) return redirect('/sign-in')

  return <ProfilePage session={session}/>;
}

export default Profile