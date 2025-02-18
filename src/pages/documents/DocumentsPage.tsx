import React, { useState } from 'react';
import { Search, Upload, FileText, Trash2, Download, Edit, FolderPlus, FileDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Document {
  id: number;
  title: string;
  description: string;
  fileType: string;
  category: 'legal' | 'court' | 'contract' | 'template';
  linkedTo: string;
  uploadDate: string;
  fileUrl: string;
}

const initialDocuments: Document[] = [
  {
    id: 1,
    title: 'Contract Template',
    description: 'Standard contract template for services',
    fileType: 'pdf',
    category: 'template',
    linkedTo: '',
    uploadDate: new Date().toISOString(),
    fileUrl: '#1',
  },
  {
    id: 2,
    title: 'Legal Brief',
    description: 'Summary of legal arguments for case #1234',
    fileType: 'doc',
    category: 'legal',
    linkedTo: 'Case #1234',
    uploadDate: new Date().toISOString(),
    fileUrl: '#2',
  },
];

export function DocumentsPage() {
  // ... (State variables remain the same)

  // ... (handleAddDocument, handleEditDocument, handleUpdateDocument, handleDeleteDocument functions remain the same)

  return (
    <div className="p-8">
      {/* ... (Header remains the same) */}

      {showUploadForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            {editingDocument ? 'Edit Document' : 'Add Document'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newDocument.title || ''}
                onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={newDocument.description || ''}
                onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="fileType" className="block text-sm font-medium text-gray-700">
                File Type
              </label>
              <select
                id="fileType"
                value={newDocument.fileType || 'pdf'}
                onChange={(e) => setNewDocument({ ...newDocument, fileType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="pdf">PDF</option>
                <option value="doc">DOC</option>
                <option value="txt">TXT</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={newDocument.category || 'legal'}
                onChange={(e) => setNewDocument({ ...newDocument, category: e.target.value as 'legal' | 'court' | 'contract' | 'template' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="legal">Legal</option>
                <option value="court">Court</option>
                <option value="contract">Contract</option>
                <option value="template">Template</option>
              </select>
            </div>
            <div>
              <label htmlFor="linkedTo" className="block text-sm font-medium text-gray-700">
                Linked To
              </label>
              <input
                type="text"
                id="linkedTo"
                value={newDocument.linkedTo || ''}
                onChange={(e) => setNewDocument({ ...newDocument, linkedTo: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* ... (Buttons remain the same) */}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'legal' | 'court' | 'contract' | 'template')}
            className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Categories</option>
            <option value="legal">Legal</option>
            <option value="court">Court</option>
            <option value="contract">Contract</option>
            <option value="template">Template</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-200">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <FileText className="h-8 w-8 text-slate-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{doc.title}</h3>
                    <p className="text-sm text-slate-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-600">{doc.description}</p>
                    {doc.linkedTo && <p className="text-sm text-slate-500">Linked to: {doc.linkedTo}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handleEditDocument(doc)} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDeleteDocument(doc.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
