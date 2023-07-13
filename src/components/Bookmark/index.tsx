import { BookmarkModel } from '@/types'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DeleteBookmarkButton from '../DeleteBookmarkButton'


export default function Bookmark({
  bookmark,
  isAuthenticated,
}: {
  bookmark: BookmarkModel,
  isAuthenticated: boolean,
}) {
  return (
    <div className='relative'>
      {isAuthenticated && <DeleteBookmarkButton id={bookmark.id} />}
      {bookmark.title && <div className='text-lg'>
        {bookmark.title}
      </div>
      }
      <div className='text-sm mb-4'>
        <a href={bookmark.url} target="_blank" rel="noreferrer">
          {bookmark.url}
          <FontAwesomeIcon icon={faExternalLink} className='ml-2' />
        </a>

      </div>
      {bookmark.description && <div className='text-sm'>
        {bookmark.description}
      </div>}
    </div>
  )
}
