<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    /** @type { string } */
    export let id = "1";

    onMount(() => {
        /** @type { any } */
        const ctx = document.getElementById(`smallLineGraph${id}`);
        const root = window.getComputedStyle(document.body);
        const successColor = root.getPropertyValue('--v-color-success');
        const secondarySuccessColor = root.getPropertyValue("--v-success-2");
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                datasets: [{
                    label: "Balance",
                    data: [65, 12, 80, 81, 56, 55, 99, 99],
                    borderColor: successColor,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: secondarySuccessColor,
                    tension: 0.3
                }]
            },
            options: {
                events: [],
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
                        beginAtZero: true,
                        display: false
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