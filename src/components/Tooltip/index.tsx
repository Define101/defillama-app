import * as React from 'react'
import { Tooltip as AriaTooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip'

interface ITooltip {
	content: string | null | React.ReactNode
	href?: string
	shallow?: boolean
	onClick?: (e: any) => any
	style?: {}
	children: React.ReactNode
	as?: any
	color?: string
	fontSize?: string
	anchorStyles?: React.CSSProperties
	placement?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, color, fontSize, anchorStyles, placement, ...props }: ITooltip) {
	const tooltip = useTooltipState({ placement })

	if (!content || content === '') return <>{children}</>

	return (
		<>
			<TooltipAnchor
				state={tooltip}
				style={{ ...anchorStyles, color, fontSize: fontSize ?? 'inherit' } as any}
				className="cursor-pointer flex items-center overflow-hidden text-ellipsis whitespace-nowrap flex-shrink-0"
				as="span"
			>
				{children}
			</TooltipAnchor>
			{tooltip.mounted ? (
				<AriaTooltip
					{...props}
					state={tooltip}
					className="text-sm p-2 max-w-56 whitespace-pre-wrap rounded-md bg-[var(--bg1)] border border-[hsl(204,20%,88%)] dark:border-[hsl(204,3%,32%)]"
				>
					{content}
				</AriaTooltip>
			) : null}
		</>
	)
}

export function Tooltip2({ content, children, className, as, ...props }) {
	const tooltip = useTooltipState()

	return (
		<>
			<TooltipAnchor state={tooltip} as={as} className={className} {...props}>
				{children}
			</TooltipAnchor>
			{tooltip.mounted ? (
				<AriaTooltip
					state={tooltip}
					data-tooltipcontent
					className="group text-sm p-2 max-w-56 whitespace-pre-wrap rounded-md bg-[var(--bg1)] border border-[hsl(204,20%,88%)] dark:border-[hsl(204,3%,32%)]"
				>
					{content}
				</AriaTooltip>
			) : null}
		</>
	)
}
