// home.js  

document.addEventListener('DOMContentLoaded', function() {
  const app = document.getElementById('app');
  renderAuthPage(app);
});

function renderAuthPage(container) {
  container.innerHTML = `
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">ITFC</div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">ITFC Trade Fair</h1>
            <p class="text-sm text-gray-600">Management System</p>
          </div>
        </div>
        <div class="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
          <button class="border border-blue-600 text-blue-600 bg-transparent rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition">About</button>
          <button class="border border-blue-600 text-blue-600 bg-transparent rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition">Contact</button>
          <button class="border border-blue-600 text-blue-600 bg-white rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition">Help</button>
        </div>
      </div>
    </div>
    <div class="min-h-[calc(100vh-80px)] flex items-center justify-center px-2 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div class="w-full max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to ITFC Trade Fair Platform</h2>
          <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Comprehensive platform for managing international trade fairs, connecting exhibitors with visitors, and streamlining event operations.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div class="space-y-8">
            <div class="grid gap-6">
              <div class="bg-white rounded-lg shadow-xl p-6 border-l-4 border-blue-500">
                <div class="flex items-start gap-4">
                  <div class="text-2xl text-blue-600">&#128101;</div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2">ITFC Staff Dashboard</h3>
                    <p class="text-gray-600">Complete control over trade fair operations, exhibitor management, and analytics</p>
                    <ul class="mt-3 space-y-1 text-sm text-gray-500">
                      <li>&bull; Fair & Hall Management</li>
                      <li>&bull; Exhibitor Approval Process</li>
                      <li>&bull; Revenue & Analytics Tracking</li>
                      <li>&bull; Visitor Management</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-xl p-6 border-l-4 border-green-500">
                <div class="flex items-start gap-4">
                  <div class="text-2xl text-green-600">&#127970;</div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2">Exhibitor Portal</h3>
                    <p class="text-gray-600">Comprehensive tools for exhibitors to manage their trade fair presence</p>
                    <ul class="mt-3 space-y-1 text-sm text-gray-500">
                      <li>&bull; Product Catalog Management</li>
                      <li>&bull; Stall Booking & Payments</li>
                      <li>&bull; Sales Performance Tracking</li>
                      <li>&bull; Lead Generation Tools</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-xl p-6 border-l-4 border-purple-500">
                <div class="flex items-start gap-4">
                  <div class="text-2xl text-purple-600">&#128197;</div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2">Visitor Experience</h3>
                    <p class="text-gray-600">Seamless registration and engagement platform for trade fair attendees</p>
                    <ul class="mt-3 space-y-1 text-sm text-gray-500">
                      <li>&bull; Easy Registration Process</li>
                      <li>&bull; Digital Ticket Management</li>
                      <li>&bull; Exhibitor Discovery</li>
                      <li>&bull; Feedback & Rating System</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="bg-white rounded-lg shadow-xl max-w-md mx-auto w-full p-6 md:p-8 border border-gray-200">
              <div class="text-center mb-6">
                <div id="auth-tabs" class="grid grid-cols-2 gap-2">
                  <button id="tab-login" class="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white">Sign In</button>
                  <button id="tab-signup" class="px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white">Sign Up</button>
                </div>
              </div>
              <div id="auth-form"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  renderLoginForm();
  document.getElementById('tab-login').onclick = function() {
    renderLoginForm();
    this.className = 'px-4 py-2 rounded-lg font-medium bg-blue-600 text-white';
    document.getElementById('tab-signup').className = 'px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white';
  };
  document.getElementById('tab-signup').onclick = function() {
    renderSignupForm();
    this.className = 'px-4 py-2 rounded-lg font-medium bg-blue-600 text-white';
    document.getElementById('tab-login').className = 'px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white';
  };
}

function renderLoginForm() {
  const form = document.getElementById('auth-form');
  form.innerHTML = `
    <div class="space-y-4">
      <label class="block font-medium text-gray-700" for="login-email">Email Address</label>
      <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="login-email" type="email" placeholder="Enter your email">
      <label class="block font-medium text-gray-700" for="login-password">Password</label>
      <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="login-password" type="password" placeholder="Enter your password">
      <button class="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition" id="login-btn">Sign In</button>
      <div class="bg-blue-50 p-4 rounded-lg mt-6">
        <p class="text-sm font-medium text-blue-800 mb-2">Try Demo Accounts:</p>
        <button class="w-full border border-blue-600 text-blue-600 bg-white rounded-lg px-4 py-2 font-medium mb-2 hover:bg-blue-50 transition" onclick="setDemoCredentials('admin')">Admin: admin@itfc.com / admin123</button>
        <button class="w-full border border-blue-600 text-blue-600 bg-white rounded-lg px-4 py-2 font-medium mb-2 hover:bg-blue-50 transition" onclick="setDemoCredentials('exhibitor')">Exhibitor: exhibitor@company.com / expo123</button>
        <button class="w-full border border-blue-600 text-blue-600 bg-white rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition" onclick="setDemoCredentials('visitor')">Visitor: visitor@email.com / visit123</button>
      </div>
    </div>
  `;
  document.getElementById('login-btn').onclick = function() {
    alert('Login logic goes here.');
  };
}

function renderSignupForm() {
  const form = document.getElementById('auth-form');
  form.innerHTML = `
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium text-gray-700" for="signup-firstname">First Name</label>
          <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="signup-firstname" placeholder="John">
        </div>
        <div>
          <label class="block font-medium text-gray-700" for="signup-lastname">Last Name</label>
          <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="signup-lastname" placeholder="Smith">
        </div>
      </div>
      <label class="block font-medium text-gray-700" for="signup-email">Email Address</label>
      <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="signup-email" type="email" placeholder="john@company.com">
      <label class="block font-medium text-gray-700" for="signup-password">Password</label>
      <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="signup-password" type="password" placeholder="Create a secure password">
      <label class="block font-medium text-gray-700" for="signup-role">Account Type</label>
      <select class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="signup-role">
        <option value="">Select your role</option>
        <option value="admin">ITFC Staff (Administrator)</option>
        <option value="exhibitor">Exhibitor</option>
        <option value="visitor">Visitor</option>
      </select>
      <label class="block font-medium text-gray-700" for="signup-company">Company Name (Optional)</label>
      <input class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="signup-company" placeholder="Your company name">
      <button class="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition" id="signup-btn">Create Account</button>
    </div>
  `;
  document.getElementById('signup-btn').onclick = function() {
    alert('Signup logic goes here.');
  };
}

window.setDemoCredentials = function(role) {
  const creds = {
    admin: { email: 'admin@itfc.com', password: 'admin123', redirect: '../view/adminDashboard.html' },
    exhibitor: { email: 'exhibitor@company.com', password: 'expo123', redirect: '../view/exhibitorDashboard.html' },
    visitor: { email: 'visitor@email.com', password: 'visit123', redirect: '../view/visitorDashboard.html' }
  };
  document.getElementById('login-email').value = creds[role].email;
  document.getElementById('login-password').value = creds[role].password;
  setTimeout(function() {
    window.location.href = creds[role].redirect;
  }, 500);
};
