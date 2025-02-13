import { setIsPaused, setGameIsOver } from "../utils/utils.js";


export function createDialogueOverlay(leftCharacterImg, rightCharacterImg, dialogueArray) {
    let currentDialogueIndex = 0;
    setIsPaused(true);

    // Remove existing overlay if present
    let existingOverlay = document.getElementById("dialogueOverlay");
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = "dialogueOverlay";

    // Character container
    const characterContainer = document.createElement("div");
    characterContainer.classList.add("character-container");

    // Left character image
    const leftCharacter = document.createElement("img");
    leftCharacter.src = leftCharacterImg;
    leftCharacter.classList.add("character-image");

    // Left character name
    const leftNameBox = document.createElement("div");
    leftNameBox.id = "left-name-box";
    leftNameBox.classList.add("character-name");

    // Right character image
    const rightCharacter = document.createElement("img");
    rightCharacter.src = rightCharacterImg;
    rightCharacter.classList.add("character-image");

    // Right character name
    const rightNameBox = document.createElement("div");
    rightNameBox.id = "right-name-box";
    rightNameBox.classList.add("character-name");

    // Append character images and name boxes to character container
    characterContainer.appendChild(leftCharacter);
    characterContainer.appendChild(leftNameBox);
    characterContainer.appendChild(rightCharacter);
    characterContainer.appendChild(rightNameBox);

    // Dialogue text box
    const dialogueBox = document.createElement("div");
    dialogueBox.id = "dialogueBox";

    // Append all elements to overlay
    overlay.appendChild(characterContainer);
    overlay.appendChild(dialogueBox);

    // Add overlay to the body
    document.body.appendChild(overlay);

    // Make overlay visible
    overlay.style.visibility = "visible";

    // Function to update dialogue based on the current index
    function updateDialogue() {
        const currentDialogue = dialogueArray[currentDialogueIndex];
        dialogueBox.innerText = currentDialogue.text;

        // Set character name and highlight speaking character
        if (currentDialogue.speaker === "left") {
            leftNameBox.innerText = currentDialogue.name;
            rightNameBox.innerText = ""; // Clear name
            leftCharacter.classList.remove("inactive");
            rightCharacter.classList.add("inactive");
        } else {
            rightNameBox.innerText = currentDialogue.name;
            leftNameBox.innerText = ""; // Clear name
            rightCharacter.classList.remove("inactive");
            leftCharacter.classList.add("inactive");
        }
    }

    // Update dialogue for the first time
    updateDialogue();

    // Add click event to proceed to the next dialogue
    overlay.addEventListener("click", () => {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogueArray.length) {
            updateDialogue();
        } else {
            // End of dialogues: hide the overlay
            overlay.style.visibility = "hidden";
            setIsPaused(false);
            setGameIsOver(false);
        }
    });
}
