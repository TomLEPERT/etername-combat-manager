import type {
    Combatant,
    CombatantTemplate,
    SaveId,
} from "@/lib/types/combatant";
import type { Combat } from "@/lib/types/combat";
import type { StateId } from "@/lib/types/states";
import type { MagicType } from "@/lib/types/resources";
import type { ProgressTrack } from "@/lib/types/progress";

export function toggleHealthBox(
  combatant: Combatant,
  index: number
): Combatant {
  if (index >= combatant.hp.max) {
    return combatant;
  }

  return {
    ...combatant,

    hp: {
      ...combatant.hp,

      boxes: combatant.hp.boxes.map(
        (box, boxIndex) =>
          boxIndex === index
            ? !box
            : box
      ),
    },
  };
}

export function changeDestiny(
  combatant: Combatant,
  amount: number
): Combatant {
  return {
    ...combatant,

    destiny: Math.max(
      0,
      combatant.destiny + amount
    ),
  };
}

export function changeOverdose(
  combatant: Combatant,
  amount: number
): Combatant {
  return {
    ...combatant,

    overdose: Math.max(
      0,
      combatant.overdose + amount
    ),
  };
}

export function toggleSaveBox(
  combatant: Combatant,
  saveId: SaveId,
  index: number
): Combatant {
  const save = combatant.saves.find(
    (save) => save.id === saveId
  );

  if (!save || index >= save.max) {
    return combatant;
  }

  return {
    ...combatant,

    saves: combatant.saves.map((currentSave) =>
      currentSave.id !== saveId
        ? currentSave
        : {
            ...currentSave,

            boxes: currentSave.boxes.map(
              (box, boxIndex) =>
                boxIndex === index
                  ? !box
                  : box
            ),
          }
    ),
  };
}

export function changeStateValue(
  combatant: Combatant,
  stateId: StateId,
  amount: number
): Combatant {
  return {
    ...combatant,

    states: combatant.states.map((state) =>
      state.id !== stateId
        ? state
        : {
            ...state,
            value: Math.max(
              0,
              state.value + amount
            ),
          }
    ),
  };
}

export function removeState(
  combatant: Combatant,
  stateId: StateId
): Combatant {
  return {
    ...combatant,

    states: combatant.states.filter(
      (state) => state.id !== stateId
    ),
  };
}

export function addState(
  combatant: Combatant,
  stateId: StateId,
  value = 0
): Combatant {
  const alreadyExists =
    combatant.states.some(
      (state) => state.id === stateId
    );

  if (alreadyExists) {
    return combatant;
  }

  return {
    ...combatant,

    states: [
      ...combatant.states,
      {
        id: stateId,
        value,
      },
    ],
  };
}

export function changeMagic(
  combatant: Combatant,
  magicType: MagicType,
  amount: number
): Combatant {
  return {
    ...combatant,

    magic: combatant.magic.map((resource) => {
      if (resource.type !== magicType) {
        return resource;
      }

      const nextValue =
        resource.current + amount;

      const max =
        resource.max === null
          ? nextValue
          : Math.min(nextValue, resource.max);

      return {
        ...resource,
        current: Math.max(0, max),
      };
    }),
  };
}

export function sortCombatantsByInitiative(
  combatants: Combatant[]
): Combatant[] {
  return [...combatants].sort(
    (a, b) => b.initiative - a.initiative
  );
}

export function addCombatant(
  combat: Combat,
  combatant: Combatant
): Combat {
  const combatants = sortCombatantsByInitiative([
    ...combat.combatants,
    combatant,
  ]);

  return {
    ...combat,
    combatants,
    activeCombatantId:
      combat.activeCombatantId ??
      combatant.id,
    selectedCombatantId:
      combat.selectedCombatantId ??
      combatant.id,
  };
}

export function removeCombatant(
  combat: Combat,
  combatantId: string
): Combat {
  const combatants =
    combat.combatants.filter(
      (combatant) =>
        combatant.id !== combatantId
    );

  const activeWasRemoved =
    combat.activeCombatantId === combatantId;

  const selectedWasRemoved =
    combat.selectedCombatantId === combatantId;

  return {
    ...combat,

    combatants,

    activeCombatantId:
      activeWasRemoved
        ? combatants[0]?.id ?? null
        : combat.activeCombatantId,

    selectedCombatantId:
      selectedWasRemoved
        ? combatants[0]?.id ?? null
        : combat.selectedCombatantId,
  };
}

export function createCombatantId(): string {
  return crypto.randomUUID();
}

export function createCombatantFromTemplate(
  template: CombatantTemplate
): Combatant {
  return {
    ...structuredClone(template),

    id: createCombatantId(),
  };
}

export function createCombatant(
  template: CombatantTemplate
): Combatant {
  return {
    ...template,

    id: crypto.randomUUID(),

    hp: {
      ...template.hp,
      boxes: Array(12).fill(false),
      severeWounds: 0,
    },

    destiny: template.destiny,

    overdose: 0,

    saves: template.saves.map((save) => ({
      ...save,
      boxes: Array(12).fill(false),
    })),

    magic: template.magic.map((resource) => ({
      ...resource,
      current: 0,
    })),

    states: template.states.map((state) => ({
      ...state,
    })),

    progress: [],
  };
}

export function changeSevereWounds(
  combatant: Combatant,
  amount: number
): Combatant {
  const severeWounds = Math.max(
    0,
    Math.min(
      4,
      combatant.hp.severeWounds + amount
    )
  );

  const disabledHp =
    severeWounds * 3;

  const boxes =
    combatant.hp.boxes.map(
      (checked, index) =>
        index < combatant.hp.max - disabledHp
          ? checked
          : false
    );

  return {
    ...combatant,

    hp: {
      ...combatant.hp,
      severeWounds,
      boxes,
    },
  };
}

export function addProgressTrack(
  combatant: Combatant,
  name: string,
  objectives: number[]
): Combatant {
  const track: ProgressTrack = {
    id: crypto.randomUUID(),
    name,
    objectives: objectives
      .map((objective) =>
        Math.max(1, Math.min(12, objective))
      )
      .filter(
        (objective, index, array) =>
          array.indexOf(objective) === index
      )
      .sort((a, b) => a - b),
    boxes: Array(12).fill(false),
  };

  return {
    ...combatant,
    progress: [
      ...combatant.progress,
      track,
    ],
  };
}

export function removeProgressTrack(
  combatant: Combatant,
  trackId: string
): Combatant {
  return {
    ...combatant,
    progress: combatant.progress.filter(
      (track) => track.id !== trackId
    ),
  };
}

export function toggleProgressBox(
  combatant: Combatant,
  trackId: string,
  index: number
): Combatant {
  if (index < 0 || index >= 12) {
    return combatant;
  }

  return {
    ...combatant,

    progress: combatant.progress.map(
      (track) =>
        track.id !== trackId
          ? track
          : {
              ...track,
              boxes: track.boxes.map(
                (box, boxIndex) =>
                  boxIndex === index
                    ? !box
                    : box
              ),
            }
    ),
  };
}