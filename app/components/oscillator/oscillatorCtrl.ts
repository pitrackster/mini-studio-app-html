import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit, ViewChild} from 'angular2/core';

@Component({
  selector: 'osc-ctrl-comp',
  templateUrl: './app/components/oscillator/oscillator-ctrl.html',
  directives: [

  ]
})

export class OscillatorCtrl {
  // OSC
  public gain:number;
  public waveform:number;
  public detune:number;
  // ENV
  public attack:number; // seconds
  public decay:number; // seconds after decay time sustain gain level will be applied
  public sustain:number; // gain value (0 <= value <= 1)
  public release:number;

  @Input() id: string;

  constructor(){
    this.waveform = 2;
    this.gain = 1; // @TODO should be 1/nb osc-comp
    this.detune = 0;
    this.attack = 0;
    this.decay = 0;
    this.sustain = 1;
    this.release = 0;
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
    // WTF ??
    this.waveform = Number($event.target.valueAsNumber);
  }

  updateVolume($event) {
    this.gain =  Number($event.target.valueAsNumber);
  }

  updateTune($event){
    this.detune =  Number($event.target.valueAsNumber);
  }

  updateAttack($event){
    this.attack =  Number($event.target.valueAsNumber);
  }

  updateDecay($event){
    this.decay =  Number($event.target.valueAsNumber);
  }

  updateSustain($event){
    this.sustain =  Number($event.target.valueAsNumber);
  }
  updateRelease($event){
    this.release =  Number($event.target.valueAsNumber);
  }
}
