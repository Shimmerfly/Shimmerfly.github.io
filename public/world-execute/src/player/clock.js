//#region src/player/clock.js
var AudioClock = class {
	constructor(ac, buffer, offset = 0) {
		this.ac = ac;
		this.buffer = buffer;
		/** Seconds the audio file starts before the film's time axis (its mix is not the analysis master's): the file
		 * plays late by this much, so the sound lands on the subtitles' and the film's times. */
		this.offset = offset;
		this.gain = ac.createGain();
		this.gain.connect(ac.destination);
		this.playing = false;
		this.t = 0;
	}
	_ctxNow() {
		const ts = this.ac.getOutputTimestamp?.();
		return ts && ts.contextTime > 0 ? ts.contextTime : this.ac.currentTime - (this.ac.outputLatency || 0);
	}
	now() {
		return this.playing ? Math.min(this.buffer.duration, this.t0 + (this._ctxNow() - this.c0)) : this.t;
	}
	play(t) {
		if (this.playing) this.pause();
		if (t >= this.buffer.duration) {
			this.t = this.buffer.duration;
			return;
		}
		const src = this.ac.createBufferSource();
		src.buffer = this.buffer;
		src.connect(this.gain);
		const off = Math.max(0, t - this.offset);
		this.c0 = this.ac.currentTime + .05;
		this.t0 = t;
		src.start(this.c0 + Math.max(0, this.offset - t), off);
		this.src = src;
		this.playing = true;
	}
	pause() {
		if (!this.playing) return;
		this.t = this.now();
		this.src.stop();
		this.src.disconnect();
		this.playing = false;
	}
	seek(t) {
		if (this.playing) this.play(t);
		else this.t = t;
	}
	setVolume(v) {
		this.gain.gain.value = v;
	}
};
//#endregion
export { AudioClock };
