"use client";

import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import { useState } from "react";
import { tv } from "tailwind-variants";


const blackhole = tv({
  slots: {
    container:
      "w-[var(--blackhole-size)] h-[var(--blackhole-size)] relative flex items-center justify-center",
    aura: "w-full h-full relative flex items-center justify-center rounded-full",
    hole: "w-[88%] h-[88%] rounded-full bg-gradient-to-r from-slate-950 from-60% blur-lg",
  },
});

const Blackhole = ({ className }: { className?: string }) => (
  <div
    className={blackhole().container({ className: className })}
    // @ts-ignore
    style={{ "--blackhole-size": "min(100vw, 1130px)" }}
  >
    <div
      id="blackhole"
      className={blackhole().aura()}
      style={{
        transform: "rotate(0deg)",
        animation: "rotate 20s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite",
        boxShadow: `inset 0 0 calc(var(--blackhole-size)/6) #fff, inset calc(var(--blackhole-size)/15) 0 calc(var(--blackhole-size)/5) red, inset calc(var(--blackhole-size)/15*-1) 0 calc(var(--blackhole-size)/5) blue, inset calc(var(--blackhole-size)/15) 0 var(--blackhole-size) black, inset calc(var(--blackhole-size)/15*-1) 0 var(--blackhole-size) blue, 0 0 calc(var(--blackhole-size)/6) rgba(255, 255, 255, 0.75), -10px 0 calc(var(--blackhole-size)/5) violet, 10px 0 calc(var(--blackhole-size)/5) blue`,
      }}
    >
      {/* <div className={blackhole().hole()} /> */}
    </div>
  </div>
);

const Loader = ({ className }: { className: string }) => (
  <div role="status" className={className}>
    <svg
      aria-hidden="true"
      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-500"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const searchParams = useSearchParams();

  if (searchParams.has('invitedBy'))
    localStorage.setItem("invitedBy", searchParams.get('invitedBy')!)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const ip = await fetch("https://api.ipify.org/")
      .then((res) => res.text()).catch(() => ({}));

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        ip,
        invitedBy: localStorage.getItem("invitedBy"),
        userAgent: navigator.userAgent,
      }),
    }).then((res) => res.json()).then(json => {
      if (json.error && json.error.code === "P2002") {
        setSuccessMessage("You're already subscribed to the newsletter! 🎉")
        return
      } else if (json.error) {
        throw new Error(`Something went wrong. Try again later. [ge:${json.error.message}]`)
      }

      setSuccessMessage(`Thanks for subscribing ${json.email}! 🎉`)
    }).catch((err) => {

      alert("Something went wrong. Please try again.");
    }).finally(() => {
      setLoading(false)
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <Blackhole className="fixed -z-10 top-[calc(var(--blackhole-size)/-3)] left-[calc(var(--blackhole-size)/-3)]" />
      <motion.header
        initial={{ opacity: 0, top: -100, scale: 2 }}
        animate={{ opacity: 1, top: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, bounce: 0.5, type: "spring" }}
        className="flex flex-row items-center justify-center w-full h-full text-center min-h-[80vh]"
      >
        <div className="flex-1 w-full" />
        <div className="flex-1 p-20">
          <h1 className="text-8xl font-bold text-center text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-slate-50">
              Glucidia
            </span>
          </h1>
          <p className="text-2xl font-bold text-center text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-slate-50">
              Your diabetes companion app powered by IA 🤖
            </span>
          </p>
          <div className="mt-8">
            <p className="mb-8 whitespace-pre-wrap">
              We currently are in a closed beta. If you want to be part of it,
              please subscribe to our newsletter.
              Stay in touch with the evolution of the project and be the first to
              know when we launch!
            </p>
            {successMessage && (
              <p className="text-2xl font-bold text-center text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200">
                  {successMessage}
                  <br />
                  We will keep you updated.
                </span>
              </p>
            )}

            {!successMessage && <form
              className="flex flex-col justify-center items-center space-y-4"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                    Subscribe
                  </button>
                )}
              </div>
            </form>}
          </div>
        </div>
      </motion.header>
      <div className="p-20 backdrop-filter backdrop-blur-md bg-slate-950/80 h-[400px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ea,
        voluptates vel possimus totam impedit excepturi architecto quis. Ratione
        distinctio hic provident exercitationem autem unde veniam non similique
        ut cumque.
      </div>
    </main>
  );
}
