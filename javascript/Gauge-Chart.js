function createGauge(containerId, value, maxValue) {
    const container = document.getElementById(containerId);
    container.className = 'gauge-container';

    // Create SVG elements
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.setAttribute('class', 'gauge-svg');
    svg.setAttribute('viewBox', '0 0 100 100');

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    // Background Arc
    const backgroundArc = document.createElementNS(svgNamespace, 'circle');
    backgroundArc.setAttribute('class', 'gauge-arc gauge-background');
    backgroundArc.setAttribute('cx', '50');
    backgroundArc.setAttribute('cy', '50');
    backgroundArc.setAttribute('r', radius);
    backgroundArc.setAttribute('stroke-dasharray', circumference);
    backgroundArc.setAttribute('stroke-dashoffset', 0);

    // Foreground Arc
    const foregroundArc = document.createElementNS(svgNamespace, 'circle');
    foregroundArc.setAttribute('class', 'gauge-arc gauge-foreground');
    foregroundArc.setAttribute('cx', '50');
    foregroundArc.setAttribute('cy', '50');
    foregroundArc.setAttribute('r', radius);
    foregroundArc.setAttribute('stroke-dasharray', circumference);

    // Append arcs to SVG
    svg.appendChild(backgroundArc);
    svg.appendChild(foregroundArc);

    // Create label
    const label = document.createElement('div');
    label.className = 'gauge-label';
    container.appendChild(svg);
    container.appendChild(label);

    // Animate the gauge
    let currentValue = 0;
    function animateGauge() {
        const offset = circumference - (currentValue / maxValue) * circumference;
        foregroundArc.setAttribute('stroke-dashoffset', offset);
        label.innerText = `${currentValue}`;
        if (currentValue < value) {
            currentValue++;
            requestAnimationFrame(animateGauge);
        }
    }

    animateGauge();
}

// Example usage
createGauge('gaugeSmoke', 100, 999);
createGauge('gaugeTemperature', 21, 120);
createGauge('gaugeHumidity', 20, 100);