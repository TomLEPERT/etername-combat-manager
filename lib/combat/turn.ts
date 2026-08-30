import type { Combat } from "@/lib/types/combat";

export function nextTurn(combat: Combat): Combat {
  if (combat.combatants.length === 0) {
    return combat;
  }

  const currentIndex =
    combat.combatants.findIndex(
      (combatant) =>
        combatant.id === combat.activeCombatantId
    );

  // Aucun combattant actif
  if (currentIndex === -1) {
    return {
      ...combat,
      activeCombatantId:
        combat.combatants[0].id,
    };
  }

  const isLast =
    currentIndex === combat.combatants.length - 1;

  const nextIndex = isLast
    ? 0
    : currentIndex + 1;

  return {
    ...combat,

    round: isLast
      ? combat.round + 1
      : combat.round,

    activeCombatantId:
      combat.combatants[nextIndex].id,
  };
}