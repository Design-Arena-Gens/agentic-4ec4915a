'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface StudyTimer {
  isRunning: boolean;
  seconds: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your personal AI study assistant. I can help you with:\n\n• Explaining difficult concepts\n• Creating study plans\n• Generating practice questions\n• Summarizing notes\n• Time management tips\n• Homework help\n\nWhat would you like to work on today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<StudyTimer>({ isRunning: false, seconds: 0 });
  const [activeTab, setActiveTab] = useState<'chat' | 'flashcards' | 'timer'>('chat');
  const [flashcards, setFlashcards] = useState<Array<{ question: string; answer: string; revealed: boolean }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer(prev => ({ ...prev, seconds: prev.seconds + 1 }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);

      // Auto-generate flashcards if user asks
      if (input.toLowerCase().includes('flashcard') || input.toLowerCase().includes('quiz')) {
        generateFlashcards(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFlashcards = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const cards: Array<{ question: string; answer: string; revealed: boolean }> = [];

    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].includes('?') || lines[i].match(/^\d+\./)) {
        cards.push({
          question: lines[i].replace(/^\d+\.\s*/, '').trim(),
          answer: lines[i + 1].trim(),
          revealed: false
        });
      }
    }

    if (cards.length > 0) {
      setFlashcards(cards);
      setActiveTab('flashcards');
    }
  };

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimer({ isRunning: false, seconds: 0 });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleFlashcard = (index: number) => {
    setFlashcards(prev => prev.map((card, i) =>
      i === index ? { ...card, revealed: !card.revealed } : card
    ));
  };

  const quickPrompts = [
    "Explain this concept to me",
    "Create a study plan",
    "Generate practice questions",
    "Help with my homework",
    "Study tips for exams"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            📚 Student AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Your personal study companion powered by AI</p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'chat'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              🎴 Flashcards {flashcards.length > 0 && `(${flashcards.length})`}
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'timer'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              ⏱️ Study Timer
            </button>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-3 ${
                        message.role === 'user'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(prompt)}
                      className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-indigo-500 focus:outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-8 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Flashcards Tab */}
          {activeTab === 'flashcards' && (
            <div className="p-6 h-[600px] overflow-y-auto">
              {flashcards.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🎴</div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No flashcards yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ask me to create flashcards or practice questions in the chat!
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {flashcards.map((card, index) => (
                    <div
                      key={index}
                      onClick={() => toggleFlashcard(index)}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow min-h-[200px] flex flex-col justify-center"
                    >
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                        Card {index + 1}
                      </div>
                      <div className="text-gray-800 dark:text-gray-200">
                        <p className="font-semibold mb-3">{card.question}</p>
                        {card.revealed && (
                          <p className="text-gray-600 dark:text-gray-300 pt-3 border-t border-gray-300 dark:border-gray-500">
                            {card.answer}
                          </p>
                        )}
                        {!card.revealed && (
                          <p className="text-gray-400 dark:text-gray-500 text-sm italic">
                            Click to reveal answer
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Timer Tab */}
          {activeTab === 'timer' && (
            <div className="p-6 h-[600px] flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">⏱️</div>
                <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-8">
                  Study Session Timer
                </h3>
                <div className="text-7xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-8">
                  {formatTime(timer.seconds)}
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={toggleTimer}
                    className="px-8 py-4 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors text-lg"
                  >
                    {timer.isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="px-8 py-4 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors text-lg"
                  >
                    Reset
                  </button>
                </div>
                <div className="mt-8 text-gray-600 dark:text-gray-400">
                  <p className="mb-2">💡 Tip: Use the Pomodoro Technique</p>
                  <p className="text-sm">Study for 25 minutes, then take a 5-minute break</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>Powered by AI • Built for Students</p>
        </footer>
      </div>
    </div>
  );
}
