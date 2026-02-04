<script>
    import {
        Button,
        Flex,
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
        Text
    } from "$volt";
    import { formatUSD, formatPercentage } from "$lib/util";
    import Balance from "./Balance.svelte";
    import Assets from "./Assets.svelte";
    import LineGraph from "./LineGraph.svelte";
    import CryptoTable from "./CryptoTable.svelte";

    let { data } = $props();

    /** @type { boolean } */
    let walletConnected = $state(true);
</script>

<Flex direction="column" gap="l">
    <Flex justify="between" align="baseline" wrap style="width: calc(100% - var(--v-space-l) * 2);">
        <Text size="3xl" weight="bold">Welcome, Joseph!</Text>
        {#if walletConnected}
            <Button>
                <svg slot="start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-data.coins-icon lucide-data.coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
                Stake
            </Button>
        {:else}
            <Button>
                <svg slot="start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
                Connect Wallet
            </Button>
        {/if}
    </Flex>

    <Flex direction="column" gap="m">
        <!-- Banner if wallet isn't connected -->
        <!-- <Banner>
            Viewing mock data — <Link href="#">connect wallet</Link> for real-time crypto  
        </Banner> -->
        <div class="cards">
            <Balance />
            <Assets />
        </div>
    
        <!-- Crypto Table -->
        <CryptoTable coins={data.coins} />
    </Flex>
</Flex>

<style>
    .cards {
        display: flex;
        gap: var(--v-space-m);
        width: calc(100% - (var(--v-space-l) * 2));
    }

    @media (max-width: 900px) {
        .cards {
            flex-wrap: wrap;
        }
    }
</style>