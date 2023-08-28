'use client';

import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Copy, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  const [copying, setCopying] = useState(false);

  const onCopy = (description: string) => {
    setCopying(true);
    navigator.clipboard.writeText(description);
    setTimeout(() => {
      setCopying(false);
    }, 3000);
  };

  return (
    <Alert>
      <Server className={'h-4 w-4'} />
      <AlertTitle className={'flex items-center gap-x-2'}>
        {title}
        <Badge>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
      </AlertTitle>
      <AlertDescription className={'mt-4 flex items-center justify-between'}>
        <code className={'p-1 relative rounded bg-muted px-[0.3rem]'}>
          {description}
        </code>
        <Button
          disabled={copying}
          onClick={onCopy.bind(this, description)}
          variant={'outline'}
          size={'icon'}
          className={cn(
            copying && 'text-green-500 hover:text-green-500 border-green-500',
            'relative disabled:opacity-100',
          )}
        >
          {copying && (
            <div
              className={
                'text-[11px] text-white bg-zinc-600 rounded-md absolute right-11 pointer-events-none py-[2px] px-1.5'
              }
            >
              <div className='h-0 w-0 border-l-[4px] border-r-[4px] border-b-[8px] border-zinc-600 absolute -right-[6px] top-1/2 -translate-y-[4px] border-r-transparent border-l-transparent rotate-90'></div>
              Copied
            </div>
          )}
          {copying && <Check className={'h-4 w-4'} />}
          {!copying && <Copy className={'h-4 w-4'} />}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
