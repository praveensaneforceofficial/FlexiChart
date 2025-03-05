class FlexiChart {
    constructor(canvasId, options) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error("Canvas element not found");
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.options = options || {};
        this.data = this.options.data || [];
        this.color = this.options.color || "blue";
        this.draw();
    }

    draw() {
        const { ctx, canvas, data, color } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Axes
        ctx.beginPath();
        ctx.moveTo(40, 10);
        ctx.lineTo(40, canvas.height - 40);
        ctx.lineTo(canvas.width - 10, canvas.height - 40);
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // Draw Data Line
        ctx.beginPath();
        data.forEach((point, index) => {
            let x = 50 + index * 50;
            let y = canvas.height - 40 - point;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Expose globally for use in HTML
window.FlexiChart = FlexiChart;
