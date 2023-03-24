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
    <form
      onSubmit={handleSubmit}
      class='md:w-2/5 font-sono bg-myYellow text-black font-bold mt-8 flex flex-col gap-2 p-4'
    >
      <label for='name' class=''>
        Name
      </label>
      <input
        type='text'
        id='name'
        name='name'
        required
        class='bg-black text-myYellow p-2 '
      />
      <label for='email' class=''>
        Email
      </label>
      <input
        type='email'
        id='email'
        name='email'
        required
        class='bg-black text-myYellow p-2'
      />
      <label for='text'>Message</label>
      <textarea
        id='text'
        name='text'
        rows={4}
        required
        class='bg-black text-myYellow p-2'
        placeholder='leave me a message'
      />
      <button
        type='submit'
        class='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow opacity-60 active:scale-95 hover:opacity-70  transition ease-in-out mt-2'
      >
        Send
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
