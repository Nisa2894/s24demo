document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const providersList = document.getElementById('providers-list');
    const seekersList = document.getElementById('seekers-list');

    // Admin Login (Demo: username: admin, password: admin123)
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin123') {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            loadProviders();
            loadSeekers();
        } else {
            alert('Invalid credentials');
        }
    });

    async function loadProviders() {
        try {
            const response = await fetch('/api/providers');
            const providers = await response.json();
            providersList.innerHTML = '';
            providers.forEach(provider => {
                const card = document.createElement('div');
                card.className = 'bg-white p-6 rounded shadow-lg';
                card.innerHTML = `
                    <h3 class="text-xl font-bold">${provider.name}</h3>
                    <p><strong>Expertise:</strong> ${provider.expertise}</p>
                    <p><strong>Location:</strong> ${provider.address}</p>
                    <p><strong>Status:</strong> ${provider.verified ? 'Verified' : 'Not Verified'}</p>
                    <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4" onclick="toggleProviderVerification(${provider.id})">
                        ${provider.verified ? 'Unverify' : 'Verify'}
                    </button>
                `;
                providersList.appendChild(card);
            });
        } catch (error) {
            alert('Error loading providers: ' + error.message);
        }
    }

    async function loadSeekers() {
        try {
            const response = await fetch('/api/seekers');
            const seekers = await response.json();
            seekersList.innerHTML = '';
            seekers.forEach(seeker => {
                const card = document.createElement('div');
                card.className = 'bg-white p-6 rounded shadow-lg';
                card.innerHTML = `
                    <h3 class="text-xl font-bold">${seeker.name}</h3>
                    <p><strong>Address:</strong> ${seeker.address}</p>
                    <p><strong>Status:</strong> ${seeker.verified ? 'Verified' : 'Not Verified'}</p>
                    <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4" onclick="toggleSeekerVerification(${seeker.id})">
                        ${seeker.verified ? 'Unverify' : 'Verify'}
                    </button>
                `;
                seekersList.appendChild(card);
            });
        } catch (error) {
            alert('Error loading seekers: ' + error.message);
        }
    }

    window.toggleProviderVerification = async (id) => {
        try {
            const response = await fetch(`/api/providers/${id}/verify`, {
                method: 'PUT',
            });
            if (response.ok) {
                loadProviders();
            } else {
                alert('Error updating provider verification status');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    window.toggleSeekerVerification = async (id) => {
        try {
            const response = await fetch(`/api/seekers/${id}/verify`, {
                method: 'PUT',
            });
            if (response.ok) {
                loadSeekers();
            } else {
                alert('Error updating seeker verification status');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
});
