<script>
    import {
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
    import LineGraph from "./LineGraph.svelte";
    import { formatUSD, formatPercentage } from "$lib/util";

    let { coins = [] } = $props();
</script>

{#if coins.length > 0}
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
            {#each coins as coin, i}
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