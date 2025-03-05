/*    <script src="FlexiChart.js"></script> */

class FlexiChart {
    constructor(elementId, options) {
        this.canvas = document.getElementById(elementId);
        this.ctx = this.canvas.getContext("2d");
        this.options = options;
        this.draw3DBarChart();
    }

    draw3DBarChart() {
        const ctx = this.ctx;
        const { 
            data, labels, colors, 
            barWidth, gap, depth, shading, 
            backgroundColor, gridLines, 
            gridColor, gridThickness, gridOpacity, dashedGrid,
            showVerticalGrid, showHorizontalGrid,
            labelColor, labelSize, showLabels, showValues, opacity 
        } = this.options;

        // Set background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let startX = 50;
        const baseY = 250;
        const maxY = 250; // Max height for grid

        // Draw grid lines if enabled
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = gridThickness;
        ctx.globalAlpha = gridOpacity;
        
        if (dashedGrid) {
            ctx.setLineDash([5, 5]); // Set dashed line
        } else {
            ctx.setLineDash([]); // Solid line
        }

        ctx.beginPath();
        
        // Draw horizontal grid lines
        if (showHorizontalGrid) {
            for (let y = 50; y <= maxY; y += 50) {
                ctx.moveTo(20, y);
                ctx.lineTo(this.canvas.width - 20, y);
            }
        }

        // Draw vertical grid lines
        if (showVerticalGrid) {
            let xPos = startX;
            for (let i = 0; i < data.length; i++) {
                ctx.moveTo(xPos, 20);
                ctx.lineTo(xPos, baseY);
                xPos += barWidth + gap;
            }
        }

        ctx.stroke();
        ctx.globalAlpha = 1.0; // Reset opacity

        let barX = startX;

        // Draw bars
        for (let i = 0; i < data.length; i++) {
            let height = data[i] * 2;
            ctx.globalAlpha = opacity; // Set transparency level
            ctx.fillStyle = colors[i % colors.length];

            // Draw front face
            ctx.fillRect(barX, baseY - height, barWidth, height);

            // Draw top face (3D depth effect)
            ctx.fillStyle = this.shadeColor(colors[i % colors.length], shading);
            ctx.beginPath();
            ctx.moveTo(barX, baseY - height);
            ctx.lineTo(barX + depth, baseY - height - depth);
            ctx.lineTo(barX + barWidth + depth, baseY - height - depth);
            ctx.lineTo(barX + barWidth, baseY - height);
            ctx.closePath();
            ctx.fill();

            // Draw side face
            ctx.fillStyle = this.shadeColor(colors[i % colors.length], -shading);
            ctx.beginPath();
            ctx.moveTo(barX + barWidth, baseY);
            ctx.lineTo(barX + barWidth + depth, baseY - depth);
            ctx.lineTo(barX + barWidth + depth, baseY - height - depth);
            ctx.lineTo(barX + barWidth, baseY - height);
            ctx.closePath();
            ctx.fill();

            // Draw labels if enabled
            if (showLabels) {
                ctx.fillStyle = labelColor;
                ctx.font = `${labelSize}px Arial`;
                ctx.fillText(labels[i], barX + 10, baseY + 20);
            }

            // Show values above bars if enabled
            if (showValues) {
                ctx.fillStyle = labelColor;
                ctx.fillText(data[i], barX + 10, baseY - height - 10);
            }

            barX += barWidth + gap;
        }

        ctx.globalAlpha = 1.0; // Reset transparency
    }

    // Utility function to adjust color brightness for shading effect
    shadeColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt((R * (100 + percent)) / 100);
        G = parseInt((G * (100 + percent)) / 100);
        B = parseInt((B * (100 + percent)) / 100);

        R = R < 255 ? R : 255;
        G = G < 255 ? G : 255;
        B = B < 255 ? B : 255;

        return `rgb(${R},${G},${B})`;
    }
}
