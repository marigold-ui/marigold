import { Center, Inline, Link } from '@/ui';
import type { PropsWithChildren } from 'react';
import { AccessibiltySection } from './_components/landingpage/AccessibiltySection';
import { CollaborationSection } from './_components/landingpage/CollaborationSection';
import { LayoutSection } from './_components/landingpage/LayoutSection';
import { SystemSection } from './_components/landingpage/SystemSection';

// Components
// ---------------
const SectionHeadline = ({ children }: PropsWithChildren) => (
  <h2 className="text-balance pb-2 text-6xl font-extrabold tracking-tight">
    {children}
  </h2>
);

const SectionContent = ({ children }: PropsWithChildren) => (
  <p className="text-pretty text-lg">{children}</p>
);

const SectionLink = ({
  children,
  href,
}: PropsWithChildren<{ href: string }>) => (
  <Link href={href}>
    <span className="text-sm">▶︎</span>{' '}
    <span className="text-lg">{children}</span>
  </Link>
);

// Page
// ---------------
export const Page = () => (
  <main className="grid justify-center px-[--page-padding-md] xl:px-[--page-padding-xl]">
    <div className="grid h-[calc(100dvh-var(--page-header-height))] max-w-screen-lg place-items-center text-center">
      <div>
        <h1 className="text-balance text-8xl font-extrabold">
          Cultivate beautiful user interfaces
        </h1>
        <p className="text-text-primary/60 text-balance pb-24 pt-10 text-xl font-light leading-relaxed">
          Marigold is a design system for Reservix, providing components and
          tools that let product teams focus on core challenges while creating
          unified, accessible applications.
        </p>
        <Center>
          <Inline data-toggle data-toggle-target="#foobar" space={6}>
            <Link variant="primary" size="large" href="/getting-started">
              <span className="inline-block translate-y-px">Get started</span>
            </Link>
            <Link variant="secondary" size="large" href="/components">
              Explore Components
            </Link>
          </Inline>
        </Center>
      </div>
    </div>

    <div className="grid max-w-screen-lg gap-[40vh] pt-[5vw]">
      <div className="grid grid-cols-2 items-center gap-16">
        <div className="grid gap-4">
          <SectionHeadline>Built to be accessible</SectionHeadline>
          <SectionContent>
            Marigold is designed with accessibility in mind from the ground up.
            It leverages React Aria for screen reader and keyboard navigation
            support, ensuring your applications are ready for every user.
          </SectionContent>
          <SectionLink href="/components">Try out the components</SectionLink>
        </div>
        <AccessibiltySection />
      </div>
      <div className="grid grid-cols-5 items-center gap-16">
        <CollaborationSection />
        <div className="col-span-2 grid gap-4">
          <SectionHeadline>Made for collaboration</SectionHeadline>
          <SectionContent>
            Designers and developers iterate together using shared tools like
            design tokens, guidelines, UI kit, and Storybook. No handoff is
            necessary. Instead, collaboration throughout the project reduces
            friction and fosters a unified vision.
          </SectionContent>
          <SectionLink href="/foundations">
            Deep dive into the foundations
          </SectionLink>
        </div>
      </div>
      <div className="grid grid-cols-8 items-center gap-16">
        <div className="col-span-5 grid gap-4">
          <SectionHeadline>Complex layouts, simplified.</SectionHeadline>
          <SectionContent>
            Ready-to-use layout components make it easy to build pages of any
            complexity. These flexible tools help teams quickly create
            responsive, structured designs, streamlining the process without the
            need for complex CSS.
          </SectionContent>
          <SectionLink href="/foundations/layouts">
            Learn more about layouts
          </SectionLink>
        </div>
        <LayoutSection />
      </div>
      <div className="grid grid-cols-8 items-center gap-16">
        <SystemSection />
        <div className="col-span-5 grid gap-4">
          <SectionHeadline>One system, flexible styles.</SectionHeadline>
          <SectionContent>
            All components are built to adapt seamlessly to different brands and
            visual identities. With flexible theming options, teams can easily
            tailor components to match unique brands, styles, and design needs.
          </SectionContent>
          <SectionLink href="/getting-started/installation#theming">
            Explore theming possibilities
          </SectionLink>
        </div>
      </div>
    </div>
  </main>
);

export default Page;

/**
 * teams can focus on building great products, without worrying ...
 */

/** testimonials */

/**
 * 
 * Support:

How to get in touch with the team

Report a Bug link

UI KIT (?) link

 

Links:

Github, Figma, Storybook
 * 
 * 
 */
