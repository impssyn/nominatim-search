import { DEBOUNCE_DELAY_MS } from '@/consts/nominatim'

export function debounce<F extends (...args: unknown[]) => void>(
	callback: F,
	delay = DEBOUNCE_DELAY_MS,
): (...args: Parameters<F>) => void {
	let timeoutId: ReturnType<typeof setTimeout>

	return (...args: Parameters<F>): void => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => callback(...args), delay)
	}
}
