import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Layout, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CoaLink
            </div>
            <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Log in
                </Link>
                <Link href="/signup">
                    <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-200 font-medium">
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>
      </nav>

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center relative">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-blue-400 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: Advanced Analytics & Booking
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                The Bio Page Built for <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Elite Coaches
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Stop losing leads with generic link-in-bio tools. CoaLink is designed to convert followers into clients with built-in booking, video embeds, and powerful analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                    <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                        Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        Access Dashboard
                    </Button>
                </Link>
            </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<Layout className="h-8 w-8 text-blue-400" />}
                    title="Customizable Layouts"
                    description="Choose between stack or grid layouts. Customize colors, fonts, and button styles to match your personal brand perfectly."
                />
                <FeatureCard 
                    icon={<Zap className="h-8 w-8 text-purple-400" />}
                    title="Instant Booking"
                    description="Capture leads instantly. Our integrated booking modal lets clients schedule sessions without ever leaving your page."
                />
                <FeatureCard 
                    icon={<BarChart3 className="h-8 w-8 text-pink-400" />}
                    title="Deep Analytics"
                    description="Track more than just clicks. Measure conversion rates, identify your top performing content, and optimize your funnel."
                />
            </div>
        </section>

        {/* Social Proof / Footer */}
        <footer className="w-full border-t border-slate-800 bg-slate-950 py-12 text-center text-slate-500 text-sm">
            <p className="mb-4">Trusted by 1,000+ Trainers & Coaches</p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock Logos */}
                <span className="font-bold text-lg">FITNESS<span className="text-blue-500">PRO</span></span>
                <span className="font-bold text-lg">YOGA<span className="text-purple-500">LIFE</span></span>
                <span className="font-bold text-lg">COACH<span className="text-pink-500">HUB</span></span>
            </div>
            <div className="mt-12">
                © {new Date().getFullYear()} CoaLink. All rights reserved.
            </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900 group">
            <div className="mb-4 p-3 bg-slate-950 rounded-lg w-fit group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-100">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
