<script>
	import "$volt/css/index.css";
	import "../app.css";

	let { children } = $props();
</script>

<div class="layout">
    <div class="header">
        <button class="mobile-menu-button" onclick={() => console.log("open menu")} aria-label="open mobile menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        </button>
        <div class="mobile-logo">SF</div>
        <div></div>
    </div>
    <div class="left-nav-wrapper">
        <div class="left-nav">
            <div class="logo">StakeFlow</div>
            <nav>
                <a href="/" class="nav-item is-active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/></svg>
                    Dashboard
                </a>
                <a href="/" class="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
                    Assets
                </a>
                <a href="/" class="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>
                    Transactions
                </a>
                <a href="/" class="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
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
    }

    .header {
        display: none;
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
    }

    .mobile-logo {
        font-family: var(--v-font);
        font-weight: var(--v-font-weight-black);
        font-size: var(--v-font-size-3xl);
        line-height: 1;
        letter-spacing: var(--v-letter-spacing-3xl);
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
        padding: 2.5rem var(--v-space-2xl) var(--v-space-2xl) var(--v-space-2xl);
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
