import { create } from 'zustand';

type ShellState = {
  drawerOpen: boolean;
  setDrawer: (open: boolean) => void;
};

export const useShell = create<ShellState>((set, get) => ({
  drawerOpen: false,
  setDrawer: (open: boolean) => set({ drawerOpen: open }),
}
)
)