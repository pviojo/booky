import FormBookmark from '@/components/FormBookmark';
import { getBookmarksForAuthorTag } from '@/lib/database';
import Bookmark from '@/components/Bookmark';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const AUTHOR_ID = 1;

export default async function TagPage({
  params,
  searchParams
}: {
  params: { name: string },
  searchParams: { t: string }
}) {
  const { name: tagName } = params;
  const bookmarks = await getBookmarksForAuthorTag(AUTHOR_ID, tagName);

  const isAuthenticated = process.env.NODE_ENV === 'development' || searchParams?.t === process.env.ACCESS_TOKEN;

  return (
    <div className="inner">
      <div className="px-5 md:px-10">
        <nav className="flex  mb-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                Bookmarks
              </Link>
              <svg className="w-3 h-2 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
            </li>
          </ol>
        </nav>
        <div className='page-title'><FontAwesomeIcon icon={faTag} className='mr-2 text-2xl' />{tagName}</div>
        {isAuthenticated && <FormBookmark authorId={AUTHOR_ID} defaultTags={tagName} />}
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
