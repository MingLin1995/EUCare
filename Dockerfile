# 使用官方 Node.js 作為基底映像檔
FROM node:20.8.1

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 檔案並安裝依賴
COPY package*.json ./
RUN npm install

# 複製所有檔案到容器
COPY . .

# 編譯應用程式
RUN npm run build

# 開放應用程式使用的端口
EXPOSE 3000

# 定義容器啟動時執行的命令
CMD ["node", "dist/main"]
