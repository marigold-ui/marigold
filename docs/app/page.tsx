import { Center, Inline, Link } from '@/ui';

export const Page = () => (
  <main className="grid justify-center p-[--page-padding-md] xl:p-[--page-padding-xl]">
    <div className="max-w-screen-lg py-20 text-center">
      <h1 className="text-balance bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-8xl font-extrabold text-transparent">
        Cultivate beautiful user interfaces
      </h1>
      <p className="text-text-primary/60 text-balance py-14 text-xl font-light leading-relaxed">
        Marigold is a design system for Reservix, providing components and tools
        that let product teams focus on core challenges while creating unified,
        accessible applications.
      </p>
      <Center>
        <Inline space={4}>
          <Link variant="primary" href="/introduction/getting-started">
            Get started
          </Link>
          <Link variant="secondary" href="/components">
            Component
          </Link>
        </Inline>
      </Center>
    </div>
  </main>
);

export default Page;
