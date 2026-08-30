import type { Combatant } from "@/lib/types/combatant";

type CombatantListProps = {
  combatants: Combatant[];
  activeCombatantId: string | null;
  selectedCombatantId: string | null;

  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CombatantList({
  combatants,
  activeCombatantId,
  selectedCombatantId,
  onSelect,
  onRemove,
}: CombatantListProps) {
  return (
    <aside className="p-5 lg:min-h-[calc(100vh-145px)]">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Ordre
        </p>

        <h2 className="mt-1 text-lg font-semibold">
          Initiative
        </h2>
      </div>

      <div className="space-y-1">
        {combatants.map((combatant) => {
          const isActive =
            combatant.id === activeCombatantId;

          const isSelected =
            combatant.id === selectedCombatantId;

          return (
            <div
              key={combatant.id}
              className={[
                "group flex w-full items-center gap-2 rounded-md transition",
                isSelected
                  ? "bg-surface"
                  : "hover:bg-surface/60",
              ].join(" ")}
            >
              {/* Sélection */}
              <button
                type="button"
                onClick={() =>
                  onSelect(combatant.id)
                }
                className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left"
              >
                {/* Active indicator */}
                <span
                  className={[
                    "w-3 shrink-0 text-sm transition",
                    isActive
                      ? "text-primary"
                      : "text-transparent",
                  ].join(" ")}
                >
                  →
                </span>

                {/* Nom */}
                <span className="min-w-0 flex-1 truncate text-sm">
                  {combatant.name}
                </span>

                {/* Initiative */}
                <span className="text-xs tabular-nums text-muted">
                  {combatant.initiative}
                </span>
              </button>

              {/* Supprimer */}
              <button
                type="button"
                onClick={() =>
                  onRemove(combatant.id)
                }
                className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded text-sm text-muted opacity-0 transition hover:bg-background hover:text-foreground group-hover:opacity-100"
                aria-label={`Retirer ${combatant.name} du combat`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}