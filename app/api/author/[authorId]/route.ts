import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { authorId: string } }) {
    
    const { authorId } = params;

    try {
        const author = await db.author.findUnique({
            where: {
                id: authorId,
            },
            include: {
                books: {
                    orderBy: {
                        publishedDate: 'desc'
                    }
                }
            }
        });

        if (!author) {
            return NextResponse.json({ message: 'Auteur non trouvé' }, { status: 404 });
        }

        return NextResponse.json(author);
    } catch (error) {
        console.error('Erreur lors de la récupération auteur :', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}