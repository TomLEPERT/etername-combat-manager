"use client";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import type { Combat } from "@/lib/types/combat";
import type {
  Combatant,
  CombatantTemplate,
} from "@/lib/types/combatant";

import CombatantList from "./CombatantList";
import CombatantSheet from "./CombatantSheet";

import {
  createCombatant,
  addCombatant,
} from "@/lib/combat/combatants";

import { nextTurn } from "@/lib/combat/turn";

import {
  updateCombat as saveCombat,
} from "@/lib/library/combatStorage";

import {
  getCombatantTemplates,
} from "@/lib/library/storage";

import {
  defaultCombatants,
} from "@/lib/data/defaultCombatants";

type CombatScreenProps = {
  combat: Combat;
};

export default function CombatScreen({
  combat: initialCombat,
}: CombatScreenProps) {
  const [combat, setCombat] =
    useState<Combat>(initialCombat);

  const [selectedCombatantId, setSelectedCombatantId] =
    useState(
      initialCombat.selectedCombatantId ??
        initialCombat.combatants[0]?.id ??
        null
    );

  const [showAddCombatant, setShowAddCombatant] =
    useState(false);

  const [combatantTemplates, setCombatantTemplates] =
    useState<CombatantTemplate[]>([]);

  /*
   * ================================================
   * COMBATTANTS
   * ================================================
   */

  function updateCombatant(
    combatantId: string,
    update: (combatant: Combatant) => Combatant
  ) {
    setCombat((currentCombat) => {
      const updatedCombat: Combat = {
        ...currentCombat,
        combatants: currentCombat.combatants.map(
          (combatant) =>
            combatant.id === combatantId
              ? update(combatant)
              : combatant
        ),
      };

      return updatedCombat;
    });
  }

  function addCombatantFromTemplate(
    template: CombatantTemplate
  ) {
    const newCombatant =
      createCombatant(template);

    setCombat((currentCombat) => {
      const updatedCombat = addCombatant(
        currentCombat,
        newCombatant
      );

      return {
        ...updatedCombat,
        selectedCombatantId:
          newCombatant.id,
      };
    });

    setSelectedCombatantId(
      newCombatant.id
    );

    setShowAddCombatant(false);
  }

  function removeCombatant(
    combatantId: string
  ) {
    setCombat((currentCombat) => {
      const remainingCombatants =
        currentCombat.combatants.filter(
          (combatant) =>
            combatant.id !== combatantId
        );

      const newSelectedId =
        selectedCombatantId === combatantId
          ? remainingCombatants[0]?.id ?? null
          : selectedCombatantId;

      const newActiveId =
        currentCombat.activeCombatantId ===
        combatantId
          ? remainingCombatants[0]?.id ?? null
          : currentCombat.activeCombatantId;

      const updatedCombat: Combat = {
        ...currentCombat,
        combatants: remainingCombatants,
        selectedCombatantId: newSelectedId,
        activeCombatantId: newActiveId,
      };

      saveCombat(updatedCombat);

      return updatedCombat;
    });

    if (selectedCombatantId === combatantId) {
      const remaining =
        combat.combatants.filter(
          (combatant) =>
            combatant.id !== combatantId
        );

      setSelectedCombatantId(
        remaining[0]?.id ?? null
      );
    }
  }

  /*
   * ================================================
   * INITIALISATION
   * ================================================
   */

  useEffect(() => {
    const personalCombatants =
      getCombatantTemplates();

    setCombatantTemplates([
      ...defaultCombatants,
      ...personalCombatants,
    ]);
  }, []);

  useEffect(() => {
    saveCombat(combat);
  }, [combat]);

  /*
   * ================================================
   * COMBATTANT SÉLECTIONNÉ
   * ================================================
   */

  const selectedCombatant =
    combat.combatants.find(
      (combatant) =>
        combatant.id === selectedCombatantId
    ) ?? null;

  /*
   * ================================================
   * RENDER
   * ================================================
   */

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}

      <header className="border-b border-border/20 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Retour
      </Link>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Combat
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              {combat.name}
            </h1>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Round
            </p>

            <p className="text-2xl font-semibold">
              {String(combat.round).padStart(2, "0")}
            </p>
          </div>

        </div>
      </header>

      {/* ============================================ */}
      {/* COMBAT */}
      {/* ============================================ */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* ========================================== */}
        {/* COLONNE GAUCHE */}
        {/* ========================================== */}

        <aside className="border-r border-border/20">

          {/* Initiative */}

          <CombatantList
            combatants={combat.combatants}
            activeCombatantId={
              combat.activeCombatantId
            }
            selectedCombatantId={
              selectedCombatantId
            }
            onSelect={
              setSelectedCombatantId
            }
            onRemove={removeCombatant}
          />

          {/* Ajouter un combattant */}

          <div className="border-t border-border/20 p-5">

            <button
              type="button"
              onClick={() =>
                setShowAddCombatant(
                  (current) => !current
                )
              }
              className="min-h-12 w-full border border-primary px-4 py-3 text-sm font-medium transition hover:bg-surface"
            >
              {showAddCombatant
                ? "Fermer"
                : "+ Ajouter un combattant"}
            </button>

            {showAddCombatant && (
              <div className="mt-4 space-y-2">

                {combatantTemplates.length === 0 ? (
                  <p className="text-sm leading-relaxed text-muted">
                    Aucun combattant dans la
                    bibliothèque.
                  </p>
                ) : (
                  combatantTemplates.map(
                    (template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() =>
                          addCombatantFromTemplate(
                            template
                          )
                        }
                        className="flex min-h-12 w-full items-center justify-between border border-border/30 bg-surface px-4 py-3 text-left transition hover:border-border/60"
                      >
                        <span className="text-sm font-medium">
                          {template.name}
                        </span>

                        <span className="text-xs text-muted">
                          Init.{" "}
                          {template.initiative}
                        </span>
                      </button>
                    )
                  )
                )}

              </div>
            )}

          </div>

        </aside>

        {/* ========================================== */}
        {/* FICHE DU COMBATTANT */}
        {/* ========================================== */}

        <div className="min-w-0">

          {selectedCombatant ? (
            <CombatantSheet
              combatant={
                selectedCombatant
              }
              onUpdate={(update) =>
                updateCombatant(
                  selectedCombatant.id,
                  update
                )
              }
            />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center p-8">
              <div className="text-center">
                <p className="text-sm text-muted">
                  Aucun combattant sélectionné.
                </p>

                <p className="mt-2 text-xs text-muted/70">
                  Ajoutez un combattant pour
                  commencer le combat.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}

      <footer className="border-t border-border/20 px-6 py-4">
        <div className="mx-auto flex max-w-7xl justify-end">

          <button
            type="button"
            onClick={() => {
              setCombat((currentCombat) =>
                nextTurn(currentCombat)
              );
            }}
            className="rounded-md border border-border/40 px-5 py-2 text-sm font-medium transition hover:bg-surface"
          >
            Fin du tour
          </button>

        </div>
      </footer>

    </main>
  );
}