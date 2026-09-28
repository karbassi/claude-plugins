---
name: motion
description: Motion and animation rules for hand-written HTML pages and Svelte components. Use when adding or reviewing any CSS transition, @keyframes animation, Svelte transition, view transition, scroll-driven effect or hover and press feedback.
user-invocable: true
---

# Motion

Motion is feedback and orientation, never decoration and never a gate. When in doubt, leave it out: a hard cut is always acceptable.

The snippet `motion.css` sits next to this file and holds the tokens, the reduced-motion rule and the button press.

## Rules

### Content never waits for motion

- Never make content visible only after an animation runs. An entrance from `opacity: 0` leaves the content blank whenever the animation stalls: a background tab, a throttled renderer, a screenshot, print, a bfcache restore, or an IntersectionObserver that never fires.
- Opacity entrances are only for UI that appears because the user did something (a menu, popover, toast or dialog). Page content, diagrams and table rows are visible in their final state from the first paint.
- Give every observer- or timer-driven effect a safety net: after a short timeout, force the end state.
- Check that the print stylesheet renders correctly with no JS having run.

### What to animate

- Animate only `transform` and `opacity`. On decorative chrome, `box-shadow`, `outline` and SVG stroke properties are fine too. Never animate layout properties (`width`, `height`, `top`, `margin`).
- Keep every duration under 300ms. Use about 200ms for entrances and about 100ms for press feedback.
- Use ease-out for entrances and feedback, and ease-in for exits. Never use linear, except for continuous loops like spinners.
- Exits run about 40% faster than entrances (200ms in, 120ms out).
- Stagger list items by about 50ms, and cap the stagger at the first 6 or so items. The rest appear with the last one.

### What not to animate

- Frequent actions: sort clicks, tab switches, filter typing, pagination. These update instantly. Motion that repeats dozens of times a session becomes friction.
- Never animate from `scale(0)`. Start from about `scale(0.96)` with a small offset. Things don't grow from nothing.
- Nothing loops forever except a loading indicator, and that one stops when loading ends.

### Feedback

- Buttons press to `scale(0.97)` on `:active`, over about 100ms.
- Hover changes color or shadow, not size.

### Performance

- Put `will-change` on at most 3 elements at a time, only while they animate, and remove it afterward. Never put it in a blanket rule.
- Prefer CSS transitions and animations over JS. Use the Web Animations API when JS has to drive the motion.
- Scroll-driven effects use `animation-timeline: scroll()` or `view()`, never a scroll listener. Wrap them in `@supports (animation-timeline: scroll())`.
- Register a custom property with `@property` before animating it. Unregistered properties jump instead of interpolating.

### Reduced motion

- Honor `prefers-reduced-motion: reduce` with near-zero durations (`0.01ms`), not `animation: none`, so end states and `transitionend` events still happen (see `motion.css`).
- Visibility never depends on this setting, because visibility never depended on motion in the first place.
- Cross-document view transitions (`@view-transition { navigation: auto }`) are fine as an enhancement. Turn them off under reduced motion.

## Svelte

Svelte transitions run on the Web Animations API, not CSS, so the global reduced-motion rule in `motion.css` doesn't reach them. Pass the duration explicitly:

```svelte
<script>
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { prefersReducedMotion } from 'svelte/motion';

  let { open } = $props();
  const d = (ms) => (prefersReducedMotion.current ? 0 : ms);
</script>

{#if open}
  <div class="menu" in:fly={{ y: 4, duration: d(200), easing: cubicOut }} out:fade={{ duration: d(120) }}>
    …
  </div>
{/if}
```

- Transitions are local by default, and they don't play on the first render unless you mount with `intro: true`. Keep it that way, so server-rendered content is never hidden.
- Don't put `animate:flip` on lists the user sorts or filters often. The reorder should be instant.
- For list stagger, pass `delay: d(Math.min(i, 6) * 50)`.
