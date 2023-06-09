'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Loader } from '../Loader';

export const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const searchParams = useSearchParams();

  if (searchParams.has('invitedBy'))
    localStorage.setItem('invitedBy', searchParams.get('invitedBy')!);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const ip = await fetch('https://api.ipify.org/')
      .then((res) => res.text())
      .catch(() => ({}));

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        ip,
        invitedBy: localStorage.getItem('invitedBy'),
        userAgent: navigator.userAgent,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error && json.error.code === 'P2002') {
          setSuccessMessage('Vous êtes déjà inscrit ! 🎉');
          return;
        } else if (json.error) {
          throw new Error(
            `Une erreur est survenue, veuillez réessayer plus tard. [ge:${json.error.message}]`
          );
        }

        setSuccessMessage(`Merci de nous faire confiance ${json.email} ! 🎉`);
      })
      .catch((err) => {
        alert('Une erreur est survenue, veuillez réessayer plus tard');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-8">
      <p className="mb-8 whitespace-pre-wrap">
        Nous sommes actuellement en phase de developpement. Si vous souhaitez en
        faire partie, veuillez vous inscrire à notre newsletter. Restez en
        contact avec l&apos;évolution du projet et soyez les premiers à savoir
        quand il sera disponible.
      </p>
      {successMessage && (
        <p className="text-2xl font-bold text-center text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200">
            {successMessage}
            <br />
            Nous vous tiendrons informé.
          </span>
        </p>
      )}

      {!successMessage && (
        <form
          className="flex flex-col justify-center items-center space-y-4"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            className="w-full max-w-[300px] bg-slate-900 outline-none ring-1 ring-transparent focus:ring-slate-700 text-white px-6 py-4 rounded-lg placeholder:text-slate-500/50"
          />
          <div className="[--tw-border-width:2px] rounded-full button-gradient from-indigo-500 from-30% via-amber-500 via-50% to-indigo-500 to-70% shadow-lg shadow-indigo-500/50">
            {loading ? (
              <Loader className="rounded-full bg-slate-950 transition-all duration-300 px-8 py-2 hover:px-16" />
            ) : (
              <button
                type="submit"
                className="rounded-full bg-slate-950 transition-all duration-300 px-8 py-4 hover:px-16"
              >
                Rejoindre l&apos;aventure
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
