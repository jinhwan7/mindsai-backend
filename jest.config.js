module.exports = {
  preset: 'ts-jest', // TypeScript용 Jest 프리셋
  testEnvironment: 'node', // 테스트 환경
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // 절대 경로를 매핑
  },
  moduleFileExtensions: ['ts', 'js', 'json'], // 테스트 가능한 파일 확장자
  transform: {
    '^.+\\.ts$': 'ts-jest', // ts 파일을 ts-jest로 변환
  },
  roots: ['<rootDir>/src'], // 테스트 파일이 위치한 디렉터리
};
