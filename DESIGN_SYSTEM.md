# Design System Documentation

## Overview

This design system provides a comprehensive guide for building consistent, accessible, and performant user interfaces across the Revenue Dashboard application.

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--black` | #131316 | Primary text, buttons, borders |
| `--white` | #FFFFFF | Backgrounds, surfaces |
| `--gray` | #56616B | Secondary text, disabled states |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--green-900` | #075132 | Success states, checkmarks |
| `--green-100` | #E3FCF2 | Success backgrounds |
| `--red` | #FF5403 | Errors, warnings, destructive actions |

### Usage Guidelines

- Use `--black` for primary actions and main content
- Use `--gray` for secondary information and disabled states
- Use `--green-900` for successful operations
- Use `--red` for errors and warnings
- Maintain minimum contrast ratio of 4.5:1 for text

## Typography

### Font Family

- **Primary**: Degular (weights: 500, 600, 700)
- **Fallback**: system-ui, -apple-system, "Segoe UI", Roboto

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `--fw-500` | 500 | Body text, regular content |
| `--fw-600` | 600 | Labels, secondary headings |
| `--fw-700` | 700 | Headings, emphasis |

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| h1 | 2.5rem | 700 | 1.2 |
| h2 | 1.5rem | 700 | 1.2 |
| h3 | 1.25rem | 700 | 1.2 |
| Body | 1rem | 500 | 1.5 |
| Small | 0.875rem | 500 | 1.5 |

## Spacing System

All spacing uses a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Component padding |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Large gaps |
| `--space-6` | 24px | Section padding |
| `--space-8` | 32px | Large sections |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-md` | 8px | Standard border radius |

## Component Specifications

### Button

**States:**
- Default: `--black` background, `--white` text
- Hover: Darker shade with scale 1.02
- Active: Scale 0.98
- Disabled: 50% opacity

**Sizes:**
- Small: 8px × 12px padding
- Medium: 12px × 16px padding
- Large: 16px × 24px padding

### Input

**States:**
- Default: 1px `#e0e0e0` border
- Focus: 2px `--black` border with shadow
- Error: 1px `--red` border
- Disabled: 50% opacity

**Padding:** 12px × 12px

### Card

**Styling:**
- Background: `--white`
- Border: 1px `#e0e0e0`
- Padding: 24px
- Border Radius: 8px
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.05)

### Modal

**Overlay:**
- Background: rgba(0, 0, 0, 0.5)
- Z-index: 999

**Modal:**
- Background: `--white`
- Max Width: 500px
- Z-index: 1000
- Shadow: 0 20px 25px rgba(0, 0, 0, 0.15)

## Animation Timing

| Action | Duration | Easing |
|--------|----------|--------|
| Hover | 0.12s | spring |
| Press | 0.06s | spring |
| Fade | 0.22s | ease-in-out |
| Modal | 0.28s | spring |

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | 320px | Small phones |
| Tablet | 640px | Large phones, tablets |
| Desktop | 1024px | Desktops |
| Wide | 1400px | Large screens |

## Accessibility Standards

### WCAG 2.1 Level AA

- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Focus indicators visible on all interactive elements
- Keyboard navigation support
- Screen reader compatibility

### Keyboard Navigation

- Tab: Move to next element
- Shift+Tab: Move to previous element
- Enter/Space: Activate buttons
- Escape: Close modals
- Arrow Keys: Navigate lists/calendars

## Best Practices

### Color Usage

1. Never use color alone to convey information
2. Maintain sufficient contrast ratios
3. Test with color blindness simulators
4. Use semantic color tokens

### Typography

1. Use semantic HTML elements (h1-h6)
2. Maintain consistent font weights
3. Ensure readable line lengths (50-75 characters)
4. Use appropriate line heights (1.4-1.6)

### Spacing

1. Use spacing tokens consistently
2. Maintain visual hierarchy with spacing
3. Use gap classes for flexbox layouts
4. Avoid mixing margin and gap on same element

### Components

1. Keep components focused and reusable
2. Use TypeScript for type safety
3. Include proper ARIA attributes
4. Test accessibility with screen readers
5. Support keyboard navigation

## Implementation Examples

### Using Design Tokens

\`\`\`css
.button {
  background-color: var(--black);
  color: var(--white);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--fw-600);
}
\`\`\`

### Responsive Design

\`\`\`css
.container {
  padding: var(--space-6);
}

@media (max-width: 640px) {
  .container {
    padding: var(--space-4);
  }
}
\`\`\`

### Accessibility

\`\`\`tsx
<button
  aria-label="Close modal"
  aria-pressed={isPressed}
  onClick={handleClick}
>
  ✕
</button>
\`\`\`

## Maintenance

### Updating Design Tokens

1. Update `src/styles/design-tokens.css`
2. Update this documentation
3. Run tests to ensure no breaking changes
4. Update component examples if needed

### Adding New Components

1. Create component in `src/components/`
2. Include TypeScript types
3. Add unit tests (80%+ coverage)
4. Document in this file
5. Update README with usage examples

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
