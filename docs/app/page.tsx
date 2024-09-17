import { Center, Inline, Link } from '@/ui';

export const Page = () => (
  <main className="grid justify-center p-[--page-padding-md] xl:p-[--page-padding-xl]">
    <div className="grid max-w-screen-lg place-items-center pt-28 text-center">
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
  </main>
);

export default Page;
