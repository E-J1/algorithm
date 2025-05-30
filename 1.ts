https://leetcode.com/problems/permutations/
46. Permutations
## answer1  Memory: 64.3mb
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permute = function (nums) {
  let result = [];

  function createElement(currentArray, left) {
    if (left.length === 0) return result.push(currentArray);
    left.forEach((n, i) =>
      createElement(
        [...currentArray, n],
        [...left.slice(0, i), ...left.slice(i + 1)]
      )
    );
    forEach 내부 동작 (재귀)
    /*([], [1,2,3,4])
        //n = 1, i=0
        createElement([1], [2,3,4])
            //n'=2, i'=0
            createElement([1,2],[3,4])
                //n''=3, i''=0
                createElement([1,2,3], [4])
                    //n'''=4, i''' = 0
                    createElement([1,2,3,4], [])
                     left === 0 , return;
                //n''=4, i''=1
                createElement([1,2,4], [3])
                    //n'''=3, i''' = 0
                    createElement([1,2,4,3], [])
                     left === 0 , return;
            //n'=3, i'=1
            createElement([1,3],[2,4])
                //n''=2, i''=0
                createElement([1,3,2],[4])
                    //n'''=4, i''' = 0
                    createElement([1,3,2,4], [])
                     left === 0 , return;
                     ....
                    */
  }

  createElement([], nums);

  return result;
};
시간 복잡도 O(N∗N!)
n!: 가능한 순열의 개수
n: 하나의 순열이 n개의 숫자를 포함하므로 배열 복사 시 O(n) 추가됨
공간 복잡도 O(N∗N!)


| 방법                              | 시간 복잡도    | 공간 복잡도                    | 특징                             |
| ------------------------------- | --------- | ------------------------- | ------------------------------ |
| 📌 DFS + 백트래킹 (`dfs([], nums)`) | O(n × n!) | O(n) 스택 + O(n × n!) 결과 저장 | 간결, 직관적, 가장 널리 쓰임              |
| 📌 DFS + `used[]` 배열 (방문 여부 체크) | O(n × n!) | O(n) + O(n × n!)          | 배열 복사를 줄일 수 있음                 |
| 📌 Heap's Algorithm             | O(n × n!) | O(n × n!)                 | 재귀 없이 구현 가능. 배열 내부 스왑으로 메모리 절약 |
| 📌 BFS / Queue 기반               | O(n × n!) | O(n × n!)                 | 큐 사용. 구조는 복잡하지만 반복문 기반         |


✅ 실전에서 가장 좋은 함수: DFS + 백트래킹 (slice로 분리)
function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  const dfs = (path: number[], remaining: number[]) => {
    if (remaining.length === 0) {
      result.push(path);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      dfs(
        [...path, remaining[i]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      );
    }
  };

  dfs([], nums);
  return result;
}

👍 장점
코드가 짧고, 읽기 쉽고, 직관적.

재귀 스택 외엔 특별한 메모리를 쓰지 않음.

디버깅 및 로직 이해가 가장 쉬움.

👎 단점
slice()와 spread (...) 연산으로 인해 메모리 복사 비용 있음.

/* 구조 분석
스택 기반 구조가 적절히 활용됨
재귀는 내부적으로 콜스택(stack) 을 활용함.

순열 생성은 깊이 우선 탐색(DFS)이기 때문에 스택과 궁합이 좋음.

명시적으로 스택을 구현하지 않아도 콜스택이 자동으로 관리해줌.
🔍 재귀의 단점은 없을까?
단점	대응 방법
콜스택 오버플로우 위험 (깊은 재귀)	순열은 n!이 커서 실제 문제에서는 n ≤ 10 정도로 제한됨 → 실질적 문제 없음
성능 최적화가 어렵다	Heap's Algorithm처럼 반복문 기반도 있지만, 일반적 상황에서는 필요 없음
✅ 결론
순열 문제에서는 재귀가 거의 항상 최적 선택입니다.
코드가 짧고 명확하며,
문제의 재귀적 성질과 구조적으로 딱 맞아떨어지고,
유지보수와 확장성에도 유리합니다.
*/

📌 스왑(Swap)은?
배열의 두 요소 값을 맞바꾸는 것
스왑은 메모리 복사 없이 배열을 바꾸는 가장 효율적인 방법이에요.

arr[0] <-> arr[2] 스왑
[arr[0], arr[2]] = [arr[2], arr[0]];

/** 동시할당
 *  배열 형태로 동시에 할당하는 이유
값이 덮어쓰기 되기 전에, 미리 복사해두고 바꿔야 하기 때문입니다.
덮어쓰기 문제를 회피하기 위한 안전한 스왑 방식입니다.

Destructuring Assignment는 내부적으로 오른쪽 값을 먼저 평가 → 임시 버퍼에 저장 → 왼쪽 변수에 순차적으로 할당합니다.
그래서 원래 값이 덮여도 영향받지 않음.
 * */

/* 📌 DFS (Depth-First Search, 깊이 우선 탐색)
트리나 그래프에서 루트(root)부터 한 갈래로 끝까지 내려가면서 탐색하는 방식.
한 가지 선택지를 끝까지 가보고,
더 이상 갈 곳이 없으면 되돌아와서(backtrack) 다른 선택지를 탐색하는 구조예요.
*/

/* 📌 백트래킹 (Backtracking)
탐색 도중 "이 선택은 정답이 될 수 없어"라고 판단되면, 직전 단계로 돌아가서 다른 선택지를 탐색하는 기법이에요.
DFS를 할 때, 잘못된 경로는 빨리 포기하고 돌아가는 것.
그래서 DFS + 백트래킹은 모든 경우를 다 보는 게 아니라, 일부 경우는 가지치기해서 속도를 높이기도 해요.
*/

/* 함수 slice, splice 차이
| 구분    | `slice(start, end)`     | `splice(start, deleteCount)` |
| ----- | ----------------------- | ---------------------------- |
| 원본 변경 | ❌ **변경 없음 (immutable)** | ✅ **원본 배열 변경 (mutable)**     |
| 반환값   | 잘라낸 **새 배열**            | 삭제된 요소로 구성된 **배열**           |
| 용도    | 복사해서 새로운 배열을 만들 때       | 배열의 일부를 제거/삽입할 때             |
| 성능    | 비교적 빠름 (메모리 복사)         | 느릴 수 있음 (원본 변경, 구조 순서 재조정)      |


✅ 순열 문제에서 splice() 사용의 문제점
만약 splice()를 원본 배열에 직접 쓰면, 다른 재귀 호출에서도 동일 배열이 영향을 받음.
이건 재귀 백트래킹에서는 치명적입니다.


*/
// ex
function dfs(picked, unpicked) {
  // ❌ splice는 원본 unpicked를 바꿈 → 다른 브랜치에서 오류 발생 가능
  const num = unpicked.splice(i, 1);
  dfs([...picked, num], unpicked);
}
//🎯 정리:
// 재귀 함수 내에서 배열 상태를 안전하게 유지하려면 immutable한 slice() 또는 spread 연산이 필수입니다.

/*📊 시간 복잡도
함수	시간 복잡도	설명
slice()	O(k)	k: slice된 부분의 길이. 새 배열 생성
splice()	O(n)	삭제 후 배열 뒤 요소들 재배치 발생

slice()는 단순 복사 → 상대적으로 빠름.
splice()는 배열 내용이 바뀌면서 shift 발생 → 느림.

특히 splice(i, 1)은 i 이후 요소를 모두 한 칸 앞으로 당김 → O(n)
*/

/*✅ 실무적 권장사항
상황	추천 방법
안전하게 배열 일부 제거	: slice(0, i).concat(slice(i+1)) 또는 [...slice(0, i), ...slice(i+1)]
배열 변형을 직접 해야 할 때	: splice() (단, 반드시 복사본에만 적용!)
성능이 매우 중요한 경우	: in-place swap + DFS (예: Heap’s Algorithm)
*/

/*
🔚 결론
재귀적 순열 알고리즘에서는 slice()가 권장됩니다.

splice()는 원본을 파괴하기 때문에, 복사 없이 쓰면 큰 버그가 날 수 있어요.

성능도 slice()가 더 빠르고 안정적입니다.

다만 splice()는 "복사본에 대해 안전하게 쓸 때"만 쓰세요.
*/

// ##answer2 Memory: 56mb
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var generatePermutations = function (numbers) {
  let permutations = [];
  function backtrack(currentPath, remainingNumbers) {
    if (!numbers.length) permutations.push(currentPath);
    for (let i = 0; i < remainingNumbers.length; ++i) {
      backtrack(
        [...currentPath, remainingNumbers[i]],
        remainingNumbers.filter((_, ii) => ii != i)
      );
    }
  }
  backtrack([], numbers);
  return permutations;
};
/* answer1 vs answer2 메모리
## answer1
[…currentArray, n]는 새 배열 1개,
left.slice(0, i)가 새 배열 1개,
left.slice(i + 1)가 새 배열 1개,
이 두 개를 [ ... , ... ]로 다시 합쳐 또 하나의 새 배열이 생깁니다.
총 4개의 새 배열 인스턴스 생성.

slice + spread 방식이 filter 방식보다 훨씬 더 많은 배열을 찍어내기 때문에, 호출 횟수가 쌓일수록 메모리 사용량이 크게 늘어납니다.

## answer2
메모리 사용량이 낮은 answer2 구현은
[…comb, nums[i]]는 새로운 배열 1개,
nums.filter(...)도 새로운 배열 1개를 만듭니다.
총 2개의 새 배열 인스턴스 생성.

전역 결과 배열 하나만 사용
filter 한 번으로 배열을 복제
반환 값이 콜 스택에 남지 않음


## 반복문 vs. forEach

for (let i=0; …)
단순 인덱스 기반 루프 구조로, 콜백 오버헤드가 없습니다.

left.forEach((n,i) => …)
클로저 형태의 콜백 함수를 호출하므로, 내부적으로 더 많은 함수 객체가 생성·수명 관리됩니다.

함수 한 번 호출당 콜백 생성 비용이 추가되고, 무수히 많은 재귀 호출마다 이 콜백들이 살아 있어야 하니 메모리 사용이 더 높아집니다.
그러나
forEach와 전통적인 for 문 간의 메모리 사용량 차이는 배열 복제 방식에 비하면 거의 무시할 만한 수준입니다. forEach는 내부적으로 콜백 함수를 호출하면서 스택 프레임을 생성하지만, 이 오버헤드는 수천~수만 번의 배열 클론(예: slice + spread)보다 훨씬 작습니다. 실제 V8 엔진에서도 forEach와 for 루프 간에 메모리 사용량 차이는 거의 없다고 보고되고 있습니다

벤치마크를 보면, forEach는 약간의 함수 호출 오버헤드로 인해 성능이 미세하게 떨어질 수 있지만, 메모리 사용 면에서는 for 루프와 거의 동일한 수준을 유지합니다. 즉, 56 MB vs. 61 MB의 차이는 forEach vs. for 자체보다는, slice×2 + spread로 생성된 임시 배열 수가 주된 원인입니다

*/

/* 메모리 피크(peak)란?*

메모리 피크(peak)란 프로그램이 실행되는 동안 한 시점에 사용된 메모리의 최고치를 가리키며, 흔히 ‘최대 메모리 사용량’이라고도 합니다.

# 정의 및 중요성
정의: 프로그램 시작부터 종료 시점까지 순간순간 사용된 힙(heap), 스택(stack), 그리고 런타임이 관리하는 기타 메모리 영역의 합 중 가장 높은 값을 의미합니다.
중요성: 메모리 피크를 알아야 OOM(Out-Of-Memory) 오류를 방지하고, 배포환경(컨테이너, 서버리스)의 메모리 한계를 적절히 설정할 수 있습니다.

# 메모리 피크 발생 지점

데이터 구조 생성: 대용량 배열, 객체, 버퍼를 한꺼번에 만들 때
재귀 호출: 깊은 재귀가 쌓여 스택 프레임과 임시 자료구조가 동시에 메모리에 존재할 때
GC 대기: 가비지 컬렉션 이전까지 해제되지 않은 객체들이 많은 경우

# 측정 방법

언어별 도구:
JavaScript (Node.js): process.memoryUsage() 의 heapUsed와 heapTotal 수치를 출력해, 특정 함수 호출 전후 메모리 변화를 스크립트 내에서 측정할 수 있습니다
Python: tracemalloc 모듈
Java: -Xmx 설정과 jstat
외부 프로파일러: Valgrind Massif, VisualVM, Chrome DevTools 등으로 힙 스냅샷(snapshot) 분석. clinic.js(—clinic doctor), heapdump, v8-profiler-node8 같은 도구로 주기적 힙 덤프를 떠서 분석하면, 대규모 애플리케이션에서도 메모리 패턴을 시각화할 수 있습니다.
Chrome DevTools Memory 패널: Heap snapshot을 찍어 객체별 메모리 분포를 확인할 수 있습니다. 스냅샷 간 비교로 누수가 발생하는 지점을 추적합니다

# 관리 전략

메모리 절약 기법:
인플레이스(in-place) 연산, 스트리밍(streaming) 처리
청크(chunk) 단위로 나눠 작업
GC 튜닝: 가비지 컬렉터 주기와 동작 방식을 조정

리소스 한계 설정: 컨테이너 메모리 리밋, 서버리스 타임아웃 등 환경 제약을 미리 계산하여 설정
*/ 

/*
 # GC를 강제 호출하거나 메모리 스냅샷을 찍는 최적의 타이밍

.JIT 워밍업 이후, 실제 측정 바로 직전
1. 워밍업 단계: 벤치마크 코드를 여러 번 실행해 V8이 함수들을 최적화(JIT)하도록 합니다.
2. GC 강제 호출: --expose-gc 플래그로 global.gc()를 호출해 아직 회수되지 않은 쓰레기 객체를 정리합니다 
Google Groups
3. 스냅샷/측정: GC 직후에 Chrome DevTools나 heapdump 등의 도구로 힙 스냅샷(heap snapshot)을 떠서 “진짜 사용 중인” 메모리만 캡처합니다 
Node.js
.벤치마크 반복 간에도 동일한 패턴(워밍업 → global.gc() → 스냅샷)을 써서, GC 타이밍 차이에 따른 노이즈를 최소화할 수 있습니다.


# V8 플래그로 재귀 최적화 과정을 관찰하는 설정

--trace_opt
“어떤 함수가 최적화 대상으로 선정되었는지” 로그를 출력합니다.

--trace_deopt
“최적화된 함수가 다시 디옵티마이즈(비최적화)된 지점”을 알려 줍니다.

--max-old-space-size=<MB>
Old-space(장기 객체 공간) 크기를 조절해 GC 빈도와 힙 사용량 한계를 설정할 수 있습니다.\

사용예제
`node --expose-gc --trace_opt --trace_deopt --max-old-space-size=2048 yourScript.js`

재귀 함수가 최적화(JIT)·디옵티마이즈되는 시점을 로그로 확인할 수 있고, Old-space 크기를 2 GB로 고정해 GC 간섭 없이 최적화 여부를 테스트할 수 있습니다.


# 프로덕션 벤치마크에서 “진짜 메모리 피크”를 잡아내는 패턴

1. 프로세스 격리 측정
child_process.fork() 또는 별도 스크립트로 벤치마킹 코드를 실행해, 각 반복마다 완전히 새 프로세스를 띄웁니다.
이렇게 하면 이전 실행의 GC 타이밍·메모리 잔여가 측정에 끼치는 영향을 배제할 수 있습니다.

2. 반복+평균화
같은 시나리오를 5~10회 이상 반복 실행해, 각 회차의 최대 힙 사용량(process.memoryUsage().heapUsed)을 기록합니다.
“최대값이 아니라, 상위 90 percentile”이나 “평균 + 표준편차” 등을 기준으로 피크를 판단하면 일시적 노이즈를 제거할 수 있습니다.

3. 외부 프로파일러 통합
Clinic.js Doctor나 heapdump 같은 툴을 CI 파이프라인에 연결해,
“메모리 릭(m leak)” 경보를 띄우거나
PR 단위로 ‘메모리 피크 비교 리포트’를 생성하도록 합니다.
이때 “워밍업 → 강제 GC → 벤치마크 → GC → 스냅샷” 과정을 스크립트화해 자동화하면, 운영 환경에서도 일관된 결과를 얻을 수 있습니다 
*/ 