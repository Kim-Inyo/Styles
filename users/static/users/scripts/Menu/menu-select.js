import { Hill } from './hill.js';
import { MenuList } from './menu-list.js';
import { Star } from './star.js';

class MenuSelect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.hill = [
            new Hill('#9F9F7D', 0.2, 12),
            new Hill('#D6D6A4', 0.5, 8),
            new Hill('#F1945A', 1.4, 6)
        ];

        this.menuList = new MenuList();

        this.stars = [];
        for (let i = 0; i < 40; i++) {
            this.stars.push(new Star());
        }

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.menuList.addMenu([
            'rgb',
            'strings'
        ]);

        document.addEventListener("pointerdown", this.toNext.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        for (let i = 0; i < this.hill.length; i++) {
            this.hill[i].resize(this.stageWidth, this.stageHeight);
        }

        this.menuList.resize(this.stageWidth, this.stageHeight);

        for (let i = 0; i < 40; i++) {
            this.stars[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots;

        for (let i = 0; i < 40; i++) {
            this.stars[i].draw(this.ctx);
        }

        for (let i = 0; i < this.hill.length; i++) {
            dots = this.hill[i].draw(this.ctx);
        }

        this.menuList.draw(this.ctx, t, dots);
    }

    toNext(e) {
        for (let i = 0; i < 2; i++) {
            const item = this.menuList.items[i];
            if (e.clientX >= item.x - item.menuWidthHalf &&
                e.clientX <= item.x + item.menuWidthHalf &&
                e.clientY >= item.y - item.menuHeight &&
                e.clientY <= item.y) {
                document.location.href += item.name;
            }
        }
    }
};

window.onload = () => {
    const menuSelect = new MenuSelect();
};