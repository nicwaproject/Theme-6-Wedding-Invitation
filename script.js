// Function to get guest name from URL
function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('guest') || "Guest"; // Default to "Guest" if no name provided
}

// Function to display guest name on the cover
document.addEventListener('DOMContentLoaded', () => {
    const guestName = getGuestName();
    document.getElementById('guest-name').textContent = guestName;

    // Handle button click to open invitation
    document.getElementById('openInvitationBtn').addEventListener('click', () => {
        // Hide the cover
        document.getElementById('cover').style.display = 'none';
        // Show navigation and section 1
        document.getElementById('navigation').style.display = 'block';
        showSection('section1');
    });

    // Handle navigation buttons
    const navButtons = document.querySelectorAll('#navigation a');
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionToShow = button.getAttribute('data-section');
            showSection(sectionToShow);
        });
    });


    const countdown = () => {
      const weddingDate = new Date("2024-12-31T00:00:00").getTime(); // Set tanggal pernikahan
      const now = new Date().getTime();
      const timeDiff = weddingDate - now;
      
      // Perhitungan waktu (hari, jam, menit, detik)
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      // Update elemen countdown
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;
  
      // Jika countdown selesai, tampilkan pesan
      if (timeDiff < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h2>The Event Has Started!</h2>";
      }
    };
    
    // Perbarui countdown setiap detik
    const timer = setInterval(countdown, 1000);

     // Mengambil data RSVP ketika halaman dimuat
fetch('https://tema-4-rsvp-handle.glitch.me/rsvps')
.then(response => response.json())
.then(data => {
  data.forEach(item => {
    const messageItem = document.createElement('div');
    messageItem.classList.add('message-item');
    messageItem.innerHTML = `
      <h4>${item.name} (${item.attendance})</h4>
      <p>${item.message}</p>
    `;
    document.getElementById('messageList').appendChild(messageItem);
  });
})
.catch(error => console.error('Error fetching RSVP data:', error));

// Menangani form RSVP
document.getElementById('rsvpForm').addEventListener('submit', function (event) {
event.preventDefault(); // Prevent default form submission

// Get form data
const guestNameRSVP = document.getElementById('guestNameRSVP').value.trim(); // Ganti ID
const guestMessage = document.getElementById('guestMessage').value.trim();
const attendance = document.getElementById('attendance').value;

// Check if all required fields are filled
if (!guestNameRSVP || !guestMessage || !attendance) {
  alert('Please fill out all fields.');
  return;
}

// Create an object with form data
const formData = {
  name: guestNameRSVP,
  message: guestMessage,
  attendance: attendance
};

// Submit form data
fetch('https://tema-4-rsvp-handle.glitch.me/rsvp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    alert('RSVP submitted successfully!');
    location.reload(); // Optionally, reload the page after submission
  } else {
    alert('Error: ' + data.error);
  }
})
.catch(error => {
  console.error('Error submitting RSVP:', error);
});
});
});

// Function to show a specific section within the frame
function showSection(sectionId) {
    // Hide all sections within the frame
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    // Show the selected section's content
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'flex'; // Use flex to center the content
}

