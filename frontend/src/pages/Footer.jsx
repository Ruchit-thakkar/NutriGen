import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 🟢 Imported AuthContext
import {
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth(); // 🟢 Get user to check role

  // 🟢 SMART LINK LOGIC
  const dashboardLink = user?.role === "admin" ? "/admin" : "/dashboard";
  const dashboardText = user?.role === "admin" ? "Admin Portal" : "Dashboard";

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden font-sans selection:bg-teal-500/30">
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50"></div>

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Tagline (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              to="/"
              className="text-3xl font-extrabold flex items-center gap-2 tracking-tight group mb-6"
            >
              {/* Replaced 🧬 emoji with logo.png */}
              <img
                src="/logo.png"
                alt="NutriGen Logo"
                className="h-10 w-auto transition-transform group-hover:scale-110 duration-300"
              />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                NutriGen
              </span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-8 max-w-sm">
              Clinical-grade nutrition, powered by AI. Stop guessing your macros
              and start optimizing your life with data-driven daily plans.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink
                href="https://x.com/RuchitThakkar19?t=DZIJbM4jTt6F45kdkKAKrQ&s=09"
                icon={<Twitter size={20} />}
              />
              <SocialLink
                href="https://www.instagram.com/ruchit1744"
                icon={<Instagram size={20} />}
              />
              <SocialLink
                href="https://github.com/Ruchit-thakkar"
                icon={<Github size={20} />}
              />
              <SocialLink
                href="https://www.linkedin.com/in/ruchit-thakkar-38ab37379"
                icon={<Linkedin size={20} />}
              />
            </div>
          </div>

          {/* Links Columns (Span 2 columns each) */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-50 font-bold tracking-widest uppercase text-xs mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/features">Features</FooterLink>

              {/* 🟢 DYNAMIC DASHBOARD LINK */}
              <FooterLink to={dashboardLink}>{dashboardText}</FooterLink>

              <FooterLink to="/pricing">Pricing</FooterLink>

              {/* 🟢 HIDE "GET STARTED" IF ALREADY LOGGED IN */}
              {!user && <FooterLink to="/register">Get Started</FooterLink>}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-slate-50 font-bold tracking-widest uppercase text-xs mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Newsletter / CTA (Spans 4 columns) */}
          <div className="lg:col-span-4">
            <h4 className="text-slate-50 font-bold tracking-widest uppercase text-xs mb-6">
              Stay Updated
            </h4>
            <p className="text-slate-400 text-sm font-medium mb-4">
              Get the latest updates on AI nutrition, new features, and health
              tips.
            </p>
            <form
              className="relative group flex"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail
                  size={18}
                  className="text-slate-500 group-focus-within:text-teal-400 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-11 pr-32 py-3.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-medium placeholder:text-slate-600"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-teal-500 hover:bg-teal-400 text-slate-900 px-4 rounded-xl font-bold flex items-center gap-1 transition-colors"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm font-medium text-slate-500">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
              <span>© {currentYear} NutriGen. All rights reserved.</span>
              <span className="hidden md:inline text-slate-700">|</span>
              <span>
                Made by{" "}
                <a
                  href="https://github.com/Ruchit-thakkar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
                >
                  Ruchit ( DevNex )
                </a>
              </span>
            </div>

            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></div>
            <Link
              to="/privacy"
              className="hover:text-teal-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-lg max-w-md text-center md:text-right">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
              <span className="text-amber-500">Medical Disclaimer:</span>{" "}
              NutriGen is not a medical device. Consult your physician before
              making significant changes to your diet or exercise routine.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* --- Helper Components --- */

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-slate-400 font-medium hover:text-teal-400 transition-colors flex items-center gap-2 group"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="group-hover:translate-x-1 transition-transform">
        {children}
      </span>
    </Link>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-slate-900 hover:border-teal-500 transition-all duration-300 hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default Footer;
