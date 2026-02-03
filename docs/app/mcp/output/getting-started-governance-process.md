# Governance Process

_Making changes and additions to Marigold._

Product teams are primarily focused on getting the job done. In their quest to achieve this, they sometimes need to take on design debt—improvising styles, crafting unique components, or even bypassing the design system entirely. To help teams avoid unnecessary debt, we've established a governance process that guides both the product teams and us on managing changes and additions within Marigold.

This process ensures that any modifications to the design system are carefully evaluated to maintain consistency, stability, and user-friendliness. We prioritize updates that meet specific user needs, adhere to industry standards, and offer high reusability. Guided by our [Governance values and principles](/getting-started/governance-principles), this approach helps uphold the quality and integrity of our design system.

If you ever asked yourself what we do with your feature requests or what you should do if we declined your request, you've come to the right place.

We have created a flowchart, divided into 3 phases, that illustrates how incoming feature requests are handled.

> ℹ️ Note: Bug fixes aren't subject to the same rigorous evaluation process and are
> handled differently. To read more about how to report bugs go
> here.

## Phase 1: Product team discovers a problem

What should you do if, while using the design system, you discover it's unable to provide something you need?

**Step 1:** The process begins when the product team discovers a problem with
Marigold, which could be, for example, a missing, broken, or
non-user-friendly component.

**Step 2:** The product team should first try to discover whether the Design System offers an existing alternative to solve the problem.

- **Yes:** If a viable alternative exists within the design system, the product team should use it.

- **No:** If there is no viable alternative, the product team should write a [request(internal only)](https://reservix.atlassian.net/servicedesk/customer/portal/77).

If the product team writes a support ticket, this triggers phase 2.

## Phase 2: Design system team evaluates the request

This phase is only relevant if you have written a support ticket. This phase explains what happens to your request and how we evaluate it.

**Step 1:** If we have received a request through our [support portal (internal only)](https://reservix.atlassian.net/servicedesk/customer/portal/77) we have to check if there is clear evidence of user need.

- **Yes:** If there is clear evidence of user need, move to step 2.

- **No:** If there isn't clear evidence, the request is declined, and alternative solutions are offered.

**Step 2:** For the next decision we have to check if the requested change will feel familiar to our users, i.e., if it is consistent with broader UX standards.

- **Yes:** If the requested change will feel familiar to users, move to step 3.

- **No:** If it won't feel familiar the request is declined and alternative solutions are offered.

**Step 3:** We have to check if the change is likely to be reusable across multiple products.

- **Yes:** If the change is likely to be reusable across multiple products, we approve the request.

- **No:** If it isn't likely to be reusable, the request is declined, and alternative solutions are offered.

**Step 4:** The next step is to determine the estimated timeline, including the roadmap and estimated effort.

**Step 5:** The product team decides if the estimated implementation timeline will meet their needs.

- **Yes:** If the estimated timeline works for the product team, the product team waits for delivery ​while the Design System Team proceeds to Phase 3a.

- **No:** If the estimated timeline does not work, the process goes to Phase 3b.

## Phase 3a: Design system team fulfills the request

This phase can only be achieved if the estimated time for the request is acceptable for you and your team and you are willing to wait for us to deliver it. ​In that case, you can follow the process below.

**Step 1:** We start designing the request or addition.

**Step 2:** Does the design fulfill [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) requirements:

- **Yes:** If the result meets [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) requirements, proceed to testing.

- **No:** If it does not meet these requirements, the design decisions must be revisited.

**Step 3:** Test the design in real-world environments, ideally with real users.

**Step 4:** We need to check if the solution meets the three key criteria: user need, familiarity, and reusability.

- **Yes:** If it still meets all three criteria, proceed to the voting stage in step 5.

- **No:** If it does not meet the criteria, iterate on the design.

**Step 5:** The Design System Team and major stakeholders (e.g., UX/UI Community of Practice) vote on the solution. Is there agreement?

- **Yes:** If there is consensus, proceed to documentation.

- **No:** If there is no consensus, revisit the design and address concerns.

**Step 6:** We document the approved changes.

**Step 7:** We merge the changes to the codebase.

**Step 8:** We communicate the change or addition.

## Phase 3b: Product team’s response if request can’t or won’t be fulfilled

What if you cannot wait for us to deliver a request, or we decide it doesn't meet our criteria for becoming part of the design system?​

**Step 1:** The product team must decide if they are still convinced of the need for their request.

- **Yes:** If the product team is still convinced of the need for the request, they proceed to step 2.

- **No:** If the product team is no longer convinced of the need for the request, the process ends, and the product team re-examines their requirements.

**Step 2:** If the product team is still convinced of the need for the request, they can choose to build their own component or solution, receiving support as needed​ from the design system team.

**Step 3:** Throughout the development process, the product team frequently coordinates with the design system team to ensure alignment and adherence to guidelines.

**Step 4:** The product team ensures that all design tokens and sub-elements used in their solution are sourced from the design system as much as possible to maintain consistency.

**Step 5:** The product team takes ownership of the custom solution they have developed. They document the solution and maintain it.

**Step 6:** If, at some point, a viable alternative becomes available, the product team can decide to use it in place of their custom solution.

- **Yes:** If a viable alternative becomes available in the design system, the product team removes their custom solution and implements the official one.

- **No:** If there is still no alternative available in the design system the product team continue to maintain their custom solution.

> ℹ️ End of processWith end of Phase 3a the request is fulfilled and the process of making changes and additions is done. 🎉In Phase 3b, the process concludes either with the product team maintaining the change or awaiting an alternative solution from the Design System Team.
