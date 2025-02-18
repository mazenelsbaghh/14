import React, { useState } from 'react';
import { User, Lock, Brain, CreditCard, Camera, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

interface UserSettings {
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  twoFactorEnabled: boolean;
  aiPreferences: {
    enableSuggestions: boolean;
    enableAnalysis: boolean;
    enableReminders: boolean;
  };
  subscription: {
    plan: 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'inactive';
    nextBilling: string;
  };
}

const initialSettings: UserSettings = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 555 123 4567',
  profilePicture: 'https://via.placeholder.com/150', // Replace with actual URL
  twoFactorEnabled: false,
  aiPreferences: {
    enableSuggestions: true,
    enableAnalysis: true,
    enableReminders: true,
  },
  subscription: {
    plan: 'pro',
    status: 'active',
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [currentSection, setCurrentSection] = useState<'account' | 'security' | 'ai' | 'subscription'>('account');

  const handleUpdateSettings = (section: keyof UserSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [section]: value }));
  };

  const handleUpdateAIPreferences = (preference: keyof UserSettings['aiPreferences'], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      aiPreferences: { ...prev.aiPreferences, [preference]: value },
    }));
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setCurrentSection('account')}
                className={cn(
                  'w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
                  currentSection === 'account' ? 'bg-primary-50 text-primary-700' : 'text-slate-900 hover:bg-slate-50'
                )}
              >
                <User className="ml-3 h-5 w-5" />
                Account Information
              </button>
              <button
                onClick={() => setCurrentSection('security')}
                className={cn(
                  'w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
                  currentSection === 'security' ? 'bg-primary-50 text-primary-700' : 'text-slate-900 hover:bg-slate-50'
                )}
              >
                <Lock className="ml-3 h-5 w-5" />
                Security
              </button>
              <button
                onClick={() => setCurrentSection('ai')}
                className={cn(
                  'w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
                  currentSection === 'ai' ? 'bg-primary-50 text-primary-700' : 'text-slate-900 hover:bg-slate-50'
                )}
              >
                <Brain className="ml-3 h-5 w-5" />
                AI Preferences
              </button>
              <button
                onClick={() => setCurrentSection('subscription')}
                className={cn(
                  'w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
                  currentSection === 'subscription' ? 'bg-primary-50 text-primary-700' : 'text-slate-900 hover:bg-slate-50'
                )}
              >
                <CreditCard className="ml-3 h-5 w-5" />
                Subscription
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            {currentSection === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={settings.name}
                      onChange={(e) => handleUpdateSettings('name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={settings.email}
                      onChange={(e) => handleUpdateSettings('email', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => handleUpdateSettings('phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                      Profile Picture
                    </label>
                    <input
                      type="text"
                      id="profilePicture"
                      value={settings.profilePicture}
                      onChange={(e) => handleUpdateSettings('profilePicture', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentSection === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Security Settings</h2>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-6 w-6 text-slate-400 mr-2" />
                      <h3 className="text-lg font-medium text-slate-900">Two-Factor Authentication</h3>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorEnabled}
                        onChange={(e) => handleUpdateSettings('twoFactorEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentSection === 'ai' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">AI Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900">Enable Suggestions</h3>
                      <p className="text-sm text-slate-500">Receive smart suggestions based on cases and documents</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.aiPreferences.enableSuggestions}
                        onChange={(e) => handleUpdateAIPreferences('enableSuggestions', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  {/* ... (Similar components for enableAnalysis and enableReminders) */}
                </div>
              </div>
            )}

            {currentSection === 'subscription' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Subscription</h2>
                <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-primary-900">Pro Plan</h3>
                      <p className="text-sm text-primary-700">Auto-renewal on {new Date(settings.subscription.nextBilling).toLocaleDateString()}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">Active</span>
                  </div>
                </div>
                {/* ... (Your subscription plan options here) */}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
