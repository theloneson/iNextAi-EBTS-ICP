import React, { Suspense } from 'react';
import { Rnd } from 'react-rnd';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { WindowShell } from './WindowShell';
import { widgetMap } from '@/utils/widgetMap';
import { Skeleton } from '@/components/ui/skeleton';

export function WindowLayer() {
  const { windows, focusedId, minimize, maximize, close, bringToFront, update, setFocused } = useWindowStore();
  
  // Filter out minimized windows
  const visibleWindows = windows.filter(window => !window.minimized);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {visibleWindows.map((window) => {
          const config = widgetMap[window.type];
          const Component = config.component;
          const isFocused = focusedId === window.id;

          return (
            <React.Fragment key={window.id}>
              {/* Mobile: Full-screen sheets */}
              <div className="lg:hidden">
                <div
                  className="fixed inset-4 pointer-events-auto"
                  style={{ zIndex: window.zIndex }}
                  onMouseDown={() => {
                    bringToFront(window.id);
                    setFocused(window.id);
                  }}
                >
                  <WindowShell
                    window={window}
                    isFocused={isFocused}
                    onMinimize={() => minimize(window.id)}
                    onMaximize={() => maximize(window.id)}
                    onClose={() => close(window.id)}
                    onFocus={() => {
                      bringToFront(window.id);
                      setFocused(window.id);
                    }}
                  >
                    <Suspense fallback={<WindowSkeleton />}>
                      <Component />
                    </Suspense>
                  </WindowShell>
                </div>
              </div>

              {/* Desktop: Draggable/resizable windows */}
              <div className="hidden lg:block">
                <Rnd
                  size={{ width: window.width, height: window.height }}
                  position={{ x: window.x, y: window.y }}
                  dragHandleClassName="drag-handle"
                  bounds="window"
                  enableResizing={!window.maximized}
                  disableDragging={window.maximized}
                  className="pointer-events-auto"
                  style={{ zIndex: window.zIndex }}
                  onDragStop={(e, data) => {
                    update(window.id, { x: data.x, y: data.y });
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    update(window.id, {
                      x: position.x,
                      y: position.y,
                      width: parseInt(ref.style.width),
                      height: parseInt(ref.style.height),
                    });
                  }}
                  onMouseDown={() => {
                    bringToFront(window.id);
                    setFocused(window.id);
                  }}
                  minWidth={200}
                  minHeight={150}
                >
                  <WindowShell
                    window={window}
                    isFocused={isFocused}
                    onMinimize={() => minimize(window.id)}
                    onMaximize={() => maximize(window.id)}
                    onClose={() => close(window.id)}
                    onFocus={() => {
                      bringToFront(window.id);
                      setFocused(window.id);
                    }}
                  >
                    <Suspense fallback={<WindowSkeleton />}>
                      <Component />
                    </Suspense>
                  </WindowShell>
                </Rnd>
              </div>
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function WindowSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-32 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  );
}