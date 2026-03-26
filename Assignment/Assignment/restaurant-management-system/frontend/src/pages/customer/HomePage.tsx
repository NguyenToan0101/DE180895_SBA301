import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { restaurantApi,menuItemApi, branchApi } from '@/api'
import type { RestaurantDTO, MenuItemDTO,BranchDTO } from '@/types/dto'
//HomePage
export default function HomePage() {
  const { slug } = useParams<{ slug?: string }>()
  const [restaurant, setRestaurant] = useState<RestaurantDTO | null>(null)
  const [branches, setBranches] = useState<BranchDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItemDTO[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const restaurantSlug = slug || 'default'
        
        try {
          const restaurantData = await restaurantApi.getBySlug(restaurantSlug)
          setRestaurant(restaurantData)
          
          const branchesData = await branchApi.getByPublicRestaurant(restaurantData.restaurantId)
          setBranches(branchesData)
          const menuResponse = await menuItemApi.getAllByRestaurant(restaurantData.restaurantId)
                    setMenuItems(menuResponse.data.result || [])
                    console.log('Menu',menuResponse.data.result)
        } catch (err) {
          console.error('Error fetching restaurant:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const navigateTo = (path: string) => {
    if (slug) {
      return `/${slug}${path}`
    }
    return path
  }

  const restaurantName = restaurant?.name || 'LUMIÈRE'
  const restaurantDescription = restaurant?.description || 'Experience a symphony of seasonal flavors served in an atmosphere of pure sophistication.'
  const restaurantPhone = restaurant?.restaurantPhone || 'N/A'
  const restaurantEmail = restaurant?.email || 'N/A'
  
  return (
    <div className="customer-theme dark bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={navigateTo('/home')} ><div className="flex items-center gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">restaurant</span>
            </div>
            <h2 className="text-slate-100 text-xl font-bold tracking-widest">{restaurantName}</h2>
          </div></Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link to={slug ? `/${slug}/home` : '/home'} className="text-slate-100 hover:text-primary text-sm font-medium transition-colors">Home</Link>
            <Link to={slug ? `/${slug}/reservations` : '/reservations'} className="text-slate-100 hover:text-primary text-sm font-medium transition-colors">Reservations</Link>
            <a href={slug ? `/${slug}/menu` : '/menu'} className="text-slate-100 hover:text-primary text-sm font-medium transition-colors">Menu</a>
            <a href="#" className="text-slate-100 hover:text-primary text-sm font-medium transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-6">
            <Link to={navigateTo('/reservations')} className="hidden sm:flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all">
              Book Now
            </Link>
            {/* <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-primary/20" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAiOgEqohQsk5k_CZWwTHb05xpYZERL9tIaWeMXzexkFlioYAbgSGrrCmtubYeOLrU6aMWKZ0Ayp_YomlMFhsX5Cz7H6x9O9gYBOlyR0DwXsxgqytrPkK_Cbm8cPb5iSrDyKHfnBk222XmlKWxXNFWpUBmRU053GK4d-5XOW4d1SVdWk26TdxayJi5Wiia3_-CPzpcs1VPOiyHDsUdEzdsUZadeckdQkgTK5YhcSoD-ZCxL2xmVIiSSQZUXGRiKXMZ3sl78u6IC0Mc")'}}></div> */}
          </div>
        </div>
      </header>
      
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/40 to-background-dark z-10"></div>
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCedfJYcCgEckrl9XByGkW8WXxhknt7j5G3bhEiUfdQwSzW_YhTj3VOfEZfkyR7tfDwfMC5QgL4NGKDufekDXqQW8wL8RH17jBXJIkqhpfGsMejWFAYlF8oa2VR8mHiL9LCs2v6olsO67XNu5Qgf-7kN1uIm-avgUwEZ-_OTgvQG8f-MnbP_nsBUY40m4HixJfqFHii_zWj2u-C-tglUVNon1n-QNlEowOUmPAGwQJVLB6JFtvEYMgGuhVE53WjBJx9RhRM1IBA684")'}}></div>
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <span className="text-accent-gold tracking-[0.3em] text-xs font-bold uppercase mb-6 block">Michelin Starred Excellence</span>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-8">
              Artistry on Every <span className="text-primary italic">Plate.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              {restaurantDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={navigateTo('/reservations')} className="w-full sm:w-auto min-w-[200px] h-14 bg-primary text-white rounded-lg font-bold text-base hover:scale-105 transition-transform flex items-center justify-center">
                Secure a Table
              </Link>
              <Link to={navigateTo('/menu')} className="w-full sm:w-auto min-w-[200px] h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center">
                View Menu
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-white/50 text-3xl">expand_more</span>
          </div>
        </section>

        {/* Signature Experience */}
        <section className="py-24 px-6 lg:px-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-3">The Signature Menu</h2>
                <h3 className="text-4xl md:text-5xl font-bold dark:text-white leading-tight">Masterpieces crafted by Chef de Cuisine</h3>
              </div>
              <Link to={navigateTo('/menu')} className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                EXPLORE FULL MENU <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {menuItems.filter(item => item.isBestSeller).slice(0, 3).map(item => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                    <div className="absolute inset-0 bg-background-dark/20 group-hover:bg-background-dark/0 transition-all duration-500"></div>
                    <Link to={navigateTo('/menu')} ><img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.media?.url || 'https://via.placeholder.com/400x500'} /></Link>
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">{item.price} VND</div>
                  </div>
                  <h4 className="text-xl font-bold dark:text-white mb-2 group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Branches Section */}
        {branches.length > 0 && (
          <section className="py-20 px-6 lg:px-20 bg-slate-900 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Visit Us</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">Our Locations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map(branch => (
                  <div key={branch.branchId} className="bg-slate-800 rounded-xl p-8 border border-primary/20 hover:border-primary transition-all">
                    <h4 className="text-xl font-bold text-white mb-4">{branch.address}</h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-1">phone</span>
                        <p className="text-slate-300">{branch.branchPhone}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-1">schedule</span>
                        <p className="text-slate-300">{branch.openingTime} - {branch.closingTime}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-1">people</span>
                        <p className="text-slate-300">{branch.staffCount} staff members</p>
                      </div>
                    </div>
                    <Link to={navigateTo('/reservations')} className="w-full py-3 bg-primary text-white rounded-lg font-bold text-center hover:bg-primary/90 transition-all">
                      Reserve
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reservation CTA Section */}
        <section className="customer-theme dark bg-background-light dark:bg-background-dark py-20 px-6">
          <div className="customer-theme dark max-w-7xl mx-auto bg-primary/10 rounded-3xl overflow-hidden border border-primary/20 flex flex-col lg:flex-row">
            <div className="p-10 lg:p-20 lg:w-1/2">
              <h2 className="text-4xl font-bold dark:text-white mb-6">Reserve Your Private Table</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                Experience an evening of unparalleled service and culinary delight. We recommend booking at least 14 days in advance for weekend service.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 mb-2"><strong>Contact us:</strong></p>
                  <p className="text-slate-400">Phone: {restaurantPhone}</p>
                  <p className="text-slate-400">Email: {restaurantEmail}</p>
                </div>
                <Link to={navigateTo('/reservations')} className="w-full h-14 bg-primary text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center">
                  Start Reservation
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px]">
              <img alt="Dining Interior" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCGTmdlJZxA5ys-Lpb0gZWTZB3t0lyvxB47pjyCfTpmdtTeXW7BNyOCq01fA8ldELOJVzQ3Fb0OHO7Z7LpDE0tYqF70fQSOuNgfoKSS56FlQwaOaAlamYW3MTczldOauY6tkD_RaNWGtSqIJlA7lDN_5A6vwpwTSJrh4VBGrpozpTnEzOBpZDvMjYVD3wjqEzJr4675qDpj0AOSIijOoStNqXIIvTyvslFSQF8LjuBomVfHVIFqLmriVcV0rvbc3x6suV8GzFIYHc" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark border-t border-primary/10 py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">restaurant</span>
              <p className="text-slate-100 font-bold text-lg">{restaurantName}</p>
            </div>
            <p className="text-slate-400 text-sm">{restaurantDescription}</p>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold mb-6">Menu</h4>
            <div className="space-y-2">
              <Link to={navigateTo('/menu')} className="text-slate-400 hover:text-primary text-sm transition-colors block">Full Menu</Link>
              <Link to={navigateTo('/menu')} className="text-slate-400 hover:text-primary text-sm transition-colors block">Wine Selection</Link>
              <Link to={navigateTo('/menu')} className="text-slate-400 hover:text-primary text-sm transition-colors block">Special Events</Link>
            </div>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold mb-6">Reservations</h4>
            <div className="space-y-2">
              <Link to={navigateTo('/reservations')} className="text-slate-400 hover:text-primary text-sm transition-colors block">Book a Table</Link>
              <a href={`tel:${restaurantPhone}`} className="text-slate-400 hover:text-primary text-sm transition-colors block">Call: {restaurantPhone}</a>
              <a href={`mailto:${restaurantEmail}`} className="text-slate-400 hover:text-primary text-sm transition-colors block">Email: {restaurantEmail}</a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="size-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined text-base">public</span>
              </a>
              <a href="#" className="size-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined text-base">mail</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8">
          <p className="text-center text-slate-500 text-xs">© 2024 {restaurantName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
      


