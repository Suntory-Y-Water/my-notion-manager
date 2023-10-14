import { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://api.notion.com/v1';
const API_KEY = process.env.API_KEY;
const DATABASE_ID = process.env.DATABASE_ID;
const PAGE_URL = process.env.PAGE_URL;
const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

const createNewPage = async (pageTitle: string, highlights: string[], comments: string[]) => {
  const response = await fetch(`${API_URL}/pages`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      parent: {
        type: 'page_id',
        page_id: PAGE_URL,
      },
      properties: {
        title: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: pageTitle },
            },
          ],
        },
      },
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create a new page.');
  }

  const blocks = highlights.flatMap((highlight, index) => [
    {
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: { content: highlight },
          },
        ],
      },
    },
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: { content: comments[index] },
          },
        ],
      },
    },
  ]);
  await appendBlockChildren(data.id, blocks);
};

const appendBlockChildren = async (pageId: string, blocks: any[]) => {
  const response = await fetch(`${API_URL}/blocks/${pageId}/children`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ children: blocks }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to append block children.');
  }
};

const getBookProperties = async (selectBookName: string) => {
  const response = await fetch(`${API_URL}/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: HEADERS,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch data from Notion.');
  }

  const filteredPages = data.results.filter((page: any) => {
    const bookTitle = page.properties['📙  Book Title'].select.name;
    return bookTitle === selectBookName;
  });

  if (filteredPages.length === 0) {
    throw new Error('No pages found with the specified book title.');
  }

  const highlights = filteredPages.flatMap((page: any) =>
    page.properties['📝  Highlight'].title.map((title: any) => title.plain_text),
  );
  const comments = filteredPages.flatMap((page: any) =>
    page.properties['💬  Comment'].rich_text.map((richText: any) => richText.plain_text),
  );

  return { highlights, comments };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { bookName } = req.body;
  try {
    const properties = await getBookProperties(bookName);
    await createNewPage(bookName, properties.highlights, properties.comments);
    return res.status(200).json({ message: 'Page created successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'An unexpected error occurred.' });
  }
}
