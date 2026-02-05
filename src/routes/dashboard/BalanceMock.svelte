<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { formatUSD } from "$lib/util";
    import { Badge, Flex, Text } from "$volt";

    onMount(() => {
        /** @type { any } */
        const ctx = document.getElementById('myChart');
        const root = window.getComputedStyle(document.body);
        const accentColor = root.getPropertyValue('--v-color-accent');
        const secondaryAccentColor = root.getPropertyValue("--v-accent-2");
        const gray5 = root.getPropertyValue("--v-gray-5");
        const gray8 = root.getPropertyValue("--v-gray-8");
        const font = root.getPropertyValue("--v-font");

        const data = {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [{
                label: "Balance",
                data: [1267.31, 1256.08, 1208.01, 1244.39, 1299.90, 1264.55, 1284.41, 1294.12],
                borderColor: accentColor,
                pointHoverRadius: 3,
                pointStyle: "circle",
                fill: true,
                backgroundColor: secondaryAccentColor,
                tension: 0.3,
            }]
        };

        const totalDuration = 1000;
        const delayBetweenPoints = totalDuration / 7;
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

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                responsive: true,
                /** @type { any } */ 
                // animation: animation,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: !isTouchDevice,
                        backgroundColor: gray5,
                        padding: 16,
                        titleFont: {
                            family: font,
                            weight: "normal",
                            size: 16
                        },
                        bodyFont: {
                            family: font,
                            weight: "normal",
                            size: 16
                        },
                        borderWidth: 1,
                        borderColor: gray8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                const index = context.parsed.x;
                                let usd = "$0";
                                if (typeof index === "number") {
                                    const amount = context.dataset.data[index];
                                    if (typeof amount === "number") {
                                        usd = formatUSD(parseInt(amount.toString()));
                                    }
                                }
                                return usd;
                            }
                        },
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        min: Math.min(...data.datasets[0].data) - 10,
                        max: Math.max(...data.datasets[0].data) + 10,
                        beginAtZero: true,
                    }
                },
            },
        });
    });
</script>

<div class="card">
    <Flex direction="column" gap="s">
        <div class="card-header">
            <Flex direction="column" gap="xs">
                <Text variant="weak" size="l">Total Balance</Text>
                <Flex align="center">
                    <Text size="3xl" weight="black">$1,294.12</Text>
                    <Badge variant="neutral">
                        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>
                        20%
                    </Badge>
                </Flex>
            </Flex>
        </div>
        <div class="chart-container">
            <canvas id="myChart" width="100%"></canvas>
        </div>
    </Flex>
</div>

<style>
    .card {
        position: relative;
        width: 100%;
        background-color: var(--v-color-surface);
        border-radius: var(--v-radius);
        min-height: 16rem;
        overflow: hidden;
    }

    .card-header {
        padding: var(--v-space-m);
    }

    .chart-container {
        position: absolute;
        bottom: -5px;
        left: -5px;
        height: 10rem;
        width: calc(100% + 10px);
    }
</style>