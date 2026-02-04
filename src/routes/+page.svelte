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
    import Balance from "./Balance.svelte";
    import Assets from "./Assets.svelte";
    import LineGraph from "./LineGraph.svelte";
    import { formatUSD, formatPercentage } from "$lib/util";

    let { data } = $props();

    /** @type { boolean } */
    let walletConnected = $state(true);
</script>

<Flex direction="column" gap="l">
    <Flex justify="between" align="baseline">
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
        <Flex>
            <Balance />
            <Assets />
        </Flex>
    
        <!-- Crypto Table -->
        {#if data.coins.length > 0}
            <Table interactive>
                <TableCaption>
                    <Text size="2xl" weight="bold">Crypto Prices</Text>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead align="end">Price</TableHead>
                        <TableHead align="end">24hr</TableHead>
                        <TableHead align="end">Market Cap</TableHead>
                        <TableHead align="end">Price (7d)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {#each data.coins as coin, i}
                        <TableRow>
                            <TableCell>
                                <Flex gap="m" align="center">
                                    {#if coin.image}
                                        <img src={coin.image} alt="Crypto Logo" style="width: 32px; height: 32px;"/>
                                    {/if}
                                    <Flex direction="column" gap="none">
                                        <Text size="l">{coin.name}</Text>
                                        <Text variant="weak">{coin.symbol.toUpperCase()}</Text>
                                    </Flex>
                                </Flex>
                            </TableCell>
                            <TableCell>
                                <Text size="l" align="end" style="font-variant-numeric: tabular-nums lining-nums;">{formatUSD(coin.high_24h)}</Text>
                            </TableCell>
                            <TableCell>
                                <Text 
                                    size="l"
                                    align="end"
                                    style={(coin.price_change_percentage_24h / 100) < 0 ? "color: var(--v-color-danger); font-variant-numeric: tabular-nums lining-nums;" : "color: var(--v-color-success); font-variant-numeric: tabular-nums lining-nums;"}
                                >
                                    {(coin.price_change_percentage_24h / 100) < 0 ? "" : "+"}{formatPercentage(coin.price_change_percentage_24h / 100)}
                                </Text>
                            </TableCell>
                            <TableCell>
                                <Text size="l" align="end" style="font-variant-numeric: tabular-nums lining-nums;">{formatUSD(coin.market_cap, true)}</Text>
                            </TableCell>
                            <TableCell>
                                <Flex justify="end">
                                    <LineGraph id={i.toLocaleString()} data={coin.sparkline_in_7d.price} danger={(coin.price_change_percentage_7d_in_currency / 100) < 0} />
                                </Flex>
                            </TableCell>
                        </TableRow>
                    {/each}
                </TableBody>
            </Table>
        {:else}
            <Table>
                <TableCaption>
                    <Text size="xl" weight="bold">Crypto Prices</Text>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>24hr</TableHead>
                        <TableHead>Market Cap</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell style="height: 46px;"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style="height: 46px;"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style="height: 46px;"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style="height: 46px;"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style="height: 46px;"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        {/if}
    </Flex>
</Flex>