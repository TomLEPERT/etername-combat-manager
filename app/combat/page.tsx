import type { Combat } from "@/lib/types/combat";
import CombatScreen from "@/components/combat/CombatScreen";

const combat: Combat = {
  id: "combat-1",

  name: "Test de combat",

  round: 1,

  activeCombatantId: "elwen",
  selectedCombatantId: "elwen",

  combatants: [
    {
      id: "elwen",
      name: "Elwen",
      side: "ally",
      initiative: 18,

      hp: {
        max: 7,
        boxes: [
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ],
        severeWounds: 0,
      },

      destiny: 3,
      overdose: 0,
      defense: 7,

      saves: [
        {
          id: "dodge",
          max: 7,
          boxes: Array(12).fill(false),
        },
        {
          id: "parry",
          max: 5,
          boxes: Array(12).fill(false),
        },
        {
          id: "pain",
          max: 7,
          boxes: Array(12).fill(false),
        },
      ],

      magic: [
        {
          type: "canalisation",
          current: 6,
          max: 10,
        },
        {
          type: "fascination",
          current: 4,
          max: null,
        },
        {
          type: "serment",
          current: 18,
          max: 35,
        },
      ],

      states: [],
    },

    {
      id: "goblin-1",
      name: "Gobelin",
      side: "enemy",
      initiative: 12,

      hp: {
        max: 5,
        boxes: [
          false,
          false,
          true,
          false,
          false,
        ],
        severeWounds: 0,
      },

      destiny: 0,
      overdose: 0,
      defense: 5,

      saves: [
        {
          id: "dodge",
          max: 5,
          boxes: Array(12).fill(false),
        },
      ],

      magic: [],

      states: [
        {
          id: "bleeding",
          value: 2,
        },
      ],
    },

    {
      id: "ogre-1",
      name: "Ogre",
      side: "enemy",
      initiative: 8,

      hp: {
        max: 12,
        boxes: Array(12).fill(false),
        severeWounds: 0,
      },

      destiny: 0,
      overdose: 0,
      defense: 8,

      saves: [
        {
          id: "pain",
          max: 8,
          boxes: Array(12).fill(false),
        },
        {
          id: "armor",
          max: 8,
          boxes: Array(12).fill(false),
        },
      ],

      magic: [],

      states: [],
    },
  ],
};

export default function Home() {
  return <CombatScreen combat={combat} />;
}