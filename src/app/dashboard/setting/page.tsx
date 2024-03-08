"use client";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhotoUpload from "./photoUpload";
import { SiteSettigSchema } from "./SettingSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSetting, saveSiteSetting } from "./_action";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";

export default function Setting() {
  const [id, setId] = useState("");
  const [logo, setLogo] = useState("logo.png");
  const [banner, setBanner] = useState("hero-BG.jpg");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [add3, setAdd3] = useState("");
  const [setting, setSetting] = useState<any>([]);
  const [site_title, setSite_title] = useState("");
  const [event_title, setEvent_title] = useState("");
  // const form = useForm();

  const getSiteSetting = async () => {
    const site = await getSetting();
    if (site) {
      setSetting(site);
    }
  };

  useEffect(() => {
    getSiteSetting();
  }, []);

  useEffect(() => {
    setId(setting?.id);
    setSite_title(setting?.site_title);
    setEvent_title(setting?.event_title);
  }, [setting]);

  // console.log(setting);

  const form = useForm<z.infer<typeof SiteSettigSchema>>({
    resolver: zodResolver(SiteSettigSchema),
    defaultValues: {
      site_title: site_title || "",
      event_title: event_title || "",
      logo: logo || "",
      banner: banner || "",
      add1: add1 || "",
      add2: add2 || "",
      add3: add3 || "",
    },
  });

  // console.log(data);

  const handleSaveSetting = async (data: z.infer<typeof SiteSettigSchema>) => {
    console.log("Sumbit", data);
    try {
      const save = await saveSiteSetting(id, data);
      if (save) {
        toast.success("Offer Update Success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-6 w-full">
      <div className=" flex-col flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <PageTitle title="Setting" />
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveSetting)}>
                <FormField
                  control={form.control}
                  name="site_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Name: {site_title}</FormLabel>
                      <FormControl>
                        <Input
                          className="w-1/2"
                          placeholder="Site Title"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="event_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name: {event_title}</FormLabel>
                      <FormControl>
                        <Input
                          className="w-1/2"
                          placeholder="Event  Title"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Event Name</FormLabel> */}
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="banner"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Event Name</FormLabel> */}
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="add1"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Event Name</FormLabel> */}
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="add2"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Event Name</FormLabel> */}
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="add3"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Event Name</FormLabel> */}
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-1/6 mt-2" type="submit">
                  Save
                </Button>
              </form>
            </Form>
            <hr className="mt-10 mb-4"></hr>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Program Setting</h2>
            <div className="flex gap-3">
              <div className="w-2/5 pr-4">
                <h3 className="text-md font-semibold mb-2">Create Program</h3>
                {/* <Form {...form}>
                  <FormField
                    control={form.control}
                    name="site_title"
                    render={() => (
                      <FormItem>
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input className="" placeholder="Program Title" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={() => (
                      <FormItem>
                        <FormLabel>Program Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here."
                            //@ts-nocheck
                            // onChange={(e) => setMessage(e.target.value)}
                            // value={message}
                            //@ts-ignore
                            rows={`${4}`}
                            // className=" h-50"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    // onClick={() => handleSaveSetting()}
                    className="w-1/3 mt-2"
                  >
                    Save
                  </Button>
                </Form> */}
              </div>
              <div className="w-3/5">
                <h3 className="text-md font-semibold  mb-2">Program List</h3>
                <Card className="w-full">
                  <CardContent className="p-3">
                    <ScrollArea className="md:h-[350px] h-[350px] w-full rounded-md ">
                      <div className="flex bg-gray-50 px-4 py-2 mb-3">
                        <div>
                          <b>Program title</b>
                          <p className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique provident architecto nulla illum.
                          </p>
                        </div>
                        <div className="flex">
                          <Edit className="mr-2 cursor-pointer hover:fill-green-400" />
                          <Trash className="cursor-pointer hover:fill-red-400" />
                        </div>
                      </div>
                      <div className="flex bg-gray-50 px-4 py-2 mb-3">
                        <div>
                          <b>Program title</b>
                          <p className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique provident architecto nulla illum.
                          </p>
                        </div>
                        <div className="flex">
                          <Edit className="mr-2 cursor-pointer hover:fill-green-400" />
                          <Trash className="cursor-pointer hover:fill-red-400" />
                        </div>
                      </div>
                      <div className="flex bg-gray-50 px-4 py-2 mb-3">
                        <div>
                          <b>Program title</b>
                          <p className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique provident architecto nulla illum.
                          </p>
                        </div>
                        <div className="flex">
                          <Edit className="mr-2 cursor-pointer hover:fill-green-400" />
                          <Trash className="cursor-pointer hover:fill-red-400" />
                        </div>
                      </div>
                      <div className="flex bg-gray-50 px-4 py-2 mb-3">
                        <div>
                          <b>Program title</b>
                          <p className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique provident architecto nulla illum.
                          </p>
                        </div>
                        <div className="flex">
                          <Edit className="mr-2 cursor-pointer hover:fill-green-400" />
                          <Trash className="cursor-pointer hover:fill-red-400" />
                        </div>
                      </div>
                      <div className="flex bg-gray-50 px-4 py-2 mb-3">
                        <div>
                          <b>Program title</b>
                          <p className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique provident architecto nulla illum.
                          </p>
                        </div>
                        <div className="flex">
                          <Edit className="mr-2 cursor-pointer hover:fill-green-400" />
                          <Trash className="cursor-pointer hover:fill-red-400" />
                        </div>
                      </div>
                      <div className="flex bg-gray-50 px-4 py-2 mb-3">
                        <div>
                          <b>Program title</b>
                          <p className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique provident architecto nulla illum.
                          </p>
                        </div>
                        <div className="flex">
                          <Edit className="mr-2 cursor-pointer hover:fill-green-400" />
                          <Trash className="cursor-pointer hover:fill-red-400" />
                        </div>
                      </div>
                      {/* {
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
                    } */}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
            <hr className="mt-10 mb-4"></hr>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Photo Uploads</h2>
            <div className="flex gap-2">
              <div className="w-2/6">
                <h3 className="text-md font-semibold">Logo</h3>
                <PhotoUpload
                  photoName={logo}
                  setPhotoName={setLogo}
                  size="logo"
                />
              </div>
              <div className="w-4/6">
                <h3 className="text-md font-semibold">Banner</h3>
                <PhotoUpload
                  photoName={banner}
                  setPhotoName={setBanner}
                  size="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
