
export type UserModel = {
  id: number,
  email: string,
  name: string,
  bookmarks: BookmarkModel[]
}

export type TagModel = {
  id: number,
  name: string,
}

export type BookmarkModel = {
  id: number,
  title: string,
  url: string,
  createdAt: Date,
  image: string,
  tags?: TagModel[],
  description: string,
  authorId: number,
  author: UserModel
}