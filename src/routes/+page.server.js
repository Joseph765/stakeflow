/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    try {
        const cgResponse = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=7d",
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

        if (!cgResponse.ok) {
            throw new Error(`CoinGecko error: ${cgResponse.status}`);
        }

        const coins = await cgResponse.json();

        return {
            coins: coins,
            status: coins.status
        };
  } catch (error) {
        console.error("CMC fetch failed:", error);
        return {
            coins: [],
            logos: {},
            error: "Failed to load crypto data"
        };
    }
}