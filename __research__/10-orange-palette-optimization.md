# Orange Palette Optimization

How to make Marigold's orange palette look modern and sophisticated rather than cheap, and ensure the pale tones work as selected-state backgrounds alongside the stone neutral palette.

## Current Palette Analysis

The existing orange scale in `theme-rui/src/theme.css`:

```
50:  #fff9ed   L=0.98  C=0.030  H=85°   (very pale, leans yellow)
100: #fff1d5   L=0.96  C=0.058  H=85°   (pale, distinctly yellow-orange)
200: #fedfaa   L=0.92  C=0.105  H=83°   (light, warm yellow)
300: #fdc774   L=0.85  C=0.145  H=73°   (golden, saturated)
400: #fba43c   L=0.77  C=0.172  H=62°   (bright orange, high chroma)
500: #f98e22   L=0.72  C=0.183  H=56°   (vivid orange, peak saturation)
600: #ea6d0c   L=0.64  C=0.178  H=48°   (deep orange)
700: #c2520c   L=0.54  C=0.160  H=42°   (dark orange-brown)
800: #9a4112   L=0.45  C=0.128  H=43°   (brown-orange)
900: #7c3712   L=0.38  C=0.106  H=42°   (dark brown)
950: #431a07   L=0.25  C=0.069  H=40°   (near-black brown)
```

_(OKLCH values are approximate, converted for analysis)_

### What Makes This Palette Look "Cheap"

**1. High chroma across the entire mid-range (300-600)**

The chroma peaks at ~0.183 at the 500 step. For comparison:

- Tailwind's default `amber-500` sits at roughly C=0.165
- Radix `orange-9` (their primary orange) is at roughly C=0.16
- Apple's system orange is at roughly C=0.18 — but Apple uses it sparingly as a small accent dot, never as a background

When high-chroma orange fills an area (badge, background, selected row), it screams. The effect is "construction site warning" rather than "refined brand accent."

**2. The light tones (50-200) are too yellow**

The hue at the light end sits around 83-85° in OKLCH. For reference:

- Pure yellow is ~110°
- Pure orange is ~55-65°
- The light end of this palette is closer to a "yellow" than an "orange"

When orange-50 (`#fff9ed`) is used as a background, it reads as "faded parchment yellow" rather than "warm neutral with an orange tint." Placed next to stone-100 (`#f5f5f4`), the yellow cast becomes obvious and jarring — the stone is a cool warm gray, the orange-50 is a warm yellow.

**3. No hue continuity with the stone palette**

Stone's hue in OKLCH is approximately 60-70° (a warm, slightly yellowish gray). The orange palette's light tones jump to 83-85° (more yellow). A well-integrated accent palette should have its pale tones converge toward the neutral base's hue, not diverge from it.

**4. The saturation curve is linear, not perceptual**

The palette was likely generated with a tool that distributes saturation linearly. Perceptually uniform color spaces (OKLCH) reveal that the chroma doesn't ramp smoothly — there's a steep climb from 200→400 and a plateau from 400→600. This makes the mid-tones all feel "the same kind of loud."

---

## Counter-Questions and Critical Examination

### "Is the palette actually used enough to matter?"

Currently, orange is only used for:

1. The `access-master` mark (orange-100 bg, orange-500 foreground)
2. Labeled as "use for accent" but **not wired to any semantic accent token**

So right now, the palette is mostly dormant. But the comment says "use for accent" — the _intent_ is to use it more broadly. If orange is meant to be the accent color for selected states, highlights, or active elements, the palette quality matters enormously. Every list selection, every active tab, every highlighted state would be tinted with it.

**Counter**: If we keep stone-based selections (the recommendation in `09-monochromatic-state-differentiation.md`), maybe we don't need to optimize the orange at all.

**Response**: Even if stone remains the primary selection color, the orange palette should be available as a high-quality option for: (a) accent highlights where more visual weight is needed, (b) the access-master mark already using it, (c) potential future use in data visualization, badges, or interactive states. A poorly crafted palette limits future design choices.

### "Won't reducing saturation make orange look washed out?"

There's a difference between "reducing peak saturation" and "making everything muted." The goal is:

- Keep the 500-600 range vivid enough to work as icon/text color
- Significantly reduce chroma in the 50-200 range so backgrounds feel warm-neutral, not highlighter-yellow
- The overall impression should be "warm amber" rather than "traffic cone"

Modern design systems like Linear, Vercel, and Stripe use oranges/ambers with lower peak chroma but higher sophistication. They feel "expensive" because the colors are restrained.

### "Should we switch hue entirely (e.g., to amber or terracotta)?"

This is a valid question. Options:

| Direction                     | Hue range (OKLCH) | Character             | Risk                                      |
| ----------------------------- | ----------------- | --------------------- | ----------------------------------------- |
| **Keep orange** (optimized)   | 50-70°            | Energetic, friendly   | Still has "cheap" risk if chroma too high |
| **Shift to amber**            | 70-80°            | Warm, refined, golden | Can look too "yellow-brown"               |
| **Shift to terracotta/burnt** | 40-55°            | Earthy, sophisticated | May look too "brown," less energetic      |
| **Shift to coral/peach**      | 35-45°            | Modern, soft          | May clash with destructive-red            |

**Recommendation**: Don't change the core hue. Orange (55-65°) is correct for the brand. What needs to change is the **chroma curve** — specifically, how much saturation exists at each lightness level. The pale tones should have dramatically less chroma than they currently do.

### "Can we just use Tailwind's built-in orange or amber?"

Tailwind's built-in `orange` scale has similar problems — it's also quite saturated in the mid-tones and yellow in the lights. The `amber` scale is warmer but has the same chroma issues.

The whole point of a custom palette is to tune it for the specific context. Marigold pairs orange with stone (a warm gray). A custom orange palette that's designed to complement stone will always outperform a generic one.

### "What about dark mode compatibility?"

Even without dark mode today, designing the palette in OKLCH with consistent lightness stepping makes future dark mode trivial — you can generate the dark palette by reflecting the lightness values while keeping chroma and hue stable.

---

## How Modern Systems Handle Accent Oranges

### Linear

Linear uses a very desaturated amber for backgrounds (nearly indistinguishable from warm gray) and reserves vivid orange for small icons and status indicators. Their selection backgrounds use translucent overlays rather than opaque palette stops.

### Vercel

Vercel's warning/amber palette uses OKLCH-based generation with chroma that peaks around 0.14 (lower than Marigold's 0.183). Their light tones are almost neutral — `amber-2` in their scale looks like a slightly warm white.

### Radix Colors

Radix generates all palettes in a perceptual color space with these principles:

- Steps 1-2: Backgrounds (near-white, barely tinted)
- Steps 3-5: Component backgrounds (subtle tints)
- Steps 6-8: Borders
- Steps 9-10: Solid backgrounds (highest chroma)
- Steps 11-12: Text

The critical insight: Radix steps 1-5 have **dramatically lower chroma** than their equivalents in Tailwind. Radix's `orange-3` is barely perceptible as orange — it just feels "warm." This is what makes it work as a selection background.

### Apple HIG

Apple's accent colors are designed for small touch points (radio buttons, toggles, link underlines). When Apple needs a tinted background for selection, they use the accent color at extremely low opacity (typically 10-15% over the background). They never use a mid-palette orange as a fill.

---

## Proposed Optimized Palette

### Design Principles

1. **OKLCH-native**: Define the palette in OKLCH for perceptual uniformity
2. **Low chroma in light tones**: Steps 50-200 should feel like "warm stone" not "orange"
3. **Hue convergence**: Light tones converge toward stone's hue (~65°), dark tones can shift slightly toward red (~50°)
4. **Moderate peak chroma**: Cap at ~0.155 instead of 0.183 — still vivid, but not screaming
5. **Background-safe lights**: orange-50 should be usable as a selected-state background alongside stone-100 hover without looking like a different color system

### Palette: "Warm Amber" Direction

```css
/* OKLCH-based orange (warm amber direction) */
--color-orange-50: oklch(0.98 0.012 70); /* barely warm white — selection bg */
--color-orange-100: oklch(0.95 0.028 68); /* warm tint — subtle highlight */
--color-orange-200: oklch(0.9 0.06 65); /* light warm — soft fill */
--color-orange-300: oklch(0.83 0.105 62); /* warm gold — visible accent */
--color-orange-400: oklch(0.76 0.14 58); /* amber — strong accent */
--color-orange-500: oklch(0.7 0.155 55); /* core orange — primary accent */
--color-orange-600: oklch(0.62 0.15 50); /* deep orange — text on light bg */
--color-orange-700: oklch(0.53 0.13 47); /* dark amber — emphatic text */
--color-orange-800: oklch(0.44 0.105 45); /* brown-orange */
--color-orange-900: oklch(0.36 0.08 43); /* dark brown */
--color-orange-950: oklch(0.24 0.05 40); /* near-black warm */
```

### Key Differences from Current

| Step | Current Chroma | Proposed Chroma | Change                  |
| ---- | -------------- | --------------- | ----------------------- |
| 50   | ~0.030         | 0.012           | -60% (much less yellow) |
| 100  | ~0.058         | 0.028           | -52%                    |
| 200  | ~0.105         | 0.060           | -43%                    |
| 300  | ~0.145         | 0.105           | -28%                    |
| 400  | ~0.172         | 0.140           | -19%                    |
| 500  | ~0.183         | 0.155           | -15%                    |
| 600  | ~0.178         | 0.150           | -16%                    |
| 700+ | (similar)      | (similar)       | minimal change          |

The biggest reductions are in the light end. The 50 step goes from "clearly yellow-orange" to "barely warm" — almost indistinguishable from white in isolation, but warm when placed next to pure white or cool gray.

### Hex Approximations (for comparison)

```css
/* Approximate hex equivalents (browser may render slightly differently) */
--color-orange-50: #fdf8f3; /* was #fff9ed — less yellow, more neutral-warm */
--color-orange-100: #f9efe3; /* was #fff1d5 — cooler, more stone-adjacent */
--color-orange-200: #f2ddc5; /* was #fedfaa — less saturated, more taupe */
--color-orange-300: #e5bd8a; /* was #fdc774 — warmer gold, less lemon */
--color-orange-400: #d49a55; /* was #fba43c — amber instead of bright orange */
--color-orange-500: #c5812f; /* was #f98e22 — deeper, more refined */
--color-orange-600: #ad6520; /* was #ea6d0c — less "safety vest" */
--color-orange-700: #8e4f1c; /* was #c2520c — similar territory */
--color-orange-800: #714019; /* was #9a4112 — similar */
--color-orange-900: #5a3317; /* was #7c3712 — similar */
--color-orange-950: #3a1f0f; /* was #431a07 — similar */
```

---

## Integration with Stone for Selected States

### The Core Test: orange-50 as Selected Background

The proposed orange-50 (`oklch(0.98 0.012 70)` ≈ `#fdf8f3`) needs to:

1. **Look distinct from white** (otherwise, what's the point?)
2. **Look distinct from stone-100** (`#f5f5f4`) used for hover
3. **Not look "wrong" next to stone** (no jarring hue clash)
4. **Pass as a neutral-warm background** rather than "orange"

Current orange-50 (`#fff9ed`) fails tests 3 and 4 — it's visibly yellow-orange next to stone.

Proposed orange-50 (`#fdf8f3`) has:

- Lightness: 0.98 (slightly lighter than stone-100 at ~0.96)
- Chroma: 0.012 (barely above stone's ~0.006)
- Hue: 70° (close to stone's ~65°)

This should read as "warm white" — warmer than pure white, but not identifiable as "orange." When an item is selected with this background while its neighbors have stone-100 hover, the warmth provides differentiation without jarring contrast.

### Alternative: Use orange-100 for selected instead

If orange-50 is too subtle, orange-100 (`oklch(0.95 0.028 68)` ≈ `#f9efe3`) provides:

- Clearly distinguishable from white
- Similar lightness to stone-100 but with a warm tint
- The slightly higher chroma (0.028) is still very low — comparable to a lightly stained piece of paper

This could serve as `--color-selected` for a "warm selection" variant:

```css
/* Option A: stone-based selection (neutral) */
--color-selected: var(--color-stone-200);

/* Option B: orange-tinted selection (brand-warm) */
--color-selected: var(--color-orange-100);
```

### Cross-Palette Harmony Check

How does the proposed orange interact with the status palettes?

| Context                                  | Color                                                     | Risk                                                                               |
| ---------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Orange-100 selected + red error border   | Warm bg + red border                                      | Low risk — warm backgrounds make red less aggressive                               |
| Orange-100 selected + green success icon | Warm bg + green icon                                      | Low risk — warm tones are complementary to green                                   |
| Orange-100 selected + blue info text     | Warm bg + blue text                                       | Moderate — blue on warm can feel slightly discordant. Test carefully.              |
| Orange-100 selected + yellow warning     | **High risk** — yellow-on-warm-yellow reads as same color | This is the main danger. If orange-100 is too yellow, warning states lose contrast |

The yellow-warning conflict is the strongest argument for keeping orange's light tones very low in chroma and slightly away from yellow hue. The proposed palette's hue of 68-70° at the light end is safe — it's closer to "warm" than "yellow."

---

## Counter-Arguments Against Changing

### "The current palette matches Reservix brand guidelines"

If the specific hex values come from official brand guidelines, changing them requires design sign-off. The technical analysis can inform the conversation, but brand decisions are ultimately human decisions.

**Mitigation**: Present this as an "optimized for digital use" variant. Many brands have slightly different palettes for print vs digital. The print orange can remain vivid; the digital palette needs to work at scale on screens.

### "Reducing saturation makes the palette boring"

The 500-600 range still needs to work for:

- Icons (small, needs to pop)
- Badge foreground text
- Active indicator dots

At chroma 0.155, the proposed 500 is still clearly orange. It's just not _screaming_. Side-by-side on a badge:

- Current: eye-catching, slightly aggressive
- Proposed: noticeable, refined

For a design system that pairs with stone (professional, minimal), "refined" is the right target.

### "OKLCH values aren't backward-compatible"

OKLCH has excellent browser support (94%+ as of 2025). However, if legacy browser support is needed, the hex fallbacks provided above work as the primary values, with OKLCH as a progressive enhancement.

Alternatively, define the palette in hex (approximated from OKLCH design) and skip the OKLCH syntax entirely. The important thing is that the values were _designed_ in a perceptual space, even if they're _shipped_ as hex.

---

## Recommendations

### Immediate (Low Risk)

1. **Reduce chroma in orange-50 through orange-200** — This is the highest-impact change. The pale tones are what appear as backgrounds, and they're currently too saturated/yellow.

2. **Keep the orange-500 through orange-950 range close to current** — These are used sparingly (access-master foreground) and work fine at small scale.

3. **Test orange-50 as `--color-selected` background** — If the monochromatic stone-200 approach from doc 09 feels too bland, orange-50 provides a subtle warmth that reinforces brand identity.

### Medium Term

4. **Redesign the full palette using OKLCH** with consistent lightness stepping, controlled chroma curve, and deliberate hue rotation.

5. **Consider a "brand" accent token** that maps to the orange palette, giving components a semantic way to reference the accent without hardcoding orange:

```css
--color-accent: var(--color-orange-500);
--color-accent-foreground: var(--color-white);
--color-accent-muted: var(--color-orange-50);
--color-accent-muted-foreground: var(--color-orange-950);
```

### What NOT To Do

- Don't switch to amber or terracotta — the core hue is fine, the chroma curve is the problem
- Don't add more palette stops (the 11-step scale is standard and sufficient)
- Don't use OKLCH syntax in the CSS if the team values maximum browser compatibility — use the hex approximations instead
- Don't optimize the orange palette independently of the status palettes (red, green, yellow, blue) — they should all be reviewed together for consistent chroma levels

---

## Sources

- [OKLCH Color Space](https://oklch.com/) — Interactive OKLCH color picker
- [Evil Martians: OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) — Comprehensive guide to OKLCH
- [Radix Colors](https://www.radix-ui.com/colors) — Perceptually uniform palette design
- [Huetone](https://huetone.ardh.ro/) — Tool for designing OKLCH-based palettes
- [Palette Generator (OKLCH)](https://www.figma.com/community/plugin/1229961588498507498) — Figma plugin for OKLCH palettes
- Josh W. Comeau: [Color Formats in CSS](https://www.joshwcomeau.com/css/color-formats/) — Practical guide to modern color in CSS
