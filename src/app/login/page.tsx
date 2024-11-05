import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from "./loginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession()
  if(session){
    redirect('/dashboard')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className='absolute left-10 top-5'>
        <Link href='/' className='flex'><ArrowLeft /> BACK</Link>
      </div>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
