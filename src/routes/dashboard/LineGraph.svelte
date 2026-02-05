<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    /** @type { string } */
    export let id = "1";

    export let data;

    /** @type { boolean } */
    export let danger = false;

    onMount(() => {
        /** @type { any } */
        const ctx = document.getElementById(`smallLineGraph${id}`);
        const root = window.getComputedStyle(document.body);
        const successColor = root.getPropertyValue('--v-color-success');
        const success2 = root.getPropertyValue("--v-success-2");
        const dangerColor = root.getPropertyValue('--v-color-danger');
        const danger2 = root.getPropertyValue("--v-danger-2");

        const totalDuration = 1000;
        const delayBetweenPoints = totalDuration / data.length;
        const previousY = (/** @type { any } */ ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(/** @type { any } */ ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(/** @type { any } */ ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            }
        };
    
        new Chart(ctx, {
            type: "line",
            data: {
                labels: data.map(() => ""),
                datasets: [{
                    label: "Balance",
                    data: data,
                    borderColor: danger ? dangerColor : successColor,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: danger ? danger2 : success2,
                    tension: 0.3,
                    borderWidth: 1.5,
                }]
            },
            options: {
                events: [],
                /** @type { any } */
                animation: animation,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                      display: false  
                    },
                    y: {
                        // beginAtZero: true,
                        display: false,
                        min: Math.min(...data) - 10,
                        max: Math.max(...data) + 10,
                    }
                },
            },
        });
    });
</script>

<div class="chart-container">
    <canvas id="smallLineGraph{id}"></canvas>
</div>

<style>
    .chart-container {
        width: 7rem;
        margin: 0;
    }
</style>