import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const books = await db.book.findMany({
            include: {
                author: true,
            },
            orderBy: {
                title: 'asc'
            }
        });

        return NextResponse.json(books);

    } catch (error) {
        console.log("[BOOKS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
