-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bookmark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Bookmark_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("authorId", "description", "id", "image", "title", "url") SELECT "authorId", "description", "id", "image", "title", "url" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
