import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center p-4 text-center mt-20">
                <div className="max-w-md w-full space-y-8">
                    {/* Illustration or 404 Text */}
                    <div className="relative">
                        <h1 className="text-9xl font-black text-brand-100 select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-brand-900 bg-gray-50 px-4">
                                Page Not Found
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            We couldn't find that page.
                        </h2>
                        <p className="text-gray-600">
                            The property might have been sold, removed, or the link is outdated.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Link href="/">
                            <Button size="lg" className="w-full sm:w-auto gap-2 font-bold shadow-lg shadow-brand-500/20">
                                <Home className="w-4 h-4" />
                                Go Home
                            </Button>
                        </Link>
                        <Link href="/search">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 font-bold border-gray-300 bg-white">
                                <Search className="w-4 h-4" />
                                Search Properties
                            </Button>
                        </Link>
                    </div>

                    {/* Helper Links */}
                    <div className="pt-8 border-t border-gray-200 w-full">
                        <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">
                            Popular Pages
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-600 font-semibold">
                            <Link href="/buy" className="hover:underline">Buy Home</Link>
                            <Link href="/rent" className="hover:underline">Rent Home</Link>
                            <Link href="/sell" className="hover:underline">Sell</Link>
                            <Link href="/zestimate" className="hover:underline">Zestimate</Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer minimal */}
            <footer className="py-6 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} RentifyAI. All rights reserved.
            </footer>
        </div>
    );
}
