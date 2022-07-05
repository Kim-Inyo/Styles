export class Star {
    constructor() {
        this.radius = Math.random() * 5;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = Math.random() * this.stageWidth;
        this.y = Math.random() * (this.stageHeight / 3) * 2;

        this.vx = (Math.random() + 0.1) * this.radius / 6;
    }

    draw(ctx) {
        this.x += this.vx;
        if (this.x > this.stageWidth) this.x = -(2 * this.radius);

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}