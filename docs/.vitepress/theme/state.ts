import { ref } from 'vue'

export const isKoreanGlobal = ref(false)

export function toggleLanguage() {
  isKoreanGlobal.value = !isKoreanGlobal.value
}
