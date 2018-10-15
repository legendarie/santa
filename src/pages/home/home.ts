import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
// import * as HitTest from '/Users/legendarie/santaClaus/src/pages/home/hittest.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('canvas') canvasEl : ElementRef;
  private _CANVAS : any;
  private _CONTEXT : any;
  private _CANVAS2 : any;
  private _CONTEXT2 : any;
  private height = 500;
  private width = 500;

  private x;
  private y;
  private dx = 0;
  private dy = -1;

  private Santa;
  private Candy;
  // private objectCandy;
  constructor(public navCtrl: NavController) {

}

  ionViewDidLoad()
  {
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = this.width;
    this._CANVAS.height = this.height;


    this.initializeCanvas();




  }

  initializeCanvas()
  {
    if(this._CANVAS.getContext)
    {
      this.setupCanvas();

    }
  }

  setupCanvas()
  {
    this._CONTEXT = this._CANVAS.getContext('2d');

  }



  clearCanvas()
  {
    this._CONTEXT.clearRect(0,0,this._CANVAS.width,this._CANVAS.height);
    this.setupCanvas();
  }



  drawSanta()


  {
    this.Santa = new Image();
    this.Santa.onload = ()=>{
      this._CONTEXT.drawImage(this.Santa, (this.width/2)-this.Santa.width/2, 0, this.Santa.width,this.Santa.height);
    }
    this.Santa.src = 'assets/imgs/Picture1.png';
  }

  drawCandy(x,y)
  {

    this.Candy = new Image();
    this.Candy.onload = ()=>{
      this.x = this.width/2-this.Candy.width/2;
      this.y = this.height-this.Candy.height;
      this._CONTEXT.drawImage(this.Candy, this.x, this.y, this.Candy.width,this.Candy.height);
    }
    this.Candy.src = 'assets/imgs/candy.png';

    // this.objectCandy = new HitTest(this.Candy);


  }

  moveCandy()
  {

    this.clearCanvas();

    this.x += this.dx;
    this.y += this.dy;
    this.Candy = new Image();
    this.Candy.onload = ()=>{

      this._CONTEXT.drawImage(this.Candy, this.x, this.y, this.Candy.width, this.Candy.height);

      this.collisionDetection();


    }
    this.Candy.src = 'assets/imgs/candy.png';
    this.drawSanta();





    requestAnimationFrame(this.moveCandy.bind(this));



  }

  collisionDetection()
  {


    if(this.x + this.dx + this.Candy.width > this.width || this.x + this.dx < 0) {
    this.dx = -this.dx;
    }
    if(this.y + this.dy > this.height - this.Candy.height || this.y + this.dy < 0) {
    this.dy = -this.dy;
    }

    if(this.y <= this.Santa.y+this.Santa.height && this.x<=this.Santa.x+this.Santa.width ){
    // (this.x<=this.Santa.x+this.Santa.width && this.y<this.Santa.y+this.Santa.height && this.y+this.Candy.height>this.Santa.y)){
      this.dx = 0;
      this.dy = 0;
    }

  }


  reallyMoveCandy()
  {
    // setInterval(this.moveCandy.bind(this),1000);
    this.moveCandy();
  }

}
