interface BookProperties {
  highlights: string[];
  comments: string[];
}

interface PopupProps {
  message: string;
  type: 'success' | 'error' | null;
  onClose: () => void;
}

interface Page {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  cover: any;
  icon: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: any;
}

interface User {
  object: string;
  id: string;
}

interface Parent {
  type: string;
  database_id: string;
}

interface Properties {
  '📎  Media': Media;
  '💬  Comment': Comment;
  '✍🏼  Author': Author;
  'Created At': CreatedAt;
  '📙  Book Title': BookTitle;
  '🏷  Tags': Tags;
  '📝  Highlight': Highlight;
}

interface Media {
  id: string;
  type: string;
  files: any[];
}

interface Comment {
  id: string;
  type: string;
  rich_text: RichText[];
}

interface Author {
  id: string;
  type: string;
  select: any;
}

interface CreatedAt {
  id: string;
  type: string;
  created_time: string;
}

interface BookTitle {
  id: string;
  type: string;
  select: any;
}

interface Tags {
  id: string;
  type: string;
  multi_select: any[];
}

interface Highlight {
  id: string;
  type: string;
  title: Text[];
}

interface RichText {
  type: string;
  text: TextContent;
  annotations: Annotations;
  plain_text: string;
  href: any;
}

interface TextContent {
  content: string;
  link: any;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Text {
  type: string;
  text: any;
  annotations: any;
  plain_text: string;
  href: any;
}

type Block = {
  type: 'heading_2' | 'paragraph';
  heading_2?: {
    rich_text: [
      {
        type: string;
        text: { content: string };
      },
    ];
  };
};
