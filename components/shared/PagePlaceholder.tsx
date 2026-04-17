type PagePlaceholderProps = {
	title: string
	description: string
}

export default function PagePlaceholder({
	title,
	description,
}: PagePlaceholderProps) {
	return (
		<section className='mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6'>
			<h1 className='mb-4 text-3xl font-extrabold tracking-tight text-[#064E3B] sm:text-4xl'>
				{title}
			</h1>
			<p className='max-w-2xl text-sm text-[#064E3B]/80 sm:text-base'>{description}</p>
		</section>
	)
}
