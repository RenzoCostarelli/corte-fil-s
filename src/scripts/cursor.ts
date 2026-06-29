import { gsap } from "../lib/gsap";

export function initCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;
  const cursorLabel = cursor.querySelector(
    "[data-cursor-label]",
  ) as HTMLElement;

  gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

  document.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // document.addEventListener("mouseenter", () => {
  //   gsap.to(cursor, { opacity: 1, duration: 0.3 });
  // });

  // document.addEventListener("mouseleave", () => {
  //   gsap.to(cursor, { opacity: 0, duration: 0.3 });
  // });

  const onEnterLink = () =>
    gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power2.out" });
  const onLeaveLink = () =>
    gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });

  const onEnterVideoLink = () => {
    gsap.to(cursor, {
      scale: 2,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    if (cursorLabel) {
      cursorLabel.textContent = "Ver reel";
      gsap.set(cursorLabel, { scale: 0.35 });
      gsap.to(cursorLabel, { opacity: 1, duration: 0.3 });
    }
  };
  const onLeaveVideoLink = () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.3,
      opacity: 0,
      ease: "power2.out",
    });
    if (cursorLabel) {
      gsap.set(cursorLabel, { scale: 0.35 });
      gsap.to(cursorLabel, { opacity: 0, duration: 0.3 });
    }
  };

  function bindLinks() {
    document.querySelectorAll("a, butto").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });
  }

  function bindVideoLinks() {
    document.querySelectorAll("[data-reel]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterVideoLink);
      el.addEventListener("mouseleave", onLeaveVideoLink);
    });
  }

  function unbindLinks() {
    (document.querySelectorAll("a, button").forEach((el) => {
      el.removeEventListener("mouseenter", onEnterLink);
      el.removeEventListener("mouseleave", onLeaveLink);
    }),
      document.querySelectorAll("[data-reel]").forEach((el2) => {
        el2.removeEventListener("mouseenter", onEnterLink);
        el2.removeEventListener("mouseleave", onLeaveLink);
      }));
  }

  bindLinks();
  bindVideoLinks();

  document.addEventListener("astro:after-swap", bindLinks);
  document.addEventListener("astro:after-swap", bindVideoLinks);
  document.addEventListener("astro:before-swap", unbindLinks);
}
