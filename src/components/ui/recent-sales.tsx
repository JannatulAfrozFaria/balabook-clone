import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/index";

export default async function RecentSales() {
  const recentOrder:any = []
  // await prisma.order.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   take: 5,

  //   select: {
  //     id: true,
  //     amount: true,
  //     Customer: {
  //       select: {
  //         name: true,
  //         phone: true,
  //       },
  //     },
  //   },
  // });
  return (
    <div className="space-y-8">
      {recentOrder &&
        recentOrder?.map((order: any) => {
          return (
            <div className="flex items-center" key={order.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>{order.Customer.name}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.Customer.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.Customer.phone}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {order.amount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}{" "}
                ৳
              </div>
            </div>
          );
        })}
    </div>
  );
}
