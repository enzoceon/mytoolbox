import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  Calendar, 
  AlertCircle, 
  Play, 
  Pause, 
  RefreshCw,
  Bell
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const CountdownTimer = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startTimer = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      toast.error("Please set a time for the countdown");
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setRemainingTime(totalSeconds);
    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsRunning(false);
          playAlarm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setRemainingTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        toast.error("Could not play alarm sound");
      });
      toast.success("Time's up!", {
        duration: 5000,
      });
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Countdown Timer | MyToolbox</title>
        <meta name="description" content="Create countdown timers for events and deadlines. Free online countdown timer tool." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 container px-4 mx-auto py-12">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 glow-text">Countdown Timer</h1>
            <p className="text-muted-foreground">Create countdown timers for events and deadlines</p>
          </div>
          
          <Card className="mb-6 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Timer
              </CardTitle>
              <CardDescription>Set your countdown time</CardDescription>
            </CardHeader>
            <CardContent>
              {!isRunning ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hours">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="23"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minutes">Minutes</Label>
                    <Input
                      id="minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seconds">Seconds</Label>
                    <Input
                      id="seconds"
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => setSeconds(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <h3 className="text-5xl font-bold mb-4 text-center">
                    {formatTime(remainingTime)}
                  </h3>
                  <p className="text-muted-foreground">
                    {remainingTime > 0 ? "Countdown in progress..." : "Time's up!"}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              {!isRunning ? (
                <Button onClick={startTimer} className="bg-green-500 hover:bg-green-600">
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
              ) : (
                <Button onClick={pauseTimer} variant="outline">
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button onClick={resetTimer} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-medium">About the Countdown Timer</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Set hours, minutes, and seconds to create a countdown. When the timer reaches zero, an alarm will sound. 
                  You can pause or reset the timer at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CountdownTimer;
