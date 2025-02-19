import { type VariantProps, cva } from 'class-variance-authority'

const sphereBlurStyle = cva('absolute rounded-full aspect-square w-4/5 -z-20 blur-2xl ', {
  variants: {
    position: {
      'left-bottom': 'right-full translate-x-2/4 top-full -translate-y-1/2',
      'left-top': 'right-full translate-x-2/4 bottom-full translate-y-1/2',
      'right-bottom': 'left-full -translate-x-2/4 top-full -translate-y-1/2',
      'right-top': 'left-full -translate-x-2/4 bottom-full translate-y-1/2',
    },
    color: {
      blue: 'bg-blue-600/15 dark:bg-blue-600/10',
      green: 'bg-green-600/15 dark:bg-green-600/10',
      red: 'bg-red-600/15 dark:bg-red-600/10',
    },
  },
  defaultVariants: {
    position: 'left-bottom',
    color: 'blue',
  },
})

export type SphereBlurProps = VariantProps<typeof sphereBlurStyle> & { className?: string }

export function SphereBlur({ className, position, color }: SphereBlurProps) {
  return <div className={sphereBlurStyle({ className, position, color })} />
}
