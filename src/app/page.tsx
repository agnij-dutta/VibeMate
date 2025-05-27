import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroImage from "@/components/HeroImage";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="gradient-bg animate-gradient text-white py-20">
          <div className="container-custom flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn">
              <h1 className="font-bold mb-4">
                Find Your Perfect Match on the Blockchain
              </h1>
              <p className="text-lg mb-8 text-purple-100">
                VibeMate combines the excitement of NFT collectibles with the thrill of finding your perfect match. 
                Mint your unique personality profile NFT and earn rewards for successful matches!
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/browse" 
                  className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-full font-bold transition-colors hover-glow"
                >
                  Browse Profiles
                </Link>
                <Link 
                  href="/profile" 
                  className="bg-transparent hover:bg-white/10 border-2 border-white px-6 py-3 rounded-full font-bold transition-colors"
                >
                  Create Profile
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="animate-float">
                <HeroImage />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-center mb-12 text-gray-800">How VibeMate Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Mint Your Profile NFT" 
                description="Create your unique personality profile NFT with personalized vibe combinations from 6 distinct personality types."
                icon="🎭"
                number="1"
              />
              <FeatureCard 
                title="Find Your Match" 
                description="Our smart contract calculates compatibility based on personality vibes, attraction levels, and rarity traits."
                icon="❤️"
                number="2"
              />
              <FeatureCard 
                title="Earn Rewards" 
                description="Successful matches earn ETH rewards! Matches with 70%+ compatibility trigger rewards for both parties."
                icon="💰"
                number="3"
              />
            </div>
          </div>
        </section>

        {/* Personality Types Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-center mb-12 text-gray-800">Personality Types</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <VibeCard emoji="🌙" name="Mysterious" description="Dark and alluring" color="bg-indigo-100" />
              <VibeCard emoji="🔥" name="Passionate" description="Fiery and intense" color="bg-red-100" />
              <VibeCard emoji="💫" name="Playful" description="Fun and bubbly" color="bg-yellow-100" />
              <VibeCard emoji="🍷" name="Sophisticated" description="Classy and refined" color="bg-purple-100" />
              <VibeCard emoji="🌊" name="Adventurous" description="Wild and free" color="bg-blue-100" />
              <VibeCard emoji="🌹" name="Romantic" description="Sweet and loving" color="bg-pink-100" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-bg animate-gradient text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-lg mb-8 text-purple-100">
              Join thousands of users discovering meaningful connections on the blockchain.
              Mint your profile today and start your journey!
            </p>
            <Link 
              href="/profile" 
              className="bg-white text-purple-700 hover:bg-purple-100 px-8 py-4 rounded-full font-bold text-lg inline-block transition-colors hover-glow"
            >
              Create Your Profile
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">VibeMate</h3>
              <p className="text-gray-400">Find Your Perfect Match on the Blockchain</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Contract: 0xA68b3808DCf0Fd8630640018fCB96a28f497F504</p>
              <p className="text-gray-400 text-sm">© 2023 VibeMate. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description, icon, number }: { title: string; description: string; icon: string; number: string }) {
  return (
    <div className="card relative hover-lift">
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold animate-pulse-subtle">
        {number}
      </div>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function VibeCard({ emoji, name, description, color }: { emoji: string; name: string; description: string; color: string }) {
  return (
    <div className={`${color} p-6 rounded-lg text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer hover-glow`}>
      <div className="text-4xl mb-3 animate-pulse-subtle">{emoji}</div>
      <h3 className="font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
