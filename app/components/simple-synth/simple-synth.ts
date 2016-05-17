import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, ViewChildren, OnInit, QueryList} from 'angular2/core';
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

  protected master:GainNode;

  ngOnInit() {
    // create master output vca / gain
    this.master = this.ac.createGain();
    this.master.connect(this.ac.destination);
    this.master.gain.value = 1;
  }

  ngAfterViewInit() {}

  noteOn(note: any) {
    console.log('simple synth play note called ' + note);

    let volume = 1 / this.oscComponents.toArray().length;
    for (let osc of this.oscComponents.toArray()) {
      osc.start(note, volume, this.master);
    }
  }

  noteOff(freq){
    console.log('simple synth note off called ');
    for (let osc of this.oscComponents.toArray()) {
      console.log('simple synth note off stop osc ');
      osc.stop(freq, this.master);
    }
  }




}
