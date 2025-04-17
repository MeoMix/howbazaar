import type { ClientSideItemCard, ClientSideSkillCard } from "$lib/types";

// Create a store object that holds our state
export const tooltipState = $state({
    x: 0,
    y: 0,
    hoveredItem: undefined as ClientSideItemCard | undefined,
    hoveredSkill: undefined as ClientSideSkillCard | undefined
});

// Tooltip action
export function tooltip(
    node: HTMLElement,
    {
        item,
        skill,
    }: { item?: ClientSideItemCard; skill?: ClientSideSkillCard }
) {
    function handlePointerMove(event: PointerEvent) {
        tooltipState.x = event.clientX;
        tooltipState.y = event.clientY;
        tooltipState.hoveredItem = item;
        tooltipState.hoveredSkill = skill;
    }

    function handlePointerLeave() {
        tooltipState.hoveredItem = undefined;
        tooltipState.hoveredSkill = undefined;
    }

    function handleScroll() {
        tooltipState.hoveredItem = undefined;
        tooltipState.hoveredSkill = undefined;
    }

    node.addEventListener("pointerenter", handlePointerMove);
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", handlePointerLeave);
    node.addEventListener("pointercancel", handlePointerLeave);
    // Add scroll event listener to window
    window.addEventListener("scroll", handleScroll, true);

    return {
        destroy() {
            node.removeEventListener("pointerenter", handlePointerMove);
            node.removeEventListener("pointermove", handlePointerMove);
            node.removeEventListener("pointerleave", handlePointerLeave);
            node.removeEventListener("pointercancel", handlePointerLeave);
            // Remove scroll event listener
            window.removeEventListener("scroll", handleScroll, true);
        },
        update(newParams: {
            item?: ClientSideItemCard;
            skill?: ClientSideSkillCard;
        }) {
            item = newParams.item;
            skill = newParams.skill;
        },
    };
} 