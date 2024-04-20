
/**
 * Function that adds listeners to the file upload and record buttons to handle them
 * when they are used. Triggers when the full page and dependecies are loaded.
 */
window.addEventListener('load', () => {
	const upload_button = document.getElementById("upload-audio-file");
    const record_button = document.getElementById("record-new-note");

    let transcription = null;

    upload_button.addEventListener('click', () => {
        // Implement file upload functionality here
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'fileToUpload'; // Set the name attribute if needed
        fileInput.id = 'fileToUpload'; // Set the id attribute if needed

        // Create submit button
        var submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Submit';

        // Create form element
        var form = document.createElement('form');
        form.id = 'dynamic-form';
        form.appendChild(fileInput);
        form.appendChild(submitButton);

        // Append the form to the div
        document.getElementById('new-note-buttons').appendChild(form);

        // Add event listener to the form
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            audio_file = fileInput.files[0];
            transcription = sendFile(audio_file);
            document.getElementById('new-note-buttons').removeChild(form);
        });
    });

    record_button.addEventListener('click', () => {
        // Implement record functionality here
    });

	const input = transcription
	const list_el = document.querySelector("#notes");


    // Listener to create new notes upon submission
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		

		list_el.appendChild(note_el);

		input.value = '';

        // Add event listeners to edit notes
		note_edit_el.addEventListener('click', (e) => {
			if (note_edit_el.innerText.toLowerCase() == "edit") {
				note_edit_el.innerText = "Save";
				note_input_el.removeAttribute("readonly");
				note_input_el.focus();
			} else {
				note_edit_el.innerText = "Edit";
				note_input_el.setAttribute("readonly", "readonly");
			}
		});

		// Add event listeners to delete notes
        note_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(note_el);
		});
	});
});

function sendFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('localhost:8000/transcribe/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success');
        return result;
    })
    .catch(error => {
        console.error('Error:', error);
        return error;
    });
}




/**
 * Dummy code from GPT. DOMContentLoaded triggers when the initial HTML document has been completely loaded
 * and parsed, without waiting for stylesheets, images, and subframes to finish loading. Contraility load
 * triggers when the whole page is loaded, including all dependent resources such as stylesheets and images.
 */
/*document.addEventListener('DOMContentLoaded', function () {
    // Fetch data or load it from a local source
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Process and display data
            displayData(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayData(data) {
        // Display data entries in the #app container
        const appContainer = document.getElementById('app');
        data.forEach(entry => {
            // Create elements and append them to appContainer
            const entryElement = document.createElement('div');
            entryElement.textContent = entry.name; // Adjust this based on your data structure
            appContainer.appendChild(entryElement);

            // Add edit button and its functionality
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                // Implement edit functionality here
                console.log('Edit button clicked for:', entry.name);
            });
            entryElement.appendChild(editButton);
        });
    }
});*/