# 프로젝트 실행 방법


1. `src/.env` 파일을 아래와 같은 key로 만들어 줍니다

```bash
MYSQL_DB_HOST=mysql-db
MYSQL_DB_PORT=3306

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=mindsai_db
MYSQL_USER=good
MYSQL_PASSWORD=good


HTTP_HOST=0.0.0.0
```
3. 아래 스크립트를 실행하면 docker-compose.yml 파일을 기반으로  
`docker` 컨테이너가 db 1개, server 1개 띄워집니다

4. mysql에는 user테이블에 3개의 row로 초기화 하였습니다


```
npm run script
```

# 프로잭트 아키텍처 구조 
![image](https://github.com/user-attachments/assets/4b4ece08-80ff-4100-83af-96df250df004)




# 라이브러리

- bycript : password 암호화
- ts-rest : 편리한 end-to-end 타입 안정성과 api-doc을(swagger) 한번에 작성할 수 있어서 편함
- typeorm : db 연동
- zod : 유효성 검사

- 기술 스택은 프로젝트에서 사용된 기술과 도구를 나열


특정 이슈들로 orm을 바꿔야할 경우도 있는데 너무 강결합되어있으면 바꿀때 힘들것 같아서 이 부분도 고민해봤습니다
[Moving from TypeORM to MikroORM](https://github.com/medusajs/medusa/discussions/4431)
