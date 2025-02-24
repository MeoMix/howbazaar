<script lang="ts">
    // Base Icon component that will be extended by all specific icon components
    const {
        size = "default",
        class: className = "",
        children = () => {}
    }: {
        size?: "small" | "default" | "large";
        class?: string;
        children?: any;
    } = $props();

    // Determine icon size based on the size prop
    const iconSize = $derived(() => {
        switch (size) {
            case "small":
                return "w-3 h-3";
            case "large":
                return "w-5 h-5";
            default:
                return "w-4 h-4";
        }
    });

    // Combine classes
    const combinedClass = $derived(`${iconSize} ${className}`);
</script>

{@render children({class: combinedClass})}
