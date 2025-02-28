let users = JSON.parse(localStorage.getItem('users') || '{}');
let votedUsers = JSON.parse(localStorage.getItem('votedUsers') || '[]');
let votes = JSON.parse(localStorage.getItem('votes')) || {1: 0, 2: 0, 3: 0};

function updateStats() {
    const total = votes[1] + votes[2] + votes[3];
    for(let i = 1; i <= 3; i++) {
        document.getElementById(`votes${i}`).textContent = votes[i];
        const percent = total > 0 ? ((votes[i]/total)*100).toFixed(1) : 0;
        document.getElementById(`percent${i}`).textContent = `${percent}%`;
    }
}

function login() {
    const email = document.getElementById('email').value;
    const age = parseInt(document.getElementById('age').value);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('অনুগ্রহ করে বৈধ ইমেইল দিন');
        return;
    }

    if (age < 18 || age > 120 || isNaN(age)) {
        alert('ভোট দেওয়ার জন্য আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে');
        return;
    }

    if (users[email]) {
        alert('এই ইমেইল দিয়ে ইতিমধ্যে লগইন করা হয়েছে');
        return;
    }

    users[email] = true;
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('votingContainer').style.display = 'block';
}

function vote(party) {
    const email = document.getElementById('email').value;
    
    if(votedUsers.includes(email)) {
        alert('আপনি ইতিমধ্যে ভোট দিয়েছেন!');
        return;
    }

    votes[party]++;
    votedUsers.push(email);
    
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('votedUsers', JSON.stringify(votedUsers));
    
    updateStats();
    alert('ধন্যবাদ! আপনার ভোট রেকর্ড করা হয়েছে।');
}

// Initialize on load
window.onload = updateStats;