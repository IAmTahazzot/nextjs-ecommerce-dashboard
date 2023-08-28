import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { catId: string } },
) {
  try {
    if (!params.catId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.catId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { catId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.catId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.catId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETED]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { catId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    if (!params.catId) {
      return new NextResponse('category id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const billboard = await prismadb.category.update({
      where: {
        id: params.catId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
