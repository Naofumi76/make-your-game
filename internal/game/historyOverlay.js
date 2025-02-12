import { setIsPaused } from "../utils/utils.js";

let currentDialogueIndex = 0;

// Dialogue data structure: list of objects


export function createDialogueOverlay(leftCharacterImg, rightCharacterImg, dialogueArray) {

    setIsPaused(true);
    // Remove existing overlay if present
    let existingOverlay = document.getElementById("dialogueOverlay");
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = "dialogueOverlay";

    // Left character image
    const leftCharacter = document.createElement("img");
    leftCharacter.src = leftCharacterImg;
    leftCharacter.classList.add("character-image");

    // Right character image
    const rightCharacter = document.createElement("img");
    rightCharacter.src = rightCharacterImg;
    rightCharacter.classList.add("character-image");

    // Dialogue text box
    const dialogueBox = document.createElement("div");
    dialogueBox.id = "dialogueBox";

    // Append all elements to overlay
    overlay.appendChild(leftCharacter);
    overlay.appendChild(dialogueBox);
    overlay.appendChild(rightCharacter);

    // Add overlay to the body
    document.body.appendChild(overlay);

    // Make overlay visible
    overlay.style.visibility = "visible";

    // Function to update dialogue based on the current index
    function updateDialogue() {
        const currentDialogue = dialogueArray[currentDialogueIndex];
        dialogueBox.innerText = currentDialogue.text;

        // Highlight the speaking character
        if (currentDialogue.speaker === "left") {
            leftCharacter.classList.remove("inactive");
            rightCharacter.classList.add("inactive");
        } else {
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
        }
    });
}
