// Tension of a string
const TENSION = 0.8;

function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

// Check if mouse is close enough to a string
function isCloseEnough(x1, y1, x2, y2, cx, cy, r) {
    const lineLength = distance(x1, y1, x2, y2);
    const point = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(lineLength, 2);
    const px = x1 + point * (x2 - x1);
    const py = y1 + point * (y2 - y1);

    if (distance(px, py, cx, cy) < r) {
        return true;
    } else {
        return false;
    }
}

export class BoundingString {
    constructor(pos, color) {
        const middleX = (pos.x2 - pos.x1) / 2 + pos.x1;
        const middleY = (pos.y2 - pos.y1) / 2 + pos.y1;
        this.points = [{
                x: pos.x1,
                y: pos.y1,
                ox: pos.x1,
                oy: pos.y1,
                vx: 0,
                vy: 0
            },
            {
                x: middleX,
                y: middleY,
                ox: middleX,
                oy: middleY,
                vx: 0,
                vy: 0
            },
            {
                x: pos.x2,
                y: pos.y2,
                ox: pos.x2,
                oy: pos.y2,
                vx: 0,
                vy: 0
            }
        ];

        this.detect = 20;
        this.color = color;
    }

    animate(ctx, moveX, moveY) {
        ctx.beginPath();
        ctx.fillStyle = '#FFFF00';
        ctx.arc(moveX, moveY, 20, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;

        if (isCloseEnough(this.points[0].x, this.points[0].y,
                this.points[2].x, this.points[2].y,
                moveX, moveY, this.detect)) {
            this.detect = 200;
            this.points[1].vx = moveX - this.points[1].x;
            this.points[1].vy = moveY - this.points[1].y;
        } else {
            this.detect = 20;
            let tx = this.points[1].ox;
            let ty = this.points[1].oy;
            this.points[1].vx += tx - this.points[1].x;
            this.points[1].vx *= TENSION;
            this.points[1].vy += ty - this.points[1].y;
            this.points[1].vy *= TENSION;
        }

        this.points[1].x += this.points[1].vx;
        this.points[1].y += this.points[1].vy;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.points.length; i++) {
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.stroke();
    }
}