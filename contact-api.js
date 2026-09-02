// Shared helper for submitting enquiry/quote forms to the Softobotics Contact Form API.
const VS_CONTACT_API_URL = 'https://k5iewetbri.execute-api.ap-south-1.amazonaws.com/prod/contact';

async function vsSubmitContactForm(data) {
  const res = await fetch(VS_CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error('Submission failed with status ' + res.status);
  }
  return res.json().catch(() => ({}));
}
