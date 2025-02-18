import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, MapPin, FileText, Plus } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  createdAt: string;
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({});

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) {
      return; // Add proper validation feedback
    }

    const clientToAdd: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email || '',
      address: newClient.address || '',
      notes: newClient.notes || '',
      createdAt: new Date().toISOString()
    };

    setClients([...clients, clientToAdd]);
    setNewClient({});
    setShowNewClientForm(false);
  };

  if (clients.length === 0 && !showNewClientForm) {
    return (
      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">العملاء</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <UserPlus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">لا يوجد عملاء حالياً</h2>
            <p className="text-slate-600 mb-8">
              ابدأ بإضافة عميلك الأول لإدارة قضاياهم بكفاءة
            </p>
            <button
              onClick={() => setShowNewClientForm(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="ml-2 h-5 w-5" />
              إضافة عميل جديد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">العملاء</h1>
        <button
          onClick={() => setShowNewClientForm(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="ml-2 h-5 w-5" />
          عميل جديد
        </button>
      </div>

      {showNewClientForm ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">إضافة عميل جديد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={newClient.name || ''}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل اسم العميل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={newClient.phone || ''}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل رقم الهاتف"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={newClient.email || ''}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل البريد الإلكتروني"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                العنوان
              </label>
              <input
                type="text"
                value={newClient.address || ''}
                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل العنوان"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ملاحظات
              </label>
              <textarea
                value={newClient.notes || ''}
                onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أدخل أي ملاحظات إضافية"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setShowNewClientForm(false)}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleAddClient}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              إضافة العميل
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="البحث في العملاء..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          {/* Clients List */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
              {filteredClients.map((client) => (
                <div key={client.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{client.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        تاريخ التسجيل: {new Date(client.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Phone className="ml-2 h-4 w-4 text-slate-400" />
                      <span dir="ltr">{client.phone}</span>
                    </div>
                    {client.email && (
                      <div className="flex items-center">
                        <Mail className="ml-2 h-4 w-4 text-slate-400" />
                        <span dir="ltr">{client.email}</span>
                      </div>
                    )}
                    {client.address && (
                      <div className="flex items-center">
                        <MapPin className="ml-2 h-4 w-4 text-slate-400" />
                        <span>{client.address}</span>
                      </div>
                    )}
                  </div>

                  {client.notes && (
                    <p className="mt-4 text-sm text-slate-600">{client.notes}</p>
                  )}

                  <div className="flex gap-4 mt-4">
                    <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                      <FileText className="ml-1 h-4 w-4" />
                      عرض القضايا
                    </button>
                    <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                      تعديل البيانات
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
