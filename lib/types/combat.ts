import type { Combatant } from "./combatant";

export type Combat = {
  id: string;

  name: string;

  round: number;

  activeCombatantId: string | null;
  selectedCombatantId: string | null;

  combatants: Combatant[];
};