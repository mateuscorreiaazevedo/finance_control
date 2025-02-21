import xss from 'xss'

type Props = {
  value: string
  className?: string
}

export function SetHTMLText({ value, className }: Props) {
  const securityHtml = xss(value, {
    whiteList: {
      strong: ['class'],
    },
  })

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <span className={className} dangerouslySetInnerHTML={{ __html: securityHtml }} />
}
