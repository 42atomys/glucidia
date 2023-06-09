'use client';

import { motion } from 'framer-motion';
import { Subscribe } from '../Subscribe';
import { ThemeIcon } from '../Theme';

export const Header = () => (
  <motion.header
    initial={{ opacity: 0, top: -100, scale: 2 }}
    animate={{ opacity: 1, top: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.5, bounce: 0.5, type: 'spring' }}
    className="flex flex-row items-center justify-center w-full h-full text-center min-h-[80vh]"
  >
    <div className="flex-1 w-full hidden sm:block" />
    <div className="flex-1 p-8 lg:p-20">
      <h1 className="font-display text-7xl sm:text-8xl font-bold text-center text-slate-950 dark:text-white flex flex-row justify-center items-end">
        <span className="title-gradient">Glucidia</span>
        <ThemeIcon />
      </h1>
      <p className="text-2xl font-bold text-center text-slate-950 dark:text-white">
        <span className="title-gradient">
          Votre compagnon pour le diabète, propulsé par l&apos;IA 🤖
        </span>
      </p>
      <Subscribe />
    </div>
  </motion.header>
);
