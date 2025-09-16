
// Utility function for AJAX requests
function ajaxRequest(url, method = 'GET', data = null) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: method === 'POST' && data ? new URLSearchParams(data).toString() : undefined
  }).then(res => res.json());
}

// Fetch visitor profile
function fetchVisitorProfile() {
  return ajaxRequest('../controller/user/visitorController.php');
}

// Fetch visitor tickets
function fetchVisitorTickets() {
  return ajaxRequest('../controller/item/ticketController.php');
}

// Fetch visitor interests
function fetchVisitorInterests() {
  return ajaxRequest('../controller/item/visitorInterestController.php');
}

// Fetch feedback
function fetchVisitorFeedback() {
  return ajaxRequest('../controller/item/feedbackController.php');
}

// Fetch trade fairs (mocked for now)
function fetchTradeFairs() {
  // Replace with AJAX if you have a controller for fairs
  return Promise.resolve([
    { FairID: 1, TName: 'International Tech Expo 2024', Description: 'A global event for technology and innovation.', City: 'New York', StartDate: '2024-03-15', EndDate: '2024-03-17', status: 'active', exhibitors: ['A', 'B'], visitors: ['X', 'Y'], revenue: 10000 },
    { FairID: 2, TName: 'Fashion Week 2024', Description: 'Showcasing the latest in fashion.', City: 'Paris', StartDate: '2024-04-20', EndDate: '2024-04-25', status: 'upcoming', exhibitors: ['C'], visitors: ['Z'], revenue: 5000 }
  ]);
}

async function renderVisitorDashboard() {
  const el = document.getElementById('visitor-dashboard');
  const [profile, tickets, interests, feedbacks, fairs] = await Promise.all([
    fetchVisitorProfile(),
    fetchVisitorTickets(),
    fetchVisitorInterests(),
    fetchVisitorFeedback(),
    fetchTradeFairs()
  ]);

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
            <span class="text-sm text-gray-700">Welcome, ${profile.FirstName}</span>
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
          <div class="text-2xl font-bold">${tickets[0]?.Type || tickets[0]?.type || 'N/A'}</div>
          <p class="text-xs text-gray-400">Full access pass</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Feedback Given</span>
            <svg class="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"/></svg>
          </div>
          <div class="text-2xl font-bold">${feedbacks.length}</div>
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
  renderTab('profile', profile, tickets, interests, feedbacks, fairs);
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.className = 'tab-btn px-4 py-2 rounded-lg font-medium border border-purple-600 text-purple-600 bg-white');
      this.className = 'tab-btn px-4 py-2 rounded-lg font-medium bg-purple-600 text-white';
      renderTab(this.getAttribute('data-tab'), profile, tickets, interests, feedbacks, fairs);
    });
  });
}

function renderTab(tab, profile, tickets, interests, feedbacks, fairs) {
  const content = document.getElementById('tab-content');
  if (tab === 'profile') {
    content.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Welcome, ${profile.FirstName}!</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-purple-50 p-4 rounded-lg mb-4">
          <div class="font-medium">Name: ${profile.FirstName} ${profile.LastName}</div>
          <div>Email: ${profile.EmailAddress}</div>
          <div>Phone: ${profile.Phone}</div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <div class="font-medium">Interests</div>
          <div>${Array.isArray(interests) ? interests.map(i => i.Interest).join(', ') : ''}</div>
        </div>
      </div>
    `;
  } else if (tab === 'tickets') {
    content.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">My Tickets</h2>
        <button class="border border-purple-600 text-purple-600 px-4 py-2 rounded">Export Ticket</button>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg mb-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-2xl font-bold mb-2">${tickets[0]?.Type || 'N/A'} Access Pass</h3>
            <p class="text-purple-100">ITFC Official Visitor Ticket</p>
          </div>
          <svg class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div>
            <div class="text-purple-100 text-sm">Visitor Name</div>
            <p class="font-semibold text-lg">${profile.FirstName} ${profile.LastName}</p>
          </div>
          <div>
            <div class="text-purple-100 text-sm">Ticket ID</div>
            <p class="font-mono">${tickets[0]?.TicketID || 'N/A'}</p>
          </div>
          <div>
            <div class="text-purple-100 text-sm">Valid For</div>
            <p class="font-semibold">All Current Events</p>
          </div>
          <div>
            <div class="text-purple-100 text-sm">Access Level</div>
            <p class="font-semibold">${tickets[0]?.Type || 'N/A'}</p>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'events') {
    content.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Available Trade Fairs</h2>
        <button class="border border-purple-600 text-purple-600 px-4 py-2 rounded">Browse All</button>
      </div>
      <div class="grid gap-6">
        ${fairs.map(fair => `
          <div class="bg-white border-l-4 ${fair.status === 'active' ? 'border-blue-500' : fair.status === 'upcoming' ? 'border-purple-500' : 'border-gray-500'} rounded-lg shadow p-6">
            <div class="flex items-center space-x-3 mb-3">
              <div class="text-xl font-semibold">${fair.TName || fair.name}</div>
              <span class="inline-block px-2 py-1 rounded text-xs ${fair.status === 'active' ? 'bg-blue-600 text-white' : fair.status === 'upcoming' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-white'}">${fair.status}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600 mb-4">
              <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V9a4 4 0 00-3-3.87M9 4V3a4 4 0 013-3.87"/></svg>
              ${fair.City || fair.location} • ${new Date(fair.StartDate || fair.startDate).toLocaleDateString()} - ${new Date(fair.EndDate || fair.endDate).toLocaleDateString()}
            </div>
            <div class="text-gray-600 mb-6">${fair.Description || fair.description}</div>
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center bg-gray-50 p-3 rounded-lg">
                <div class="font-bold text-lg">${fair.exhibitors?.length || 0}</div>
                <div class="text-sm text-gray-600">Exhibitors</div>
              </div>
              <div class="text-center bg-gray-50 p-3 rounded-lg">
                <div class="font-bold text-lg">${fair.visitors?.length || 0}+</div>
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
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Feedback & Reviews</h2>
        <button class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center">Submit New Feedback</button>
      </div>
      <form id="feedback-form" class="mb-6">
        <div class="mb-2">
          <label class="block font-medium mb-1">Select Trade Fair</label>
          <select id="feedback-fair" class="block w-full border rounded px-3 py-2">
            <option value="">Choose an event to review</option>
            ${fairs.map(fair => `<option value="${fair.FairID}">${fair.TName}</option>`).join('')}
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
      <div class="flex justify-end mb-2">
        <button class="border border-purple-600 text-purple-600 px-4 py-2 rounded">Export Report</button>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="font-semibold mb-2">Your Previous Reviews</h3>
        ${feedbacks.length === 0 ? `<div class="text-gray-500">No feedback submitted yet.</div>` : feedbacks.map(item => `
          <div class="border-b py-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-medium">${fairs.find(f => f.FairID == item.FairID)?.TName || 'Unknown Fair'}</span>
              <span class="text-xs text-yellow-600">${'★'.repeat(item.Rating || item.rating)}${'☆'.repeat(5-(item.Rating || item.rating))}</span>
              <span class="text-xs text-gray-400">${item.date || item.Comments}</span>
            </div>
            <div class="text-gray-700">${item.Comments || item.comments}</div>
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('feedback-form').onsubmit = function(e) {
      e.preventDefault();
      const FairID = document.getElementById('feedback-fair').value;
      const Rating = parseInt(document.getElementById('feedback-rating').value);
      const Comments = document.getElementById('feedback-comments').value.trim();
      if (!FairID || !Rating || !Comments) {
        alert('Please fill in all fields.');
        return;
      }
      ajaxRequest('../controller/item/feedbackController.php', 'POST', {
        action: 'create',
        FairID,
        VisitorID: profile.VisitorID,
        Rating,
        Comments
      }).then(() => {
        renderVisitorDashboard();
      });
    };
  }
}

renderVisitorDashboard();
