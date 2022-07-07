import { Hill } from './hill.js';
import { NinjaControl } from './ninja-control.js';
import { Star } from './star.js';
import { Moon } from './moon.js';

class Ninja {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.hill = [
            new Hill('#9F9F7D', 0.2, 12),
            new Hill('#D6D6A4', 0.5, 8),
            new Hill('#F1945A', 1.4, 6)
        ];

        this.ninjaControl = new NinjaControl();

        this.stars = [];
        for (let i = 0; i < 40; i++) {
            this.stars.push(new Star());
        }

        this.moon = new Moon();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        console.log(this.stageWidth, this.stageHeight);

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        for (let i = 0; i < this.hill.length; i++) {
            this.hill[i].resize(this.stageWidth, this.stageHeight);
        }

        this.ninjaControl.resize(this.stageWidth, this.stageHeight);

        for (let i = 0; i < 40; i++) {
            this.stars[i].resize(this.stageWidth, this.stageHeight);
        }

        this.moon.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots;

        for (let i = 0; i < 40; i++) {
            this.stars[i].draw(this.ctx);
        }

        this.moon.draw(this.ctx);

        for (let i = 0; i < this.hill.length; i++) {
            dots = this.hill[i].draw(this.ctx);
        }

        this.ninjaControl.draw(this.ctx, t, dots);
    }
};

window.onload = () => {
    new Ninja();
};