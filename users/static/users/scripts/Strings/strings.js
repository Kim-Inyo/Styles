import { BoundingString } from './bounding-string.js';

class Strings {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.strings = [];
        this.moveX = -100;
        this.moveY = -100;

        this.totalVerticalStrings = 20;

        this.play = false;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.xGap = this.stageWidth / (this.totalVerticalStrings + 1);
        this.yGap = this.xGap;
        this.totalHorizontalStrings = this.stageHeight / this.yGap - 1;

        for (let i = 1; i <= this.totalVerticalStrings; i++) {
            this.strings.push(new BoundingString({
                x1: this.xGap * i,
                y1: 10,
                x2: this.xGap * i,
                y2: this.stageHeight - 10
            }, '#FF0000'));
        }
        for (let i = 1; i <= this.totalHorizontalStrings; i++) {
            this.strings.push(new BoundingString({
                x1: 10,
                y1: this.yGap * i,
                x2: this.stageWidth - 10,
                y2: this.yGap * i
            }, '#FF0000'));
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.strings.length; i++) {
            this.strings[i].animate(this.ctx, this.moveX, this.moveY);
        }
    }

    onDown(e) {
        this.play = true;
        this.moveX = e.clientX;
        this.moveY = e.clientY;
    }

    onMove(e) {
        if (this.play) {
            this.moveX = e.clientX;
            this.moveY = e.clientY;
        }
    }

    onUp(e) {
        this.play = false;
        this.moveX = -100;
        this.moveY = -100;
    }
}

window.onload = () => {
    new Strings();
}