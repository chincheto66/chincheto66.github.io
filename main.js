// Contact form submission logic
// Only run contact form logic if on contact page
if (document.getElementById('contactForm')) {
  document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const meetingDate = document.getElementById('meeting-date').value;
    const meetingTime = document.getElementById('meeting-time').value;

    try {
      // Send data to backend
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, meetingDate, meetingTime })
      });
      const result = await response.json();
      if (result.success) {
        document.getElementById('formMessage').textContent = 'Thank you! Your message was sent.';
        document.getElementById('formMessage').style.color = 'green';
        event.target.reset();
      } else {
        document.getElementById('formMessage').textContent = 'Error: ' + (result.error || 'Could not send message.');
        document.getElementById('formMessage').style.color = 'red';
      }
    } catch (err) {
      document.getElementById('formMessage').textContent = 'Server error. Please try again later.';
      document.getElementById('formMessage').style.color = 'red';
    }
  });
}