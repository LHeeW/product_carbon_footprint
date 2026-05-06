탄소 관리 플랫폼 대시보드를 제작하였습니다. -임희우-

## 로컬 실행

```bash
npm install (권장)
npm run dev
#or
npm start
#-----------------
yarn install
yarn start
```

브라우저 주소: [http://localhost:3000](http://localhost:3000)

## 배포 주소

주소: [탄소 관리 플랫폼 대시보드 웹앱](https://product-carbon-footprint.vercel.app/)

## AI 사용

- gemini, gemini code assist
- 배경색 추천 받을 때 사용 (prompt: 대시보드를 제작하는데 무난한 색상 추천해줘.) => gemini
- 차트 라이브러리 추천 및 기본 사용 방법 알기 위해 사용 (prompt: nextjs에서 사용할 차트 라이브러리 추천해줘.) => gemini
- 작성한 코드 github에 커밋 후 pr할때 코드리뷰를 통해 코드의 오류나 문제점 파악할때 사용 (자동) => gemini code assist

## 시스템 및 설계 내용

- Next.js(App router), tailwind, tanstack-query, zustand, recharts

- 서버 상태 관리 : tanstack-query
- 전역 상태 관리 : zustand
  - form 수정시 open,close 관리
  - 차트에서 select option으로 회사 선택시 차트, 테이블, 포스트 폼에 공유할 상태값 관리

- 단일 화면내에서 3개의 section으로 구성
  - 차트
    - 월별 탄소 배출량을 막대 그래프 형식의 차트로 시각화
    - select option을 통해 회사별 측정 결과를 반환
  - 테이블
    - 차트에 나타나는 지표를 세분화하여 테이블로 시각화
  - 포스트 폼
    - 선택된 회사의 지표에 대해 자유롭게 피드백 할 수 있는 폼 제작
  
- CRUD
  - Tanstack Query를 통해 CRUD 구현
  - 깜빡이는 현상 및 데이터 지연 로딩시 Suspense와 useSuspenseQuery()를 활용하여 skeleton ui 처리
  ```typescript
    // app/page.tsx 코드 중 일부...
    <Suspense fallback={<ChartsSkeleton />}>
      <ChartsContainer />
    </Suspense>
    <div className="row-span-2">
    <Suspense fallback={<TableSkeleton />}>
      <TableContainer />
    </Suspense>
    </div>
    <PostsContainer /> // 포스트 폼은 내부에서 content부분에만 suspense 설정
  ```
  - 포스트 폼에서 데이터 생성 및 업데이트시 발생할 수 있는 error는 mutate할때 window.confirm()을 통해 다시 생성 및 업데이트 진행하게 제작
  ```typescript
  // app/hooks/usePostForm.tsx 코드 중 일부...
    const tryMutate = (post: Omit<Post, "id"> & { id?: string }) => {
      mutate(post, {
        onSuccess: () => {
          if (!updateData) data.reset();
          if (updateData) closeForm();
        },
        onError: (error) => {
          const retry = window.confirm(
            `오류가 발생했습니다: ${error.message}\n다시 시도하시겠습니까?`,
          );
          if (retry) {
            tryMutate(post);
          }
        },
      });
    };
    tryMutate(post);
  ```
  - PostForm 컴포넌트는 create와 update시에 비슷한 로직을 수행하기에 재사용 가능하게 설계
  
## 스크린샷
<table>
  <tr>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 152140" src="https://github.com/user-attachments/assets/79c1db25-225f-4893-8a36-2ce241531a1d" /></td>
    <td><img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/2fcf0c4a-a487-43af-82ed-40c1951a69fb" /></td>
    <td><img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/11083cc3-c817-45f9-aae6-d298dbb97fa3" /></td>
  </tr>
  <tr>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 153057" src="https://github.com/user-attachments/assets/2b5dc228-fa54-48cc-afe1-1965d60cf72b" /></td>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 153107" src="https://github.com/user-attachments/assets/b848cafe-0ed2-428c-acdd-d02a02fca2a9" /></td>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 153115" src="https://github.com/user-attachments/assets/d74d0349-bad9-4562-858f-aa4c190ea3c3" /></td>
  </tr>
  <tr>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 153331" src="https://github.com/user-attachments/assets/10530c01-485b-4a2a-ae66-d0a811d778ee" /></td>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 153343" src="https://github.com/user-attachments/assets/21b86731-c187-4550-9de4-977551ba0790" /></td>
    <td><img width="400" height="200" alt="스크린샷 2026-05-06 153351" src="https://github.com/user-attachments/assets/d5a4e926-3df0-4170-938a-fa703643bbc3" /></td>
  </tr>
</table>
