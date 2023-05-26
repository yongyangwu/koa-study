const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("@koa/multer");

const app = new Koa();
const router = new Router();

// 配置multer中间件
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// 处理图片上传请求
router.post("/upload", upload.single("file"), (ctx) => {
  console.log("ctx.request.file", ctx.request.file);
  ctx.body = "上传成功";
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
