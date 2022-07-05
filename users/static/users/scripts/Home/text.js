export class Text {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        this.text = str;
        this.fontWidth = 100;
        this.fontSize = 200;
        this.fontName = 'Courgette';

        this.ctx.font = `${this.fontWidth} ${this.fontSize}px ${this.fontName}`;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.textBaseline = 'middle';
        this.fontPos = this.ctx.measureText(this.text);
        console.log(this.ctx);
        this.ctx.fillText(
            this.text,
            (stageWidth - this.fontPos.width) / 2,
            this.fontPos.actualBoundingBoxDescent + (stageHeight - this.fontSize) / 2
        );

        document.addEventListener('pointerdown', this.toNext.bind(this), false);

        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        const imageData = this.ctx.getImageData(
            0, 0,
            stageWidth, stageHeight
        ).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight; height += density) {
            ++i;
            const slide = (i % 2) == 0;
            width = 0;
            if (slide == 1) width += 6;
            for (width; width < stageWidth; width += density) {
                pixel = imageData[(width + height * stageWidth) * 4 - 1];
                if (pixel != 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight) {
                    particles.push({
                        x: width,
                        y: height
                    });
                }
            }
        }
        return particles;
    }

    toNext(e) {
        if (e.clientX >= (this.canvas.width - this.fontPos.width) / 2 &&
            e.clientX <= (this.canvas.width + this.fontPos.width) / 2 &&
            e.clientY >= (this.canvas.height - this.fontSize) / 2 &&
            e.clientY <= (this.canvas.height + this.fontSize) / 2) {
            document.location.href += 'menu';
        }
    }
}