import type { CombatantTemplate } from "@/lib/types/combatant";

export const astrid: CombatantTemplate = {
  id: "astrid",
  name: "Astrid",

  side: "ally",
  initiative: 9,

  hp: {
    max: 3,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 1,
  overdose: 0,
  defense: 16,

  saves: [
    {
      id: "armor",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 1,
      boxes: Array(12).fill(false),
    },
    {
      id: "pain",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 6,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "ice",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const eros: CombatantTemplate = {
  id: "eros",
  name: "Eros",

  side: "ally",
  initiative: 10,

  hp: {
    max: 4,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 2,
  overdose: 0,
  defense: 4,

  saves: [
    {
      id: "dodge",
      max: 6,
      boxes: Array(12).fill(false),
    },
    {
      id: "pain",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const lev: CombatantTemplate = {
  id: "lev",
  name: "Lev",

  side: "ally",
  initiative: 8,

  hp: {
    max: 3,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 1,
  overdose: 0,
  defense: 6,

  saves: [
    {
      id: "dodge",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "pain",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 1,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 1,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 1,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const valkri: CombatantTemplate = {
  id: "valkri",
  name: "Valkri",

  side: "ally",
  initiative: 12,

  hp: {
    max: 4,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 2,
  overdose: 0,
  defense: 6,

  saves: [
    {
      id: "armor",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "pain",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 4,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const ragnar: CombatantTemplate = {
  id: "ragnar",
  name: "Ragnar",

  side: "ally",
  initiative: 10,

  hp: {
    max: 5,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 1,
  overdose: 0,
  defense: 3,

  saves: [
    {
      id: "dodge",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "pain",
      max: 4,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const seraphine: CombatantTemplate = {
  id: "seraphine",
  name: "Seraphine",

  side: "ally",
  initiative: 5,

  hp: {
    max: 3,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 1,
  overdose: 0,
  defense: 2,

  saves: [
    {
      id: "armor",
      max: 1,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "pain",
      max: 1,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 1,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [
    {
      type: "canalisation",
      current: 0,
      max: 12,
    },
  ],

  states: [],

  progress: [],
};

export const ameMeurtrie: CombatantTemplate = {
  id: "amemeurtrie",
  name: "Âme meurtrie",

  side: "enemy",
  initiative: 7,

  hp: {
    max: 5,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 0,
  overdose: 0,
  defense: 5,

  saves: [
    {
      id: "pain",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 5,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 5,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const tori: CombatantTemplate = {
  id: "tori",
  name: "Tori",

  side: "neutral",
  initiative: 10,

  hp: {
    max: 4,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 0,
  overdose: 0,
  defense: 6,

  saves: [
    {
      id: "pain",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const niall: CombatantTemplate = {
  id: "niall",
  name: "Niall",

  side: "neutral",
  initiative: 7,

  hp: {
    max: 5,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 0,
  overdose: 0,
  defense: 2,

  saves: [
    {
      id: "pain",
      max: 3,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 4,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [],

  states: [],

  progress: [],
};

export const jemin: CombatantTemplate = {
  id: "jemin",
  name: "Jemin",

  side: "neutral",
  initiative: 9,

  hp: {
    max: 6,
    boxes: Array(12).fill(false),
    severeWounds: 0,
  },

  destiny: 0,
  overdose: 0,
  defense: 6,

  saves: [
    {
      id: "pain",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "parry",
      max: 4,
      boxes: Array(12).fill(false),
    },
    {
      id: "dodge",
      max: 7,
      boxes: Array(12).fill(false),
    },
    {
      id: "cover",
      max: 2,
      boxes: Array(12).fill(false),
    },
    {
      id: "mental",
      max: 2,
      boxes: Array(12).fill(false),
    },
  ],

  magic: [
    {
      type: "canalisation",
      current: 0,
      max: 8,
    },
  ],

  states: [],

  progress: [],
};

export const defaultCombatants: CombatantTemplate[] = [
  astrid,
  eros,
  lev,
  valkri,
  ragnar,
  seraphine,
  ameMeurtrie,
  tori,
  niall,
  jemin
];