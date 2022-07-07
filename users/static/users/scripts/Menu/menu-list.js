import { Menu } from "./menu.js";

export class MenuList {
    constructor(menuCount) {
        this.items = [];
        this.itemCount = menuCount;
        this.menuCount = 0;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    addMenu(menu) {
        this.menuCount += menu.length;
        for (let i = 0; i < this.itemCount; i++)
            this.items.push(new Menu(menu[i % menu.length], this.stageWidth, this.stageHeight,
                Math.PI / 18 * 12 / (this.itemCount), i));
    }

    draw(ctx, dist) {
        var index = -1;
        for (let i = 0; i < this.items.length; i++) {
            const temp = this.items[i].draw(ctx, dist, 0);
            if (temp >= 0) index = temp;
        }
        //this.items[0].draw(ctx, dist, 0);
        if (index >= 0) this.items[index].draw(ctx, dist, 40);
    }
}