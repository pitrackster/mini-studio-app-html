import {bootstrap}    from 'angular2/platform/browser';
import {Component, ViewChild, View} from 'angular2/core';

import {SimpleSynth} from './components/simple-synth/simple-synth';
import {Keyboard} from './components/keyboard/keyboard';

@Component({
  selector: 'main-app',
  templateUrl: './app/main.html',
  directives: [
    SimpleSynth,
    Keyboard,
  ]
})

class Main {

  @ViewChild(SimpleSynth) synth:SimpleSynth;

  protected ac: AudioContext;


  constructor() {

    console.log('main constructor');
    this.ac = new AudioContext();
    // https://en.wikipedia.org/wiki/Piano_key_frequencies


    /*
    G7 	3135.96
    82 	f♯′′′′/g♭′′′′ 	F♯7/G♭7 	2959.96
    81 	f′′′′ 	F7 	2793.83
    80 	e′′′′ 	E7 	2637.02
    79 	d♯′′′′/e♭′′′′ 	D♯7/E♭7 	2489.02
    78 	d′′′′ 	D7 	2349.32
    77 	c♯′′′′/d♭′′′′ 	C♯7/D♭7 	2217.46
    76 	c′′′′ 4-line octave 	C7 Double high C 	2093.00
    75 	b′′′ 	B6 	1975.53
    74 	a♯′′′/b♭′′′ 	A♯6/B♭6 	1864.66
    73 	a′′′ 	A6 	1760.00
    72 	g♯′′′/a♭′′′ 	G♯6/A♭6 	1661.22
    71 	g′′′ 	G6 	1567.98
    70 	f♯′′′/g♭′′′ 	F♯6/G♭6 	1479.98
    69 	f′′′ 	F6 	1396.91
    68 	e′′′ 	E6 	1318.51
    67 	d♯′′′/e♭′′′ 	D♯6/E♭6 	1244.51
    66 	d′′′ 	D6 	1174.66
    65 	c♯′′′/d♭′′′ 	C♯6/D♭6 	1108.73
    64 	c′′′ 3-line octave 	C6 Soprano C (High C) 	1046.50
    63 	b′′ 	B5 	987.767
    62 	a♯′′/b♭′′ 	A♯5/B♭5 	932.328
    61 	a′′ 	A5 	880.000
    60 	g♯′′/a♭′′ 	G♯5/A♭5 	830.609
    59 	g′′ 	G5 	783.991
    58 	f♯′′/g♭′′ 	F♯5/G♭5 	739.989
    57 	f′′ 	F5 	698.456
    56 	e′′ 	E5 	659.255 	E
    55 	d♯′′/e♭′′ 	D♯5/E♭5 	622.254
    54 	d′′ 	D5 	587.330
    53 	c♯′′/d♭′′ 	C♯5/D♭5 	554.365
    52 	c′′ 2-line octave 	C5 Tenor C 	523.251
    51 	b′ 	B4 	493.883
    50 	a♯′/b♭′ 	A♯4/B♭4 	466.164
    49 	a′ 	A4 A440 	440.000 	A 	A 			High A (Optional)
    48 	g♯′/a♭′ 	G♯4/A♭4 	415.305
    47 	g′ 	G4 	391.995
    46 	f♯′/g♭′ 	F♯4/G♭4 	369.994
    45 	f′ 	F4 	349.228
    44 	e′ 	E4 	329.628 					High E
    43 	d♯′/e♭′ 	D♯4/E♭4 	311.127
    42 	d′ 	D4 	293.665 	D 	D
    41 	c♯′/d♭′ 	C♯4/D♭4 	277.183
    40 	c′ 1-line octave 	C4 Middle C 	261.626
    39 	b 	B3 	246.942 					B
    38 	a♯/b♭ 	A♯3/B♭3 	233.082
    37 	a 	A3 	220.000 			A
    36 	g♯/a♭ 	G♯3/A♭3 	207.652
    35 	g 	G3 	195.998 	G 	G 			G
    34 	f♯/g♭ 	F♯3/G♭3 	184.997
    33 	f 	F3 	174.614 				F (7 string)
    32 	e 	E3 	164.814
    31 	d♯/e♭ 	D♯3/E♭3 	155.563
    30 	d 	D3 	146.832 			D 		D
    29 	c♯/d♭ 	C♯3/D♭3 	138.591
    28 	c small octave 	C3 	130.813 	C (5 string) 	C 		C (6 string)
    27 	B 	B2 	123.471
    26 	A♯/B♭ 	A♯2/B♭2 	116.541
    25 	A 	A2 	110.000 					A
    24 	G♯/A♭ 	G♯2/A♭2 	103.826
    23 	G 	G2 	97.9989 			G 	G
    22 	F♯/G♭ 	F♯2/G♭2 	92.4986
    21 	F 	F2 	87.3071 	F (6 string)
    20 	E 	E2 	82.4069 					Low E
    19 	D♯/E♭ 	D♯2/E♭2 	77.7817
    18 	D 	D2 	73.4162 				D
    17 	C♯/D♭ 	C♯2/D♭2 	69.2957
    16 	C great octave 	C2 Deep C 	65.4064 			C
    15 	B͵ 	B1 	61.7354 					B (7 string)
    14 	A♯͵/B♭͵ 	A♯1/B♭1 	58.2705 	B♭ (7 string)
    13 	A͵ 	A1 	55.0000 				A
    12 	G♯͵/A♭͵ 	G♯1/A♭1 	51.9131
    11 	G͵ 	G1 	48.9994
    10 	F♯͵/G♭͵ 	F♯1/G♭1 	46.2493

    */
  }


  ngAfterViewInit() {
    // viewChild is set
    // this.synth.playNote(880);

  }

  handleNoteOn($event){
    console.log('main noteon');
    console.log($event);
    this.synth.noteOn($event.frequency);
  }

  handleNoteOff($event){
    console.log('main noteoff');
    console.log($event);
    this.synth.noteOff($event.frequency);
  }





}

bootstrap(Main, []);
