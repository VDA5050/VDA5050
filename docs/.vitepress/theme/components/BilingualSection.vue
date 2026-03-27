<template>
  <div class="bilingual-section">
    <div class="toggle-wrapper">
      <button
        @click="localIsKo = !localIsKo"
        class="lang-toggle"
        :title="localIsKo ? 'Switch to English' : '한국어로 보기'">
        <span class="dot" :class="{ 'is-ko': localIsKo }"></span>
        {{ localIsKo ? "KO" : "EN" }}
      </button>
    </div>

    <div class="content-wrapper">
      <div v-if="localIsKo" class="ko-content">
        <slot name="ko"></slot>
      </div>
      <div v-else class="en-content">
        <slot name="en"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { isKoreanGlobal } from "../state";

const props = defineProps({
  // 기본적으로 전역 설정을 따를지 여부
  sync: {
    type: Boolean,
    default: false,
  },
});

const localIsKo = ref(isKoreanGlobal.value);

// 전역 상태가 바뀌면 로컬도 맞춰줌 (처음 로딩 시 등)
watch(isKoreanGlobal, (newVal) => {
  localIsKo.value = newVal;
});

// 로컬 상태가 바뀌었을 때, props.sync가 true일 때만 전역 상태를 업데이트함
// 현재는 각 섹션별 독립 토글을 위해 기본값을 false로 둠
watch(localIsKo, (newVal) => {
  if (props.sync) {
    isKoreanGlobal.value = newVal;
  }
});
</script>

<style scoped>
.bilingual-section {
  position: relative;
  margin: 1.5rem 0;
}

.toggle-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
  position: relative;
  z-index: 10;
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 2rem;
  min-width: 4.75rem;
  padding: 0.35rem 1rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  border-radius: 9999px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s;
  font-family: var(--vp-font-family-mono);
}

.lang-toggle:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.dot {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.2s;
}

.dot.is-ko {
  background-color: #3eaf7c; /* 한국어 활성화 시 색상 */
}

.ko-content,
.en-content {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 코드 블록과의 간격 조정 */
:deep(div[class*="language-"]) {
  margin-top: 0 !important;
}
</style>
