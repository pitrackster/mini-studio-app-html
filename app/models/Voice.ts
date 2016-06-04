import {OscillatorCtrl} from '../components/oscillator/oscillatorCtrl';

export class Voice{

  public oscillators:Array<any>;
  public controllers:Array<OscillatorCtrl>;

  public vca:GainNode;
  public ctx:AudioContext;
  public ENV:any;
  public frequency:number;

  constructor(context:AudioContext, output:GainNode, ctrls:Array<OscillatorCtrl>)
  {
    this.ctx = context;
    this.controllers = ctrls;

    this.vca = context.createGain();
    this.vca.gain.value = 1/ctrls.length;
    this.oscillators = [];
    // for each ctrl in the DOM create an osc
    for(let ctrl of ctrls){
      let osc = context.createOscillator();
      osc.type = this.getWaveformFromNumber(ctrl.waveform);
      osc.detune.value = Number(ctrl.detune);

      let amp = context.createGain();
      amp.gain.value = Number(ctrl.gain);
      console.log(ctrl);

      osc.connect(amp);
      amp.connect(this.vca);
      this.oscillators.push(
        {
          osc:osc,
          amp:amp,
          ctrl:ctrl
        }
      );
    }
    // Connect VCA to output
    this.vca.connect(output)

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

  start(freq) {
     // Set frequency
     this.frequency = freq;

     for(let voice of this.oscillators){
       console.log(voice);
       voice.osc.frequency.value = freq;
       voice.osc.start(this.ctx.currentTime);
       voice.osc.type = this.getWaveformFromNumber(Number(voice.ctrl.waveform));
       voice.osc.detune.value = Number(voice.ctrl.detune);
       voice.amp.gain.setValueAtTime(0, this.ctx.currentTime);
       // attack
       voice.amp.gain.linearRampToValueAtTime(Number(voice.ctrl.gain)/this.oscillators.length, this.ctx.currentTime + Number(voice.ctrl.attack));
       // decay
       voice.amp.gain.linearRampToValueAtTime(Number(voice.ctrl.sustain)/this.oscillators.length, this.ctx.currentTime + Number(voice.ctrl.attack) + Number(voice.ctrl.decay));
     }
   }

   stop() {
     for(let voice of this.oscillators){
       //voice.amp.cancel
       // release
       voice.amp.gain.linearRampToValueAtTime(0, this.ctx.currentTime + Number(voice.ctrl.release));
       setTimeout(function(){
         // Stop all oscillators
         voice.amp.gain.value = 0.0
         voice.osc.stop(0);
         /* disconnection */
         voice.osc.disconnect(voice.amp);
         voice.amp.disconnect(this.vca);
       }.bind(this), Number(voice.ctrl.release) * 1000)
     }
   }

}
