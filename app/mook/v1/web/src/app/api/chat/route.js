import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return Response.json({ error: "メッセージが必要です" }, { status: 400 });
    }

    // Get current projects for context
    const projects = await sql`
      SELECT id, name, code, start_date
      FROM projects
      ORDER BY created_at DESC
    `;

    const systemPrompt = `あなたはプロジェクト管理アシスタントです。ユーザーのリクエストに応じて、プロジェクトの新規作成、編集、削除を手伝います。

現在のプロジェクト一覧:
${projects.map((p) => `- ID: ${p.id}, 名前: ${p.name}, コード: ${p.code}, 開始日: ${p.start_date}`).join("\n")}

ユーザーのリクエストを解析し、以下のJSON形式で返してください:

新規プロジェクト作成の場合:
{
  "action": "create",
  "data": {
    "name": "プロジェクト名",
    "code": "プロジェクトコード (例: PRJ-2024-001)",
    "start_date": "YYYY-MM-DD形式の日付",
    "members": [
      { "name": "メンバー名", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" }
    ]
  },
  "message": "ユーザーへのメッセージ"
}

プロジェクト編集の場合:
{
  "action": "update",
  "project_id": プロジェクトID,
  "data": {
    "name": "新しい名前 (オプション)",
    "code": "新しいコード (オプション)",
    "start_date": "新しい開始日 (オプション)"
  },
  "message": "ユーザーへのメッセージ"
}

プロジェクト削除の場合:
{
  "action": "delete",
  "project_id": プロジェクトID,
  "message": "ユーザーへのメッセージ"
}

情報提供のみの場合:
{
  "action": "info",
  "message": "ユーザーへのメッセージ"
}

注意:
- プロジェクトコードは既存のものと重複しないようにしてください
- 日付は必ずYYYY-MM-DD形式で返してください
- メンバーのアバターは必ずUnsplashの画像URLを使用してください
- ユーザーが具体的な情報を提供していない場合は、質問して確認してください`;

    // Call ChatGPT API
    const aiResponse = await fetch(
      `${process.env.APP_URL}/integrations/chat-gpt/conversationgpt4`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          json_schema: {
            name: "project_assistant",
            schema: {
              type: "object",
              properties: {
                action: {
                  type: "string",
                  enum: ["create", "update", "delete", "info"],
                },
                project_id: {
                  type: ["number", "null"],
                },
                data: {
                  type: ["object", "null"],
                  properties: {
                    name: { type: ["string", "null"] },
                    code: { type: ["string", "null"] },
                    start_date: { type: ["string", "null"] },
                    members: {
                      type: ["array", "null"],
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          avatar: { type: "string" },
                        },
                        required: ["name", "avatar"],
                        additionalProperties: false,
                      },
                    },
                  },
                  additionalProperties: false,
                },
                message: { type: "string" },
              },
              required: ["action", "project_id", "data", "message"],
              additionalProperties: false,
            },
          },
        }),
      },
    );

    if (!aiResponse.ok) {
      throw new Error("AI応答の取得に失敗しました");
    }

    const aiResult = await aiResponse.json();
    const parsedResponse = JSON.parse(aiResult.choices[0].message.content);

    // Execute the action
    let actionResult = null;

    if (parsedResponse.action === "create" && parsedResponse.data) {
      const createResponse = await fetch(
        `${process.env.APP_URL}/api/projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedResponse.data),
        },
      );

      if (createResponse.ok) {
        actionResult = await createResponse.json();
      } else {
        const error = await createResponse.json();
        return Response.json({
          message: `エラー: ${error.error}`,
          action: "error",
        });
      }
    } else if (
      parsedResponse.action === "update" &&
      parsedResponse.project_id
    ) {
      const updateResponse = await fetch(
        `${process.env.APP_URL}/api/projects/${parsedResponse.project_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedResponse.data),
        },
      );

      if (updateResponse.ok) {
        actionResult = await updateResponse.json();
      } else {
        const error = await updateResponse.json();
        return Response.json({
          message: `エラー: ${error.error}`,
          action: "error",
        });
      }
    } else if (
      parsedResponse.action === "delete" &&
      parsedResponse.project_id
    ) {
      const deleteResponse = await fetch(
        `${process.env.APP_URL}/api/projects/${parsedResponse.project_id}`,
        {
          method: "DELETE",
        },
      );

      if (deleteResponse.ok) {
        actionResult = await deleteResponse.json();
      } else {
        const error = await deleteResponse.json();
        return Response.json({
          message: `エラー: ${error.error}`,
          action: "error",
        });
      }
    }

    return Response.json({
      message: parsedResponse.message,
      action: parsedResponse.action,
      result: actionResult,
    });
  } catch (error) {
    console.error("Error in chat:", error);
    return Response.json(
      { error: "チャット処理に失敗しました" },
      { status: 500 },
    );
  }
}
