import { Center, Inline, Link } from '@/ui';

export const Page = () => (
  <main className="grid justify-center px-[--page-padding-md] xl:px-[--page-padding-xl]">
    <div className="h-[calc(100dvh-var(--page-header-height))] max-w-screen-lg pt-28 text-center">
      <h1 className="text-balance text-8xl font-extrabold">
        Cultivate beautiful user interfaces
      </h1>
      <p className="text-text-primary/60 text-balance pb-24 pt-10 text-xl font-light leading-relaxed">
        Marigold is a design system for Reservix, providing components and tools
        that let product teams focus on core challenges while creating unified,
        accessible applications.
      </p>
      <Center>
        <Inline space={6}>
          <Link
            variant="primary"
            size="large"
            href="/introduction/getting-started"
          >
            Get started
          </Link>
          <Link variant="secondary" size="large" href="/components">
            Component
          </Link>
        </Inline>
      </Center>
    </div>

    <div className="grid max-w-screen-md">
      <h2 className="text-4xl font-extrabold">Built to be accessible</h2>
      <p>
        Marigold is designed with accessibility in mind from the ground up. It
        leverages React Aria for screen reader and keyboard navigation support,
        ensuring your applications are ready for every user.
      </p>
    </div>
    <div className="grid max-w-screen-md">
      <h2 className="text-4xl font-extrabold">Complex layouts, simplified.</h2>
      <p>
        Ready-to-use layout components make it easy to build pages of any
        complexity. These flexible tools help teams quickly create responsive,
        structured designs, streamlining the process without the need for
        complex CSS
      </p>
    </div>
    <div className="grid max-w-screen-md">
      <h2 className="text-4xl font-extrabold">
        One system, endless brand styles.
      </h2>
      <p>
        All components are built to adapt seamlessly to different brands and
        visual identities. With flexible theming options, teams can easily
        tailor components to match unique brand colors, styles, and design
        needs, ensuring a cohesive experience across diverse products.
      </p>
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
