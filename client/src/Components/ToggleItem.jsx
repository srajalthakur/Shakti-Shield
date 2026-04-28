import React from 'react'
import { motion } from 'framer-motion'

const ToggleItem = ({ 
  icon: Icon, 
  label, 
  enabled, 
  onToggle,
  accentColor = 'bg-gradient-to-r from-pink-500 to-rose-500'
}) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
  >
    <div className={`p-2 rounded-lg ${enabled ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>
      <Icon className="w-5 h-5" />
    </div>
    
    <span className={`flex-1 font-medium ${enabled ? 'text-gray-800' : 'text-gray-600'}`}>
      {label}
    </span>
    
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-200 ${enabled ? accentColor : 'bg-gray-200'}`}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow-md absolute"
        initial={false}
        animate={{
          x: enabled ? 26 : 2,
          transition: { type: 'spring', stiffness: 700, damping: 30 }
        }}
      />
    </button>
  </motion.div>
)

export default ToggleItem