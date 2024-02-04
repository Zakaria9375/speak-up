// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	app: {
		head: {
			title: "Speak Up",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				// Add other meta tags as needed
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, // Specify the path to your favicon here
			],
		},
	},
	modules: [
		"@nuxtjs/google-fonts",
		"dayjs-nuxt",
		"@pinia/nuxt",
		"@vee-validate/nuxt",
		"@vueuse/nuxt",
		"nuxt-appwrite",
		"nuxt-aos",
	],
	googleFonts: {
		download: false,
		families: {
			Roboto: [100, 300, 400, 500, 700, 900],
			"Great+Vibes": [400],
			"Lilita+One": [400],
		},
	},
	alias: {
		pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
	},
	appwrite: {
		endpoint: "https://cloud.appwrite.io/v1",
		project: "65718378450202a4f926",
	},
	css: [
		"~/assets/normalize.css",
		"~/assets/main.scss",
		"@fortawesome/fontawesome-svg-core/styles.css",
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/_global.scss" as *;',
				},
			},
		},
	},

	plugins: [],
	veeValidate: {
		autoImports: true,
	},
	imports: {
		dirs: [
			// Scan top-level modules
			"utils",
			// ... or scan modules nested one level deep with a specific name and file extension
			"utils/*/index.{ts,js,mjs,mts}",
			// ... or scan all modules within given directory
			"utils/**",
		],
	},
});
