
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
  return ajaxRequest('../controller/item/exhibitorController.php');
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
      }
      if (tab === 'fairs') {
        const fairsList = document.querySelector('#tab-fairs .space-y-4');
        if (fairsList) {
          fairsList.innerHTML = fairs.map(fair => `
            <div class="border-l-4 border-green-500 bg-gray-50 rounded p-4 flex justify-between items-center">
              <div>
                <div class="font-bold">${fair.TName}</div>
                <div class="text-sm text-gray-600">${fair.City} • ${fair.StartDate ? new Date(fair.StartDate).toLocaleDateString() : ''}-${fair.EndDate ? new Date(fair.EndDate).toLocaleDateString() : ''}</div>
              </div>
              <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">${fair.status || ''}</span>
              <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs fair-edit-btn" data-id="${fair.FairID}">Edit</button>
              <button class="bg-red-600 text-white px-3 py-1 rounded text-xs fair-delete-btn" data-id="${fair.FairID}">Delete</button>
            </div>
          `).join('');
          // Attach event listeners for edit/delete
          fairsList.querySelectorAll('.fair-edit-btn').forEach(btn => {
            btn.onclick = function() { editFair(this.dataset.id); };
          });
          fairsList.querySelectorAll('.fair-delete-btn').forEach(btn => {
            btn.onclick = function() { deleteFair(this.dataset.id); };
          });
        }
      } else if (tab === 'exhibitors') {
        const exhibitorTable = document.getElementById('exhibitor-applications-list');
        if (exhibitorTable) {
          exhibitorTable.innerHTML = exhibitors.map(ex => `
            <tr>
              <td class="px-4 py-2">${ex.CompanyName || ex.EName}</td>
              <td class="px-4 py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">${ex.Status || ''}</span></td>
              <td class="px-4 py-2">${ex.Stalls || ''}</td>
              <td class="px-4 py-2">
                <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs exhibitor-approve-btn" data-id="${ex.ExhibitorID}">Approve</button>
                <button class="bg-red-600 text-white px-3 py-1 rounded text-xs exhibitor-delete-btn" data-id="${ex.ExhibitorID}">Delete</button>
              </td>
            </tr>
          `).join('');
          // Attach event listeners for approve/delete
          exhibitorTable.querySelectorAll('.exhibitor-approve-btn').forEach(btn => {
            btn.onclick = function() { approveExhibitor(this.dataset.id); };
          });
          exhibitorTable.querySelectorAll('.exhibitor-delete-btn').forEach(btn => {
            btn.onclick = function() { deleteExhibitor(this.dataset.id); };
          });
        }
      } else if (tab === 'halls') {
        // No dynamic content yet for halls
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
      ajaxRequest('../controller/item/exhibitorController.php', 'POST', { action: 'approve', ExhibitorID: exhibitorId })
        .then(() => location.reload());
    };
    window.deleteExhibitor = function(exhibitorId) {
      if (confirm('Delete this exhibitor?')) {
        ajaxRequest('../controller/item/exhibitorController.php', 'POST', { action: 'delete', ExhibitorID: exhibitorId })
          .then(() => location.reload());
      }
    };

    showTab('overview');
  });
});