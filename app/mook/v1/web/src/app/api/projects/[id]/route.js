import sql from "@/app/api/utils/sql";

// Get a single project
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [project] = await sql`
      SELECT id, name, code, start_date, created_at
      FROM projects
      WHERE id = ${id}
    `;

    if (!project) {
      return Response.json(
        { error: "プロジェクトが見つかりません" },
        { status: 404 },
      );
    }

    const members = await sql`
      SELECT id, name, avatar
      FROM project_members
      WHERE project_id = ${id}
    `;

    return Response.json({ ...project, members });
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json(
      { error: "プロジェクトの取得に失敗しました" },
      { status: 500 },
    );
  }
}

// Update a project
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, code, start_date, members } = body;

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }
    if (code !== undefined) {
      updates.push(`code = $${paramCount}`);
      values.push(code);
      paramCount++;
    }
    if (start_date !== undefined) {
      updates.push(`start_date = $${paramCount}`);
      values.push(start_date);
      paramCount++;
    }

    if (updates.length === 0 && !members) {
      return Response.json(
        { error: "更新するフィールドがありません" },
        { status: 400 },
      );
    }

    const result = await sql.transaction(async (txn) => {
      let project;

      if (updates.length > 0) {
        const updateQuery = `UPDATE projects SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`;
        values.push(id);
        [project] = await txn(updateQuery, values);
      } else {
        [project] = await txn`SELECT * FROM projects WHERE id = ${id}`;
      }

      if (!project) {
        throw new Error("プロジェクトが見つかりません");
      }

      // Update members if provided
      let projectMembers = [];
      if (members !== undefined) {
        // Delete existing members
        await txn`DELETE FROM project_members WHERE project_id = ${id}`;

        // Add new members
        if (members.length > 0) {
          for (const member of members) {
            const [insertedMember] = await txn`
              INSERT INTO project_members (project_id, name, avatar)
              VALUES (${id}, ${member.name}, ${member.avatar})
              RETURNING *
            `;
            projectMembers.push(insertedMember);
          }
        }
      } else {
        projectMembers =
          await txn`SELECT * FROM project_members WHERE project_id = ${id}`;
      }

      return { ...project, members: projectMembers };
    });

    return Response.json(result);
  } catch (error) {
    console.error("Error updating project:", error);

    if (error.message && error.message.includes("projects_code_key")) {
      return Response.json(
        { error: "このプロジェクトコードは既に使用されています" },
        { status: 400 },
      );
    }

    if (error.message === "プロジェクトが見つかりません") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    return Response.json(
      { error: "プロジェクトの更新に失敗しました" },
      { status: 500 },
    );
  }
}

// Delete a project
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const [deleted] = await sql`
      DELETE FROM projects
      WHERE id = ${id}
      RETURNING *
    `;

    if (!deleted) {
      return Response.json(
        { error: "プロジェクトが見つかりません" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting project:", error);
    return Response.json(
      { error: "プロジェクトの削除に失敗しました" },
      { status: 500 },
    );
  }
}
