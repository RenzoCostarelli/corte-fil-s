import { gsap, ScrollTrigger } from "../lib/gsap";

const arrowTweens = new Map<HTMLElement, gsap.core.Tween>();
const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");

cards.forEach((card) => {
  const info = card.querySelectorAll<HTMLElement>("[data-card-info]");
  const curtains = card.querySelectorAll<HTMLElement>(
    "[data-thumbnail-curtain]",
  );
  const arrow = card.querySelector<HTMLElement>("[data-card-arrow]");

  if (arrow) {
    card.addEventListener("mouseenter", () => {
      arrowTweens.get(arrow)?.kill();
      arrowTweens.set(
        arrow,
        gsap.fromTo(
          arrow,
          { x: 0 },
          {
            x: 15,
            duration: 0.5,
            ease: "power2.out",
            yoyoEase: "power2.out",
            repeat: -1,
            yoyo: true,
          },
        ),
      );
    });

    card.addEventListener("mouseleave", () => {
      arrowTweens.get(arrow)?.kill();
      arrowTweens.delete(arrow);
      gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
    });
  }

  if (!info.length && !curtains.length) return;

  const tl = gsap.timeline({ paused: true });

  if (info.length) {
    tl.to(
      info,
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
      0,
    );
  }

  if (curtains.length) {
    tl.to(
      curtains,
      {
        width: 0,
        duration: 0.6,
        ease: "power3.inOut",
      },
      0,
    );
  }

  ScrollTrigger.create({
    trigger: card,
    start: "top center",
    end: "bottom center",
    animation: tl,
    toggleActions: "play reverse play reverse",
  });
});
