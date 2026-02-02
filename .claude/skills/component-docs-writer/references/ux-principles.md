# UX Principles for Component Documentation

Core UX knowledge and best practices for documenting UI components. Use these principles to inform documentation content, usage guidance, and Do/Dont examples.

## Component Selection Principles

### Buttons vs Links

**Use buttons when:**
- Triggering an action (submit, save, delete, open dialog)
- Changing application state
- The action happens on the current page

**Use links when:**
- Navigating to another page or view
- Opening external resources
- Downloading files
- Jumping to page sections (anchors)

**Why it matters:** Screen readers announce these differently. Buttons signal "this does something" while links signal "this goes somewhere."

### Checkboxes vs Radio Buttons vs Select

**Use checkboxes when:**
- Users can select zero, one, or multiple options
- Each option is independent
- All options should be visible (5-7 options max)
- Users need to compare options side-by-side

**Use radio buttons when:**
- Users must select exactly one option
- Options are mutually exclusive
- All options should be visible (5-7 options max)
- The choice is critical and needs emphasis

**Use select (dropdown) when:**
- Users select one option from many (8+ options)
- Screen space is limited
- Options are familiar (states, countries, months)
- The choice is secondary/less important

**Why it matters:** Visibility affects discoverability. Hidden options (in dropdowns) require more effort and may be overlooked.

### Text Input Types

**Use text field when:**
- Accepting short, single-line text (names, emails, titles)
- Input is predictable and structured
- Validation is straightforward

**Use textarea when:**
- Accepting long-form content (comments, descriptions)
- Multiple lines are expected
- No strict character limit

**Use number input when:**
- Accepting numeric values with constraints
- Increment/decrement controls are helpful
- Input should be validated as a number

**Use search field when:**
- Filtering or searching content
- Users expect search-specific behavior (clear button, recent searches)

**Why it matters:** The right input type provides appropriate keyboard (mobile), validation, and browser features.

## Form Design Best Practices

### Field Labels

**Always provide visible labels:**
- Labels should be outside the input, not placeholder text
- Position labels above inputs (better for mobile, scanning, translation)
- Keep labels short (2-4 words) but clear
- Use sentence case, not title case

**Why it matters:** Placeholder text disappears on focus, has poor contrast, and isn't reliably read by screen readers.

### Required vs Optional Fields

**Default approach:**
- Mark optional fields as "(optional)"
- Don't mark required fields (assume required by default)
- Only use when there's a mix of required and optional

**Alternative for mostly optional forms:**
- Mark required fields with asterisk and legend
- But prefer removing unnecessary fields instead

**Why it matters:** Reducing visual noise and cognitive load. Most forms should only ask for necessary information.

### Field Validation

**When to validate:**
- On blur (after user leaves field) - preferred for most fields
- On submit (for simple forms)
- On change (for real-time feedback like passwords, usernames)
- Never on focus

**How to show validation:**
- Use clear, specific error messages
- Show errors below the field
- Use color + icon (not color alone)
- Keep the message visible while error persists

**Error message principles:**
- Be specific: "Password must be at least 8 characters" not "Invalid password"
- Be constructive: Tell users how to fix it
- Use plain language, avoid jargon
- Don't blame the user ("You entered" → "Email address must include @")

**Why it matters:** Good validation guides users to success without frustration.

### Help Text and Descriptions

**Use help text when:**
- Format requirements aren't obvious (dates, phone numbers)
- Context would prevent errors (password requirements)
- Users need guidance about what to enter

**Best practices:**
- Position below label, above input
- Keep concise (one sentence)
- Don't repeat the label
- Use for clarification, not basic instructions

**Why it matters:** Preemptive guidance prevents errors and support requests.

## Disabled States

### When to Disable

**Avoid disabling when possible:**
- Disabled elements provide no feedback about why they're unavailable
- Screen readers may skip disabled elements
- Users can't interact to learn more

**Better alternatives:**
- Keep enabled + show validation error explaining why action can't proceed
- Use loading states for temporary unavailability
- Hide the element entirely if it's never applicable
- Show a tooltip or message explaining requirements

**When disabling is acceptable:**
- Temporarily while action is processing (use loading state)
- In read-only/preview modes
- When the entire section is contextually irrelevant

**Why it matters:** Disabled elements create dead ends. Active elements with validation create learning opportunities.

## Loading and Feedback States

### Loading States

**Use loading indicators when:**
- Action takes longer than 1 second
- Users need confirmation that something is happening
- Preventing duplicate submissions

**Best practices:**
- Disable interactive elements during loading
- Show loading indicator on the trigger (button)
- Use skeleton screens for content loading
- Provide progress indication for long operations (>10 seconds)

**Why it matters:** Users need feedback that their action was received and is processing.

### Success Feedback

**Always confirm successful actions:**
- Form submissions
- Data saves
- Destructive actions (delete, archive)
- State changes

**Methods:**
- Inline success messages
- Toast/notification
- Navigate to success page
- Visual state change (checkmark, updated content)

**Why it matters:** Lack of feedback creates uncertainty and repeated actions.

## Visual Hierarchy and Layout

### Button Hierarchy

**Primary button:**
- One per page/section
- Most important action
- Usually positive/progressive (Save, Submit, Continue)

**Secondary button:**
- Alternative actions
- Less emphasis
- Often paired with primary (Cancel with Save)

**Text/ghost button:**
- Tertiary actions
- Minimal visual weight
- Navigation or dismissal

**Why it matters:** Clear hierarchy guides users to the intended action path.

### Information Density

**Progressive disclosure:**
- Show essential information first
- Hide advanced options until needed
- Use expandable sections for optional details
- Don't overwhelm with all options upfront

**Chunking:**
- Group related fields
- Use whitespace to separate sections
- Limit to 5-7 items per group (working memory)
- Use fieldsets with legends for logical groups

**Why it matters:** Reduces cognitive load and helps users focus.

## Accessibility Considerations

### Keyboard Navigation

**All interactive elements must be:**
- Keyboard accessible (tab, enter, space, arrows)
- In logical tab order
- Visually indicated when focused
- Operable without precise timing

**Common patterns:**
- Tab to navigate between elements
- Enter/Space to activate buttons
- Arrow keys for radio groups, select options
- Esc to close dialogs/menus

**Why it matters:** Not all users use a mouse. Keyboard access is essential for many assistive technologies.

### Screen Reader Support

**Ensure all components have:**
- Descriptive accessible names (labels, aria-label, aria-labelledby)
- Correct semantic roles (button, link, checkbox, etc.)
- State information (checked, expanded, selected)
- Relationship information (aria-describedby for help text)

**Common mistakes:**
- Icon-only buttons without accessible labels
- Placeholder text instead of labels
- Custom components without proper ARIA
- Decorative images without alt=""

**Why it matters:** 7-10% of users rely on assistive technologies. Proper semantics make content accessible.

### Color and Contrast

**Don't rely on color alone:**
- Use icons + color for status
- Use labels + color for categories
- Use patterns + color for charts

**Ensure sufficient contrast:**
- Text: 4.5:1 minimum (normal), 3:1 (large text)
- UI elements: 3:1 minimum
- Focus indicators: 3:1 minimum

**Why it matters:** Color blindness affects 8% of men, 0.5% of women. Low contrast affects everyone in poor lighting.

## Microcopy and Messaging

### Button Labels

**Be specific and action-oriented:**
- ✅ "Save changes" not "OK"
- ✅ "Delete account" not "Yes"
- ✅ "Send message" not "Submit"
- ✅ "Add to cart" not "Add"

**Use verb + noun format:**
- Clearly states what happens
- Reduces ambiguity
- Builds confidence before action

**Why it matters:** Specific labels reduce errors and build trust.

### Empty States

**Address three questions:**
1. What is this space for?
2. Why is it empty?
3. What can I do about it?

**Example:**
- ❌ "No files"
- ✅ "No files uploaded yet. Drag files here or click to browse."

**Why it matters:** Empty states are teaching moments and conversion opportunities.

### Error Prevention

**Design to prevent errors:**
- Use appropriate input types (number, email, date)
- Provide clear constraints upfront
- Offer suggestions (autocomplete, dropdowns)
- Use confirmations for destructive actions

**Examples:**
- File type restrictions shown before upload
- Password requirements visible before typing
- Confirmation dialog before deleting

**Why it matters:** Prevention is better than correction. Every error is a moment of friction.

## Mobile and Responsive Considerations

### Touch Targets

**Minimum size:**
- 44×44px for touch targets (iOS)
- 48×48px recommended (Android)
- Adequate spacing between targets (8px min)

**Why it matters:** Small or crowded targets cause mis-taps and frustration.

### Input Optimization

**Mobile keyboards:**
- Use `type="email"` for @ key
- Use `type="tel"` for number pad
- Use `type="number"` for numeric input
- Use `inputmode` for fine control

**Why it matters:** Right keyboard reduces effort and errors.

### Content Adaptation

**Responsive patterns:**
- Stack form fields vertically on mobile
- Collapse complex layouts into simpler flows
- Use full-width buttons on mobile
- Consider one-column layouts

**Why it matters:** Small screens require different information architecture.

## Common Anti-Patterns to Avoid

### Form Design

- ❌ Placeholder text as labels
- ❌ Asterisks without legend
- ❌ Validation on input (too aggressive)
- ❌ Generic error messages ("Error occurred")
- ❌ Disabled submit buttons with no explanation
- ❌ Auto-advancing after selection (carousel of doom)

### Button and Actions

- ❌ Links styled as buttons (or vice versa)
- ❌ Generic "Click here" or "Learn more" links
- ❌ Too many primary buttons
- ❌ Destructive actions without confirmation
- ❌ Tooltips on disabled elements (not accessible)

### Content and Layout

- ❌ Hiding critical information in tooltips
- ❌ Too much text in alerts/notifications
- ❌ Auto-playing animations/videos
- ❌ Modals for simple confirmations
- ❌ Infinite scroll without pagination option

## Pattern-Specific Guidance

### File Upload

**Best practices:**
- Show accepted file types upfront
- Indicate size limits before selection
- Provide drag-and-drop + click to browse
- Show upload progress for large files
- Allow removing files before submit
- Preview uploaded files when possible

**Accessibility:**
- Ensure keyboard-accessible trigger
- Announce upload progress to screen readers
- Provide text alternative to drag-and-drop

### Search and Filtering

**Best practices:**
- Show results count
- Provide clear feedback for no results
- Allow clearing filters easily
- Persist search query in field
- Consider autocomplete for known values
- Show recent searches for convenience

**When to search:**
- 10+ items to filter
- Unpredictable content
- Users know what they're looking for

### Data Tables

**Best practices:**
- Make columns sortable for large datasets
- Highlight selected rows
- Use pagination for 50+ rows
- Fixed headers for long tables
- Responsive: stack or horizontal scroll

**Accessibility:**
- Use proper table markup (thead, tbody, th, td)
- scope attributes for header cells
- Caption or summary for context
- Keyboard navigation for interactive cells

### Modals and Dialogs

**When to use:**
- Critical decisions requiring focus
- Context that would be lost on new page
- Small forms that don't need full page
- Temporary information (help, preview)

**Best practices:**
- Focus management (trap focus, return on close)
- Esc to close
- Click outside to close (for non-critical)
- Clear close button
- Avoid for long content/forms

**Why it matters:** Modals interrupt flow. Use deliberately.

## Applying to Documentation

### Usage Sections

Use these principles to explain WHEN to use components:

**Bad:**
"The FileField component allows file uploads."

**Good:**
"Use FileField when users need to upload documents, images, or other files. For specific file types—like images for a profile picture—restrict accepted formats to prevent errors and guide users toward appropriate files."

### Do/Dont Guidelines

Draw from UX principles:

**Do:**
- Use specific button labels like "Save changes" rather than generic "OK"
- Provide visible labels for all form fields, positioned above inputs
- Show file type restrictions before users select files

**Dont:**
- Don't use placeholder text as the only label—it disappears on focus
- Don't disable buttons without explaining why the action is unavailable
- Don't use color alone to communicate status or errors

### Accessibility Notes

Reference specific UX principles:

**Example:**
"For icon-only buttons, ensure you set an aria-label attribute to provide context for screen readers. Not all users can perceive visual icons."

## Resources for Further Learning

- [Nielsen Norman Group](https://www.nngroup.com/) - UX research and guidelines
- [Inclusive Components](https://inclusive-components.design/) - Accessible component patterns
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Material Design Guidelines](https://m3.material.io/) - Component usage patterns
- [GOV.UK Design System](https://design-system.service.gov.uk/) - Practical patterns and research
