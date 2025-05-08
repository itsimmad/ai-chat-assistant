import { Message } from '@/types/chat';
import { FaUser, FaRobot } from 'react-icons/fa6';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-gray-50/50' : 'bg-gray-900/5'} rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all`}>
      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${isUser ? 'bg-blue-500' : 'bg-purple-600'} text-white shadow-lg`}>
        {isUser ? FaUser({ size: 20 }) : FaRobot({ size: 20 })}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1 dark:text-white">{isUser ? 'You' : 'AI Assistant'}</div>
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.content}</div>
      </div>
      <div className="text-xs text-gray-400">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
} 