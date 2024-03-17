"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { OfferFormSchema } from "./productFormSchema";
import { createOffer, updateOffer } from "./_action";

import PhotoUpload from "./photoUpload";
import { useEffect, useState } from "react";

function OfferForm({ offer }: { offer: any }) {
  const router = useRouter();
  const [photoName, setPhotoName] = useState<string>("offer-photo.png");

  useEffect(() => {
    if (offer?.photo) {
      setPhotoName(offer?.photo);
    }
  }, [offer]);

  const form = useForm<z.infer<typeof OfferFormSchema>>({
    resolver: zodResolver(OfferFormSchema),
    defaultValues: {
      name: offer ? offer.name : "",
      photo: offer ? offer.photo : photoName,
      description: offer ? offer.description : "",
      price: offer ? offer.price : "",
      offerId: offer ? offer.offerId : "",
      status: offer ? offer.status : "Active",
    },
  });

  useEffect(() => {
    if (photoName) {
      form.setValue("photo", photoName, { shouldValidate: true });
    }
  }, [photoName]);

  async function onSubmit(data: z.infer<typeof OfferFormSchema>) {
    // console.log("id", offer);
    try {
      if (offer === undefined) {
        // CREATE OFFER
        // console.log("new Offer", data);
        //@ts-ignore
        const newOffer = await createOffer(data);
        console.log("newOffer", newOffer);

        if (newOffer) {
          toast.success("Offer Creation Success");
          revalidatePath("/dashboard/offers");
          form.reset();
          //   router.back();
        } else {
          toast.error("Offer Creatation faield!");
        }
      } else {
        // UPDATE OFFER
        const id = offer.id;
        console.log("update", data);
        //@ts-ignore
        const updateoffer = await updateOffer(id, data);
        if (!updateoffer) {
          toast.error("Offer Update faield!");
        } else {
          toast.success("Offer Update Success");
          //   revalidatePath("/dashboard/offers");
          router.push("/dashboard/offers");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-5/6 space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Offer Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer ID</FormLabel>
                <FormControl>
                  <Input placeholder="offer id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Photo</FormLabel>
                <FormControl>
                  <Input placeholder="photo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Active" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <PhotoUpload photoName={photoName} setPhotoName={setPhotoName} />

      <Toaster />
    </div>
  );
}

export default OfferForm;
