import React from "react";
import OfferCard from "./OfferCard";
import prisma from "@/index";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/order-alert-dialog";

async function OfferGrid() {
  const data: any = await prisma.offer.findMany({
    where: {
      status: "Active",
    },
  });

  // console.log("data:", data);
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
      {data.length > 0 ? (
        data.map((offer: any) => {
          return (
            <div key={offer.id}>
              <OfferCard offer={offer}/>
            </div>
          );
        })
      ) : (
        <p>No Offer Found For Create Order</p>
      )}

    </div>
  );
}

export default OfferGrid;
