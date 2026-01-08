export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              DE180895
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Nguyen Cong Toan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="hover:text-white transition">Home</li>
              <li className="hover:text-white transition">Products</li>
              <li className="hover:text-white transition">About</li>
              <li className="hover:text-white transition">Contact</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <span className="cursor-pointer hover:text-white transition">
                GitHub
              </span>
              <span className="cursor-pointer hover:text-white transition">
                LinkedIn
              </span>
              <span className="cursor-pointer hover:text-white transition">
                Email
              </span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700" />

        {/* Bottom */}
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} DE180895. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
