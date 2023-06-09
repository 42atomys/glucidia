'use client';

import { motion } from 'framer-motion';
import { Subscribe } from '../Subscribe';

export const Header = () => (
  <motion.header
    initial={{ opacity: 0, top: -100, scale: 2 }}
    animate={{ opacity: 1, top: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.5, bounce: 0.5, type: 'spring' }}
    className="flex flex-row items-center justify-center w-full h-full text-center min-h-[80vh]"
  >
    <div className="flex-1 w-full hidden sm:block" />
    <div className="flex-1 p-8 lg:p-20">
      <h1 className="font-display text-7xl sm:text-8xl font-bold text-center text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-slate-50">
          Glucidia
        </span>
      </h1>
      <p className="text-2xl font-bold text-center text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-slate-50">
          Votre compagnon pour le diabète, propulsé par l&apos;IA 🤖
        </span>
      </p>
      <Subscribe />
    </div>
  </motion.header>
);
