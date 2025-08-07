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

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { customerName, customerPhone, customerAddress, totalAmount, status, items } = body;

    if (!customerName || !customerPhone || !totalAmount || !items || items.length === 0) {
      return new NextResponse('Missing required fields or order items', { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        customerName,
        customerPhone,
        customerAddress,
        totalAmount: parseFloat(totalAmount),
        status: status || 'PENDING',
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          })),
        },
      },
      include: { orderItems: true },
    });

    // Optionally update product stock here
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: parseInt(item.quantity) } },
      });
    }

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}