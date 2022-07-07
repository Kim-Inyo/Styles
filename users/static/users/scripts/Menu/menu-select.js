import { Circle } from "./circle.js";
import { MenuList } from "./menu-list.js";

class Menu {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.circle = new Circle('#FFFFFF');
        this.menu = [
            "RGB",
            "Ninja",
            "Net"
        ]
        this.menuList = new MenuList(15);

        this.moveX = 0;
        this.moveY = 0;
        this.drag = false;
        this.dist = 0;

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

        this.maxRadius = this.stageWidth;
        this.minRadius = this.stageHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.menuList.resize(this.stageWidth, this.stageHeight);
        this.menuList.addMenu(this.menu);

        this.circle.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.circle.draw(this.ctx);
        this.menuList.draw(this.ctx, this.dist);
    }

    onDown(e) {
        this.moveX = e.clientX;
        this.moveY = e.clientY;
        if (this.moveY > this.stageHeight / 2) this.drag = true;
    }

    onMove(e) {
        if (this.drag) {
            this.dist = e.clientX - this.moveX;
        }
    }

    onUp(e) {
        this.moveX = 0;
        this.moveY = 0;
        this.dist = 0;
        this.drag = false;
    }
}

window.onload = () => {
    new Menu();
}