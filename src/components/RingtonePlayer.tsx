"use client";

import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download } from 'lucide-react';

type RingtonePlayerProps = {
  title: string;
  audioSrc: string;
};

export function RingtonePlayer({ title, audioSrc }: RingtonePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      const setAudioTime = () => setCurrentTime(audio.currentTime);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', handleEnded);

      // Reset state when audioSrc changes
      setIsPlaying(false);
      setDuration(0);
      setCurrentTime(0);

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioSrc]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="shadow-lg border-none animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <audio ref={audioRef} src={audioSrc} preload="auto" />
        <div className="flex items-center gap-4">
          <Button onClick={togglePlayPause} size="icon" variant="outline" className="rounded-full flex-shrink-0">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
          <div className="flex-grow flex items-center gap-2">
            <span className="text-sm text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-10">{formatTime(duration)}</span>
          </div>
          <Button asChild variant="ghost" size="icon">
            <a href={audioSrc} download={`${title.replace(/\s+/g, '_')}.wav`}>
              <Download className="h-5 w-5" />
              <span className="sr-only">Download</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
