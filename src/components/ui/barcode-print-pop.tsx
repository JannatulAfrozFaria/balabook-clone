"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import ReactToPrint from "react-to-print";
import { AspectRatio } from "./aspect-ratio";
import { Button } from "./button";
import { Printer } from "lucide-react";
import { Toaster } from "./toaster";
import Barcode from "react-barcode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { useRef } from "react";

export function BarCodeAlertDialog({
  entry,
  open,
  setOpen,
}: {
  entry: any;
  open: boolean;
  setOpen: any;
}) {
  const product = entry;
  // const componentRef = useRef();
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const componentRef = useRef<HTMLDivElement>(null);
  //  (product);

  // Output: One Hundred

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: 80mm 100mm; /* Custom size: 80mm width and 100mm height */
            margin: 0; /* Remove default margins */
          }
          body {
            -webkit-print-color-adjust: exact;
          }
          .print-card {
            width: 80mm;
            height: 100mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10mm;
            font-size: 12px; /* Adjust font size as needed */
          }
        }
      `}</style>
      <AlertDialog open={open}>
        <AlertDialogContent className="w-1/1 md:w-1/4">
          <AlertDialogHeader>
            {/* <AlertDialogTitle className="mb-2">Create New Order</AlertDialogTitle> */}
            <AlertDialogDescription>
              <Card
                ref={componentRef}
                className="flex flex-col justify-center items-center"
              >
                <CardHeader>
                  <CardTitle className="text-center">{product?.name}</CardTitle>
                  <CardDescription className="flex flex-col justify-center items-center">
                    <Barcode
                      className="text-center"
                      value={product.articleCode}
                      height="50"
                      width="2.5"
                      fontSize="12"
                    />
                    <p className="font-bold text-black">{product?.price} TK </p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => handleCloseDialog()} variant="outline">
              Cancel
            </Button>
            <ReactToPrint
              trigger={() => (
                <AlertDialogAction>
                  <Printer size="18" /> Print
                </AlertDialogAction>
              )}
              content={() => componentRef.current} // Pass a function that returns the content
            />
          </AlertDialogFooter>
        </AlertDialogContent>
        <Toaster />
      </AlertDialog>
    </>
  );
}
