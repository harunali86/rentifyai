import Link from "next/link";
import { Home, ShieldCheck, PhoneCall, Building2, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-[#2A2A33] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Categorized Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#006AFF]" /> Real Estate
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/search?search=Pune" className="hover:text-[#006AFF] font-medium transition-colors">
                  Pune Prime Estates (KP & Baner)
                </Link>
              </li>
              <li>
                <Link href="/search?search=Koregaon%20Park" className="hover:text-[#006AFF] transition-colors">
                  Koregaon Park Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/search?search=Mumbai" className="hover:text-[#006AFF] transition-colors">
                  Mumbai Luxury Homes
                </Link>
              </li>
              <li>
                <Link href="/search?search=Worli" className="hover:text-[#006AFF] transition-colors">
                  Worli Sea-Facing Flats
                </Link>
              </li>
              <li>
                <Link href="/search?search=Gurgaon" className="hover:text-[#006AFF] transition-colors">
                  Gurgaon Golf Course Penthouses
                </Link>
              </li>
              <li>
                <Link href="/search?search=Bengaluru" className="hover:text-[#006AFF] transition-colors">
                  Bengaluru Tech Mansions
                </Link>
              </li>
              <li>
                <Link href="/search?search=Goa" className="hover:text-[#006AFF] transition-colors">
                  Goa Private Pool Villas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-[#006AFF]" /> Rentals & Leases
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/search?listingType=RENT" className="hover:text-[#006AFF] transition-colors">
                  All Rental Listings
                </Link>
              </li>
              <li>
                <Link href="/search?search=Bandra&listingType=RENT" className="hover:text-[#006AFF] transition-colors">
                  Bandra Designer Apartments
                </Link>
              </li>
              <li>
                <Link href="/search?search=Powai&listingType=RENT" className="hover:text-[#006AFF] transition-colors">
                  Powai Lakefront Condos
                </Link>
              </li>
              <li>
                <Link href="/agent/post" className="hover:text-[#006AFF] transition-colors">
                  List Your Property For Rent
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#006AFF] transition-colors">
                  Verified Landlords Only
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#006AFF]" /> Valuation & Tools
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/search" className="hover:text-[#006AFF] transition-colors">
                  RentifyAI Zestimate®
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#006AFF] transition-colors">
                  Price History & RERA Verification
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#006AFF] transition-colors">
                  Neighborhood School Scores
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#006AFF] transition-colors">
                  Home Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#006AFF] transition-colors">
                  1-Year Market Forecast
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-[#006AFF]" /> About & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-[#006AFF] transition-colors">
                  About RentifyAI
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-[#006AFF] transition-colors">
                  Find Premier Agents
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#006AFF] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#006AFF] transition-colors">
                  Careers (We're Hiring!)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#006AFF] transition-colors">
                  Privacy & Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand & Equal Housing Statement */}
        <div className="py-8 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#006AFF] text-white p-2 rounded-lg font-black text-xl tracking-wider">
              R
            </div>
            <div>
              <span className="font-extrabold text-xl text-gray-900 tracking-tight">Rentify<span className="text-[#006AFF]">AI</span></span>
              <p className="text-xs text-gray-500">India's Premier Real Estate & Valuation Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 max-w-xl text-center md:text-right">
            <span>
              🏠 <strong>Equal Housing Opportunity:</strong> All properties advertised on RentifyAI are subject to national fair housing regulations.
            </span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 RentifyAI, Inc. All rights reserved. Zestimate® and Rentify® are trademarks of RentifyAI India.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Use</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-gray-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
