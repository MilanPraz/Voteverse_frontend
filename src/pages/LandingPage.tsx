import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Lock, Globe, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* SVG BG */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Secure and Transparent E-Voting
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8">
            Empowering democracy through cutting-edge technology
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Link to={"/register"}>Register</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white bg-transparent border-white hover:bg-white hover:text-emerald-600"
            >
              <Link to={"/login"}>Login to Vote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle className="h-10 w-10 text-emerald-500" />,
                title: "Easy to Use",
                description: "Intuitive interface for all voters",
              },
              {
                icon: <Lock className="h-10 w-10 text-emerald-500" />,
                title: "Secure Voting",
                description: "State-of-the-art encryption",
              },
              {
                icon: <Globe className="h-10 w-10 text-emerald-500" />,
                title: "Accessible Anywhere",
                description: "Vote from home or abroad",
              },
              {
                icon: <BarChart className="h-10 w-10 text-emerald-500" />,
                title: "Real-time Results",
                description: "Instant and transparent counting",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                description: "Create your secure voter account",
              },
              {
                step: "2",
                title: "Verify",
                description: "Confirm your identity and eligibility",
              },
              {
                step: "3",
                title: "Vote",
                description: "Cast your ballot securely online",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 text-white text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of citizens already using our secure e-voting
            platform.
          </p>
          <Button
            size="lg"
            className="bg-white text-emerald-600 hover:bg-emerald-100"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">E-Voting System</h3>
              <p className="mt-2 text-sm text-gray-400">
                Empowering democracy through technology
              </p>
            </div>
            <nav className="w-full md:w-auto">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © 2024 E-Voting System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
