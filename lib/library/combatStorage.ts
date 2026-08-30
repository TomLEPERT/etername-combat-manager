import type { Combat } from "@/lib/types/combat";

const STORAGE_KEY = "etername-combats";

function readCombats(): Combat[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Combat[];
  } catch {
    return [];
  }
}

function writeCombats(combats: Combat[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(combats)
  );
}

export function getCombats(): Combat[] {
  return readCombats();
}

export function getCombat(
  id: string
): Combat | null {
  const combats = readCombats();

  return (
    combats.find(
      (combat) => combat.id === id
    ) ?? null
  );
}

export function addCombat(
  combat: Combat
): void {
  const combats = readCombats();

  combats.push(combat);

  writeCombats(combats);
}

export function updateCombat(
  combat: Combat
): void {
  const combats = readCombats();

  const updated = combats.map(
    (currentCombat) =>
      currentCombat.id === combat.id
        ? combat
        : currentCombat
  );

  writeCombats(updated);
}

export function removeCombat(
  id: string
): void {
  const combats = readCombats();

  writeCombats(
    combats.filter(
      (combat) => combat.id !== id
    )
  );
}