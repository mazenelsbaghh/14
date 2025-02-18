import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Brain, Calendar, FolderPlus } from 'lucide-react';

type CaseStatus = 'open' | 'closed' | 'pending';
type CaseType = 'personal' | 'criminal' | 'commercial' | 'civil' | 'family';

interface Case {
  id: string;
  number: string;
  title: string;
  type: CaseType;
  status: CaseStatus;
  client: string;
  court: string;
  nextSession: string;
  lawyer: string;
  lastUpdated: string;
}

const caseTypeLabels: Record<CaseType, string> = {
  personal: 'شخصية',
  criminal: 'جنائية',
  commercial: 'تجارية',
  civil: 'مدنية',
  family: 'أسرية'
};

const caseStatusLabels: Record<CaseStatus, string> = {
  open: 'مفتوحة',
  closed: 'مغلقة',
  pending: 'معلقة'
};

const caseStatusColors: Record<CaseStatus, string> = {
  open: 'bg-green-50 text-green-700',
  closed: 'bg-slate-50 text-slate-700',
  pending: 'bg-yellow-50 text-yellow-700'
};

export function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<CaseType | 'all'>('all');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);
  const [newCase, setNewCase] = useState<Partial<Case>>({
    status: 'open',
  });

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || caseItem.status === selectedStatus;
    const matchesType = selectedType === 'all' || caseItem.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddCase = () => {
    if (!newCase.title || !newCase.type || !newCase.client || !newCase.court) {
      return; // Add proper validation feedback
    }

    const caseToAdd: Case = {
      id: Date.now().toString(),
      number: `C-${new Date().getFullYear()}-${(cases.length + 1).toString().padStart(3, '0')}`,
      title: newCase.title,
      type: newCase.type as CaseType,
      status: newCase.status as CaseStatus,
      client: newCase.client,
      court: newCase.court,
      nextSession: newCase.nextSession || new Date().toISOString().split('T')[0],
      lawyer: newCase.lawyer || 'غير محدد',
      lastUpdated: new Date().toISOString()
    };

    setCases([...cases, caseToAdd]);
    setNewCase({ status: 'open' });
    setShowNewCaseForm(false);
  };

  if (cases.length === 0 && !showNewCaseForm) {
    return (
      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">إدارة القضايا</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <FolderPlus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">لا توجد قضايا حالياً</h2>
            <p className="text-slate-600 mb-8">
              ابدأ بإضافة أول قضية لإدارة ملفاتك القانونية بكفاءة
            </p>
            <button
              onClick={() => setShowNewCaseForm(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="ml-2 h-5 w-5" />
              إضافة قضية جديدة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">إدارة القضايا</h1>
        <button
          onClick={() => setShowNewCaseForm(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="ml-2 h-5 w-5" />
          قضية جديدة
        </button>
      </div>

      {showNewCaseForm ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">إضافة قضية جديدة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                عنوان القضية
              </label>
              <input
                type="text"
                value={newCase.title || ''}
                onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل عنوان القضية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                نوع القضية
              </label>
              <select
                value={newCase.type || ''}
                onChange={(e) => setNewCase({ ...newCase, type: e.target.value as CaseType })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">اختر نوع القضية</option>
                {Object.entries(caseTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                اسم العميل
              </label>
              <input
                type="text"
                value={newCase.client || ''}
                onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل اسم العميل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                المحكمة
              </label>
              <input
                type="text"
                value={newCase.court || ''}
                onChange={(e) => setNewCase({ ...newCase, court: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل اسم المحكمة"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                تاريخ الجلسة القادمة
              </label>
              <input
                type="date"
                value={newCase.nextSession || ''}
                onChange={(e) => setNewCase({ ...newCase, nextSession: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                المحامي المسؤول
              </label>
              <input
                type="text"
                value={newCase.lawyer || ''}
                onChange={(e) => setNewCase({ ...newCase, lawyer: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل اسم المحامي المسؤول"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setShowNewCaseForm(false)}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleAddCase}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              إضافة القضية
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="البحث في القضايا..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as CaseStatus | 'all')}
                  className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="open">مفتوحة</option>
                  <option value="pending">معلقة</option>
                  <option value="closed">مغلقة</option>
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as CaseType | 'all')}
                  className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">جميع الأنواع</option>
                  {Object.entries(caseTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Cases List */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-200">
                  {filteredCases.map((caseItem) => (
                    <div key={caseItem.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{caseItem.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">رقم القضية: {caseItem.number}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${caseStatusColors[caseItem.status]}`}>
                          {caseStatusLabels[caseItem.status]}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">العميل</p>
                          <p className="font-medium">{caseItem.client}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">المحكمة</p>
                          <p className="font-medium">{caseItem.court}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">الجلسة القادمة</p>
                          <p className="font-medium">{new Date(caseItem.nextSession).toLocaleDateString('ar-SA')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">المحامي المسؤول</p>
                          <p className="font-medium">{caseItem.lawyer}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                          <FileText className="ml-1 h-4 w-4" />
                          عرض التفاصيل
                        </button>
                        <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                          <Calendar className="ml-1 h-4 w-4" />
                          الجلسات
                        </button>
                        <button 
                          className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                          onClick={() => setShowAIPanel(true)}
                        >
                          <Brain className="ml-1 h-4 w-4" />
                          تحليل ذكي
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant Panel */}
            <div className={`lg:col-span-1 ${showAIPanel ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">المساعد الذكي</h3>
                  <Brain className="h-5 w-5 text-primary-600" />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-medium text-primary-700 mb-2">تحليل القضايا النشطة</h4>
                    <p className="text-sm text-slate-600">
                      لديك {filteredCases.filter(c => c.status === 'open').length} قضايا نشطة تحتاج إلى متابعة.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-700 mb-2">مواعيد هامة</h4>
                    <p className="text-sm text-slate-600">
                      {filteredCases.length > 0 
                        ? 'لديك جلسات قادمة تحتاج إلى تحضير'
                        : 'لا توجد مواعيد قادمة حالياً'}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">توصيات قانونية</h4>
                    <p className="text-sm text-slate-600">
                      سيتم تقديم التوصيات بناءً على تحليل القضايا
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
