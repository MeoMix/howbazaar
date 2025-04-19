import type { ClientSideItemCard, ClientSideSkillCard } from "$lib/types";

// Create a store object that holds our state
export const tooltipState = $state({
    x: 0,
    y: 0,
    hoveredItem: undefined as ClientSideItemCard | undefined,
    hoveredSkill: undefined as ClientSideSkillCard | undefined
});

export function tooltip(
    node: HTMLElement,
    {
        item,
        skill,
    }: { item?: ClientSideItemCard; skill?: ClientSideSkillCard }
) {
    let isTouch = false;
    let tooltipVisible = false;

    function handlePointerDown(event: PointerEvent) {
        isTouch = event.pointerType === "touch";
    }

    function handlePointerUp(event: PointerEvent) {
        if (event.pointerType !== "touch") return;
    
        tooltipVisible = !tooltipVisible;
    
        if (tooltipVisible) {
            tooltipState.x = event.clientX;
            tooltipState.y = event.clientY;
            tooltipState.hoveredItem = item;
            tooltipState.hoveredSkill = skill;
    
            setTimeout(() => {
                window.addEventListener("pointerdown", handleOutsideClick, true);
            }, 0);
        } else {
            hideTooltip();
        }
    }
    
    function handlePointerMove(event: PointerEvent) {
        if (event.pointerType === "touch") return;
    
        tooltipState.x = event.clientX;
        tooltipState.y = event.clientY;
        tooltipState.hoveredItem = item;
        tooltipState.hoveredSkill = skill;
    }
    
    function handlePointerLeave(event: PointerEvent) {
        if (event.pointerType === "touch") return;
    
        hideTooltip();
    }

    function handleScroll() {
        hideTooltip();
    }

    function handleOutsideClick(event: PointerEvent) {
        if (!node.contains(event.target as Node)) {
            hideTooltip();
        }
    }

    function hideTooltip() {
        tooltipVisible = false;
        tooltipState.hoveredItem = undefined;
        tooltipState.hoveredSkill = undefined;
        window.removeEventListener("pointerdown", handleOutsideClick, true);
    }

    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointerup", handlePointerUp);
    node.addEventListener("pointerenter", handlePointerMove);
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", handlePointerLeave);
    node.addEventListener("pointercancel", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, true);

    return {
        destroy() {
            node.removeEventListener("pointerdown", handlePointerDown);
            node.removeEventListener("pointerup", handlePointerUp);
            node.removeEventListener("pointerenter", handlePointerMove);
            node.removeEventListener("pointermove", handlePointerMove);
            node.removeEventListener("pointerleave", handlePointerLeave);
            node.removeEventListener("pointercancel", handlePointerLeave);
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("pointerdown", handleOutsideClick, true);
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
