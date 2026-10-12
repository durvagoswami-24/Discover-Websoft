import { useState } from "react";

// Predefined list of countries with their international dial codes, for
// use in phone number inputs so people don't have to type their country
// code manually. Sorted with India first (primary market), then
// alphabetically by country name.
//
// Kept inline in this file (rather than a separate data file) so this
// component has no cross-file dependency to place correctly.
const COUNTRY_CODES = [
  { name: "India", dialCode: "+91", iso: "IN" },
  { name: "Afghanistan", dialCode: "+93", iso: "AF" },
  { name: "Albania", dialCode: "+355", iso: "AL" },
  { name: "Algeria", dialCode: "+213", iso: "DZ" },
  { name: "Argentina", dialCode: "+54", iso: "AR" },
  { name: "Armenia", dialCode: "+374", iso: "AM" },
  { name: "Australia", dialCode: "+61", iso: "AU" },
  { name: "Austria", dialCode: "+43", iso: "AT" },
  { name: "Azerbaijan", dialCode: "+994", iso: "AZ" },
  { name: "Bahrain", dialCode: "+973", iso: "BH" },
  { name: "Bangladesh", dialCode: "+880", iso: "BD" },
  { name: "Belarus", dialCode: "+375", iso: "BY" },
  { name: "Belgium", dialCode: "+32", iso: "BE" },
  { name: "Bhutan", dialCode: "+975", iso: "BT" },
  { name: "Bolivia", dialCode: "+591", iso: "BO" },
  { name: "Bosnia and Herzegovina", dialCode: "+387", iso: "BA" },
  { name: "Brazil", dialCode: "+55", iso: "BR" },
  { name: "Brunei", dialCode: "+673", iso: "BN" },
  { name: "Bulgaria", dialCode: "+359", iso: "BG" },
  { name: "Cambodia", dialCode: "+855", iso: "KH" },
  { name: "Cameroon", dialCode: "+237", iso: "CM" },
  { name: "Canada", dialCode: "+1", iso: "CA" },
  { name: "Chile", dialCode: "+56", iso: "CL" },
  { name: "China", dialCode: "+86", iso: "CN" },
  { name: "Colombia", dialCode: "+57", iso: "CO" },
  { name: "Costa Rica", dialCode: "+506", iso: "CR" },
  { name: "Croatia", dialCode: "+385", iso: "HR" },
  { name: "Cuba", dialCode: "+53", iso: "CU" },
  { name: "Cyprus", dialCode: "+357", iso: "CY" },
  { name: "Czech Republic", dialCode: "+420", iso: "CZ" },
  { name: "Denmark", dialCode: "+45", iso: "DK" },
  { name: "Dominican Republic", dialCode: "+1", iso: "DO" },
  { name: "Ecuador", dialCode: "+593", iso: "EC" },
  { name: "Egypt", dialCode: "+20", iso: "EG" },
  { name: "El Salvador", dialCode: "+503", iso: "SV" },
  { name: "Estonia", dialCode: "+372", iso: "EE" },
  { name: "Ethiopia", dialCode: "+251", iso: "ET" },
  { name: "Fiji", dialCode: "+679", iso: "FJ" },
  { name: "Finland", dialCode: "+358", iso: "FI" },
  { name: "France", dialCode: "+33", iso: "FR" },
  { name: "Georgia", dialCode: "+995", iso: "GE" },
  { name: "Germany", dialCode: "+49", iso: "DE" },
  { name: "Ghana", dialCode: "+233", iso: "GH" },
  { name: "Greece", dialCode: "+30", iso: "GR" },
  { name: "Guatemala", dialCode: "+502", iso: "GT" },
  { name: "Honduras", dialCode: "+504", iso: "HN" },
  { name: "Hong Kong", dialCode: "+852", iso: "HK" },
  { name: "Hungary", dialCode: "+36", iso: "HU" },
  { name: "Iceland", dialCode: "+354", iso: "IS" },
  { name: "Indonesia", dialCode: "+62", iso: "ID" },
  { name: "Iran", dialCode: "+98", iso: "IR" },
  { name: "Iraq", dialCode: "+964", iso: "IQ" },
  { name: "Ireland", dialCode: "+353", iso: "IE" },
  { name: "Israel", dialCode: "+972", iso: "IL" },
  { name: "Italy", dialCode: "+39", iso: "IT" },
  { name: "Jamaica", dialCode: "+1", iso: "JM" },
  { name: "Japan", dialCode: "+81", iso: "JP" },
  { name: "Jordan", dialCode: "+962", iso: "JO" },
  { name: "Kazakhstan", dialCode: "+7", iso: "KZ" },
  { name: "Kenya", dialCode: "+254", iso: "KE" },
  { name: "Kuwait", dialCode: "+965", iso: "KW" },
  { name: "Kyrgyzstan", dialCode: "+996", iso: "KG" },
  { name: "Laos", dialCode: "+856", iso: "LA" },
  { name: "Latvia", dialCode: "+371", iso: "LV" },
  { name: "Lebanon", dialCode: "+961", iso: "LB" },
  { name: "Libya", dialCode: "+218", iso: "LY" },
  { name: "Lithuania", dialCode: "+370", iso: "LT" },
  { name: "Luxembourg", dialCode: "+352", iso: "LU" },
  { name: "Malaysia", dialCode: "+60", iso: "MY" },
  { name: "Maldives", dialCode: "+960", iso: "MV" },
  { name: "Malta", dialCode: "+356", iso: "MT" },
  { name: "Mexico", dialCode: "+52", iso: "MX" },
  { name: "Moldova", dialCode: "+373", iso: "MD" },
  { name: "Mongolia", dialCode: "+976", iso: "MN" },
  { name: "Montenegro", dialCode: "+382", iso: "ME" },
  { name: "Morocco", dialCode: "+212", iso: "MA" },
  { name: "Myanmar", dialCode: "+95", iso: "MM" },
  { name: "Nepal", dialCode: "+977", iso: "NP" },
  { name: "Netherlands", dialCode: "+31", iso: "NL" },
  { name: "New Zealand", dialCode: "+64", iso: "NZ" },
  { name: "Nicaragua", dialCode: "+505", iso: "NI" },
  { name: "Nigeria", dialCode: "+234", iso: "NG" },
  { name: "North Korea", dialCode: "+850", iso: "KP" },
  { name: "North Macedonia", dialCode: "+389", iso: "MK" },
  { name: "Norway", dialCode: "+47", iso: "NO" },
  { name: "Oman", dialCode: "+968", iso: "OM" },
  { name: "Pakistan", dialCode: "+92", iso: "PK" },
  { name: "Panama", dialCode: "+507", iso: "PA" },
  { name: "Papua New Guinea", dialCode: "+675", iso: "PG" },
  { name: "Paraguay", dialCode: "+595", iso: "PY" },
  { name: "Peru", dialCode: "+51", iso: "PE" },
  { name: "Philippines", dialCode: "+63", iso: "PH" },
  { name: "Poland", dialCode: "+48", iso: "PL" },
  { name: "Portugal", dialCode: "+351", iso: "PT" },
  { name: "Qatar", dialCode: "+974", iso: "QA" },
  { name: "Romania", dialCode: "+40", iso: "RO" },
  { name: "Russia", dialCode: "+7", iso: "RU" },
  { name: "Rwanda", dialCode: "+250", iso: "RW" },
  { name: "Saudi Arabia", dialCode: "+966", iso: "SA" },
  { name: "Senegal", dialCode: "+221", iso: "SN" },
  { name: "Serbia", dialCode: "+381", iso: "RS" },
  { name: "Singapore", dialCode: "+65", iso: "SG" },
  { name: "Slovakia", dialCode: "+421", iso: "SK" },
  { name: "Slovenia", dialCode: "+386", iso: "SI" },
  { name: "South Africa", dialCode: "+27", iso: "ZA" },
  { name: "South Korea", dialCode: "+82", iso: "KR" },
  { name: "Spain", dialCode: "+34", iso: "ES" },
  { name: "Sri Lanka", dialCode: "+94", iso: "LK" },
  { name: "Sudan", dialCode: "+249", iso: "SD" },
  { name: "Sweden", dialCode: "+46", iso: "SE" },
  { name: "Switzerland", dialCode: "+41", iso: "CH" },
  { name: "Syria", dialCode: "+963", iso: "SY" },
  { name: "Taiwan", dialCode: "+886", iso: "TW" },
  { name: "Tajikistan", dialCode: "+992", iso: "TJ" },
  { name: "Tanzania", dialCode: "+255", iso: "TZ" },
  { name: "Thailand", dialCode: "+66", iso: "TH" },
  { name: "Tunisia", dialCode: "+216", iso: "TN" },
  { name: "Turkey", dialCode: "+90", iso: "TR" },
  { name: "Turkmenistan", dialCode: "+993", iso: "TM" },
  { name: "Uganda", dialCode: "+256", iso: "UG" },
  { name: "Ukraine", dialCode: "+380", iso: "UA" },
  { name: "United Arab Emirates", dialCode: "+971", iso: "AE" },
  { name: "United Kingdom", dialCode: "+44", iso: "GB" },
  { name: "United States", dialCode: "+1", iso: "US" },
  { name: "Uruguay", dialCode: "+598", iso: "UY" },
  { name: "Uzbekistan", dialCode: "+998", iso: "UZ" },
  { name: "Venezuela", dialCode: "+58", iso: "VE" },
  { name: "Vietnam", dialCode: "+84", iso: "VN" },
  { name: "Yemen", dialCode: "+967", iso: "YE" },
  { name: "Zambia", dialCode: "+260", iso: "ZM" },
  { name: "Zimbabwe", dialCode: "+263", iso: "ZW" },
];

// Dial codes sorted longest-first so a value like "+971 50..." matches
// "+971" before the shorter "+9" style prefixes could falsely match.
const SORTED_BY_LENGTH = [...COUNTRY_CODES].sort(
  (a, b) => b.dialCode.length - a.dialCode.length
);

// Best-effort split of a combined "+91 98765 43210" style string into
// its dial code and local number parts.
function splitPhoneValue(value) {
  if (!value) return { dialCode: "+91", localNumber: "" };
  const match = SORTED_BY_LENGTH.find((c) => value.startsWith(c.dialCode));
  if (match) {
    return {
      dialCode: match.dialCode,
      localNumber: value.slice(match.dialCode.length).trim(),
    };
  }
  return { dialCode: "+91", localNumber: value };
}

// A phone number field with a predefined country-code dropdown, so
// people select their country instead of typing a dial code by hand.
// Emits a single combined string via onChange, e.g. "+91 98765 43210".
//
// Also enforces a minimum digit count on the local number (10 by
// default, matching Indian mobile numbers) and shows an inline error
// once the person has typed something and left the field. Parent forms
// that need to block submission on an invalid number can pass
// `onValidityChange(isValid)`.
//
// variant="underline" matches the Get Quote modal's minimal input style;
// variant="boxed" matches the bordered inputs used in guest checkout forms.
export default function PhoneInput({
  value = "",
  onChange,
  onValidityChange,
  required = false,
  variant = "boxed",
  placeholder = "Phone number",
  minDigits = 10,
}) {
  // Parsed once from the initial `value` (e.g. a logged-in user's saved
  // phone number) via the lazy initializer -- after that, this component
  // owns the value itself, so later prop changes don't re-parse it.
  const [{ dialCode, localNumber }, setPhoneParts] = useState(() =>
    splitPhoneValue(value)
  );
  const [touched, setTouched] = useState(false);

  const digitCount = localNumber.replace(/\D/g, "").length;
  const isValid = digitCount >= minDigits;
  const showError = touched && localNumber.length > 0 && !isValid;

  function emit(nextDialCode, nextLocalNumber) {
    setPhoneParts({ dialCode: nextDialCode, localNumber: nextLocalNumber });
    onChange(`${nextDialCode} ${nextLocalNumber}`.trim());
    if (onValidityChange) {
      const nextDigitCount = nextLocalNumber.replace(/\D/g, "").length;
      onValidityChange(nextDigitCount >= minDigits);
    }
  }

  const isUnderline = variant === "underline";

  const baseSelectClasses = isUnderline
    ? "border-b bg-transparent pb-2 pr-1 text-[15px] text-[#202020] outline-none"
    : "rounded-lg border bg-white px-2 py-2 text-[13px] text-[#202020] outline-none";

  const baseInputClasses = isUnderline
    ? "flex-1 border-b bg-transparent pb-2 text-[15px] text-[#202020] outline-none placeholder:text-[#8a7a55]"
    : "flex-1 rounded-lg border bg-white px-3 py-2 text-[13px] text-[#202020] outline-none placeholder:text-[#8a7c5c]";

  const borderClasses = showError
    ? isUnderline
      ? "border-[#E53935] focus:border-[#E53935]"
      : "border-[#E53935] focus:border-[#E53935]"
    : isUnderline
    ? "border-[#C9A968] focus:border-[#202020]"
    : "border-[#E7CF99] focus:border-[#F5A623]";

  const selectClasses = `${baseSelectClasses} ${borderClasses}`;
  const inputClasses = `${baseInputClasses} ${borderClasses}`;

  return (
    <div>
      <div className="flex gap-2">
        <select
          value={dialCode}
          onChange={(e) => {
            emit(e.target.value, localNumber);
          }}
          className={selectClasses}
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.iso} value={c.dialCode}>
              {c.iso} {c.dialCode}
            </option>
          ))}
        </select>

        <input
          type="tel"
          required={required}
          value={localNumber}
          onChange={(e) => {
            emit(dialCode, e.target.value);
          }}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className={inputClasses}
        />
      </div>

      {showError && (
        <p className="mt-1 text-[11.5px] font-medium text-[#E53935]">
          Please enter at least {minDigits} digits.
        </p>
      )}
    </div>
  );
}
