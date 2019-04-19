module.exports = {
	formats: 'local woff woff2',
	display: "swap",
	custom: {
		"Montserrat": {
			variants: {
				normal: {
					300: {
						url: {
							woff: "/fonts/montserrat-light.woff",
							woff: "/fonts/montserrat-light.woff2"
						}
					},
					400: {
						url: {
							woff: "/fonts/montserrat-regular.woff",
							woff: "/fonts/montserrat-regular.woff2"
						}
					},
					700: {
						url: {
							woff: "/fonts/montserrat-bold.woff",
							woff: "/fonts/montserrat-bold.woff2"
						}
					}
				}
			}
		}
	}
}