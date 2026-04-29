'use client'

import PhishingIcon from '@mui/icons-material/Phishing'

/**
 * П’ять «ліворуч → праворуч». У Phishing (24×24) кругле вушко зверху ≈ на x≈15–16 — ліску ведемо через `left` ~62% ширини іконки.
 */
const HOOKS: ReadonlyArray<{
	lineClass: string
	bobClass: string
	delay: string
	duration: string
}> = [
	{ lineClass: 'h-[4rem] sm:h-[4.75rem]', bobClass: 'trout-hook-bob--1', delay: '-0.15s', duration: '2.9s' },
	{
		lineClass: 'h-[min(13.25rem,40vh)] sm:h-[min(11.75rem,36vh)] max-h-[14rem]',
		bobClass: 'trout-hook-bob--2',
		delay: '0.72s',
		duration: '3.35s',
	},
	{
		lineClass: 'h-[2.25rem] sm:h-[2.75rem]',
		bobClass: 'trout-hook-bob--3',
		delay: '0.28s',
		duration: '3.1s',
	},
	{ lineClass: 'h-[3.85rem] sm:h-[4.25rem]', bobClass: 'trout-hook-bob--4', delay: '1.45s', duration: '2.58s' },
	{
		lineClass: 'h-[4rem] sm:h-[4.5rem]',
		bobClass: 'trout-hook-bob--3',
		delay: '1.92s',
		duration: '3.2s',
	},
]

const ICON_BOX = 'w-[1.0625rem] sm:w-[1.1875rem]'
/** У viewBox 24×24 вушко (круг) ближче до центру-праворуч — ось ліски */
const LINE_X = 'left-[62%] -translate-x-1/2'

function StraightLine({ className }: { className: string }) {
	return (
		<div
			className={`w-px max-w-none shrink-0 rounded-full bg-gradient-to-b from-slate-500/30 via-slate-500/48 to-slate-500/52 sm:to-slate-500/48 ${className}`}
			aria-hidden
		/>
	)
}

function SingleHookColumn({ config }: { config: (typeof HOOKS)[number] }) {
	const { bobClass, delay, duration, lineClass } = config

	return (
		<div className='flex min-w-[1.6rem] max-w-[3.2rem] flex-1 flex-col items-center sm:min-w-[1.85rem]'>
			<div
				className={`trout-hook-bob isolate flex shrink-0 flex-col leading-none ${bobClass}`}
				style={{
					transformOrigin: '62% 0',
					animationDelay: delay,
					animationDuration: duration,
				}}
			>
				<div className={`relative ${ICON_BOX}`}>
					<div className={`absolute top-0 z-10 ${LINE_X}`}>
						<StraightLine className={lineClass} />
					</div>
					<div className={`invisible w-px ${lineClass}`} aria-hidden />
				</div>
				{/* Перекриття іконки й лиски через внутрішній padding SvgIcon */}
				<div className={`-mt-1 ${ICON_BOX} flex shrink-0 justify-center sm:-mt-1.5`}>
					<PhishingIcon
						sx={{
							opacity: 0.88,
							display: 'block',
							fontSize: { xs: '1.0625rem', sm: '1.1875rem' },
							margin: 0,
							padding: 0,
							verticalAlign: 'top',
							overflow: 'visible',
						}}
						className='text-slate-500/54'
					/>
				</div>
			</div>
		</div>
	)
}

export default function TroutHeroFishingDecoration() {
	return (
		<div className='pointer-events-none absolute inset-0 overflow-visible' aria-hidden>
			<div className='flex h-[min(115%,284px)] min-h-[11.5rem] w-full justify-center pb-7 sm:h-[118%] sm:min-h-0 sm:pb-0'>
				<div className='flex w-full max-w-[min(1280px,100%)] items-start justify-between px-2 sm:px-6 lg:px-10'>
					{HOOKS.map((cfg, i) => (
						<SingleHookColumn key={i} config={cfg} />
					))}
				</div>
			</div>
		</div>
	)
}
