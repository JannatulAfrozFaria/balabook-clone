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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export function PoPrintalog({
  entry,
  open,
  setOpen,
}: {
  entry: any;
  open: boolean;
  setOpen: any;
}) {
  const product = entry;
  const componentRef = useRef();
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const productsInfo = product?.products;
  console.log(productsInfo);

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4; /* Set the page size to A4 */
            margin: 0; /* Remove default margins */
          }
          body {
            -webkit-print-color-adjust: exact;
          }
          .print-card {
            width: 210mm;
            height: 297mm;
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
        <AlertDialogContent className="max-w-[800px] min-w-[200px]">
          <AlertDialogHeader>
            {/* <AlertDialogTitle className="mb-2">Create New Order</AlertDialogTitle> */}
            <AlertDialogDescription>
              <Card ref={componentRef} className=" rounded-none">
                <CardHeader>
                  <CardTitle className="text-center">{product?.name}</CardTitle>
                  <CardDescription>
                    {/* <Barcode
                      className="text-center"
                      value={product.articleCode}
                      height="50"
                      width="2.5"
                      fontSize="12"
                    /> */}

                    <div className="flex justify-between">
                      <div className="w-1/2">
                        <h1 className="font-bold ">To</h1>
                        <h2>{product.supplier.name}</h2>
                        <h1 className="font-bold mt-4">From</h1>
                        <h2>{product.user.name}</h2>
                      </div>
                      <div className="w-1/2 flex flex-col items-end">
                        <h1 className="text-lg font-bold mb-2 ">
                          Purchase Order
                        </h1>
                        <h2 className="font-bold">
                          PO No:{" "}
                          <span className="font-normal">{product.poNo}</span>
                        </h2>
                        {/* <h2 className="font-bold">
                        PO Date: <span className="font-normal"></span>
                      </h2> */}
                        <h2 className="font-bold">
                          Status:{" "}
                          <span className="font-normal">{product.status}</span>
                        </h2>
                        <Barcode
                          className="text-center"
                          value={product.poNo}
                          height="25"
                          width="1"
                          fontSize="10"
                        />
                      </div>
                    </div>
                    <div>
                      <Table>
                        <TableCaption>
                          A list of your recent invoices.
                        </TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className="text-right">TP</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {productsInfo.map((product: any) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                {product.articleCode}
                              </TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.qty}</TableCell>
                              <TableCell>
                                {product.tp ? product.tp : "0"}
                              </TableCell>
                              <TableCell className="text-right">
                                {product.mrp}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">
                              ৳ {product.total}
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>
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
              content={componentRef.current}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
        <Toaster />
      </AlertDialog>
    </>
  );
}
