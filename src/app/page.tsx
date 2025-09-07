"use client";

import { useState } from 'react';
import { MessageSquare, Phone, Users, UserPlus, Menu, Bell, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const chats = [
  { id: '1', name: 'Alice', message: 'Hey, how are you?', time: '10:45 AM', unread: 2, avatar: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'Bob', message: 'See you tomorrow!', time: 'Yesterday', unread: 0, avatar: 'https://picsum.photos/100/100?random=2' },
  { id: '3', name: 'Project Team', message: 'Charlie: Project update is ready.', time: 'Friday', unread: 5, avatar: 'https://picsum.photos/100/100?random=3', isGroup: true },
];

const calls = [
    { id: '1', name: 'Alice', time: 'Today, 2:30 PM', type: 'outgoing', status: 'missed', avatar: 'https://picsum.photos/100/100?random=1' },
    { id: '2', name: 'David', time: 'Yesterday, 8:00 PM', type: 'incoming', status: 'answered', avatar: 'https://picsum.photos/100/100?random=4' },
];

// Components for each panel
const ChatsPanel = () => (
  <div className="p-2">
    {chats.map(chat => (
      <Link href={`/chat/${chat.id}`} key={chat.id} passHref>
        <div className="flex items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint="person portrait" />
            <AvatarFallback>{chat.isGroup ? <Users2 /> : chat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <h3 className="font-semibold text-card-foreground truncate">{chat.name}</h3>
              <p className="text-xs text-muted-foreground flex-shrink-0">{chat.time}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
              {chat.unread > 0 && <Badge className="bg-accent text-accent-foreground h-6 w-6 flex items-center justify-center p-0 ml-2">{chat.unread}</Badge>}
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

const UpdatesPanel = () => (
  <div className="p-4 space-y-4">
     <h2 className="text-lg font-semibold text-primary">Friend Requests</h2>
     <Card>
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="https://picsum.photos/100/100?random=4" alt="David" data-ai-hint="person face" />
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">David</p>
                    <p className="text-sm text-muted-foreground">Wants to be your friend</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button size="sm">Accept</Button>
                <Button size="sm" variant="outline">Decline</Button>
            </div>
        </CardContent>
     </Card>
     <h2 className="text-lg font-semibold text-primary mt-6">Status Updates</h2>
     <p className="text-muted-foreground text-center py-8">No status updates yet.</p>
  </div>
);

const CallsPanel = () => (
    <div className="p-2 space-y-2">
    {calls.map(call => (
        <div key={call.id} className="flex items-center p-3 hover:bg-muted/50 rounded-lg">
             <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={call.avatar} alt={call.name} data-ai-hint="person photo" />
                <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className={`font-semibold ${call.status === 'missed' ? 'text-destructive' : 'text-card-foreground'}`}>{call.name}</p>
                <p className="text-sm text-muted-foreground">{call.time}</p>
            </div>
            <Button variant="ghost" size="icon">
                {call.type === 'outgoing' ? <Phone className="text-green-500" /> : <Phone className="text-blue-500"/>}
            </Button>
        </div>
    ))}
  </div>
);

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('chats');

  const renderContent = () => {
    switch (activeTab) {
      case 'updates':
        return <UpdatesPanel />;
      case 'calls':
        return <CallsPanel />;
      case 'chats':
      default:
        return <ChatsPanel />;
    }
  };

  const NavButton = ({ tabName, icon: Icon, label, badgeCount }: { tabName: string, icon: React.ElementType, label: string, badgeCount?: number }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 flex flex-col items-center justify-center p-2 text-sm transition-colors relative h-16 ${activeTab === tabName ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
    >
      <Icon className="h-6 w-6 mb-1" />
      <span>{label}</span>
      {badgeCount && badgeCount > 0 && <Badge className="absolute top-2 right-[25%] bg-accent text-accent-foreground h-5 w-5 flex items-center justify-center p-0 text-xs">{badgeCount}</Badge>}
      {activeTab === tabName && <div className="absolute bottom-0 h-1 w-full bg-primary rounded-t-full"></div>}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 shadow-md z-10 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">ConnectNow</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <UserPlus className="h-6 w-6" />
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild><Link href="/new-group">New Group</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/settings/ringtones">Ringtone AI</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/login">Logout</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <nav className="border-t bg-background/95 backdrop-blur-sm flex-shrink-0">
        <div className="flex justify-around items-center">
            <NavButton tabName="chats" icon={MessageSquare} label="Chats" badgeCount={7} />
            <NavButton tabName="updates" icon={Bell} label="Updates" badgeCount={1} />
            <NavButton tabName="calls" icon={Phone} label="Calls" />
        </div>
      </nav>
    </div>
  );
}
