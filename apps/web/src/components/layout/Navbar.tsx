import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Menu, Search, User } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                                <Home className="text-white w-5 h-5" />
                            </div>
                            <span className="font-bold text-xl text-brand-900 tracking-tight">RentifyAI</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/buy" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                            Buy
                        </Link>
                        <Link href="/rent" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                            Rent
                        </Link>
                        <Link href="/agents" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                            Find Agents
                        </Link>
                        <Link href="/commercial" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                            Commercial
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Search className="w-4 h-4" />
                            Search
                        </Button>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <Button variant="ghost" size="sm">Log In</Button>
                        <Button variant="premium" size="sm">Post Property</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Button variant="ghost" size="icon">
                            <Menu className="w-6 h-6 text-gray-700" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
