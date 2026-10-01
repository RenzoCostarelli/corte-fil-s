import { gsap, ScrollTrigger } from "../lib/gsap";

let trigger: ScrollTrigger | null = null;

document.addEventListener("astro:page-load", () => {
  const pinTarget = document.querySelector<HTMLElement>(
    "[data-about-section]",
  );
  const container = document.querySelector<HTMLElement>(
    "[data-about-carousel]",
  );
  const track = document.querySelector<HTMLElement>("[data-carousel-track]");
  if (!pinTarget || !container || !track) return;

  // Recomputed on refresh so adding/removing slides adjusts the scroll distance automatically.
  const getScrollDistance = () =>
    Math.max(track.scrollWidth - container.clientWidth, 0);

  const animation = gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: "none",
  });

  trigger = ScrollTrigger.create({
    trigger: pinTarget,
    start: "top top",
    end: () => `+=${getScrollDistance()}`,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    animation,
  });
});

document.addEventListener("astro:before-swap", () => {
  trigger?.kill();
  trigger = null;
});
