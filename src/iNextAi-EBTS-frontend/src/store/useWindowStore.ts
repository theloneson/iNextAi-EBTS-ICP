import { create } from 'zustand';
import { nanoid } from 'nanoid';

export type WidgetType =
  | 'performance'    // PerformanceMetrics
  | 'mood'           // MoodTracker
  | 'emotional'      // EmotionalTriggers
  | 'ai'             // AIInsightCards
  | 'feed'           // RealTimeTradeFeed
  | 'activities';    // RecentActivities

export interface WindowInstance {
  id: string;
  type: WidgetType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  previousRect?: { x: number; y: number; width: number; height: number };
}

interface WindowStore {
  windows: WindowInstance[];
  focusedId: string | null;
  nextZ: number;
  open: (type: WidgetType, opts?: Partial<Pick<WindowInstance, 'x' | 'y' | 'width' | 'height' | 'title'>>) => string;
  close: (id: string) => void;
  minimize: (id: string, value?: boolean) => void;
  maximize: (id: string, value?: boolean) => void;
  bringToFront: (id: string) => void;
  update: (id: string, patch: Partial<WindowInstance>) => void;
  setFocused: (id: string | null) => void;
  resetLayout: () => void;
  save: () => void;
  load: () => void;
}

const GRID = 16;
const DEFAULT_WIDTH = 520;
const DEFAULT_HEIGHT = 360;
const STORAGE_KEY = 'dashboard-window-layout-v1';

// Debounce function
let saveTimeout: NodeJS.Timeout;
const debouncedSave = (fn: () => void) => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(fn, 300);
};

// Snap to grid
const snapToGrid = (value: number): number => Math.round(value / GRID) * GRID;

// Get window count for staggered positioning
let windowCount = 0;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  focusedId: null,
  nextZ: 100,

  open: (type, opts = {}) => {
    const id = nanoid();
    const count = windowCount++;
    
    const defaultWindow: WindowInstance = {
      id,
      type,
      title: opts.title || getDefaultTitle(type),
      x: snapToGrid(100 + (count * 24)),
      y: snapToGrid(100 + (count * 24)),
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      minimized: false,
      maximized: false,
      zIndex: get().nextZ + 1,
      ...opts,
    };

    set((state) => ({
      windows: [...state.windows, defaultWindow],
      focusedId: id,
      nextZ: state.nextZ + 1,
    }));

    debouncedSave(() => get().save());
    return id;
  },

  close: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      focusedId: state.focusedId === id ? null : state.focusedId,
    }));
    debouncedSave(() => get().save());
  },

  minimize: (id, value) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: value ?? !w.minimized } : w
      ),
    }));
    debouncedSave(() => get().save());
  },

  maximize: (id, value) => {
    set((state) => {
      const window = state.windows.find((w) => w.id === id);
      if (!window) return state;

      const shouldMaximize = value ?? !window.maximized;
      const viewportWidth = globalThis.innerWidth || 1024;
      const viewportHeight = globalThis.innerHeight || 768;

      let updatedWindow: WindowInstance;

      if (shouldMaximize) {
        // Store current rect and maximize
        updatedWindow = {
          ...window,
          previousRect: { x: window.x, y: window.y, width: window.width, height: window.height },
          x: 16,
          y: 16,
          width: viewportWidth - 32,
          height: viewportHeight - 32,
          maximized: true,
        };
      } else {
        // Restore from previous rect
        const rect = window.previousRect || { x: 100, y: 100, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
        updatedWindow = {
          ...window,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          maximized: false,
          previousRect: undefined,
        };
      }

      return {
        windows: state.windows.map((w) => (w.id === id ? updatedWindow : w)),
      };
    });
    debouncedSave(() => get().save());
  },

  bringToFront: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZ + 1 } : w
      ),
      focusedId: id,
      nextZ: state.nextZ + 1,
    }));
  },

  update: (id, patch) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              ...patch,
              // Snap position and size to grid
              x: patch.x !== undefined ? snapToGrid(patch.x) : w.x,
              y: patch.y !== undefined ? snapToGrid(Math.max(48, patch.y)) : w.y,
              width: patch.width !== undefined ? snapToGrid(Math.max(200, patch.width)) : w.width,
              height: patch.height !== undefined ? snapToGrid(Math.max(150, patch.height)) : w.height,
            }
          : w
      ),
    }));
    debouncedSave(() => get().save());
  },

  setFocused: (id) => {
    set({ focusedId: id });
  },

  resetLayout: () => {
    set({ windows: [], focusedId: null, nextZ: 100 });
    localStorage.removeItem(STORAGE_KEY);
  },

  save: () => {
    const { windows, nextZ } = get();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ windows, nextZ }));
    } catch (error) {
      console.warn('Failed to save window layout:', error);
    }
  },

  load: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { windows, nextZ } = JSON.parse(saved);
        set({ windows: windows || [], nextZ: nextZ || 100 });
      }
    } catch (error) {
      console.warn('Failed to load window layout:', error);
    }
  },
}));

function getDefaultTitle(type: WidgetType): string {
  const titles: Record<WidgetType, string> = {
    performance: 'Performance Metrics',
    mood: 'Mood Tracker',
    emotional: 'Emotional Triggers',
    ai: 'AI Insights',
    feed: 'Real-Time Feed',
    activities: 'Recent Activities',
  };
  return titles[type];
}

// Load on initialization
useWindowStore.getState().load();