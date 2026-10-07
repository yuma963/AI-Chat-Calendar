from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# FastAPIアプリの立ち上げ
app = FastAPI(title="AI Calendar API")

# 💡 CORS設定（超重要！）
# Next.js (http://localhost:3000) からの通信を許可するおまじない
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 動作確認用のテスト用ルート
@app.get("/")
def read_root():
    return {"message": "AI Calendar Backend サーバーが正常に稼働しています！🚀"}