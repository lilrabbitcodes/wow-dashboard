import React from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activePage: string;
    onNavigate: (page: string) => void;
}

const BrandLogo = () => (
    <div className="flex items-center justify-center h-20 border-b border-brand-blue-mid/20">
        <div className="text-white text-2xl font-bold tracking-wider">
            <span className="text-brand-orange">WOW</span> AUDIT
        </div>
    </div>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center px-6 py-4 text-gray-200 hover:bg-brand-blue-mid/40 transition-colors duration-200 text-left ${active ? 'bg-brand-orange text-white' : ''}`}>
        {icon}
        <span className="mx-4 font-medium">{label}</span>
    </button>
);

const OverviewIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
);

const AnalyticsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
);

const CalendarIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

const DevChecklistIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activePage, onNavigate }) => {

    const handleNavigate = (page: string) => {
        onNavigate(page);
        onClose(); // Close sidebar on navigation in mobile view
    };

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/60 z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside className={`fixed top-0 left-0 h-full bg-brand-blue-dark text-white w-64 transform transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex-shrink-0`}>
        <BrandLogo />
        <nav className="mt-8">
            <NavItem 
                icon={<OverviewIcon />} 
                label="Overview" 
                active={activePage === 'overview'} 
                onClick={() => handleNavigate('overview')}
            />
            <NavItem 
                icon={<AnalyticsIcon />} 
                label="Analytics" 
                active={activePage === 'analytics'} 
                onClick={() => handleNavigate('analytics')}
            />
            <NavItem 
                icon={<CalendarIcon />} 
                label="Mth Oct" 
                active={activePage === 'october'}
                onClick={() => handleNavigate('october')}
            />
            <NavItem 
                icon={<DevChecklistIcon />} 
                label="Dev Checklist" 
                active={activePage === 'devChecklist'}
                onClick={() => handleNavigate('devChecklist')}
            />
        </nav>
      </aside>
    </>
  );
};
