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