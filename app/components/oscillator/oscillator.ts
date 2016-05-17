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
  protected detune:number;
  // Multitimbral Synth => remember which notes are played by this component in order to stop the right ones when asked!
  protected voices:Array<any>;

  @Input() ac: AudioContext;
  @Input() id: string;
  @ViewChild(Envelope) ENV:Envelope;

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
    console.log('update waveform ' + this.id);
    this.waveform = +this.waveform;//$event.target.valueAsNumber;
    console.log(this.waveform);
  }

  updateTune($event){
    console.log('update tune');
    this.detune = +this.detune; //$event.target.valueAsNumber;
  }

  start(freq, volume, output:GainNode) {
    console.log('start pressed ' + this.id);
    // create a new oscillator
    let osc = this.ac.createOscillator();
    let vca = this.ac.createGain();
    vca.connect(output);
    osc.frequency.value = freq;
    osc.type = this.getWaveformFromNumber(Number(this.waveform));
    osc.detune.value = Number(this.detune);
    osc.start();
    console.log('osc ' + this.id + ' ENV');
    console.log(this.ENV);
    // Silence oscillator gain
    vca.gain.setValueAtTime(0, this.ac.currentTime);
    // ATTACK
    vca.gain.linearRampToValueAtTime(volume, this.ac.currentTime + Number(this.ENV.attack));
    // SUSTAIN
    vca.gain.linearRampToValueAtTime(volume * Number(this.ENV.sustain), this.ac.currentTime + Number(this.ENV.attack) + Number(this.ENV.decay));
    // connect
    osc.connect(vca);

    let voice = {osc:osc, vca:vca};
    this.voices[freq] = voice;
  }

  stop(freq, output:GainNode) {

    console.log('stop');
    let voice = this.voices[freq];
    if(voice){
      let vca = voice.vca;
      let osc = voice.osc;
      // Clear previous envelope values
      // vca.gain.cancelScheduledValues(this.ac.currentTime);
      // set osc gain to sustain value
      //let gain = vca.gain.value;
      //vca.gain.setValueAtTime(gain * this.ENV.sustain, this.ac.currentTime);
      // RELEASE
      vca.gain.linearRampToValueAtTime(0, this.ac.currentTime + Number(this.ENV.release));
      // Terminate after release
      window.setTimeout(function() {
        // Stop oscillator
        vca.gain.value = 0.0;
        osc.stop(0);
        osc.disconnect(vca);
        osc = null;
        vca.disconnect(output);
        console.log('stop... for real');
        delete this.voices[freq];
        vca = null;
      }.bind(this), this.ENV.release * 1000);
    }

  }
}
