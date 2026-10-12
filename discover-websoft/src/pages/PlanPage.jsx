import { useState } from "react";
import { useParams } from "react-router-dom";
import { services } from "../data/services";

import ProductHero from "../components/plans/ProductHero";
import QuotationRenderer from "../components/plans/quotation/QuotationRenderer";
import OrderSummary from "../components/plans/OrderSummary";
import RelatedServices from "../components/plans/RelatedServices";
import FAQ from "../components/FAQ";
import QuotationSection from "../components/plans/QuotationSection";

// FAQ Assets
import bubbleBg from "../assets/bubble.png";
import headingBg from "../assets/heading-bg.png";
import girlImg from "../assets/faq.png";
import faqOpenIcon from "../assets/faq-icon1.png";
import faqCloseIcon from "../assets/faq-icon.png";
import SocialMediaOrderSummary from "../components/plans/SocialMediaOrderSummary";
import CTABanner from "../components/plans/CTABanner";
export default function PlanPage() {
 const {
  serviceSlug,
  subServiceSlug,
  planSlug,
} = useParams();

 // ==========================================================
// FIND CURRENT SERVICE
// ==========================================================

const service = services.find(
  (item) => item.slug === serviceSlug
);

// ==========================================================
// FIND SUB SERVICE (IF EXISTS)
// ==========================================================

const subService = subServiceSlug
  ? service?.subServices?.find(
      (item) => item.slug === subServiceSlug
    )
  : null;

// ==========================================================
// FIND PLAN
// ==========================================================

const plan = subService
  ? subService.plans.find(
      (item) => item.slug === planSlug
    )
  : service?.plans.find(
      (item) => item.slug === planSlug
    );

// ==========================================================
// ACTIVE DATA SOURCE
// ==========================================================

const currentService = subService || service;

  // ==========================================================
  // Selected Plan State
  // Used by ProductHero, QuotationTable & OrderSummary
  //
  // NOTE: hooks must run unconditionally on every render (React's
  // Rules of Hooks), so they're declared here -- before the
  // not-found checks below -- using `plan` which may still be
  // undefined at this point. The not-found guards that follow
  // return early only after every hook has already been called.
  // ==========================================================
  const [selectedPlan, setSelectedPlan] = useState(plan);
const [quotationSelection, setQuotationSelection] = useState(() => {
  const values = {};

  // Only initialize selections if quotationStructure exists
 if (currentService?.quotationStructure) {
  currentService.quotationStructure.forEach((item) => {
      values[item.id] = plan?.slug;
    });
  }

  return {
    selections: values,

   extraPages: 1,

products: 1,

mockups: 1,

quantity: 1,

selectedPlan: plan?.slug,
  };
});

if (!service) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Service Not Found
      </h1>
    </div>
  );
}

if (subServiceSlug && !subService) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Sub Service Not Found
      </h1>
    </div>
  );
}

if (!plan) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Plan Not Found
      </h1>
    </div>
  );
}

  return (
    <>
      {/* ======================================================
            PRODUCT HERO
      ======================================================= */}
     <ProductHero
  service={currentService}
  plan={selectedPlan}
  serviceSlug={serviceSlug}
  subServiceSlug={subServiceSlug}
  serviceTitle={service.title}
/>
      {/* ======================================================
            QUOTATION TABLE
      ======================================================= */}
    {currentService.quotationType && (
  <QuotationSection
   summary={
 currentService.quotationType === "social" ? (
    <SocialMediaOrderSummary
      quotationSelection={quotationSelection}
      quotationMeta={{
        serviceSlug,
        subServiceSlug,
        planSlug: selectedPlan.slug,
        planName: selectedPlan.name,
        quotationType: currentService.quotationType,
      }}
    />
  ) : (
    <OrderSummary
      service={currentService}
      plan={selectedPlan}
      quotationSelection={quotationSelection}
      quotationMeta={{
        serviceSlug,
        subServiceSlug,
        planSlug: selectedPlan.slug,
        planName: selectedPlan.name,
        quotationType: currentService.quotationType,
      }}
    />
  )
}
  >
    <QuotationRenderer
      service={currentService}
      selectedPlan={selectedPlan}
      quotationSelection={quotationSelection}
      setQuotationSelection={setQuotationSelection}
    />
  </QuotationSection>
)}
      {/* ======================================================
            ORDER SUMMARY
      ======================================================= */}
      {/* <OrderSummary
        selectedPlan={selectedPlan}
      /> */}

      {/* ======================================================
            RELATED SERVICES
      ======================================================= */}
      <RelatedServices
        currentService={service}
      />

      {/* ======================================================
            FAQ
      ======================================================= */}
      {(selectedPlan.faq || currentService.faq) && (
        <FAQ
          faqData={selectedPlan.faq || currentService.faq}
          bubbleBg={bubbleBg}
          headingBg={headingBg}
          girlImg={girlImg}
          faqOpenIcon={faqOpenIcon}
          faqCloseIcon={faqCloseIcon}
        />
      )}

      {/* ======================================================
            CTA BANNER (optional, data-driven)
      ======================================================= */}
      {currentService.ctaBanner && (
        <CTABanner {...currentService.ctaBanner} />
      )}
    </>
  );
}
