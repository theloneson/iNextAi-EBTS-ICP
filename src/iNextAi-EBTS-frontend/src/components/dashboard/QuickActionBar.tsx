import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useWindowStore } from '@/store/useWindowStore';
import { widgetMap, widgetTypes } from '@/utils/widgetMap';
import { RotateCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function QuickActionBar() {
  const { open, resetLayout } = useWindowStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
      {/* Widget Buttons */}
      {widgetTypes.map((type) => {
        const config = widgetMap[type];
        const Icon = config.icon;
        
        return (
          <motion.div
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => open(type)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border-muted hover:bg-accent/50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="text-lg">{config.emoji}</span>
              <Icon className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">{config.title}</span>
              <span className="font-medium sm:hidden">{config.title.split(' ')[0]}</span>
            </Button>
          </motion.div>
        );
      })}

      {/* Reset Layout Button */}
      <div className="mx-2 h-6 w-px bg-border" />
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={resetLayout}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-card/50 backdrop-blur-sm border-muted hover:bg-accent/50 transition-all duration-200 shadow-sm hover:shadow-md text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="font-medium hidden sm:inline">Reset</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>Reset Layout</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}