export class Moon {
    constructor() {
        this.radius = 130;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = this.stageWidth - this.radius * 3;
        this.y = this.radius / 2 * 3;
    }

    draw(ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(this.x - 30, this.y - 30, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}