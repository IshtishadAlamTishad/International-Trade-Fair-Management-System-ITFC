//Visitor Dashboard JS 
const visitorData = {
  userId: 'vis123456',
  tickets: [
    { id: 'VIS-2024-7891', type: 'Premium', fairId: 'fair_1', status: 'active' }
  ],
  feedback: [],
  interests: ['Technology', 'Innovation', 'Sustainable Development', 'Digital Marketing']
};
const user = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@visitor.com'
};
const fairs = [
  { id: 'fair_1', name: 'International Tech Expo 2024', description: 'A global event for technology and innovation.', location: 'New York', startDate: '2024-03-15', endDate: '2024-03-17', status: 'active', exhibitors: ['A', 'B'], visitors: ['X', 'Y'], revenue: 10000 },
  { id: 'fair_2', name: 'Fashion Week 2024', description: 'Showcasing the latest in fashion.', location: 'Paris', startDate: '2024-04-20', endDate: '2024-04-25', status: 'upcoming', exhibitors: ['C'], visitors: ['Z'], revenue: 5000 }
];
let feedback = [];

function renderVisitorDashboard() {
  const el = document.getElementById('visitor-dashboard');
  el.innerHTML = `
    <div class="fade-in">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">ITFC</div>
            <h1 class="text-xl font-semibold text-gray-900">ITFC Trade Fair</h1>
            <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold ml-2">Visitor</span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="hover:bg-gray-100 p-2 rounded transition" title="Notifications">
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </button>
            <span class="text-sm text-gray-700">Welcome, ${user.firstName}</span>
            <button class="flex items-center text-sm text-gray-600 hover:text-purple-600 transition">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Visitor Dashboard</h1>
        <p class="text-gray-600 mt-2">Explore trade fairs and manage your experience</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Registration Status</span>
            <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          </div>
          <div class="text-2xl font-bold">Active</div>
          <span class="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">Verified Visitor</span>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Current Ticket</span>
            <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
          </div>
          <div class="text-2xl font-bold">Premium</div>
          <p class="text-xs text-gray-400">Full access pass</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Feedback Given</span>
            <svg class="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"/></svg>
          </div>
          <div class="text-2xl font-bold">${visitorData.feedback.length}</div>
          <p class="text-xs text-gray-400">Reviews submitted</p>
        </div>
      </div>
      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex space-x-2 mb-6">
          <button class="tab-btn px-4 py-2 rounded-lg font-medium bg-purple-600 text-white" data-tab="profile">My Profile</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-purple-600 text-purple-600 bg-white" data-tab="tickets">My Tickets</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-purple-600 text-purple-600 bg-white" data-tab="events">Trade Fairs</button>
          <button class="tab-btn px-4 py-2 rounded-lg font-medium border border-purple-600 text-purple-600 bg-white" data-tab="feedback">Feedback</button>
        </div>
        <div id="tab-content"></div>
      </div>
    </main>
    </div>
  `;
  renderTab('profile');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.className = 'tab-btn px-4 py-2 rounded-lg font-medium border border-purple-600 text-purple-600 bg-white');
      this.className = 'tab-btn px-4 py-2 rounded-lg font-medium bg-purple-600 text-white';
      renderTab(this.getAttribute('data-tab'));
    });
  });
}

function renderTab(tab) {
  const content = document.getElementById('tab-content');
  if (tab === 'profile') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Welcome, ${user.firstName}!</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-purple-50 p-4 rounded-lg mb-4">
          <div class="font-medium">Name: ${user.firstName} ${user.lastName}</div>
          <div>Email: ${user.email}</div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <div class="font-medium">Interests</div>
          <div>${visitorData.interests.join(', ')}</div>
        </div>
      </div>
    `;
  } else if (tab === 'tickets') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">My Tickets</h2>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg mb-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-2xl font-bold mb-2">Premium Access Pass</h3>
            <p class="text-purple-100">ITFC Official Visitor Ticket</p>
          </div>
          <svg class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div>
            <div class="text-purple-100 text-sm">Visitor Name</div>
            <p class="font-semibold text-lg">${user.firstName} ${user.lastName}</p>
          </div>
          <div>
            <div class="text-purple-100 text-sm">Ticket ID</div>
            <p class="font-mono">${visitorData.tickets[0].id}</p>
          </div>
          <div>
            <div class="text-purple-100 text-sm">Valid For</div>
            <p class="font-semibold">All Current Events</p>
          </div>
          <div>
            <div class="text-purple-100 text-sm">Access Level</div>
            <p class="font-semibold">Premium</p>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'events') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Available Trade Fairs</h2>
      <div class="grid gap-6">
        ${fairs.map(fair => `
          <div class="bg-white border-l-4 ${fair.status === 'active' ? 'border-blue-500' : fair.status === 'upcoming' ? 'border-purple-500' : 'border-gray-500'} rounded-lg shadow p-6">
            <div class="flex items-center space-x-3 mb-3">
              <div class="text-xl font-semibold">${fair.name}</div>
              <span class="inline-block px-2 py-1 rounded text-xs ${fair.status === 'active' ? 'bg-blue-600 text-white' : fair.status === 'upcoming' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-white'}">${fair.status}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600 mb-4">
              <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V9a4 4 0 00-3-3.87M9 4V3a4 4 0 013-3.87"/></svg>
              ${fair.location} • ${new Date(fair.startDate).toLocaleDateString()} - ${new Date(fair.endDate).toLocaleDateString()}
            </div>
            <div class="text-gray-600 mb-6">${fair.description}</div>
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center bg-gray-50 p-3 rounded-lg">
                <div class="font-bold text-lg">${fair.exhibitors.length}</div>
                <div class="text-sm text-gray-600">Exhibitors</div>
              </div>
              <div class="text-center bg-gray-50 p-3 rounded-lg">
                <div class="font-bold text-lg">${fair.visitors.length}+</div>
                <div class="text-sm text-gray-600">Visitors</div>
              </div>
              <div class="text-center bg-gray-50 p-3 rounded-lg">
                <div class="font-bold text-lg">4.6</div>
                <div class="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tab === 'feedback') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Feedback & Reviews</h2>
      <form id="feedback-form" class="mb-6">
        <div class="mb-2">
          <label class="block font-medium mb-1">Select Trade Fair</label>
          <select id="feedback-fair" class="block w-full border rounded px-3 py-2">
            <option value="">Choose an event to review</option>
            ${fairs.map(fair => `<option value="${fair.id}">${fair.name}</option>`).join('')}
          </select>
        </div>
        <div class="mb-2">
          <label class="block font-medium mb-1">Overall Rating</label>
          <select id="feedback-rating" class="block w-full border rounded px-3 py-2">
            <option value="">Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="block font-medium mb-1" for="feedback-comments">Your Comments</label>
          <textarea id="feedback-comments" class="block w-full border rounded px-3 py-2" rows="3" placeholder="Share your thoughts..."></textarea>
        </div>
        <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Submit Feedback</button>
      </form>
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="font-semibold mb-2">Your Previous Reviews</h3>
        ${feedback.length === 0 ? `<div class="text-gray-500">No feedback submitted yet.</div>` : feedback.map(item => `
          <div class="border-b py-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-medium">${fairs.find(f => f.id === item.fairId)?.name || 'Unknown Fair'}</span>
              <span class="text-xs text-yellow-600">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</span>
              <span class="text-xs text-gray-400">${item.date}</span>
            </div>
            <div class="text-gray-700">${item.comments}</div>
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('feedback-form').onsubmit = function(e) {
      e.preventDefault();
      const fairId = document.getElementById('feedback-fair').value;
      const rating = parseInt(document.getElementById('feedback-rating').value);
      const comments = document.getElementById('feedback-comments').value.trim();
      if (!fairId || !rating || !comments) {
        alert('Please fill in all fields.');
        return;
      }
      feedback.push({ fairId, rating, comments, date: new Date().toLocaleDateString() });
      renderTab('feedback');
    };
  }
}

renderVisitorDashboard();
