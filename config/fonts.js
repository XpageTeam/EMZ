module.exports = {
	formats: 'local woff woff2',
	display: "swap",
	custom: {
		"Montserrat": {
			variants: {
				normal: {
					300: {
						url: {
							woff: "/fonts/Light/montserrat-light.woff",
							woff: "/fonts/Light/montserrat-light.woff2"
						}
					},
					400: {
						url: {
							woff: "/fonts/Reg/montserrat-regular.woff",
							woff: "/fonts/Reg/montserrat-regular.woff2"
						}
					},
					700: {
						url: {
							woff: "/fonts/Bold/montserrat-bold.woff",
							woff: "/fonts/Bold/montserrat-bold.woff2"
						}
					}
				}
			}
		}
	}
}