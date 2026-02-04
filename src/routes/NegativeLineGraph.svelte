<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    /** @type { string } */
    export let id = "1";

    onMount(() => {
        /** @type { any } */
        const ctx = document.getElementById(`negativeSmallLineGraph${id}`);
        const root = window.getComputedStyle(document.body);
        const dangerColor = root.getPropertyValue('--v-color-danger');
        const secondaryDangerColor = root.getPropertyValue("--v-danger-2");
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                datasets: [{
                    label: "Balance",
                    data: [65, 79, 80, 55, 56, 65, 12, 12],
                    borderColor: dangerColor,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: secondaryDangerColor,
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
    <canvas id="negativeSmallLineGraph{id}"></canvas>
</div>

<style>
    .chart-container {
        width: 7rem;
        margin: 0;
    }
</style>