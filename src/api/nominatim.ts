import axios from 'axios'

import { NOMINATIM_LINK } from '@/consts/nominatim'
import { type NominatimResult } from '@/types/nominatim'

export async function searchNominatim(
	query: string,
): Promise<NominatimResult[]> {
	if (!query.trim()) return []

	try {
		const { data } = await axios.get<NominatimResult[]>(NOMINATIM_LINK, {
			params: {
				q: query,
				format: 'json',
				limit: 10,
			},
		})
		return data
	} catch (error) {
		console.error('Ошибка запроса к Nominatim:', error)
		return []
	}
}
