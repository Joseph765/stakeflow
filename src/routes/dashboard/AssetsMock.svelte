<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { Card, Flex, Text } from '$volt';
    import { formatPercentage } from '$lib/util';

    onMount(() => {
        /** @type { any } */
        const ctx = document.getElementById('assetsChart');
        const root = window.getComputedStyle(document.body);
        const colorAccent = root.getPropertyValue('--v-color-accent');
        const accent5 = root.getPropertyValue("--v-accent-5");
        const accent6 = root.getPropertyValue("--v-accent-6");
        const accent7 = root.getPropertyValue("--v-accent-7");
        const accent8 = root.getPropertyValue("--v-accent-8");
        const accent9 = root.getPropertyValue("--v-accent-9");
        const accent10 = root.getPropertyValue("--v-accent-10");
        const accent11 = root.getPropertyValue("--v-accent-11");
        const accent12 = root.getPropertyValue("--v-accent-12");
        const gray5 = root.getPropertyValue("--v-gray-5");
        const gray8 = root.getPropertyValue("--v-gray-8");
        const font = root.getPropertyValue("--v-font");

        const data = {
            labels: ["Tether", "Ethereum", "Bitcoin", "XRP"],
            datasets: [{
                label: "Balance",
                data: [12, 25, 43, 20],
                borderColor: colorAccent,
                backgroundColor: [accent5, accent7, accent9, accent11],
                hoverBackgroundColor: [accent6, accent8, accent10, accent12],
                borderWidth: 0,
                borderRadius: 16,
            }]
        };

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                animation: {
                    duration: 500,
                    easing: 'linear',
                    animateRotate: true,
                    animateScale: false
                },
                maintainAspectRatio: true,
                aspectRatio: 2,
                cutout: '75%',
                circumference: 180,
                rotation: -90,
                plugins: {
                    legend: { display: false },
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
                                const val = context.parsed;
                                let percentage = "0%";
                                if (typeof val === "number") {
                                    percentage = formatPercentage(val / 100);
                                }
                                return percentage;
                            }
                        },
                    }
                }
            }
        });
    });
</script>

<div class="assets-card">
    <Flex direction="column" gap="l" justify="between" style="height: 100%;">
        <Text variant="default" size="2xl" weight="bold">Assets</Text>
        <Flex justify="between" align="center">
            <div class="key-chart-pair">
                <div class="keys">
                    <div class="key-wrapper">
                        <div class="key-color" style="background-color: var(--v-accent-5)"></div>
                        <Text size="l">Tether - 12%</Text>
                    </div>
                    <div class="key-wrapper">
                        <div class="key-color" style="background-color: var(--v-accent-7)"></div>
                        <Text size="l">Ethereum - 25%</Text>
                    </div>
                    <div class="key-wrapper">
                        <div class="key-color" style="background-color: var(--v-accent-9)"></div>
                        <Text size="l">Bitcoin - 43%</Text>
                    </div>
                    <div class="key-wrapper">
                        <div class="key-color" style="background-color: var(--v-accent-11)"></div>
                        <Text size="l">XRP - 20%</Text>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <canvas id="assetsChart"></canvas>
                </div>
            </div>
        </Flex>
    </Flex>
</div>

<style>
    .assets-card {
        container: assets-card / inline-size;
        background-color: var(--v-color-surface);
        padding: var(--v-space-m);
        border-radius: var(--v-radius);
        min-height: 16rem;
    }

    .chart-wrapper {
        height: 10rem;
    }

    .key-chart-pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: var(--v-space-m);
    }

    .keys {
        display: flex;
        flex-direction: column;
        gap: var(--v-space-m);
    }

    .key-color {
        width: 16px;
        height: 16px;
        border-radius: 100%;
    }

    .key-wrapper {
        display: flex;
        align-items: center;
        gap: var(--v-space-s);
    }

    @container assets-card (max-width: 486px) {
        .key-chart-pair {
            display: grid;
            grid-template-columns: 1fr;
        }

        .keys {
            flex-direction: row;
            flex-wrap: wrap;
            gap: var(--v-space-s) var(--v-space-m);
        }
    }
</style> 