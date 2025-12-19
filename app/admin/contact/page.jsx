"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner, BackButton } from "../components/AdminUI";

// --- Icons ---
const MailIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    try {
      await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <main className="p-4 md:p-16 w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <BackButton href="/admin/dashboard" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="font-serif text-3xl md:text-4xl">Inquiries</h1>
          <span className="bg-white px-4 py-1 rounded-full text-sm border shadow-sm text-gray-500 w-fit">
            Total: {contacts.length}
          </span>
        </div>

        {/* ================= MOBILE VIEW (CARDS) ================= */}
        <div className="block md:hidden space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 relative">
              {/* Header: Name & Date */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-serif text-xl font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Received: {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(contact.id)}
                  className="text-gray-400 hover:text-red-600 p-2 -mr-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-3 mb-5">
                <a 
                  href={`mailto:${contact.email}`} 
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                >
                  <MailIcon className="w-4 h-4" /> Email
                </a>
                <a 
                  href={`tel:${contact.phone}`} 
                  className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition"
                >
                  <PhoneIcon className="w-4 h-4" /> Call
                </a>
              </div>

              {/* Details Box */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
                <div className="grid grid-cols-2 gap-3 mb-3 border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{contact.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>{contact.date || 'N/A'}</span>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {contact.details}
                </p>
              </div>
            </div>
          ))}
          
          {contacts.length === 0 && (
             <div className="text-center py-20 text-gray-400">No inquiries found.</div>
          )}
        </div>

        {/* ================= DESKTOP VIEW (TABLE) ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-5 px-6 font-serif text-sm uppercase tracking-wider text-gray-500 font-medium">Date</th>
                  <th className="py-5 px-6 font-serif text-sm uppercase tracking-wider text-gray-500 font-medium">Client</th>
                  <th className="py-5 px-6 font-serif text-sm uppercase tracking-wider text-gray-500 font-medium">Contact Info</th>
                  <th className="py-5 px-6 font-serif text-sm uppercase tracking-wider text-gray-500 font-medium">Event Details</th>
                  <th className="py-5 px-6 font-serif text-sm uppercase tracking-wider text-gray-500 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-5 px-6 text-sm text-gray-500 align-top w-32 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    
                    <td className="py-5 px-6 align-top w-48">
                      <div className="font-medium text-gray-900 text-lg font-serif">{contact.name}</div>
                    </td>
                    
                    <td className="py-5 px-6 align-top w-72">
                      <div className="flex flex-col gap-3">
                        <a 
                          href={`mailto:${contact.email}`} 
                          className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors group p-1 -ml-1 rounded hover:bg-blue-50"
                          title="Send Email"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <MailIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                          </div>
                          <span className="truncate">{contact.email}</span>
                        </a>
                        
                        <a 
                          href={`tel:${contact.phone}`} 
                          className="flex items-center gap-3 text-sm text-gray-600 hover:text-green-600 transition-colors group p-1 -ml-1 rounded hover:bg-green-50"
                          title="Call"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                            <PhoneIcon className="w-4 h-4 text-gray-500 group-hover:text-green-600" />
                          </div>
                          <span className="truncate">{contact.phone}</span>
                        </a>
                      </div>
                    </td>
                    
                    <td className="py-5 px-6 align-top">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-gray-500 mb-2 border-b border-gray-200 pb-2">
                          <span className="flex items-center gap-1">
                            <span className="font-bold uppercase tracking-wide">Loc:</span> {contact.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-bold uppercase tracking-wide">Date:</span> {contact.date || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-bold uppercase tracking-wide">Dur:</span> {contact.days} days
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {contact.details}
                        </p>
                      </div>
                    </td>
                    
                    <td className="py-5 px-6 align-top text-right">
                      <button 
                        onClick={() => handleDelete(contact.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                        title="Delete Inquiry"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-24 text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <MailIcon className="w-12 h-12 text-gray-200" />
                        <p>No inquiries received yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}