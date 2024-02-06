const banner = document.getElementById("wrapper");

const timeline = gsap.timeline({   
  default: {
  duration: 1,
  transformOrigin: 'center',
}});
timeline
  .to(banner, {
    visibility: "visible",
    ease: "power1.out",
  })
  .from(banner, {
    opacity: 0,
    ease: "power1.out",
  })
  .to(".ellipse", {
    rotate: 2,
    duration: 2,
    yoyo: true,
    repeat: 3,
  })
  .from(".img-person", {
    scale: 0.2,
    opacity:0
  }, "-=6")
  .to(".line", {
    opacity: 1,
    y: -20,
  }, "-=7")
  .to(".text-spooky", {
    duration: 0.5,
    ease: "rough({ template: power0.none, strength: 10, points: 50, taper: 'none', randomize: true, clamp:  true})",
    opacity: 1,
    scale: 0.9,
    rotation: -5,
    repeat: 2,
    yoyo: true,
  }, "-=5");

// .from(
//   '.ctaContainer',
//   {
//     width: 0,
//     scale: 1,
//     ease: 'power1.out',
//   },
//   '+=0.5'
// )

// .fromTo(
//   '.ctaContainer',
//   {
//     scale: 1.15,
//     ease: 'power3.out',
//     duration: 2,
//   },
//   {
//     duration: 2,
//     scale: 1,
//     ease: 'elastic.out(1, 0.3)',
//   },
//   '+=1.5'
// );
