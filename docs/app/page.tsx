import { Center, Inline, Link } from '@/ui';
import type { PropsWithChildren } from 'react';
import { AccessibiltySection } from './_components/landingpage/AccessibiltySection';
import { CollaborationSection } from './_components/landingpage/CollaborationSection';

// Components
// ---------------
const SectionHeadline = ({ children }: PropsWithChildren) => (
  <h2 className="text-balance pb-4 text-6xl font-extrabold tracking-tight">
    {children}
  </h2>
);

const SectionContent = ({ children }: PropsWithChildren) => (
  <p className="text-pretty text-lg">{children}</p>
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
            <Link
              variant="primary"
              size="large"
              href="/introduction/getting-started"
            >
              Get started
            </Link>
            <Link variant="secondary" size="large" href="/components">
              Explore Components
            </Link>
          </Inline>
        </Center>
      </div>
    </div>

    <div className="grid max-w-screen-lg gap-[25vw] pt-[5vw]">
      <div className="grid grid-cols-2 items-center gap-16">
        <div>
          <SectionHeadline>Built to be accessible</SectionHeadline>
          <SectionContent>
            Marigold is designed with accessibility in mind from the ground up.
            It leverages React Aria for screen reader and keyboard navigation
            support, ensuring your applications are ready for every user.
          </SectionContent>
        </div>
        <AccessibiltySection />
      </div>
      <div className="grid grid-cols-5 items-center gap-16">
        <CollaborationSection />
        <div className="col-span-2">
          <SectionHeadline>Made for collaboration</SectionHeadline>
          <SectionContent>
            Designers and developers iterate together using shared tools like
            design tokens, guidelines, UI kit, and Storybook. No handoff is
            necessary. Instead, collaboration throughout the project reduces
            friction and fosters a unified vision.
          </SectionContent>
        </div>
      </div>
      <div className="">
        <SectionHeadline>Complex layouts, simplified.</SectionHeadline>
        <SectionContent>
          Ready-to-use layout components make it easy to build pages of any
          complexity. These flexible tools help teams quickly create responsive,
          structured designs, streamlining the process without the need for
          complex CSS.
        </SectionContent>
      </div>
      <div className="">
        <SectionHeadline>One system, endless styles.</SectionHeadline>
        <SectionContent>
          All components are built to adapt seamlessly to different brands and
          visual identities. With flexible theming options, teams can easily
          tailor components to match unique brand colors, styles, and design
          needs.
        </SectionContent>
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
