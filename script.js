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
  // Determine which suggestion box and selected players div to use based on the input ID
  const suffix = inputId === 'playerSearchTeam1' ? 'Team1' : 'Team2';
  const suggestionBox = document.getElementById(`suggestionBox${suffix}`);
  const selectedPlayersDiv = document.getElementById(`selected-players${suffix}`);

    filteredPlayers.forEach(player => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'p-2 hover:bg-gray-600 cursor-pointer text-white';
        suggestionElement.textContent = player.playerName;
        suggestionElement.onclick = () => {
            handlePlayerSelection(player, selectedPlayersDiv); // Pass the correct div for the selected team
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
            document.getElementById(inputId).value = ''; // Empty the correct text field
          };
        suggestionBox.appendChild(suggestionElement);
    }); 
        suggestionBox.style.display = 'block';
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
    removeButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';
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

  




    