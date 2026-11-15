/**
 * Web Audio API synthesizer for Focus Mode Ambient Sounds
 * Generates procedural White Noise, Rain Simulation, Ocean Waves, and 40Hz Gamma Binaural Beats.
 */
class AmbientAudioService {
  private ctx: AudioContext | null = null;
  private currentType: string | null = null;
  private gainNode: GainNode | null = null;
  private activeNodes: AudioNode[] = [];
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentSound(): string | null {
    return this.currentType;
  }

  public stop() {
    for (const node of this.activeNodes) {
      try {
        if ('stop' in node && typeof (node as any).stop === 'function') {
          (node as any).stop();
        }
        node.disconnect();
      } catch {}
    }
    this.activeNodes = [];
    this.currentType = null;
  }

  public play(type: 'rain' | 'whitenoise' | 'ocean' | 'binaural') {
    this.initContext();
    if (!this.ctx) return;

    this.stop();
    this.currentType = type;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (type === 'whitenoise') {
      this.createNoise(0.04);
    } else if (type === 'rain') {
      this.createRain();
    } else if (type === 'ocean') {
      this.createOcean();
    } else if (type === 'binaural') {
      this.createBinaural();
    }
  }

  private createNoise(volumeMultiplier: number = 0.05) {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to soften the harshness into gentle pink noise
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const subGain = this.ctx.createGain();
    subGain.gain.value = volumeMultiplier;

    whiteNoise.connect(filter);
    filter.connect(subGain);
    subGain.connect(this.gainNode);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, filter, subGain);
  }

  private createRain() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.6;

    const rainGain = this.ctx.createGain();
    rainGain.gain.value = 0.08;

    rainSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.gainNode);

    rainSource.start();
    this.activeNodes.push(rainSource, filter, rainGain);
  }

  private createOcean() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    // LFO for wave swelling
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.12; // 12 seconds per wave cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 250;

    lfo.connect(filter.frequency);

    const oceanGain = this.ctx.createGain();
    oceanGain.gain.value = 0.12;

    noise.connect(filter);
    filter.connect(oceanGain);
    oceanGain.connect(this.gainNode);

    noise.start();
    lfo.start();
    this.activeNodes.push(noise, filter, lfo, oceanGain);
  }

  private createBinaural() {
    if (!this.ctx || !this.gainNode) return;
    // 200 Hz Carrier in left ear, 240 Hz in right ear => 40 Hz Gamma Focus Beat
    const oscLeft = this.ctx.createOscillator();
    const oscRight = this.ctx.createOscillator();

    oscLeft.type = 'sine';
    oscRight.type = 'sine';
    oscLeft.frequency.value = 200;
    oscRight.frequency.value = 240;

    const merger = this.ctx.createChannelMerger(2);
    const binGain = this.ctx.createGain();
    binGain.gain.value = 0.06;

    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(binGain);
    binGain.connect(this.gainNode);

    oscLeft.start();
    oscRight.start();
    this.activeNodes.push(oscLeft, oscRight, merger, binGain);
  }

  /**
   * Procedurally synthesizes a crisp Zen meditation bell / chime upon focus session completion
   */
  public playCompletionChime() {
    this.initContext();
    if (!this.ctx) return;

    const fundamental = 528; // 528 Hz "Transformation & DNA Repair / Solfeggio" frequency
    const harmonics = [1, 2.76, 5.4, 8.93];

    harmonics.forEach((harmonic, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * harmonic, this.ctx.currentTime);

      const initialGain = (0.2 / (index + 1)) * this.volume;
      gain.gain.setValueAtTime(initialGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 3.5);
    });
  }
}

export const ambientAudioService = new AmbientAudioService();

