import { Card, Center, Headline, Inline, Link, Stack } from '@/ui';
import type { PropsWithChildren } from 'react';
import Image from 'next/image';
import { BlurFade } from '@/ui/BlurFade';
import { AnimatedShinyText } from '@/ui/ShinyText';
import { getLatestPost } from '@/ui/blog/LatestPost';
import { SiteHeader } from './_components/SiteHeader';
import { AccessibiltySection } from './_components/landingpage/AccessibiltySection';
import { CollaborationSection } from './_components/landingpage/CollaborationSection';
import { LayoutSection } from './_components/landingpage/LayoutSection';
import { SupportGrid } from './_components/landingpage/SupportGrid';
import { SystemSection } from './_components/landingpage/SystemSection';

// Components
// ---------------
const SectionHeadline = ({ children }: PropsWithChildren) => (
  <h2 className="text-5xl font-extrabold tracking-tight text-balance md:pb-2 md:text-6xl">
    {children}
  </h2>
);

const SectionContent = ({ children }: PropsWithChildren) => (
  <p className="text-lg text-pretty">{children}</p>
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
const Page = () => {
  const latestPost = getLatestPost();
  return (
    <>
      <SiteHeader />
      <main className="grid justify-center px-(--page-padding-md) xl:px-(--page-padding-xl)">
        {/* Hero */}
        <div className="grid h-[calc(100dvh-var(--page-header-height))] max-w-(--breakpoint-lg) place-items-center text-center">
          <div className="-mx-(--page-padding-md) md:mx-0">
            <Center>
              <Link href={`/${latestPost.slug}`} variant="shiny" size="xsmall">
                <AnimatedShinyText className="transition ease-out">
                  🚀✨ View latest updates!
                </AnimatedShinyText>
              </Link>
            </Center>
            <h1 className="pt-0.5 text-6xl font-extrabold text-balance lg:text-8xl">
              Cultivate beautiful user interfaces
            </h1>
            <p className="text-text-primary/60 pt-4 pb-10 text-lg leading-relaxed font-light text-balance lg:pt-10 lg:pb-24 lg:text-xl">
              Marigold is a design system for Reservix, providing components and
              tools that let product teams focus on core challenges while
              creating unified, accessible applications.
            </p>
            <Inline space={6} alignX="center">
              <Link variant="primary" size="large" href="/getting-started">
                <span className="inline-block translate-y-px">Get started</span>
              </Link>
              <Link variant="secondary" size="large" href="/components">
                Explore Components
              </Link>
            </Inline>
          </div>
        </div>

        {/* Features */}
        <div className="grid max-w-(--breakpoint-lg) gap-[30vh] pt-[5vw] md:gap-[40vh]">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-last grid gap-4 md:order-first">
              <SectionHeadline>Built to be accessible</SectionHeadline>
              <SectionContent>
                Marigold is designed with accessibility in mind from the ground
                up. It leverages React Aria for screen reader and keyboard
                navigation support, ensuring your applications are ready for
                every user.
              </SectionContent>
              <SectionLink href="/foundations/accessibility">
                Learn more about accessibility
              </SectionLink>
            </div>
            <AccessibiltySection />
          </div>
          <div className="grid grid-cols-1 items-center gap-24 md:grid-cols-5 md:gap-16">
            <CollaborationSection />
            <div className="grid gap-4 md:col-span-2">
              <SectionHeadline>Made for collaboration</SectionHeadline>
              <SectionContent>
                Designers and developers iterate together using shared tools
                like design tokens, guidelines, UI kit, and Storybook. No
                handoff is necessary. Instead, collaboration throughout the
                project reduces friction and fosters a unified vision.
              </SectionContent>
              <SectionLink href="/foundations">
                Deep dive into the foundations
              </SectionLink>
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-8">
            <div className="order-last grid gap-4 md:order-first md:col-span-5">
              <SectionHeadline>Complex layouts, simplified.</SectionHeadline>
              <SectionContent>
                Ready-to-use layout components make it easy to build pages of
                any complexity. These flexible tools help teams quickly create
                responsive, structured designs, streamlining the process without
                the need for complex CSS.
              </SectionContent>
              <SectionLink href="/foundations/layouts">
                Learn more about layouts
              </SectionLink>
            </div>
            <LayoutSection />
          </div>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-8 md:gap-16">
            <SystemSection />
            <div className="grid gap-4 md:col-span-5">
              <SectionHeadline>One system, flexible styles.</SectionHeadline>
              <SectionContent>
                All components are built to adapt seamlessly to different brands
                and visual identities. With flexible theming options, teams can
                easily tailor components to match unique brands, styles, and
                design needs.
              </SectionContent>
              <SectionLink href="/getting-started/installation#theming">
                Explore theming possibilities
              </SectionLink>
            </div>
          </div>

          {/* Support */}
          <SupportGrid />

          {/* Links */}
          <div>
            <Headline level={3}>The essentials, just a click away</Headline>
            <p className="balance text-text-primary-muted leading-7">
              Design in Figma, develop in Storybook, contribute on GitHub or
              prototype in Stackblitz — all right here.
            </p>
            <div className="grid gap-6 pt-6 md:grid-cols-4">
              <BlurFade inView delay={0.2}>
                <Link
                  variant="ghost"
                  href="https://www.figma.com/design/NbTUW9zk15nN8idlfsEttS/%F0%9F%8C%BC-Marigold-CORE?node-id=1618-14089&t=cW3eN0w9yRw4nHRi-1"
                >
                  <Card variant="lowered" size="full">
                    <Stack space={4} alignX="center" stretch>
                      <Image
                        className="fill-text-primary h-20"
                        width={100}
                        height={80}
                        alt="Figma Logo"
                        src="/figma.svg"
                      />
                      <p className="text-text text-center text-sm">
                        Explore the UI Kit in Figma
                      </p>
                    </Stack>
                  </Card>
                </Link>
              </BlurFade>
              <BlurFade inView delay={0.3}>
                <Link
                  variant="ghost"
                  href="https://marigold-latest.vercel.app/"
                >
                  <Card variant="lowered" size="full">
                    <Stack space={4} alignX="center" stretch>
                      <Image
                        className="h-20"
                        width={100}
                        height={80}
                        alt="Storybook Logo"
                        src="/storybook-black.svg"
                      />
                      <p className="text-center text-sm">
                        Test components in Storybook
                      </p>
                    </Stack>
                  </Card>
                </Link>
              </BlurFade>
              <BlurFade inView delay={0.4}>
                <Link
                  variant="ghost"
                  href="https://github.com/marigold-ui/marigold"
                >
                  <Card variant="lowered" size="full">
                    <Stack space={4} alignX="center" stretch>
                      <Image
                        className="size-20"
                        width={100}
                        height={80}
                        alt="GitHub Logo"
                        src="/github.svg"
                      />
                      <p className="text-center text-sm">
                        Peek under the hood in GitHub
                      </p>
                    </Stack>
                  </Card>
                </Link>
              </BlurFade>
              <BlurFade inView delay={0.5}>
                <Link variant="ghost" href="https://play.marigold-ui.io/">
                  <Card variant="lowered" size="full">
                    <Stack space={4} alignX="center" stretch>
                      <Image
                        className="h-20"
                        width={100}
                        height={80}
                        alt="Stackblitz Logo"
                        src="/stackblitz.svg"
                      />
                      <p className="text-center text-sm">
                        Start building in StackBlitz
                      </p>
                    </Stack>
                  </Card>
                </Link>
              </BlurFade>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-48 pb-5 opacity-15">
          Build by
          <Image
            width={140}
            height={200}
            src="/reservix.svg"
            alt="Reservix GmbH"
          />
        </div>
      </main>
    </>
  );
};

export default Page;
