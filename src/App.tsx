import React, { useState, useEffect } from 'react';
import { Settings, User, X, MapPin, Clock, AlertTriangle, DollarSign, Search, Plus, Filter, FileText, Package, ChevronRight, Edit, Trash2, ArrowLeft, Phone, Mail, Calendar, Home } from 'lucide-react';
import mockJobs from './data/mockJobs';
import mockInvoices from './data/mockInvoices';
import mockInventoryItems from './data/mockInventoryItems';
import type { Client, Job, Invoice, InventoryItem } from './interfaces';
import { ProgressBar } from './components/base/ProgressBar';
import { JobDetailPage } from './components/features/JobDetailPage';
import { JobCard } from './components/features/JobCard';
import { InventoryCard } from './components/features/InventoryCard';
import { InventoryDetailPage } from './components/features/InventoryDetailPage';
import { AddClientPage } from './components/features/AddClientPage';
import { EditClientPage } from './components/features/EditClientPage';
import { ClientDetailPage } from './components/features/ClientDetailPage';
import { clientService } from './services/clientService';

type Page = 'dashboard' | 'clients' | 'jobs' | 'invoices' | 'inventory' | 'client-detail' | 'job-detail' | 'inventory-detail' | 'add-client' | 'edit-client';

interface PageState {
  type: Page;
  clientId?: string;
  jobId?: string;
  inventoryId?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>({ type: 'dashboard' });
  const [clients, setClients] = useState<Client[]>([]);
  const [jobs] = useState<Job[]>(mockJobs);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [inventory] = useState<InventoryItem[]>(mockInventoryItems);
  const [isOverviewDismissed, setIsOverviewDismissed] = useState<boolean>(() => {
    const stored = localStorage.getItem('overviewDismissed');
    return stored === 'true';
  });

  // Load initial clients
  useEffect(() => {
    const loadClients = async () => {
      const allClients = await clientService.getAllClients();
      console.log('Loaded clients:', allClients);
      setClients(allClients);
    };
    loadClients();
  }, []);

  const handleOverviewDismiss = () => {
    setIsOverviewDismissed(true);
    localStorage.setItem('overviewDismissed', 'true');
  };

  const handleAddClient = async (data: ClientFormData) => {
    try {
      const newClient = await clientService.createClient(data);
      console.log('Created new client:', newClient);
      const allClients = await clientService.getAllClients();
      setClients(allClients);
      setCurrentPage({ type: 'clients' });
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  const handleUpdateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const updatedClient = await clientService.updateClient(id, updates);
      if (updatedClient) {
        // Update the local state with the new client data
        setClients(prevClients => 
          prevClients.map(c => c.id === id ? updatedClient : c)
        );
        // Navigate back to clients list
        setCurrentPage({ type: 'clients' });
      }
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };

  useEffect(() => {
    console.log('Page state changed:', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    console.log('Rendering page:', currentPage);
    
    switch (currentPage.type) {
      case 'clients':
        return <ClientsPage 
          clients={clients} 
          onClientClick={(id) => {
            console.log('Client clicked:', id);
            setCurrentPage({ type: 'client-detail', clientId: id });
          }}
          onAddClient={() => {
            console.log('Add client clicked');
            setCurrentPage({ type: 'add-client' });
          }}
          onEditClient={(id) => {
            console.log('Edit client clicked:', id);
            setCurrentPage({ type: 'edit-client', clientId: id });
          }}
        />;
      case 'add-client':
        return <AddClientPage 
          onSubmit={handleAddClient}
          onCancel={() => setCurrentPage({ type: 'clients' })}
        />;
      case 'edit-client':
        console.log('Finding client to edit:', currentPage.clientId);
        const clientToEdit = clients.find(c => c.id === currentPage.clientId);
        console.log('Found client:', clientToEdit);
        if (!clientToEdit) {
          console.error('Client not found:', currentPage.clientId);
          return null;
        }
        return <EditClientPage 
          client={clientToEdit}
          onSubmit={(data) => handleUpdateClient(clientToEdit.id, data)}
          onCancel={() => setCurrentPage({ type: 'clients' })}
        />;
      case 'jobs':
        return <JobsPage 
          jobs={jobs} 
          clients={clients} 
          onClientClick={(id) => setCurrentPage({ type: 'client-detail', clientId: id })}
          onJobClick={(id) => setCurrentPage({ type: 'job-detail', jobId: id })}
        />;
      case 'invoices':
        return <InvoicesPage invoices={invoices} clients={clients} onClientClick={(id) => setCurrentPage({ type: 'client-detail', clientId: id })} />;
      case 'inventory':
        return <InventoryPage 
          inventory={inventory}
          onItemClick={(id) => setCurrentPage({ type: 'inventory-detail', inventoryId: id })}
        />;
      case 'client-detail':
        const currentClient = clients.find(c => c.id === currentPage.clientId);
        if (!currentClient) return null;
        
        const clientJobs = jobs.filter(j => j.clientId === currentPage.clientId);
        const scheduledJobs = clientJobs.filter(job => job.status === 'scheduled');
        const completedJobs = clientJobs.filter(job => job.status === 'completed');
        
        return <ClientDetailPage 
          client={currentClient}
          scheduledJobs={scheduledJobs}
          completedJobs={completedJobs}
          onEditClient={() => setCurrentPage({ type: 'edit-client', clientId: currentPage.clientId })}
          onJobClick={(id) => setCurrentPage({ type: 'job-detail', jobId: id })}
        />;
      case 'job-detail':
        const job = jobs.find(j => j.id === currentPage.jobId)!;
        return <JobDetailPage 
          job={job}
          client={clients.find(c => c.id === job.clientId)!}
          onBack={() => setCurrentPage({ type: 'jobs' })} 
        />;
      case 'inventory-detail':
        const item = inventory.find(i => i.id === currentPage.inventoryId)!;
        return <InventoryDetailPage 
          item={item}
          onBack={() => setCurrentPage({ type: 'inventory' })}
        />;
      default:
        return <DashboardPage 
          clients={clients}
          jobs={jobs.filter(j => j.status === 'Scheduled')}
          onJobClick={(id) => setCurrentPage({ type: 'job-detail', jobId: id })}
          showOverview={!isOverviewDismissed}
          onOverviewDismiss={handleOverviewDismiss}
          inventory={inventory}
          onInventoryClick={(id) => setCurrentPage({ type: 'inventory-detail', inventoryId: id })}
          onViewAllInventory={() => setCurrentPage({ type: 'inventory' })}
        />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Fixed Header */}
      <header className="flex-none border-b bg-[#526D4E] px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">J&S House Cleaners App</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-100">Welcome, Sarah</span>
            <Settings className="h-5 w-5 text-gray-100" />
            <User className="h-5 w-5 text-gray-100" />
            <button className="text-gray-100">
              <span className="sr-only">Menu</span>
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {renderPage()}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="flex-none bg-[#526D4E] border-t border-[#455B41]">
        <div className="grid grid-cols-5 gap-4 px-6 py-4">
          <button 
            className={`flex flex-col items-center text-xs ${currentPage.type === 'clients' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setCurrentPage({ type: 'clients' })}
          >
            <User className="h-5 w-5 mb-1" />
            <span>Clients</span>
          </button>
          <button 
            className={`flex flex-col items-center text-xs ${currentPage.type === 'jobs' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setCurrentPage({ type: 'jobs' })}
          >
            <Clock className="h-5 w-5 mb-1" />
            <span>Jobs</span>
          </button>
          <button 
            className={`flex flex-col items-center text-xs ${currentPage.type === 'dashboard' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setCurrentPage({ type: 'dashboard' })}
          >
            <MapPin className="h-5 w-5 mb-1" />
            <span>Dashboard</span>
          </button>
          <button 
            className={`flex flex-col items-center text-xs ${currentPage.type === 'invoices' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setCurrentPage({ type: 'invoices' })}
          >
            <DollarSign className="h-5 w-5 mb-1" />
            <span>Invoices</span>
          </button>
          <button 
            className={`flex flex-col items-center text-xs ${currentPage.type === 'inventory' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setCurrentPage({ type: 'inventory' })}
          >
            <AlertTriangle className="h-5 w-5 mb-1" />
            <span>Inventory</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function ClientsPage({ clients, onClientClick, onAddClient, onEditClient }: { clients: Client[], onClientClick: (id: string) => void, onAddClient: () => void, onEditClient: (id: string) => void }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
        <button 
          onClick={onAddClient}
          className="bg-sage-green text-white px-4 py-2 rounded-lg flex items-center hover:bg-sage-green-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {clients.map((client) => {
          const primaryAddress = client.addresses.find(addr => addr.type === 'primary');
          const mobilePhone = client.phoneNumbers.find(phone => phone.type === 'mobile');
          const generalNotes = client.notes.find(note => note.type === 'general');
          
          return (
            <div 
              key={client.id} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div 
                  className="flex-1 space-y-3 cursor-pointer"
                  onClick={() => onClientClick(client.id)}
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{client.name}</h3>
                    {client.hasPets && (
                      <div className="flex items-center gap-1 text-sage-green text-sm mt-1">
                        <span className="w-2 h-2 rounded-full bg-sage-green"></span>
                        Has Pets
                      </div>
                    )}
                  </div>
                  {primaryAddress && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{`${primaryAddress.street}, ${primaryAddress.city}, ${primaryAddress.state}`}</span>
                    </div>
                  )}
                  {mobilePhone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{mobilePhone.number}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{client.email}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit button clicked for client:', client.id);
                      onEditClient(client.id);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete functionality
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {generalNotes && generalNotes.content && (
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">{generalNotes.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function JobsPage({ jobs, clients, onClientClick, onJobClick }: { jobs: Job[], clients: Client[], onClientClick: (id: string) => void, onJobClick: (id: string) => void }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Jobs</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Job
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            client={clients.find(c => c.id === job.clientId)!}
            onClick={() => onJobClick(job.id)}
          />
        ))}
      </div>
    </>
  );
}

function InvoicesPage({ invoices, clients, onClientClick }: { invoices: Invoice[], clients: Client[], onClientClick: (id: string) => void }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Invoices</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div 
            key={invoice.id} 
            className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onClientClick(invoice.clientId)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-800">{invoice.clientName}</h3>
                  <span className="text-sm text-gray-500">INV-00{invoice.id}</span>
                </div>
                <div className="mt-2 text-gray-600">
                  <span>Invoice Date: {invoice.date}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-semibold text-gray-800">${invoice.amount}</span>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end gap-3">
              <button className="text-gray-600 flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                View PDF
              </button>
              <button className="text-green-600 flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Record Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function InventoryPage({ inventory, onItemClick }: { inventory: InventoryItem[], onItemClick: (id: string) => void }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
          <p className="text-gray-600">Manage your cleaning supplies and equipment</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex space-x-4">
          <select className="border rounded-lg px-3 py-2 text-gray-600">
            <option>All Categories</option>
            <option>Cleaning Supplies</option>
            <option>Equipment</option>
            <option>Tools</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-gray-600">
            <option>All Status</option>
            <option>Low Stock</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
          <input 
            type="text" 
            placeholder="Search inventory..." 
            className="border rounded-lg px-3 py-2 text-gray-600 flex-grow"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-2 gap-6">
        {inventory.map(item => (
          <InventoryCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>
    </>
  );
}

function DashboardPage({ 
  clients, 
  jobs, 
  onJobClick,
  showOverview,
  onOverviewDismiss,
  inventory,
  onInventoryClick,
  onViewAllInventory
}: { 
  clients: Client[], 
  jobs: Job[], 
  onJobClick: (id: string) => void,
  showOverview: boolean,
  onOverviewDismiss: () => void,
  inventory: InventoryItem[],
  onInventoryClick: (id: string) => void,
  onViewAllInventory: () => void
}) {
  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get start of current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Calculate financial metrics
  const thisWeekJobs = jobs.filter(job => {
    const jobDate = new Date(job.date);
    jobDate.setHours(0, 0, 0, 0);
    return jobDate >= startOfWeek && jobDate < today;
  });

  const todayJobs = jobs.filter(job => {
    const jobDate = new Date(job.date);
    jobDate.setHours(0, 0, 0, 0);
    return jobDate.getTime() === today.getTime();
  });

  const allWeekJobs = jobs.filter(job => {
    const jobDate = new Date(job.date);
    jobDate.setHours(0, 0, 0, 0);
    return jobDate >= startOfWeek;
  });

  // Calculate totals and paid counts
  const weekBeforeTodayTotal = thisWeekJobs.reduce((sum, job) => sum + job.price, 0);
  const weekBeforeTodayPaid = thisWeekJobs.filter(job => job.paymentStatus === 'Paid').length;

  const todayTotal = todayJobs.reduce((sum, job) => sum + job.price, 0);
  const todayPaid = todayJobs.filter(job => job.paymentStatus === 'Paid').length;

  const weekTotal = allWeekJobs.reduce((sum, job) => sum + job.price, 0);
  const weekPaid = allWeekJobs.filter(job => job.paymentStatus === 'Paid').length;

  return (
    <>
      {showOverview && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 relative">
          <button 
            onClick={onOverviewDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Dismiss overview</span>
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Overview</h2>
          <p className="text-gray-600 mb-4">
            Welcome to J&S House Cleaners App, your all-in-one solution for managing your house cleaning business.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Manage your clients</li>
            <li>• Schedule and track jobs</li>
            <li>• Handle invoices</li>
            <li>• Keep track of your inventory</li>
          </ul>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Money made this week</h3>
          <p className="text-2xl font-semibold text-green-600">${weekBeforeTodayTotal.toFixed(2)}</p>
          <ProgressBar 
            current={weekBeforeTodayPaid} 
            total={thisWeekJobs.length}
            label="Customers paid"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Money made today</h3>
          <p className="text-2xl font-semibold text-green-600">${todayTotal.toFixed(2)}</p>
          <ProgressBar 
            current={todayPaid} 
            total={todayJobs.length}
            label="Customers paid"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Potential earnings this week</h3>
          <p className="text-2xl font-semibold text-green-600">${weekTotal.toFixed(2)}</p>
          <ProgressBar 
            current={weekPaid} 
            total={allWeekJobs.length}
            label="Customers paid"
          />
        </div>
      </div>

      {/* Jobs Today */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Jobs Today</h2>
        <div className="space-y-4">
          {jobs.slice(0, 2).map(job => (
            <JobCard
              key={job.id}
              job={job}
              client={clients.find(c => c.id === job.clientId)!}
              onClick={() => onJobClick(job.id)}
            />
          ))}
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Inventory Alerts</h2>
          <button 
            onClick={onViewAllInventory}
            className="text-green-600 hover:text-green-700"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {inventory
            .filter(item => item.currentStock <= item.minStock)
            .map(item => (
              <InventoryCard
                key={item.id}
                item={item}
                onClick={() => onInventoryClick(item.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;