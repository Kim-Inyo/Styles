export class Star {
    constructor() {
        this.radius = Math.random() * 5;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = Math.random() * this.stageWidth;
        this.y = Math.random() * (this.stageHeight / 3) * 2;
    }

    draw(ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}