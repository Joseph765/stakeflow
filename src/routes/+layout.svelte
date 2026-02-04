<script>
	import "$volt/css/index.css";
	import "../app.css";
    import { HistoryIcon, LayersIcon, PieIcon, SettingsIcon } from "$lib/components";

	let { children } = $props();

    let animate = $state("")

    /** @param { string } iconName */
    function handleMouseEnter(iconName) {
		if (animate === iconName) return;
		animate = iconName;
		setTimeout(() => {
			animate = "";
		}, 300);
	}
</script>

<div class="layout">
    <div class="header">
        <button class="mobile-menu-button" onclick={() => console.log("open menu")} aria-label="open mobile menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        </button>
        <a class="mobile-logo" href="/">SF</a>
        <div></div>
    </div>
    <div class="left-nav-wrapper">
        <div class="left-nav">
            <div class="logo">StakeFlow</div>
            <nav>
                <a href="/" class="nav-item is-active" onmouseenter={() => animate = "pie"} onmouseleave={() => animate = ""}>
                    <PieIcon animate={animate === "pie"} />
                    Dashboard
                </a>
                <a href="/" class="nav-item" onmouseenter={() => handleMouseEnter("layers")} onmouseleave={() => animate = ""}>
                    <LayersIcon animate={animate === "layers"} />
                    Assets
                </a>
                <a href="/" class="nav-item" onmouseenter={() => animate = "history"} onmouseleave={() => animate = ""}>
                    <HistoryIcon animate={animate === "history"} />
                    Transactions
                </a>
                <a href="/" class="nav-item" onmouseenter={() => animate = "settings"} onmouseleave={() => animate = ""}>
                    <SettingsIcon animate={animate === "settings"} />
                    Settings
                </a>
            </nav>
        </div>
    </div>
    <div class="content">
        {@render children()}
    </div>
</div>
    

<style>
    .layout {
        --v-container-width: 76rem;
        display: flex;
        height: 100vh;
        overflow-x: hidden;
    }

    .header {
        position: relative;
        display: none;
        z-index: 9999;
    }

    .left-nav-wrapper {
        position: fixed;
        left: 0;
        display: flex;
        justify-content: end;
        width: calc(((100vw - var(--v-container-width)) / 2) - var(--v-space-2xl));
        min-width: 18rem;
    }
    
    .left-nav {
        min-width: 16rem;
        height: calc(100vh - 5rem);
        margin-block-start: var(--v-space-xl);
        margin-inline-start: var(--v-space-xl);
        border-radius: var(--v-radius);
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: var(--v-space-m);
    }

    .logo {
        font-family: var(--v-font);
        font-weight: var(--v-font-weight-black);
        font-size: var(--v-font-size-3xl);
        line-height: 1;
        letter-spacing: var(--v-letter-spacing-3xl);
        padding: 0 var(--v-space-m) var(--v-space-m) var(--v-space-m);
        margin-block-end: var(--v-space-l);
    }

    .mobile-menu-button {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        color: var(--v-color-text);
    }

    .mobile-logo {
        position: absolute;
        left: 50%;
        transform: translateX(-80%);
        width: fit-content;
        font-family: var(--v-font);
        font-weight: var(--v-font-weight-black);
        font-size: var(--v-font-size-3xl);
        line-height: 1;
        letter-spacing: var(--v-letter-spacing-3xl);
        background-color: var(--v-accent-4);
        padding: var(--v-space-s);
        border-radius: var(--v-radius);
        color: var(--v-color-text);
        text-decoration: none;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: var(--v-space-s);
        padding: var(--v-space-m);
        border-radius: var(--v-radius);
        margin-inline: var(--v-space-m);
        font-family: var(--v-font);
        font-size: var(--v-font-size-l);
        line-height: 1;
        letter-spacing: var(--v-letter-spacing-l);
        text-decoration: none;
        color: var(--v-color-text);
    }

    .nav-item.is-active {
        background-color: var(--v-accent-3);
        background: linear-gradient(90deg, var(--v-accent-2) 0%, var(--v-accent-5) 50%, var(--v-accent-6) 100%);
    }

    .content {
        max-width: var(--v-container-width);
        width: 100%;
        padding: 2.1rem var(--v-space-2xl) var(--v-space-2xl) var(--v-space-2xl);
        margin-inline: auto;
    }

    @media (pointer: fine) {
        .nav-item:hover {
            background-color: var(--v-gray-4);
            cursor: pointer
        }

        .nav-item.is-active:hover {
            background: linear-gradient(90deg, var(--v-accent-6) 0%, var(--v-accent-9) 50%, var(--v-accent-10) 100%);
            background-size: 400% 100%;
            animation: gradient-animation 3s ease infinite;
        }
    }

    @media (max-width: 1872px) {
        .content {
            margin-inline-start: 16rem;
        }
    }

    @media (max-width: 1205px) {
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            width: 100%;
            height: 4rem;
            background-color: var(--v-color-surface);
            border-bottom: 1px solid var(--v-color-border);
            padding-inline: var(--v-space-m);
        }

        .left-nav-wrapper {
            display: none;
        }

        .content {
            max-width: 100%;
            margin: 0;
            padding: 5rem var(--v-space-l);
        }
    }
    
    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
