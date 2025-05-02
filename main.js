const webhookUrl = 'http://localhost:5678/webhook/event-register';

document.getElementById('eventForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const selectedEvent = document.getElementById('event').value;
  const date = document.getElementById('date').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const messageEl = document.getElementById('responseMessage');

  messageEl.innerText = '';
  messageEl.className = 'message';

  console.log({ name, email, selectedEvent, date, startTime, endTime });

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, selectedEvent, date, startTime, endTime })
  })
    .then(res => res.text())
    .then(data => {
      console.log("Server response:", data);
      messageEl.classList.add('success');
      messageEl.innerText = '✅ Submitted!';
      document.getElementById('eventForm').reset();
      document.getElementById('startTime').value = '';
      document.getElementById('endTime').value = '';
    })
    .catch(err => {
      console.error("Fetch error:", err);
      messageEl.classList.add('error');
      messageEl.innerText = '❌ Error occurred.';
    });
});

document.getElementById('event').addEventListener('change', function () {
    const startTimeField = document.getElementById('startTime');
    const endTimeField = document.getElementById('endTime');
    const dateField = document.getElementById('date');
    const selected = this.value;
  
    startTimeField.disabled = false;
    endTimeField.disabled = false;
    dateField.disabled = false;
  
    switch (selected) {
      case 'Web Dev Bootcamp':
        startTimeField.value = '09:00';
        endTimeField.value = '12:00';
        dateField.value = '2025-05-10'; // fixed date
        break;
      case 'AI Intro Session':
        startTimeField.value = '13:30';
        endTimeField.value = '15:00';
        dateField.value = '2025-05-15'; // fixed date
        break;
      case 'UI/UX Masterclass':
        startTimeField.value = '15:30';
        endTimeField.value = '17:30';
        dateField.value = '2025-05-20'; // fixed date
        break;
      default:
        startTimeField.value = '';
        endTimeField.value = '';
        dateField.value = '';
        startTimeField.disabled = true;
        endTimeField.disabled = true;
        dateField.disabled = true;
    }
  });
  
  