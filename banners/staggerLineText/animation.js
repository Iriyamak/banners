const banner = document.getElementById("wrapper");
let tl = gsap.timeline({
  default: {
    duration: 1,
    transformOrigin: "center",
  },
});
tl.to(banner, {
  opacity: 1,
  duration: 0.5,
})
  .to(banner, {
    visibility: "visible",
    ease: "power1.out",
  })
  .from(".text", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
  })
  .from(".btn", {
    duration: 2,
    ease: "bounce.out",
    scale: 0,
  })
  .from(".person", {
    scale: 0.2,
    rotate: 130,
    stagger: {
      each: 0.2,
      from: "random",
    },
    opacity: 0,
  }, "<");

console.log(tl.totalDuration());
