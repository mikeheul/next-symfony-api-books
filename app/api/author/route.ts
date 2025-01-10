import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const authors = await db.author.findMany({
            include: {
                books: true
            },
            orderBy: {
                lastname: 'asc'
            }
        });

        return NextResponse.json(authors);

    } catch (error) {
        console.log("[AUTHORS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}