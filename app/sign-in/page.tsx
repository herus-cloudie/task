import SignInPage from "@/components/template/signInPage"
import  Session  from "@/utils/session"
import { redirect } from "next/navigation";

const SignIn = async () => {
  let session = await Session();
  if(session) return redirect('/');

  return <SignInPage />;
}

export default SignIn