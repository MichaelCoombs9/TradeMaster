import teData from './TE_Rankings.js';


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

// SUGGESTION BOX
// Attach event listeners to both input fields
document.getElementById('playerSearchTeam1').addEventListener('input', handleInput);
document.getElementById('playerSearchTeam2').addEventListener('input', handleInput);

// Handle input for both fields
function handleInput(e) {
  const userInput = e.target.value.toLowerCase();
  const filteredPlayers = teData.filter(player => player.playerName.toLowerCase().includes(userInput));

  // Pass the id of the input field to displaySuggestions to know which suggestions box to show
  displaySuggestions(filteredPlayers, e.target.id);
}

// Update the displaySuggestions function to accept the id of the input field
function displaySuggestions(filteredPlayers, inputId) {
    // Get the input element by its ID to check its value
    const inputElement = document.getElementById(inputId); // Define inputElement at the beginning
  
    // Determine which suggestion box and selected players div to use based on the input ID
    const suffix = inputId === 'playerSearchTeam1' ? 'Team1' : 'Team2';
    const suggestionBox = document.getElementById(`suggestionBox${suffix}`);
      // Ensure this ID matches your HTML structure for where selected players are displayed
    const selectedPlayersDiv = document.getElementById(`selected-players${suffix}`);
  
    // Now inputElement is defined and can be used to check its value
    if (filteredPlayers.length === 0 || inputElement.value === '') {
      suggestionBox.style.display = 'none';
    } else {
      suggestionBox.innerHTML = ''; // Clear existing suggestions first
      filteredPlayers.slice(0, 5).forEach(player => { 
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'p-2 hover:bg-gray-600 cursor-pointer text-white';
        suggestionElement.textContent = player.playerName;
        suggestionElement.onclick = () => {
            handlePlayerSelection(player, selectedPlayersDiv); // Make sure this is correctly referencing the div where selected players should be added.
            suggestionBox.style.display = 'none'; // Hide suggestions box
            inputElement.value = ''; // Optionally clear the input field if desired
          };          
        suggestionBox.appendChild(suggestionElement);
      });
      suggestionBox.style.display = 'block';
    }
  }  

// Function to handle player selection and display
function handlePlayerSelection(player, selectedPlayersDiv) {

    // Create the wrapper for the selected player
    const playerWrapper = document.createElement('div');
    playerWrapper.className = 'flex items-center justify-between bg-blue-100 p-2 rounded m-1';
  
    // Player details
    const playerDetails = document.createElement('div');
    const playerName = document.createElement('p');
    playerName.className = 'text-sm font-semibold';
    const playerLink = document.createElement('a');
    playerLink.href = `/dynasty-rankings/players/${player.id}`;
    playerLink.target = '_blank';
    playerLink.className = 'text-blue-500 hover:text-blue-700';
    playerLink.textContent = player.playerName;
    playerName.appendChild(playerLink);
  
    const playerPosition = document.createElement('p');
    playerPosition.className = 'text-xs text-gray-600';
    playerPosition.textContent = `${player.position} • ${player.team} • ${player.age} y.o.`;
  
    playerDetails.appendChild(playerName);
    playerDetails.appendChild(playerPosition);
  
    // Player value and remove button
    const playerValueRemove = document.createElement('div');
    playerValueRemove.className = 'flex items-center';
  
    const playerValue = document.createElement('p');
    playerValue.className = 'text-sm font-semibold mr-2';
    playerValue.textContent = player.value;
  
    const removeButton = document.createElement('button');
    removeButton.className = 'bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded';
    removeButton.textContent = 'X'; 
    removeButton.onclick = function() { 
      selectedPlayersDiv.removeChild(playerWrapper);
    };
  
    playerValueRemove.appendChild(playerValue);
    playerValueRemove.appendChild(removeButton);
  
    // Combine everything into the wrapper
    playerWrapper.appendChild(playerDetails);
    playerWrapper.appendChild(playerValueRemove);
  
    // Append the wrapper to the selected players div
    selectedPlayersDiv.appendChild(playerWrapper);
  }


//   INPUT BOX
  document.addEventListener('DOMContentLoaded', () => {
    const commentBox = document.getElementById('commentBox');
    const charCountElement = document.getElementById('charCount');
  
    // Initialize the character count on page load
    charCountElement.textContent = '300';
  
    commentBox.addEventListener('input', function() {
      const remainingChars = 300 - this.value.length;
      charCountElement.textContent = remainingChars;
  
      // Change border color based on the character count
      if(remainingChars < 1) {
        commentBox.classList.remove('border-green-500');
        commentBox.classList.add('border-red-500');
      } else {
        commentBox.classList.remove('border-red-500');
        commentBox.classList.add('border-green-500');
      }
    });
  });
  


//   3 TEAM OPTION
// First, define a function to show the modal
function showComingSoonModal() {
    // Create your modal element or get it if it's already in the HTML
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center';
    modal.id = 'comingSoonModal';
    modal.innerHTML = `
    <div class="bg-white p-6 rounded shadow-md text-center">
    <h2 class="text-lg font-bold mb-2">Comming Soon!</h2>
    <p>3-Way trades are under developement,</p>\n<p>and will be available soon.</p>
    <button id="modal-ok-button" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Close</button>
  </div>  
    `;
  
    // Append the modal to the body
    document.body.appendChild(modal);
  
    // Now add the event listener to the button
    document.getElementById('modal-ok-button').addEventListener('click', closeComingSoonModal);
  }
  // Define a function to close the modal and revert the radio button selection
  function closeComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
      modal.remove();

        // Revert the radio button selection to two teams
  document.querySelector('input[name="teamCount"][value="2"]').checked = true;
  // Directly call the logic to hide the team 3 section
  const team3Section = document.getElementById('team3Section');
  team3Section.classList.add('hidden');
    }
    // Revert the radio button selection to two teams
    document.querySelector('input[name="teamCount"][value="2"]').checked = true;
  }  
  // Update the event listener for the radio buttons
  document.querySelectorAll('input[name="teamCount"]').forEach(input => {
      input.addEventListener('change', (event) => {
          if (event.target.value === '3') {
              // Show the coming soon modal
              showComingSoonModal();
          } else {
              const team3Section = document.getElementById('team3Section');
              team3Section.classList.add('hidden'); // Hide Team 3 section if it's not hidden already
          }
      });
  });
   
  




    