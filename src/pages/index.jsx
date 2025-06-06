import { title } from "@/components/primitives";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Memes&nbsp;</span>
          <span className={title({ color: "violet" })}>application&nbsp;</span>
          <br />
          <span className={title()}>test task</span>
        </div>
      </section>
    </DefaultLayout>
  );
}
