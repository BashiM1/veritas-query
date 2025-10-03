import React, { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const AIChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm Veritas Query, your AI research assistant. I help unlock insights and find answers to complex questions. What would you like to explore today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective on that topic...",
      "Great point! I'd be happy to help you with that.",
      "That's a thoughtful question. Based on what I know...",
      "I see what you mean. Let me provide some insights on that...",
      "Thanks for asking! Here's what I think about that...",
    ]

    if (
      userMessage.toLowerCase().includes("hello") ||
      userMessage.toLowerCase().includes("hi")
    ) {
      return "Hello there! It's great to meet you. What would you like to chat about?"
    }

    if (userMessage.toLowerCase().includes("help")) {
      return "I'm Veritas Query, designed to help you discover truth and insights! I can assist with research, data analysis, fact-checking, answering complex questions, or exploring topics in depth. What kind of inquiry can I help you with?"
    }

    return (
      responses[Math.floor(Math.random() * responses.length)] +
      " " +
      "This is a demo response to show how the chat interface works. In a real implementation, this would connect to an actual AI service."
    )
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(newUserMessage.content),
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <circle cx="50" cy="50" r="35" className="fill-slate-600" />
                <rect
                  x="45"
                  y="15"
                  width="3"
                  height="25"
                  className="fill-white"
                />
                <rect
                  x="40"
                  y="20"
                  width="3"
                  height="20"
                  className="fill-white"
                />
                <rect
                  x="35"
                  y="25"
                  width="3"
                  height="15"
                  className="fill-white"
                />
                <rect
                  x="30"
                  y="30"
                  width="3"
                  height="10"
                  className="fill-white"
                />
                <rect
                  x="50"
                  y="10"
                  width="3"
                  height="30"
                  className="fill-white"
                />
                <rect
                  x="55"
                  y="20"
                  width="3"
                  height="20"
                  className="fill-white"
                />
                <rect
                  x="60"
                  y="25"
                  width="3"
                  height="15"
                  className="fill-white"
                />
                <rect
                  x="65"
                  y="30"
                  width="3"
                  height="10"
                  className="fill-white"
                />
                <rect
                  x="47"
                  y="45"
                  width="6"
                  height="35"
                  rx="3"
                  className="fill-white"
                />
                <rect
                  x="44"
                  y="55"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="44"
                  y="60"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="44"
                  y="65"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="44"
                  y="70"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="54"
                  y="55"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="54"
                  y="60"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="54"
                  y="65"
                  width="2"
                  height="3"
                  className="fill-white"
                />
                <rect
                  x="54"
                  y="70"
                  width="2"
                  height="3"
                  className="fill-white"
                />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black/20"></div>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Veritas Query</h1>
            <p className="text-purple-300 text-sm">
              Unlocking insights with AI
            </p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
            >
              {message.sender === "user" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>

            <div
              className={`flex flex-col max-w-xs lg:max-w-md xl:max-w-lg ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-sm"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              <span className="text-xs text-gray-400 mt-1 px-1">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-black/20 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="relative max-w-4xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={() =>
              setInputValue("What research capabilities do you have?")
            }
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white transition-all"
          >
            Research capabilities
          </button>
          <button
            onClick={() => setInputValue("Help me analyze this data")}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white transition-all"
          >
            Data analysis
          </button>
          <button
            onClick={() => setInputValue("Fact-check this information")}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white transition-all"
          >
            Fact-check
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatApp
