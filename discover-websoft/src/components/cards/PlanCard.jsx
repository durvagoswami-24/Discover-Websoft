import { Link } from "react-router-dom";

export default function PlanCard({
  serviceSlug,
  plan,
}) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[20px]
        border
        border-[#F4D493]
        bg-gradient-to-b
        from-[#FFEFCF]
        to-[#FFE2A7]
        p-[22px]
        shadow-[0_10px_24px_rgba(0,0,0,.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_32px_rgba(0,0,0,.12)]
      "
    >
      {/* Plan Image */}
      <div
        className="
          flex
          justify-center
          rounded-[16px]
          bg-white
          p-4
          shadow-[0_5px_12px_rgba(0,0,0,.08)]
        "
      >

        <Link to={`/service/${serviceSlug}/${plan.slug}`}>
        <img
          src={plan.image}
          alt={plan.name}
          draggable="false"
          className="
            h-[150px]
            object-contain
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
        </Link>
      </div>

      {/* Plan Name */}
      <Link to={`/service/${serviceSlug}/${plan.slug}`}>
      <h3
        className="
          mt-6
          text-center
          text-[24px]
          font-bold
          text-[#000]
        "
      >
        {plan.name}
      </h3>
      </Link>
      {/* Price */}
      <p
        className="
          mt-3
          text-center
          text-[28px]
          font-extrabold
          text-[#F5A623]
        "
      >
        ₹{plan.price.toLocaleString()}
      </p>

      {/* ADD Button */}
      <Link
        to={`/service/${serviceSlug}/${plan.slug}`}
        className="
          mx-auto
          mt-7
          flex
          h-[48px]
          w-[170px]
          items-center
          justify-center
          rounded-[12px]
          bg-[#202020]
          text-[16px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-[#F5A623]
        "
      >
        ADD
      </Link>
    </div>
  );
}