import { gsap, ScrollTrigger } from "../lib/gsap";

const pinTarget = document.querySelector<HTMLElement>("[data-about-section]");
const container = document.querySelector<HTMLElement>(
  "[data-about-carousel]",
);
const track = document.querySelector<HTMLElement>("[data-carousel-track]");

if (pinTarget && container && track) {
  // Recomputed on refresh so adding/removing slides adjusts the scroll distance automatically.
  const getScrollDistance = () =>
    Math.max(track.scrollWidth - container.clientWidth, 0);

  const animation = gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: pinTarget,
    start: "top top",
    end: () => `+=${getScrollDistance()}`,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    animation,
  });
}
