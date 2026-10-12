import WebsiteQuotation from "./WebsiteQuotation";
import EcommerceQuotation from "./EcommerceQuotation";
import SocialMediaQuotation from "./SocialMediaQuotation";
import QuantityQuotation from "./QuantityQuotation";
import PostBundleQuotation from "./PostBundleQuotation";
// import SubCategoryQuotation from "./SubCategoryQuotation";

export default function QuotationRenderer({
  service,
  selectedPlan,
  quotationSelection,
  setQuotationSelection,
}) {
  switch (service.quotationType) {
    case "website":
      return (
        <WebsiteQuotation
          service={service}
          selectedPlan={selectedPlan}
          quotationSelection={quotationSelection}
          setQuotationSelection={setQuotationSelection}
        />
      );

    case "social":
      return (
        <SocialMediaQuotation
          service={service}
          selectedPlan={selectedPlan}
          quotationSelection={quotationSelection}
          setQuotationSelection={setQuotationSelection}
        />
      );

    case "ecommerce":
      return (
        <EcommerceQuotation
          service={service}
          selectedPlan={selectedPlan}
          quotationSelection={quotationSelection}
          setQuotationSelection={setQuotationSelection}
        />
      );

    case "quantity":
      return (
        <QuantityQuotation
          service={service}
          selectedPlan={selectedPlan}
          quotationSelection={quotationSelection}
          setQuotationSelection={setQuotationSelection}
        />
      );

    case "bundle":
      return (
        <PostBundleQuotation
          service={service}
          selectedPlan={selectedPlan}
          quotationSelection={quotationSelection}
          setQuotationSelection={setQuotationSelection}
        />
      );

    default:
      return (
        <div className="rounded-3xl border border-red-300 bg-red-50 p-10 text-center">
          No quotation layout found for:
          <br />
          <strong>{service.title}</strong>
        </div>
      );
  }
}