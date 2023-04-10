import { useState } from 'preact/hooks';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [msgSent, setMsgSent] = useState<boolean>(false);

  // Honeypot Tailwind-Styling
  const honeypot: string = 'opacity-0 absolute top-0 left-0 h-0 w-0 z-0';

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
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
      class=" flex flex-col gap-2 bg-myYellow p-4 font-sono font-bold text-black"
    >
      <label for="namekjbvfd">Name</label>
      <input
        type="text"
        id="namekjbvfd"
        name="namekjbvfd"
        required
        class="bg-black p-2 text-myYellow"
      />
      <label for="emailkjnfd">Email</label>
      <input
        type="email"
        id="emailkjnfd"
        name="emailkjnfd"
        class="bg-black p-2 text-myYellow"
      />
      <label for="textgkjfglk">Message</label>
      <textarea
        id="textgkjfglk"
        name="textgkjfglk"
        rows={8}
        required
        class="bg-black p-2 text-myYellow placeholder:text-white placeholder:opacity-40"
        placeholder="...leave me a message"
      />

      {/*Honeypot code*/}

      <label for="name" class={honeypot}></label>
      <input
        type="text"
        id="name"
        name="name"
        class={honeypot}
        autocomplete="nope"
      />
      <label for="email" class={honeypot}></label>
      <input
        type="email"
        id="email"
        name="email"
        class={honeypot}
        autocomplete="nope"
      />
      <label for="text" class={honeypot}></label>
      <textarea
        id="text"
        name="text"
        rows={4}
        class={honeypot}
        placeholder="leave me a message"
        autocomplete="nope"
      />

      {/*Honeypot code*/}

      {msgSent ? (
        <button
          type="submit"
          disabled
          class="mt-2 rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 opacity-60 shadow transition ease-in-out  hover:bg-gray-100 hover:opacity-70 active:scale-95"
        >
          {responseMessage}
        </button>
      ) : (
        <button
          type="submit"
          class="mt-2 rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 opacity-60 shadow transition ease-in-out  hover:bg-gray-100 hover:opacity-70 active:scale-95"
        >
          Send
        </button>
      )}

      {responseMessage && !msgSent && <p>{responseMessage}</p>}
    </form>
  );
}
