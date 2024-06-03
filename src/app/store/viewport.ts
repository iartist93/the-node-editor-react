import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Color } from "three";

interface State {
  albedo: Color;
  roughness: number;
  metalness: number;
  opacity: number;
  emissive: Color;
  emissiveIntensity: number;
  flatShading: boolean;
  wireframe: boolean;
  wireframeLinewidth: number;
}

interface Actions {
  setAlbedo: (albedo: string) => void;
  setRoughness: (roughness: number) => void;
  setMetallic: (metallic: number) => void;
  setOpacity: (alpha: number) => void;
  setEmissive: (emissive: string) => void;
  setEmissiveIntensity: (emissiveIntensity: number) => void;
  setFlatShading: (flatShading: boolean) => void;
  setWireframe: (wireframe: boolean) => void;
  setWireframeLinewidth: (wireframeLinewidth: number) => void;
}

const store = (set, get) => ({
  albedo: new Color(0.3, 0, 0),
  roughness: 0.5,
  metalness: 0.5,
  opacity: 1.0,
  emissive: new Color(0, 0, 0),
  emissiveIntensity: 1.0,
  flatShading: false,
  wireframe: false,
  wireframeLinewidth: 1,

  setAlbedo: (albedo: string) =>
    set((state) => {
      state.albedo = new Color(albedo);
    }),
  setRoughness: (roughness: number) => set({ roughness }),
  setMetallic: (metalness: number) => set({ metalness }),
  setOpacity: (opacity: number) => set({ opacity }),
  setEmissive: (emissive: string) =>
    set((state) => {
      state.emissive = new Color(emissive);
    }),
  setEmissiveIntensity: (emissiveIntensity: number) =>
    set({ emissiveIntensity }),

  setFlatShading: (flatShading: boolean) => set({ flatShading }),
  setWireframe: (wireframe: boolean) => set({ wireframe }),
  setWireframeLinewidth: (wireframeLinewidth: number) =>
    set({ wireframeLinewidth }),
});

export const useViewportStore = create<State & Actions>()(
  devtools(immer(store)),
);
