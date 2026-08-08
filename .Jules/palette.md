## 2026-08-08 - Accessible Mobile Menu Toggles
**Learning:** Interactive icon-only elements like mobile menu toggles frequently lack proper ARIA labels, `aria-expanded` attributes, and visible focus indicators, making them difficult for screen reader and keyboard users to navigate.
**Action:** Always ensure that icon-only interactive elements have descriptive `aria-label` attributes, convey state (e.g., `aria-expanded`), hide decorative icons from screen readers using `aria-hidden`, and provide clear `focus-visible` styles.
