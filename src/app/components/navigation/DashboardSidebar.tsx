import { ReactNode } from 'react';
import {
  Home,
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
import { routes } from '../../router/routes';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../../types/user';

interface DashboardSidebarProps {
  currentPage: string;
  user: UserProfile;
  className?: string;
  signOut: () => Promise<void>;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

export function DashboardSidebar({
  currentPage,
  user,
  className = '',
  signOut,
}: DashboardSidebarProps) {


  let navItems: NavItem[] = []
  if (user.role === 'student') {
    navItems = [
      { label: 'Tableau de bord', icon: <Home className="w-5 h-5" />, path: routes.StudentDashboard.path },
      { label: 'Mon parcours', icon: <GraduationCap className="w-5 h-5" />, path: routes.StudentModules.path },
      { label: 'Suivi des offres', icon: <Search className="w-5 h-5" />, path: routes.StudentJobTracking.path },
      { label: 'Mon CV', icon: <FileText className="w-5 h-5" />, path: routes.StudentCv.path },
      { label: 'Cas pratiques', icon: <Briefcase className="w-5 h-5" />, path: routes.StudentPractical.path },
      { label: 'Mon profil', icon: <User className="w-5 h-5" />, path: routes.StudentProfile.path },
    ];
  }
  else if (user.role === 'admin') {
    navItems = [
      { label: 'Vue d\'ensemble', icon: <BarChart3 className="w-5 h-5" />, path: routes.AdminDashboard.path },
      { label: 'Validation CVs', icon: <CheckSquare className="w-5 h-5" />, path: routes.AdminCvReview.path },
      { label: 'Correction exercices', icon: <ClipboardCheck className="w-5 h-5" />, path: routes.AdminExerciceReview.path },
      { label: 'Gestion modules', icon: <FileText className="w-5 h-5" />, path: routes.AdminModules.path },
      { label: 'Support offres', icon: <MessageSquare className="w-5 h-5" />, path: routes.AdminOfferSupport.path },
      { label: 'Suivi étudiants', icon: <Users className="w-5 h-5" />, path: routes.AdminStudentList.path },
      { label: 'Mon profil', icon: <UserCog className="w-5 h-5" />, path: routes.AdminProfile.path },
      { label: 'Paramètres', icon: <Settings className="w-5 h-5" />, path: routes.AdminSettings.path },
    ];
  }

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Check if current page is a module page
  const isModulePage = currentPage.includes(routes.StudentModules.path);
  const isStatisticPage = currentPage.includes(routes.AdminStudentList.path);

  // Determine if a nav item should be active
  const isNavItemActive = (itemPath: string) => {
    // Quand on est dans un module, "Mon parcours" doit être actif
    if (isModulePage && itemPath === routes.StudentModules.path) {
      return true;
    }
    else if (isStatisticPage && itemPath === routes.AdminStudentList.path) {
      return true;
    }
    return currentPage === itemPath;
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
              {user.role === 'student' ? 'Espace Étudiant' : 'Espace Admin'}
            </p>
          </div>
        </div>
        <div className="p-3 bg-secondary rounded-xl">
          <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-muted-foreground">
            {user.role === 'student' ? 'Étudiant' : 'Administrateur'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <button
              className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200 text-left
              ${isNavItemActive(item.path)
                  ? 'bg-primary text-foreground font-medium'
                  : 'text-foreground hover:bg-secondary'
                }
            `}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <button
          onClick={() => { setIsMobileOpen(false); signOut(); }}
          className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-border z-50 lg:hidden flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="size-7 bg-[#1e1548] rounded-[10px] flex items-center justify-center">
            <span className="text-white font-bold text-xs" style={{ fontFamily: 'Poppins' }}>T</span>
          </div>
          <span className="font-semibold text-sm text-[#1E1548]">TBEE</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5 text-[#1E1548]" /> : <Menu className="w-5 h-5 text-[#1E1548]" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-[55] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, mobile toggle */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-background border-r border-border
          flex flex-col z-[60]
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