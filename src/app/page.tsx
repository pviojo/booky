import FormBookmark from '@/components/FormBookmark';
import { getBookmarksForAuthor } from '@/lib/database';
import Bookmark from '@/components/Bookmark';

const AUTHOR_ID = 1;

export default async function Home({
  searchParams
}: {
  searchParams: { t: string }
}) {
  const bookmarks = await getBookmarksForAuthor(AUTHOR_ID);

  const isAuthenticated = process.env.NODE_ENV === 'development' || searchParams?.t === process.env.ACCESS_TOKEN;

  return (
    <div className="inner">
      <div className="px-5 md:px-10 ">
        <div className='page-title'>Bookmarks</div>
        {isAuthenticated && <FormBookmark authorId={AUTHOR_ID} />}
        <div className='mt-10'>
          {bookmarks?.length ?
            <>{
              bookmarks.map((bookmark, i) => <div className="gap-6 flex py-4 [&:not(:last-child)]:border-b border-gray" key={bookmark.id} >
                <div style={{ width: 40, height: 40 }} className="text-sm aspect-square inline-block bg-gray-200 dark:bg-gray-500 rounded-full grid items-center justify-center mt-1"><span>{i + 1}</span></div>
                <div className="flex-auto">
                  <Bookmark bookmark={bookmark} isAuthenticated={isAuthenticated} />
                </div>
              </div>)
            }
            </>
            : <div>No bookmarks yet!</div>
          }
        </div>
      </div>
    </div>
  );
}
