import { NavLink } from "react-router-dom";

const infoSections = {
  about: [
    {
      title: "Trusted queue management",
      content:
        "Built for modern retail banking, Bank Queue simplifies customer service with digital token issuance, clear wait status, and live counter assignments.",
    },
    {
      title: "Better experience for everyone",
      bullets: [
        "Instant digital token generation for every service.",
        "Real-time queue updates with estimated wait time.",
        "Service-based routing to the right counters.",
        "Reduced physical lines and faster branch flow.",
      ],
    },
    {
      title: "Our mission",
      content:
        "To make bank visits faster, fairer, and easier by giving customers control of their queue while empowering staff with transparent service operations.",
    },
  ],
  services: [
    {
      title: "Cash transactions",
      content:
        "Fast deposit, withdrawal, and cheque services at dedicated cash counters.",
    },
    {
      title: "Account services",
      content:
        "Account opening, closure, card issuance, PIN reset, and routine account updates without long waits.",
    },
    {
      title: "Customer inquiries",
      content:
        "Balance checks, statement requests, loan questions, and general support are routed to the right specialist quickly.",
    },
    {
      title: "Queue control",
      content:
        "Smart token assignment, live counter tracking, and admin tools keep branch operations smooth and transparent.",
    },
  ],
  contact: [
    {
      title: "Reach our operations desk",
      content:
        "For support, onboarding, or service questions, contact our bank operations desk at your nearest branch or through the channels below.",
    },
  ],
};

function LandingInfoPage({ title, description, sectionKey, contactCards = [] }) {
  const sections = infoSections[sectionKey] || [];

  return (
    <section className="min-h-screen bg-[#f7f9f8] px-4 py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <NavLink to="/" className="text-xl font-semibold italic text-slate-900 hover:text-slate-700">
            Q-Mate
          </NavLink>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <NavLink to="/" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
              About
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
              Services
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
              Contact
            </NavLink>
          </nav>
        </header>

        <div className="mx-auto mt-28 w-full max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-4 text-lg text-slate-500">{description}</p>
        </div>

        <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              {section.content ? (
                <p className="mt-4 text-slate-600">{section.content}</p>
              ) : null}
              {section.bullets ? (
                <ul className="mt-4 space-y-2 text-slate-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        {contactCards.length > 0 ? (
          <div className="mx-auto mt-10 w-full max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">{card.title}</p>
                  <p className="mt-3 text-slate-700">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default LandingInfoPage;
