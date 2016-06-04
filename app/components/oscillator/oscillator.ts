import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit, ViewChild} from 'angular2/core';
import {Envelope} from '../envelope/envelope';

@Component({
    selector: 'osc-comp',
    templateUrl: './app/components/oscillator/oscillator.html',
    //styleUrls: ['./css/app.min.css'],
    directives: [
        Envelope
    ]
})

export class Oscillator implements OnInit {

    protected waveform: number; // osc waveform
    protected detune: number;
    // Multitimbral Synth => remember which notes are played by this component in order to stop the right ones when asked!
    protected voices: Array<any>;

    @Input() ac: AudioContext;
    @Input() id: string;
    @ViewChild(Envelope) ENV: Envelope;

    ngOnInit() {
        this.waveform = 2;
        this.detune = 0;
        this.voices = new Array<any>();
    }

    getWaveformFromNumber(value) {
        switch (value) {
            case 1:
                //console.log('must return a sine');
                return "sine";
            case 2:
                //console.log('must return a square');
                return "square";
            case 3:
                //console.log('must return a sawtooth');
                return "sawtooth";
            case 4:
                //console.log('must return a triangle');
                return "triangle";
        }
    }

    updateWaveform($event) {
        this.waveform = $event.target.valueAsNumber;
    }

    updateTune($event) {
        this.detune = $event.target.valueAsNumber;
    }

    start(freq, volume, output: GainNode) {
        // create a new oscillator
        let osc = this.ac.createOscillator();
        let amp = this.ac.createGain();
        amp.connect(output);
        osc.frequency.value = freq;
        osc.type = this.getWaveformFromNumber(Number(this.waveform));
        osc.detune.value = Number(this.detune);
        osc.start();

        // !!! PBM with number... range input strange behaviour
        console.log('osc ' + this.id + ' ENV');
        console.log(this.ENV);
        // Silence oscillator gain
        amp.gain.setValueAtTime(0, this.ac.currentTime);
        // ATTACK
        amp.gain.linearRampToValueAtTime(volume, this.ac.currentTime + this.ENV.getAttack());
        // SUSTAIN
        amp.gain.linearRampToValueAtTime(volume * this.ENV.getSustain(), this.ac.currentTime + this.ENV.getAttack() + this.ENV.getDecay());
        // connect
        osc.connect(amp);
        let voice = { osc: osc, amp: amp };
        this.voices[freq] = voice;
    }

    stop(freq, output: GainNode) {
        let voice = this.voices[freq];
        if (voice) {
            let amp = voice.amp;
            let osc = voice.osc;
            // Clear previous envelope values
            amp.gain.cancelScheduledValues(this.ac.currentTime);
            // RELEASE
            amp.gain.linearRampToValueAtTime(0, this.ac.currentTime + Number(this.ENV.getRelease()));
            // Terminate after release
            window.setTimeout(function() {
                // Stop oscillator
                amp.gain.value = 0.0;
                osc.stop(0);
                osc.disconnect(amp);
                osc = null;
                amp.disconnect(output);
                delete this.voices[freq];
                amp = null;
            }.bind(this), this.ENV.getRelease() * 1000);
        }
    }
}
