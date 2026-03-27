/**
 * spec 병기 절의 <template #en> 본문을 소제목(###) 단위로 나눌 때 사용하는 분할 정규식.
 * - `### 6.1.1 Title` 형식
 * - 7.10 등 `### mobileRobotGeometry` (숫자 없는 유일 ###)
 */
export const H3_SPLIT_REGEX =
  /\n(?=### (?:[0-9]+\.[0-9]+\.[0-9]+ |mobileRobotGeometry\b))/;

export function splitSpecEnBody(enBody) {
  return enBody.trim().split(H3_SPLIT_REGEX);
}
