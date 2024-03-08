import { OrderFormSchema } from "@/app/dashboard/orders/OrderFormSchema"
import prisma from "@/index"
import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { z } from "zod"

type Order = {
    customerId: string;
    userId: string;
    offerId: string;
    amount: string;
    paymentMethod: string;
    status: string;
  }

export const addOrder =async (data: z.infer<typeof OrderFormSchema>)=>{
    const router = useRouter()
    // const newOrder = await prisma.order.create({
    //     data: {
    //         customerId: data.customerId,
    //         userId: data.userId,
    //         offerId: data.offerId,
    //         amount: data.amount,
    //         paymentMethod: data.paymentMethod,
    //         status: data.status,
    //       // Add other fields as needed
    //     },
    //   });

    
            // .then((res)=>{
            //  console.log(res)
            //   // TODO:: SEND SMS WITH USER ID
            //   if(res.status === 201){
            //       toast.success("Offer Creation Success")
            //   }
            //   //   console.log(error)
            //   if(res?.data?.error?.code === "P2002"){
            //     let errorMassage = "Data Validation Error"
            //     const target = res.data.error.meta.target
      
            //     if(target === "Offer_offerId_key"){
            //       errorMassage = "This Offer id is Already used"
            //     }
            //     toast.error(errorMassage)
            //   }

            // }).catch(error=>{
            //   console.log(error)
            //   if(error?.response?.data?.error?.code === "P2002"){
            //     let errorMassage = "Data Validation Error"
            //     const target = error.response.data.error.meta.target
      
            //     if(target === "Offer_offerId_key"){
            //       errorMassage = "This Offer id is Already used"
            //     }
            //     toast.error(errorMassage)
                
            //   }else{
            //     toast.error("Offer Creation Faild")
            //   }
      
            // })
            // .finally(()=>{
            //   router.refresh()
            // })
}