<template>
  <section class="ai-summary" :aria-labelledby="headingId">
    <div class="ai-summary__frame">
      <div class="ai-summary__panel">
        <div class="ai-summary__header">
          <span class="ai-summary__icon" aria-hidden="true">🤖</span>
          <h3 :id="headingId" class="ai-summary__title">AI SUMMARY</h3>
        </div>

        <div
          :id="regionId"
          ref="contentRef"
          class="ai-summary__content"
          :class="{ 'is-expanded': isExpanded }"
          :style="contentStyle"
          role="region"
          :aria-labelledby="headingId"
        >
          <div ref="contentInnerRef" class="ai-summary__content-inner">
            <slot />
          </div>
        </div>

        <button
          type="button"
          class="ai-summary__toggle"
          :aria-expanded="isExpanded ? 'true' : 'false'"
          :aria-controls="regionId"
          @click="isExpanded = !isExpanded"
        >
          {{ isExpanded ? "접기" : "펼쳐서 전체 요약 보기" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{
  id: string;
  defaultExpanded?: boolean;
}>();

const isExpanded = ref(props.defaultExpanded ?? false);
const contentRef = ref<HTMLElement | null>(null);
const contentInnerRef = ref<HTMLElement | null>(null);
const expandedMaxHeight = ref("none");
const headingId = computed(() => `${props.id}-heading`);
const regionId = computed(() => `${props.id}-content`);
const contentStyle = computed(() =>
  isExpanded.value ? { maxHeight: expandedMaxHeight.value } : undefined
);

let resizeObserver: ResizeObserver | null = null;

function updateExpandedHeight() {
  if (!contentInnerRef.value) return;
  expandedMaxHeight.value = `${contentInnerRef.value.scrollHeight}px`;
}

watch(isExpanded, async (expanded) => {
  if (!expanded) return;
  await nextTick();
  updateExpandedHeight();
});

onMounted(() => {
  if (!contentInnerRef.value) return;

  resizeObserver = new ResizeObserver(() => {
    updateExpandedHeight();
  });

  resizeObserver.observe(contentInnerRef.value);
  updateExpandedHeight();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.ai-summary {
  margin: 1rem 0 1.5rem;
}

.ai-summary__frame {
  position: relative;
  padding: 1px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a9bff 0%, #52c7ff 48%, #45e0b8 100%);
  box-shadow: 0 14px 32px rgba(18, 58, 102, 0.06);
}

.ai-summary__panel {
  padding: 1rem 1rem 0.9rem;
  border-radius: 15px;
  background: var(--vp-c-bg);
}

.ai-summary__header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
}

.ai-summary__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  line-height: 1;
}

.ai-summary__title {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: #0d5fc0;
}

.ai-summary__content {
  position: relative;
  overflow: hidden;
  max-height: 5.2rem;
  transition: max-height 0.28s ease;
}

.ai-summary__content::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3.2rem;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--vp-c-bg) 0%, transparent) 0%,
    color-mix(in srgb, var(--vp-c-bg) 72%, transparent) 48%,
    var(--vp-c-bg) 100%
  );
}

.ai-summary__content.is-expanded::after {
  display: none;
}

.ai-summary__content-inner {
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

.ai-summary__content-inner :deep(p) {
  margin: 0 0 0.65rem;
}

.ai-summary__content-inner :deep(ul) {
  margin: 0;
  padding-left: 1.15rem;
}

.ai-summary__content-inner :deep(li + li) {
  margin-top: 0.28rem;
}

.ai-summary__toggle {
  margin-top: 0.85rem;
  padding: 0;
  border: 0;
  background: none;
  color: #0a67ce;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
}

.ai-summary__toggle:hover {
  color: #0952a3;
}

.ai-summary__toggle:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
  border-radius: 6px;
}

.dark .ai-summary__frame {
  background: linear-gradient(135deg, #2a88ff 0%, #56b8ff 45%, #3ce3bf 100%);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.14);
}

.dark .ai-summary__panel {
  background: var(--vp-c-bg);
}

.dark .ai-summary__title,
.dark .ai-summary__toggle {
  color: #8cd3ff;
}

.dark .ai-summary__toggle:hover {
  color: #b6e7ff;
}

.dark .ai-summary__content::after {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--vp-c-bg) 0%, transparent) 0%,
    color-mix(in srgb, var(--vp-c-bg) 72%, transparent) 48%,
    var(--vp-c-bg) 100%
  );
}

@media (max-width: 640px) {
  .ai-summary__panel {
    padding: 0.95rem 0.9rem 0.85rem;
  }

  .ai-summary__content {
    max-height: 5.6rem;
  }
}
</style>
