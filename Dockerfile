# 使用官方 Node.js 作為基底映像檔
FROM node:20.8.1

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 檔案並安裝依賴
COPY package*.json ./

# 複製 .env 文件到容器
COPY .env ./

# 安裝相依套件
RUN npm install

# 複製所有檔案到容器
COPY . .

# 生成 Prisma 客戶端
RUN npx prisma generate

# 編譯應用程式並檢查 dist 目錄
RUN npm run build && ls -al dist/

# 開放應用程式使用的端口
EXPOSE 3000

# 定義容器啟動時執行的命令
CMD ["node", "dist/src/main"]
