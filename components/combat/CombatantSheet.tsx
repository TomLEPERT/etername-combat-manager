"use client";

import { useState } from "react";

import type { Combatant } from "@/lib/types/combatant";
import type { StateId } from "@/lib/types/states";
import type { ProgressTrack } from "@/lib/types/progress";

import {
  addState,
  changeDestiny,
  changeMagic,
  changeOverdose,
  changeSevereWounds,
  changeStateValue,
  removeState,
  toggleHealthBox,
  toggleSaveBox,
  addProgressTrack,
  removeProgressTrack,
  toggleProgressBox,
} from "@/lib/combat/combatants";

import {
  getAvailableStates,
  states,
} from "@/lib/data/states";

import { magicTypes } from "@/lib/data/magic";

type CombatantSheetProps = {
  combatant: Combatant;

  onUpdate: (
    update: (
      combatant: Combatant
    ) => Combatant
  ) => void;
};

export default function CombatantSheet({
  combatant,
  onUpdate,
}: CombatantSheetProps) {
  const availableStates =
    getAvailableStates(combatant.states);

  const [newStateId, setNewStateId] =
    useState<StateId | "">("");

  /*
   * ==================================================
   * PISTES DE PROGRESSION
   * ==================================================
   */

  const [showAddProgress, setShowAddProgress] =
    useState(false);

  const [progressName, setProgressName] =
    useState("");

  const [progressObjectives, setProgressObjectives] =
    useState("6");

  function handleAddProgress() {
    const name = progressName.trim();

    if (!name) {
      return;
    }

    /*
     * On accepte :
     *
     * 4
     * 2, 4, 6
     * 2 4 6
     * 2;4;6
     *
     * On transforme tout en tableau de nombres.
     */

    const objectives = progressObjectives
      .split(/[,;\s]+/)
      .map((value) => Number(value))
      .filter(
        (value) =>
          Number.isInteger(value) &&
          value >= 1 &&
          value <= 12
      );

    /*
     * Si aucun objectif valide n'est renseigné,
     * on ne crée pas la piste.
     */

    if (objectives.length === 0) {
      return;
    }

    onUpdate((currentCombatant) =>
      addProgressTrack(
        currentCombatant,
        name,
        objectives
      )
    );

    setProgressName("");
    setProgressObjectives("6");
    setShowAddProgress(false);
  }

  function handleRemoveProgress(
    trackId: string
  ) {
    onUpdate((currentCombatant) =>
      removeProgressTrack(
        currentCombatant,
        trackId
      )
    );
  }

  function handleToggleProgress(
    trackId: string,
    index: number
  ) {
    onUpdate((currentCombatant) =>
      toggleProgressBox(
        currentCombatant,
        trackId,
        index
      )
    );
  }

  return (
    <section className="p-6 sm:p-8">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <header className="border-b border-border/20 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {combatant.side === "ally"
            ? "Allié"
            : combatant.side === "enemy"
              ? "Ennemi"
              : "Neutre"}
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {combatant.name}
            </h2>

            <p className="mt-1 text-sm text-muted">
              Initiative {combatant.initiative}
            </p>
          </div>

          <p className="text-sm text-muted">
            Défense{" "}
            <span className="ml-1 text-lg font-medium text-foreground">
              {combatant.defense}
            </span>
          </p>
        </div>
      </header>

      {/* ================================================== */}
      {/* PV */}
      {/* ================================================== */}

      <section className="border-b border-border/20 py-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
          Points de vie
        </p>

        <div className="flex flex-wrap gap-1.5">
          {combatant.hp.boxes.map(
            (checked, index) => {

              /*
               * hp.max limite le nombre naturel
               * de PV utilisables.
               */

              const isAboveMax =
                index >= combatant.hp.max;

              /*
               * Les blessures graves désactivent
               * toujours les cases en partant de la fin.
               *
               * 1 blessure grave :
               * 12 11 10 désactivées
               *
               * 2 blessures graves :
               * 12 11 10 9 8 7 désactivées
               */

              const severeWoundsDisabled =
                combatant.hp.severeWounds * 3;

              const isDisabledBySevereWounds =
                index >=
                combatant.hp.boxes.length -
                  severeWoundsDisabled;

              const isDisabled =
                isAboveMax ||
                isDisabledBySevereWounds;

              return (
                <button
                  key={index}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onUpdate(
                      (currentCombatant) =>
                        toggleHealthBox(
                          currentCombatant,
                          index
                        )
                    );
                  }}
                  className={[
                    "h-8 w-8 border text-sm transition",

                    isDisabled
                      ? "cursor-not-allowed border-border/5 bg-surface/30 opacity-25"
                      : checked
                        ? "border-primary bg-primary"
                        : "border-border/60 bg-surface hover:border-primary hover:bg-surface-light",
                  ].join(" ")}
                  aria-label={
                    isDisabled
                      ? `PV ${index + 1} désactivé`
                      : `PV ${index + 1}`
                  }
                />
              );
            }
          )}
        </div>

        {/* Blessures graves */}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Blessures graves
          </p>

          <div className="flex items-center gap-3">

            {/* − */}

            <button
              type="button"
              onClick={() =>
                onUpdate((currentCombatant) =>
                  changeSevereWounds(
                    currentCombatant,
                    -1
                  )
                )
              }
              disabled={
                combatant.hp.severeWounds <= 0
              }
              className="h-7 w-7 border border-border/30 text-muted transition hover:border-border hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20"
            >
              −
            </button>

            <span className="min-w-6 text-center text-sm font-medium tabular-nums">
              {combatant.hp.severeWounds}
            </span>

            {/* + */}

            <button
              type="button"
              onClick={() =>
                onUpdate((currentCombatant) =>
                  changeSevereWounds(
                    currentCombatant,
                    1
                  )
                )
              }
              disabled={
                combatant.hp.severeWounds >=
                Math.floor(
                  combatant.hp.boxes.length / 3
                )
              }
              className="h-7 w-7 border border-border/30 text-muted transition hover:border-border hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20"
            >
              +
            </button>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* RESSOURCES */}
      {/* ================================================== */}

      <section className="grid gap-px border-b border-border/20 bg-border/10 sm:grid-cols-3">

        {/* Destin */}

        <div className="bg-background px-4 py-5">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Destin
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onUpdate((currentCombatant) =>
                  changeDestiny(
                    currentCombatant,
                    -1
                  )
                )
              }
              className="h-8 w-8 border border-border/30 text-muted transition hover:border-border hover:text-foreground"
            >
              −
            </button>

            <span className="min-w-6 text-center text-xl font-medium tabular-nums">
              {combatant.destiny}
            </span>

            <button
              type="button"
              onClick={() =>
                onUpdate((currentCombatant) =>
                  changeDestiny(
                    currentCombatant,
                    1
                  )
                )
              }
              className="h-8 w-8 border border-border/30 text-muted transition hover:border-border hover:text-foreground"
            >
              +
            </button>
          </div>
        </div>

        {/* Overdose */}

        <div className="bg-background px-4 py-5">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Overdose
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onUpdate((currentCombatant) =>
                  changeOverdose(
                    currentCombatant,
                    -1
                  )
                )
              }
              className="h-8 w-8 border border-border/30 text-muted transition hover:border-border hover:text-foreground"
            >
              −
            </button>

            <span className="min-w-6 text-center text-xl font-medium tabular-nums">
              {combatant.overdose}
            </span>

            <button
              type="button"
              onClick={() =>
                onUpdate((currentCombatant) =>
                  changeOverdose(
                    currentCombatant,
                    1
                  )
                )
              }
              className="h-8 w-8 border border-border/30 text-muted transition hover:border-border hover:text-foreground"
            >
              +
            </button>
          </div>
        </div>

        {/* Défense */}

        <div className="bg-background px-4 py-5">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Défense
          </p>

          <p className="mt-3 text-xl font-medium">
            {combatant.defense}
          </p>
        </div>

      </section>

      {/* ================================================== */}
      {/* SAUVEGARDES */}
      {/* ================================================== */}

      <section className="border-b border-border/20 py-6">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
          Sauvegardes
        </p>

        <div className="space-y-4">
          {combatant.saves.map((save) => (
            <div key={save.id}>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">
                  {save.id}
                </span>

                <span className="text-xs text-muted">
                  max. {save.max}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {save.boxes.map(
                  (checked, index) => {

                    const isDisabled =
                      index >= save.max;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={isDisabled}
                        onClick={() =>
                          onUpdate(
                            (currentCombatant) =>
                              toggleSaveBox(
                                currentCombatant,
                                save.id,
                                index
                              )
                          )
                        }
                        aria-label={
                          isDisabled
                            ? `${save.id} ${index + 1} désactivé`
                            : `${save.id} ${index + 1}`
                        }
                        className={[
                          "h-7 w-7 border text-xs transition",

                          isDisabled
                            ? "cursor-not-allowed border-border/5 bg-surface/30 opacity-20"
                            : checked
                              ? "border-primary bg-primary"
                              : "border-border/50 bg-background hover:border-primary hover:bg-surface",
                        ].join(" ")}
                      />
                    );
                  }
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* MAGIE */}
      {/* ================================================== */}

      <section className="border-b border-border/20 py-6">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
          Magie
        </p>

        <div className="space-y-3">
          {combatant.magic.map((resource) => (
            <div
              key={resource.type}
              className="flex items-center justify-between"
            >
              <span className="text-sm">
                {magicTypes.find(
                  (magic) =>
                    magic.id === resource.type
                )?.name ?? resource.type}
              </span>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={() =>
                    onUpdate((currentCombatant) =>
                      changeMagic(
                        currentCombatant,
                        resource.type,
                        -1
                      )
                    )
                  }
                  className="h-7 w-7 border border-border/30 text-muted hover:border-border hover:text-foreground"
                >
                  −
                </button>

                <span className="min-w-16 text-center text-sm tabular-nums">
                  {resource.current}
                  {resource.max !== null &&
                    ` / ${resource.max}`}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    onUpdate((currentCombatant) =>
                      changeMagic(
                        currentCombatant,
                        resource.type,
                        1
                      )
                    )
                  }
                  className="h-7 w-7 border border-border/30 text-muted hover:border-border hover:text-foreground"
                >
                  +
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* PROGRESSION */}
      {/* ================================================== */}

      <section className="border-b border-border/20 py-6">

        <div className="mb-4 flex items-center justify-between gap-4">

          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Progression
          </p>

          <button
            type="button"
            onClick={() =>
              setShowAddProgress(
                (current) => !current
              )
            }
            className="text-xs text-muted transition hover:text-foreground"
          >
            {showAddProgress
              ? "Annuler"
              : "+ Ajouter une piste"}
          </button>

        </div>

        {/* ================================================== */}
        {/* FORMULAIRE */}
        {/* ================================================== */}

        {showAddProgress && (
          <div className="mb-6 border border-border/20 bg-surface p-4">

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">

              {/* Nom */}

              <div>
                <label
                  htmlFor="progress-name"
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted"
                >
                  Nom
                </label>

                <input
                  id="progress-name"
                  type="text"
                  value={progressName}
                  onChange={(event) =>
                    setProgressName(
                      event.target.value
                    )
                  }
                  placeholder="Rage, Crochetage..."
                  className="h-10 w-full border border-border/30 bg-background px-3 text-sm outline-none transition focus:border-primary"
                />
              </div>

              {/* Objectifs */}

              <div>
                <label
                  htmlFor="progress-objectives"
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted"
                >
                  Objectifs
                </label>

                <input
                  id="progress-objectives"
                  type="text"
                  value={progressObjectives}
                  onChange={(event) =>
                    setProgressObjectives(
                      event.target.value
                    )
                  }
                  placeholder="2, 4, 6, 8"
                  className="h-10 w-full border border-border/30 bg-background px-3 text-sm outline-none transition focus:border-primary"
                />

                <p className="mt-1 text-[11px] text-muted/70">
                  Exemple : 2, 4, 6, 8
                </p>
              </div>

              {/* Ajouter */}

              <button
                type="button"
                onClick={handleAddProgress}
                disabled={
                  !progressName.trim() ||
                  !progressObjectives.trim()
                }
                className="h-10 border border-primary px-4 text-sm font-medium transition hover:bg-primary hover:text-background disabled:cursor-not-allowed disabled:opacity-30"
              >
                Ajouter
              </button>

            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* PISTES */}
        {/* ================================================== */}

        {combatant.progress.length === 0 ? (

          <p className="text-sm text-muted">
            Aucune piste de progression.
          </p>

        ) : (

          <div className="space-y-6">

            {combatant.progress.map(
              (track: ProgressTrack) => (

                <div key={track.id}>

                  <div className="mb-3 flex items-center justify-between gap-4">

                    <div>
                      <p className="text-sm font-medium">
                        {track.name}
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        Objectifs :{" "}
                        {track.objectives.join(" · ")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveProgress(
                          track.id
                        )
                      }
                      className="text-xs text-muted transition hover:text-foreground"
                    >
                      Supprimer
                    </button>

                  </div>

                  {/* Cases */}

                  <div className="flex flex-wrap gap-1.5">

                    {track.boxes.map(
                      (checked, index) => {

                        const boxNumber =
                          index + 1;

                        const isObjective =
                          track.objectives.includes(
                            boxNumber
                          );

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              handleToggleProgress(
                                track.id,
                                index
                              )
                            }
                            aria-label={`${track.name} ${boxNumber}`}
                            className={[
                              "relative h-8 w-8 border text-sm transition",

                              checked
                                ? "border-primary bg-primary"
                                : isObjective
                                  ? "border-primary/70 bg-primary/10 hover:bg-primary/20"
                                  : "border-border/50 bg-background hover:border-primary hover:bg-surface",
                            ].join(" ")}
                          >

                            {isObjective &&
                              !checked && (
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 flex items-center justify-center text-xs text-primary"
                                >
                                  ◆
                                </span>
                              )}

                          </button>
                        );
                      }
                    )}

                  </div>
                </div>
              )
            )}

          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* ÉTATS */}
      {/* ================================================== */}

      <section className="py-6">

        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
          États
        </p>

        {combatant.states.length === 0 ? (

          <p className="text-sm text-muted">
            Aucun état.
          </p>

        ) : (

          <div className="space-y-3">

            {combatant.states.map((state) => (

              <div
                key={state.id}
                className="flex items-center justify-between gap-4"
              >

                {/* Nom */}

                <span className="text-sm">
                  {states.find(
                    (definition) =>
                      definition.id === state.id
                  )?.name ?? state.id}
                </span>

                {/* Valeur */}

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      onUpdate((currentCombatant) =>
                        changeStateValue(
                          currentCombatant,
                          state.id,
                          -1
                        )
                      )
                    }
                    className="h-7 w-7 border border-border/30 text-muted transition hover:border-border hover:text-foreground"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center text-sm tabular-nums">
                    {state.value}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onUpdate((currentCombatant) =>
                        changeStateValue(
                          currentCombatant,
                          state.id,
                          1
                        )
                      )
                    }
                    className="h-7 w-7 border border-border/30 text-muted transition hover:border-border hover:text-foreground"
                  >
                    +
                  </button>

                  {/* Supprimer */}

                  <button
                    type="button"
                    onClick={() =>
                      onUpdate((currentCombatant) =>
                        removeState(
                          currentCombatant,
                          state.id
                        )
                      )
                    }
                    className="ml-2 text-xs text-muted transition hover:text-foreground"
                  >
                    Supprimer
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ajouter un état */}

        {availableStates.length > 0 && (
          <div className="mt-5">

            <select
              value={newStateId}
              onChange={(event) => {

                const stateId =
                  event.target.value as StateId;

                if (!stateId) {
                  return;
                }

                onUpdate((currentCombatant) =>
                  addState(
                    currentCombatant,
                    stateId
                  )
                );

                setNewStateId("");
              }}
              className="w-full rounded-md border border-border/30 bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-border/60"
            >

              <option value="">
                Ajouter un état...
              </option>

              {availableStates.map((state) => (

                <option
                  key={state.id}
                  value={state.id}
                >
                  {state.name}
                </option>

              ))}

            </select>

          </div>
        )}

      </section>

    </section>
  );
}
