import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { routerBasePath } from '@/basePath';
import { Shell } from '@/components/Shell';
import { CelPage } from '@/pages/Cel';
import { DumpPoliciesPage } from '@/pages/DumpPolicies';
import { LlmGetStartedPage, McpGetStartedPage, TrafficGetStartedPage } from '@/pages/GetStarted';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { RawSettingsPage } from '@/pages/RawSettings';
import { TrafficGatewaysPage } from '@/pages/TrafficGateways';
import { TrafficListenersPage } from '@/pages/TrafficListeners';
import { TrafficRoutesPage } from '@/pages/TrafficRoutes';
import {
	GuardedGuardrailsPage,
	GuardedKeysPage,
	GuardedLlmPoliciesPage,
	GuardedMcpPoliciesPage,
	GuardedMcpServersPage,
	GuardedModelsPage,
	GuardedProvidersPage
} from '@/pages/xdsGuardedLlmMcpPages';
import {
	GuardedAnalyticsPage,
	GuardedClientSetupPage,
	GuardedCostsPage,
	GuardedLogsPage,
	GuardedMcpPlaygroundPage,
	GuardedPlaygroundPage
} from '@/pages/xdsGuardedPages';
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-500.css';
import '@fontsource/geist-sans/latin-600.css';
import '@fontsource/geist-sans/latin-700.css';
import '@/styles.css';
import '@/styles/analytics.css';

const LazyRawConfigPage = React.lazy(() =>
	import('@/pages/RawConfig').then(module => ({
		default: module.RawConfigPage
	}))
);

const rootRoute = createRootRoute();

// Keep login outside Shell so it does not fetch protected application data.
const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage
});

const appRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'app',
	component: Shell
});

const indexRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/',
	component: HomePage
});

const dumpPoliciesRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/traffic/policies',
	component: DumpPoliciesPage
});

const modelsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/models',
	component: GuardedModelsPage
});

const llmGetStartedRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/get-started',
	component: LlmGetStartedPage
});

const providersRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/providers',
	component: GuardedProvidersPage
});

const logsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/logs',
	component: GuardedLogsPage
});

const analyticsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/analytics',
	component: GuardedAnalyticsPage
});

const policiesRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/policies',
	component: GuardedLlmPoliciesPage
});

const guardrailsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/guardrails',
	component: GuardedGuardrailsPage
});

const costsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/costs',
	component: GuardedCostsPage
});

const keysRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/keys',
	component: GuardedKeysPage
});

const playgroundRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/playground',
	component: GuardedPlaygroundPage
});

const clientSetupRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/llm/client-setup',
	component: GuardedClientSetupPage
});

const mcpServersRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/mcp/servers',
	component: GuardedMcpServersPage
});

const mcpPoliciesRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/mcp/policies',
	component: GuardedMcpPoliciesPage
});

const mcpGetStartedRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/mcp/get-started',
	component: McpGetStartedPage
});

const mcpPlaygroundRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/mcp/playground',
	component: GuardedMcpPlaygroundPage
});

const trafficListenersRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/traffic/listeners',
	component: TrafficListenersPage
});

const trafficGatewaysRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/traffic/gateways',
	component: TrafficGatewaysPage
});

const trafficGetStartedRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/traffic/get-started',
	component: TrafficGetStartedPage
});

const trafficRoutesRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/traffic/routes',
	component: TrafficRoutesPage
});

const celRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/cel',
	component: CelPage
});

const rawConfigRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/raw-config',
	component: RawConfigRoute
});

const rawSettingsRoute = createRoute({
	getParentRoute: () => appRoute,
	path: '/settings',
	component: RawSettingsPage
});

function RawConfigRoute() {
	return (
		<React.Suspense
			fallback={
				<div className="page-stack">
					<p className="muted-copy">Loading raw configuration...</p>
				</div>
			}
		>
			<LazyRawConfigPage />
		</React.Suspense>
	);
}

const router = createRouter({
	basepath: routerBasePath(),
	routeTree: rootRoute.addChildren([
		loginRoute,
		appRoute.addChildren([
			indexRoute,
			dumpPoliciesRoute,
			llmGetStartedRoute,
			modelsRoute,
			providersRoute,
			policiesRoute,
			guardrailsRoute,
			costsRoute,
			logsRoute,
			analyticsRoute,
			keysRoute,
			playgroundRoute,
			clientSetupRoute,
			mcpGetStartedRoute,
			mcpServersRoute,
			mcpPoliciesRoute,
			mcpPlaygroundRoute,
			trafficGetStartedRoute,
			trafficGatewaysRoute,
			trafficListenersRoute,
			trafficRoutesRoute,
			celRoute,
			rawSettingsRoute,
			rawConfigRoute
		])
	])
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5_000,
			refetchOnWindowFocus: false
		}
	}
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing root element');
createRoot(rootElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
