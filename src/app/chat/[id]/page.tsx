"use client";

import { useState } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Mock data for demonstration
const messages = [
  { id: '1', text: 'Hey, how are you?', sender: 'other', time: '10:45 AM' },
  { id: '2', text: 'I am good, thanks! How about you?', sender: 'me', time: '10:46 AM' },
  { id: '3', text: 'Doing great! Working on the new project.', sender: 'other', time: '10:47 AM' },
  { id: '4', text: 'Awesome! Let me know if you need any help.', sender: 'me', time: '10:48 AM' },
];

const contact = { id: '1', name: 'Alice', avatar: 'https://picsum.photos/100/100?random=1', online: true };

const MessageBubble = ({ message }: { message: typeof messages[0] }) => {
    const isMe = message.sender === 'me';
    return (
        <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${isMe ? 'bg-[#e1f6fb] rounded-br-none' : 'bg-white rounded-bl-none'}`}>
                <p className="text-card-foreground">{message.text}</p>
                <p className="text-xs text-muted-foreground text-right mt-1">{message.time}</p>
            </div>
        </div>
    )
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      // Mock sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#e5ddd5]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23bdbdbd\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }}>
      <header className="bg-primary text-primary-foreground p-3 flex items-center gap-3 shadow-md z-10 flex-shrink-0">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person face"/>
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-xs text-primary-foreground/80">{contact.online ? 'Online' : 'Offline'}</p>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
      </main>

      <footer className="p-2 bg-transparent flex-shrink-0">
        <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white rounded-full p-1 shadow-sm">
                <Button variant="ghost" size="icon" className="text-muted-foreground"><Smile className="h-6 w-6" /></Button>
                <Input
                    type="text"
                    placeholder="Message"
                    className="flex-1 bg-transparent border-none focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 h-10"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
            </div>
            <Button size="icon" className="rounded-full bg-accent hover:bg-accent/90 h-12 w-12" onClick={handleSend}>
                <Send className="h-6 w-6 text-white" />
            </Button>
        </div>
      </footer>
    </div>
  );
}
