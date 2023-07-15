import { BookmarkModel } from '@/types'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DeleteBookmarkButton from '../DeleteBookmarkButton'
import Link from 'next/link'


export default function Bookmark({
  bookmark,
  isAuthenticated,
}: {
  bookmark: BookmarkModel,
  isAuthenticated: boolean,
}) {
  return (
    <div className='relative grid grid-cols-[1fr_auto_auto] gap-8'>
      <div>
        {bookmark.title && <div className='text-lg mb-2'>
          {<a href={bookmark.url} target="_blank" rel="noreferrer">{bookmark.title}<FontAwesomeIcon icon={faExternalLink} className='ml-2' /></a>}
        </div>
        }
        <div className='text-xs mb-8'>
          <a href={bookmark.url} target="_blank" rel="noreferrer" className='text-gray-500'>
            {bookmark.url}
          </a>

        </div>
        {bookmark.description && <div className='text-sm'>
          {bookmark.description}
        </div>}
        {bookmark.tags && <div className='text-sm mt-4'>
          {bookmark.tags.map(tag => (<span key={tag.id} className="tag"><Link href={`/tag/${tag.name}`}>{tag.name}</Link></span>))}
        </div>}
      </div>
      <div>
        {bookmark.image && <div className='text-lg'>
          <img src={bookmark.image} width={200} height={200} alt="" />
        </div>
        }
      </div>
      {isAuthenticated && <DeleteBookmarkButton id={bookmark.id} />}


    </div>
  )
}
