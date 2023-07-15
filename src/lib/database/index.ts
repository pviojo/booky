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
      tags: true
    },
    orderBy: {
      id: 'desc',
    },

  })
  return bookmarks as unknown as BookmarkModel[];
}
export async function getBookmarksForAuthorTag(authorId: number, tag: string): Promise<BookmarkModel[]> {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      authorId,
      tags: {
        some: {
          name: tag
        }
      }
    },
    include: {
      author: true,
      tags: true
    },
    orderBy: {
      id: 'desc',
    },

  })
  return bookmarks as unknown as BookmarkModel[];
}

export async function createBookmark(url: string, title: string, description: string, tags: string[], image: string | null, authorId: number) {
  const connectedTags = (await Promise.all(tags.map(
    async (tag) => {
      const existingTag = await prisma.tag.findFirst({
        where: { name: tag }
      })
      let tagId: number | null = null;
      if (!existingTag) {
        const newTag = await prisma.tag.create({
          data: { name: tag }
        })
        tagId = newTag.id;
      } else {
        tagId = existingTag.id;
      }
      if (tagId) {
        return tagId;
      }
      return null;
    }
  ))).filter(x => !!x);
  console.log('connectedTags', connectedTags)

  const bookmarks = await prisma.bookmark.create({
    data: {
      url,
      title,
      description,
      image: image || '',
      authorId,
      tags: { connect: connectedTags.map(x => ({ id: x } as Prisma.TagWhereUniqueInput)) },
    }
  })
  return bookmarks
}

export async function deleteBookmark(id: number) {
  const rsp = await prisma.bookmark.delete({
    where: {
      id
    }
  })
  return rsp
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

