import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";

const title = document.querySelector<HTMLElement>("[data-categories-title]");

if (title) {
  const split = new SplitText(title, { type: "lines" });

  gsap.set(split.lines, { opacity: 0, y: 40, filter: "blur(8px)" });

  const tl = gsap.timeline({ paused: true }).to(split.lines, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
  });

  ScrollTrigger.create({
    trigger: title,
    start: "top 85%",
    end: "center 80%",
    scrub: true,
    animation: tl,
  });
}

const rows = gsap.utils.toArray<HTMLElement>("[data-category-row]");

rows.forEach((row) => {
  gsap.set(row, { opacity: 0, y: 20 });

  const tl = gsap.timeline({ paused: true }).to(row, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "power3.out",
  });

  ScrollTrigger.create({
    trigger: row,
    start: "top 90%",
    end: "center 80%",
    scrub: true,
    animation: tl,
  });
});
