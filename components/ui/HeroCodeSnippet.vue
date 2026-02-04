<script setup lang="ts">
type TabId = 'ruby' | 'typescript' | 'csharp'

interface Tab {
  id: TabId
  label: string
  icon: string
  filename: string
}

interface Props {
  initialTab?: TabId
}

const props = withDefaults(defineProps<Props>(), {
  initialTab: 'ruby',
})

const activeTab = ref<TabId>(props.initialTab)
const isTransitioning = ref(false)

const tabs: Tab[] = [
  { id: 'ruby', label: 'Ruby', icon: '/images/ruby-icon.svg', filename: 'nicholas_sdk.rb' },
  { id: 'typescript', label: 'TypeScript', icon: '/images/typescript-icon.svg', filename: 'nicholas-sdk.ts' },
  { id: 'csharp', label: 'C#', icon: '/images/csharp-icon.svg', filename: 'NicholasSDK.cs' },
]

// Code snippets with syntax tokens
const codeSnippets: Record<TabId, { lines: Array<{ tokens: Array<{ type: string; text: string }> }> }> = {
  ruby: {
    lines: [
      { tokens: [{ type: 'comment', text: '# nicholas_sdk.rb' }] },
      { tokens: [{ type: 'keyword', text: 'require' }, { type: 'plain', text: ' ' }, { type: 'string', text: "'nicholas'" }] },
      { tokens: [] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: ' = ' }, { type: 'class', text: 'Nicholas::Developer' }, { type: 'plain', text: '.new' }] },
      { tokens: [] },
      { tokens: [{ type: 'comment', text: '# Query skills by category' }] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.skills(' }, { type: 'symbol', text: ':backend' }, { type: 'plain', text: ')' }] },
      { tokens: [{ type: 'comment', text: '# => ["Ruby", "Rails", "Sidekiq", "REST API", ...]' }] },
      { tokens: [] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.skills(' }, { type: 'symbol', text: ':frontend' }, { type: 'plain', text: ')' }] },
      { tokens: [{ type: 'comment', text: '# => ["Vue", "Nuxt", "TypeScript", ...]' }] },
      { tokens: [] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.contact(' }, { type: 'symbol', text: 'project:' }, { type: 'plain', text: ' ' }, { type: 'string', text: '"web"' }, { type: 'plain', text: ')' }] },
      { tokens: [{ type: 'comment', text: '# => { email: "nicholastimbo2022@gmail.com" }' }] },
    ],
  },
  typescript: {
    lines: [
      { tokens: [{ type: 'comment', text: '// nicholas-sdk.ts' }] },
      { tokens: [{ type: 'keyword', text: 'import' }, { type: 'plain', text: ' { ' }, { type: 'class', text: 'Nicholas' }, { type: 'plain', text: ' } ' }, { type: 'keyword', text: 'from' }, { type: 'plain', text: ' ' }, { type: 'string', text: "'@nicholas/sdk'" }] },
      { tokens: [] },
      { tokens: [{ type: 'keyword', text: 'const' }, { type: 'plain', text: ' ' }, { type: 'variable', text: 'developer' }, { type: 'plain', text: ' = ' }, { type: 'keyword', text: 'new' }, { type: 'plain', text: ' ' }, { type: 'class', text: 'Nicholas.Developer' }, { type: 'plain', text: '()' }] },
      { tokens: [] },
      { tokens: [{ type: 'comment', text: '// Query skills by category' }] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.getSkills(' }, { type: 'string', text: "'backend'" }, { type: 'plain', text: ')' }] },
      { tokens: [{ type: 'comment', text: '// => ["Ruby", "Rails", "Sidekiq", ...]' }] },
      { tokens: [] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.getSkills(' }, { type: 'string', text: "'frontend'" }, { type: 'plain', text: ')' }] },
      { tokens: [{ type: 'comment', text: '// => ["Vue", "Nuxt", "TypeScript", ...]' }] },
      { tokens: [] },
      { tokens: [{ type: 'keyword', text: 'await' }, { type: 'plain', text: ' ' }, { type: 'variable', text: 'developer' }, { type: 'plain', text: '.contact({ ' }, { type: 'property', text: 'project' }, { type: 'plain', text: ': ' }, { type: 'string', text: '"web"' }, { type: 'plain', text: ' })' }] },
      { tokens: [{ type: 'comment', text: '// => { email: "nicholastimbo2022@gmail.com" }' }] },
    ],
  },
  csharp: {
    lines: [
      { tokens: [{ type: 'comment', text: '// NicholasSDK.cs' }] },
      { tokens: [{ type: 'keyword', text: 'using' }, { type: 'plain', text: ' ' }, { type: 'class', text: 'Nicholas.SDK' }, { type: 'plain', text: ';' }] },
      { tokens: [] },
      { tokens: [{ type: 'keyword', text: 'var' }, { type: 'plain', text: ' ' }, { type: 'variable', text: 'developer' }, { type: 'plain', text: ' = ' }, { type: 'keyword', text: 'new' }, { type: 'plain', text: ' ' }, { type: 'class', text: 'Developer' }, { type: 'plain', text: '();' }] },
      { tokens: [] },
      { tokens: [{ type: 'comment', text: '// Query skills by category' }] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.GetSkills(' }, { type: 'class', text: 'Category' }, { type: 'plain', text: '.' }, { type: 'property', text: 'Backend' }, { type: 'plain', text: ');' }] },
      { tokens: [{ type: 'comment', text: '// => ["C#", ".NET", "REST API", ...]' }] },
      { tokens: [] },
      { tokens: [{ type: 'variable', text: 'developer' }, { type: 'plain', text: '.GetSkills(' }, { type: 'class', text: 'Category' }, { type: 'plain', text: '.' }, { type: 'property', text: 'Frontend' }, { type: 'plain', text: ');' }] },
      { tokens: [{ type: 'comment', text: '// => ["Vue", "Nuxt", "TypeScript", ...]' }] },
      { tokens: [] },
      { tokens: [{ type: 'keyword', text: 'await' }, { type: 'plain', text: ' ' }, { type: 'variable', text: 'developer' }, { type: 'plain', text: '.ContactAsync(' }, { type: 'keyword', text: 'new' }, { type: 'plain', text: ' { ' }, { type: 'property', text: 'Project' }, { type: 'plain', text: ' = ' }, { type: 'string', text: '"web"' }, { type: 'plain', text: ' });' }] },
      { tokens: [{ type: 'comment', text: '// => { Email = "nicholastimbo2022@gmail.com" }' }] },
    ],
  },
}

const activeSnippet = computed(() => codeSnippets[activeTab.value])

const setActiveTab = (tabId: TabId) => {
  if (tabId === activeTab.value || isTransitioning.value) return
  isTransitioning.value = true
  activeTab.value = tabId
  setTimeout(() => {
    isTransitioning.value = false
  }, 200)
}

// Token color classes for syntax highlighting
const getTokenClass = (type: string): string => {
  const classes: Record<string, string> = {
    keyword: 'text-purple-400',
    string: 'text-green-400',
    comment: 'text-gray-500 italic',
    variable: 'text-cyan-300',
    class: 'text-yellow-300',
    property: 'text-blue-300',
    symbol: 'text-orange-400',
    plain: 'text-gray-300',
  }
  return classes[type] || 'text-gray-300'
}

// Animation ref
const snippetRef = ref<HTMLElement>()
const { scaleIn } = useScrollAnimation()

onMounted(() => {
  if (snippetRef.value) {
    scaleIn(snippetRef.value, { duration: 0.8, scale: 0.95, delay: 0.4 })
  }
})
</script>

<template>
  <div
    ref="snippetRef"
    class="code-snippet-container w-full max-w-[90vw] rounded-lg border border-gray-200/20 bg-gray-900/90 shadow-2xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/95 sm:max-w-xl md:max-w-2xl lg:max-w-none"
  >
    <!-- Tab Bar -->
    <div class="flex items-center gap-0.5 overflow-x-auto border-b border-gray-700/50 px-2 pt-2 xs:gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'flex shrink-0 items-center gap-1.5 rounded-t-md px-2 py-1.5 text-xs font-medium transition-all xs:gap-2 xs:px-3',
          activeTab === tab.id
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
        ]"
        :aria-selected="activeTab === tab.id"
        role="tab"
        @click="setActiveTab(tab.id)"
      >
        <img :src="tab.icon" :alt="tab.label" class="h-4 w-4 xs:h-5 xs:w-5">
        <span class="truncate">{{ tab.filename }}</span>
      </button>
    </div>

    <!-- Code Area -->
    <div class="overflow-x-auto p-3 xs:p-4 md:overflow-x-visible">
      <Transition name="fade" mode="out-in">
        <pre :key="activeTab" class="code-content text-xs leading-relaxed xs:text-sm"><code><template v-for="(line, lineIndex) in activeSnippet.lines" :key="lineIndex"><span class="code-line"><span class="line-number mr-3 inline-block w-4 select-none text-right text-gray-600 xs:mr-4 xs:w-5">{{ lineIndex + 1 }}</span><template v-for="(token, tokenIndex) in line.tokens" :key="tokenIndex"><span :class="getTokenClass(token.type)">{{ token.text }}</span></template></span>
</template></code></pre>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.code-snippet-container {
  font-family: 'JetBrains Mono', monospace;
}

pre {
  margin: 0;
  white-space: pre;
}

code {
  display: block;
}

/* Line styling */
.code-line {
  display: inline;
}

/* Line hover effect */
.code-content code .code-line:hover {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar styling */
.code-snippet-container ::-webkit-scrollbar {
  height: 6px;
}

.code-snippet-container ::-webkit-scrollbar-track {
  background: transparent;
}

.code-snippet-container ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.code-snippet-container ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Mobile adjustments */
@media (max-width: 500px) {
  .code-snippet-container {
    font-size: 11px;
  }
}
</style>
