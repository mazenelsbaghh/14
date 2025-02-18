import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  Settings,
  Brain,
  Home,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'الرئيسية', to: '/', icon: Home },
  { name: 'المساعد الذكي', to: '/ai-assistant', icon: Brain },
  { name: 'القضايا', to: '/cases', icon: Briefcase },
  { name: 'العملاء', to: '/clients', icon: Users },
  { name: 'المستندات', to: '/documents', icon: FileText },
  { name: 'التقويم', to: '/calendar', icon: Calendar },
  { name: 'الفواتير', to: '/billing', icon: CreditCard },
  { name: 'الإعدادات', to: '/settings', icon: Settings },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-72 flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="flex h-20 items-center px-6 border-b border-slate-700/50">
        <h1 className="text-2xl font-bold font-tajawal">المحامي الذكي</h1>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-150 ease-in-out',
                  isActive
                    ? 'bg-slate-700/50 text-white'
                    : 'text-slate-300 hover:bg-slate-700/30 hover:text-white'
                )
              }
            >
              <Icon className="ml-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-base font-medium text-slate-300 rounded-lg hover:bg-slate-700/30 hover:text-white transition-colors duration-150 ease-in-out"
        >
          <LogOut className="ml-3 h-5 w-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
