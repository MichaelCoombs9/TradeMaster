document.addEventListener('DOMContentLoaded', (event) => {
    // Show the welcome modal
    document.getElementById('welcomeModal').classList.remove('hidden');

    // Event listener for closing the welcome modal is already correctly set up
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('welcomeModal').classList.add('hidden');
    });

    // Optionally, update the guess count or perform other initialization logic here
});
    