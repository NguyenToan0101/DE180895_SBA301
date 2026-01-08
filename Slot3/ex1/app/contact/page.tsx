export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Contact Page
        </h1>
        <p className="mt-6 text-lg text-gray-300">
    ...
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose This Platform?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            title="Fast Performance"
            desc="Optimized with Next.js App Router and Server Components."
          />
          <FeatureCard
            title="Modern UI"
            desc="Beautiful UI built with Tailwind CSS & reusable components."
          />
          <FeatureCard
            title="Scalable Backend"
            desc="Spring Boot microservices ready for enterprise scale."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white/5 py-20">
        <div className="mx-auto max-w-4xl text-center px-6">
          <h2 className="text-3xl font-bold">
            Ready to start your project?
          </h2>
          <p className="mt-4 text-gray-300">
            Build faster, cleaner, and more scalable applications today.
          </p>
          <button className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200 transition">
            Start Now
          </button>
        </div>
      </section>

    </main>
  )
}

/* Feature Card Component */
function FeatureCard({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-gray-300">{desc}</p>
    </div>
  )
}
