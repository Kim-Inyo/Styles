export class Menu {
    constructor(img, name, stageWidth, initX) {
        this.stageWidth = stageWidth;

        this.img = img;
        this.name = name;

        this.imgWidth = 300;
        this.imgHeight = 480;

        this.menuWidth = 200;
        this.menuHeight = 240;

        this.menuWidthHalf = this.menuWidth / 2;
        this.x = initX + this.menuWidth;
        this.y = 0;
        this.speed = 2;

        this.fps = 24;
        this.fpsTime = 1000 / this.fps;
    }

    draw(ctx, t, dots) {
        this.animate(ctx, dots);
    }

    animate(ctx, dots) {
        this.x -= this.speed;
        if (this.x < -this.menuWidth) this.x = this.stageWidth + this.menuWidth;
        const closest = this.getY(this.x, dots);
        this.y = closest.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(closest.rotation);
        ctx.drawImage(
            this.img,
            0,
            0,
            this.imgWidth,
            this.imgHeight, -this.menuWidthHalf, -this.menuHeight,
            this.menuWidth,
            this.menuHeight
        );

        ctx.restore();
    }

    getY(x, dots) {
        for (let i = 0; i < dots.length; i++) {
            if (x >= dots[i].x1 && x <= dots[i].x3) {
                return this.getY2(x, dots[i]);
            }
        }
        return {
            y: 0,
            rotation: 0
        }
    }

    getY2(x, dot) {
        const total = 200;
        let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
        let prevX = pt.x;
        for (let i = 1; i < total; i++) {
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);
            if (x >= prevX && x <= pt.x) return pt;
            prevX = pt.x;
        }
        return pt;
    }

    getQuadValue(p0, p1, p2, t) {
        return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
        const tx = this.getQuadTangent(x1, x2, x3, t);
        const ty = this.getQuadTangent(y1, y2, y3, t);
        const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180);
        return {
            x: this.getQuadValue(x1, x2, x3, t),
            y: this.getQuadValue(y1, y2, y3, t),
            rotation: rotation
        };
    }

    getQuadTangent(a, b, c, t) {
        return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
    }
}