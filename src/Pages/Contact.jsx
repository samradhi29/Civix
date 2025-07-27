import React from 'react';
import ContactForm from './ContactForm';
import { motion } from 'framer-motion';
import Switch from '../DarkModeToggle';

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#18181b] dark:via-[#23272f] dark:to-[#18181b] px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col gap-6">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Contact Us
        </motion.h1>
        <hr className="border-t border-gray-200 dark:border-gray-700 mb-4" />
        <motion.p
          className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          Have questions, feedback, or need help? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </motion.p>
        <motion.p
          className="text-base text-gray-700 dark:text-gray-200 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          Or email us directly at{' '}
          <a
            href="mailto:support@civix.com"
            className="text-emerald-600 font-medium underline hover:text-emerald-700 transition-colors duration-200"
          >
            support@civix.com
          </a>
        </motion.p>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;