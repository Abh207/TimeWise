import confetti from 'canvas-confetti';

export function triggerConfetti() {
  confetti({
    particleCount: 75,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#8b5cf6', '#a78bfa', '#84cc16', '#06b6d4']
  });
}

