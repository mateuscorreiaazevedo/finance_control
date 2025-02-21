'use client'

import { useTranslations } from '@/modules/shared/hooks'
import { type VariantProps, cva } from 'class-variance-authority'
import type { HTMLInputTypeAttribute } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
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
    error: {
      true: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    error: false,
  },
  compoundVariants: [{ variant: 'glass', error: true, className: styles.errorGlass }],
})

const errorLabelVariants = cva('text-xs font-light', {
  variants: {
    variant: {
      default: 'text-destructive',
      glass: 'text-zinc-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const labelVariants = cva(styles.label, {
  variants: {
    placement: {
      inside: `${styles.labelInside} peer-focus:left-2 peer-focus:top-2 peer-focus:text-xs peer-placeholder-shown:left-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs`,
      'in/out-side': `${styles.labelInOutSide} peer-focus:-left-1 peer-focus:-top-4 peer-focus:text-sm peer-placeholder-shown:-left-1 peer-placeholder-shown:-top-4 peer-placeholder-shown:text-sm`,
      outside: `${styles.labelOutside}`,
    },
    variant: {
      glass: 'text-zinc-400 peer-focus:text-zinc-50',
      default: '',
    },
    notEmpty: {
      true: '',
    },
  },
  defaultVariants: {
    placement: 'inside',
    variant: 'default',
  },
  compoundVariants: [
    { notEmpty: true, placement: 'inside', className: styles.insideNotEmpty },
    { notEmpty: true, placement: 'inside', className: 'text-zinc-50', variant: 'glass' },
    {
      notEmpty: true,
      placement: 'in/out-side',
      className: 'text-zinc-50',
      variant: 'glass',
    },
    { notEmpty: true, placement: 'in/out-side', className: styles.inOutSideNotEmpty },
    { notEmpty: true, placement: 'outside', variant: 'glass', className: 'text-zinc-50' },
  ],
})

export type InputProps = Omit<VariantProps<typeof inputVariants>, 'error'> &
  Pick<VariantProps<typeof labelVariants>, 'placement'> & {
    name: string
    label?: string
    placeholder?: string
    className?: string
    type?: HTMLInputTypeAttribute
  }
export function Input({
  label,
  name,
  placeholder,
  className,
  size,
  variant,
  placement,
  type,
}: InputProps) {
  const { control } = useFormContext()
  const { translate } = useTranslations()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, fieldState }) => (
        <div className="w-full flex flex-col gap-1">
          <label
            className={inputVariants({
              className,
              variant,
              size,
              error: !!fieldState.error?.message,
            })}
          >
            <input
              {...field}
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
                  notEmpty: !!field.value,
                })}
              />
            )}
          </label>
          {fieldState.error?.message && (
            <span className={errorLabelVariants({ variant })}>
              {translate(fieldState.error.message)}
            </span>
          )}
        </div>
      )}
    />
  )
}
