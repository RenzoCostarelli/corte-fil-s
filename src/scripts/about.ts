import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";

// Title reveal animation — fires once, synced to the hero video animation
const title = document.querySelector<HTMLElement>("[data-about-title]");
const paragraphs = document.querySelectorAll<HTMLElement>(
  "[data-about-paragraph]",
);
if (title && paragraphs) {
  const split = new SplitText(title, { type: "lines" });
  const splitp = new SplitText(paragraphs, { type: "lines" });

  gsap.set(split.lines, { opacity: 0, y: 40, filter: "blur(8px)" });
  gsap.set(splitp.lines, { opacity: 0, y: 40, filter: "blur(8px)" });
  const tl = gsap
    .timeline({ paused: true })
    .to(split.lines, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
    })
    .to(splitp.lines, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
    });

  tl.play();
  // window.addEventListener(
  //   "hero:title-reveal",
  //   () => {
  //     gsap.to(split.lines, {
  //       opacity: 1,
  //       y: 0,
  //       filter: "blur(0px)",
  //       duration: 0.6,
  //       stagger: 0.08,
  //       ease: "power2.out",
  //     }).to(splitp.lines, {

  //     );
  //   },
  //   { once: true },
  // );
}
// Text reveal animation

// paragraphs.forEach((paragraph) => {
//

//   const tl = gsap.timeline({ paused: true }).to(split.lines, {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     duration: 0.6,
//     stagger: 0.08,
//     ease: "power2.out",
//   });

//   gsap.set(split.lines, { opacity: 0.15, y: 60, filter: "blur(8px)" });

//   ScrollTrigger.create({
//     trigger: paragraph,
//     start: "top 90%",
//     markers: true,
//     animation: tl,
//   });
// });
