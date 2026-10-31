import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Համակարգչի համար (hover)
  const [activeMobileSub, setActiveMobileSub] = useState(null); // Բջջայինի համար (click)



  const menuItems = {
    logo: {
      url: "/",
      src: "/src/assets/logo.png",
      alt: "LetsGo Logo",
      title: "LetsGo",
    },
    menu: [
      { title: "Գլխավոր", url: "/" },
      {
        title: "Տեսական մաս",
        url: "#",
        items: [
          { title: "Ճանապարհային երթևեկության կանոններ", url: "/rules" },
        ],
      },
      {
        title: "Քննական թեստեր",
        url: "#",
        items: [
          { title: "Հոգեբանական թեստեր", url: "/psychological" },
          { title: "Քննական հարցեր ըստ թեմաների", url: "/topics" },
          { title: "Քննական թեստեր", url: "/tickets" },
          { title: "Փորձնական քննություն", url: "/exam-simulation" },
        ],
      },
      { title: "Հրահանգիչներ", url: "/instructors" },
      { title: "Մեր մասին", url: "/about" },
      { title: "Հետադարձ կապ", url: "/contact" },
    ]
  };

  const toggleMobileSub = (index) => {
    setActiveMobileSub(activeMobileSub === index ? null : index);
  };

  
  return (
    // <nav className="relative z-40">
    <header>
      <nav className="sticky top-0 shadow-md z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            
            {/* Լոգոտիպի Հատվածը */}
            <div className="flex-shrink-0 flex items-center">
              <Link to={menuItems.logo.url} className="flex items-center gap-3">
                <img 
                  className="h-12 w-auto object-contain" 
                  src={menuItems.logo.src} 
                  alt={menuItems.logo.alt} 
                />
              </Link>
            </div>

            {/* ՀԱՄԱԿԱՐԳՉԻ ՄԵՆՅՈՒ (Desktop) */}
            <div className="hidden md:flex space-x-1 items-center">
              {menuItems.menu.map((menu, index) => (
                <div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => menu.items && setOpenDropdown(index)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menu.items ? (
                    <button className="px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-gray-50 hover:text-blue-600 transition flex items-center gap-1">
                      {menu.title}
                      <svg className={`w-4 h-4 transform transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link to={menu.url} className="px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-gray-50 hover:text-blue-600 transition">
                      {menu.title}
                    </Link>
                  )}

                  {menu.items && openDropdown === index && (
                    <div className="absolute left-0 w-72 mt-0 bg-white border border-gray-100 rounded-2xl shadow-xl py-2">
                      {menu.items.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={subItem.url}
                          className="block px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* BURGER BUTTON (Բացում է կողային սլայդը) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-gray-100 hover:text-blue-600 transition"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* 📱 ԲՋՋԱՅԻՆ ՍԼԱՅԴԵՐ ՄԵՆՅՈՒ (Side Drawer) */}
        <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
          
          {/* Կիսաթափանցիկ Ֆոն (Overlay) */}
          <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-40' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Բուն Մենյուի Բլոկը, որը սլայդվում է ձախից (width: 80% կամ ավել) */}
          <div className={`fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-(--my-dark-green) shadow-2xl h-full flex flex-col transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            {/* Սլայդի Վերևի Հատվածը (Լոգո + Փակելու կոճակ) */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2">
                <img className="h-9 w-auto" src={menuItems.logo.src} alt={menuItems.logo.alt} />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-red-500 transition"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Մենյուի Ցուցակը (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {menuItems.menu.map((menu, index) => (
                <div key={index} className="border-b border-gray-50 last:border-none py-1">
                  {menu.items ? (
                    <>
                      <button
                        onClick={() => toggleMobileSub(index)}
                        className="w-full flex justify-between items-center px-4 py-3 text-base font-bold text-gray-700 rounded-xl hover:bg-gray-50 text-left"
                      >
                        <span>{menu.title}</span>
                        <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${activeMobileSub === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeMobileSub === index && (
                        <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50 rounded-xl mt-1">
                          {menu.items.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              to={subItem.url}
                              className="block px-3 py-3 text-sm font-semibold text-gray-600 hover:text-blue-600 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={menu.url}
                      className="block px-4 py-3 text-base font-bold text-gray-700 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {menu.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </nav>
    </header>
    
  );
}
