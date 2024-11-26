# stepOnBlack
h5 game-stepOnBlack,please don't step on the white block
别踩白块游戏

docker部署

构建镜像：
`docker build -t step-on-black:latest .`

运行容器：
`docker run -itd --restart always -e TZ=Asia/Shanghai -p 8050:80 --name step-on-black step-on-black:latest`