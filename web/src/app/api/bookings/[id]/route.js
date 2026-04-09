import sql from "@/app/api/utils/sql";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { booking_status } = body;

    const result = await sql(
      `UPDATE booking_requests SET booking_status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [booking_status, id],
    );

    if (result.length === 0) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error("Update booking error:", error);
    return Response.json(
      { error: "Failed to update booking" },
      { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await sql(`SELECT * FROM booking_requests WHERE id = $1`, [
      id,
    ]);
    if (result.length === 0) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }
    return Response.json(result[0]);
  } catch (error) {
    console.error("Get booking error:", error);
    return Response.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}
