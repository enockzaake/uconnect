"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

import AdminApplicationsTable from "@/components/AdminApplicationsTable";
import DashboardHeader from "@/components/DashboardHeader";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSign,
      change: "+20.1% from last month",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Active Users",
      value: "2,350",
      icon: Users,
      change: "+180.1% from last month",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "New Orders",
      value: "1,247",
      icon: ShoppingCart,
      change: "+19% from last month",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      icon: TrendingUp,
      change: "+2.3% from last month",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const items = [
    {
      id: 1,
      name: "Product A",
      category: "Electronics",
      price: "$199.99",
      stock: 50,
    },
    {
      id: 2,
      name: "Product B",
      category: "Clothing",
      price: "$49.99",
      stock: 100,
    },
    {
      id: 3,
      name: "Product C",
      category: "Home & Garden",
      price: "$79.99",
      stock: 30,
    },
    {
      id: 4,
      name: "Product D",
      category: "Electronics",
      price: "$299.99",
      stock: 20,
    },
    {
      id: 5,
      name: "Product E",
      category: "Clothing",
      price: "$39.99",
      stock: 75,
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
                  <CardTitle className="text-sm font-medium">
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
          <AdminApplicationsTable />
        </div>
      </main>
    </div>
  );
}
