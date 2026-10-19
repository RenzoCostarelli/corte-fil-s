import { gsap } from "../lib/gsap";

const cursor = document.getElementById("custom-cursor");

if (cursor) {
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

  const onEnterLink = () =>
    gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
  const onLeaveLink = () =>
    gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: "power2.out" });

  const onEnterVideoLink = () => {
    gsap.to(cursor, {
      scale: 2,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    if (cursorLabel) {
      cursorLabel.textContent = "Ver reel";
      gsap.set(cursorLabel, { scale: 0.55 });
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

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", onEnterLink);
    el.addEventListener("mouseleave", onLeaveLink);
  });

  document.querySelectorAll("[data-reel]").forEach((el) => {
    el.addEventListener("mouseenter", onEnterVideoLink);
    el.addEventListener("mouseleave", onLeaveVideoLink);
  });
}
