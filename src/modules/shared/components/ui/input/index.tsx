import { type VariantProps, cva } from 'class-variance-authority'
import type { HTMLInputTypeAttribute } from 'react'
import { SetHTMLText } from '../../set-html'
import styles from './style.module.scss'

const inputVariants = cva(`${styles.inputContainer}`, {
  variants: {
    variant: {
      default: styles.variantDefault,
      glass: styles.variantGlass,
    },
    size: {
      default: styles.sizeDefault,
    },
  },
  defaultVariants: {
    variant: 'glass',
    size: 'default',
  },
})

const labelVariants = cva(styles.label, {
  variants: {
    placement: {
      inside: `${styles.labelInside} peer-focus:left-2 peer-focus:top-2 peer-focus:text-xs peer-placeholder-shown:left-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs`,
    },
    variant: {
      glass: 'text-zinc-400 peer-focus:text-zinc-50',
      default: '',
    },
    notEmpty: {
      true: styles.insideNotEmpty,
    },
  },
  defaultVariants: {
    placement: 'inside',
    variant: 'glass',
  },
})

export type InputProps = VariantProps<typeof inputVariants> &
  Pick<VariantProps<typeof labelVariants>, 'placement'> & {
    label?: string
    placeholder?: string
    className?: string
    type?: HTMLInputTypeAttribute
  }
export function Input({
  label,
  placeholder,
  className,
  size,
  variant,
  placement,
  type,
}: InputProps) {
  return (
    <label className={inputVariants({ className, variant, size })}>
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        className={`peer ${styles.fieldInput}`}
      />
      {label && (
        <SetHTMLText
          value={label}
          className={labelVariants({
            placement,
            variant,
          })}
        />
      )}
    </label>
  )
}
