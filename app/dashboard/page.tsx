"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface DashboardData {
  totalDailySales: number;
  totalWeeklySales: number;
  totalMonthlySales: number;
  recentOrders: Array<{
    id: string;
    customerName: string;
    totalAmount: number;
    status: string;
    productName: string;
    productSize: string;
  }>;
  lowStockProducts: Array<{
    id: string;
    name: string;
    stock: number;
  }>;
  bestSeller: string;
  conversionRate: string;
  canceledOrdersCount: number;
  avgOrderValue: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const fetchDashboardData = async () => {
        try {
          const res = await fetch('/api/dashboard');
          if (!res.ok) {
            throw new Error(`Failed to fetch dashboard data: ${res.statusText}`);
          }
          const data: DashboardData = await res.json();
          setDashboardData(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDashboardData();
    }
  }, [status, router]);

  if (loading) {
    return (
      <section className="py-20 sm:py-24 lg:py-32 flex items-center justify-center">
        <p className="text-ios-text-secondary dark:text-ios-text-secondary-dark">Loading dashboard...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 sm:py-24 lg:py-32 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  if (!dashboardData) {
    return (
      <section className="py-20 sm:py-24 lg:py-32 flex items-center justify-center">
        <p className="text-ios-text-secondary dark:text-ios-text-secondary-dark">No dashboard data available.</p>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Your Elijeweb Dashboard</h2>
          <p className="mt-4 text-lg text-ios-text-secondary dark:text-ios-text-secondary-dark">Everything you need to manage your sales and grow your business.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome / Quick Actions Panel */}
          <div className="lg:col-span-1 bg-ios-panel dark:bg-ios-panel-dark p-6 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Welcome, {session?.user?.name || 'Seller'}!</h3>
              <p className="text-ios-text-secondary dark:text-ios-text-secondary-dark mb-6">Here&apos;s a quick overview of your business performance.</p>
            </div>
            <div className="space-y-4">
              <Link href="#" className="block w-full px-6 py-3 text-center font-semibold text-white bg-ios-blue rounded-lg hover:opacity-90 transition-opacity">
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                  <span>Add New Product</span>
                </div>
              </Link>
              <Link href="#" className="block w-full px-6 py-3 text-center font-semibold text-ios-blue bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark rounded-lg hover:bg-gray-200 dark:hover:bg-ios-panel-dark transition-colors">
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 6l7 7m-13 0l-7 7m14 0l-7 -7m-7 0l7 7m-12 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0m8 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0m-8 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /></svg>
                  <span>View All Orders</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Sales Overview */}
          <div className="lg:col-span-2 bg-ios-panel dark:bg-ios-panel-dark p-6 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark">
            <h3 className="text-2xl font-bold mb-4">Sales Performance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark p-4 rounded-lg">
                <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">Today&apos;s Sales</p>
                <p className="text-3xl font-extrabold mt-1">{dashboardData.totalDailySales.toFixed(2)}<span className="text-lg">dt</span></p>
              </div>
              <div className="bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark p-4 rounded-lg">
                <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">This Week</p>
                <p className="text-3xl font-extrabold mt-1">{dashboardData.totalWeeklySales.toFixed(2)}<span className="text-lg">dt</span></p>
              </div>
              <div className="bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark p-4 rounded-lg">
                <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">This Month</p>
                <p className="text-3xl font-extrabold mt-1">{dashboardData.totalMonthlySales.toFixed(2)}<span className="text-lg">dt</span></p>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3">Revenue Trend</h4>
            <div className="h-48 bg-ios-bg dark:bg-ios-bg-dark rounded-lg flex items-end space-x-2 p-2">
              {/* Placeholder for chart bars - dynamic data would be better here */}
              <div className="w-full h-1/3 bg-ios-blue/30 rounded-t-sm"></div>
              <div className="w-full h-2/3 bg-ios-blue/50 rounded-t-sm"></div>
              <div className="w-full h-1/2 bg-ios-blue/40 rounded-t-sm"></div>
              <div className="w-full h-3/4 bg-ios-blue/60 rounded-t-sm"></div>
              <div className="w-full h-full bg-ios-blue/80 rounded-t-sm"></div>
              <div className="w-full h-2/3 bg-ios-blue/50 rounded-t-sm"></div>
              <div className="w-full h-1/2 bg-ios-blue/40 rounded-t-sm"></div>
              <div className="w-full h-4/5 bg-ios-blue/70 rounded-t-sm"></div>
              <div className="w-full h-1/4 bg-ios-blue/20 rounded-t-sm"></div>
              <div className="w-full h-3/5 bg-ios-blue/40 rounded-t-sm"></div>
              <div className="w-full h-full bg-ios-blue/80 rounded-t-sm"></div>
              <div className="w-full h-2/3 bg-ios-blue/50 rounded-t-sm"></div>
              <div className="w-full h-1/2 bg-ios-blue/40 rounded-t-sm"></div>
              <div className="w-full h-3/4 bg-ios-blue/60 rounded-t-sm"></div>
              <div className="w-full h-full bg-ios-blue/80 rounded-t-sm"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Orders */}
          <div className="bg-ios-panel dark:bg-ios-panel-dark p-6 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark">
            <h3 className="text-2xl font-bold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {dashboardData.recentOrders.length > 0 ? (
                dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark rounded-lg">
                    <div>
                      <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                      <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">{order.customerName} - {order.productName} ({order.productSize})</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{order.totalAmount.toFixed(2)}dt</span>
                      <span className={`block text-xs px-2 py-0.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>{order.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-ios-text-secondary dark:text-ios-text-secondary-dark">No recent orders.</p>
              )}
            </div>
          </div>

          {/* Stock & Analytics Quick View */}
          <div className="space-y-8">
            <div className="bg-ios-panel dark:bg-ios-panel-dark p-6 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark">
              <h3 className="text-2xl font-bold mb-4">Stock Levels</h3>
              <div className="space-y-4">
                {dashboardData.lowStockProducts.length > 0 ? (
                  dashboardData.lowStockProducts.map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-2 rounded-md bg-red-500/10 dark:bg-red-500/20 ring-1 ring-red-500/30">
                      <span className="font-medium text-sm text-red-700 dark:text-red-400">{product.name}</span>
                      <div className="flex items-center space-x-2 text-sm"><span className="font-mono font-medium text-red-500">{product.stock}</span><span className="text-red-700 dark:text-red-400">low stock</span></div>
                    </div>
                  ))
                ) : (
                  <p className="text-ios-text-secondary dark:text-ios-text-secondary-dark">All products are well stocked!</p>
                )}
              </div>
            </div>

            <div className="bg-ios-panel dark:bg-ios-panel-dark p-6 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark">
              <h3 className="text-2xl font-bold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark rounded-lg">
                  <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">Conversion Rate</p>
                  <p className="text-xl font-bold text-green-500 mt-1">{dashboardData.conversionRate}%</p>
                </div>
                <div className="p-3 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark rounded-lg">
                  <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">Avg Order Value</p>
                  <p className="text-xl font-bold mt-1">{dashboardData.avgOrderValue}<span className="text-base">dt</span></p>
                </div>
                <div className="p-3 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark rounded-lg">
                  <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">Best Seller (Month)</p>
                  <p className="text-lg font-semibold mt-1">{dashboardData.bestSeller}</p>
                </div>
                <div className="p-3 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark rounded-lg">
                  <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">Canceled Orders</p>
                  <p className="text-xl font-bold text-red-500 mt-1">{dashboardData.canceledOrdersCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}