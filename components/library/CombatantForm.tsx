"use client";

import { useState } from "react";

import type {
  CombatantTemplate,
  SaveId,
  SaveTrack,
} from "@/lib/types/combatant";

import type {
  MagicType,
  MagicResource,
} from "@/lib/types/resources";

import {
  magicTypes,
} from "@/lib/data/magic";

import {
  states,
} from "@/lib/data/states";

import type {
  ActiveState,
  StateId,
} from "@/lib/types/states";

type CombatantFormProps = {
  initialValue?: CombatantTemplate;
  onSave: (template: CombatantTemplate) => void;
  onCancel: () => void;
};

const saveLabels: Record<SaveId, string> = {
  dodge: "Esquive",
  parry: "Parade",
  pain: "Douleur",
  cover: "Couverture",
  armor: "Armure",
  fire: "Feu",
  ice: "Glace",
  lightning: "Foudre",
  earth: "Terre",
  wind: "Vent",
  mental: "Mental",
  acid: "Acide",
  magic: "Magie",
};

export default function CombatantForm({
  initialValue,
  onSave,
  onCancel,
}: CombatantFormProps) {
  const [name, setName] = useState(
    initialValue?.name ?? ""
  );

  const [side, setSide] = useState<
    CombatantTemplate["side"]
  >(
    initialValue?.side ?? "enemy"
  );

  const [initiative, setInitiative] =
    useState(
      initialValue?.initiative ?? 0
    );

  const [hpMax, setHpMax] =
    useState(
      initialValue?.hp.max ?? 1
    );

  const [destiny, setDestiny] =
    useState(
      initialValue?.destiny ?? 0
    );

  const [overdose, setOverdose] =
    useState(
      initialValue?.overdose ?? 0
    );

  const [defense, setDefense] =
    useState(
      initialValue?.defense ?? 0
    );

  const [saves, setSaves] =
    useState<SaveTrack[]>(
      initialValue?.saves ?? []
    );

  const [magic, setMagic] =
    useState<MagicResource[]>(
      initialValue?.magic ?? []
    );

    const [activeStates, setActiveStates] =
    useState<ActiveState[]>(
        initialValue?.states ?? []
    );

  function addSave(id: SaveId) {
    setSaves((current) => [
      ...current,
      {
        id,
        max: 1,
        boxes: Array(12).fill(false),
      },
    ]);
  }

  function removeSave(id: SaveId) {
    setSaves((current) =>
      current.filter(
        (save) => save.id !== id
      )
    );
  }

  function updateSaveMax(
    id: SaveId,
    max: number
  ) {
    setSaves((current) =>
      current.map((save) => {
        if (save.id !== id) {
          return save;
        }

        return {
          ...save,
          max: Math.min(
            12,
            Math.max(1, max)
          ),
        };
      })
    );
  }

  function toggleSaveBox(
    id: SaveId,
    index: number
  ) {
    setSaves((current) =>
      current.map((save) => {
        if (save.id !== id) {
          return save;
        }

        if (index >= save.max) {
          return save;
        }

        const boxes = [
          ...save.boxes,
        ];

        boxes[index] =
          !boxes[index];

        return {
          ...save,
          boxes,
        };
      })
    );
  }

  function addMagic(type: MagicType) {
    setMagic((current) => [
      ...current,
      {
        type,
        current: 0,
        max:
          type === "fascination"
            ? null
            : 1,
      },
    ]);
  }

  function removeMagic(
    type: MagicType
  ) {
    setMagic((current) =>
      current.filter(
        (resource) =>
          resource.type !== type
      )
    );
  }

  function updateMagicCurrent(
    type: MagicType,
    current: number
  ) {
    setMagic((resources) =>
      resources.map((resource) =>
        resource.type === type
          ? {
              ...resource,
              current: Math.max(
                0,
                current
              ),
            }
          : resource
      )
    );
  }

  function updateMagicMax(
    type: MagicType,
    max: number
  ) {
    setMagic((resources) =>
      resources.map((resource) =>
        resource.type === type
          ? {
              ...resource,
              max: Math.max(
                1,
                max
              ),
            }
          : resource
      )
    );
  }

  function getMagicName(
    type: MagicType
  ) {
    return (
      magicTypes.find(
        (definition) =>
          definition.id === type
      )?.name ?? type
    );
  }

    function addState(id: StateId) {
  setActiveStates((current) => [
    ...current,
    {
      id,
      value: 0,
    },
  ]);
}

function removeState(id: StateId) {
  setActiveStates((current) =>
    current.filter(
      (state) => state.id !== id
    )
  );
}

function updateStateValue(
  id: StateId,
  value: number
) {
  setActiveStates((current) =>
    current.map((state) =>
      state.id === id
        ? {
            ...state,
            value,
          }
        : state
    )
  );
}

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const template: CombatantTemplate = {
      id:
        initialValue?.id ??
        crypto.randomUUID(),

      name: name.trim(),

      side,

      initiative,

      hp: {
        boxes:
          initialValue?.hp.boxes ??
          Array(12).fill(false),

        max: hpMax,

        severeWounds:
          initialValue?.hp.severeWounds ??
          0,
      },

      destiny,

      overdose,

      defense,

      saves,

      magic,

      states: activeStates,

      progress:
        initialValue?.progress ??
        [],

    };

    onSave(template);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* ================================================= */}
      {/* IDENTITÉ */}
      {/* ================================================= */}

      <section>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Identité
          </p>

          <h2 className="mt-1 text-lg font-medium">
            Combattant
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Nom */}
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm">
              Nom
            </span>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="Gobelin"
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none transition focus:border-border/70"
            />
          </label>

          {/* Camp */}
          <label>
            <span className="mb-2 block text-sm">
              Camp
            </span>

            <select
              value={side}
              onChange={(event) =>
                setSide(
                  event.target.value as CombatantTemplate["side"]
                )
              }
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none transition focus:border-border/70"
            >
              <option value="ally">
                Allié
              </option>

              <option value="enemy">
                Ennemi
              </option>

              <option value="neutral">
                Neutre
              </option>
            </select>
          </label>

          {/* Initiative */}
          <label>
            <span className="mb-2 block text-sm">
              Initiative
            </span>

            <input
              type="number"
              value={initiative}
              onChange={(event) =>
                setInitiative(
                  Number(
                    event.target.value
                  )
                )
              }
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none transition focus:border-border/70"
            />
          </label>
        </div>
      </section>

      {/* ================================================= */}
      {/* RESSOURCES */}
      {/* ================================================= */}

      <section>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Ressources
          </p>

          <h2 className="mt-1 text-lg font-medium">
            Combat
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* PV */}
          <label>
            <span className="mb-2 block text-sm">
              PV maximum
            </span>

            <input
              type="number"
              min={0}
              value={hpMax}
              onChange={(event) =>
                setHpMax(
                  Math.max(
                    0,
                    Number(
                      event.target.value
                    )
                  )
                )
              }
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none transition focus:border-border/70"
            />
          </label>

          {/* Destin */}
          <label>
            <span className="mb-2 block text-sm">
              Destin
            </span>

            <input
              type="number"
              min={0}
              value={destiny}
              onChange={(event) =>
                setDestiny(
                  Math.max(
                    0,
                    Number(
                      event.target.value
                    )
                  )
                )
              }
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none transition focus:border-border/70"
            />
          </label>

          {/* Overdose */}
          <label>
            <span className="mb-2 block text-sm">
              Overdose
            </span>

            <input
              type="number"
              min={0}
              value={overdose}
              onChange={(event) =>
                setOverdose(
                  Math.max(
                    0,
                    Number(
                      event.target.value
                    )
                  )
                )
              }
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none focus:border-border/70"
            />
          </label>

          {/* Défense */}
          <label>
            <span className="mb-2 block text-sm">
              Défense
            </span>

            <input
              type="number"
              min={0}
              value={defense}
              onChange={(event) =>
                setDefense(
                  Math.max(
                    0,
                    Number(
                      event.target.value
                    )
                  )
                )
              }
              className="w-full border border-border/30 bg-surface px-3 py-3 text-sm outline-none focus:border-border/70"
            />
          </label>
        </div>
      </section>

      {/* ================================================= */}
      {/* SAUVEGARDES */}
      {/* ================================================= */}

      <section>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Défenses
          </p>

          <h2 className="mt-1 text-lg font-medium">
            Sauvegardes
          </h2>
        </div>

        <div className="space-y-3">
          {saves.map((save) => (
            <div
              key={save.id}
              className="border border-border/20 bg-surface p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {saveLabels[save.id]}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Maximum : {save.max}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeSave(
                      save.id
                    )
                  }
                  className="min-h-10 px-3 text-sm text-muted transition hover:text-foreground"
                >
                  Supprimer
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <label
                  htmlFor={`save-max-${save.id}`}
                  className="text-sm"
                >
                  Maximum
                </label>

                <input
                  id={`save-max-${save.id}`}
                  type="number"
                  min={1}
                  max={12}
                  value={save.max}
                  onChange={(event) =>
                    updateSaveMax(
                      save.id,
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="w-20 border border-border/30 bg-background px-3 py-3 text-center text-sm outline-none focus:border-border/70"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {Array.from(
                  { length: 12 },
                  (_, index) => {
                    const disabled =
                      index >=
                      save.max;

                    const checked =
                      save.boxes[
                        index
                      ] ?? false;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={
                          disabled
                        }
                        onClick={() =>
                          toggleSaveBox(
                            save.id,
                            index
                          )
                        }
                        aria-label={`${saveLabels[save.id]} ${index + 1}`}
                        className={`
                          flex h-11 w-11 items-center justify-center
                          border border-border/40 text-sm
                          transition
                          ${
                            disabled
                              ? "cursor-not-allowed opacity-20"
                              : "hover:bg-background"
                          }
                          ${
                            checked
                              ? "bg-primary text-background"
                              : "bg-background"
                          }
                        `}
                      >
                        {checked
                          ? "✓"
                          : ""}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ajouter une sauvegarde */}
        <div className="mt-5">
          <p className="mb-3 text-sm text-muted">
            Ajouter une sauvegarde
          </p>

          <div className="flex flex-wrap gap-2">
            {(
              Object.keys(
                saveLabels
              ) as SaveId[]
            )
              .filter(
                (id) =>
                  !saves.some(
                    (save) =>
                      save.id === id
                  )
              )
              .map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    addSave(id)
                  }
                  className="min-h-11 border border-border/30 px-4 py-2 text-sm transition hover:bg-surface"
                >
                  + {saveLabels[id]}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* MAGIE */}
      {/* ================================================= */}

      <section>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Pouvoirs
          </p>

          <h2 className="mt-1 text-lg font-medium">
            Magie
          </h2>
        </div>

        <div className="space-y-3">
          {magic.map((resource) => (
            <div
              key={resource.type}
              className="border border-border/20 bg-surface p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {getMagicName(
                      resource.type
                    )}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {resource.max ===
                    null
                      ? "Sans maximum"
                      : `Maximum : ${resource.max}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeMagic(
                      resource.type
                    )
                  }
                  className="min-h-10 px-3 text-sm text-muted transition hover:text-foreground"
                >
                  Supprimer
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Actuel */}
                <label>
                  <span className="mb-2 block text-sm">
                    Actuel
                  </span>

                  <input
                    type="number"
                    min={0}
                    value={
                      resource.current
                    }
                    onChange={(event) =>
                      updateMagicCurrent(
                        resource.type,
                        Number(
                          event.target
                            .value
                        )
                      )
                    }
                    className="w-full border border-border/30 bg-background px-3 py-3 text-sm outline-none focus:border-border/70"
                  />
                </label>

                {/* Maximum */}
                {resource.max !==
                  null && (
                  <label>
                    <span className="mb-2 block text-sm">
                      Maximum
                    </span>

                    <input
                      type="number"
                      min={1}
                      value={
                        resource.max
                      }
                      onChange={(
                        event
                      ) =>
                        updateMagicMax(
                          resource.type,
                          Number(
                            event.target
                              .value
                          )
                        )
                      }
                      className="w-full border border-border/30 bg-background px-3 py-3 text-sm outline-none focus:border-border/70"
                    />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ajouter une magie */}
        <div className="mt-5">
          <p className="mb-3 text-sm text-muted">
            Ajouter une magie
          </p>

          <div className="flex flex-wrap gap-2">
            {magicTypes
              .filter(
                (definition) =>
                  !magic.some(
                    (resource) =>
                      resource.type ===
                      definition.id
                  )
              )
              .map(
                (definition) => (
                  <button
                    key={
                      definition.id
                    }
                    type="button"
                    onClick={() =>
                      addMagic(
                        definition.id
                      )
                    }
                    className="min-h-11 border border-border/30 px-4 py-2 text-sm transition hover:bg-surface"
                  >
                    +{" "}
                    {
                      definition.name
                    }
                  </button>
                )
              )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
{/* ÉTATS */}
{/* ================================================= */}

<section>
  <div className="mb-5">
    <p className="text-xs uppercase tracking-[0.2em] text-muted">
      Conditions
    </p>

    <h2 className="mt-1 text-lg font-medium">
      États
    </h2>
  </div>

  <div className="space-y-3">
    {activeStates.map((state) => {
      const definition = states.find(
        (definition) =>
          definition.id === state.id
      );

      return (
        <div
          key={state.id}
          className="border border-border/20 bg-surface p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-medium">
              {definition?.name ?? state.id}
            </p>

            <button
              type="button"
              onClick={() =>
                removeState(state.id)
              }
              className="min-h-10 px-3 text-sm text-muted transition hover:text-foreground"
            >
              Supprimer
            </button>
          </div>

          <div className="mt-4">
            <label>
              <span className="mb-2 block text-sm">
                Valeur
              </span>

              <input
                type="number"
                value={state.value}
                onChange={(event) =>
                  updateStateValue(
                    state.id,
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-full border border-border/30 bg-background px-3 py-3 text-sm outline-none focus:border-border/70 sm:w-32"
              />
            </label>
          </div>
        </div>
      );
    })}
  </div>

  {/* Ajouter un état */}
  <div className="mt-5">
    <p className="mb-3 text-sm text-muted">
      Ajouter un état
    </p>

    <div className="flex flex-wrap gap-2">
      {states
        .filter(
          (definition) =>
            !activeStates.some(
              (state) =>
                state.id === definition.id
            )
        )
        .map((definition) => (
          <button
            key={definition.id}
            type="button"
            onClick={() =>
              addState(definition.id)
            }
            className="min-h-11 border border-border/30 px-4 py-2 text-sm transition hover:bg-surface"
          >
            + {definition.name}
          </button>
        ))}
    </div>
  </div>
</section>

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div className="border-t border-border/20 pt-6">
        <button
          type="submit"
          className="block min-h-14 w-full border-2 border-primary bg-primary px-6 py-4 text-base font-semibold text-background"
        >
          {initialValue
            ? "Enregistrer les modifications"
            : "Créer le combattant"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="mt-3 block min-h-14 w-full border border-border/40 bg-surface px-6 py-4 text-base text-foreground transition hover:bg-background"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}