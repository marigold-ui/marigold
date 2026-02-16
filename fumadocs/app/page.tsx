import { baseOptions } from '@/lib/layout.shared';
import Link from 'fumadocs-core/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import Image from 'next/image';
import { AnimatedShinyText } from '@/ui/ShinyText';
import { getLatestPost } from './(home)/_components/LatestPost';

const Page = () => {
  const latestPost = getLatestPost();
  return (
    <HomeLayout {...baseOptions()}>
      <main className="grid justify-center px-(--page-padding-md) xl:px-(--page-padding-xl)">
        {/* Hero */}
        <div className="grid h-[calc(100dvh-var(--page-header-height))] max-w-(--breakpoint-lg) place-items-center text-center">
          <div className="-mx-(--page-padding-md) md:mx-0">
            <div className="flex justify-center">
              {latestPost && (
                <Link
                  href={latestPost.slug}
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs transition-all ease-in hover:bg-slate-200 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  <AnimatedShinyText className="transition ease-out dark:text-neutral-400">
                    🚀✨ View latest updates!
                  </AnimatedShinyText>
                </Link>
              )}
            </div>
            <h1 className="pt-0.5 text-6xl font-extrabold text-balance lg:text-8xl">
              Cultivate beautiful user interfaces
            </h1>
            <p className="text-muted-foreground pt-4 pb-10 text-lg leading-relaxed font-light text-balance lg:pt-10 lg:pb-24 lg:text-xl">
              Marigold is a design system for Reservix, providing components and
              tools that let product teams focus on core challenges while
              creating unified, accessible applications.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                className="bg-text-primary rounded-xs px-8 py-3.5 leading-none text-white transition-all hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                href="/getting-started/installation"
              >
                <span className="inline-block translate-y-px">Get started</span>
              </Link>
              <Link
                className="border-text-primary rounded-xs border-2 px-8 py-3.5 leading-none hover:bg-slate-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                href="/components/application/provider"
              >
                Explore Components
              </Link>
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
    </HomeLayout>
  );
};

export default Page;
