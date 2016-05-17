import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {Key} from './Key';

@Component({
    selector: 'keyboard-comp',
    templateUrl: './app/components/keyboard/keyboard.html',
    styleUrls: ['./app/components/keyboard/keyboard.css'],
    directives: [

    ]
})

export class Keyboard implements OnInit {

    protected keys: Array<Key>;
    protected keysDown: Array<boolean>;

    @Output() noteOn: EventEmitter<any> = new EventEmitter();
    @Output() noteOff: EventEmitter<any> = new EventEmitter();


    /*
    // https://www.w3.org/2002/09/tests/keys.html
    // AZERTY
    'q' : 81 => C
    'z' : 90 => C#
    's' : 83 => D
    'e' : 69 => D#
    'd' : 68 => E
    'f' : 70 => F
    't' : 84 => F#
    'g' : 71 => G
    'y' : 89 => G#
    'h' : 72 => A
    'u' : 85 => A#
    'j' : 74 => B
    */
    constructor() {
        this.keysDown = [];
        this.keys = [
            /*new Note('C1', 32.7032, 'key-white', 81),
            new Note('C#1', 34.6478, 'key-black', 90),
            new Note('D1', 36.7081, 'key-white', 83),
            new Note('D#1', 38.8909, 'key-black', 69),
            new Note('E1', 41.2034, 'key-white', 68),
            new Note('F1', 43.6535, 'key-white', 70),
            new Note('F#1', 46.2493, 'key-black', 84),
            new Note('G1', 48.9994, 'key-white', 71),
            new Note('G#1', 51.9131, 'key-black', 89),
            new Note('A1', 55.0000, 'key-white', 72),
            new Note('A#1', 58.2705, 'key-black', 85),
            new Note('B1', 61.7354, 'key-white', 74)
            {'name':'C1', 'frequency':32.7032, 'class':'key-white'},
            {'name':'C#1', 'frequency':34.6478, 'class':'key-black'},
            {'name':'D1', 'frequency':36.7081, 'class':'key-white'},
            {'name':'D#1', 'frequency':38.8909, 'class':'key-black'},
            {'name':'E1', 'frequency':41.2034, 'class':'key-white'},
            {'name':'F1', 'frequency':43.6535, 'class':'key-white'},
            {'name':'F#1', 'frequency':46.2493, 'class':'key-black'},
            {'name':'G1', 'frequency':48.9994, 'class':'key-white'},
            {'name':'G#1', 'frequency':51.9131, 'class':'key-black'},
            {'name':'A1', 'frequency':55.0000, 'class':'key-white'},
            {'name':'A#1', 'frequency':58.2705, 'class':'key-black'},
            {'name':'B1', 'frequency':61.7354, 'class':'key-white'},*/

            new Key('C4', 32.7032 * 4, 'key-white', 81),
            new Key('C#4', 34.6478 * 4, 'key-black', 90),
            new Key('D4', 36.7081 * 4, 'key-white', 83),
            new Key('D#4', 38.8909 * 4, 'key-black', 69),
            new Key('E4', 41.2034 * 4, 'key-white', 68),
            new Key('F4', 43.6535 * 4, 'key-white', 70),
            new Key('F#4', 46.2493 * 4, 'key-black', 84),
            new Key('G4', 48.9994 * 4, 'key-white', 71),
            new Key('G#4', 51.9131 * 4, 'key-black', 89),
            new Key('A4', 55.0000 * 4, 'key-white', 72),
            new Key('A#4', 58.2705 * 4, 'key-black', 85),
            new Key('B4', 61.7354 * 4, 'key-white', 74)
        ];



    }

    ngOnInit() {
    }

    emitNoteOn(key: Key) {
        console.log('note on');
        console.log(key);
        this.noteOn.next(key);
    }

    emitNoteOff(key: Key) {
        console.log('note off');
        this.noteOff.next(key);
    }

    /**
    * can not handle multiple keys for now
    * http://blog.chrislowis.co.uk/2013/06/10/playing-multiple-notes-web-audio-api.html
    * http://stuartmemo.com/qwerty-hancock/
    **/

    /*


    */
    handleKeyDown($event) {

        if ($event.keyCode in this.keysDown) {
            return;
        }

        if (!$event.repeat) {
            this.keysDown[$event.keyCode] = true;
            let key = this.findNoteFromKeyCode($event.keyCode);
            if (key) this.noteOn.next(key);
        }
    }

    handleKeyUp($event) {
        let key = this.findNoteFromKeyCode($event.keyCode);
        if (key) this.noteOff.next(key);
        delete this.keysDown[$event.keyCode];
    }

    findNoteFromKeyCode(keyCode): Key {
        let key = this.keys.find(e => e.keyCode === keyCode);
        return key;
    }



}
