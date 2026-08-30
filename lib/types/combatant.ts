import type {
  MagicResource,
} from "./resources";

import type {
  ActiveState,
  StateId,
} from "./states";

import type { ProgressTrack } from "./progress";

export type CombatantSide =
  | "ally"
  | "enemy"
  | "neutral";

export type HealthTrack = {
  boxes: boolean[];
  max: number;
  severeWounds: number;
};

export type SaveId =
  | "dodge"
  | "parry"
  | "pain"
  | "cover"
  | "armor"
  | "fire"
  | "ice"
  | "lightning"
  | "earth"
  | "wind"
  | "mental"
  | "acid"
  | "magic";

export type SaveTrack = {
  id: SaveId;
  max: number;
  boxes: boolean[];
};

export type CombatantData = {
  name: string;
  image?: string;

  side: CombatantSide;

  initiative: number;

  hp: HealthTrack;

  destiny: number;
  overdose: number;

  defense: number;

  saves: SaveTrack[];

  magic: MagicResource[];

  states: ActiveState[];

  progress: ProgressTrack[];
};

export type CombatantTemplate = CombatantData & {
  id: string;
};

export type Combatant = CombatantData & {
  id: string;
};

