
const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');
const loader = document.getElementById('text-contain')

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file && file.type === 'text/plain') {
        const reader = new FileReader();
       
        reader.readAsText(file);
				reader.onload = function(e) {
					fileContent.textContent = e.target.result;
					loader.classList.add('text-contain')
			};
    } else {
        fileContent.textContent = 'Please select a valid text file.';
    }
});

function development() {
 console.log("Development branch")
}

development()