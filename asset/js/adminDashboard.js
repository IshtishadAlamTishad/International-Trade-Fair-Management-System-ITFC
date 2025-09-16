
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

// Fetch all trade fairs
function fetchFairs() {
  return ajaxRequest('../controller/item/tradeFairController.php');
}

// Fetch all exhibitors
function fetchExhibitors() {
  return ajaxRequest('../controller/user/exhibitorController.php');
}

// Fetch all halls
function fetchHalls() {
  return ajaxRequest('../controller/item/hallController.php');
}

// Fetch all stalls
function fetchStalls() {
  return ajaxRequest('../controller/item/stallController.php');
}

// Fetch analytics (mocked for now)
function fetchAnalytics() {
  // Replace with AJAX if you have analytics controller
  return Promise.resolve({
    activeFairs: 3,
    totalExhibitors: 24,
    registeredVisitors: 120,
    totalRevenue: 12000,
    avgRating: 4.7,
    systemHealth: '100%'
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('admin-tab-content');
  if (!tabBtns.length || !tabContent) return;

  // Store loaded data
  let fairs = [], exhibitors = [], halls = [], stalls = [], analytics = {};

  // Load all data in parallel, with error handling
  Promise.all([
    fetchFairs().catch(() => []),
    fetchExhibitors().catch(() => []),
    fetchHalls().catch(() => []),
    fetchStalls().catch(() => []),
    fetchAnalytics().catch(() => ({}))
  ]).then(results => {
    [fairs, exhibitors, halls, stalls, analytics] = results;
  }).finally(() => {
    // Helper: Show only the selected tab content
    function showTab(tab) {
      const tabs = ['overview', 'fairs', 'exhibitors', 'halls', 'analytics'];
      tabs.forEach(t => {
        const el = document.getElementById('tab-' + t);
        if (el) el.classList.add('hidden');
      });
      const active = document.getElementById('tab-' + tab);
      if (active) {
        active.classList.remove('hidden');
        renderTab(tab);
      }
    }

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.className = 'tab-btn px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white');
        this.className = 'tab-btn px-4 py-2 rounded-lg font-medium bg-blue-600 text-white';
        const tab = this.getAttribute('data-tab');
        showTab(tab);
      });
    });

    // Render tab content dynamically
    function renderTab(tab) {
      if (tab === 'overview') {
        // Pending Approvals (dynamic)
        const pendingList = document.getElementById('pending-approvals-list');
        if (pendingList) {
          const pendingExhibitors = exhibitors.filter(ex => ex.Status && ex.Status.toLowerCase() === 'pending');
          pendingList.innerHTML = pendingExhibitors.length ? pendingExhibitors.map(ex => `
            <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <span class="font-medium">${ex.CompanyName || ex.EName}</span>
                <span class="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span>
              </div>
              <button class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs approve-pending-btn" data-id="${ex.ExhibitorID}">Approve</button>
            </div>
          `).join('') : '<div class="text-gray-500">No pending approvals.</div>';
          pendingList.querySelectorAll('.approve-pending-btn').forEach(btn => {
            btn.onclick = function() { approveExhibitor(this.dataset.id); };
          });
        }
        return;
      } else if (tab === 'halls') {
        // Render Halls & Stalls Table into the correct container
        const container = document.getElementById('halls-stalls-content');
        if (container) {
          let html = '';
          html += '<div class="mb-6">';
          html += '<h3 class="font-semibold mb-2">Halls</h3>';
          if (halls.length) {
            html += '<table class="min-w-full text-sm mb-4"><thead><tr class="bg-gray-100">';
            html += '<th class="px-4 py-2 text-left">Hall Name</th><th class="px-4 py-2 text-left">Location</th><th class="px-4 py-2 text-left">Building</th><th class="px-4 py-2 text-left">Floor</th><th class="px-4 py-2 text-left">Apt No</th><th class="px-4 py-2 text-left">Fair ID</th></tr></thead><tbody>';
            html += halls.map(function(hall) {
              return '<tr>' +
                '<td class="px-4 py-2">' + (hall.HName || '') + '</td>' +
                '<td class="px-4 py-2">' + (hall.Location || '') + '</td>' +
                '<td class="px-4 py-2">' + (hall.BuildingName || '') + '</td>' +
                '<td class="px-4 py-2">' + (hall.Floor || '') + '</td>' +
                '<td class="px-4 py-2">' + (hall.AptNo || '') + '</td>' +
                '<td class="px-4 py-2">' + (hall.FairID || '') + '</td>' +
              '</tr>';
            }).join('');
            html += '</tbody></table>';
          } else {
            html += '<div class="text-gray-500 mb-4">No halls found.</div>';
          }
          html += '</div>';
          html += '<div>';
          html += '<h3 class="font-semibold mb-2">Stalls</h3>';
          if (stalls.length) {
            html += '<table class="min-w-full text-sm"><thead><tr class="bg-gray-100">';
            html += '<th class="px-4 py-2 text-left">Stall ID</th><th class="px-4 py-2 text-left">Size</th><th class="px-4 py-2 text-left">Price</th><th class="px-4 py-2 text-left">Hall ID</th></tr></thead><tbody>';
            html += stalls.map(function(stall) {
              return '<tr>' +
                '<td class="px-4 py-2">' + (stall.StallID || '') + '</td>' +
                '<td class="px-4 py-2">' + (stall.S_ize || '') + '</td>' +
                '<td class="px-4 py-2">' + (stall.Price || '') + '</td>' +
                '<td class="px-4 py-2">' + (stall.HallID || '') + '</td>' +
              '</tr>';
            }).join('');
            html += '</tbody></table>';
          } else {
            html += '<div class="text-gray-500">No stalls found.</div>';
          }
          html += '</div>';
          container.innerHTML = html;
        }
        return;
      } else if (tab === 'analytics') {
        // No dynamic content yet for analytics
        return;
      }
    }

    // CRUD functions for admin
    window.editFair = function(fairId) {
      // Show fair edit modal (implement as needed)
      alert('Edit Fair: ' + fairId);
    };
    window.deleteFair = function(fairId) {
      if (confirm('Delete this fair?')) {
        ajaxRequest('../controller/item/tradeFairController.php', 'POST', { action: 'delete', FairID: fairId })
          .then(() => location.reload());
      }
    };
    window.approveExhibitor = function(exhibitorId) {
      ajaxRequest('../controller/user/exhibitorController.php', 'POST', { action: 'approve', ExhibitorID: exhibitorId })
        .then(() => location.reload());
    };
    window.deleteExhibitor = function(exhibitorId) {
      if (confirm('Delete this exhibitor?')) {
        ajaxRequest('../controller/user/exhibitorController.php', 'POST', { action: 'delete', ExhibitorID: exhibitorId })
          .then(() => location.reload());
      }
    };

    showTab('overview');
  }); // End of finally
}); // End of DOMContentLoaded