export type StateId =
  | "surprised"
  | "stunned"
  | "destabilized"
  | "slowed"
  | "prone"
  | "weakened"
  | "fear"
  | "blinded"
  | "deaf"
  | "bleeding"
  | "pain"
  | "immobilized"
  | "necrosis"
  | "burn"
  | "frozen"
  | "shock"
  | "poisoned"
  | "manaLeak"
  | "silenced"
  | "madness"
  | "charmed";

export type ActiveState = {
  id: StateId;
  value: number;
};