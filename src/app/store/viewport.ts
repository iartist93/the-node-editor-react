import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Color } from "three";

interface State {
  albedo: Color;
  roughness: number;
  metalness: number;
  opacity: number;
}

interface Actions {
  setAlbedo: (albedo: string) => void;
  setRoughness: (roughness: number) => void;
  setMetallic: (metallic: number) => void;
  setOpacity: (alpha: number) => void;
}

const store = (set, get) => ({
  albedo: new Color(0.3, 0, 0),
  roughness: 0.5,
  metalness: 0.5,
  opacity: 1.0,

  setAlbedo: (albedo: string) =>
    set((state) => {
      state.albedo = new Color(albedo);
    }),
  setRoughness: (roughness: number) => set({ roughness }),
  setMetallic: (metalness: number) => set({ metalness }),
  setOpacity: (opacity: number) => set({ opacity }),
});

export const useViewportStore = create<State & Actions>()(
  devtools(immer(store)),
);
