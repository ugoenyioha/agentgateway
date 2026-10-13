package plugins

import (
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/agentgateway/agentgateway/api"
	"github.com/agentgateway/agentgateway/controller/api/v1alpha1/agentgateway"
)

// Regression guard for a carried local patch.
//
// An omitted eviction.duration must stay unset in the xDS policy so the proxy can
// prefer the provider's own Retry-After / reset header (crates/agentgateway/src/http/health.rs).
// Upstream v1.6.0 fills in 3s here, which makes an exhausted account get retried every 3s
// instead of draining traffic to the next priority group for the real quota window.
func healthPolicyWithEviction(e *agentgateway.BackendEviction) *agentgateway.AgentgatewayPolicy {
	return &agentgateway.AgentgatewayPolicy{
		Spec: agentgateway.AgentgatewayPolicySpec{
			Backend: &agentgateway.BackendFull{
				Health: &agentgateway.Health{Eviction: e},
			},
		},
	}
}

func evictionOf(t *testing.T, e *agentgateway.BackendEviction) *api.BackendPolicySpec_Eviction {
	t.Helper()
	p, err := translateBackendHealthPolicy(healthPolicyWithEviction(e))
	require.NoError(t, err)
	return p.GetBackend().GetHealth().GetEviction()
}

func TestHealthEvictionOmittedDurationStaysUnset(t *testing.T) {
	ev := evictionOf(t, &agentgateway.BackendEviction{})
	require.NotNil(t, ev)
	require.Nil(t, ev.GetDuration(), "omitted duration must not be defaulted by the controller")
}

func TestHealthEvictionExplicitDurationPassesThrough(t *testing.T) {
	ev := evictionOf(t, &agentgateway.BackendEviction{
		Duration: &agentgateway.Duration{Duration: 24 * time.Hour},
	})
	require.NotNil(t, ev)
	require.Equal(t, 24*time.Hour, ev.GetDuration().AsDuration())
}
