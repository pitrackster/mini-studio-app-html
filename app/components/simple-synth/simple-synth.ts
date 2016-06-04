import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, ViewChildren, OnInit, QueryList} from 'angular2/core';
import {OscillatorCtrl} from '../oscillator/oscillatorCtrl';
import {Keyboard} from '../keyboard/keyboard';
import {Voice} from '../../models/Voice';

@Component({
    selector: 'simple-synth-comp',
    templateUrl: './app/components/simple-synth/simple-synth.html',
    directives: [
        OscillatorCtrl,
        Keyboard
    ]
})

export class SimpleSynth implements OnInit {

    @Input()
    ac: AudioContext;

    @ViewChildren(OscillatorCtrl)
    oscCtrls: QueryList<OscillatorCtrl>;

    protected voices: Array<Voice>;
    protected master: GainNode;

    ngOnInit() {
        this.voices = new Array<Voice>();
        // create master output vca / gain
        this.master = this.ac.createGain();
        this.master.connect(this.ac.destination);
    }

    noteOn(freq: number) {
        let voice = new Voice(this.ac, this.master, this.oscCtrls.toArray());
        voice.start(freq);
        this.voices[freq]= voice;
    }

    noteOff(freq:number) {

        this.voices[freq].stop();
        delete this.voices[freq];
    }

    /*
    noteOn(freq: number) {
        let voice = new Voice(this.ac, this.master, this.oscCtrls.toArray());
        voice.start(freq);
        this.voices.push(voice);
    }

    noteOff(frequency) {
        let toKeep = new Array<Voice>();

        for (var i = 0; i < this.voices.length; i++) {
            if (Math.round(this.voices[i].frequency) === Math.round(frequency)) {
                this.voices[i].stop();
            } else {
                toKeep.push(this.voices[i]);
            }
        }
        this.voices = toKeep;
    }*/
}
