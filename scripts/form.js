document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("wf-form-Contact-Form").addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the actual form submission

		// Sending email via EmailJS
		emailjs.sendForm("service_wyug9ql", "template_hwmp9zf", this).then(
			function (response) {
				console.log("SUCCESS!", response.status, response.text);
				alert("Your form has been successfully submitted!");
			},
			function (error) {
				console.log("FAILED...", error);
				alert("Failed to send the form. Please try again.");
			},
		);
	});
});
