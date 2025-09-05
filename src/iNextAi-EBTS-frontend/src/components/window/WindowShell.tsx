import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { WindowInstance } from '@/store/useWindowStore';
import { widgetMap } from '@/utils/widgetMap';
import { cn } from '@/lib/utils';

interface WindowShellProps {
  window: WindowInstance;
  isFocused: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export function WindowShell({
  window,
  isFocused,
  onMinimize,
  onMaximize,
  onClose,
  onFocus,
  children,
}: WindowShellProps) {
  const config = widgetMap[window.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg overflow-hidden',
        'flex flex-col',
        isFocused ? 'ring-2 ring-primary/20 border-primary/30' : 'border-border'
      )}
      onMouseDown={onFocus}
      style={{ height: '100%' }}
    >
      {/* Title Bar */}
      <div
        className="drag-handle flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border cursor-move select-none"
        onMouseDown={onFocus}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Icon className="w-4 h-4 text-foreground flex-shrink-0" />
          <span className="text-sm font-medium text-foreground truncate">
            {window.title}
          </span>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize();
                  }}
                  aria-label="Minimize window"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Minimize</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMaximize();
                  }}
                  aria-label={window.maximized ? "Restore window" : "Maximize window"}
                >
                  {window.maximized ? (
                    <Copy className="h-3 w-3" />
                  ) : (
                    <Square className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{window.maximized ? 'Restore' : 'Maximize'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  aria-label="Close window"
                >
                  <X className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </motion.div>
  );
}