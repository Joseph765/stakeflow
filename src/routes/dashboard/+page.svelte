<script>
    import {
        Banner,
        Button,
        Flex,
        Link,
        Text
    } from "$volt";
    import BalanceMock from "./BalanceMock.svelte";
    import AssetsMock from "./AssetsMock.svelte";
    import CryptoTable from "./CryptoTable.svelte";
    import CryptoTableMock from "./CryptoTableMock.svelte";

    let { data } = $props();

    /** @type { boolean } */
    let walletConnected = $state(false);
</script>

<Flex direction="column" gap="l">
    {#if data.coins && walletConnected}
        <Flex justify="between" align="baseline" wrap style="width: calc(100% - var(--v-space-l) * 2);">
            <Text size="3xl" weight="bold">Welcome, Joseph!</Text>
            <Button>
                <svg slot="start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-data.coins-icon lucide-data.coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
                Stake
            </Button>
        </Flex>

        <Flex direction="column" gap="m">
            <div class="cards">
                <BalanceMock />
                <AssetsMock />
            </div>
        
            <!-- Crypto Table -->
            <CryptoTable coins={data.coins} />
        </Flex>
    {:else}
        <Text size="3xl" weight="bold">Welcome, Joseph!</Text>
        <Banner>
            Viewing mock data — <Link href="#">connect wallet</Link> for real crypto and wallet data.
        </Banner>

        <Flex direction="column" gap="m">
            <div class="cards">
                <BalanceMock />
                <AssetsMock />
            </div>
        
            <!-- Crypto Table -->
            <CryptoTableMock />
        </Flex>
    {/if}
</Flex>

<style>
    .cards {
        display: grid;
        gap: var(--v-space-m);
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 900px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>