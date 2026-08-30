import type {
  ActiveState,
  StateId,
} from "@/lib/types/states";

export type StateDefinition = {
  id: StateId;
  name: string;
};

export const states: StateDefinition[] = [
  {
    id: "surprised",
    name: "Surpris",
  },
  {
    id: "stunned",
    name: "Étourdi",
  },
  {
    id: "destabilized",
    name: "Déstabilisé",
  },
  {
    id: "slowed",
    name: "Ralentissement",
  },
  {
    id: "prone",
    name: "À terre",
  },
  {
    id: "weakened",
    name: "Affaibli",
  },
  {
    id: "fear",
    name: "Peur",
  },
  {
    id: "blinded",
    name: "Aveuglé",
  },
  {
    id: "deaf",
    name: "Sourd",
  },
  {
    id: "bleeding",
    name: "Saignement",
  },
  {
    id: "pain",
    name: "Douleur",
  },
  {
    id: "immobilized",
    name: "Immobilisé",
  },
  {
    id: "necrosis",
    name: "Nécrose",
  },
  {
    id: "burn",
    name: "Brûlure",
  },
  {
    id: "frozen",
    name: "Gelé",
  },
  {
    id: "shock",
    name: "Choc",
  },
  {
    id: "poisoned",
    name: "Empoisonné",
  },
  {
    id: "manaLeak",
    name: "Fuite de mana",
  },
  {
    id: "silenced",
    name: "Silencé",
  },
  {
    id: "madness",
    name: "Folie",
  },
  {
    id: "charmed",
    name: "Charmé",
  },
];

export function getAvailableStates(
  activeStates: ActiveState[]
): StateDefinition[] {
  const activeIds = new Set(
    activeStates.map((state) => state.id)
  );

  return states.filter(
    (state) => !activeIds.has(state.id)
  );
}