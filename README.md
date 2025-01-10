# Next.js API - Books and Authors

This is a Next.js project that provides an API for listing books, authors, and the details of individual books and authors. The project uses Prisma ORM to interact with a MongoDB database.

## Tech Stack
- **Next.js**: A React framework for building server-side rendered (SSR) applications.
- **Prisma ORM**: An ORM used to interact with MongoDB.
- **MongoDB**: NoSQL database to store the data.

## Getting Started

### Prerequisites
1. Node.js (v14 or later)
2. MongoDB (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextjs-books-authors-api.git
cd nextjs-books-authors-api
```

2. Install the dependencies:

```bash
npm install
```

3. Configure Prisma:
   - In the `prisma/schema.prisma` file, set up the connection to your MongoDB database by modifying the `datasource` block:

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")  // Example: mongodb://localhost:27017/your-database
}
```

4. Create and apply the Prisma schema:

```bash
npx prisma migrate dev --name init
```

5. Set the environment variables:
   - Create a `.env` file at the root of the project and add your MongoDB connection string:

```
DATABASE_URL=mongodb://your-database-url
```

6. Start the development server:

```bash
npm run dev
```

The application will now be running on `http://localhost:3000`.

### API Endpoints

#### **1. List all books**
- **Endpoint**: `GET /api/books`
- **Description**: Retrieves a list of all books.
- **Response**:
```json
[
  {
    "id": "book1",
    "title": "Book Title 1",
    "publishedDate": "2022-01-01",
    "authorId": "author1"
  },
  ...
]
```

#### **2. List all authors**
- **Endpoint**: `GET /api/authors`
- **Description**: Retrieves a list of all authors.
- **Response**:
```json
[
  {
    "id": "author1",
    "firstname": "John",
    "lastname": "Doe"
  },
  ...
]
```

#### **3. Get details of a book**
- **Endpoint**: `GET /api/books/:id`
- **Description**: Retrieves detailed information about a specific book.
- **Response**:
```json
{
  "id": "book1",
  "title": "Book Title 1",
  "publishedDate": "2022-01-01",
  "description": "Detailed description of the book",
  "author": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

#### **4. Get details of an author**
- **Endpoint**: `GET /api/authors/:id`
- **Description**: Retrieves detailed information about a specific author.
- **Response**:
```json
{
  "id": "author1",
  "firstname": "John",
  "lastname": "Doe",
  "books": [
    {
      "id": "book1",
      "title": "Book Title 1",
      "publishedDate": "2022-01-01"
    },
    ...
  ]
}
```

## Deployment

To deploy the app to production, you can use platforms like Vercel or any platform that supports Node.js.

1. Build the project:

```bash
npm run build
```

2. Deploy to your preferred platform.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
