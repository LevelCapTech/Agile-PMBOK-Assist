import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Get all projects
    const projects = await sql`
      SELECT id, name, code, start_date, created_at
      FROM projects
      ORDER BY created_at DESC
    `;

    // Get all project members
    const members = await sql`
      SELECT project_id, name, avatar
      FROM project_members
    `;

    // Combine projects with their members
    const projectsWithMembers = projects.map((project) => {
      const projectMembers = members.filter((m) => m.project_id === project.id);
      return {
        ...project,
        members: projectMembers,
      };
    });

    return Response.json(projectsWithMembers);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { error: "プロジェクトの取得に失敗しました" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, code, start_date, members } = body;

    // Validate required fields
    if (!name || !code || !start_date) {
      return Response.json(
        { error: "プロジェクト名、コード、開始日は必須です" },
        { status: 400 },
      );
    }

    // Create project and add members in a transaction
    const result = await sql.transaction(async (txn) => {
      // Insert project
      const [project] = await txn`
        INSERT INTO projects (name, code, start_date)
        VALUES (${name}, ${code}, ${start_date})
        RETURNING *
      `;

      // Insert members if provided
      let projectMembers = [];
      if (members && members.length > 0) {
        for (const member of members) {
          const [insertedMember] = await txn`
            INSERT INTO project_members (project_id, name, avatar)
            VALUES (${project.id}, ${member.name}, ${member.avatar})
            RETURNING *
          `;
          projectMembers.push(insertedMember);
        }
      }

      return { ...project, members: projectMembers };
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    // Handle unique constraint violation
    if (error.message && error.message.includes("projects_code_key")) {
      return Response.json(
        { error: "このプロジェクトコードは既に使用されています" },
        { status: 400 },
      );
    }

    return Response.json(
      { error: "プロジェクトの作成に失敗しました" },
      { status: 500 },
    );
  }
}
