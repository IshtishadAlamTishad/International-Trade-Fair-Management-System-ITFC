//Admin Dashboard JS

document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('admin-tab-content');
  if (!tabBtns.length || !tabContent) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.className = 'tab-btn px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white');
      this.className = 'tab-btn px-4 py-2 rounded-lg font-medium bg-blue-600 text-white';
      if (this.getAttribute('data-tab') === 'activities') {
        tabContent.innerHTML = `
          <ul class="divide-y divide-gray-100">
            <li class="py-3 flex items-center justify-between"> <span class="flex items-center gap-2 text-green-600 font-medium"><svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg> System initialized with demo data</span> <span class="text-xs text-gray-400">Just now</span> </li>
            <li class="py-3 flex items-center justify-between"> <span class="flex items-center gap-2 text-blue-600 font-medium"><svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg> Trade fair platform activated</span> <span class="text-xs text-gray-400">Today</span> </li>
          </ul>
        `;
      } else {
        tabContent.innerHTML = '<div class="text-gray-400 text-center py-8">No data for this tab in demo.</div>';
      }
    });
  });
});
