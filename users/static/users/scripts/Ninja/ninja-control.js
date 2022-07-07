import { NinjaRun } from './running-ninja.js';

export class NinjaControl {
    constructor() {
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = '../../static/users/images/Run.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addNinja();
    }

    addNinja() {
        this.items.push(new NinjaRun(this.img, this.stageWidth));
    }

    draw(ctx, t, dots) {
        if (this.isLoaded) {
            this.cur += 1;
            if (this.cur > 100) {
                this.cur = 0;
                this.addNinja();
            }

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                if (item.x < -item.width) {
                    this.items.splice(i, 1);
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }
}