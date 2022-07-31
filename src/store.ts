import { writable } from "svelte/store";

export interface Interactable {
  emoji: string;
  eventID: string;
  interacts: string;
}

export interface SequenceItem {
  type: string;
  background?: string;
  index?: number;
  duration?: number;
  emoji?: string;
}

export interface Loop {
  start: number;
  end: number;
  iterationNumber: number;
  iterationType: "increment" | "decrement";
  timeGap: number;
  reverse: boolean;
}

export interface Event {
  name: string;
  sequence: Array<SequenceItem>;
  loop?: Loop;
}

export interface Condition {
  a: string;
  b: string;
  _b: string | "any";
  eventID: string;
}

export interface Emoji {
  index: number;
  emoji: string;
  inventory?: Array<any>;
}

interface EditableMap {
  items: Map<number, Emoji>;
  backgrounds: Map<number, string>;
  objective: string;
}

function createMapStore<T>(_state: Map<string, T>) {
  const { subscribe, update } = writable(_state);

  return {
    subscribe,
    add: (value: T) =>
      update((state) => {
        let id = Date.now().toString().slice(7);
        console.log(id);
        state.set(id, value);
        return state;
      }),
    update: (id: string, value: T) =>
      update((state) => {
        state.set(id, value);
        return state;
      }),
    remove: (id: string) =>
      update((state) => {
        state.delete(id);
        return state;
      }),
  };
}

function createEditableMap() {
  const map: EditableMap = {
    items: new Map(),
    backgrounds: new Map(),
    objective: "",
  };
  const { subscribe, update } = writable(map);

  return {
    subscribe,
    updateBackground: (index: number, color: string) =>
      update((state) => {
        state.backgrounds.set(index, color);
        return state;
      }),
    deleteBackground: (index: number) =>
      update((state) => {
        state.backgrounds.delete(index);
        return state;
      }),
    addEmoji: (obj: Emoji) =>
      update((state: EditableMap) => {
        state.items.set(obj.index, obj);
        return state;
      }),
    removeEmoji: (index: number) =>
      update((state: EditableMap) => {
        state.items.delete(index);
        return state;
      }),
  };
}

function createStatics() {
  const { subscribe, update } = writable(new Set<string>());

  return {
    subscribe,
    toggleEmoji: (emoji: string, operation?: string) =>
      emoji != "" &&
      update((state) => {
        if (operation == "add") {
          state.add(emoji);
        } else {
          state.delete(emoji);
        }
        return state;
      }),
  };
}

function createColorPalette() {
  const { subscribe, update } = writable(new Set<string>());

  return {
    subscribe,
    addColor: (color: string) =>
      color != "" &&
      update((state) => {
        state.add(color);
        return state;
      }),
    removeColor: (color: string) =>
      update((state) => {
        state.delete(color);
        return state;
      }),
  };
}

function createInventory() {
  const { subscribe, update } = writable(["🎮", "", "🎮", ""]);

  return {
    subscribe,
    addItem: (item: string) =>
      update((state) => {
        if (!state.includes("")) {
          console.log(state.indexOf(""));
          state[state.indexOf("")] = item;
        }
        return state;
      }),
    removeItemAt: (index: number) =>
      update((state) => {
        state[index] = "";
        return state;
      }),
  };
}

export const currentItem = writable("");
export const currentColor = writable("");
export const currentEmoji = writable("");
// TODO: Make sure interactables are trackable
export const interactables = writable(new Set<string>());

export const inventory = createInventory();
export const colorPalette = createColorPalette();
export const editableMap = createEditableMap();
export const statics = createStatics();
export const collisions = createMapStore<string>(new Map<string, string>());
export const events = createMapStore<Event>(new Map<string, Event>());
export const conditions = createMapStore<Condition>(
  new Map<string, Condition>()
);
