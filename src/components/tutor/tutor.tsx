
"use client";

import { useActionState, useEffect, useRef } from 'react';
import { askTutor, TutorState, TutorMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader2, Send, CornerDownLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ChatMessage({ message }: { message: TutorMessage }) {
  const isModel = message.role === 'model';
  return (
    <div className={cn('flex items-start gap-4', isModel ? '' : 'justify-end')}>
      {isModel && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-md rounded-lg px-4 py-3 text-sm',
          isModel ? 'bg-muted' : 'bg-primary text-primary-foreground'
        )}
      >
        <div className="prose prose-sm prose-p:whitespace-pre-wrap max-w-none text-current prose-headings:text-current prose-strong:text-current prose-a:text-current hover:prose-a:text-current/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
       {!isModel && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function Tutor() {
  const initialState: TutorState = {
    messages: [{ role: 'model', text: "Hello! I'm Ed, your AI Tutor. Ask me anything about Web Development, UI/UX, Data Science, and more!" }],
  };
  const [state, dispatch, pending] = useActionState(askTutor, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    
    // Reset form after successful submission
    if (!pending && state.error === null) {
      formRef.current?.reset();
    }
    
    // Show toast on error
    if (state.error) {
       toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error,
      });
    }

  }, [state, pending, toast]);

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4 border-2 border-primary/20">
              <Bot className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Interactive AI Tutor
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Get instant answers to your questions. Our AI is here to help you understand complex topics, debug code, and more.
          </p>
        </div>

        <div className="flex h-[60vh] flex-col rounded-lg border bg-background shadow-lg">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {state.messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
              {pending && (
                <div className="flex items-start gap-4">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form ref={formRef} action={dispatch} className="flex items-center gap-2">
              <Input
                name="question"
                placeholder="e.g., 'Explain CSS Flexbox in a simple way...'"
                className="flex-1"
                disabled={pending}
                autoComplete="off"
              />
              <Button type="submit" disabled={pending} size="icon">
                {pending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </form>
             <p className="text-xs text-muted-foreground mt-2 text-center">
                Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <CornerDownLeft className="h-3 w-3" />
                </kbd> to send.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}
