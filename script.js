// WELCOME MODAL
document.addEventListener('DOMContentLoaded', (event) => {
    // Show the welcome modal
    document.getElementById('welcomeModal').classList.remove('hidden');

    // Event listener for closing the welcome modal is already correctly set up
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('welcomeModal').classList.add('hidden');
    });
});

// DYNAMIC TEAM 3 FORM OPTION
document.addEventListener('DOMContentLoaded', () => {
    // Listen for changes on radio buttons named 'teamCount'
    document.querySelectorAll('input[name="teamCount"]').forEach(input => {
        input.addEventListener('change', (event) => {
            const team3Section = document.getElementById('team3Section');
            if (event.target.value === '3') {
                team3Section.classList.remove('hidden'); // Show Team 3 section
            } else {
                team3Section.classList.add('hidden'); // Hide Team 3 section
            }
        });
    });
});



    