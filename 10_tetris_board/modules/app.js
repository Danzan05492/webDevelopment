import { KeyControls } from './keyControls.js'
import { Layer } from './layer.js'
import { Loop } from './loop.js'

class App {
  constructor(container) {
    this.layer = new Layer(container);
    this.keyboard = new KeyControls([`KeyA`, `KeyS`, `KeyD`, `KeyW`]);
    this.keys = this.keyboard.keys;

    this.rect = {
      x: 0,
      y: 0,
      w: 20,
      h: 20,
      vx: 20,
      vy: 20,
      
      isAir: true,
      color: `orange`,
      gravity: 90,
      isCrouch: false
    }

    new Loop(this.update.bind(this), this.display.bind(this));
  }
  update() {
    

    if (this.keys.KeyD) { this.rect.x += this.rect.vx }
    if (this.keys.KeyA) { this.rect.x -= this.rect.vx }
    if (this.keys.KeyS) { this.rect.y += this.rect.vy }
    if (this.keys.KeyW) { this.rect.y -= this.rect.vy }
    /*
    //падение
    if (this.rect.isAir) {
      this.rect.vy += this.rect.gravity * correction
    } else {
      this.rect.vy = 0
    }
    this.rect.y += this.rect.vy
    */
     //ограничение на нижниюю грань
    if (this.rect.y + this.rect.h >= this.layer.h) {
      this.rect.y = this.layer.h - this.rect.h;
      //this.rect.isAir = false
    }
    if (this.rect.x + this.rect.w >= this.layer.w) {
      this.rect.x = this.layer.w - this.rect.w;
    }
    if (this.rect.x + this.rect.w <= this.rect.w) {
      this.rect.x = this.layer.w - this.layer.w;
    }
    
  }
  display() {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h); 
    this.layer.context.fillStyle = this.rect.color;
    this.layer.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h); 
    for (var x = 0.5; x < 200; x += 20) {
      this.layer.context.moveTo(x, 0);
      this.layer.context.lineTo(x, 400);
    }
    
    for (var y = 0.5; y < 400; y += 20) {
      this.layer.context.moveTo(0, y);
      this.layer.context.lineTo(400, y);
    }
    
    this.layer.context.strokeStyle = "black";
    this.layer.context.stroke();
    let sprite ={
      x:0,
      y:0,
      width:20,
      heigth:20
    }
  }
}

onload = () => { new App(document.body) }