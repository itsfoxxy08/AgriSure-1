import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses: Record<string, string[]> = {
  en: [
    "Hello! I'm AgriBot, your farming assistant. How can I help you today?",
    "I can help you with government schemes, mandi prices, and farming queries.",
    "For PM-KISAN scheme, you need Aadhaar card and land records. Visit pmkisan.gov.in to apply.",
    "Current wheat prices are around ₹2,450 per quintal in major mandis.",
    "To report corruption, use our anonymous reporting system. Your identity will be protected.",
    "You can check scheme eligibility based on your land size and location.",
  ],
  hi: [
    "नमस्ते! मैं एग्रीबॉट हूं, आपका कृषि सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
    "मैं सरकारी योजनाओं, मंडी भावों और कृषि प्रश्नों में आपकी सहायता कर सकता हूं।",
    "पीएम-किसान योजना के लिए आधार कार्ड और भूमि रिकॉर्ड चाहिए। आवेदन के लिए pmkisan.gov.in पर जाएं।",
    "वर्तमान में गेहूं का भाव प्रमुख मंडियों में लगभग ₹2,450 प्रति क्विंटल है।",
    "भ्रष्टाचार की रिपोर्ट करने के लिए हमारी गुमनाम रिपोर्टिंग प्रणाली का उपयोग करें।",
    "आप अपनी भूमि के आकार और स्थान के आधार पर योजना की पात्रता जांच सकते हैं।",
  ],
  pa: [
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਐਗਰੀਬੋਟ ਹਾਂ, ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    "ਮੈਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ, ਮੰਡੀ ਭਾਵਾਂ ਅਤੇ ਖੇਤੀ ਸਵਾਲਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਸਹਾਇਤਾ ਕਰ ਸਕਦਾ ਹਾਂ।",
    "ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ ਲਈ ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਜ਼ਮੀਨ ਦੇ ਰਿਕਾਰਡ ਚਾਹੀਦੇ ਹਨ।",
    "ਵਰਤਮਾਨ ਵਿੱਚ ਕਣਕ ਦਾ ਭਾਅ ਮੁੱਖ ਮੰਡੀਆਂ ਵਿੱਚ ਲਗਭਗ ₹2,450 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ।",
    "ਭ੍ਰਿਸ਼ਟਾਚਾਰ ਦੀ ਰਿਪੋਰਟ ਕਰਨ ਲਈ ਸਾਡੀ ਗੁਮਨਾਮ ਰਿਪੋਰਟਿੰਗ ਪ੍ਰਣਾਲੀ ਦਾ ਵਰਤੋਂ ਕਰੋ।",
    "ਤੁਸੀਂ ਆਪਣੀ ਜ਼ਮੀਨ ਦੇ ਆਕਾਰ ਅਤੇ ਸਥਾਨ ਦੇ ਆਧਾਰ 'ਤੇ ਸਕੀਮ ਦੀ ਯੋਗਤਾ ਜਾਂਚ ਸਕਦੇ ਹੋ।",
  ]
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { i18n } = useTranslation();

  const getBotResponse = (userMessage: string): string => {
    const currentLang = i18n.language as keyof typeof predefinedResponses;
    const responses = predefinedResponses[currentLang] || predefinedResponses.en;
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('scheme') || lowerMessage.includes('योजना') || lowerMessage.includes('ਸਕੀਮ')) {
      return responses[2];
    } else if (lowerMessage.includes('price') || lowerMessage.includes('भाव') || lowerMessage.includes('ਭਾਅ')) {
      return responses[3];
    } else if (lowerMessage.includes('corruption') || lowerMessage.includes('भ्रष्टाचार') || lowerMessage.includes('ਭ੍ਰਿਸ਼ਟਾਚਾਰ')) {
      return responses[4];
    } else if (lowerMessage.includes('eligibility') || lowerMessage.includes('पात्रता') || lowerMessage.includes('ਯੋਗਤਾ')) {
      return responses[5];
    } else {
      return responses[1];
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue("");
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const currentLang = i18n.language as keyof typeof predefinedResponses;
      const responses = predefinedResponses[currentLang] || predefinedResponses.en;
      
      const welcomeMessage: Message = {
        id: 'welcome',
        text: responses[0],
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      initializeChat();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 h-96 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bot className="h-4 w-4 text-primary" />
              AgriBot - कृषि सहायक
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <Bot className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <User className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about schemes, prices..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
