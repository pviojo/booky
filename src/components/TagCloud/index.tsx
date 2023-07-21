import Link from 'next/link'


export default function TagCloud({
  tags,
}: {
  tags: any[],
}) {
  const maxCount = Math.max(...tags.map(tag => tag._count.bookmarks))
  const minCount = Math.min(...tags.map(tag => tag._count.bookmarks))
  return (
    <div className=''>
      {tags && <div className='inline-block mt-4 text-sm'>
        {tags.map(tag => (<span key={tag.id} className="tag-empty"
          style={{ fontSize: 10 + 14 * ((tag._count.bookmarks - minCount) / (maxCount - minCount)) }}
        ><Link href={`/tag/${tag.name}`}>{tag.name} ({tag._count.bookmarks})</Link></span>))}
      </div>}
    </div>
  )
}
