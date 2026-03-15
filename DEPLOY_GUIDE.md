# OHI Tech 홈페이지 - Oracle Cloud 배포 가이드

## 1. Oracle Cloud 인스턴스 생성 (Always Free Tier)

### 인스턴스 설정
- Shape: **VM.Standard.A1.Flex** (ARM, 1 OCPU, 6GB RAM 권장)
- OS: **Ubuntu 22.04**
- Boot Volume: 50GB
- VCN: Public Subnet, Security List에서 80, 443 포트 오픈

### Security List 인바운드 규칙 추가
```
TCP 80  (HTTP)
TCP 443 (HTTPS)
TCP 3000 (개발/테스트용, 나중에 제거)
```

## 2. 서버 초기 설정

```bash
# SSH 접속
ssh -i your-key.pem ubuntu@<YOUR_PUBLIC_IP>

# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# Node.js 20 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 설치 (프로세스 매니저)
sudo npm install -g pm2

# Nginx 설치
sudo apt install -y nginx

# Certbot 설치 (SSL)
sudo apt install -y certbot python3-certbot-nginx
```

## 3. 프로젝트 배포

```bash
# 프로젝트 디렉토리 생성
sudo mkdir -p /var/www/ohitech
sudo chown ubuntu:ubuntu /var/www/ohitech

# 프로젝트 파일 업로드 (로컬에서)
scp -i your-key.pem -r ./ohitech-website/* ubuntu@<YOUR_PUBLIC_IP>:/var/www/ohitech/

# 서버에서 설치 및 빌드
cd /var/www/ohitech
npm install --production
npm run build

# PM2로 실행
pm2 start npm --name "ohitech" -- start
pm2 save
pm2 startup
```

## 4. Nginx 설정

```bash
sudo nano /etc/nginx/sites-available/ohitech
```

```nginx
server {
    listen 80;
    server_name www.ohitech.co.kr ohitech.co.kr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/ohitech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. SSL 인증서 (Let's Encrypt)

```bash
# DNS에서 www.ohitech.co.kr → Oracle Cloud Public IP 설정 후
sudo certbot --nginx -d www.ohitech.co.kr -d ohitech.co.kr
```

## 6. DNS 설정

도메인 등록기관에서 다음 레코드 추가:
```
A    ohitech.co.kr       → <YOUR_PUBLIC_IP>
A    www.ohitech.co.kr   → <YOUR_PUBLIC_IP>
```

## 7. SEO 등록

### Google Search Console
1. https://search.google.com/search-console 접속
2. 도메인 추가: ohitech.co.kr
3. 소유권 확인 후 sitemap.xml 제출

### Naver Search Advisor
1. https://searchadvisor.naver.com 접속
2. 사이트 추가 및 소유권 확인
3. sitemap.xml 제출

### Baidu Webmaster
1. https://ziyuan.baidu.com 접속
2. 사이트 추가 및 소유권 확인
3. sitemap.xml 제출

## 8. 관리자 로그인

- URL: https://www.ohitech.co.kr/admin
- 기본 계정: admin / admin123
- ⚠️ **배포 후 반드시 비밀번호를 변경하세요!**

## 프로젝트 구조

```
ohitech-website/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── page.tsx      # 메인 페이지
│   │   ├── about/        # 회사소개
│   │   ├── products/     # 제품/솔루션 (필터, 검색)
│   │   ├── partners/     # 파트너사
│   │   ├── contact/      # 문의/견적 요청
│   │   ├── admin/        # 관리자 페이지
│   │   └── api/          # API 라우트
│   ├── components/       # 공통 컴포넌트
│   ├── db/               # SQLite 스키마 & 시드 데이터
│   ├── i18n/             # 다국어 사전 (한/영/중)
│   └── lib/              # 유틸리티
├── data/                 # SQLite DB 파일 (자동 생성)
└── public/               # 정적 파일
```
