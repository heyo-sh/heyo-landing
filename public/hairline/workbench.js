/*
 * Workbench: three file trays on one rounded desk. The selected tray rises;
 * its neighbours follow less and later. The tabs and ruled faces say files,
 * not anonymous blocks. Hit testing uses the resting tops, never the lift.
 */
const {
  Cam, facing, fit, prism, proj, rings, seg, tdone, tset, tval, tween,
  disposer, mk, place, pointer, put, register, solid,
} = HL;

const TRAYS = [
  { x: 12, y: 17, h: 6, tab: 0 },
  { x: 43, y: 10, h: 10, tab: 1 },
  { x: 74, y: 19, h: 5, tab: 2 },
];
const W = 28, D = 63;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value, active = -2;
  const C = Cam(45, 0.5, 2.02);
  fit(C, [[-3, -3, -5], [110, 94, -5], [0, 0, 44], [110, 94, 44]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  const [desk, inset] = rings(-3, -3, 110, 94, 8, 1.6);
  put(solid(g), prism(P, front, desk, inset, -5, 0));

  const tiles = TRAYS.map((t) => {
    const [ring, inner] = rings(t.x, t.y, t.x + W, t.y + D, 3.5, 1.1);
    const plate = solid(g);
    const lines = mk("path", { class: "nf lo" }, plate.g);
    const tabMark = mk("path", { class: "nf" }, plate.g);
    const dot = mk("circle", { r: 1.4, class: "dot m" }, plate.g);
    return { ...t, ring, inner, plate, lines, tabMark, dot, motion: tween(t.h), drawn: NaN };
  });

  function draw(tile, height) {
    if (tile.drawn === height) return;
    tile.drawn = height;
    put(tile.plate, prism(P, front, tile.ring, tile.inner, 0, height));
    const { x, y } = tile;
    const z = height + 0.03;
    // A tab, a punched hole and short ruled lines are real features of each folder.
    const a = 6 + tile.tab * 5;
    tile.tabMark.setAttribute("d", seg(P(x + a, y + 7, z), P(x + a + 11, y + 7, z)) +
      seg(P(x + a, y + 7, z), P(x + a, y + 10, z)));
    tile.lines.setAttribute("d", [25, 33, 41, 49].map((v, i) =>
      seg(P(x + 5, y + v, z), P(x + (i === 2 ? 17 : 23), y + v, z))).join(""));
    place(tile.dot, P(x + a + 8, y + 9, z));
  }

  const clock = register(stage, (_dt, now) => {
    let moving = false;
    tiles.forEach((tile) => {
      draw(tile, tval(tile.motion, now));
      if (!tdone(tile.motion, now)) moving = true;
    });
    return moving;
  });
  bag.add(clock.unregister);

  const centers = TRAYS.map((t) => P(t.x + W / 2, t.y + D / 2, t.h));
  function hit([sx, sy]) {
    let best = -1, distance = 65;
    centers.forEach(([x, y], i) => {
      const d = Math.hypot(sx - x, sy - y);
      if (d < distance) { best = i; distance = d; }
    });
    return best;
  }
  function select(index) {
    if (index === active) return;
    const previous = active;
    active = index;
    const now = performance.now(), origin = index < 0 ? previous : index;
    tiles.forEach((tile, i) => {
      const distance = index < 0 ? 0 : Math.abs(i - index);
      const rise = index < 0 ? 0 : distance === 0 ? lift : distance === 1 ? lift * 0.25 : lift * 0.07;
      tset(tile.motion, tile.h + rise, now, origin < 0 ? 0 : Math.abs(i - origin) * 45);
      tile.plate.sil.classList.toggle("hi", i === (index < 0 ? 1 : index));
      tile.dot.setAttribute("class", i === (index < 0 ? 1 : index) ? "dot" : "dot m");
    });
    read.textContent = index < 0 ? "rest" : `tray 0${index + 1}`;
    clock.wake();
  }
  select(-1);
  bag.add(pointer(stage, { move: (p) => select(hit(p)), leave: () => select(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { lift = v; if (active >= 0) { const a = active; active = -1; select(a); } }, destroy: bag.dispose };
}

hairline({
  name: "workbench",
  means: "Three file trays on a desk: the one under the pointer lifts, and its neighbours follow in turn.",
  rules: [1, 2, 4, 5, 8, 9, 10],
  range: [12, 23, 33],
  tour: [[140, 165], [200, 138], [261, 177], null],
  mount,
});
