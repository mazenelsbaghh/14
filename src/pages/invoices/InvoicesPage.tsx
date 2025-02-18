import React, { useState } from 'react';
import { Search, Plus, Download, Send, Edit, Trash2, Receipt } from 'lucide-react';

interface Invoice {
  id: number;
  number: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  services: { description: string; amount: number }[];
  notes: string;
  createdAt: string;
}

const initialInvoices: Invoice[] = [
  // ... (Your initial invoice data here)
];

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all');
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({ services: [{ description: '', amount: 0 }] });
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = searchTerm === '' || invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddService = () => {
    setNewInvoice({ ...newInvoice, services: [...(newInvoice.services || []), { description: '', amount: 0 }] });
  };

  const handleRemoveService = (index: number) => {
    setNewInvoice({ ...newInvoice, services: (newInvoice.services || []).filter((_, i) => i !== index) });
  };

  const handleServiceChange = (index: number, field: 'description' | 'amount', value: string | number) => {
    const updatedServices = [...(newInvoice.services || [])];
    updatedServices[index] = { ...updatedServices[index], [field]: field === 'amount' ? Number(value) : value };
    setNewInvoice({ ...newInvoice, services: updatedServices });
  };

  const calculateTotal = (services: { amount: number }[]) => services.reduce((sum, service) => sum + service.amount, 0);

  const handleAddInvoice = () => {
    if (!newInvoice.clientName || !(newInvoice.services || []).length) return;

    const newInvoiceToAdd: Invoice = {
      id: Math.max(...invoices.map((i) => i.id)) + 1,
      number: `INV-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, '0')}`,
      clientName: newInvoice.clientName,
      amount: calculateTotal(newInvoice.services || []),
      dueDate: newInvoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'unpaid',
      services: newInvoice.services || [],
      notes: newInvoice.notes || '',
      createdAt: new Date().toISOString(),
    };
    setInvoices([...invoices, newInvoiceToAdd]);
    setNewInvoice({ services: [{ description: '', amount: 0 }] });
    setShowNewInvoiceForm(false);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setNewInvoice(invoice);
    setShowNewInvoiceForm(true);
  };

  const handleUpdateInvoice = () => {
    if (!newInvoice.clientName || !(newInvoice.services || []).length) return;

    const updatedInvoices = invoices.map((inv) =>
      inv.id === editingInvoice?.id ? { ...inv, ...newInvoice } : inv
    );
    setInvoices(updatedInvoices);
    setEditingInvoice(null);
    setNewInvoice({ services: [{ description: '', amount: 0 }] });
    setShowNewInvoiceForm(false);
  };

  const handleDeleteInvoice = (id: number) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    setInvoices(updatedInvoices);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700';
      case 'unpaid':
        return 'bg-yellow-50 text-yellow-700';
      case 'overdue':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-slate-50 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'unpaid':
        return 'Unpaid';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
        <button
          onClick={() => setShowNewInvoiceForm(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="ml-2 h-5 w-5" />
          Add Invoice
        </button>
      </div>

      {showNewInvoiceForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            {editingInvoice ? 'Edit Invoice' : 'Add Invoice'}
          </h2>
          {/* ... (Your form fields here, similar to before) */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setShowNewInvoiceForm(false)}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingInvoice ? handleUpdateInvoice : handleAddInvoice}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {editingInvoice ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        {/* ... (Your search and filter components here) */}
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-200">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="p-6 hover:bg-slate-50 transition-colors">
              {/* ... (Your invoice display components here) */}
              <div className="flex items-center space-x-4">
                <button onClick={() => handleEditInvoice(invoice)} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDeleteInvoice(invoice.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
