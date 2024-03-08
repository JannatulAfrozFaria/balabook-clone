"use client"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

import { useRouter } from 'next/navigation';
import { useEffect } from "react";

function CongratulationPage() {
    const router = useRouter();

    // useEffect(() => {
    //   // Function to redirect to the home page after a delay
    //   const redirectToHomePage = () => {
    //     router.push('/'); // Replace '/' with the actual path to your home page
    //   };
  
    //   // Set a timeout to trigger the redirect after 5 seconds (5000 milliseconds)
    //   const delay = 3000;
    //   const timeoutId = setTimeout(redirectToHomePage, delay);
  
    //   // Clear the timeout to prevent the redirect if the component unmounts before the timeout
    //   return () => clearTimeout(timeoutId);
    // }, []); // Empty dependency array to run the effect only once on component mount
  
  return (
    <main className="flex min-h-screen flex-col justify-center items-center pb-6">
        <div className="absolute left-10 top-5">
            <Link href="/" className="flex">
                <ArrowLeft /> BACK
            </Link>
        </div>
        <div className="flex flex-col justify-center items-center ">
            <CheckCircle color="#14ca07" size={64} className="mb-4" /> 
            <h6 className="text-2xl px-6 text-green-600">Congratulations!</h6>
            <p>Registration Successfull!</p>
            {/* <p><b>Name:</b> {customer.name}</p>
            <p><b>Customer ID:</b> {customer.customerId}</p> */}
        </div>
    </main>
  )
}

export default CongratulationPage