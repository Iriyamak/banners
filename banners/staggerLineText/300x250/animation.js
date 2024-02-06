const banner = document.getElementById('wrapper');
let tl = gsap.timeline({
  default: {
    duration: 1,
    transformOrigin: 'center',
  },
});
tl.to(banner, {
  opacity: 1,
  duration: 0.5,
})
  .to(banner, {
    visibility: 'visible',
    ease: 'power1.out',
  })
  .from('.bg', {
    scale: 1.8,
    x: -104,
    y: 10,
    duration: 3,
  })
  .from(
    '.bg-middle',
    {
      scale: 2,
      x: 74,
      y: 27,
      duration: 3,
    },
    '-=3'
  )
  .from(
    '.bg-front',
    {
      scale: 2,
      x: -30,
      y: 40,
      duration: 3,
    },
    '-=3'
  )

  .from(
    '.present-left',
    {
      x: -120,
      rotate: -30,
    },
    '-=1'
  )
  .from(
    '.present-right',
    {
      x: 70,
      rotate: 30,
    },
    '-=1'
  )

  .from(
    '.text-1',
    {
      opacity: 0,
      y: 15,
    },
    '-=3'
  )
  .from(
    '.btn',
    {
      opacity: 0,
      scale: 0.2,
    },
    '>0.5'
  )
  .to(
    '.btn',
    {
      scale: 1.06,
      yoyo: true,
      repeat: 1,
    },
    '>0.5'
  )
  .to(
    '.text-1',
    {
      opacity: 0,
      y: 15,
    },
    '>1'
  )
  .from(
    '.train',
    {
      x: -300,
      duration: 8,
    },
    '-=4'
  )
  .from(
    '.text-2',
    {
      opacity: 0,
      y: 15,
    },
    '-=3'
  )
  .to(
    '.btn',
    {
      scale: 1.06,
      yoyo: true,
      repeat: 1,
    },
    '>0.5'
  )
  .to(
    '.frame-1',
    {
      opacity: 0,
      duration: 0.5,
    },
    '>2.5'
  )
  .to(
    '.frame-2',
    {
      opacity: 1,
      duration: 0.5,
    },
    '-=0.5'
  )
  .from('.logo-blue', {
    opacity: 0,
  })
  .from(
    '.text-4',
    {
      opacity: 0,
      y: 15,
    },
    '-=0.5'
  )
  .from('.legal-line', {
    opacity: 0,
    y: 15,
  })
  .from('.btn-2', {
    opacity: 0,
    scale: 0.2,
  })
  .to(
    '.btn-2',
    {
      scale: 1.06,
      yoyo: true,
      repeat: 1,
    },
    '=+1'
  );
console.log(tl.totalDuration());
