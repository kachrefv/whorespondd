import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    // Total Sales (This Month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const monthlySales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        userId,
        status: 'DELIVERED',
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    const totalMonthlySales = monthlySales._sum.totalAmount || 0;

    // Total Sales (This Week)
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklySales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        userId,
        status: 'DELIVERED',
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });
    const totalWeeklySales = weeklySales._sum.totalAmount || 0;

    // Total Sales (Today)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const dailySales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        userId,
        status: 'DELIVERED',
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    const totalDailySales = dailySales._sum.totalAmount || 0;

    // Recent Orders
    const recentOrders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    // Stock Levels (low stock items)
    const lowStockProducts = await prisma.product.findMany({
      where: {
        userId,
        stock: { lte: 5 }, // Example threshold for low stock
      },
      orderBy: { stock: 'asc' },
    });

    // Best Seller (This Month)
    const bestSeller = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      where: {
        order: {
          userId,
          status: 'DELIVERED',
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 1,
    });

    let bestSellerProduct = null;
    if (bestSeller.length > 0) {
      bestSellerProduct = await prisma.product.findUnique({
        where: { id: bestSeller[0].productId },
        select: { name: true },
      });
    }

    // Conversion Rate (simple example: delivered orders / total orders)
    const totalOrders = await prisma.order.count({ where: { userId } });
    const deliveredOrders = await prisma.order.count({
      where: { userId, status: 'DELIVERED' },
    });
    const conversionRate = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

    // Canceled Orders
    const canceledOrdersCount = await prisma.order.count({
      where: { userId, status: 'CANCELED' },
    });

    // Avg Order Value
    const avgOrderValueResult = await prisma.order.aggregate({
      _avg: {
        totalAmount: true,
      },
      where: {
        userId,
        status: 'DELIVERED',
      },
    });
    const avgOrderValue = avgOrderValueResult._avg.totalAmount || 0;

    return NextResponse.json({
      totalDailySales,
      totalWeeklySales,
      totalMonthlySales,
      recentOrders: recentOrders.map(order => ({
        ...order,
        productName: order.orderItems[0]?.product?.name || 'N/A',
        productSize: order.orderItems[0]?.product?.description?.match(/\(([^)]+)\)/)?.[1] || 'N/A' // Extract size from description if present
      })),
      lowStockProducts,
      bestSeller: bestSellerProduct ? bestSellerProduct.name : 'N/A',
      conversionRate: conversionRate.toFixed(1),
      canceledOrdersCount,
      avgOrderValue: avgOrderValue.toFixed(2),
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}