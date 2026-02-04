/**
 * Formats a number as USD currency.
 * @param { number } value - The number to format
 * @param { boolean } abbreviate - Whether to use K/M/B/T abbreviations
 * @returns { string } Formatted USD string
 */
export function formatUSD(value, abbreviate = false) {
    if (typeof value !== 'number' || isNaN(value)) {
        return '$0.00';
    }

    if (!abbreviate) {
        // Original full format behavior
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(value);
    }

    // Abbreviated format (K, M, B, T)
    const absValue = Math.abs(value);
    let formatted = '';
    let suffix = '';

    if (absValue >= 1_000_000_000_000) {
        // Trillions
        formatted = (absValue / 1_000_000_000_000).toFixed(2);
        suffix = 'T';
    } else if (absValue >= 1_000_000_000) {
        // Billions
        formatted = (absValue / 1_000_000_000).toFixed(2);
        suffix = 'B';
    } else if (absValue >= 1_000_000) {
        // Millions
        formatted = (absValue / 1_000_000).toFixed(2);
        suffix = 'M';
    } else if (absValue >= 1_000) {
        // Thousands (optional – you can remove this block if you don't want K)
        formatted = (absValue / 1_000).toFixed(2);
        suffix = 'K';
    } else {
        // Small numbers – fall back to normal 2-decimal format
        formatted = absValue.toFixed(2);
        suffix = '';
    }

    // Remove trailing .00 if present
    formatted = formatted.replace(/\.00$/, '');

    const sign = value < 0 ? '-' : '';
    return `${sign}$${formatted}${suffix}`;
}

/** @param { number } value */
export function formatPercentage(value, locale = "en-US") {
    const formatter = new Intl.NumberFormat(locale, {
        style: "percent",
        // Default to 0 decimal places if not specified
        maximumFractionDigits: 2
    });
    return formatter.format(value);
}