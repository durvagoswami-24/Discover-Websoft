import {
  HiFilter,
  HiSearch,
  HiChevronDown,
} from "react-icons/hi";
export default function FilterSidebar({
  search,
  setSearch,
  categories,
  selectedCategories,
  toggleCategory,
  price,
  setPrice,
}) {
  return (
    <div
                className="
                  sticky
                  top-[110px]
                  w-[305px]
                  shrink-0
                  self-start
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-white
                  bg-gradient-to-b
                  from-[#FFEAB8]
                  to-[#FFD78F]
                  p-5
                  shadow-[0_10px_22px_rgba(0,0,0,.08)]
                "
              >
                {/* Filters heading */}
                <div className="flex items-center justify-between">
                  <h3 className="text-[22px] font-bold text-[#202020]">
                    Filters
                  </h3>
                  <HiFilter className="text-[20px] text-[#202020]" />
                </div>
    
                {/* Search input */}
                <div className="relative mt-7">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search services..."
                    className="
                      h-[46px]
                      w-full
                      rounded-[12px]
                      border
                      border-[#F5CB81]
                      bg-white/55
                      pl-4
                      pr-12
                      text-[15px]
                      outline-none
                      placeholder:text-[#202020]
                      focus:border-[#F5A623]
                    "
                  />
                  <HiSearch
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-[19px]
                      text-[#202020]
                    "
                  />
                </div>
    
                {/* Categories checklist */}
                <div className="mt-8">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="text-[18px] font-semibold">Categories</h4>
                    <HiChevronDown />
                  </div>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="h-4 w-4 accent-[#F5A623]"
                        />
                        <span className="text-[15px] text-[#444]">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
    
                {/* Price range slider */}
                <div className="mt-10">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="text-[18px] font-semibold">Price Range</h4>
                    <HiChevronDown />
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[14px] font-medium">₹0</span>
                    <span className="text-[14px] font-medium">
                      ₹{price.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="h-[6px] w-full cursor-pointer accent-[#F5A623]"
                  />
    
                  {/* Apply button */}
                  <button
                    className="
                      mt-8
                      h-[52px]
                      w-full
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
                    Apply
                  </button>
                </div>
              </div>
    );
}