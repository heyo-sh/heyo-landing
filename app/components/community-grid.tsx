const communityGridRows = 11;

function createCommunityGridCells(columns: number) {
  return Array.from({ length: columns * communityGridRows }, (_, index) => {
    const column = Math.floor(index / communityGridRows);
    const row = index % communityGridRows;
    const seed = (column * 17 + row * 31 + column * row * 7) % 13;
    const idleOpacity = [0.12, 0.18, 0.28, 0.4][seed % 4];

    return {
      begin: `${((column * 0.67 + row * 1.17) % 16).toFixed(2)}s`,
      duration: `${(8 + (seed % 4)).toFixed(1)}s`,
      flickers: (column * 13 + row * 7) % 7 === 0,
      idleOpacity,
      x: column * 20 + 6,
      y: 1 + row * 17,
    };
  });
}

const mobileCommunityGridCells = createCommunityGridCells(24);
const desktopCommunityGridCells = createCommunityGridCells(53);

function CommunityGridSvg({
  cells,
  className,
  columns,
}: {
  cells: ReturnType<typeof createCommunityGridCells>;
  className: string;
  columns: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`size-full text-foreground ${className}`}
      fill="none"
      preserveAspectRatio="none"
      shapeRendering="geometricPrecision"
      viewBox={`0 0 ${columns * 20 - 4} ${communityGridRows * 17 - 7}`}
    >
      {cells.map((cell, index) => (
        <rect
          fill="var(--background)"
          height="8"
          key={index}
          opacity={cell.idleOpacity}
          rx="0.5"
          stroke="currentColor"
          strokeWidth="0.8"
          width="8"
          x={cell.x}
          y={cell.y}
        >
          {cell.flickers ? (
            <animate
              attributeName="opacity"
              begin={cell.begin}
              dur={cell.duration}
              keyTimes="0;0.22;0.4;0.6;1"
              repeatCount="indefinite"
              values={`${cell.idleOpacity};${cell.idleOpacity};1;${cell.idleOpacity};${cell.idleOpacity}`}
            />
          ) : null}
        </rect>
      ))}
    </svg>
  );
}

export function CommunityGrid() {
  return (
    <>
      <CommunityGridSvg
        cells={mobileCommunityGridCells}
        className="sm:hidden"
        columns={24}
      />
      <CommunityGridSvg
        cells={desktopCommunityGridCells}
        className="hidden sm:block"
        columns={53}
      />
    </>
  );
}
