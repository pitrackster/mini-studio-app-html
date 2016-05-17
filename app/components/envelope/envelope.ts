import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit} from 'angular2/core';

@Component({
    selector: 'env-comp',
    templateUrl: './app/components/envelope/envelope.html',
    directives: [
    ]
})

/*
* Problem with value update ... the values are not numbers
*/
export class Envelope implements OnInit {

    private attack: number; // seconds
    private decay: number; // seconds after decay time sustain gain level will be applied
    private sustain: number; // gain value (0 <= value <= 1)
    private release: number; // seconds

    ngOnInit() {
        this.attack = 0;
        this.decay = 0;
        this.sustain = 1;
        this.release = 0;
    }

    updateAttack($event) {
        this.attack = $event.target.valueAsNumber;
    }

    getAttack(): number {
        return Number(this.attack);
    }

    updateDecay($event) {
        this.decay = $event.target.valueAsNumber;
    }

    getDecay(): number {
        return Number(this.decay);
    }

    updateSustain($event) {
        this.sustain = $event.target.valueAsNumber;
    }

    getSustain(): number {
        return Number(this.sustain);
    }

    updateRelease($event) {
        this.release = $event.target.valueAsNumber;
    }
    getRelease(): number {
        return Number(this.release);
    }

}
