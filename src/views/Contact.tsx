import {useState} from 'react';

export default function Fetch() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function submit(e: React.FormEvent<HTMLFormElement>) {
    // This will prevent page refresh
    e.preventDefault();

    // replace this with your own unique endpoint URL
    fetch('https://formcarry.com/s/VkJ3vX-P9Dq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({email: email, message: message}),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => setError(error));
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return (
      <div>
        <h1 className="mb-4 text-center text-2xl font-bold">
          We've received your message, thank you for contacting us!
        </h1>
        <p className="mb-4">
          Quick heads up – just wanted to let you know that we're not actively
          keeping tabs on our contacts at the moment. So if you're trying to
          reach out, we might not be able to get back to you right away. Thanks
          for your understanding and patience! We'll catch up soon.
        </p>
        <p className="mb-4">-MediaWave administration team-</p>
      </div>
    );
  }

  return (
    <div className="rounded p-8 shadow-lg">
      <h3 className="mb-8 text-center text-3xl font-bold">Contact Us</h3>
      <form onSubmit={submit} className="flex flex-col text-center">
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="email">
            Email
          </label>
          <input
            className="m-3 w-2/3 rounded border border-slate-500 p-2 text-slate-950"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="message">
            Message
          </label>
          <textarea
            className="m-3 w-2/3 rounded border border-slate-500 p-2 text-slate-950"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex w-4/5 justify-center">
          <button
            className="m-3 w-1/3 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 text-black hover:font-bold"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}