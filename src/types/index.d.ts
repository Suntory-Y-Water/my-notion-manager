interface BookProperties {
  highlights: string[];
  comments: string[];
}

interface PopupProps {
  message: string;
  type: 'success' | 'error' | null;
  onClose: () => void;
}
