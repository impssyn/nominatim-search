export function debounce<F extends (...args: unknown[]) => void>(
	callback: F,
	delay = 300,
): (...args: Parameters<F>) => void {
	let timeoutId: ReturnType<typeof setTimeout>

	return (...args: Parameters<F>): void => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => callback(...args), delay)
	}
}
