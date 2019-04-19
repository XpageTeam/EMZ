var fs = require( 'vinyl-fs' );
var ftp = require( 'vinyl-ftp' );
 
connectionSettings = require("./accesses/accesses.js");

const templatePath = connectionSettings.server.path;
const remotePathCss = templatePath+"css",
	remotePathJs = templatePath+"js",
	remotePathImg = templatePath+"img";

const conn = ftp.create({
	host:      connectionSettings.server.host,
	user:      connectionSettings.server.user,
	password:  connectionSettings.server.password,
	parallel: 4
});
 
fs.src( [ './docs/css/**' ], { buffer: false } )
    .pipe( conn.dest( remotePathCss ) );
fs.src( [ './docs/img/**' ], { buffer: false } )
    .pipe( conn.dest( remotePathImg ) );
fs.src( [ './docs/js/**' ], { buffer: false } )
    .pipe( conn.dest( remotePathJs ) );