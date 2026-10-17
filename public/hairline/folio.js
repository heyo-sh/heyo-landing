/* Folio: an open source manuscript on a cover. Pick a leaf: it rises from the
 * spine; the other answers a little later. The rest and hit poses are fixed. */
const {
  Cam, facing, fit, open, poly, prism, proj, rad, rings, rrect, run, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const HINGE = 55, PAGE_Y0 = 9, PAGE_Y1 = 82;
const LEAVES = [
  { x0: 7, x1: HINGE, rest: 12, n: "01" },
  { x0: HINGE, x1: 103, rest: 5, n: "02" },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let spread = value, active = -1;
  const C = Cam(45, 0.5, 1.98);
  fit(C, [[-5, -6, -5], [115, 98, -5], [-5, 98, -5], [115, -6, -5], [0, 0, 53], [110, 90, 53]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);

  const [cover, coverCrease] = rings(-3, -3, 112, 94, 8, 1.6);
  put(solid(g), prism(P, front, cover, coverCrease, -5, 2));
  const [binding, bindingCrease] = rings(51, 6, 59, 86, 2, 0.9);
  put(solid(g), prism(P, front, binding, bindingCrease, 2, 3));

  const leaves = LEAVES.map((leaf) => {
    const ring = rrect(leaf.x0, PAGE_Y0, leaf.x1, PAGE_Y1, 3, 6);
    const inner = rrect(leaf.x0 + 1.4, PAGE_Y0 + 1.4, leaf.x1 - 1.4, PAGE_Y1 - 1.4, 1.6, 6);
    const group = mk("g", {}, g);
    return {
      ...leaf, ring, inner,
      underside: mk("path", { class: "lo" }, group),
      face: mk("path", { class: "sil" }, group),
      crease: mk("path", { class: "nf lo" }, group),
      ruling: mk("path", { class: "nf lo" }, group),
      angle: tween(leaf.rest), drawn: NaN,
    };
  });

  function draw(leaf, degrees) {
    if (degrees === leaf.drawn) return;
    leaf.drawn = degrees;
    const sine = Math.sin(rad(degrees)), cosine = Math.cos(rad(degrees));
    const at = (u, v, depth = 0) => P(HINGE + (u - HINGE) * cosine, v, 3 + Math.abs(u - HINGE) * sine + depth);
    leaf.underside.setAttribute("d", poly(leaf.ring.map((q) => at(q.u, q.v, -1.1))));
    leaf.face.setAttribute("d", poly(leaf.ring.map((q) => at(q.u, q.v))));
    leaf.crease.setAttribute("d", open(run(leaf.inner, front).map((q) => at(q.u, q.v, 0.1))));
    leaf.ruling.setAttribute("d", [24, 34, 44, 54, 64].map((y, i) =>
      seg(at(leaf.x0 + 9, y, 0.12), at(leaf.x1 - (i === 2 ? 13 : 8), y, 0.12))).join(""));
  }

  const clock = register(stage, (_dt, now) => {
    let moving = false;
    leaves.forEach((leaf) => {
      draw(leaf, tval(leaf.angle, now));
      if (!tdone(leaf.angle, now)) moving = true;
    });
    return moving;
  });
  bag.add(clock.unregister);

  // The covers never move, and hit testing uses the centres at REST, not the folded pages.
  const centers = leaves.map((leaf) => {
    const u = (leaf.x0 + leaf.x1) / 2;
    return P(HINGE + (u - HINGE) * Math.cos(rad(leaf.rest)), 45, 3 + Math.abs(u - HINGE) * Math.sin(rad(leaf.rest)));
  });
  function hit([x, y]) {
    let winner = -1, nearest = 95;
    centers.forEach(([cx, cy], i) => {
      const d = Math.hypot(x - cx, y - cy);
      if (d < nearest) { nearest = d; winner = i; }
    });
    return winner;
  }
  function choose(index) {
    if (index === active) return;
    const origin = index < 0 ? active : index, now = performance.now();
    active = index;
    leaves.forEach((leaf, i) => {
      const delta = index < 0 ? 0 : i === index ? spread : spread * 0.15;
      tset(leaf.angle, leaf.rest + delta, now, Math.abs(i - origin) * 45);
      leaf.face.classList.toggle("hi", i === (index < 0 ? 0 : index));
    });
    read.textContent = index < 0 ? "rest" : `page ${leaves[index].n}`;
    clock.wake();
  }
  leaves[0].face.classList.add("hi");
  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { spread = v; if (active >= 0) { const a = active; active = -1; choose(a); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "folio",
  means: "An open manuscript: choosing a leaf lifts it from the spine, and its neighbour follows a little.",
  rules: [1, 2, 4, 5, 8, 9],
  range: [18, 33, 48],
  tour: [[155, 157], [250, 155], [165, 190], null],
  mount,
});
