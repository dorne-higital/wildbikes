// Bot/vulnerability scanners probe for WordPress, PHP and .env files. Without this,
// the [...slug] catch-all turns every probe into Storyblok API requests.
const BLOCKED = [
	/\.(php|asp|aspx|jsp|cgi|env|bak|sql|ini|log|yml|yaml)$/i,
	/(^|\/)\.(?!well-known\/)[^/]/, // dotfiles/dirs: .env, .git, .aws ...
	/(^|\/)(wp-|wp(\/|$)|wordpress|xmlrpc|cgi-bin|phpmyadmin)/i,
]

export default defineEventHandler((event) => {
	const raw = event.path.split('?')[0]
	let path = raw
	try {
		path = decodeURIComponent(raw)
	} catch {}

	if (BLOCKED.some((re) => re.test(path))) {
		setResponseStatus(event, 404)
		return 'Not Found'
	}
})
