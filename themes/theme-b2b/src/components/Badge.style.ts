import type { Theme } from "@marigold/components";

export const Badge:Theme['components']['Badge'] = {
    base: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: "xsmall",
        borderRadius: "large",
        border: "2px solid transparent",
        whiteSpace: "nowrap",
        py: 4,
        px: 12,
    },
    variant: {
       borderColor: 'blue70',
       bg: 'blue80' 
    }
};