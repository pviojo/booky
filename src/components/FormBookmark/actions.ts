"use server";

import * as cheerio from 'cheerio';

import { createBookmark, deleteBookmark } from '@/lib/database';
import { revalidatePath } from 'next/cache';

function getFixedUrl(url: string) {
  let fixedUrl = url;
  if (!/^https?:\/\//i.test(fixedUrl)) {
    fixedUrl = 'https://' + fixedUrl;
  }
  return fixedUrl;
}
export async function retrieveUrlInfo(url: string) {
  const fixedUrl = getFixedUrl(url);
  const rsp = await fetch(fixedUrl)
    .catch((err) => { console.error(err) }) as Response

  if (!rsp?.ok) {
    return {
      status: false,
      error: 'URL not retrieved'
    }
  }
  const body = await rsp.text();

  const $ = cheerio.load(body);

  const title = $('title').text() || '';
  const description = $('meta[name="description"]').attr('content') || $('meta[name="twitter:description"]').attr('content') || '';

  return {
    status: true,
    title,
    description
  };
}

export async function saveBookmark(data: FormData, authorId: number) {
  if (!data.get('url')) {
    return null;
  }
  const fixedUrl = getFixedUrl(data.get('url') as string);
  await createBookmark(
    fixedUrl,
    data.get('title') as string,
    data.get('description') as string,
    authorId,
  )
  revalidatePath('/bookmarks');
}

export async function deleteBookmarkAction(id: number) {
  await deleteBookmark(id)
  revalidatePath('/bookmarks');
}