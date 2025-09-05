import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useWindowStore } from '@/store/useWindowStore';
import { widgetMap } from '@/utils/widgetMap';
import { cn } from '@/lib/utils';

export function DockTray() {
  const { windows, minimize, bringToFront } = useWindowStore();
  
  const minimizedWindows = windows.filter(window => window.minimized);

  if (minimizedWindows.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-full shadow-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {minimizedWindows.map((window) => {
              const config = widgetMap[window.type];
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={window.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-10 px-3 rounded-full",
                      "hover:bg-accent/50 transition-all duration-200",
                      "flex items-center gap-2"
                    )}
                    onClick={() => {
                      minimize(window.id, false);
                      bringToFront(window.id);
                    }}
                    title={`Restore ${window.title}`}
                  >
                    <span className="text-sm">{config.emoji}</span>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium max-w-[100px] truncate">
                      {window.title}
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}