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

export async function POST(req: Request) {
    try {
        // Récupérer les données envoyées dans la requête
        const { title, description, publishedDate, pages, authorId } = await req.json();

        // Valider les données (facultatif, mais recommandé)
        if (!title || !authorId || !publishedDate || !pages) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Créer le livre dans la base de données MongoDB via Prisma
        const book = await db.book.create({
            data: {
                title,
                description: description || null,  // Si la description est optionnelle
                publishedDate,
                pages,
                authorId,
            }
        });

        // Répondre avec le livre créé
        return NextResponse.json(book, { status: 201 });

    } catch (error) {
        console.error('Error adding book:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
