export type MagicType =
  | "canalisation"
  | "fascination"
  | "serment";

export type MagicResource = {
  type: MagicType;
  current: number;
  max: number | null;
};