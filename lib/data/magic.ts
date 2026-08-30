import type { MagicType } from "@/lib/types/resources";

export type MagicDefinition = {
  id: MagicType;
  name: string;
};

export const magicTypes: MagicDefinition[] = [
  {
    id: "canalisation",
    name: "Canalisation",
  },
  {
    id: "fascination",
    name: "Fascination",
  },
  {
    id: "serment",
    name: "Serment",
  },
];