// app/api/initialize-paystack/route.js
export async function POST(request) {
  const data = await request.json();

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    return Response.json(responseData);
  } catch (error) {
    return Response.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
