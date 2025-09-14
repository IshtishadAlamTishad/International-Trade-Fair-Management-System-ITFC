//Admin Dashboard JS

document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('admin-tab-content');
  if (!tabBtns.length || !tabContent) return;

  // Helper: Show only the selected tab content
  function showTab(tab) {
    const tabs = ['overview', 'fairs', 'exhibitors', 'halls', 'analytics'];
    tabs.forEach(t => {
      const el = document.getElementById('tab-' + t);
      if (el) el.classList.add('hidden');
    });
    const active = document.getElementById('tab-' + tab);
    if (active) active.classList.remove('hidden');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.className = 'tab-btn px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white');
      this.className = 'tab-btn px-4 py-2 rounded-lg font-medium bg-blue-600 text-white';
      const tab = this.getAttribute('data-tab');
      showTab(tab);
    });
  });

  // Show default tab
  showTab('overview');
});
