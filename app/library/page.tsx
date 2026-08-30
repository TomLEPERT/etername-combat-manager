"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { CombatantTemplate } from "@/lib/types/combatant";
import { defaultCombatants } from "@/lib/data/defaultCombatants";

import {
  addCombatantTemplate,
  getCombatantTemplates,
  removeCombatantTemplate,
} from "@/lib/library/storage";

import CombatantForm from "@/components/library/CombatantForm";

export default function LibraryPage() {
  const [templates, setTemplates] =
    useState<CombatantTemplate[]>([]);

  const [isCreating, setIsCreating] =
    useState(false);

  const [editingTemplate, setEditingTemplate] =
    useState<CombatantTemplate | null>(null);

  /*
   * Les créatures de base sont définies dans le code.
   * Les combattants personnels viennent du localStorage.
   */
  function refreshTemplates() {
    const personalTemplates =
      getCombatantTemplates();

    setTemplates([
      ...defaultCombatants,
      ...personalTemplates,
    ]);
  }

  useEffect(() => {
    refreshTemplates();
  }, []);

  function handleDelete(id: string) {
    /*
     * Sécurité supplémentaire :
     * une créature de base ne peut jamais être supprimée.
     */
    const isDefault =
      defaultCombatants.some(
        (template) => template.id === id
      );

    if (isDefault) {
      return;
    }

    removeCombatantTemplate(id);

    refreshTemplates();
  }

  function handleCreate(
    template: CombatantTemplate
  ) {
    addCombatantTemplate(template);

    refreshTemplates();

    setIsCreating(false);
  }

  function handleEdit(
    template: CombatantTemplate
  ) {
    /*
     * Les créatures de base ne peuvent pas être modifiées.
     */
    const isDefault =
      defaultCombatants.some(
        (defaultTemplate) =>
          defaultTemplate.id === template.id
      );

    if (isDefault) {
      return;
    }

    removeCombatantTemplate(template.id);
    addCombatantTemplate(template);

    refreshTemplates();

    setEditingTemplate(null);
  }

  function cancelForms() {
    setIsCreating(false);
    setEditingTemplate(null);
  }

  const defaultTemplates =
    templates.filter((template) =>
      defaultCombatants.some(
        (defaultTemplate) =>
          defaultTemplate.id === template.id
      )
    );

  const personalTemplates =
    templates.filter(
      (template) =>
        !defaultCombatants.some(
          (defaultTemplate) =>
            defaultTemplate.id === template.id
        )
    );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HEADER */}

      <header className="border-b border-border/20 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <span aria-hidden="true">
              ←
            </span>

            Retour
          </Link>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted">
            Etern&apos;Âme
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Bibliothèque
          </h1>

          <p className="mt-2 max-w-xl text-sm text-muted">
            Retrouvez les créatures de base et
            vos combattants personnalisés.
          </p>

          {!isCreating &&
            !editingTemplate && (
              <button
                type="button"
                onClick={() => {
                  setIsCreating(true);
                  setEditingTemplate(null);
                }}
                className="mt-5 min-h-12 border border-primary px-5 py-3 text-sm font-medium transition hover:bg-surface"
              >
                + Nouveau combattant
              </button>
            )}
        </div>
      </header>

      {/* CONTENU */}

      <section className="mx-auto max-w-5xl px-6 py-8">
        {/* FORMULAIRE DE CRÉATION */}

        {isCreating && (
          <div className="mb-10 border border-border/20 bg-surface p-6 sm:p-8">
            <CombatantForm
              onSave={handleCreate}
              onCancel={cancelForms}
            />
          </div>
        )}

        {/* FORMULAIRE D'ÉDITION */}

        {editingTemplate && (
          <div className="mb-10 border border-border/20 bg-surface p-6 sm:p-8">
            <CombatantForm
              initialValue={editingTemplate}
              onSave={handleEdit}
              onCancel={cancelForms}
            />
          </div>
        )}

        {/* CRÉATURES DE BASE */}

        <section>
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Créatures de base
            </p>

            <h2 className="mt-1 text-xl font-medium">
              Créatures disponibles
            </h2>

            <p className="mt-2 text-sm text-muted">
              Les créatures fournies avec Etern&apos;Âme.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {defaultTemplates.map(
              (template) => (
                <article
                  key={template.id}
                  className="border border-border/20 bg-surface p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">
                        {template.name}
                      </h3>

                      <p className="mt-1 text-xs text-muted">
                        Initiative{" "}
                        {template.initiative}
                      </p>
                    </div>

                    <span className="text-xs uppercase tracking-wider text-muted">
                      {template.side}
                    </span>
                  </div>

                  <p className="mt-5 text-xs text-muted">
                    Créature de base
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* COMBATTANTS PERSONNELS */}

        <section className="mt-12 border-t border-border/20 pt-8">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Votre bibliothèque
            </p>

            <h2 className="mt-1 text-xl font-medium">
              Vos combattants
            </h2>

            <p className="mt-2 text-sm text-muted">
              Les combattants que vous avez créés.
            </p>
          </div>

          {personalTemplates.length === 0 ? (
            <div className="border border-dashed border-border/30 p-10 text-center">
              <p className="text-sm text-muted">
                Aucun combattant personnalisé.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {personalTemplates.map(
                (template) => (
                  <article
                    key={template.id}
                    className="border border-border/20 bg-surface p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">
                          {template.name}
                        </h3>

                        <p className="mt-1 text-xs text-muted">
                          Initiative{" "}
                          {template.initiative}
                        </p>
                      </div>

                      <span className="text-xs uppercase tracking-wider text-muted">
                        {template.side}
                      </span>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTemplate(
                            template
                          );

                          setIsCreating(false);
                        }}
                        className="min-h-11 border border-border/30 px-4 py-2 text-sm transition hover:bg-background"
                      >
                        Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            template.id
                          )
                        }
                        className="min-h-11 border border-border/30 px-4 py-2 text-sm text-muted transition hover:bg-background hover:text-foreground"
                      >
                        Supprimer
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
