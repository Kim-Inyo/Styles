import { Menu } from './menu.js'

export class MenuList {
    constructor() {
        this.items = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    addMenu(menu) {
        for (let i = 0; i < menu.length; i++) {
            const img = new Image();
            const initX = this.stageWidth - (this.stageWidth / (menu.length)) * i;
            img.src = '../../static/users/images/' + menu[i] + '.png';
            this.items.push(new Menu(img, menu[i], this.stageWidth, initX));
        }
    }

    draw(ctx, t, dots) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.x < -item.width) this.items.splice(i, 1);
            else item.draw(ctx, t, dots);
        }
    }
}