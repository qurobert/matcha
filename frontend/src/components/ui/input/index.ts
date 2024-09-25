export { default as Input } from './Input.vue'
import { type VariantProps, cva } from 'class-variance-authority'

export const inputVariants = cva(
	'flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			// size: {
				// default: 'h-10 px-4 py-2',
				// xs: 'h-7 px-2',
				// md: 'h-9 px-3',
				// lg: 'h-11 px-8',
				// icon: 'h-10 w-10',
			// },
		},
		defaultVariants: {
			// size: 'default',
		},
	},
)

export type InputVariants = VariantProps<typeof inputVariants>