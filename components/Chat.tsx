import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import ChatMessage from './ChatMessage';
import { startChat } from '@/utils/gemini';
import { FaPaperPlane } from 'react-icons/fa6';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef(startChat());

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage(input.trim());
      const response = await result.response;
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text(),
        role: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <h2 className="text-2xl font-bold mb-2">Welcome to AI Chat!</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {FaPaperPlane({ className: "w-5 h-5" })}
          </button>
        </div>
      </form>
    </div>
  );
} 