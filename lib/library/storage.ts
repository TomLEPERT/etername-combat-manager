import type { Combat } from "@/lib/types/combat";
import type { CombatantTemplate } from "@/lib/types/combatant";

const LIBRARY_KEY = "etername-combat-library";
const COMBATS_KEY = "etername-combats";

type LibraryStorage = {
  combatantTemplates: CombatantTemplate[];
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCombatantTemplates(): CombatantTemplate[] {
  if (!isBrowser()) {
    return [];
  }

  const data = localStorage.getItem(LIBRARY_KEY);

  if (!data) {
    return [];
  }

  try {
    const parsed = JSON.parse(data) as LibraryStorage;

    return parsed.combatantTemplates ?? [];
  } catch {
    return [];
  }
}

export function saveCombatantTemplates(
  combatantTemplates: CombatantTemplate[]
): void {
  if (!isBrowser()) {
    return;
  }

  const data: LibraryStorage = {
    combatantTemplates,
  };

  localStorage.setItem(
    LIBRARY_KEY,
    JSON.stringify(data)
  );
}

export function getCombats(): Combat[] {
  if (!isBrowser()) {
    return [];
  }

  const data = localStorage.getItem(COMBATS_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as Combat[];
  } catch {
    return [];
  }
}

export function saveCombats(
  combats: Combat[]
): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(
    COMBATS_KEY,
    JSON.stringify(combats)
  );
}

export function addCombatantTemplate(
  template: CombatantTemplate
): void {
  const templates =
    getCombatantTemplates();

  saveCombatantTemplates([
    ...templates,
    template,
  ]);
}

export function removeCombatantTemplate(
  templateId: string
): void {
  const templates =
    getCombatantTemplates();

  saveCombatantTemplates(
    templates.filter(
      (template) =>
        template.id !== templateId
    )
  );
}

export function updateCombatantTemplate(
  updatedTemplate: CombatantTemplate
): void {
  const templates =
    getCombatantTemplates();

  saveCombatantTemplates(
    templates.map((template) =>
      template.id === updatedTemplate.id
        ? updatedTemplate
        : template
    )
  );
}