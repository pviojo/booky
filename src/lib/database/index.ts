import { PrismaClient, Prisma } from '@prisma/client'
import { BookmarkModel } from '@/types';

const prisma = new PrismaClient()

export async function getBookmarksForAuthor(authorId: number): Promise<BookmarkModel[]> {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      authorId
    },
    include: {
      author: true,
    },
    orderBy: {
      id: 'desc',
    },

  })
  return bookmarks as unknown as BookmarkModel[];
}

export async function createBookmark(url: string, title: string, description: string, authorId: number) {
  const bookmarks = await prisma.bookmark.create({
    data: {
      url,
      title,
      description,
      authorId,
    }
  })
  return bookmarks
}

/*main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })*/