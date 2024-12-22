import { create } from "zustand";

const useMapControl = create((set) => ({
  cachedMap: null,
  previewMap: null,
  iconSize: 20,
  updatedIconSize: 20,
  brandColor: "red",
  trackColor: "blue",
  trackThickness: 2,
  updatedBrandColor: "red",
  updatedTrackColor: "blue",
  updatedTrackThickness: 2,
  startUpdating: false,
  needToUpdate: false,
  setMap: (map) => set((state) => ({ ...state, map: { current: map } })),
  setPreviewMap: (previewMap) =>
    set((state) => ({ ...state, previewMap: { current: previewMap } })),
  setIconSize: (size) => set((state) => ({ ...state, iconSize: size })),
  setBrandColor: (color) => set((state) => ({ ...state, brandColor: color })),
  setTrackColor: (color) => set((state) => ({ ...state, trackColor: color })),
  setTrackThickness: (thickness) =>
    set((state) => ({ ...state, trackThickness: thickness })),
  setUpdatedIconSize: (size) =>
    set((state) => ({ ...state, updatedIconSize: size })),
  setUpdatedBrandColor: (color) =>
    set((state) => ({ ...state, updatedBrandColor: color })),
  setUpdatedTrackColor: (color) =>
    set((state) => ({ ...state, updatedTrackColor: color })),
  setUpdatedTrackThickness: (thickness) =>
    set((state) => ({ ...state, updatedTrackThickness: thickness })),
  setStartUpdating: (update) =>
    set((state) => ({ ...state, startUpdating: update })),
  setNeedToUpdate: (update) =>
    set((state) => ({ ...state, needToUpdate: update })),
  setCachedMap: (map) => set((state) => ({ ...state, cachedMap: map })),
}));

export default useMapControl;
