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

