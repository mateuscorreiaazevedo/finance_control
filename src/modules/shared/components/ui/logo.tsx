type Props = {
  className?: string
  withoutBars?: boolean
  rounded?: boolean
}

export default function Logo({ className, withoutBars, rounded }: Props) {
  // Definindo os retângulos (barras)
  const bars = (
    <>
      <rect
        x={50}
        y={100}
        width={20}
        height={60}
        rx={5}
        fill={withoutBars ? 'black' : '#A855F7'}
      />
      <rect
        x={80}
        y={80}
        width={20}
        height={80}
        rx={5}
        fill={withoutBars ? 'black' : '#A855F7'}
      />
      <rect
        x={110}
        y={60}
        width={20}
        height={100}
        rx={5}
        fill={withoutBars ? 'black' : '#A855F7'}
      />
      <rect
        x={140}
        y={40}
        width={20}
        height={120}
        rx={5}
        fill={withoutBars ? 'black' : '#A855F7'}
      />
    </>
  )

  return (
    <svg
      className={className}
      width={200}
      height={200}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo da Fintrol"
    >
      {withoutBars ? (
        <>
          {/* Definição da máscara para recorte dos retângulos */}
          <defs>
            <mask id="maskBars">
              <rect width="200" height="200" fill="white" />
              {bars}
            </mask>
          </defs>
          {rounded ? (
            // Fundo redondo com máscara aplicada
            <circle cx={100} cy={100} r={90} fill="#2563EB" mask="url(#maskBars)" />
          ) : (
            // Fundo quadrado com cantos arredondados com máscara aplicada
            <rect width="200" height="200" rx="20" fill="#2563EB" mask="url(#maskBars)" />
          )}
        </>
      ) : (
        <>
          {rounded ? (
            <circle cx={100} cy={100} r={90} fill="#2563EB" />
          ) : (
            <rect width="200" height="200" rx="20" fill="#2563EB" />
          )}
          {bars}
        </>
      )}

      {/* Elementos complementares */}
      <path d="M 40 150 Q 90 70, 160 50" stroke="white" strokeWidth={4} fill="none" />
      <circle cx="160" cy="50" r="5" fill="white" />
    </svg>
  )
}
