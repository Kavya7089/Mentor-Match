import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // <-- Add this import

const Chatbot: React.FC = () => {
  type Message = { sender: 'user' | 'ai'; text: string } | { sender: 'loading'; text: string; id: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEscalateButton, setShowEscalateButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setInput('');
    setIsLoading(true);
    const loadingMessage = { id: `loading-${Date.now()}`, text: '', sender: 'loading' as const };
    setMessages(msgs => [...msgs, loadingMessage]);
    setMessages(msgs => [...msgs, loadingMessage]);

    try {
      const response = await fetch('https://mentor-match-backend-14rp.onrender.com/api/groq/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const aiText = data.response || "Sorry, I couldn't get a response from the AI.";

      setMessages(msgs =>
        msgs.filter(msg => msg.sender !== 'loading').concat({ sender: 'ai', text: aiText })
      );

      if (aiText.toLowerCase().includes('not sure')) {
        setShowEscalateButton(true);
      }
    } catch (error) {
      setMessages(msgs =>
        msgs.filter(msg => msg.sender !== 'loading').concat({
          sender: 'ai',
          text: "There was an error connecting to the AI service.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalateToMentor = () => {
    setMessages(msgs => [
      ...msgs,
      {
        sender: 'ai',
        text: "I've sent a request to our available mentors. Someone will connect with you shortly to help answer your question in more detail.",
      },
    ]);
    setShowEscalateButton(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={msg.sender === 'loading' && 'id' in msg ? msg.id : idx}
              className={
                msg.sender === 'user'
                  ? 'user-msg'
                  : msg.sender === 'ai'
                  ? 'ai-msg'
                  : 'loading-msg'
              }
            >
              {msg.sender === 'ai' ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : msg.sender === 'loading' ? (
                <Loader2 className="animate-spin" />
              ) : (
                msg.text
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          {showEscalateButton && (
            <div className="my-4 flex justify-center">
              <button
                onClick={handleEscalateToMentor}
                className="rounded-full bg-highlight-500 px-4 py-2 text-sm font-medium text-white hover:bg-highlight-600 focus:outline-none focus:ring-2 focus:ring-highlight-500 focus:ring-offset-2"
              >
                Connect with a mentor
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="btn btn-primary aspect-square !p-2"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
