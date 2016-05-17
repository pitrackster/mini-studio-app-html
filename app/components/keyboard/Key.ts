


export class Key{

  public frequency:number;
  public name:string;
  public cssClass:string;
  public keyCode:number; // keyboard keycode

  constructor(name:string, frequency:number, cssClass:string, keyCode:number){
    this.name = name;
    this.frequency = frequency;
    this.cssClass = cssClass;
    this.keyCode = keyCode;
  }

  getFrequency():number{
    return this.frequency;
  }
}
