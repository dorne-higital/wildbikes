import type { ISbLink } from 'storyblok-js-client'

// Shared by MainNav and MainFooter — same key means one Storyblok request per page render
export const useSiteLinks = async () => {
	const storyblokApi = useStoryblokApi()

	const { data } = await useAsyncData('sb-links', () =>
		storyblokApi.get('cdn/links', {
			version: 'published'
		})
	)

	return computed<ISbLink[]>(() => {
		const linksObj = data.value?.data?.links ?? {}

		return Object.values(linksObj)
			.filter((link) => !link.is_folder)
			.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
	})
}
