'use client'
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { useEffect, useState } from "react";
import sendSms from "@/lib/sms";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export default function SMS() {

type Customer ={
  name: string
  phone: string
}

  const [message, setMessage] = useState("")
  const [number, setNumber] = useState("")
  const [district, setDistrict] = useState([])
  const [customer, setCustomer] = useState<Customer[]>([])
  const [selsctDistrict, setSelectDistrict] = useState("")

  const getDistict =async () =>{
  
    let url = "https://bdapis.com/api/v1.1/districts"
      
    await axios.get(url)
    .then(res=>{
      // console.log("Dis:",res.data.data)
      setDistrict(res.data.data)
  
    })
    .catch(error=>{
      console.log(error)
    })
  
  }

  function generatePhoneText() {
    // Extract phone numbers from the array
    if(customer?.length > 0){
      const phones = customer.map(entry => entry.phone);
      // Join phone numbers using "|" character
      const resultText = phones.join("|");
      
      setNumber( resultText);
    }

}

  const getCustomer = async () =>{
    setNumber("")
    await axios.get(`/api/customer/byDistrict/${selsctDistrict}`)
    .then(res=>{
      // console.log(res)
      setCustomer(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  
  }

  // console.log(selsctDistrict)
  // console.log(customer)
  // console.log(message)
  // console.log(number)

  useEffect(()=>{
    getDistict();
  },[])

  useEffect(()=>{
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selsctDistrict])
  
  useEffect(()=>{
    generatePhoneText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[customer])
  
  
const handleSendSms = ()=>{
    if(message !== ""){
      if(number !== ""){
        const smsData = {
          message: `${message}`,
          numbers: number,  // Replace with the actual recipient number
        };
        const send = sendSms(smsData)
        toast.success("Message Sending...")
      }else{

        toast.error("Please select phone number")
      }
    }else{
      toast.error("Message Should not empty")
    }
}

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <Toaster  />

        <div className="flex-col flex w-full">
        
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="SMS"/>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              
            </div>
          </div>
          <div className="flex md:px-14 flex-col md:flex-row">
            <div className="md:w-1/4 w-full">
              <Card className="md:w-5/6 w-full">
                <CardHeader className="border-b-2 p-3 pt-4">
                  <CardTitle className="flex items-center gap-2">
                    <h4 className="pb-3">Select District</h4>
                  </CardTitle>
                  <CardDescription>
                    <Select 
                    //@ts-ignore
                    onValueChange={(e)=>setSelectDistrict(e)} 
                    //setSelectDistrict(e)
                    defaultValue={selsctDistrict}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select District to display" />
                        </SelectTrigger>
                        <SelectContent>
                        {district.length > 0 && district.map((dis)=>{
                          // @ts-ignore
                          const distictValue = dis?.district || "";
                          return(
                            <SelectItem key={distictValue} value={distictValue}>{distictValue}</SelectItem>

                          )
                        })}
                        {/* <SelectItem value="assistant">Assistan</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ScrollArea className="md:h-[500px] h-[350px] w-full rounded-md ">
                    {
                      customer?.length > 0 ? customer.map((gust)=>{
                        
                        return(
                          <div className="flex gap-2 pb-4" key={gust.phone}>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium leading-none">{
                              gust.name}</p>
                              <p className="text-xs leading-none text-muted-foreground">
                                {
                                gust.phone
                                }
                              </p>
                          </div>
                        </div>

                        )
                      })
                         :
                        <>
                          No Customer.
                        </>
                    }
                  
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-end">
                 <User className="h-4 w-4 mr-1"/> <p className="text-sm"> <b>{customer?.length}</b> Customers</p>
                </CardFooter>
              </Card>
              
            </div>
            <div className="md:w-2/4 w-full md:mt-0 mt-6">
              <h2 className="text-2xl font-bold">Composs SMS</h2>
              <Textarea 
              placeholder="Type your message here." 
              //@ts-nocheck
              onChange={(e)=>setMessage(e.target.value)}
              value={message}
              //@ts-ignore
              rows={`${10}`}  className=" h-50"/>
              <div className=" justify-end  flex">
                <Button className="mt-2 mr-2" onClick={()=>setMessage("")}>Clear</Button>
                <Button className="mt-2" onClick={handleSendSms}>Send</Button>
              </div>
              <div>
                <p className="text-md bold border-b-2 mt-4">Note Please:</p>
                <ul
                    className="pt-4 list-disc pl-4"
                    // style={{ columnCount: 3 }}
                  >
                    <li className="pb-3 text-sm">
                      Message Type: English SMS
                    </li>
                    <li className="pb-3 text-sm">
                      Message Length: 0 (160 Characters Remaining)
                    </li>
                    <li className="pb-3 text-sm">
                      Text Parts: 0, 160 Characters Per Message
                    </li>
                    <li className="pb-3 text-sm">
                      Total Characters Remaining: 1071
                    </li>
                    <li className="pb-3 text-sm">
                      Total SMS (Don not Send More Than 20000 SMS at once) = 0 SMS
                    </li>
                    <li className="pb-3 text-sm">
                      Total Cost: Text Parts X Total Numbers X 0.20 = 0 Tk
                    </li>
                    <li className="pb-3 text-sm">
                      {
                      ' Not Supported Characters ~ ^ &#123; &#125; &#91; &#93; &#92; &#124; এই ক্যারেক্টারগুলো এসএমএস এ দিবেন না ।' // eslint-disable-next-line react/no-unescaped-entities
                      }
                    </li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div >
              
                  
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}