"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/offerCard";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { CreateOrderAlertDialog } from "@/components/ui/alert-order-create";

const OfferCard = (offer: any) => {
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState([]);

  const handleCreateOrder = (offer: any) => {
    // console.log("On Click");
    setOpen(true);
    setEntry(offer);
  };
  return (
    <>
      <Card className="w-full" key={offer.offer.id}>
        <CardContent>
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={
                  offer.offer.photo !== ""
                    ? `/img/${offer.offer.photo}`
                    : "/img/offer-photo.png"
                }
                height="150"
                width="300"
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>{offer.offer.name}</CardTitle>
          <CardDescription>{offer.offer.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex">
          <Button className=" w-full" onClick={() => handleCreateOrder(offer)}>
            Order
          </Button>
        </CardFooter>
      </Card>
      <CreateOrderAlertDialog entry={entry} open={open} setOpen={setOpen} />
    </>
  );
};

export default OfferCard;
