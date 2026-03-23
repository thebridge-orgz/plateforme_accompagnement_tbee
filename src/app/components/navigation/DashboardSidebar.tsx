import { ReactNode } from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Briefcase, 
  User, 
  Settings,
  Users,
  BarChart3,
  Menu,
  X,
  CheckSquare,
  Search,
  GraduationCap,
  ClipboardCheck,
  MessageSquare,
  UserCog
} from 'lucide-react';
import { useState } from 'react';

interface DashboardSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  role: 'student' | 'admin';
  userName?: string;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  role: 'student' | 'admin' | 'both';
}

const navItems: NavItem[] = [
  // student items
  { id: 'student-dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" />, role: 'student' },
  { id: 'student-modules', label: 'Mon parcours', icon: <GraduationCap className="w-5 h-5" />, role: 'student' },
  { id: 'job-tracking', label: 'Suivi des offres', icon: <Search className="w-5 h-5" />, role: 'student' },
  { id: 'student-cv', label: 'Mon CV', icon: <FileText className="w-5 h-5" />, role: 'student' },
  { id: 'student-practical', label: 'Cas pratiques', icon: <Briefcase className="w-5 h-5" />, role: 'student' },
  { id: 'student-profile', label: 'Mon profil', icon: <User className="w-5 h-5" />, role: 'student' },
  
  // Admin items
  { id: 'admin-dashboard', label: 'Vue d\'ensemble', icon: <BarChart3 className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-cv-review', label: 'Validation CVs', icon: <CheckSquare className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-exercise-review', label: 'Correction exercices', icon: <ClipboardCheck className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-modules', label: 'Gestion modules', icon: <FileText className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-offer-support', label: 'Support offres', icon: <MessageSquare className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-tracking', label: 'Suivi étudiants', icon: <Users className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-profile', label: 'Mon profil', icon: <UserCog className="w-5 h-5" />, role: 'admin' },
  { id: 'admin-settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" />, role: 'admin' },
];

export function DashboardSidebar({
  currentPage,
  onNavigate,
  role,
  userName = 'Utilisateur',
  className = ''
}: DashboardSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredNavItems = navItems.filter(
    item => item.role === role || item.role === 'both'
  );

  // Check if current page is a module page
  const isModulePage = currentPage.startsWith('module-');
  
  // Determine if a nav item should be active
  const isNavItemActive = (itemId: string) => {
    if (itemId === 'student-modules' && isModulePage) {
      return true;
    }
    return currentPage === itemId;
  };

  const SidebarContent = () => (
    <>
      {/* Logo & User Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          {/* Logo TBEE avec bords arrondis (comme dans le Navbar) */}
          <div className="size-[32px] bg-[#1e1548] rounded-[12px] flex items-center justify-center">
            <span className="text-white font-bold text-[14px] leading-[24px]" style={{ fontFamily: 'Poppins' }}>T</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold">TBEE</h4>
            <p className="text-xs text-muted-foreground">
              {role === 'student' ? 'Espace Étudiant' : 'Espace Admin'}
            </p>
          </div>
        </div>
        <div className="p-3 bg-secondary rounded-xl">
          <p className="text-sm font-medium truncate">{userName}</p>
          <p className="text-xs text-muted-foreground">
            {role === 'student' ? 'Étudiant' : 'Administrateur'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              setIsMobileOpen(false);
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200 text-left
              ${isNavItemActive(item.id)
                ? 'bg-primary text-foreground font-medium'
                : 'text-foreground hover:bg-secondary'
              }
            `}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <button
          onClick={() => {
            onNavigate('logout');
            setIsMobileOpen(false);
          }}
          className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, mobile toggle */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-background border-r border-border
          flex flex-col z-40
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${className}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}