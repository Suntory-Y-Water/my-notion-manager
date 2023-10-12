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
  try {
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

    // Create an array of blocks for all highlights and comments
    const blocks = highlights.flatMap((highlight, index) => [
      {
        type: 'heading_2',
        heading_2: {
          rich_text: [
            // rich_textプロパティを追加
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
  } catch (error) {}
};

const appendBlockChildren = async (pageId: string, blocks: any[]) => {
  try {
    await fetch(`${API_URL}/blocks/${pageId}/children`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ children: blocks }),
    });
  } catch (error) {}
};

const getBookProperties = async (
  selectBookName: string,
): Promise<{ highlights: string[]; comments: string[] } | {}> => {
  try {
    const response = await fetch(`${API_URL}/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: HEADERS,
    });
    const data = await response.json();

    const filteredPages = data.results.filter((page: any) => {
      const bookTitle = page.properties['📙  Book Title'].select.name;
      return bookTitle === selectBookName;
    });

    if (filteredPages.length > 0) {
      const highlights = filteredPages.flatMap((page: any) =>
        page.properties['📝  Highlight'].title.map((title: any) => title.plain_text),
      );
      const comments = filteredPages.flatMap((page: any) =>
        page.properties['💬  Comment'].rich_text.map((richText: any) => richText.plain_text),
      );
      return { highlights, comments };
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { bookName } = req.body;
    try {
      const properties = await getBookProperties(bookName);
      if ('highlights' in properties && 'comments' in properties) {
        const { highlights, comments } = properties;
        await createNewPage(bookName, highlights, comments);
        res.status(200).json({ message: 'Page created successfully.' });
      } else {
        res.status(404).json({ message: 'No pages found with the specified book title.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
