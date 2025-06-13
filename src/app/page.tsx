import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroImage from "@/components/HeroImage";
import { Heart, Sparkles, Shield, Trophy, Users, ArrowRight, Star, PlayCircle, Lock, Gift, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit">
                  <Heart className="w-3 h-3 mr-2" />
                  Next-Gen Dating Platform
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Where Authentic{" "}
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Connections
                  </span>{" "}
                  Begin
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                  Create your unique personality profile, discover truly compatible matches, and get rewarded for meaningful connections. Dating reimagined.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/browse">
                    <span>Discover Matches</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/profile">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">25K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">8.2K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Love Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">94%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Match Quality</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <HeroImage />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How VibeMate Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three simple steps to discover meaningful connections and earn rewards for authentic relationships
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <Badge variant="outline" className="w-fit mx-auto mb-4">01</Badge>
                <CardTitle className="text-xl">Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Build your unique digital identity with our personality assessment. Your profile showcases the real you and what you're looking for.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <Badge variant="outline" className="w-fit mx-auto mb-4">02</Badge>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Our advanced compatibility system analyzes personality traits, interests, and values to connect you with truly compatible people.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <Badge variant="outline" className="w-fit mx-auto mb-4">03</Badge>
                <CardTitle className="text-xl">Rewarded Connections</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  When high-compatibility matches lead to meaningful conversations, both parties receive rewards. Quality connections, quality rewards.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personality Types Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Your Dating Personality
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every profile combines multiple personality dimensions to create your unique relationship blueprint
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { emoji: "🌙", name: "Mysterious", description: "Intriguing depth" },
              { emoji: "🔥", name: "Passionate", description: "Intense energy" },
              { emoji: "💫", name: "Playful", description: "Joyful spirit" },
              { emoji: "🍷", name: "Sophisticated", description: "Refined taste" },
              { emoji: "🌊", name: "Adventurous", description: "Free spirit" },
              { emoji: "🌹", name: "Romantic", description: "Heart-centered" }
            ].map((trait, index) => (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {trait.emoji}
                  </div>
                  <CardTitle className="text-sm font-semibold mb-1">{trait.name}</CardTitle>
                  <CardDescription className="text-xs">{trait.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Why VibeMate is Different
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Experience dating built on authenticity, privacy, and meaningful rewards for genuine connections.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Verified Authenticity</h4>
                    <p className="text-gray-600 dark:text-gray-300">Advanced verification ensures genuine profiles and meaningful connections</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Rewards</h4>
                    <p className="text-gray-600 dark:text-gray-300">Earn rewards when your high-compatibility matches bloom into real connections</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h4>
                    <p className="text-gray-600 dark:text-gray-300">You own your data and control who sees what with decentralized privacy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">💎</div>
                      <CardTitle className="text-lg mb-2">Own Your Profile</CardTitle>
                      <CardDescription className="text-sm">Your identity, your control</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">🎯</div>
                      <CardTitle className="text-lg mb-2">Smart Matching</CardTitle>
                      <CardDescription className="text-sm">AI-powered compatibility</CardDescription>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-6 mt-12">
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">💰</div>
                      <CardTitle className="text-lg mb-2">Earn Rewards</CardTitle>
                      <CardDescription className="text-sm">Quality connections pay</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">🚀</div>
                      <CardTitle className="text-lg mb-2">Future Ready</CardTitle>
                      <CardDescription className="text-sm">Next-gen technology</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Love Stories That Inspire
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real connections from real people who found their perfect match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I never believed in 'perfect matches' until VibeMate. The compatibility was spot-on!",
                name: "Sarah & Mike",
                subtitle: "Together 8 months",
                emoji: "💕"
              },
              {
                quote: "Finally, a dating app that rewards genuine connections. We earned our first date!",
                name: "Alex & Jordan",
                subtitle: "Engaged last month",
                emoji: "💍"
              },
              {
                quote: "The personality matching is incredible. We understood each other from day one.",
                name: "Emma & David",
                subtitle: "Planning a future",
                emoji: "🏠"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6">{testimonial.emoji}</div>
                  <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.subtitle}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary-600 via-secondary-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Find Your Person?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands discovering meaningful connections. Your story starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-gray-100 shadow-lg">
                <Link href="/profile">
                  <span>Start Your Journey</span>
                  <Heart className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/browse">
                  Browse Profiles
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>Trusted by 25,000+ members worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-primary-400" />
                <span className="text-2xl font-bold">VibeMate</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Where authentic connections begin. Find love, build relationships, own your journey.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link href="/browse" className="block text-gray-400 hover:text-white transition-colors">Browse Profiles</Link>
                <Link href="/profile" className="block text-gray-400 hover:text-white transition-colors">Create Profile</Link>
                <Link href="/matches" className="block text-gray-400 hover:text-white transition-colors">My Matches</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">How it Works</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Safety Guide</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Built with 💜 by Agnij</p>
                <p>© 2025 VibeMate. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
