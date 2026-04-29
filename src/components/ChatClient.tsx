"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { sendMessage, getMessages } from "@/lib/actions";

const ChatClient = ({ initialContacts, currentUserId }: { initialContacts: any[], currentUserId: string }) => {
  const [selectedChat, setSelectedChat] = useState<any>(initialContacts[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // FETCH MESSAGES
  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;
    const data = await getMessages(selectedChat.id);
    setMessages(data.map((m: any) => ({
      id: m.id,
      text: m.content,
      type: m.senderId === currentUserId ? "sent" : "received"
    })));
  }, [selectedChat, currentUserId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !selectedChat) return;
    
    // Optimistic UI
    const tempMsg = { id: Date.now().toString(), text: inputText, type: "sent" };
    setMessages([...messages, tempMsg]);
    setInputText("");

    const res = await sendMessage(selectedChat.id, inputText);
    if (!res.success) {
      // Handle error
    }
  };

  return (
    <>
      {/* CONTACTS LIST */}
      <div className="w-full md:w-80 bg-white rounded-2xl shadow-md flex flex-col border border-gray-100">
         <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-plSky">Messages</h1>
            <div className="mt-4 relative">
               <input type="text" placeholder="Search chats..." className="w-full p-2 pl-8 bg-gray-50 rounded-xl text-xs outline-none" />
               <Image src="/search.png" alt="search" width={14} height={14} className="absolute left-2 top-2.5 opacity-30" />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            {initialContacts.length > 0 ? (
              initialContacts.map((contact) => (
                <div 
                   key={contact.id}
                   onClick={() => setSelectedChat(contact)}
                   className={`p-4 flex gap-4 cursor-pointer transition border-l-4 ${
                      selectedChat?.id === contact.id ? "bg-plSkyLight border-plSky" : "hover:bg-gray-50 border-transparent"
                   }`}
                >
                   <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-plSky">
                         {contact.name[0]}
                      </div>
                      {/* Online indicator removed */}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                         <h3 className="text-sm font-bold truncate">{contact.name}</h3>
                         <span className="text-[10px] text-gray-400">Now</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{contact.role}</p>
                   </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400 italic text-sm">No contacts available</div>
            )}
         </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="hidden md:flex flex-1 bg-white rounded-2xl shadow-md flex-col border border-gray-100">
         {selectedChat ? (
            <>
               <div className="p-6 border-b flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                     <div className="w-10 h-10 bg-plSkyLight rounded-full flex items-center justify-center font-bold text-plSky text-sm">
                        {selectedChat.name[0]}
                     </div>
                     <div>
                        <h2 className="text-sm font-bold">{selectedChat.name}</h2>
                        {/* Online status removed */}
                     </div>
                  </div>
                  <div className="flex gap-4">
                     {/* Call buttons removed */}
                  </div>
               </div>
               
               <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#f8fafc]">
                  {messages.map(msg => (
                    <div key={msg.id} className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-sm ${
                      msg.type === 'sent' ? 'self-end bg-plSky text-black rounded-tr-none' : 'self-start bg-white text-gray-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
               </div>

               <div className="p-4 border-t flex gap-4 items-center">
                  <button className="p-2 bg-gray-50 rounded-full"><Image src="/create.png" alt="attach" width={16} height={16} className="opacity-40" /></button>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 p-3 bg-gray-50 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-plSky"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    className="bg-plSky p-3 rounded-2xl hover:bg-blue-900 transition shadow-lg"
                  >
                     <Image src="/message.png" alt="send" width={16} height={16} className="invert" />
                  </button>
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
               <Image src="/message.png" alt="chat" width={64} height={64} className="opacity-10" />
               <p>Select a contact to start messaging</p>
            </div>
         )}
      </div>
    </>
  );
};

export default ChatClient;
