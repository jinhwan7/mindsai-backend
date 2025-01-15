# 베이스 이미지를 지정합니다.
FROM node:20.17.0

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY package*.json ./

# 글로벌 의존성 설치
RUN npm install -g pm2

# 애플리케이션 의존성 설치
RUN npm install

COPY . .

# 환경변수 파일 복사 (빌드시에 .env가 필요하다면 주석풀고 쓰기 지금은 필요없을듯)
# COPY src/.env .env

# 애플리케이션 빌드
RUN npm run build

# PM2를 사용하여 애플리케이션 실행
CMD ["pm2-runtime", "ecosystem.config.js"]
