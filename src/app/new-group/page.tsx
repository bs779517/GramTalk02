"use client";

import { useState } from 'react';
import { ArrowLeft, Camera, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const contacts = [
  { id: '1', name: 'Alice', avatar: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'Bob', avatar: 'https://picsum.photos/100/100?random=2' },
  { id: '4', name: 'David', avatar: 'https://picsum.photos/100/100?random=4' },
  { id: '5', name: 'Eve', avatar: 'https://picsum.photos/100/100?random=5' },
  { id: '6', name: 'Frank', avatar: 'https://picsum.photos/100/100?random=6' },
];

export default function NewGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };
  
  const createGroup = () => {
    console.log("Creating group:", { groupName, members: selectedContacts });
    // Navigate to the new group chat page (mock)
    router.push('/chat/new-group-id');
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="bg-primary text-primary-foreground p-3 flex items-center gap-3 shadow-md z-10 flex-shrink-0">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">New Group</h1>
          <p className="text-xs text-primary-foreground/80">{selectedContacts.length} of {contacts.length} selected</p>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto">
        <div className="p-4 flex items-center gap-4">
          <Button size="icon" variant="outline" className="h-16 w-16 rounded-full">
            <Camera className="h-8 w-8 text-muted-foreground" />
          </Button>
          <Input 
            placeholder="Group Name" 
            className="text-lg h-12"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        
        <div className="p-4">
          <Input 
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="px-2">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="flex items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer" onClick={() => handleToggleContact(contact.id)}>
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person portrait" />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-card-foreground">{contact.name}</p>
              </div>
              <Checkbox checked={selectedContacts.includes(contact.id)} />
            </div>
          ))}
        </div>
      </main>
      
      {selectedContacts.length > 0 && (
        <footer className="p-4 sticky bottom-0">
            <Button size="lg" className="w-full rounded-full" onClick={createGroup} disabled={!groupName}>
                <Check className="mr-2" /> Create Group
            </Button>
        </footer>
      )}
    </div>
  );
}
