const COLORS = [
    '#A06FD1',
    '#886FD1',
    '#6F87D1',
    '#6FD1C4',
    '#6FD1AD',
    '#6FD199',
    '#CED16F',
    '#D1CC6F',
    '#D1C16F'
];

export class Menu {
    constructor(menu, stageWidth, stageHeight, rotation, index) {
        this.menu = menu;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.rotation = rotation;
        this.index = index;
        this.curRotation = this.rotation * this.index;
        this.addRotation = 0;
        this.isClicked = false;

        this.x = this.stageWidth / 2;
        this.y = this.stageHeight / 5 * 9;
        this.radius = this.stageWidth / 5 * 3;

        this.menuWidth = this.stageWidth / 10;
        this.menuHeight = this.stageHeight / 4;

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
    }

    draw(ctx, dist, addWidth) {
        if (dist != 0) this.addRotation = this.rotation / 450 * dist;
        if (dist == 0) {
            this.curRotation += this.addRotation;
            const remains = Math.abs(this.addRotation) % this.rotation;
            if (remains < this.rotation / 2) {
                if (this.addRotation > 0) this.curRotation -= remains;
                else this.curRotation += remains;
            } else {
                if (this.addRotation > 0) this.curRotation += this.rotation - remains;
                else this.curRotation -= this.rotation - remains;
            }
            this.addRotation = 0;
            if (this.curRotation > Math.PI / 3) this.curRotation -= Math.PI / 3 * 2;
            if (this.curRotation < -Math.PI / 3) this.curRotation += Math.PI / 3 * 2;
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#000000";
        const rotation = this.curRotation + this.addRotation;
        var index = 0;
        if (rotation > -this.rotation / 2 && rotation < this.rotation / 2) index = this.index;
        else index = -1;
        /*if (rotation > 1.05) rotation -= Math.PI / 3 * 2;
        if (rotation < -1.05) rotation += Math.PI / 3 * 2;*/
        ctx.rotate(rotation);
        ctx.fillStyle = COLORS[this.index % 9];
        ctx.fillRect(-(this.menuWidth + addWidth) / 2, -(this.menuHeight + addWidth + this.radius) + 50,
            this.menuWidth + addWidth, this.menuHeight + addWidth);

        const text = this.menu;
        const fontSize = 35 + addWidth / 5;
        const fontName = 'Roboto';

        ctx.font = `bold ${fontSize}px ${fontName}`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'middle';
        const fontPos = ctx.measureText(text);
        ctx.fillText(
            text, -fontPos.width / 2, -(this.menuHeight + addWidth + this.radius) + 75 + fontSize
        );
        ctx.fillText(
            this.index + 1, -this.menuWidth / 2 + 20, -this.radius
        );
        console.log(ctx);
        ctx.restore();
        if (dist == 0) {
            if (this.curRotation > -this.rotation / 2 && this.curRotation < this.rotation / 2) return this.index;
            else return -1;
        }
        return index;
    }

    onDown(e) {
        document.body.style.cursor = "default";
        if (e.clientX >= this.x - this.menuWidth / 2 &&
            e.clientX <= this.x + this.menuWidth / 2 &&
            e.clientY >= this.y - this.menuHeight - this.radius - 50 &&
            e.clientY <= this.y - this.radius - 50 &&
            this.curRotation > -this.rotation / 2 &&
            this.curRotation < this.rotation / 2) {
            this.isClicked = true;
        }
    }

    onMove(e) {
        if (e.clientX >= this.x - this.menuWidth / 2 &&
            e.clientX <= this.x + this.menuWidth / 2 &&
            e.clientY >= this.y - this.menuHeight - this.radius &&
            e.clientY <= this.y - this.radius + 50 &&
            this.curRotation > -this.rotation / 2 &&
            this.curRotation < this.rotation / 2) {
            document.body.style.cursor = "pointer";
        }
    }

    onUp(e) {
        if (e.clientX >= this.x - this.menuWidth / 2 &&
            e.clientX <= this.x + this.menuWidth / 2 &&
            e.clientY >= this.y - this.menuHeight - this.radius - 50 &&
            e.clientY <= this.y - this.radius - 50 &&
            this.curRotation > -this.rotation / 2 &&
            this.curRotation < this.rotation / 2 &&
            this.isClicked) {
            document.location.href += this.menu;
        } else {
            document.body.style.cursor = "default";
        }
    }
}