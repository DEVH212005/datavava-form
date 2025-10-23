// useShortcut.ts
import { useEffect, useRef } from "react";

export interface Shortcut {
  title: string;
  key: string[]; // ordered keys
  callback: () => void;
}

const listKeysValid = ["Control", "Shift", "Alt", "Meta"];
const regex = /^[A-Za-z0-9]+$/;

export function useShortcut(shortcuts: Shortcut[]) {
  const treeRef = useRef(new ShortcutTree());
  const pressedKeys = useRef<string[]>([]);
  const pressing = useRef<boolean>(false);

  // Build tree once
  useEffect(() => {
    const tree = treeRef.current;
    shortcuts.forEach((s) => tree.addShortcut(s.key, s.callback));
  }, [shortcuts]);

  const cleans = (totalKeys: string[]) => {
    if (totalKeys.length) {
      pressedKeys.current = totalKeys;
    } else {
      pressing.current = false;
      pressedKeys.current = [];
    }
  };

  const deleteKeys = (keys: string[], key: string): string[] => {
    if (keys.length === 0) return [];

    const copy = [...keys];
    const latestKey = copy.pop();

    if (!latestKey) return [];

    if (latestKey !== key) {
      return deleteKeys(copy, key);
    }

    return copy;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        pressedKeys.current.length === 0 &&
        !listKeysValid.includes(e.key) &&
        regex.test(e.key)
      ) {
        return;
      }

      const lastKey = pressedKeys.current[pressedKeys.current.length - 1];
      if (lastKey !== e.key) pressedKeys.current.push(e.key);
      pressing.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const tree = treeRef.current;
      const node = tree.getNode(pressedKeys.current);
      const remainKeys = deleteKeys(pressedKeys.current, e.key);

      if (node?.callback) {
        e.preventDefault();
        node.callback();
      }

      cleans(remainKeys);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
}

export interface ShortcutNode {
  key: string;
  children: Map<string, ShortcutNode>;
  callback?: () => void;
}

export class ShortcutTree {
  root: ShortcutNode;

  constructor() {
    this.root = { key: "root", children: new Map() };
  }

  // Add a shortcut sequence
  addShortcut(keys: string[], callback: () => void) {
    let node = this.root;
    for (const key of keys) {
      if (!node.children.has(key)) {
        node.children.set(key, { key, children: new Map() });
      }
      node = node.children.get(key)!;
    }
    node.callback = callback; // assign callback at leaf
  }

  // Get node according to a sequence
  getNode(keys: string[]): ShortcutNode | null {
    let node: ShortcutNode | undefined = { ...this.root };
    for (const key of keys) {
      node = node.children.get(key);
      if (!node) return null;
    }
    return node || null;
  }

  // Check if a sequence is a prefix of any shortcut
  hasPrefix(keys: string[]): boolean {
    let node: ShortcutNode | undefined = this.root;
    for (const key of keys) {
      node = node.children.get(key);
      if (!node) return false;
    }
    return true;
  }
}
