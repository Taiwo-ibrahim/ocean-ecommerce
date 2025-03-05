// app/api/verify-paystack/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return Response.json(
      { status: false, message: "No reference provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
