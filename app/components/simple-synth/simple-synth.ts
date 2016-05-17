import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, ViewChildren, ViewChild, OnInit, QueryList} from 'angular2/core';
import {Oscillator} from '../oscillator/oscillator';
import {Keyboard} from '../keyboard/keyboard';

@Component({
    selector: 'simple-synth-comp',
    templateUrl: './app/components/simple-synth/simple-synth.html',
    directives: [
        Oscillator,
        Keyboard
    ]
})

export class SimpleSynth implements OnInit {
    @Input()
    ac: AudioContext;

    @ViewChildren(Oscillator)
    oscComponents: QueryList<Oscillator>;

    @ViewChild('osc1') OSC1: Oscillator;
    @ViewChild('osc2') OSC2: Oscillator;

    protected master: GainNode;

    ngOnInit() {
        // create master output vca / gain
        this.master = this.ac.createGain();
        this.master.connect(this.ac.destination);
        this.master.gain.value = 0.5;
    }

    ngAfterViewInit() {

    }

    noteOn(note: any) {
        let volume = 1 / 2;//this.oscComponents.toArray().length;
        this.OSC1.start(note, volume, this.master);
        this.OSC2.start(note, volume, this.master);
        /*for (let osc of this.oscComponents.toArray()) {
          console.log(osc);
          osc.start(note, volume, this.master);
        }*/
    }

    noteOff(freq) {
        this.OSC1.stop(freq, this.master);
        this.OSC2.stop(freq, this.master);
        /*for (let osc of this.oscComponents.toArray()) {
          console.log('simple synth note off stop osc ');
          osc.stop(freq, this.master);
        }*/
    }
}
