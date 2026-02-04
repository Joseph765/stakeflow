import { CMC_API_KEY } from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    try {
        // 1. Get top coins
        const coinsResponse = await fetch(
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD",
            {
                headers: {
                    "X-CMC_PRO_API_KEY": CMC_API_KEY,
                    Accept: "application/json"  // better than Content-Type for GET
                }
            }
        );

        if (!coinsResponse.ok) {
            throw new Error(`Listings failed: ${coinsResponse.status}`);
        }

        const coinsData = await coinsResponse.json();
        const coinIds = coinsData.data.map(/** @param { any } coin */ coin => coin.id).join(",");

        // 2. Get logos for those IDs
        const logoResponse = await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${coinIds}&aux=logo`,
            {
                headers: {
                    "X-CMC_PRO_API_KEY": CMC_API_KEY,
                    Accept: "application/json"
                }
            }
        );

        if (!logoResponse.ok) {
            throw new Error(`Info/logos failed: ${logoResponse.status}`);
        }

        const logoData = await logoResponse.json();

        return {
            coins: coinsData.data,
            logos: logoData.data,
            status: coinsData.status
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