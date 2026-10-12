import { Link } from "react-router-dom";
import { services } from "../../data/services";

// Picks one representative plan from a service, regardless of whether
// it's flat (service.plans) or branching (service.subServices[].plans).
// Returns null if the service has no reachable plan yet (e.g. SEO's
// subServices always have plans, but this guards future gaps too).
function getRepresentativePlan(service) {
  if (service.plans?.length) {
    return { plan: service.plans[0], subService: null };
  }

  if (service.subServices?.length) {
    for (const subService of service.subServices) {
      if (subService.plans?.length) {
        return { plan: subService.plans[0], subService };
      }
    }
  }

  return null;
}

export default function RelatedServices({ currentService }) {
  // Exclude current service, and any service with no plan to show yet
  const relatedCards = services
    .filter((service) => service.slug !== currentService.slug)
    .map((service) => {
      const result = getRepresentativePlan(service);
      return result ? { service, ...result } : null;
    })
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="py-20 bg-[#FDF6E8]">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#D98E2B] font-semibold uppercase tracking-wider">
            Explore More
          </p>

          <h2 className="text-4xl font-bold text-[#202020] mt-3">
            Related Services
          </h2>

          <p className="text-[#202020] mt-4 max-w-2xl mx-auto">
            You may also be interested in these services to grow your
            business.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedCards.map(({ service, plan, subService }) => {
            const link = subService
              ? `/service/${service.slug}/${subService.slug}/${plan.slug}`
              : `/service/${service.slug}/${plan.slug}`;

            return (
              <Link
                key={`${service.id}-${plan.id}`}
                to={link}
                className="
                  block
                  overflow-hidden
                  rounded-[24px]
                  bg-gradient-to-b
                  from-[#FFEFCF]
                  to-[#FFE2A7]
                  p-[18px]
                  shadow-[0_12px_28px_rgba(0,0,0,.10)]
                  transition-all
                  duration-300
                  hover:-translate-y-[6px]
                "
              >
                <div className="relative">
                  <img
                    src={plan.image || service.image}
                    alt={plan.name}
                    className="h-[220px] w-full rounded-[18px] object-cover"
                  />

                  <span className="absolute left-3 top-3 rounded bg-[#202020] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F5C15C]">
                    {service.category}
                  </span>
                </div>

                <div className="pt-5">
                  <h3 className="text-[18px] font-bold text-[#202020]">
                    {plan.name}
                  </h3>

                  {plan.subtitle && (
                    <p className="mt-1 text-[13px] text-[#202020]">
                      {plan.subtitle}
                    </p>
                  )}

                  <h4 className="mt-3 text-[20px] font-bold text-[#202020]">
                    ₹{plan.price.toLocaleString()}
                    {plan.priceUnit || ""}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}