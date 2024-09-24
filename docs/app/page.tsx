import { Card, Center, Headline, Inline, Link } from '@/ui';
import type { PropsWithChildren } from 'react';
import { BlurFade } from '@/ui/BlurFade';
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

const HelpIcon = ({ className = 'size-7' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7.9 20A9 9 0 104 16.1L2 22z" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
  </svg>
);

const ContributeIcon = ({ className = 'size-7' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
    <path d="M12 5L9.04 7.96a2.17 2.17 0 000 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 013.79 0l2.96 2.66M18 15l-2-2M15 18l-2-2" />
  </svg>
);

const BugIcon = ({ className = 'size-7' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 116 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 014-4h4a4 4 0 014 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4" />
  </svg>
);

// Page
// ---------------
export const Page = () => (
  <main className="grid justify-center px-[--page-padding-md] pb-36 xl:px-[--page-padding-xl]">
    {/* Hero */}
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

    {/* Features */}
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

      {/* Support */}
      <div className="grid grid-cols-5 gap-6 pt-4 *:flex *:items-stretch">
        <BlurFade className="col-span-3" inView delay={0.2}>
          <Card variant="lowered">
            <Inline space={2} alignY="center">
              <HelpIcon className="size-8" />
              <Headline level="3">Need help? We've got you!</Headline>
            </Inline>
            <p className="balance pt-4 leading-7">
              Whether you're stuck, curious, or just want to say hi, join us in
              our{' '}
              <Link href="https://reservix.slack.com/archives/C02727BNZ3J">
                Slack channel
              </Link>{' '}
              (internal only) or head over to our{' '}
              <Link href="/resources/get-in-touch">Get in Touch</Link> page. We
              promise we don't bite—and we'll get back to you as quickly as
              possible.
            </p>
          </Card>
        </BlurFade>
        <BlurFade className="col-span-2" inView delay={0.3}>
          <Card variant="image">
            <div className="size-full bg-[url(/us.jpg)] bg-[length:100%_auto] bg-center" />
          </Card>
        </BlurFade>
        <BlurFade className="col-span-2" inView delay={0.4}>
          <Card variant="lowered">
            <Inline space={2} alignY="center">
              <ContributeIcon className="size-8" />
              <Headline level="3">Contribute to Marigold!</Headline>
            </Inline>
            <p className="balance pt-4 leading-7">
              Got a great idea or a request? We love to here it! Take a peek at
              our{' '}
              <Link href="/getting-started/governance-process">
                contribution guide
              </Link>{' '}
              first to keep things tidy.
            </p>
          </Card>
        </BlurFade>
        <BlurFade className="col-span-3" inView delay={0.5}>
          <Card variant="lowered">
            <Inline space={2} alignY="center">
              <BugIcon className="size-8" />
              <Headline level="3">Oops, found a bug?</Headline>
            </Inline>
            <p className="balance pt-4 leading-7">
              Oh no, a bug! Don't worry, we've got a plan for that. Head to our
              <Link href="https://reservix.atlassian.net/servicedesk/customer/portal/77">
                support portal
              </Link>{' '}
              (internal only), tell us all the gory details (screenshots
              welcome!), and we'll get it sorted.
            </p>
          </Card>
        </BlurFade>
      </div>

      {/* Links */}
      <div>
        <Headline level={4}>The essentials, just a click away</Headline>
        <p className="balance leading-7">
          Design in Figma, develop in Storybook, and contribute on GitHub — all
          right here.
        </p>
        <div className="grid grid-cols-3 gap-6 pt-6 *:flex *:items-stretch">
          <BlurFade inView delay={0.2}>
            <Card variant="lowered"></Card>
          </BlurFade>
          <BlurFade inView delay={0.3}>
            <Card variant="lowered"></Card>
          </BlurFade>
          <BlurFade inView delay={0.4}>
            <Card variant="lowered"></Card>
          </BlurFade>
        </div>
      </div>
    </div>
  </main>
);

export default Page;

/**
 * teams can focus on building great products, without worrying ...
 */

/** testimonials 

 

Links:

Github, Figma, Storybook, ui kit
 * 
 * 
 */
