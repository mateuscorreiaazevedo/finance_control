'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import type { PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type * as Yup from 'yup'

type FormProps<S extends Yup.AnyObjectSchema, R = any> = PropsWithChildren & {
  schema: S
  action: (data: Yup.InferType<S>) => R
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all' | undefined
  defaultValues?: Yup.InferType<S>
  className?: string
}

export function Form<S extends Yup.AnyObjectSchema, R = any>(props: FormProps<S, R>) {
  const form = useForm<Yup.InferType<S>>({
    resolver: yupResolver(props.schema),
    defaultValues: props.defaultValues,
    mode: props.mode || 'onBlur',
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(props.action)} className={props.className}>
        {props.children}
      </form>
    </FormProvider>
  )
}
