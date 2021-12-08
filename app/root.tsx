import type { LinksFunction } from "remix";
import {
	Links,
	LiveReload,
	Outlet
} from "remix";

import global from './styles/global.css';
import globalLarge from './styles/global-large.css';
import globalMedium from './styles/global-medium.css';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: global },
		{ rel: 'stylesheet', href: globalLarge, media: 'print, (min-width: 640px)' },
		{ rel: 'stylesheet', href: globalMedium, media: 'screen and (min-width: 1024px)' }
	]
}

export default function App() {
	return (
		<html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <title>Remix: So great, it's funny!</title>
	            <Links />
            </head>
            <body>
                <Outlet />
                {process.env.NODE_ENV === "development" && <LiveReload/>}
            </body>
		</html>
	);
}
