import { gsap } from "../lib/gsap";

export function initCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

  document.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  document.addEventListener("mouseenter", () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
  });

  document.addEventListener("mouseleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });

  const onEnterLink = () =>
    gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" });
  const onLeaveLink = () =>
    gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });

  function bindLinks() {
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });
  }

  bindLinks();

  document.addEventListener("astro:after-swap", bindLinks);
}
