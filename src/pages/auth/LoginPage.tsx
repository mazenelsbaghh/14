import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Shield } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    code: ''
  });
  const [step, setStep] = useState<'credentials' | 'twoFactor'>('credentials');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // For demo purposes, check against hardcoded credentials
    if (step === 'credentials') {
      if (credentials.email === 'admin' && credentials.password === 'admin') {
        setStep('twoFactor');
      } else {
        setError('بيانات الاعتماد غير صحيحة');
      }
    } else {
      // Demo 2FA code is '123456'
      if (credentials.code === '123456') {
        // Set authentication state in session storage
        sessionStorage.setItem('authenticated', 'true');
        navigate('/');
      } else {
        setError('رمز التحقق غير صحيح');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-tajawal">المحامي الذكي</h1>
          <p className="mt-2 text-slate-400">منصة إدارة المكاتب القانونية المتقدمة</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-6">
            {step === 'credentials' ? 'تسجيل الدخول' : 'التحقق بخطوتين'}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'credentials' ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="text"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      className="block w-full rounded-lg border-0 py-3 pr-4 pl-12 text-slate-900 bg-slate-50 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600"
                      placeholder="أدخل البريد الإلكتروني"
                      required
                    />
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="block w-full rounded-lg border-0 py-3 pr-4 pl-12 text-slate-900 bg-slate-50 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600"
                      placeholder="أدخل كلمة المرور"
                      required
                    />
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600"
                    />
                    <label htmlFor="remember" className="mr-2 text-sm text-slate-600">
                      تذكرني
                    </label>
                  </div>
                  <button type="button" className="text-sm text-primary-600 hover:text-primary-500">
                    نسيت كلمة المرور؟
                  </button>
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-2">
                  رمز التحقق
                </label>
                <div className="relative">
                  <input
                    id="code"
                    type="text"
                    value={credentials.code}
                    onChange={(e) => setCredentials({ ...credentials, code: e.target.value })}
                    className="block w-full rounded-lg border-0 py-3 pr-4 pl-12 text-slate-900 bg-slate-50 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600"
                    placeholder="أدخل رمز التحقق"
                    required
                  />
                  <Shield className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  تم إرسال رمز التحقق إلى بريدك الإلكتروني
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {step === 'credentials' ? 'تسجيل الدخول' : 'تأكيد'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
