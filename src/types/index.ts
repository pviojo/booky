
export type UserModel = {
  id: number,
  email: string,
  name: string,
  bookmarks: BookmarkModel[]
}

export type BookmarkModel = {
  id: number,
  title: string,
  url: string,
  description: string,
  authorId: number,
  author: UserModel
}