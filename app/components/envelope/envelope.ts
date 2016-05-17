import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit} from 'angular2/core';

@Component({
  selector: 'env-comp',
  templateUrl: './app/components/envelope/envelope.html',
  directives: [
  ]
})

export class Envelope implements OnInit {

  public attack:number; // seconds
  public decay:number; // seconds after decay time sustain gain level will be applied
  public sustain:number; // gain value (0 <= value <= 1)
  public release:number; // seconds

  ngOnInit() {
    this.attack = 0;
    this.decay = 0;
    this.sustain = 1;
    this.release = 0;
  }

  updateAttack($event){
    this.attack = $event.target.valueAsNumber;
  }

  updateDecay($event){
    this.decay = $event.target.valueAsNumber;
  }

  updateSustain($event){
    this.sustain = $event.target.valueAsNumber;
  }
  updateRelease($event){
    this.release = $event.target.valueAsNumber;
  }

}
