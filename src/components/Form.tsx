import { useState } from 'preact/hooks';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const honeypot = 'opacity-0 absolute top-0 left-0 h-0 w-0 z-0';

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
      if (response.ok) {
        setMsgSent(true);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      class='md:w-2/5 font-sono bg-myYellow text-black font-bold mt-8 flex flex-col gap-2 p-4'
    >
      <label for='namekjbvfd'>Name</label>
      <input
        type='text'
        id='namekjbvfd'
        name='namekjbvfd'
        required
        class='bg-black text-myYellow p-2 '
      />
      <label for='emailkjnfd'>Email</label>
      <input
        type='email'
        id='emailkjnfd'
        name='emailkjnfd'
        required
        class='bg-black text-myYellow p-2'
      />
      <label for='textgkjfglk'>Message</label>
      <textarea
        id='textgkjfglk'
        name='textgkjfglk'
        rows={4}
        required
        class='bg-black text-myYellow p-2'
        placeholder='leave me a message'
      />

      {/*Honeypot code*/}

      <label for='name' class={honeypot}></label>
      <input
        type='text'
        id='name'
        name='name'
        class={honeypot}
        autocomplete='nope'
      />
      <label for='email' class={honeypot}></label>
      <input
        type='email'
        id='email'
        name='email'
        class={honeypot}
        autocomplete='nope'
      />
      <label for='text' class={honeypot}></label>
      <textarea
        id='text'
        name='text'
        rows={4}
        class={honeypot}
        placeholder='leave me a message'
        autocomplete='nope'
      />

      {/*Honeypot code*/}

      {msgSent ? (
        <button
          type='submit'
          disabled
          class='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow opacity-60 active:scale-95 hover:opacity-70  transition ease-in-out mt-2'
        >
          {responseMessage}
        </button>
      ) : (
        <button
          type='submit'
          class='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow opacity-60 active:scale-95 hover:opacity-70  transition ease-in-out mt-2'
        >
          Send
        </button>
      )}

      {responseMessage && !msgSent && <p>{responseMessage}</p>}
    </form>
  );
}
