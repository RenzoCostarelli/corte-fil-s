import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";

// ─── Utilities ──────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const dist = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);

// ─── TrailImage ─────────────────────────────────────────────────────────────
class TrailImage {
  el: HTMLImageElement;
  constructor(el: HTMLImageElement) {
    this.el = el;
  }
  isActive() {
    return (
      gsap.isTweening(this.el) ||
      parseFloat(this.el.style.opacity || "0") > 0
    );
  }
}

// ─── ImageTrail ─────────────────────────────────────────────────────────────
class ImageTrail {
  private container: HTMLElement;
  private images: TrailImage[];
  private imgIndex = 0;
  private zIndex = 1;
  private mouse = { x: 0, y: 0 };
  private lastMouse = { x: 0, y: 0 };
  private cached = { x: 0, y: 0 };
  private rafId = 0;
  /** Minimum px the cursor must travel before showing the next image */
  private threshold = 80;

  // Arrow function so `this` is preserved when passed to addEventListener
  private _onMove = (ev: MouseEvent) => {
    const r = this.container.getBoundingClientRect();
    this.mouse.x = ev.clientX - r.left;
    this.mouse.y = ev.clientY - r.top;
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.images = [
      ...container.querySelectorAll<HTMLImageElement>("[data-trail-img]"),
    ].map((el) => new TrailImage(el));

    if (!this.images.length) return;

    container.addEventListener("mousemove", this._onMove);
    this.rafId = requestAnimationFrame(() => this._render());
  }

  private _render() {
    // Smoothly interpolate cached position toward actual mouse
    this.cached.x = lerp(this.cached.x, this.mouse.x, 0.1);
    this.cached.y = lerp(this.cached.y, this.mouse.y, 0.1);

    const d = dist(
      this.mouse.x,
      this.mouse.y,
      this.lastMouse.x,
      this.lastMouse.y,
    );

    if (d > this.threshold) {
      this._show();
      this.zIndex++;
      this.imgIndex = (this.imgIndex + 1) % this.images.length;
      this.lastMouse = { ...this.mouse };
    }

    // Reset z-index stack when nothing is animating
    if (this.images.every((img) => !img.isActive()) && this.zIndex !== 1) {
      this.zIndex = 1;
    }

    this.rafId = requestAnimationFrame(() => this._render());
  }

  private _show() {
    const { el } = this.images[this.imgIndex];
    gsap.killTweensOf(el);

    const hw = el.offsetWidth / 2;
    const hh = el.offsetHeight / 2;

    // Start at smoothed (cached) position, drift toward actual cursor
    gsap
      .timeline()
      .set(el, {
        opacity: 1,
        scale: 1,
        zIndex: this.zIndex,
        x: this.cached.x - hw,
        y: this.cached.y - hh,
      })
      // Slide to real cursor position
      .to(
        el,
        {
          duration: 0.9,
          ease: "expo.out",
          x: this.mouse.x - hw,
          y: this.mouse.y - hh,
        },
        0,
      )
      // Fade out
      .to(el, { duration: 1, ease: "power1.out", opacity: 0 }, 0.4)
      // Shrink while fading
      .to(el, { duration: 1, ease: "power3.out", scale: 0.2 }, 0.4);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.container.removeEventListener("mousemove", this._onMove);
    this.images.forEach(({ el }) => gsap.killTweensOf(el));
  }
}

// ─── Lifecycle ──────────────────────────────────────────────────────────────
let triggers: ScrollTrigger[] = [];
let trail: ImageTrail | null = null;

document.addEventListener("astro:page-load", () => {
  // Text reveal animation
  const paragraphs = document.querySelectorAll<HTMLElement>(
    "[data-about-paragraph]",
  );

  paragraphs.forEach((paragraph) => {
    const split = new SplitText(paragraph, { type: "lines" });

    const tl = gsap.timeline({ paused: true }).to(split.lines, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.4,
      stagger: 0.08,
      ease: "none",
    });

    gsap.set(split.lines, { opacity: 0.15, y: 60, filter: "blur(8px)" });

    triggers.push(
      ScrollTrigger.create({
        trigger: paragraph,
        start: "top bottom",
        end: "center center",
        scrub: true,
        animation: tl,
      }),
    );
  });

  // Image trail – only on pointer devices (skip touch/mobile)
  const hasHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (hasHover) {
    const section = document.querySelector<HTMLElement>("[data-about-section]");
    if (section) trail = new ImageTrail(section);
  }
});

document.addEventListener("astro:before-swap", () => {
  triggers.forEach((t) => t.kill());
  triggers = [];
  trail?.destroy();
  trail = null;
});
