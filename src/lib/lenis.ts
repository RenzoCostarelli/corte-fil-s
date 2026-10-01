import Lenis from "lenis";
import { ScrollTrigger } from "./gsap";

export function initLenis() {
  const lenis = new Lenis();

  // Keep ScrollTrigger in sync with Lenis's smooth-scroll position
  lenis.on("scroll", ScrollTrigger.update);

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  if (document.getElementById("loader")) {
    lenis.stop();
  }

  window.addEventListener("loader:done", () => {
    lenis.start();
  });

  document.addEventListener("astro:after-swap", () => {
    lenis.scrollTo(0, { immediate: true });
  });

  return lenis;
}
