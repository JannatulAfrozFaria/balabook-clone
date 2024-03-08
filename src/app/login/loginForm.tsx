"use client"
import { Input } from "@/components/ui/input"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import {signIn} from "next-auth/react"

import { useRouter } from 'next/navigation';
  

const FormSchema = z.object({
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }).max(50, "max 50 characters"),
    password: z.string().min(1,"password is required").min(6, "minimum 6 digit"),
  });

const LoginForm =()=> {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username:"",
            password:"",
        },
      })
     
      async function onSubmit(data: z.infer<typeof FormSchema>) {
       
        // console.log(data)
        try {
            // Next Auth for Login
            const res = await signIn("credentials",{
                username: data.username,
                password: data.password,
                redirect:false
            })

            if(res?.error){
                console.log(res?.error)
                toast({
                    title: "Login Error",
                    description: "Invalide Credentials",
                  })
            }else{
                router.push('/dashboard'); // Adjust the route as needed
                // redirect('/dashboard');
            }
        } catch (error) {
            console.error(error)
        }
      }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button className="w-full mt-2" type="submit">Login</Button>
            </form>
        </Form>
    </div>
  )
}

export default LoginForm