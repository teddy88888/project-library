export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid size-10 place-items-center text-blue-600">
        <span className="absolute inset-0 rounded-full border-[5px] border-blue-600 [clip-path:polygon(50%_0,56%_42%,82%_7%,68%_48%,100%_35%,72%_57%,96%_75%,63%_63%,73%_100%,51%_70%,31%_97%,41%_65%,5%_81%,35%_57%,0_45%,39%_48%,18%_13%,45%_40%)]" />
        <span className="size-2 rounded-full bg-blue-600" />
      </span>
      {!compact && <span className="text-2xl font-bold tracking-tight">Booky</span>}
    </div>
  );
}