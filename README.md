# 프로젝트 개요

- 프로젝트의 목적과 주요 기능을 간략히 설명

# 라이브러리

- bycript : password 암호화
- ts-rest : 편리한 end-to-end 타입 안정성과 api-doc을 한번에 작성할 수 있어서 편함
- typeorm : db 연동
- zod : 유효성 검사

- 기술 스택은 프로젝트에서 사용된 기술과 도구를 나열

# 문제 해결 과정

- 프로젝트에서 직면한 문제와 이를 해결하기 위해 사용한 접근 방식을 설명하는 부분

# 시각적 자료

# 결과

- 성능 개선이나 사용자 만족도 향상과 같은 구체적인 수치를 포함하면 더욱 효과적입니다.

# 서버 구동 방법

1. docker desktop이 설치되어있다면 docker-compose를 추가 설치 하지 않아도 이미 docker-compose가 설치되어있습니다

```
npm run script
```

# 클래스 다이어그램으로 표현하기

특정 이슈들로 orm을 바꿔야할 경우도 있는데 너무 강결합되어있으면 바꿀때 힘들것 같아서 고민해봤습니다
[Moving from TypeORM to MikroORM](https://github.com/medusajs/medusa/discussions/4431)
