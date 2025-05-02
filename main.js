const webhookUrl = 'https://jjquintanilla.app.n8n.cloud/webhook/registration';

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const birthday = document.getElementById('birthday').value.trim();
  const age = document.getElementById('age').value.trim();
  const civilStatus = document.getElementById('civilStatus').value;
  const messageEl = document.getElementById('message');

  messageEl.innerHTML = '';
  messageEl.className = 'message';

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, birthday, age, civilStatus })
  })
    .then(res => {
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      return res.ok ? res.json().catch(() => ({})) : Promise.reject(res);
    })
    .then(() => {
      messageEl.classList.add('success');
      messageEl.innerText = '✅ Success! Confirmation email sent.';
      document.getElementById('registerForm').reset();
    })
    .catch(() => {
      messageEl.classList.add('error');
      messageEl.innerText = '❌ Something went wrong. Please try again.';
    });
});
