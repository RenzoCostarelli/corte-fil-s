import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";

// Title reveal animation — fires once, synced to the hero video animation
const title = document.querySelector<HTMLElement>("[data-about-title]");
if (title) {
  const split = new SplitText(title, { type: "lines" });

  gsap.set(split.lines, { opacity: 0, y: 40, filter: "blur(8px)" });

  window.addEventListener(
    "hero:title-reveal",
    () => {
      gsap.to(split.lines, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { once: true },
  );
}

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
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
  });

  gsap.set(split.lines, { opacity: 0.15, y: 60, filter: "blur(8px)" });

  ScrollTrigger.create({
    trigger: paragraph,
    start: "top 80%",
    animation: tl,
  });
});
