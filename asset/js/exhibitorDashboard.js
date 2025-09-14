//Exhibitor Dashboard JS
const exhibitorData = {
  userId: 'exh123456',
  company: 'Tech Innovators Ltd.',
  status: 'approved',
  products: [
    { id: 'p1', name: 'AI Vision Camera', description: 'Advanced AI-powered surveillance camera with real-time analysis', price: 599.99, category: 'AI', featured: true },
    { id: 'p2', name: 'IoT Gateway Hub', description: 'Smart gateway for connecting industrial IoT devices', price: 299.99, category: 'IoT', featured: false }
  ],
  stalls: ['A1', 'A2'],
  payments: [
    { id: 'pay1', amount: 5000, description: 'Stall A1 Booking', status: 'completed', date: '2024-03-01' },
    { id: 'pay2', amount: 4000, description: 'Stall A2 Booking', status: 'completed', date: '2024-03-02' }
  ]
};

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@techinnovators.com',
  company: 'Tech Innovators Ltd.'
};


function renderExhibitorDashboard() {
  const el = document.getElementById('exhibitor-dashboard');
  el.innerHTML = `
    <div class="fade-in">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">ITFC</div>
            <h1 class="text-xl font-semibold text-gray-900">ITFC Trade Fair</h1>
            <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold ml-2">Exhibitor</span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="hover:bg-gray-100 p-2 rounded transition" title="Notifications">
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </button>
            <span class="text-sm text-gray-700">${exhibitorData.company}</span>
            <button class="flex items-center text-sm text-gray-600 hover:text-green-600 transition">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Exhibitor Dashboard</h1>
        <p class="text-gray-600 mt-2">Manage your products, stalls, and track performance</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow p-6 border-l-4 border-green-600 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-green-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>
            <span class="text-sm font-medium text-gray-700">Registration Status</span>
          </div>
          <div class="text-3xl font-bold capitalize">${exhibitorData.status}</div>
          <span class="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">${exhibitorData.status === 'approved' ? 'Active Exhibitor' : 'Pending Approval'}</span>
        </div>
        <div class="bg-white rounded-xl shadow p-6 border-l-4 border-blue-600 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-blue-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg></span>
            <span class="text-sm font-medium text-gray-700">Products</span>
          </div>
          <div class="text-3xl font-bold">${exhibitorData.products.length}</div>
          <span class="text-xs text-gray-400">In catalog</span>
        </div>
        <div class="bg-white rounded-xl shadow p-6 border-l-4 border-purple-600 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-purple-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V9a4 4 0 00-3-3.87M9 4V3a4 4 0 013-3.87"/></svg></span>
            <span class="text-sm font-medium text-gray-700">Stalls Allocated</span>
          </div>
          <div class="text-3xl font-bold">${exhibitorData.stalls.length}</div>
          <span class="text-xs text-gray-400">Exhibition spaces</span>
        </div>
        <div class="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-yellow-500"><svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></span>
            <span class="text-sm font-medium text-gray-700">Total Investment</span>
          </div>
          <div class="text-3xl font-bold">$${exhibitorData.payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
          <span class="text-xs text-gray-400">From stall bookings</span>
        </div>
      </div>
      <!-- Main Content Tabs (full TSX fidelity) -->
      <div class="bg-white rounded-xl shadow p-6 mt-8">
        <div class="grid w-full grid-cols-5 gap-2 mb-6">
          <button class="tab-btn px-4 py-2 rounded-lg font-medium bg-green-600 text-white" data-tab="overview">Overview</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-green-600 text-green-600 bg-white" data-tab="products">Products</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-green-600 text-green-600 bg-white" data-tab="stalls">My Stalls</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-green-600 text-green-600 bg-white" data-tab="payments">Payments</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-green-600 text-green-600 bg-white" data-tab="analytics">Performance</button>
        </div>
        <div id="exhibitor-tab-content">
          <!-- Overview Tab (default) -->
          <div id="tab-overview">
            <div class="grid lg:grid-cols-2 gap-6 mb-6">
              <div class="bg-white rounded-lg shadow p-4">
                <h2 class="font-semibold mb-2">Company Information</h2>
                <div class="grid grid-cols-2 gap-4">
                  <div><span class="text-sm text-gray-500">Company Name</span><p class="mt-1 font-medium">${exhibitorData.company}</p></div>
                  <div><span class="text-sm text-gray-500">Contact Person</span><p class="mt-1 font-medium">${user.firstName} ${user.lastName}</p></div>
                  <div><span class="text-sm text-gray-500">Email</span><p class="mt-1">${user.email}</p></div>
                  <div><span class="text-sm text-gray-500">Status</span><p class="mt-1 capitalize">${exhibitorData.status}</p></div>
                </div>
                <div class="mt-4"><span class="text-sm text-gray-500">Business Category</span><p class="mt-1">Technology Solutions & AI Services</p></div>
              </div>
              <div class="bg-white rounded-lg shadow p-4">
                <h2 class="font-semibold mb-2">Current Participation</h2>
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div class="flex items-center justify-between mb-3">
                    <span class="font-semibold text-blue-900">International Tech Expo 2024</span>
                    <span class="bg-blue-600 text-white px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 text-sm text-blue-800">
                    <div>Location: New York</div>
                    <div>Date: Mar 15-17</div>
                    <div>Stall: Tech Pavilion A</div>
                    <div>Type: Technology</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow p-4 mt-6">
              <h2 class="font-semibold mb-2">Allocated Stalls</h2>
              <div class="grid md:grid-cols-3 gap-4">
                ${exhibitorData.stalls.map((stall, index) => `<div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center border"><div class="font-bold text-lg">Stall ${stall}</div><span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold mt-2">Allocated</span></div>`).join('')}
              </div>
            </div>
          </div>
          <!-- Products Tab -->
          <div id="tab-products" class="hidden">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-semibold">Product Catalog</h2>
              <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"><svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg> Add New Product</button>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-semibold mb-2">Showcase Products</h3>
              <div class="flex items-center space-x-4 mb-4">
                <input class="border rounded px-3 py-2" placeholder="Search products..." />
                <button class="border border-green-600 text-green-600 px-3 py-1 rounded">Filter</button>
              </div>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${exhibitorData.products.map(product => `<div class="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border"><div><div class="font-bold text-lg">${product.name}</div><div class="text-gray-600 text-sm mb-1">${product.description}</div><span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold mr-2">${product.category}</span>${product.featured ? '<span class="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold">Featured</span>' : ''}</div><div class="flex flex-col items-end"><div class="text-lg font-bold">$${product.price}</div><button class="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">Edit</button></div></div>`).join('')}
              </div>
            </div>
          </div>
          <!-- Stalls Tab -->
          <div id="tab-stalls" class="hidden">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-semibold">My Stalls</h2>
              <button class="border border-green-600 text-green-600 px-4 py-2 rounded">Request Additional Stall</button>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-semibold mb-2">Stall Management</h3>
              <div class="grid gap-4">
                ${exhibitorData.stalls.map(stall => `<div class="bg-gray-50 rounded-lg p-4 flex items-center justify-between border"><div class="font-bold text-lg">Stall ${stall}</div><span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold">Allocated</span></div>`).join('')}
              </div>
            </div>
          </div>
          <!-- Payments Tab -->
          <div id="tab-payments" class="hidden">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-semibold">Payment Management</h2>
              <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"><svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/></svg> Make Payment</button>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-semibold mb-2">Payment History</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="px-4 py-2 text-left">Date</th>
                      <th class="px-4 py-2 text-left">Description</th>
                      <th class="px-4 py-2 text-left">Amount</th>
                      <th class="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${exhibitorData.payments.map(payment => `<tr><td class="px-4 py-2">${payment.date}</td><td class="px-4 py-2">${payment.description}</td><td class="px-4 py-2">$${payment.amount}</td><td class="px-4 py-2"><span class="inline-block px-2 py-1 rounded text-xs font-semibold ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">${payment.status}</span></td></tr>`).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Analytics Tab -->
          <div id="tab-analytics" class="hidden">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-semibold">Performance Analytics</h2>
              <button class="border border-green-600 text-green-600 px-4 py-2 rounded">Export Report</button>
            </div>
            <div class="bg-white rounded-lg shadow p-4 text-center">
              <svg class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
              <p class="text-gray-600">Performance analytics coming soon</p>
              <p class="text-sm text-gray-500 mt-2">Visitor engagement, lead generation, and sales metrics</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  `;
  // Tab logic
  function showTab(tab) {
    const tabs = ['overview', 'products', 'stalls', 'payments', 'analytics'];
    tabs.forEach(t => {
      const el = document.getElementById('tab-' + t);
      if (el) el.classList.add('hidden');
    });
    const active = document.getElementById('tab-' + tab);
    if (active) active.classList.remove('hidden');
  }
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.className = 'tab-btn px-4 py-2 rounded-lg font-medium border border-green-600 text-green-600 bg-white');
      this.className = 'tab-btn px-4 py-2 rounded-lg font-medium bg-green-600 text-white';
      showTab(this.getAttribute('data-tab'));
    });
  });
  showTab('overview');
}

function renderExhibitorTab(tab) {
  const content = document.getElementById('exhibitor-tab-content');
  if (tab === 'products') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Product Catalog</h2>
      <div class="grid gap-6">
        ${exhibitorData.products.map(product => `
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border">
            <div>
              <div class="font-bold text-lg">${product.name}</div>
              <div class="text-gray-600 text-sm mb-1">${product.description}</div>
              <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold mr-2">${product.category}</span>
              ${product.featured ? '<span class="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold">Featured</span>' : ''}
            </div>
            <div class="flex flex-col items-end">
              <div class="text-lg font-bold">$${product.price}</div>
              <button class="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">Edit</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tab === 'stalls') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Stalls Allocated</h2>
      <div class="grid gap-4">
        ${exhibitorData.stalls.map(stall => `
          <div class="bg-gray-50 rounded-lg p-4 flex items-center justify-between border">
            <div class="font-bold text-lg">Stall ${stall}</div>
            <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold">Allocated</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tab === 'payments') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Payment History</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 text-left">Date</th>
              <th class="px-4 py-2 text-left">Description</th>
              <th class="px-4 py-2 text-left">Amount</th>
              <th class="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            ${exhibitorData.payments.map(payment => `
              <tr>
                <td class="px-4 py-2">${payment.date}</td>
                <td class="px-4 py-2">${payment.description}</td>
                <td class="px-4 py-2">$${payment.amount}</td>
                <td class="px-4 py-2">
                  <span class="inline-block px-2 py-1 rounded text-xs font-semibold ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">${payment.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

renderExhibitorDashboard();
