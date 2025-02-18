import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginPage } from './pages/auth/LoginPage';
import { CasesPage } from './pages/cases/CasesPage';
import { ClientsPage } from './pages/clients/ClientsPage';

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 font-tajawal">مرحباً بك، المستشار</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* بطاقة القضايا النشطة */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">القضايا النشطة</h2>
            <span className="inline-flex items-center rounded-lg bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
              جديد
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-primary-600">٢٤</p>
          <p className="mt-2 text-sm text-slate-600">٣ قضايا تحتاج إلى اهتمام</p>
        </div>

        {/* بطاقة المواعيد النهائية */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">المواعيد النهائية</h2>
            <span className="inline-flex items-center rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
              عاجل
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-red-600">٥</p>
          <p className="mt-2 text-sm text-slate-600">خلال الأيام السبعة القادمة</p>
        </div>

        {/* بطاقة اجتماعات العملاء */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">اجتماعات العملاء</h2>
            <span className="inline-flex items-center rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              اليوم
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-green-600">٣</p>
          <p className="mt-2 text-sm text-slate-600">مجدولة لليوم</p>
        </div>
      </div>

      {/* قسم النشاط الأخير */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">النشاط الأخير</h2>
        <div className="rounded-xl bg-white shadow-sm border border-slate-100">
          <div className="divide-y divide-slate-100">
            {[
              {
                title: 'تحديث القضية',
                description: 'تم رفع مستند جديد لقضية سميث ضد جونسون',
                time: 'قبل ساعتين'
              },
              {
                title: 'اجتماع مع عميل',
                description: 'تم جدولة اجتماع مع جين دو لمراجعة القضية',
                time: 'قبل ٤ ساعات'
              },
              {
                title: 'تذكير بالموعد النهائي',
                description: 'موعد نهائي لتقديم ملف قضية طومسون غداً',
                time: 'قبل ٥ ساعات'
              }
            ].map((activity, i) => (
              <div key={i} className="p-5 hover:bg-slate-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium text-slate-900">{activity.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
                  </div>
                  <span className="text-sm text-slate-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 font-tajawal">{title}</h1>
      <p className="mt-4 text-slate-600">هذه الصفحة قيد التطوير</p>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <PrivateRoute>
              <AppLayout>
                <PlaceholderPage title="المساعد الذكي" />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cases"
          element={
            <PrivateRoute>
              <AppLayout>
                <CasesPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <AppLayout>
                <ClientsPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <PrivateRoute>
              <AppLayout>
                <PlaceholderPage title="المستندات" />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <AppLayout>
                <PlaceholderPage title="التقويم" />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <AppLayout>
                <PlaceholderPage title="الفواتير" />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <AppLayout>
                <PlaceholderPage title="الإعدادات" />
              </AppLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
