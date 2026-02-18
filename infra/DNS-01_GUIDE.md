# Value ドメイン：DNS-01（manual-auth-hook）用 API キー発行 & 許可 IP 設定 手順

## 事前条件

- Value ドメインのコントロールパネルにログインできること
- ※ API KEY 発行には **SMS 認証が必要**（未設定なら先に設定する） ([Value Domain][1])

---

## 1. API KEY を発行する（Value ドメイン画面操作）

1. Value ドメインの **コントロールパネル**にログイン ([Value Domain One][2])

2. 画面右上の **「人物アイコン」** をクリック
   　 → プルダウンから **「マイページ」** をクリック ([Value Domain One][2])

3. マイページで **「API 設定」** をクリック ([Value Domain One][2])

4. **「APIKEY を発行する」** をクリック ([Value Domain One][2])

5. 確認ダイアログ **「本当に API KEY を発行しますか？」** が出る
   　 → **「発行」** をクリック ([Value Domain One][2])

6. API KEY が表示されるので **必ずコピーして控える**

- この画面を閉じると **API KEY は再確認できない**
- 必要なら **「API キーの再発行」**（＝以前のキーは無効化される前提） ([Value Domain][3])

---

## 2. API KEY を有効化し、接続許可 IP を設定する（重要）

1. 同じく **マイページ → API 設定** を開く ([Value Domain One][2])

2. API 設定一覧で **編集（edit / 編集）** をクリック ([Value Domain One][2])

3. 設定画面で以下を行う ([Value Domain One][2])

- **API KEY 有効/無効** のスイッチを **有効（緑）** にする
- **接続を許可する IP** に、API を叩くサーバのグローバル IP（VPS の外向き IP）を入力

  - 複数ある場合は **カンマ区切り** で入力可能 ([Value Domain][3])

4. **「変更」** をクリックして保存 ([Value Domain One][2])

---

## 3. 取得した API KEY を CERTBOT_DNS_CREDENTIALS 用ファイルに保存（VPS 側）

> これは画面操作じゃなく VPS 作業だけど、方式 B の「資格情報」の正体はこれ

- 例：

  - `CERTBOT_DNS_PLUGIN=manual`
  - `CERTBOT_DNS_CREDENTIALS=/etc/letsencrypt/valuedomain-apikey.txt`

- `valuedomain-apikey.txt` の中身は **API KEY 文字列だけ（1 行）** にする

- ファイル権限は `600`（root のみ読める）にする

---

## 補足（ハマりどころ：許可 IP）

- 許可 IP に入れるのは「VPS 自身のグローバル IP」
- NAT/踏み台/CI から叩くなら、その **送信元 IP** も許可 IP に追加が必要

[1]: https://www.value-domain.com/service/api/?utm_source=chatgpt.com "バリュードメインAPI"
[2]: https://one.value-domain.com/help/manual/user/api?utm_source=chatgpt.com "バリュードメインAPI発行方法"
[3]: https://www.value-domain.com/media/api-dns/?utm_source=chatgpt.com "API連携とは？バリュードメインAPIでドメイン、DNS設定の取得 ..."
