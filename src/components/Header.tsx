import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex flex-1">
          <div className="flex w-full max-w-lg items-center">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="البحث في القضايا، العملاء، أو المستندات..."
              className="mr-3 block w-full rounded-lg border-0 py-2.5 text-slate-900 bg-slate-50 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 text-base"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-6 space-x-reverse">
          <button className="relative rounded-full bg-slate-50 p-2 text-slate-400 hover:text-slate-500 transition-colors duration-150">
            <Bell className="h-6 w-6" />
            <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              ٣
            </span>
          </button>
          
          <div className="flex items-center">
            <button className="flex items-center rounded-full bg-slate-50 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <span className="sr-only">فتح قائمة المستخدم</span>
              <User className="h-8 w-8 rounded-full p-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
