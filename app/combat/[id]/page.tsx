"use client";

import { useEffect, useState } from "react";

import type { Combat } from "@/lib/types/combat";

import CombatScreen from "@/components/combat/CombatScreen";

import { getCombat } from "@/lib/library/combatStorage";

type CombatPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function CombatPage({
  params,
}: CombatPageProps) {
  const [combat, setCombat] =
    useState<Combat | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadCombat() {
      const { id } = await params;

      const savedCombat =
        getCombat(id);

      setCombat(savedCombat);
      setLoading(false);
    }

    loadCombat();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted">
          Chargement du combat...
        </p>
      </main>
    );
  }

  if (!combat) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Combat
          </p>

          <h1 className="mt-2 text-2xl font-semibold">
            Combat introuvable
          </h1>

          <p className="mt-2 text-sm text-muted">
            Cette partie n&apos;existe pas ou a été supprimée.
          </p>
        </div>
      </main>
    );
  }

  return (
    <CombatScreen combat={combat} />
  );
}