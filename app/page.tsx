"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Combat } from "@/lib/types/combat";

import {
  addCombat,
  getCombats,
  removeCombat,
} from "@/lib/library/combatStorage";

export default function Home() {
  const [combats, setCombats] = useState<Combat[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCombats(getCombats());
  }, []);

  function handleDelete(id: string) {
    removeCombat(id);

    setCombats((current) =>
      current.filter(
        (combat) => combat.id !== id
      )
    );
  }

  function createCombat() {
    const combat: Combat = {
      id: crypto.randomUUID(),
      name: "Nouveau combat",
      round: 1,
      activeCombatantId: null,
      selectedCombatantId: null,
      combatants: [],
    };

    addCombat(combat);

    router.push(`/combat/${combat.id}`);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 sm:px-10 sm:py-16">

        {/* En-tête */}
        <header>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Etern&apos;Âme
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Gestionnaire
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Préparez vos combats, gérez vos combattants et
            retrouvez vos parties.
          </p>
        </header>

        {/* Gestion */}
        <section className="mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Gestion
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            {/* Bibliothèque */}
            <Link
              href="/library"
              className="group border border-border/30 bg-surface p-6 transition hover:border-border/60"
            >
              <h2 className="text-xl font-medium">
                Bibliothèque
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Gérez vos combattants et leurs caractéristiques.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm">
                  Ouvrir
                </span>

                <span
                  aria-hidden="true"
                  className="text-lg transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </div>
            </Link>

            {/* Nouveau combat */}
            <button
              type="button"
              onClick={createCombat}
              className="group block min-h-40 w-full border border-border/30 bg-surface p-6 text-left text-foreground transition hover:border-border/60 hover:bg-surface-light active:scale-[0.99]"
            >
              <h2 className="text-xl font-medium">
                Nouveau combat
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Créez une nouvelle rencontre.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm">
                  Créer
                </span>

                <span
                  aria-hidden="true"
                  className="text-lg transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </div>
            </button>

          </div>
        </section>

        {/* Combats */}
        <section className="mt-12 border-t border-border/20 pt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Parties
              </p>

              <h2 className="mt-1 text-xl font-medium">
                Combats sauvegardés
              </h2>
            </div>

            <span className="text-xs text-muted">
              {combats.length}
            </span>
          </div>

          {combats.length === 0 ? (
            <div className="mt-5 border border-dashed border-border/30 p-8 text-center">
              <p className="text-sm text-muted">
                Aucun combat sauvegardé.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-2">
              {combats.map((combat) => (
                <article
                  key={combat.id}
                  className="flex items-center justify-between gap-4 border border-border/20 bg-surface p-4"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">
                      {combat.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted">
                      Round {combat.round}
                      {" · "}
                      {combat.combatants.length} combattant
                      {combat.combatants.length > 1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/combat/${combat.id}`}
                      className="min-h-10 border border-border/30 px-4 py-2 text-sm transition hover:bg-background"
                    >
                      Reprendre
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(combat.id)
                      }
                      className="min-h-10 border border-border/30 px-4 py-2 text-sm text-muted transition hover:bg-background hover:text-foreground"
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}