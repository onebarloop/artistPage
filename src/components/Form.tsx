import { useState } from 'preact/hooks';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('');

  async function handleSubmit(event: Event) {
    console.log(event.target);
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target as HTMLFormElement);
    const response = await fetch('/mail', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type='text' id='name' name='name' required />
      </label>
      <label>
        Email
        <input type='email' id='email' name='email' required />
      </label>
      <label>
        Message
        <textarea id='text' name='text' required />
      </label>
      <button type='submit'>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
