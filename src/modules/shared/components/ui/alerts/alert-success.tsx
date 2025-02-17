'use client'

import { useAlertContents } from '@/modules/shared/hooks'
import { Check, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function AlertSuccess(props: ToastNotificationProps) {
  const { handleDismiss, id, show, description, isDismissed, title, withIcon } =
    useAlertContents(props)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { ease: 'easeInOut' },
          }}
          exit={{
            opacity: 0,
            x: '100%',
            transition: { ease: 'easeInOut' },
          }}
          id={`toast-${id}`}
          className="bg-green-500 text-white min-w-64 w-fit rounded-md flex gap-4 items-center justify-between py-4 px-6"
        >
          {withIcon && (
            <div className="p-2 size-9 flex items-center justify-center bg-green-400/80 rounded-full">
              <Check className="size-8 text-white" strokeWidth={2.5} />
            </div>
          )}
          <div className="flex flex-col w-full">
            {title && (
              <h4 className="text-lg font-semibold text-white font-montserrat">{title}</h4>
            )}
            {description && <p className="text-white font-light">{description}</p>}
          </div>
          {isDismissed && (
            <button type="button" onClick={handleDismiss}>
              <X
                className="size-5 text-white/50 hover:text-white transition-all"
                strokeWidth={1}
              />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
