import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { IoLogoGooglePlaystore, IoLogoApple } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 pb-8 border-b border-gray-800">
          <button className="flex items-center justify-center gap-3 py-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">Talk to Us</span>
          </button>

          <button className="flex items-center justify-center gap-3 py-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="font-medium">Write to Us</span>
          </button>

          <button className="flex items-center justify-center gap-3 py-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">Help Center</span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4 text-white">General</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/stores" className="hover:text-white transition">Stores</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Policies</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/return" className="hover:text-white transition">Return & Refund</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/products" className="hover:text-white transition">All</Link></li>
              <li><Link to="/products?category=Pastries" className="hover:text-white transition">Pastry</Link></li>
              <li><Link to="/products?category=Cakes" className="hover:text-white transition">Cake</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Pastry</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/products?category=Pastries" className="hover:text-white transition">Puff</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Cake</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/products?category=Cakes" className="hover:text-white transition">Wedding cake</Link></li>
              <li><Link to="/products?category=Cakes" className="hover:text-white transition">Cake</Link></li>
            </ul>
          </div>
        </div>

        {/* Social & Apps */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-800">
          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/cravella" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/cravella" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.youtube.com/@cravella" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Download On</h4>
            <div className="flex gap-4">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                <IoLogoGooglePlaystore size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-sm font-semibold">App Now</div>
                </div>
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                <IoLogoApple size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>Copyright © 2026 CRAVELLA All Rights Reserved.</p>
          <p className="mt-2">
            Developed with ❤️ by <a href="https://techsaint.io" className="text-white hover:underline">Techsaint</a>
          </p>
        </div>
      </div>
    </footer>
  );
}