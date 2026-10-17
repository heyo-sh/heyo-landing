/* Conduit: three loose-ended signal leads gathered into one solid junction.
 * Hover a contact: it lifts, pulling its own cable taut; nearby contacts
 * follow later and less. The links themselves are the object, not a diagram. */
const {
  Cam, facing, fit, poly, prism, proj, r2, ringAt, rings, seg,
  tdone, tset, tval, tween, disposer, mk, place, pointer, put, register, solid,
} = HL;

const CONTACTS = [
  { x: 13, y: 9, h: 7 },
  { x: 0, y: 57, h: 12 },
  { x: 37, y: 87, h: 5 },
];
const HUB = { x: 104, y: 48, w: 27, d: 29, h: 17 };
const W = 24, D = 21;

function cable(a, b, c, d) {
  return `M${r2(a[0])} ${r2(a[1])}C${r2(b[0])} ${r2(b[1])} ${r2(c[0])} ${r2(c[1])} ${r2(d[0])} ${r2(d[1])}`;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value, active = -1;
  const C = Cam(45, 0.5, 2.3);
  fit(C, [[-9, -7, -4], [139, 120, -4], [-9, 120, -4], [139, -7, -4], [0, 0, 50], [135, 115, 50]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  const hx = HUB.x + HUB.w / 2, hy = HUB.y + HUB.d / 2;

  // Two thin sleeves under the connections make the free-floating wires feel
  // anchored; cables are painted before every opaque connector they enter.
  const [shoe, shoeCrease] = rings(90, 40, 139, 84, 8, 1.3);
  put(solid(g), prism(P, front, shoe, shoeCrease, -4, 0));
  const leads = CONTACTS.map(() => mk("path", { class: "nf lo" }, g));

  const contacts = CONTACTS.map((contact, i) => {
    const [ring, inner] = rings(contact.x, contact.y, contact.x + W, contact.y + D, 5, 1.1);
    const plate = solid(g);
    const pin = mk("path", { class: "nf lo" }, plate.g);
    const dot = mk("circle", { r: 1.15, class: "dot m" }, plate.g);
    return { ...contact, i, ring, inner, plate, pin, dot, rise: tween(contact.h), drawn: NaN };
  });

  const [hub, hubCrease] = rings(HUB.x, HUB.y, HUB.x + HUB.w, HUB.y + HUB.d, 7, 1.2);
  const junction = solid(g);
  put(junction, prism(P, front, hub, hubCrease, 0, HUB.h));
  junction.sil.classList.add("hi");
  const [socket] = rings(HUB.x + 6, HUB.y + 6, HUB.x + HUB.w - 6, HUB.y + HUB.d - 6, 3.6, 0.9);
  mk("path", { class: "nf lo", d: poly(ringAt(P, socket, HUB.h + 0.1)) }, junction.g);

  function draw(part, h) {
    if (part.drawn === h) return;
    part.drawn = h;
    put(part.plate, prism(P, front, part.ring, part.inner, 0, h));
    part.pin.setAttribute("d", [6, 11].map((y) =>
      seg(P(part.x + 6, part.y + y, h + 0.1), P(part.x + 16, part.y + y, h + 0.1))).join(""));
    place(part.dot, P(part.x + 18, part.y + 15, h + 0.1));

    const sx = part.x + W / 2, sy = part.y + D / 2;
    leads[part.i].setAttribute("d", cable(
      P(sx, sy, h - 1),
      P(sx + 37, sy, Math.max(2, h * 0.52)),
      P(hx - 32, hy + (sy - hy) * 0.45, HUB.h * 0.35),
      P(hx, hy, HUB.h - 2),
    ));
  }

  const clock = register(stage, (_dt, now) => {
    let moving = false;
    contacts.forEach((part) => {
      draw(part, tval(part.rise, now));
      if (!tdone(part.rise, now)) moving = true;
    });
    return moving;
  });
  bag.add(clock.unregister);

  // The contact's RESTING lid is the hit target; its animated pose never is.
  const centers = contacts.map(({ x, y, h }) => P(x + W / 2, y + D / 2, h));
  function hit([px, py]) {
    let winner = -1, nearest = 72;
    centers.forEach(([cx, cy], i) => {
      const d = Math.hypot(cx - px, cy - py);
      if (d < nearest) { nearest = d; winner = i; }
    });
    return winner;
  }
  function choose(index) {
    if (index === active) return;
    const origin = index < 0 ? active : index, now = performance.now();
    active = index;
    contacts.forEach((part, i) => {
      const distance = index < 0 ? 0 : Math.abs(i - index);
      const share = index < 0 ? 0 : distance === 0 ? 1 : distance === 1 ? 0.23 : 0.08;
      tset(part.rise, part.h + reach * share, now, Math.abs(i - origin) * 45);
      part.plate.sil.classList.toggle("hi", index === i);
      leads[i].setAttribute("class", index === i ? "nf hi" : "nf lo");
    });
    read.textContent = index < 0 ? "rest" : `link 0${index + 1}`;
    clock.wake();
  }
  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = v; if (active >= 0) { const a = active; active = -1; choose(a); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "conduit",
  means: "Three contact leads converge into one junction; the chosen contact lifts and draws its cable taut.",
  rules: [1, 2, 3, 4, 5, 6, 8, 9],
  range: [9, 18, 27],
  tour: [[130, 135], [190, 177], [177, 221], null],
  mount,
});
