import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { bookId: string } }) {
    
    const { bookId } = await params;

    try {
        const book = await db.book.findUnique({
            where: {
                id: bookId,
            },
            include: {
                author: true
            }
        });

        if (!book) {
            return NextResponse.json({ message: 'Livre non trouvé' }, { status: 404 });
        }

        return NextResponse.json(book);
    } catch (error) {
        console.error('Erreur lors de la récupération du livre :', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}