export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
} 