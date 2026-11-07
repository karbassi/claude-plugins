export type StepStatus = 'pending' | 'active' | 'done' | 'error' | 'skipped'
export type PlanSubstep = { title: string; status: StepStatus }
// doneAt: when the step was finished, so a checkpoint can tell how long it took
export type PlanStep = { title: string; status: StepStatus; substeps: PlanSubstep[]; doneAt?: number }
export type PlanStage = { name: string; steps: PlanStep[] }
export type PlanState = 'running' | 'needs_input' | 'error' | 'done'
// one subagent shown as a state strip under a bar; depth 1 sits under its parent agent
export type AgentRun = {
  id: string
  title: string
  state: 'running' | 'waiting' | 'done' | 'error'
  tool: string
  startedAt: number
  endedAt: number | null
  depth: number
  // the model it runs on and its effort, as the engine resolved them
  model?: string
  effort?: string
}
export type Plan = {
  id: string
  title: string
  kind: 'plan' | 'todo'
  stages: PlanStage[]
  state: PlanState
  note: string | null
  startedAt: number
  // when the plan was finished; the pill then shows the time it took
  endedAt?: number | null
  agents?: AgentRun[]
  // when the current batch of agents all finished; their strips fold a few seconds later
  agentsDoneAt?: number | null
  // the person folded the bar's agent strips away (its ▾ button, /progress-agents); the bar keeps one line
  isFolded?: boolean
  // the subagent that made the bar and moves it; the main loop's gate and reminders leave such a bar alone
  byAgent?: string
}
// the footer's tokens per second: the last figure (null before the first response) and whether a response streams now
export type Speed = { rate: number | null; isLive: boolean }

// the settings window's choices kept in the store: auto-close, the sounds, the footer's figure; rev counts the changes
export type Prefs = { autoclose: boolean; sounds: boolean; speedShown: boolean; updateCheck?: boolean; lang?: string; rev: number }
// where the settings window's version check or update stands; kept across the reload an update ends with
export type VersionState =
  | { phase: 'idle' }
  | { phase: 'checking' }
  | { phase: 'latest' }
  | { phase: 'available'; version: string; url: string }
  | { phase: 'updating'; version: string }
  | { phase: 'installed'; version: string }
  | { phase: 'restart'; version: string }
  | { phase: 'failed'; what: 'check' | 'update'; detail: string }
  | { phase: 'folder' }

declare module 'claude-code' {
  interface PluginState {
    'plan-progress': {
      plans: Plan[]
      isOpen: boolean
      // bumped for a timed redraw: finished strips folding away, a glide drawn once more standing
      tick: number
      speed: Speed
      // the settings window's choices as this session holds them, counted so each change redraws the footer and the window
      prefs: Prefs | null
      version: VersionState
    }
  }
}
