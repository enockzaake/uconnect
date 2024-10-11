import { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

import AdminApplicationsTable from "@/components/AdminApplicationsTable";
import DashboardHeader from "@/components/DashboardHeader";
import { TableLoadingSkeleton } from "@/components/Loaders";

export default async function Dashboard() {
  const stats = [
    {
      title: "New applications",
      value: "23",
      icon: DollarSign,
      change: "Applications received today",
      color: "bg-green-100 text-gray-900",
    },
    {
      title: "Resume",
      value: "Link",
      icon: Users,
      change: "Find last reviewed application",
      color: "bg-blue-100 text-gray-900",
    },
    {
      title: "On hold",
      value: "1,247",
      icon: ShoppingCart,
      change: "+19% from last month",
      color: "bg-yellow-100 text-gray-900",
    },
    {
      title: "Total completed",
      value: "456",
      icon: TrendingUp,
      change: "+2.3% from last month",
      color: "bg-purple-100 text-gray-900",
    },
  ];

  return (
    <div className="flex-1 flex-col overflow-hidden">
      <DashboardHeader title={" Dashboard Overview"} />
      {/* Dashboard Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
        <div className="container mx-auto space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className={`${stat.color} border-none`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-m font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs opacity-70">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Suspense key={""} fallback={<TableLoadingSkeleton />}>
            <AdminApplicationsTable />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
