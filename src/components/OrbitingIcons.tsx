import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Users, BookOpen, MessageSquare, Award } from 'lucide-react'

export function OrbitingIcons() {
  const icons = [
    { Icon: GraduationCap, delay: 0 },
    { Icon: Briefcase, delay: 2 },
    { Icon: Users, delay: 4 },
    { Icon: BookOpen, delay: 6 },
    { Icon: MessageSquare, delay: 8 },
    { Icon: Award, delay: 10 },
  ]

  return (
    <div className="relative w-[400px] h-[400px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="text-4xl font-bold text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Connect
        </motion.div>
      </div>
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            duration: 20,
            delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: -120,
              left: -12,
            }}
          >
            <div className="bg-background p-2 rounded-full shadow-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

