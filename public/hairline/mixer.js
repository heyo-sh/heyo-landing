/* Mixer: three real faders in long milled slots. The pointer chooses a channel;
 * its thumb slides forward and the neighbouring thumbs follow less, in turn. */
const {
  Cam, clamp, facing, fit, prism, proj, rings, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const CHANNELS = [
  { x: 21, y: 63 },
  { x: 55, y: 51 },
  { x: 89, y: 68 },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let travel = value, active = -1;
  const C = Cam(45, 0.5, 2.04);
  fit(C, [[-6, -6, -5], [116, 98, -5], [-6, 98, -5], [116, -6, -5], [0, 0, 22]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  const [body, bodyCrease] = rings(-4, -4, 114, 96, 8, 1.8);
  put(solid(g), prism(P, front, body, bodyCrease, -5, 7));

  const faders = CHANNELS.map(({ x, y }) => {
    // The long slot and its graduation marks are part of the panel, behind the thumb.
    const [track, trackCrease] = rings(x - 3.5, 13, x + 3.5, 81, 3.2, 0.8);
    put(solid(g), prism(P, front, track, trackCrease, 7, 7.5));
    mk("path", {
      class: "nf lo",
      d: [19, 32, 45, 58, 71, 79].map((v) =>
        seg(P(x + 7, v, 7.1), P(x + 12, v, 7.1))).join(""),
    }, g);
    const [ring, inner] = rings(x - 11, -6, x + 11, 6, 3.6, 1.1);
    const thumb = solid(g);
    const grip = mk("path", { class: "nf lo" }, thumb.g);
    return { x, y, ring, inner, thumb, grip, position: tween(y), drawn: NaN };
  });

  function draw(fader, y) {
    if (y === fader.drawn) return;
    fader.drawn = y;
    const shifted = (ring) => ring.map((q) => ({ ...q, v: q.v + y }));
    put(fader.thumb, prism(P, front, shifted(fader.ring), shifted(fader.inner), 7.6, 15));
    fader.grip.setAttribute("d", [-2, 2].map((v) =>
      seg(P(fader.x - 6, y + v, 15.1), P(fader.x + 6, y + v, 15.1))).join(""));
  }

  const clock = register(stage, (_dt, now) => {
    let moving = false;
    faders.forEach((fader) => {
      draw(fader, tval(fader.position, now));
      if (!tdone(fader.position, now)) moving = true;
    });
    return moving;
  });
  bag.add(clock.unregister);

  // Static track centres, not the travelling thumbs, choose the channel.
  const centers = faders.map(({ x }) => P(x, 48, 7));
  function hit([px, py]) {
    let winner = -1, nearest = 77;
    centers.forEach(([cx, cy], i) => {
      const d = Math.hypot(px - cx, py - cy);
      if (d < nearest) { nearest = d; winner = i; }
    });
    return winner;
  }
  function choose(index) {
    if (index === active) return;
    const origin = index < 0 ? active : index, now = performance.now();
    active = index;
    faders.forEach((fader, i) => {
      const distance = index < 0 ? 0 : Math.abs(i - index);
      const share = index < 0 ? 0 : distance === 0 ? 1 : distance === 1 ? 0.2 : 0.06;
      tset(fader.position, clamp(fader.y - travel * share, 22, 73), now,
        Math.abs(i - origin) * 45);
      fader.thumb.sil.classList.toggle("hi", i === (index < 0 ? 1 : index));
    });
    read.textContent = index < 0 ? "rest" : `fader 0${index + 1}`;
    clock.wake();
  }
  faders[1].thumb.sil.classList.add("hi");
  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { travel = v; if (active >= 0) { const a = active; active = -1; choose(a); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "mixer",
  means: "Three channel faders in milled slots: choose one and its neighbours follow it forward, each a little less.",
  rules: [1, 2, 4, 5, 7, 8, 9],
  range: [12, 26, 40],
  tour: [[145, 160], [210, 154], [260, 170], null],
  mount,
});
