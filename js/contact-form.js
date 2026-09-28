(() => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const endpoint = form.dataset.endpoint.trim();
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = form.querySelector('.submit-label');
  const submitLoading = form.querySelector('.submit-loading');
  const status = form.querySelector('.form-status');
  const setupNote = document.querySelector('#contact-form-setup');
  const honeypot = form.querySelector('[name="_gotcha"]');
  let isSubmitting = false;

  if (setupNote) setupNote.hidden = Boolean(endpoint);
  status.hidden = true;

  const setStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
    status.hidden = !message;
  };

  const setBusy = (isBusy) => {
    submitButton.disabled = isBusy;
    submitLabel.hidden = isBusy;
    submitLoading.hidden = !isBusy;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setStatus('', '');

    if (!form.reportValidity()) return;

    if (honeypot.value) {
      setStatus('Oops! Something went wrong while sending your message. Please try again.', 'error');
      return;
    }

    if (!endpoint) {
      setStatus('Oops! Something went wrong while sending your message. Please try again.', 'error');
      return;
    }

    isSubmitting = true;
    setBusy(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);

      form.reset();
      setStatus("Thanks for reaching out! Your message has been sent successfully. I'll get back to you soon.", 'success');
    } catch (error) {
      setStatus('Oops! Something went wrong while sending your message. Please try again.', 'error');
    } finally {
      setBusy(false);
      isSubmitting = false;
    }
  });
})();
